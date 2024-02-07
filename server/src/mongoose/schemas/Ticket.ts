import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
  {
    title: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    description: {
      type: mongoose.Schema.Types.String,
      default: "",
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    submitterId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    personnelId: {
      type: mongoose.Schema.Types.ObjectId,
      default: "",
    },
    priority: {
      type: mongoose.Schema.Types.String,
      default: "",
    },
    status: {
      type: mongoose.Schema.Types.String,
      default: "",
    },
    type: {
      type: mongoose.Schema.Types.String,
      default: "",
    },
    comments: {
      type: [
        {
          _id: String,
          parentId: String,
          message: String,
          createdAt: Date,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", TicketSchema);
