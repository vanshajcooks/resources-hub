"use server";

import bcrypt from "bcrypt";
import dbConnect from "../lib/db";
import User from "../models/User";

export async function registerUser(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "Invalid form data" };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }

  await dbConnect();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return { error: "Email already registered" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    email,
    password: hashedPassword,
    role: "user",
  });

  return { success: true };
}
