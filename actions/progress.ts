"use server";

import { auth } from "../auth";
import dbConnect from "../lib/db";
import Progress from "../models/Progress";
import { revalidatePath } from "next/cache";

export async function toggleResourceCompletion(
  roadmapId: string,
  resourceId: string
) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  await dbConnect();

  let progress = await Progress.findOne({
    userId: session.user.id,
    roadmapId,
  });

  // Create progress doc if missing
  if (!progress) {
    progress = await Progress.create({
      userId: session.user.id,
      roadmapId,
      completedResources: [],
    });
  }

  const alreadyCompleted = progress.completedResources.includes(resourceId);

  if (alreadyCompleted) {
    progress.completedResources = progress.completedResources.filter(
      (id: string) => id !== resourceId
    );
  } else {
    progress.completedResources.push(resourceId);
  }

  await progress.save();

  // Revalidate roadmap page
  revalidatePath(`/roadmaps`);
}
