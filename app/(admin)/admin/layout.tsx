import { auth } from "../../../auth";
import { redirect } from "next/navigation";

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
    <div className="min-h-screen bg-neutral-50">
      {/* Admin Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Admin Panel</h2>

          <nav className="flex items-center gap-4 text-sm">
            <a href="/roadmaps" className="text-neutral-600 hover:text-black">
              View Site
            </a>

            <form action="/api/auth/signout" method="post">
              <button
                type="submit"
                className="text-neutral-600 hover:text-black"
              >
                Logout
              </button>
            </form>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto p-6">{children}</main>
    </div>
  );

}
