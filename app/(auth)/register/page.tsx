"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { registerUser } from "../../../actions/register";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const result = await registerUser(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    // Auto-login after successful register
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
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
            Create account
          </h1>
          <p className="text-sm text-neutral-400">
            Join the MLSC Resources Hub
          </p>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs text-neutral-400">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600"
            placeholder="you@example.com"
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-xs text-neutral-400">Password</label>
          <input
            name="password"
            type="password"
            required
            className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600"
            placeholder="Minimum 6 characters"
          />
        </div>

        {/* Error */}
        {error && <p className="text-sm text-red-400">{error}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-white transition disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        {/* Footer */}
        <p className="text-center text-xs text-neutral-500">
          Already have an account?{" "}
          <a href="/login" className="hover:text-white transition">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}
