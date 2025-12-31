import mongoose from "mongoose";
import dbConnect from "../lib/db";
import User from "../models/User";

async function seedUsers() {
  await dbConnect();

  // ⚠️ Clear existing users (optional)
  await User.deleteMany({});

  const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "vanshaj", password: "vanshaj123", role: "admin" },
    { username: "aarushi", password: "aarushi@adm1n", role: "admin" },
    { username: "ana", password: "ana@adm1n", role: "admin" },
    { username: "argh", password: "argh@adm1n", role: "admin" },
    { username: "diya", password: "diya@adm1n", role: "admin" },
    { username: "mitali", password: "mitali@adm1n", role: "admin" },
    { username: "mokksh", password: "mokksh@adm1n", role: "admin" },
    { username: "namrata", password: "namrata@adm1n", role: "admin" },
    { username: "parmeet", password: "parmeet@adm1n", role: "admin" },
    { username: "sania", password: "sania@adm1n", role: "admin" },
    { username: "sawaransh", password: "sawaransh@adm1n", role: "admin" },
    { username: "shreshth", password: "shreshth@adm1n", role: "admin" },
    { username: "utkarsh", password: "utkarsh@joints3c", role: "admin" },
    { username: "arnav", password: "arnav@adm1n", role: "admin" },
    { username: "arpit", password: "arpit@adm1n", role: "admin" },
    { username: "harshit", password: "harshit@adm1n", role: "admin" },
    { username: "khagendra", password: "khagendra@adm1n", role: "admin" },
    { username: "nidhish", password: "nidhish@adm1n", role: "admin" },
    { username: "mukul", password: "mukul@adm1n", role: "admin" },
    { username: "ayush", password: "ayush@adm1n", role: "admin" },

    { username: "ivin", password: "ivin@tch", role: "user" },
    { username: "srijan", password: "srijan@tch", role: "user" },
    { username: "siya", password: "siya@tch", role: "user" },
    { username: "advait", password: "advait@tch", role: "user" },
    { username: "souradeep", password: "souradeep@tch", role: "user" },
    { username: "aditya", password: "aditya@tch", role: "user" },
    { username: "manpreet", password: "manpreet@tch", role: "user" },
    { username: "aarya", password: "aarya@mngmt", role: "user" },
    { username: "lakshya", password: "lakshya@mngmt", role: "user" },
    { username: "lucky", password: "lucky@mngmt", role: "user" },
    { username: "shrey", password: "shrey@mngmt", role: "user" },
    { username: "kaavish", password: "kaavish@mngmt", role: "user" },
    { username: "aastha", password: "aastha@mngmt", role: "user" },
    { username: "arshpreet", password: "arshpreet@mngmt", role: "user" },
    { username: "manika", password: "manika@dsgn", role: "user" },
    { username: "shourya", password: "shourya@dsgn", role: "user" },
    { username: "saumya", password: "saumya@dsgn", role: "user" },
    { username: "kirti", password: "kirti@dsgn", role: "user" },
    { username: "pulkit", password: "pulkit@dsgn", role: "user" },
  ];

  for (const u of users) {
    const exists = await User.findOne({ username: u.username });
    if (!exists) {
      await User.create(u); // 🔐 password auto-hashed
    }
  }

  console.log("✅ Users seeded successfully");
  process.exit(0);
}

seedUsers().catch((err) => {
  console.error(err);
  process.exit(1);
});
