import dbConnect from "../../../lib/db";
import Roadmap from "../../../models/Roadmap";
import { createRoadmap, deleteRoadmap } from "../../../actions/admin-roadmaps";
import Link from "next/link";

export default async function AdminPage() {
  await dbConnect();

  const roadmaps = await Roadmap.find().lean();

  return (
    <div className="space-y-12">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Roadmaps</h1>
        <p className="text-sm text-neutral-400">
          Create, edit, and manage learning roadmaps.
        </p>
      </header>

      {/* Create Roadmap */}
      <section className="rounded-lg border border-neutral-800 bg-neutral-900 p-6 space-y-4">
        <h2 className="text-sm font-medium text-neutral-200">
          Create new roadmap
        </h2>

        <form action={createRoadmap} className="grid gap-3 max-w-md">
          <input
            type="text"
            name="title"
            placeholder="Roadmap title"
            className="rounded border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600"
            required
          />

          <input
            type="text"
            name="slug"
            placeholder="Slug (e.g. web-development)"
            className="rounded border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600"
            required
          />

          <input
            type="text"
            name="domain"
            placeholder="Domain (e.g. Web Development)"
            className="rounded border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600"
            required
          />

          <button
            type="submit"
            className="mt-2 w-fit rounded bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-white transition"
          >
            Create roadmap
          </button>
        </form>
      </section>

      {/* Existing Roadmaps */}
      <section className="rounded-lg border border-neutral-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-900 text-neutral-400">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Title</th>
              <th className="px-4 py-3 text-left font-medium">Domain</th>
              <th className="px-4 py-3 text-left font-medium">Slug</th>
              <th className="px-4 py-3 text-left font-medium">Steps</th>
              <th className="px-4 py-3 text-left font-medium">Edit</th>
              <th className="px-4 py-3 text-left font-medium">Delete</th>
            </tr>
          </thead>

          <tbody>
            {roadmaps.map((roadmap: any) => (
              <tr
                key={roadmap._id.toString()}
                className="border-t border-neutral-800 hover:bg-neutral-900/50 transition"
              >
                <td className="px-4 py-3 font-medium">{roadmap.title}</td>

                <td className="px-4 py-3 text-neutral-300">{roadmap.domain}</td>

                <td className="px-4 py-3 text-neutral-500">{roadmap.slug}</td>

                <td className="px-4 py-3 text-neutral-400">
                  {roadmap.steps.length}
                </td>

                <td className="px-4 py-3">
                  <Link
                    href={`/admin/roadmaps/${roadmap._id.toString()}`}
                    className="text-neutral-300 hover:text-white transition"
                  >
                    Edit
                  </Link>
                </td>

                <td className="px-4 py-3">
                  <form action={deleteRoadmap}>
                    <input
                      type="hidden"
                      name="roadmapId"
                      value={roadmap._id.toString()}
                    />
                    <button
                      type="submit"
                      className="text-neutral-500 hover:text-red-400 transition"
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {roadmaps.length === 0 && (
          <div className="p-4 text-sm text-neutral-500">No roadmaps found.</div>
        )}
      </section>
    </div>
  );
}
