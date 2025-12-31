import dotenv from "dotenv";
import path from "path";

// Explicitly load .env.local from project root
dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

import bcrypt from "bcrypt";
import dbConnect from "../lib/db";
import User from "../models/User";

async function createUser() {
  await dbConnect();

  const username = "vanshaj";
  const password = "admin123";

  // Check if user already exists
  const existing = await User.findOne({ username });
  if (existing) {
    console.log("❌ User already exists:", username);
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    username,
    password: hashedPassword,
    role: "admin",
  });

  console.log("✅ User created successfully");
  console.log("Username:", username);
  console.log("Password:", password);

  process.exit(0);
}

createUser().catch((err) => {
  console.error(err);
  process.exit(1);
});
