// 🔴 VERY IMPORTANT: force Node runtime (bcrypt cannot run on Edge)
export const runtime = "nodejs";

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import dbConnect from "./lib/db";
import User from "./models/User";
import { authConfig } from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  ...authConfig,

  debug: true, // 👈 TEMP: helps us see auth errors clearly

  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const username = credentials?.username;
        const password = credentials?.password;

        if (typeof username !== "string" || typeof password !== "string") {
          return null;
        }

        await dbConnect();

        const user = await User.findOne({
          username: username.toLowerCase(),
        }).select("+password");

        if (!user) return null;

        const isValid = await user.comparePassword(password);
        if (!isValid) return null;

        // ✅ This is CORRECT
        return {
          id: user._id.toString(),
          username: user.username,
          role: user.role,
        };
      },
    }),
  ],
});
