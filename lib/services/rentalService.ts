import { NextResponse } from "next/server";
import { prisma } from "../prisma";

export const getAllRentals = async () => {
  try {
    const allRentals = await prisma.rental.findMany();
    return NextResponse.json(
      { message: "Get rentals successfully", data: allRentals },
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

export const createRental = async (body: any) => {
  try {
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
};

export const deleteRental = async (id: string) => {
  try {
    const deletedRental = await prisma.rental.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(
      { message: "Rental deleted successfully", data: deletedRental },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting rental:", error);
    return NextResponse.json(
      { message: "Failed to delete rental", error },
      { status: 500 }
    );
  }
};
export const updateRental = async (id: string) => {
  try {
    const rental = await prisma.rental.findUnique({
      where: { id: parseInt(id) },
    });
    if (!rental) {
      return NextResponse.json(
        { message: "Rental not found" },
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
      { message: "Rental updated successfully", data: updateRental },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating rental:", error);
    return NextResponse.json(
      { message: "Failed to update rental", error },
      { status: 500 }
    );
  }
};
