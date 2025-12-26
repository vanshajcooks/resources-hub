import dbConnect from "../../../lib/db";
import Roadmap from "../../../models/Roadmap";

export default async function AdminPage() {
  await dbConnect();

  const roadmaps = await Roadmap.find().lean();

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-neutral-500">Create and manage roadmaps.</p>
      </div>

      {/* Create Roadmap (UI only for now) */}
      <section className="border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold">Create New Roadmap</h2>

        <form className="grid gap-4 max-w-md">
          <input
            type="text"
            name="title"
            placeholder="Roadmap title"
            className="border px-3 py-2 rounded"
            required
          />

          <input
            type="text"
            name="slug"
            placeholder="Slug (e.g. web-development)"
            className="border px-3 py-2 rounded"
            required
          />

          <input
            type="text"
            name="domain"
            placeholder="Domain (e.g. Web Dev)"
            className="border px-3 py-2 rounded"
            required
          />

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
            disabled
          >
            Create Roadmap (Coming next)
          </button>
        </form>
      </section>

      {/* Existing Roadmaps */}
      <section className="border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-neutral-100">
            <tr>
              <th className="text-left px-4 py-2">Title</th>
              <th className="text-left px-4 py-2">Domain</th>
              <th className="text-left px-4 py-2">Slug</th>
              <th className="text-left px-4 py-2">Steps</th>
            </tr>
          </thead>

          <tbody>
            {roadmaps.map((roadmap: any) => (
              <tr key={roadmap._id.toString()} className="border-t">
                <td className="px-4 py-2 font-medium">{roadmap.title}</td>
                <td className="px-4 py-2">{roadmap.domain}</td>
                <td className="px-4 py-2 text-neutral-500">{roadmap.slug}</td>
                <td className="px-4 py-2">{roadmap.steps.length}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {roadmaps.length === 0 && (
          <div className="p-4 text-neutral-500">No roadmaps found.</div>
        )}
      </section>
    </div>
  );
}
