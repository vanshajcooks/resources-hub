"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/roadmaps",
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 border p-6 rounded-lg"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:opacity-90"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
