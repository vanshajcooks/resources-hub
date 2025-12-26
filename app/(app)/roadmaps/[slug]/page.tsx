import { notFound } from "next/navigation";
import dbConnect from "../../../../lib/db";
import Roadmap from "../../../../models/Roadmap";
import Timeline from "../../../../components/roadmap/Timeline";
import TimelineItem from "../../../../components/roadmap/TimelineItem";
import AnimatedTimeline from "../../../../components/roadmap/AnimatedTimeline";



interface RoadmapPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function RoadmapPage({ params }: RoadmapPageProps) {
  // ✅ UNWRAP params
  const { slug } = await params;

  await dbConnect();

  const roadmap = await Roadmap.findOne({ slug }).lean();

  if (!roadmap) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{roadmap.title}</h1>
        <p className="text-neutral-500 mt-2">{roadmap.domain}</p>
      </div>

      {/* Animated Timeline */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Roadmap Timeline</h2>

        <AnimatedTimeline>
          <Timeline>
            {roadmap.steps.map((step: any, index: number) => (
              <TimelineItem
                key={step._id}
                index={index + 1}
                title={step.title}
                description={step.description}
                resources={step.resources}
              />
            ))}
          </Timeline>
        </AnimatedTimeline>
      </div>
    </div>
  );
}
