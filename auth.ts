// 🔴 VERY IMPORTANT: force Node runtime (bcrypt cannot run on Edge)
export const runtime = "nodejs";

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import dbConnect from "./lib/db";
import User from "./models/User";
import { authConfig } from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        // ✅ Type guards (required for NextAuth v5)
        if (typeof email !== "string" || typeof password !== "string") {
          return null;
        }

        await dbConnect();

        const user = await User.findOne({ email });

        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) return null;

        // ✅ Minimal, session-safe user object
        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
});
