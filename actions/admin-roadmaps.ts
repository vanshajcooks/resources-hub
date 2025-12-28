"use server";

import { auth } from "../auth";
import dbConnect from "../lib/db";
import Roadmap from "../models/Roadmap";
import { revalidatePath } from "next/cache";

export async function createRoadmap(formData: FormData) {
  // 🔐 Auth check
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title");
  const slug = formData.get("slug");
  const domain = formData.get("domain");

  // Basic validation
  if (
    typeof title !== "string" ||
    typeof slug !== "string" ||
    typeof domain !== "string"
  ) {
    throw new Error("Invalid form data");
  }

  await dbConnect();

  // Ensure slug is unique
  const existing = await Roadmap.findOne({ slug });
  if (existing) {
    throw new Error("Roadmap with this slug already exists");
  }

  await Roadmap.create({
    title,
    slug,
    domain,
    steps: [],
  });

  // Refresh admin dashboard
  revalidatePath("/admin");
}
export async function deleteRoadmap(formData: FormData) {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const roadmapId = formData.get("roadmapId");

  if (typeof roadmapId !== "string") {
    throw new Error("Invalid roadmap id");
  }

  await dbConnect();

  await Roadmap.findByIdAndDelete(roadmapId);

  revalidatePath("/admin");
}
export async function updateRoadmap(formData: FormData) {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const roadmapId = formData.get("roadmapId");
  const title = formData.get("title");
  const domain = formData.get("domain");
  const slug = formData.get("slug");

  if (
    typeof roadmapId !== "string" ||
    typeof title !== "string" ||
    typeof domain !== "string" ||
    typeof slug !== "string"
  ) {
    throw new Error("Invalid form data");
  }

  await dbConnect();

  // Ensure slug is unique (excluding this roadmap)
  const existing = await Roadmap.findOne({
    slug,
    _id: { $ne: roadmapId },
  });

  if (existing) {
    throw new Error("Slug already in use");
  }

  await Roadmap.findByIdAndUpdate(roadmapId, {
    title,
    domain,
    slug,
  });

  revalidatePath("/admin");
  revalidatePath(`/admin/roadmaps/${roadmapId}`);
}
export async function addStep(formData: FormData) {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const roadmapId = formData.get("roadmapId");
  const title = formData.get("title");
  const description = formData.get("description");

  if (typeof roadmapId !== "string" || typeof title !== "string") {
    throw new Error("Invalid form data");
  }

  await dbConnect();

  await Roadmap.findByIdAndUpdate(roadmapId, {
    $push: {
      steps: {
        title,
        description: typeof description === "string" ? description : "",
        resources: [],
      },
    },
  });

  revalidatePath(`/admin/roadmaps/${roadmapId}`);
}
export async function deleteStep(formData: FormData) {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const roadmapId = formData.get("roadmapId");
  const stepId = formData.get("stepId");

  if (typeof roadmapId !== "string" || typeof stepId !== "string") {
    throw new Error("Invalid form data");
  }

  await dbConnect();

  await Roadmap.findByIdAndUpdate(roadmapId, {
    $pull: {
      steps: { _id: stepId },
    },
  });

  revalidatePath(`/admin/roadmaps/${roadmapId}`);
}
export async function addResource(formData: FormData) {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const roadmapId = formData.get("roadmapId");
  const stepId = formData.get("stepId");
  const title = formData.get("title");
  const url = formData.get("url");
  const type = formData.get("type");

  if (
    typeof roadmapId !== "string" ||
    typeof stepId !== "string" ||
    typeof title !== "string" ||
    typeof url !== "string" ||
    typeof type !== "string"
  ) {
    throw new Error("Invalid form data");
  }

  if (!["article", "video", "tool"].includes(type)) {
    throw new Error("Invalid resource type");
  }

  await dbConnect();

  await Roadmap.updateOne(
    { _id: roadmapId, "steps._id": stepId },
    {
      $push: {
        "steps.$.resources": {
          title,
          url,
          type,
        },
      },
    }
  );

  revalidatePath(`/admin/roadmaps/${roadmapId}`);
}
export async function deleteResource(formData: FormData) {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const roadmapId = formData.get("roadmapId");
  const stepId = formData.get("stepId");
  const resourceId = formData.get("resourceId");

  if (
    typeof roadmapId !== "string" ||
    typeof stepId !== "string" ||
    typeof resourceId !== "string"
  ) {
    throw new Error("Invalid form data");
  }

  await dbConnect();

  await Roadmap.updateOne(
    { _id: roadmapId, "steps._id": stepId },
    {
      $pull: {
        "steps.$.resources": { _id: resourceId },
      },
    }
  );

  revalidatePath(`/admin/roadmaps/${roadmapId}`);
}
export async function moveStep(
  roadmapId: string,
  stepId: string,
  direction: "up" | "down"
) {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await dbConnect();

  const roadmap = await Roadmap.findById(roadmapId);

  if (!roadmap) {
    throw new Error("Roadmap not found");
  }

  const index = roadmap.steps.findIndex(
    (step: any) => step._id.toString() === stepId
  );

  if (index === -1) return;

  const swapWith = direction === "up" ? index - 1 : index + 1;

  if (swapWith < 0 || swapWith >= roadmap.steps.length) {
    return;
  }

  // Swap steps
  const temp = roadmap.steps[index];
  roadmap.steps[index] = roadmap.steps[swapWith];
  roadmap.steps[swapWith] = temp;

  await roadmap.save();

  revalidatePath(`/admin/roadmaps/${roadmapId}`);
  revalidatePath(`/roadmaps/${roadmap.slug}`);
}
export async function moveResource(
  roadmapId: string,
  stepId: string,
  resourceId: string,
  direction: "up" | "down"
) {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await dbConnect();

  const roadmap = await Roadmap.findById(roadmapId);

  if (!roadmap) {
    throw new Error("Roadmap not found");
  }

  const step = roadmap.steps.find((s: any) => s._id.toString() === stepId);

  if (!step || !Array.isArray(step.resources)) return;

  const index = step.resources.findIndex(
    (r: any) => r._id?.toString() === resourceId
  );

  if (index === -1) return;

  const swapWith = direction === "up" ? index - 1 : index + 1;

  if (swapWith < 0 || swapWith >= step.resources.length) {
    return;
  }

  // Swap resources
  const temp = step.resources[index];
  step.resources[index] = step.resources[swapWith];
  step.resources[swapWith] = temp;

  await roadmap.save();

  revalidatePath(`/admin/roadmaps/${roadmapId}`);
  revalidatePath(`/roadmaps/${roadmap.slug}`);
}
export async function updateStep(formData: FormData) {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const roadmapId = formData.get("roadmapId");
  const stepId = formData.get("stepId");
  const title = formData.get("title");
  const description = formData.get("description");

  if (
    typeof roadmapId !== "string" ||
    typeof stepId !== "string" ||
    typeof title !== "string"
  ) {
    throw new Error("Invalid form data");
  }

  await dbConnect();

  await Roadmap.updateOne(
    { _id: roadmapId, "steps._id": stepId },
    {
      $set: {
        "steps.$.title": title,
        "steps.$.description":
          typeof description === "string" ? description : "",
      },
    }
  );

  revalidatePath(`/admin/roadmaps/${roadmapId}`);
  revalidatePath(`/roadmaps`);
}
export async function updateResource(formData: FormData) {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const roadmapId = formData.get("roadmapId");
  const stepId = formData.get("stepId");
  const resourceId = formData.get("resourceId");
  const title = formData.get("title");
  const url = formData.get("url");
  const type = formData.get("type");

  if (
    typeof roadmapId !== "string" ||
    typeof stepId !== "string" ||
    typeof resourceId !== "string" ||
    typeof title !== "string" ||
    typeof url !== "string" ||
    typeof type !== "string"
  ) {
    throw new Error("Invalid form data");
  }

  if (!["article", "video", "tool"].includes(type)) {
    throw new Error("Invalid resource type");
  }

  await dbConnect();

  await Roadmap.updateOne(
    {
      _id: roadmapId,
      "steps._id": stepId,
      "steps.resources._id": resourceId,
    },
    {
      $set: {
        "steps.$[step].resources.$[res].title": title,
        "steps.$[step].resources.$[res].url": url,
        "steps.$[step].resources.$[res].type": type,
      },
    },
    {
      arrayFilters: [{ "step._id": stepId }, { "res._id": resourceId }],
    }
  );

  revalidatePath(`/admin/roadmaps/${roadmapId}`);
  revalidatePath(`/roadmaps`);
}

