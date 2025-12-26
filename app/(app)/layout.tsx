export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* Navbar placeholder */}
      <header className="border-b p-4 font-bold">MLSC Hub</header>

      <main className="p-6">{children}</main>
    </div>
  );
}
