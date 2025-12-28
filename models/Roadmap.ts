import mongoose, { Schema, models, model } from "mongoose";

/* =======================
   TypeScript Interfaces
======================= */

export interface IResource {
  _id?: mongoose.Types.ObjectId;
  title: string;
  url: string;
  type: "article" | "video" | "tool";
}

export interface IRoadmapStep {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  resources: IResource[];
}

export interface IRoadmap {
  slug: string;
  title: string;
  domain: string;
  steps: IRoadmapStep[];
}

/* =======================
   Resource Schema
======================= */

const ResourceSchema = new Schema<IResource>(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["article", "video", "tool"],
      required: true,
    },
  },
  { _id: true }
);

/* =======================
   Step Schema
======================= */

const RoadmapStepSchema = new Schema<IRoadmapStep>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    resources: {
      type: [ResourceSchema], // ✅ array of subdocuments
      default: [],
    },
  },
  { _id: true }
);

/* =======================
   Roadmap Schema
======================= */

const RoadmapSchema = new Schema<IRoadmap>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    steps: {
      type: [RoadmapStepSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Roadmap = models.Roadmap || model<IRoadmap>("Roadmap", RoadmapSchema);

export default Roadmap;
