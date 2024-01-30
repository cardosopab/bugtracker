import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
    },
    description: {
      type: mongoose.Schema.Types.String,
    },
    personnel: {
      type: [mongoose.Schema.Types.ObjectId],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);
