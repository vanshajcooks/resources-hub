import Link from "next/link";
import AppNavbar from "../../components/layout/AppNavbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <AppNavbar />
      <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
    </div>
  );
}