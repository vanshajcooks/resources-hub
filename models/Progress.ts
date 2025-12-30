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

    // ✅ Store RESOURCE IDS as STRINGS (not ObjectIds)
    completedResources: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// One progress doc per user per roadmap
ProgressSchema.index({ userId: 1, roadmapId: 1 }, { unique: true });

export default models.Progress || mongoose.model("Progress", ProgressSchema);
