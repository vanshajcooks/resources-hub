import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = (user as any).username;
        token.role = (user as any).role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.username = token.username as string;
        const role = token.role as string | undefined;
        const userRole: "user" | "admin" = role === "admin" ? "admin" : "user";
        session.user.role = userRole;
      }
      return session;
    },
  },

  providers: [],
} satisfies NextAuthConfig;
