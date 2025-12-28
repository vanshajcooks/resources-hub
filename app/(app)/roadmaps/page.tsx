import { redirect } from "next/navigation";
import Link from "next/link";

import { auth } from "../../../auth";
import dbConnect from "../../../lib/db";
import Roadmap from "../../../models/Roadmap";
import Progress from "../../../models/Progress";

export default async function RoadmapsPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  await dbConnect();

  // 📘 Fetch all roadmaps
  const roadmaps = await Roadmap.find({})
    .select("title domain slug steps")
    .lean();

  // 📊 Fetch all progress for this user
  const progressDocs = await Progress.find({
    userId: session.user.id,
  }).lean();

  // 🔁 Map progress by roadmapId for quick lookup
  const progressMap = new Map(
    progressDocs.map((p: any) => [
      p.roadmapId.toString(),
      p.completedSteps.length,
    ])
  );

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-100">
          Roadmaps
        </h1>
        <p className="text-neutral-400">
          Track your learning progress across domains
        </p>
      </header>

      {/* Roadmap List */}
      {roadmaps.length === 0 ? (
        <p className="text-neutral-500">No roadmaps available.</p>
      ) : (
        <ul className="grid gap-6">
          {roadmaps.map((roadmap: any) => {
            const totalSteps = roadmap.steps.length;
            const completedSteps = progressMap.get(roadmap._id.toString()) || 0;

            const percent =
              totalSteps === 0
                ? 0
                : Math.round((completedSteps / totalSteps) * 100);

            return (
              <li
                key={roadmap.slug}
                className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 space-y-4"
              >
                {/* Title */}
                <div className="space-y-1">
                  <h2 className="text-lg font-medium text-neutral-100">
                    <Link
                      href={`/roadmaps/${roadmap.slug}`}
                      className="hover:underline"
                    >
                      {roadmap.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-neutral-400">
                    {roadmap.domain} • {totalSteps} steps
                  </p>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>Progress</span>
                    <span>{percent}%</span>
                  </div>

                  <div className="h-1.5 w-full rounded-full bg-neutral-800">
                    <div
                      className="h-full rounded-full bg-neutral-200 transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
