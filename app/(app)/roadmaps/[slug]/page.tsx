import { notFound } from "next/navigation";
import dbConnect from "../../../../lib/db";
import Roadmap from "../../../../models/Roadmap";

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

      {/* Steps */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Roadmap Steps</h2>

        <ol className="space-y-4">
          {roadmap.steps.map((step: any, index: number) => (
            <li key={step._id} className="border rounded-xl p-4">
              <div className="flex items-start gap-4">
                <span className="font-bold text-neutral-400">{index + 1}.</span>

                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>

                  {step.description && (
                    <p className="text-sm text-neutral-600 mt-1">
                      {step.description}
                    </p>
                  )}

                  {step.resources.length > 0 && (
                    <ul className="mt-2 list-disc list-inside text-sm">
                      {step.resources.map((url: string) => (
                        <li key={url}>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {url}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
