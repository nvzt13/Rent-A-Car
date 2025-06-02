import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const rentals = await prisma.rental.findMany({
      include: { car: true },
    });

    const statsMap = new Map();

    rentals.forEach((rental) => {
      if (!rental.isAprove) return;
      const date = new Date(rental.rentalDate);
      const month = date.getMonth(); // 0-11
      const year = date.getFullYear();
      const key = `${year}-${month}`;

      if (!statsMap.has(key)) {
        statsMap.set(key, {
          month: new Date(year, month).toLocaleString("default", {
            month: "long",
          }),
          year,
          totalIncome: 0,
          totalRentals: 0,
        });
      }

      const entry = statsMap.get(key);
      const rentalStart = new Date(rental.rentalDate);
      const rentalEnd = new Date(rental.returnDate);
      const daysRented = Math.ceil(
        (rentalEnd.getTime() - rentalStart.getTime()) / (1000 * 3600 * 24) + 1
      ); // Gün farkını al

      // Her kiralama için günlük ücret ile toplam geliri hesapla
      entry.totalIncome += rental.car.price * daysRented;
      entry.totalRentals += 1;
    });

    const data = Array.from(statsMap.values()).sort((a, b) => {
      return (
        new Date(`${a.year}-${a.month}`).getTime() -
        new Date(`${b.year}-${b.month}`).getTime()
      );
    });

    return NextResponse.json(
      { message: "Aylık gelir ve kiralama sayıları", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return NextResponse.json(
      { message: "İstatistikler alınamadı", error },
      { status: 500 }
    );
  }
}
