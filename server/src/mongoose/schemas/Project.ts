import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.String,
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
      type: [mongoose.Schema.Types.String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);
