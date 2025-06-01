import { NextRequest, NextResponse } from "next/server";
import * as adminService from "@/lib/services/adminService";

export async function POST(req: NextRequest) {
  const existingAdmin = await adminService.getAdmin();

  if (existingAdmin) {
    return NextResponse.json({ error: "Admin already exists." }, { status: 400 });
  }

  const body = await req.json();
  const newAdmin = await adminService.create(body);

  return NextResponse.json(newAdmin, { status: 201 });
}
