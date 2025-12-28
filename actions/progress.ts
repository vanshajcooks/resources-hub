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

  if (!progress) {
    progress = await Progress.create({
      userId: session.user.id,
      roadmapId,
      completedResources: [],
    });
  }

  const alreadyCompleted = progress.completedResources.some(
    (id: any) => id.toString() === resourceId
  );

  if (alreadyCompleted) {
    progress.completedResources = progress.completedResources.filter(
      (id: any) => id.toString() !== resourceId
    );
  } else {
    progress.completedResources.push(resourceId);
  }

  await progress.save();

  // 🔥 THIS FIXES THE SNAP-BACK
  revalidatePath(`/roadmaps/${roadmapId}`);
}
