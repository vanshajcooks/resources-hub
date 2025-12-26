"use client";

import AnimatedTimeline from "./AnimatedTimeline";
import Timeline from "./Timeline";
import TimelineItem from "./TimelineItem";
import { toggleStepCompletion } from "../../actions/progress";
import { useOptimistic, startTransition } from "react";


interface Step {
  id: string; // ✅ now a plain string
  title: string;
  description?: string;
  resources: string[];
}

interface ProgressTimelineProps {
  roadmapId: string;
  steps: Step[];
  completedSteps: string[];
}

export default function ProgressTimeline({
  roadmapId,
  steps,
  completedSteps,
}: ProgressTimelineProps) {
  const [optimisticCompleted, toggleOptimistic] = useOptimistic(
    completedSteps,
    (state: string[], stepId: string) => {
      return state.includes(stepId)
        ? state.filter((id) => id !== stepId)
        : [...state, stepId];
    }
  );

  async function onToggle(stepId: string) {
    startTransition(() => {
      toggleOptimistic(stepId);
    });

    await toggleStepCompletion(roadmapId, stepId);
  }

  return (
    <AnimatedTimeline>
      <Timeline>
        {steps.map((step, index) => (
          <TimelineItem
            key={step.id}
            index={index + 1}
            title={step.title}
            description={step.description}
            resources={step.resources}
            completed={optimisticCompleted.includes(step.id)}
            onToggle={() => onToggle(step.id)}
          />
        ))}
      </Timeline>
    </AnimatedTimeline>
  );
}
