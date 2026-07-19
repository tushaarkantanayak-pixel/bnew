import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        await connectDB();

        /* ================= AUTH ================= */
        const auth = req.headers.get("authorization");
        if (!auth?.startsWith("Bearer "))
            return Response.json({ message: "Unauthorized" }, { status: 401 });

        const token = auth.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.userType !== "owner")
            return Response.json({ message: "Forbidden" }, { status: 403 });

        /* ================= PARSE PARAMS ================= */
        const url = new URL(req.url);
        const days = parseInt(url.searchParams.get("days") || "1", 10);
        
        // Calculate start date
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        startDate.setHours(0, 0, 0, 0);

        const successStatuses = ["success", "SUCCESS", "completed", "COMPLETED"];

        /* ================= FETCH AGGREGATIONS ================= */
        const [
            walletStats,
            totalSalesAggregation,
            topCustomers,
            topProducts
        ] = await Promise.all([
            // 1. Total User Wallet Balance (Current snapshot, ignores date)
            User.aggregate([
                { $match: { wallet: { $gt: 0 } } },
                { $group: { _id: null, totalBalance: { $sum: "$wallet" } } }
            ]),

            // 2. Total Sell Revenue in timeframe
            Order.aggregate([
                { 
                    $match: { 
                        paymentStatus: { $in: successStatuses },
                        createdAt: { $gte: startDate }
                    } 
                },
                { $group: { _id: null, totalRevenue: { $sum: "$price" }, orderCount: { $sum: 1 } } }
            ]),

            // 3. Top Customers in timeframe
            Order.aggregate([
                { 
                    $match: { 
                        paymentStatus: { $in: successStatuses },
                        createdAt: { $gte: startDate }
                    } 
                },
                { 
                    $group: { 
                        _id: "$email", // Group by email
                        userId: { $first: "$userId" },
                        totalSpent: { $sum: "$price" },
                        ordersCount: { $sum: 1 }
                    } 
                },
                { $sort: { totalSpent: -1 } },
                { $limit: 10 }
            ]),

            // 4. Top Selling Products in timeframe
            Order.aggregate([
                { 
                    $match: { 
                        paymentStatus: { $in: successStatuses },
                        createdAt: { $gte: startDate }
                    } 
                },
                { 
                    $group: { 
                        _id: { gameSlug: "$gameSlug", itemName: "$itemName" },
                        totalRevenue: { $sum: "$price" },
                        unitsSold: { $sum: 1 }
                    } 
                },
                { $sort: { unitsSold: -1 } },
                { $limit: 10 },
                { 
                    $project: {
                        _id: 0,
                        gameSlug: "$_id.gameSlug",
                        itemName: "$_id.itemName",
                        totalRevenue: 1,
                        unitsSold: 1
                    }
                }
            ])
        ]);

        /* ================= FORMAT RESPONSE ================= */
        return Response.json({
            success: true,
            data: {
                walletTotalUsers: walletStats[0]?.totalBalance || 0,
                totalRevenue: totalSalesAggregation[0]?.totalRevenue || 0,
                totalOrders: totalSalesAggregation[0]?.orderCount || 0,
                topCustomers: topCustomers.map(c => ({
                    email: c._id || c.userId || "Unknown",
                    totalSpent: c.totalSpent,
                    ordersCount: c.ordersCount
                })),
                topProducts: topProducts
            },
        });
    } catch (err) {
        console.error("Dashboard Stats fetch failed", err);
        return Response.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}
