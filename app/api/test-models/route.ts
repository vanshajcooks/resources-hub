import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Roadmap from "@/models/Roadmap";

export async function GET() {
  await dbConnect();

  const count = await Roadmap.countDocuments();
  return NextResponse.json({ roadmaps: count });
}
