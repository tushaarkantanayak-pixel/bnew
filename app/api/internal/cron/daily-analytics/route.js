import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import WalletTransaction from "@/models/WalletTransaction";
import UserDailyAnalytics from "@/models/UserDailyAnalytics";
import User from "@/models/User";

export const dynamic = "force-dynamic";

export async function GET(request) {
    try {
        // Optional security check for Vercel Cron
        const authHeader = request.headers.get("authorization");
        if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        // Calculate stats for the day that just ended (yesterday)
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setUTCDate(now.getUTCDate() - 1);
        yesterday.setUTCHours(0, 0, 0, 0);

        const endOfYesterday = new Date(yesterday);
        endOfYesterday.setUTCHours(23, 59, 59, 999);

        // Aggregate transactions for yesterday
        const analyticsData = await WalletTransaction.aggregate([
            {
                $match: {
                    status: "success",
                    createdAt: { $gte: yesterday, $lte: endOfYesterday },
                },
            },
            {
                $group: {
                    _id: "$userId",
                    totalCredit: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "credit"] }, "$amount", 0],
                        },
                    },
                    totalDebit: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "debit"] }, "$amount", 0],
                        },
                    },
                },
            },
        ]);

        // Bulk upsert into UserDailyAnalytics
        const bulkOps = [];
        for (const data of analyticsData) {
            // Get the user's current balance 
            const user = await User.findOne({ userId: data._id }).select("wallet");
            const balance = user ? user.wallet : 0;

            bulkOps.push({
                updateOne: {
                    filter: { userId: data._id, date: yesterday },
                    update: {
                        $set: {
                            totalCredit: data.totalCredit,
                            totalDebit: data.totalDebit,
                            endOfDayBalance: balance,
                        },
                    },
                    upsert: true,
                },
            });
        }

        if (bulkOps.length > 0) {
            await UserDailyAnalytics.bulkWrite(bulkOps);
        }
        
        // Save the last updated timestamp so the UI knows when it ran
        global.analyticsLastUpdated = new Date().toISOString();

        return NextResponse.json({ 
            success: true, 
            message: `Processed ${bulkOps.length} user daily records for ${yesterday.toISOString()}`,
            lastUpdated: new Date().toISOString()
        });

    } catch (error) {
        console.error("Cron Daily Analytics Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
