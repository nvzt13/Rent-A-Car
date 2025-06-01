import { NextResponse } from "next/server";
import * as carService from "@/lib/services/carService";

export async function DELETE (req: Request, { params }: { params: { id: string } }) {
    const { id } = await params;
    const carId = id;
    if (!carId) {
      return NextResponse.json(
        { message: "Car ID is required" },
        { status: 400 }
      );
    }

    return carService.deleteCar(carId);
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

    const formData = await req.formData();
    return carService.updateCar(carId, formData);
  }
  