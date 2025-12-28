"use client";

import { useOptimistic, startTransition } from "react";

import AnimatedTimeline from "./AnimatedTimeline";
import Timeline from "./Timeline";
import TimelineItem from "./TimelineItem";
import { toggleResourceCompletion } from "../../actions/progress";

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

interface ProgressTimelineProps {
  roadmapId: string;
  steps: Step[];
  completedResources: string[];
}

export default function ProgressTimeline({
  roadmapId,
  steps,
  completedResources,
}: ProgressTimelineProps) {
  const [optimisticCompletedResources, toggleOptimisticResource] =
    useOptimistic(completedResources, (state: string[], resourceId: string) =>
      state.includes(resourceId)
        ? state.filter((id) => id !== resourceId)
        : [...state, resourceId]
    );

  async function onToggleResource(resourceId: string) {
    startTransition(() => {
      toggleOptimisticResource(resourceId);
    });

    await toggleResourceCompletion(roadmapId, resourceId);
  }

  return (
    <AnimatedTimeline>
      <Timeline>
        {steps.map((step, index) => (
          <TimelineItem
            key={step.id} 
            step={step}
            index={index + 1}
            completedResources={optimisticCompletedResources}
            onToggleResource={onToggleResource}
          />
        ))}
      </Timeline>
    </AnimatedTimeline>
  );
}
