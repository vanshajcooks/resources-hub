import mongoose, { Schema, models, model } from "mongoose";

export interface IRoadmapStep {
  _id: string;
  title: string;
  description?: string;
  resources: string[];
}

export interface IRoadmap {
  slug: string;
  title: string;
  domain: string;
  steps: IRoadmapStep[];
}

const RoadmapStepSchema = new Schema<IRoadmapStep>(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    resources: [String],
  },
  { _id: true }
);

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
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Roadmap = models.Roadmap || model<IRoadmap>("Roadmap", RoadmapSchema);
export default Roadmap;
