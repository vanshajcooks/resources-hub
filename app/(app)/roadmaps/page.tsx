import dbConnect from "../../../lib/db";
import Roadmap from "../../../models/Roadmap";
import Link from "next/link";


export default async function RoadmapsPage() {
  await dbConnect();

  const roadmaps = await Roadmap.find({})
    .select("title domain slug steps")
    .lean();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Roadmaps</h1>

      {roadmaps.length === 0 ? (
        <p className="text-neutral-500">No roadmaps available.</p>
      ) : (
        <ul className="grid gap-4">
          {roadmaps.map((roadmap) => (
            <li
              key={roadmap.slug}
              className="border rounded-xl p-4 hover:shadow transition"
            >
              <h2 className="text-xl font-semibold">
                <Link
                  href={`/roadmaps/${roadmap.slug}`}
                  className="hover:underline"
                >
                  {roadmap.title}
                </Link>
              </h2>

              <p className="text-sm text-neutral-500">{roadmap.domain}</p>

              <p className="text-sm mt-2">Steps: {roadmap.steps.length}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
