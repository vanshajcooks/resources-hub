export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-neutral-100 flex items-center justify-center">
      {children}
    </main>
  );
}
