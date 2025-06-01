import { NextResponse } from "next/server";
import { prisma } from "../prisma";
import { Car } from "@prisma/client";

export const getAllCars = async () => {
  try {
    const allCars = await prisma.car.findMany();
    return NextResponse.json(
      { message: "Get cars successfully", data: allCars },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json(
      { message: "Failed to fetch cars", error },
      { status: 500 }
    );
  }
};

export const createCar = async (formData: FormData) => {
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

    const data = Object.fromEntries(formData.entries());

    const missingFields = requiredFields.filter(
      (field) => !data[field]
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          message: `Missing fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const carData = {
      name: data.name as string,
      carModel: data.carModel as string,
      fuelType: data.fuelType as string,
      km: Number(data.km),
      price: Number(data.price),
      carType: data.carType as string,
      gear: data.gear as string,
      image: data.image as string,
    };

    // Null ya da NaN kontrolü
    const hasInvalidData = Object.values(carData).some(
      (val) => val === null || val === "" || (typeof val === "number" && isNaN(val))
    );

    if (hasInvalidData) {
      return NextResponse.json(
        {
          message: "Invalid data. Please check the submitted fields.",
        },
        { status: 400 }
      );
    }

    const newCar = await prisma.car.create({ data: carData });

    return NextResponse.json(
      { message: "Car created successfully!", data: newCar },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating car:", error);
    return NextResponse.json(
      { message: "Error creating car", error },
      { status: 500 }
    );
  }
};

export const deleteCar = async (id: string) => {
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
}
export const updateCar = async (id: string, formData: FormData) => {
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

    const data = Object.fromEntries(formData.entries());

    const missingFields = requiredFields.filter(
      (field) => !data[field]
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          message: `Missing fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const carData = {
      name: data.name as string,
      carModel: data.carModel as string,
      fuelType: data.fuelType as string,
      km: Number(data.km),
      price: Number(data.price),
      carType: data.carType as string,
      gear: data.gear as string,
      image: data.image as string,
    };

    // Null veya NaN kontrolü
    const hasInvalidData = Object.values(carData).some(
      (val) => val === null || val === "" || (typeof val === "number" && isNaN(val))
    );

    if (hasInvalidData) {
      return NextResponse.json(
        { message: "Invalid data. Please check the submitted fields." },
        { status: 400 }
      );
    }

    const updatedCar = await prisma.car.update({
      where: { id: parseInt(id) },
      data: carData,
    });

    return NextResponse.json(
      { message: "Car updated successfully!", data: updatedCar },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating car:", error);
    return NextResponse.json(
      { message: "Error updating car", error },
      { status: 500 }
    );
  }
};
