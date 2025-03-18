import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const [table, username, password] = slug
  switch (table) {
    case "car":
      try {
        const allCars = await prisma.car.findMany();
        return NextResponse.json(
          { message: "Get cars successfully", data: allCars },
          { status: 200 }
        );
      } catch (error) {
        console.log("Error fetching cars:", error);
        return NextResponse.json(
          { message: "Failed to fetch cars", error: error },
          { status: 500 }
        );
      }

    case "admin":
      try {
        const admin = await prisma.admin.findFirst({where:{id:1}})
        if(admin?.name === username && admin?.password === password){
          return NextResponse.json({ message: "True" }, { status: 200 });
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
        { message: "Invalid slug" },
        { status: 400 }
      );
  }
}


// POST
export async function POST(
  request: NextRequest,
) {

  try {
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
        { message: `Bad request! Missing fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Convert formData to an object
    const data = Object.fromEntries(formData.entries());
    console.log("Data object:", data);

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
      console.log("Invalid data:", carData);
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

    console.log("Car created:", createCar);
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

  try {
    const deletedCar = await prisma.car.delete({
      where: { id: parseInt(id) }, // Fixed: Properly format where clause with id
    });
    return NextResponse.json({ message: "Car deleted!", data: deletedCar });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Error deleting car" },
      { status: 500 }
    );
  }
}

// PUT
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const [table, id] = slug;
  console.log(table)
  const formData = await request.formData();
  console.log(formData);

  try {
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
        { message: `Bad request! Missing fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Convert formData to an object
    const data = Object.fromEntries(formData.entries());
    console.log("Data object:", data);

    // Make sure the values are properly formatted for Prisma
    const carData = {
      name: data.name as string,
      carModel: data.carModel as string,
      fuelType: data.fuelType as string,
      carType: data.carType as string,
      km: Number(data.km),
      price: Number(data.price),
      gear: data.gear as string,
      status: data.status as string,
      image: data.image as string,
    };

    // Check if any required data is null
    if (Object.values(carData).some((value) => value === null)) {
      console.log("Invalid data:", carData);
      return NextResponse.json(
        {
          message:
            "Invalid data. Some fields are null or not in correct format.",
        },
        { status: 400 }
      );
    }
    const updateCar = await prisma.car.update({
      where: {
        id: parseInt(id),
      },
      data: carData,
    });
    return NextResponse.json(
      { message: "Car updated successfully!", data: updateCar },
      { status: 200 }
    );
  } catch (error) {
    console.log(error
    )
    return NextResponse.json(
      { message: "Error updating car" },
      { status: 500 }
    );
  }
}
