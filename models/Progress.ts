import mongoose, { Schema, models } from "mongoose";

const ProgressSchema = new Schema(
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
    completedResources: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

ProgressSchema.index({ userId: 1, roadmapId: 1 }, { unique: true });

export default models.Progress || mongoose.model("Progress", ProgressSchema);
