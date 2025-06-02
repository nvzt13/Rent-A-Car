import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET () {
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
}