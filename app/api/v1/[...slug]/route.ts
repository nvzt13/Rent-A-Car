import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest, {params}: {params:
Promise<{slug: string}>}) {
  
}