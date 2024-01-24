import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
    },
    personnel: {
      type: [mongoose.Schema.Types.String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Company", CompanySchema);
