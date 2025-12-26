import mongoose, { Schema, models, model } from "mongoose";

export interface IProgress {
  userId: mongoose.Types.ObjectId;
  roadmapId: mongoose.Types.ObjectId;
  completedSteps: string[];
}

const ProgressSchema = new Schema<IProgress>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roadmapId: {
      type: Schema.Types.ObjectId,
      ref: "Roadmap",
      required: true,
    },
    completedSteps: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate progress docs
ProgressSchema.index({ userId: 1, roadmapId: 1 }, { unique: true });

const Progress =
  models.Progress || model<IProgress>("Progress", ProgressSchema);

export default Progress;
