import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const [table, id, query] = slug;

  switch (table) {
    case "car":
      if (table && id && query) {
        
        const blockDays = await prisma.car.findFirst({
          where: { id: Number(id) },
          include: {
            rentals: {
              select: {
                rentalDate: true,
                returnDate: true,
              },
            },
          },
        });

        if (!blockDays || !blockDays.rentals) {
          return NextResponse.json(
            { message: "No rentals found for this car." },
            { status: 404 }
          );
        }

        const blockDates = blockDays.rentals
          .map((rental) => {
            const rentalStart = new Date(rental.rentalDate);
            const rentalEnd = new Date(rental.returnDate);
            const blockedDays = [];

            const currentDate = new Date(rentalStart);
            while (currentDate <= rentalEnd) {
              blockedDays.push(currentDate.toISOString().split("T")[0]);
              currentDate.setDate(currentDate.getDate() + 1);
            }

            return blockedDays;
          })
          .flat();

        return NextResponse.json(
          {
            message: "Dolu günler getirildi!",
            blockDays: blockDates,
          },
          { status: 200 }
        );
      }

      try {
        const allCars = await prisma.car.findMany();
        return NextResponse.json(
          { message: "Get cars successfully", data: allCars },
          { status: 200 }
        );
      } catch (error) {
        console.log("Error fetching cars:", error);
        return NextResponse.json(
          { message: "Failed to fetch cars", error },
          { status: 500 }
        );
      }

    case "rental":
      try {
        const allRentals = await prisma.rental.findMany({
          select: {
            id: true,
            rentalDate: true,
            returnDate: true,
            customerName: true,
            takeHour: true,
            isAprove: true,
            phoneNumber: true,
            carId: true,
          },
        });
        return NextResponse.json({ message: "Randevular", allRentals });
      } catch (error) {
        console.log(error);
      }
    case "visitor":
      try {
        // Visitor satırı var mı? Yoksa oluştur
        let visitor = await prisma.visitor.findFirst();

        if (!visitor) {
          visitor = await prisma.visitor.create({
            data: { count: 1 },
          });
        } else {
          visitor = await prisma.visitor.update({
            where: { id: visitor.id },
            data: { count: visitor.count + 1 },
          });
        }

        return NextResponse.json({
          message: "Ziyaretçi sayısı",
          count: visitor.count,
        });
      } catch (error) {
        console.error("Ziyaretçi sayacı hatası:", error);
        return NextResponse.json(
          { message: "Sayaç hatası", error },
          { status: 500 }
        );
      }

    default:
      return NextResponse.json({ message: "Invalid slug" }, { status: 400 });
  }
}

// POST
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const [table] = slug;
  const contentType = request.headers.get("content-type") || "";

  switch (table) {
    case "car":
      try {
        if (!contentType.includes("multipart/form-data")) {
          return NextResponse.json(
            { message: "Content type must be multipart/form-data" },
            { status: 400 }
          );
        }

        const formData = await request.formData();
        const requiredFields = [
          "name",
          "carModel",
          "fuelType",
          "km",
          "price",
          "carType",
          "gear",
          "image",
        ];

        const missingFields = requiredFields.filter(
          (field) => !formData.get(field)
        );
        console.log("Missing fields:", missingFields);

        if (missingFields.length > 0) {
          return NextResponse.json(
            {
              message: `Bad request! Missing fields: ${missingFields.join(
                ", "
              )}`,
            },
            { status: 400 }
          );
        }

        // Convert formData to an object
        const data = Object.fromEntries(formData.entries());

        // Make sure the values are properly formatted for Prisma
        const carData = {
          name: data.name || null,
          carModel: data.carModel || null,
          fuelType: data.fuelType || null,
          carType: data.carType || null,
          km: data.km ? Number(data.km) : null,
          price: data.price ? Number(data.price) : null,
          gear: data.gear || null,
          image: data.image || null,
        };

        // Check if any required data is null
        if (Object.values(carData).some((value) => value === null)) {
          return NextResponse.json(
            {
              message:
                "Invalid data. Some fields are null or not in correct format.",
            },
            { status: 400 }
          );
        }

        // Create the car in the database
        const createCar = await prisma.car.create({
          data: {
            name: carData.name as string,
            carModel: carData.carModel as string,
            fuelType: carData.fuelType as string,
            km: carData.km as number,
            price: carData.price as number,
            carType: carData.carType as string,
            gear: carData.gear as string,
            image: carData.image as string,
          },
        });

        return NextResponse.json({
          message: "Car created successfully!",
          data: createCar,
        });
      } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
          { message: `Error creating car: ${error}` },
          { status: 500 }
        );
      }
      break;
    case "rental":
      try {
        if (!contentType.includes("application/json")) {
          return NextResponse.json(
            { message: "Content type must be application/json" },
            { status: 400 }
          );
        }

        const body = await request.json();
        const createRental = await prisma.rental.create({
          data: {
            customerName: body.customerName,
            phoneNumber: body.phoneNumber,
            takeHour: body.takeHour || null,
            rentalDate: new Date(body.rentalDate).toISOString(),
            returnDate: new Date(body.returnDate).toISOString(),
            carId: Number(body.carId),
          },
        });
        return NextResponse.json(
          { message: "Randevu olusturuldu", createRental },
          { status: 201 }
        );
      } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
          { message: `Error creating rental: ${error}` },
          { status: 500 }
        );
      }
      break;
    case "admin":
      try {
        const body = await request.json();
        const { username, password } = body;
        const admin = await prisma.admin.findFirst({
          where: { name: username },
        });

        if (!admin) {
          return NextResponse.json(
            { message: "Invalid credentials" },
            { status: 401 }
          );
        }
        // Şifre kontrolü
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
          return NextResponse.json(
            { message: "Invalid credentials" },
            { status: 403 }
          );
        }

        if (admin && isPasswordValid) {
          const token = jwt.sign({ userId: admin.id }, "SECRET_KEY", {
            expiresIn: "1h",
          });

          const response = NextResponse.json({ message: "Login successful" });

          response.headers.set(
            "Set-Cookie",
            `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict${
              process.env.NODE_ENV === "production" ? "; Secure" : ""
            }`
          );

          return response;
        }
      } catch (error) {
        console.log("Error in admin case:", error);
        return NextResponse.json(
          { message: "Failed in admin case", error: error },
          { status: 500 }
        );
      }
    default:
      return NextResponse.json(
        { message: "Invalid table specified" },
        { status: 400 }
      );
  }
}

//  DELETE
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const [table, id] = slug;

  if (!table || !id) {
    return NextResponse.json({ message: "Bad request!" }, { status: 400 });
  }

  switch (table) {
    case "car":
      try {
        // Delete associated rentals first
        await prisma.rental.deleteMany({
          where: { carId: parseInt(id) },
        });

        // Delete the car
        const deletedCar = await prisma.car.delete({
          where: { id: parseInt(id) },
        });

        return NextResponse.json({ message: "Car deleted!", data: deletedCar });
      } catch (error) {
        console.log(error);
        return NextResponse.json(
          { message: "Error deleting car", error },
          { status: 500 }
        );
      }
    case "rental":
      try {
        const deleteRental = await prisma.rental.delete({
          where: { id: parseInt(id) },
        });
        return NextResponse.json({
          message: "Rental deleted!",
          data: deleteRental,
        });
      } catch (error) {
        console.log(error);
        return NextResponse.json(
          { message: "Error deleting rental", error },
          { status: 500 }
        );
      }
    default:
      console.log("Error");
      return NextResponse.json({ message: "Invalid table!" }, { status: 400 });
  }
}

// PUT
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const [table, id] = slug;
  const contentType = request.headers.get("content-type") || "";

  // Check for missing table or ID
  if (!table || !id) {
    return NextResponse.json(
      { message: "Missing required fields!" },
      { status: 400 }
    );
  }

  try {
    switch (table) {
      case "car":
        if (!contentType.includes("multipart/form-data")) {
          return NextResponse.json(
            { message: "Content type must be multipart/form-data" },
            { status: 400 }
          );
        }

        const formData = await request.formData();
        const requiredFields = [
          "name",
          "carModel",
          "fuelType",
          "km",
          "price",
          "carType",
          "gear",
          "image",
        ];

        // Check for missing fields
        const missingFields = requiredFields.filter(
          (field) => !formData.get(field)
        );
        if (missingFields.length > 0) {
          return NextResponse.json(
            {
              message: `Bad request! Missing fields: ${missingFields.join(
                ", "
              )}`,
            },
            { status: 400 }
          );
        }

        const data = Object.fromEntries(formData.entries());
        const carData = {
          name: data.name as string,
          carModel: data.carModel as string,
          fuelType: data.fuelType as string,
          carType: data.carType as string,
          km: Number(data.km),
          price: Number(data.price),
          gear: data.gear as string,
          image: data.image as string,
        };

        const updateCar = await prisma.car.update({
          where: { id: parseInt(id) },
          data: carData,
        });

        return NextResponse.json(
          { message: "Car updated successfully!", data: updateCar },
          { status: 200 }
        );

      case "rental":
        if (!contentType.includes("application/json")) {
          return NextResponse.json(
            { message: "Content type must be application/json" },
            { status: 400 }
          );
        }

        const rental = await prisma.rental.findUnique({
          where: { id: parseInt(id) },
        });

        if (!rental) {
          return NextResponse.json(
            { message: "Rental not found!" },
            { status: 404 }
          );
        }

        const updateRental = await prisma.rental.update({
          where: { id: parseInt(id) },
          data: {
            isAprove: !rental.isAprove,
          },
        });

        return NextResponse.json(
          { message: "Rental updated successfully!", data: updateRental },
          { status: 200 }
        );

      default:
        return NextResponse.json(
          { message: `Table ${table} not recognized!` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json(
      { message: "An error occurred during the update." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const [carId] = slug;

  try {
    // Önce mevcut arabanın durumunu al
    const car = await prisma.car.findUnique({
      where: { id: Number(carId) },
    });

    if (!car) {
      return new NextResponse("Car not found", { status: 404 });
    }

    // Durumu tersine çevir
    const updatedCar = await prisma.car.update({
      where: { id: Number(carId) },
      data: { isAvailable: !car.isAvailable },
    });

    return NextResponse.json(updatedCar);
  } catch (error) {
    console.error("Toggle error:", error);
    return new NextResponse("Failed to toggle availability", { status: 500 });
  }
}
