import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  selectedIcon: {
    type: String,
    enum: ["rock", "paper", "scissors"],
    required: true,
  },
});

const MatchSchema = new mongoose.Schema({
  players: [PlayerSchema],
  result: { 
    type: String, 
    required: true },
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
