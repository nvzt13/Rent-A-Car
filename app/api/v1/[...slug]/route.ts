import { Car } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const formData = await request.formData();

  const requiredFields = ['id', 'name', 'carModel', 'fuelType', 'km', 'price', 'status', 'startDate', 'endDate', 'carType', 'image'];

  const missingFields = requiredFields.filter((field) => !formData.get(field));
console.log(missingFields)
  if (missingFields.length > 0) {
    return NextResponse.json({ message: `Bad request! Missing fields: ${missingFields.join(', ')}` }, { status: 400 });
  }

  const createCar = await prisma.car.create({})
  return NextResponse.json({ message: "All required fields are present!", data: Object.fromEntries(formData) });
}
