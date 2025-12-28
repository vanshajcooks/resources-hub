import { redirect } from "next/navigation";

import { auth } from "../../../auth";
import dbConnect from "../../../lib/db";
import Roadmap from "../../../models/Roadmap";
import Progress from "../../../models/Progress";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  await dbConnect();

  const roadmaps = await Roadmap.find({}).lean();
  const progressDocs = await Progress.find({
    userId: session.user.id,
  }).lean();

  // Map: roadmapId -> completed resources count
  const progressMap = new Map<string, number>(
    progressDocs.map((p: any) => [
      p.roadmapId.toString(),
      p.completedResources?.length ?? 0,
    ])
  );

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="h1 text-neutral-100">Your Progress</h1>
        <p className="muted">Track your learning across all roadmaps.</p>
      </header>

      {/* Roadmap Progress List */}
      <div className="grid gap-4">
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
            <div
              key={roadmap._id.toString()}
              className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium text-neutral-100">
                    {roadmap.title}
                  </h2>
                  <p className="text-sm text-neutral-400">{roadmap.domain}</p>
                </div>

                {percent === 100 && (
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                    Completed
                  </span>
                )}
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>Progress</span>
                  <span>{percent}%</span>
                </div>

                <div className="h-2 w-full rounded-full bg-neutral-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-neutral-200 transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}

        {roadmaps.length === 0 && (
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-10 text-center">
            <p className="text-neutral-300">No progress yet.</p>
            <p className="mt-2 text-sm text-neutral-500">
              Start a roadmap to see your progress here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
