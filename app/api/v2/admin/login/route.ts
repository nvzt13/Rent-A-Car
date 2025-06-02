import { NextRequest, NextResponse } from "next/server";
import * as adminService from "@/lib/services/adminService";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { token } = await adminService.login(body);

    const response = NextResponse.json({ success: true });
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (err) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
