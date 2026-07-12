import mongoose from "mongoose";

const UserDailyAnalyticsSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            index: true,
        },
        date: {
            type: Date, // Normalized to midnight UTC
            required: true,
        },
        totalCredit: {
            type: Number,
            default: 0,
        },
        totalDebit: {
            type: Number,
            default: 0,
        },
        endOfDayBalance: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

// Compound index to quickly find a user's analytics for a date range
UserDailyAnalyticsSchema.index({ userId: 1, date: -1 });

// Ensure one record per user per day
UserDailyAnalyticsSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.models.UserDailyAnalytics ||
    mongoose.model("UserDailyAnalytics", UserDailyAnalyticsSchema);
