import mongoose from "mongoose";

const BlocklistSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["ip", "email", "gameId"],
      required: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
    reason: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Compound index to ensure uniqueness per type
BlocklistSchema.index({ type: 1, value: 1 }, { unique: true });

export default mongoose.models.Blocklist ||
  mongoose.model("Blocklist", BlocklistSchema);
