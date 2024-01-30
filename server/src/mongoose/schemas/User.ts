import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
    },
    role: {
      type: mongoose.Schema.Types.String,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    password: { type: mongoose.Schema.Types.String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
