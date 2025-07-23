import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const participentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: Number,
    required: true
  },
  members: {
    type: [memberSchema],
    default: []
  }
}, { timestamps: true });

export default mongoose.model("Participent", participentSchema);
