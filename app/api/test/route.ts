import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { carId: string } }
) {
  const { carId } = params;

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
