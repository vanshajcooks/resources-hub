import { notFound } from "next/navigation";

import dbConnect from "../../../../lib/db";
import Roadmap from "../../../../models/Roadmap";
import Progress from "../../../../models/Progress";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";


import ProgressTimeline from "../../../../components/roadmap/ProgressTimeline.client";

interface RoadmapPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function RoadmapPage({ params }: RoadmapPageProps) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const userId = session.user.id;
  
  const { slug } = await params;

  await dbConnect();

  const roadmap = await Roadmap.findOne({ slug }).lean();

  if (!roadmap) {
    notFound();
  }

  const progress = await Progress.findOne({
    userId: userId,
    roadmapId: roadmap._id,
  }).lean();

  const completedSteps = progress?.completedSteps || [];

  const safeSteps = roadmap.steps.map((step: any) => ({
    id: step._id.toString(), // ✅ convert ObjectId
    title: step.title,
    description: step.description,
    resources: step.resources,
  }));


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{roadmap.title}</h1>
        <p className="text-neutral-500 mt-2">{roadmap.domain}</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Roadmap Timeline</h2>

        <ProgressTimeline
          roadmapId={roadmap._id.toString()}
          steps={safeSteps}
          completedSteps={completedSteps}
        />
      </div>
    </div>
  );
}
