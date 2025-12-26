import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ success: true, message: "Local DB connected" });
  } catch {
    return NextResponse.json(
      { success: false, message: "Connection failed" },
      { status: 500 }
    );
  }
}
