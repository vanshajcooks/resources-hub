import dbConnect from "../../../lib/db";
import Roadmap from "../../../models/Roadmap";
import Progress from "../../../models/Progress";
import Link from "next/link";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

export default async function RoadmapsPage() {
  // 🔐 Auth guard
  const session = await auth();
  if (!session) redirect("/login");

  const userId = session.user.id;

  await dbConnect();

  // 📘 Fetch all roadmaps
  const roadmaps = await Roadmap.find({})
    .select("title domain slug steps")
    .lean();

  // 📊 Fetch progress for this user
  const progressDocs = await Progress.find({ userId }).lean();

  // Map: roadmapId → completed resource count
  const progressMap = new Map<string, number>(
    progressDocs.map((p: any) => [
      p.roadmapId.toString(),
      Array.isArray(p.completedResources) ? p.completedResources.length : 0,
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
          Track your learning progress across domains.
        </p>
      </header>

      {/* Roadmap Cards */}
      <ul className="grid gap-4">
        {roadmaps.map((roadmap: any) => {
          // 🧮 Total resources
          const totalResources = roadmap.steps.reduce(
            (acc: number, step: any) =>
              acc + (Array.isArray(step.resources) ? step.resources.length : 0),
            0
          );

          const completedResources =
            progressMap.get(roadmap._id.toString()) ?? 0;

          const progressPercent =
            totalResources === 0
              ? 0
              : Math.round((completedResources / totalResources) * 100);

          return (
            <li
              key={roadmap._id.toString()}
              className="
                group relative overflow-hidden rounded-xl
                border border-neutral-800 bg-neutral-900/60
                transition hover:-translate-y-[1px]
                hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)]
              "
            >
              <Link
                href={`/roadmaps/${roadmap.slug}`}
                className="relative z-10 block space-y-5 p-5
                           focus:outline-none focus-visible:ring-2
                           focus-visible:ring-neutral-700"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h2 className="text-lg font-medium text-neutral-100">
                      {roadmap.title}
                    </h2>
                    <p className="text-sm text-neutral-400">{roadmap.domain}</p>
                  </div>

                  {progressPercent === 100 && (
                    <span className="shrink-0 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                      Completed
                    </span>
                  )}
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>Progress</span>
                    <span>{progressPercent}%</span>
                  </div>

                  <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-800">
                    <div
                      className="h-full rounded-full bg-neutral-200 transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-1 text-sm font-medium text-neutral-300">
                  {progressPercent > 0 ? "Continue →" : "Start →"}
                </div>
              </Link>

              {/* Subtle hover glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0
                           opacity-0 transition group-hover:opacity-100
                           bg-[radial-gradient(400px_at_top_right,rgba(255,255,255,0.05),transparent)]"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
