"use server";

import { auth } from "../auth";
import dbConnect from "../lib/db";
import Progress from "../models/Progress";
import { revalidatePath } from "next/cache";

export async function toggleStepCompletion(roadmapId: string, stepId: string) {
  // 🔐 Get session on the server
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  await dbConnect();

  let progress = await Progress.findOne({
    userId,
    roadmapId,
  });

  if (!progress) {
    progress = new Progress({
      userId,
      roadmapId,
      completedSteps: [],
    });
  }

  const isCompleted = progress.completedSteps.includes(stepId);

  progress.completedSteps = isCompleted
    ? progress.completedSteps.filter((id: string) => id !== stepId)
    : [...progress.completedSteps, stepId];

  await progress.save();

  // 🔁 Refresh UI
  revalidatePath("/roadmaps");
  revalidatePath(`/roadmaps/${roadmapId}`);
}
