import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest) {
    const admin = await prisma.admin.findFirst({
      select: {
        id: true,
        name: true,
      },
    });
    
  if (!admin) {
    return NextResponse.json({ exists: false }, { status: 404 });
    }
  return NextResponse.json({ exists: true, admin }, { status: 200 });
  }
