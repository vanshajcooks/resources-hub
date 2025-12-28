"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/roadmaps",
    });
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 rounded-lg border border-neutral-800 bg-neutral-900 p-6"
      >
        {/* Header */}
        <div className="space-y-1 text-center">
          <h1 className="text-xl font-semibold tracking-tight text-neutral-100">
            MLSC Hub
          </h1>
          <p className="text-sm text-neutral-400">Sign in to continue</p>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs text-neutral-400">Email</label>
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600"
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-xs text-neutral-400">Password</label>
          <input
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-2 w-full rounded-md bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-white transition"
        >
          Sign in
        </button>

        {/* Footer */}
        <p className="pt-2 text-center text-xs text-neutral-500">
          MLSC Resources Hub
        </p>
      </form>
    </div>
  );
}
