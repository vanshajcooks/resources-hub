"use client";

interface Resource {
  id: string;
  title: string;
  url: string;
  type: "article" | "video" | "tool";
}

interface Step {
  id: string;
  title: string;
  description?: string;
  resources: Resource[];
}

interface TimelineItemProps {
  index: number;
  step: Step;
  completedResources: string[];
  onToggleResource: (resourceId: string) => void;
}

export default function TimelineItem({
  index,
  step,
  completedResources,
  onToggleResource,
}: TimelineItemProps) {
  const totalResources = step.resources.length;

  const completedCount = step.resources.filter((res) =>
    completedResources.includes(res.id)
  ).length;

  const isCompleted = totalResources > 0 && completedCount === totalResources;

  return (
    <div
      className="
        relative space-y-6 rounded-xl
        border border-neutral-800
        bg-neutral-900/40 p-6 ui-transition hover:border-neutral-700
      "
    >
      {/* Step Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-neutral-100">
            {index}. {step.title}
          </h3>

          {step.description && (
            <p className="text-sm text-neutral-400">{step.description}</p>
          )}

          {totalResources > 0 && (
            <p className="text-xs text-neutral-500">
              {completedCount} / {totalResources} resources completed
            </p>
          )}
        </div>

        {isCompleted && (
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            Completed
          </span>
        )}
      </div>

      {/* Resources */}
      {step.resources.length > 0 && (
        <ul className="space-y-4">
          {step.resources.map((res) => {
            const checked = completedResources.includes(res.id);

            return (
              <li
                key={res.id}
                className="
                  flex items-start gap-4
                  rounded-lg
                  border border-neutral-800
                  bg-neutral-950/60 p-4 ui-transition hover:bg-neutral-900/70
                "
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleResource(res.id)}
                  className="mt-1 accent-neutral-200 ui-focus"
                />

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wide text-neutral-500">
                      {res.type}
                    </span>

                    <a
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-neutral-200 ui-transition hover:text-neutral-100"
                    >
                      {res.title}
                    </a>
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
