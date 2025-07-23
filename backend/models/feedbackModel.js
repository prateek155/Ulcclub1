import mongoose  from  "mongoose";

const feedbackSchema = new mongoose.Schema(
    {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userRole: {
      type: Number,
      required: true,
      enum: [0, 1, 2], // 0: user, 1: admin, 2: president
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "in-progress", "resolved"],
    },
    priority: {
      type: String,
      default: "medium",
      enum: ["low", "medium", "high"],
    },
    response: {
      type: String,
      default: "",
    },
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    }
  },
   { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);