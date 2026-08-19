import mongoose from "mongoose";

const SupportQuerySchema = new mongoose.Schema(
  {
    email: { type: String, default: null },
    phone: { type: String, required: true, trim: true },
    orderId: { type: String, default: null, trim: true },
    type: { type: String, required: true },
    message: { type: String, required: true },

    // 👇 new field
    status: {
      type: String,
      enum: ["open", "in_progress", "resolved", "closed"],
      default: "open",
    },
  },
  { timestamps: true }
);

SupportQuerySchema.index({ status: 1, createdAt: -1 });
SupportQuerySchema.index({ createdAt: -1 });
SupportQuerySchema.index({ phone: 1, createdAt: -1 });

export default mongoose.models.SupportQuery ||
  mongoose.model("SupportQuery", SupportQuerySchema);
