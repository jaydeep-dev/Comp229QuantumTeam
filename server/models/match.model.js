import mongoose from "mongoose";

const MatchSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  opponent1: String,
  opponent2: String,
  points: Number,
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("Match", MatchSchema);
