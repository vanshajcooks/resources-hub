"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid username or password");
    } else {
      window.location.href = "/roadmaps";
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 rounded-xl border border-neutral-800 bg-neutral-900 p-6"
      >
        <h1 className="text-2xl font-semibold text-neutral-100 text-center">
          Login
        </h1>

        {error && <p className="text-sm text-red-400 text-center">{error}</p>}

        <div className="space-y-2">
          <label className="text-sm text-neutral-400">Username</label>
          <input
            name="username"
            type="text"
            required
            autoFocus
            className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-700"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-neutral-400">Password</label>
          <input
            name="password"
            type="password"
            required
            className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-700"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-neutral-200 py-2 text-sm font-medium text-neutral-900 transition hover:bg-white disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
