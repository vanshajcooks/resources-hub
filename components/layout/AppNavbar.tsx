"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`text-sm ui-transition ui-focus ${
        active ? "text-neutral-100" : "text-neutral-400 hover:text-neutral-200"
      }`}
    >
      {label}
    </Link>
  );
}

export default function AppNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        {/* Left */}
        <Link
          href="/roadmaps"
          className="text-sm font-semibold tracking-tight text-neutral-100"
        >
          MLSC Hub
        </Link>

        {/* Right */}
        <nav className="flex items-center gap-6">
          <NavLink href="/roadmaps" label="Roadmaps" />
          <NavLink href="/profile" label="Profile" />

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-sm text-neutral-400 hover:text-neutral-200 ui-transition ui-focus ui-press"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
