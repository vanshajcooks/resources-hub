import mongoose, { Schema, models, model } from "mongoose";

export interface IResource {
  title: string;
  url: string;
  category: string;
  tags: string[];
  featured: boolean;
}

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
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Resource =
  models.Resource || model<IResource>("Resource", ResourceSchema);

export default Resource;
