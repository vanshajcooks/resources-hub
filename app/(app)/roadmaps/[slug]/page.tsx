import { notFound, redirect } from "next/navigation";

import dbConnect from "../../../../lib/db";
import Roadmap from "../../../../models/Roadmap";
import Progress from "../../../../models/Progress";
import { auth } from "../../../../auth";

import ProgressTimeline from "../../../../components/roadmap/ProgressTimeline.client";

interface RoadmapPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function RoadmapPage({ params }: RoadmapPageProps) {
  // 🔐 Auth check
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const userId = session.user.id;
  const { slug } = await params;

  await dbConnect();

  // 📘 Fetch roadmap
  const roadmapDoc = await Roadmap.findOne({ slug });
  if (!roadmapDoc) {
    notFound();
  }

  // Convert to plain object
  const roadmap = JSON.parse(JSON.stringify(roadmapDoc));

  // 📊 Fetch progress
  const progress = await Progress.findOne({
    userId,
    roadmapId: roadmap._id,
  }).lean();

  const completedResources: string[] =
    progress?.completedResources?.map((id: any) => id.toString()) || [];

  // 🧼 Prepare safe steps for client components
  const safeSteps = roadmap.steps.map((step: any) => ({
    id: step._id.toString(),
    title: step.title,
    description: step.description,
    resources: Array.isArray(step.resources)
      ? step.resources.map((res: any) => ({
          id: res._id?.toString(),
          title: res.title,
          url: res.url,
          type: res.type,
        }))
      : [],
  }));

  // 📈 Resource-based roadmap progress (single source of truth)
  const totalResources = safeSteps.reduce(
    (acc: number, step: any) => acc + step.resources.length,
    0
  );

  const completedResourcesCount = completedResources.length;

  const roadmapProgressPercent =
    totalResources === 0
      ? 0
      : Math.round((completedResourcesCount / totalResources) * 100);

  // 🧱 UI
  return (
    <div className="space-y-12">
      {/* Back */}
      <div>
        <a
          href="/roadmaps"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-200 transition"
        >
          ← Back to Roadmaps
        </a>
      </div>

      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="h1 text-neutral-100">{roadmap.title}</h1>

          {roadmapProgressPercent === 100 && (
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
              Completed
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-400">
          <span className="rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1">
            {roadmap.domain}
          </span>
          <span className="text-neutral-500">{totalResources} resources</span>
        </div>
      </header>

      {/* Overall Progress */}
      <section className="space-y-2 max-w-xl">
        <div className="flex justify-between text-sm text-neutral-400">
          <span>Overall Progress</span>
          <span>{roadmapProgressPercent}%</span>
        </div>

        <div className="h-2 w-full rounded-full bg-neutral-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-neutral-200 transition-all duration-300"
            style={{ width: `${roadmapProgressPercent}%` }}
          />
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-neutral-800" />

      {/* Timeline */}
      <section className="space-y-6">
        <h2 className="h3 text-neutral-200">Learning Path</h2>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
          <ProgressTimeline
            roadmapId={roadmap._id.toString()}
            steps={safeSteps}
            completedResources={completedResources}
          />
        </div>
      </section>
    </div>
  );
}
