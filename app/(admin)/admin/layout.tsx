import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Must be logged in
  if (!session) {
    redirect("/login");
  }

  // Must be admin
  if (session.user.role !== "admin") {
    redirect("/roadmaps");
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          {/* Left: Admin title */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold tracking-wide">
              MLSC <span className="text-neutral-400">Admin</span>
            </span>
          </div>

          {/* Right: Actions */}
          <nav className="flex items-center gap-6 text-sm text-neutral-400">
            <Link
              href="/roadmaps"
              className="hover:text-neutral-200 transition"
            >
              View site
            </Link>

            <form action="/api/auth/signout" method="post">
              <button
                type="submit"
                className="hover:text-neutral-200 transition"
              >
                Logout
              </button>
            </form>
          </nav>
        </div>
      </header>

      {/* Admin Content */}
      <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
    </div>
  );
}
