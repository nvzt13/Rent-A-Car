import { NextResponse } from "next/server";
import * as RentalService from "@/lib/services/rentalService";

export async function DELETE (req: Request, { params }: { params: { id: string } }) {
    const { id } = await params;
    const carId = id;
    if (!carId) {
      return NextResponse.json(
        { message: "Car ID is required" },
        { status: 400 }
      );
    }

    return RentalService.deleteRental(carId);
  }

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params;
    const carId = id;
    if (!carId) {
      return NextResponse.json(
        { message: "Car ID is required" },
        { status: 400 }
      );
    }
    return RentalService.updateRental(carId);
  }
  