import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          {/* Brand */}
          <Link
            href="/"
            className="text-sm font-semibold tracking-wide hover:text-white"
          >
            MLSC<span className="text-neutral-400">.Hub</span>
          </Link>

          {/* Right actions (future-ready) */}
          <nav className="flex items-center gap-6 text-sm text-neutral-400">
            <Link
              href="/roadmaps"
              className="hover:text-neutral-200 transition"
            >
              Roadmaps
            </Link>
            <Link href="/login" className="hover:text-neutral-200 transition">
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>

      {/* Footer (minimal, optional but polished) */}
      <footer className="border-t border-neutral-800">
        <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-neutral-500">
          © {new Date().getFullYear()} MLSC • Built for focused learning
        </div>
      </footer>
    </div>
  );
}
