"use server";

import { auth } from "../auth";
import dbConnect from "../lib/db";
import Roadmap from "../models/Roadmap";
import { revalidatePath } from "next/cache";

export async function createRoadmap(formData: FormData) {
  // 🔐 Auth check
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title");
  const slug = formData.get("slug");
  const domain = formData.get("domain");

  // Basic validation
  if (
    typeof title !== "string" ||
    typeof slug !== "string" ||
    typeof domain !== "string"
  ) {
    throw new Error("Invalid form data");
  }

  await dbConnect();

  // Ensure slug is unique
  const existing = await Roadmap.findOne({ slug });
  if (existing) {
    throw new Error("Roadmap with this slug already exists");
  }

  await Roadmap.create({
    title,
    slug,
    domain,
    steps: [],
  });

  // Refresh admin dashboard
  revalidatePath("/admin");
}
