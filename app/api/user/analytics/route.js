import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import WalletTransaction from "@/models/WalletTransaction";
import UserDailyAnalytics from "@/models/UserDailyAnalytics";
import Order from "@/models/Order";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function GET(req) {
    try {
        await connectDB();

        /* ================= AUTH ================= */
        const auth = req.headers.get("authorization");
        if (!auth?.startsWith("Bearer ")) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        let decoded;
        try {
            const token = auth.split(" ")[1];
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        const { userId: decodedUserId } = decoded;

        // The JWT stores the MongoDB _id as 'userId'. 
        // We need the custom 'userId' string (e.g. 'USER123') to query WalletTransaction and Order.
        const user = await User.findById(decodedUserId).select("userId");
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }
        
        const userId = user.userId;

        /* ================= PARAMS ================= */
        const { searchParams } = new URL(req.url);
        const range = searchParams.get("range"); // "1d", "7d", "30d"
        const fromDate = searchParams.get("from");
        const toDate = searchParams.get("to");

        let chartData = [];
        let totalCredit = 0;
        let totalDebit = 0;
        const lastUpdated = global.analyticsLastUpdated || new Date(new Date().setUTCHours(0,0,0,0)).toISOString();

        let start;
        let end;

        if (fromDate && toDate) {
            // CUSTOM DATE RANGE -> Calculate on the fly
            start = new Date(fromDate);
            start.setUTCHours(0, 0, 0, 0);
            
            end = new Date(toDate);
            end.setUTCHours(23, 59, 59, 999);
            
            // Limit custom queries to 180 days (6 months)
            const diffDays = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24));
            if (diffDays > 180) {
                return NextResponse.json({ success: false, message: "Date range exceeds 6 months maximum" }, { status: 400 });
            }

            const txns = await WalletTransaction.aggregate([
                {
                    $match: {
                        userId,
                        status: "success",
                        createdAt: { $gte: start, $lte: end },
                    },
                },
                {
                    $group: {
                        _id: {
                            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                        },
                        credit: { $sum: { $cond: [{ $eq: ["$type", "credit"] }, "$amount", 0] } },
                        debit: { $sum: { $cond: [{ $eq: ["$type", "debit"] }, "$amount", 0] } }
                    }
                },
                { $sort: { "_id": 1 } }
            ]);

            for (const day of txns) {
                totalCredit += day.credit;
                totalDebit += day.debit;
                chartData.push({
                    date: day._id,
                    credit: day.credit,
                    debit: day.debit
                });
            }
        } else {
            // PRESET RANGE -> Fetch from pre-calculated midnight stats
            let days = 7;
            if (range === "1d") days = 1;
            if (range === "30d") days = 30;

            const cutoff = new Date();
            cutoff.setUTCDate(cutoff.getUTCDate() - days);
            cutoff.setUTCHours(0, 0, 0, 0);

            start = cutoff;
            end = new Date(); // now

            const dailyStats = await UserDailyAnalytics.find({
                userId,
                date: { $gte: cutoff }
            }).sort({ date: 1 }).lean();

            // Fill in missing days with 0 so the chart looks nice
            const dateMap = {};
            for (const stat of dailyStats) {
                const dateStr = stat.date.toISOString().split("T")[0];
                dateMap[dateStr] = stat;
            }

            for (let i = days - 1; i >= 0; i--) {
                const d = new Date();
                // Usually we show up to yesterday for pre-calculated stats
                d.setUTCDate(d.getUTCDate() - (i + 1));
                const dateStr = d.toISOString().split("T")[0];

                if (dateMap[dateStr]) {
                    const stat = dateMap[dateStr];
                    totalCredit += stat.totalCredit;
                    totalDebit += stat.totalDebit;
                    chartData.push({
                        date: dateStr,
                        credit: stat.totalCredit,
                        debit: stat.totalDebit
                    });
                } else {
                    chartData.push({
                        date: dateStr,
                        credit: 0,
                        debit: 0
                    });
                }
            }
        }

        // Fetch User's Top 5 Most Purchased Items
        const topSoldItems = await Order.aggregate([
            { 
                $match: { 
                    userId,
                    status: "success",
                    createdAt: { $gte: start, $lte: end }
                } 
            },
            {
                $group: {
                    _id: { item: "$itemName", game: "$gameSlug" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        const topItems = topSoldItems.map(item => ({
            name: item._id.item || "Unknown Item",
            game: item._id.game || "Unknown Game",
            sold: item.count
        }));

        return NextResponse.json({
            success: true,
            totalCredit,
            totalDebit,
            chartData,
            topItems,
            lastUpdated
        });

    } catch (error) {
        console.error("Analytics Error:", error);
        return NextResponse.json(
            { success: false, message: "Server error fetching analytics", error: error.message, stack: error.stack },
            { status: 500 }
        );
    }
}
