import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    personnel: {
      type: [mongoose.Schema.Types.ObjectId],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Company", CompanySchema);
