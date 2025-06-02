import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    
            const { id } = await params;
            if (!id) {
                return NextResponse.json(
                    { message: "Car ID is required" },
                    { status: 400 }
                    );
            }
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
    