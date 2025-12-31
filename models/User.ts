import mongoose, { Schema, models } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3,
    },

    password: {
      type: String,
      required: true,
      select: false, // 👈 VERY IMPORTANT (security)
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

/* 🔐 Hash password before saving */
UserSchema.pre("save", async function (this: any) {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/* 🔍 Password comparison helper */
UserSchema.methods.comparePassword = async function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default models.User || mongoose.model("User", UserSchema);
