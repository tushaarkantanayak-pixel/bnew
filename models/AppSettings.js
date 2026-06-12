import mongoose from "mongoose";

const AppSettingsSchema = new mongoose.Schema(
    {
        maintenanceMode: {
            type: Boolean,
            default: false,
        },
        mlbbWeeklyProvider: {
            type: String,
            enum: ["1game", "smileone"],
            default: "1game",
        },
        apiServiceEnabled: {
            type: Boolean,
            default: true,
        },
        websiteOrdersEnabled: {
            type: Boolean,
            default: true,
        },
        // We can add more settings here in the future
    },
    { timestamps: true }
);

// We only want one settings document
if (mongoose.models.AppSettings) {
    delete mongoose.models.AppSettings;
}

export default mongoose.model("AppSettings", AppSettingsSchema);
