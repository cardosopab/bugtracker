import mongoose, { Document } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
    },
    displayName: { type: mongoose.Schema.Types.String, required: true },
    password: { type: mongoose.Schema.Types.String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
