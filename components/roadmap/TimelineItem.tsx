"use client";

import { useState } from "react";

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
  step: Step;
  index: number;
  completedResources: string[];
  onToggleResource: (resourceId: string) => void;
}

export default function TimelineItem({
  step,
  index,
  completedResources,
  onToggleResource,
}: TimelineItemProps) {
  const [open, setOpen] = useState(false);

  const totalResources = step.resources.length;
  const completedCount = step.resources.filter((r) =>
    completedResources.includes(r.id)
  ).length;

  const percent =
    totalResources === 0
      ? 0
      : Math.round((completedCount / totalResources) * 100);

  const isCompleted = totalResources > 0 && completedCount === totalResources;

  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900/40">
      {/* Topic Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left"
      >
        <div className="space-y-1">
          <h3
            className={`text-sm font-medium ${
              isCompleted ? "text-neutral-400 line-through" : "text-neutral-100"
            }`}
          >
            {index}. {step.title}
          </h3>

          {step.description && (
            <p className="text-xs text-neutral-500">{step.description}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-400">
            {completedCount}/{totalResources}
          </span>

          <svg
            className={`h-4 w-4 text-neutral-400 transition-transform ${
              open ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.292l3.71-4.06a.75.75 0 111.1 1.02l-4.25 4.65a.75.75 0 01-1.1 0L5.21 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </button>

      {/* Resources */}
      {open && (
        <ul className="border-t border-neutral-800 px-4 py-3 space-y-2">
          {step.resources.map((res) => {
            const checked = completedResources.includes(res.id);

            return (
              <li key={res.id} className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleResource(res.id)}
                  className="mt-1 accent-neutral-200"
                />

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs uppercase text-neutral-500">
                    [{res.type}]
                  </span>

                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`hover:underline ${
                      checked
                        ? "text-neutral-400 line-through"
                        : "text-neutral-200"
                    }`}
                  >
                    {res.title}
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
