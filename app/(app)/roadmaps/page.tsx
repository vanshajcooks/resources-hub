import dbConnect from "../../../lib/db";
import Roadmap from "../../../models/Roadmap";
import Progress from "../../../models/Progress";
import Link from "next/link";
import { auth } from "../../../auth";

export default async function RoadmapsPage() {
  const session = await auth();

  if (!session) {
    return null;
  }

  await dbConnect();

  const roadmaps = await Roadmap.find({}).lean();
  const progressDocs = await Progress.find({
    userId: session.user.id,
  }).lean();

  // Map: roadmapId -> completedResources count
  const progressMap = new Map<string, number>(
    progressDocs.map((p: any) => [
      p.roadmapId.toString(),
      p.completedResources?.length ?? 0,
    ])
  );

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="h1 text-neutral-100">Roadmaps</h1>
        <p className="muted">Track your learning progress across domains.</p>
      </header>

      <ul className="grid gap-4">
        {roadmaps.map((roadmap: any) => {
          const totalResources = roadmap.steps.reduce(
            (acc: number, step: any) => acc + step.resources.length,
            0
          );

          const completedResources =
            progressMap.get(roadmap._id.toString()) ?? 0;

          const percent =
            totalResources === 0
              ? 0
              : Math.round((completedResources / totalResources) * 100);

          return (
            <li
              key={roadmap._id.toString()}
              className="group relative overflow-hidden rounded-xl border border-neutral-800 bg-gradient-to-b            ui-transition hover:-translate-y-[1px] hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)]"
            >
              <Link
                href={`/roadmaps/${roadmap.slug}`}
                className="relative z-10 block space-y-5 ui-transition ui-focus ui-press"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h2 className="text-lg font-medium text-neutral-100">
                      {roadmap.title}
                    </h2>
                    <p className="text-sm text-neutral-400">{roadmap.domain}</p>
                  </div>

                  {percent === 100 && (
                    <span className="shrink-0 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                      Completed
                    </span>
                  )}
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>Progress</span>
                    <span>{percent}%</span>
                  </div>

                  <div className="h-2 w-full rounded-full bg-neutral-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-neutral-200 transition-all duration-300"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </Link>

              {/* Subtle hover glow */}
              <div
                className="
    pointer-events-none absolute inset-0
    opacity-0 transition group-hover:opacity-100
    bg-[radial-gradient(400px_at_top_right,rgba(255,255,255,0.05),transparent)]
  "
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
