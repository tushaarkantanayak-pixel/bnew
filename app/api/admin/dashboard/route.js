import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Order from "@/models/Order";
import SupportQuery from "@/models/SupportQuery";
import ApiKey from "@/models/ApiKey";
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
            topProducts,
            totalUsersCount,
            totalOrdersCount,
            newUsersCount,
            activeUsersCount,
            totalQueriesCount,
            pendingQueriesCount,
            apiUsersCount
        ] = await Promise.all([
            // 1. Total User Wallet Balance (Current snapshot, ignores date)
            User.aggregate([
                { $match: { wallet: { $gt: 0 } } },
                { $group: { _id: null, totalBalance: { $sum: "$wallet" }, activeWalletsCount: { $sum: 1 } } }
            ]),

            // 2. Total Sell Revenue in timeframe grouped by status
            Order.aggregate([
                { 
                    $match: { 
                        createdAt: { $gte: startDate }
                    } 
                },
                { 
                    $group: { 
                        _id: { $toLower: "$paymentStatus" }, 
                        totalRevenue: { $sum: "$price" }, 
                        orderCount: { $sum: 1 } 
                    } 
                }
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
            ]),
            
            // 5. Total Users Count
            User.countDocuments({}),

            // 6. Total Orders Count (All Time)
            Order.countDocuments({}),

            // 7. New Users Count in timeframe
            User.countDocuments({ createdAt: { $gte: startDate } }),

            // 8. Active Users Count in timeframe
            User.countDocuments({ lastLogin: { $gte: startDate } }),

            // 9. Total Queries in timeframe
            SupportQuery.countDocuments({ createdAt: { $gte: startDate } }),

            // 10. Pending Queries in timeframe
            SupportQuery.countDocuments({ 
                createdAt: { $gte: startDate }, 
                status: { $in: ["open", "in_progress"] } 
            }),
            
            // 11. API Key Users
            ApiKey.distinct("userId").then(users => users.length)
        ]);

        /* ================= FORMAT RESPONSE ================= */
        return Response.json({
            success: true,
            data: {
                totalWalletBalance: walletStats[0]?.totalBalance || 0,
                activeWalletsCount: walletStats[0]?.activeWalletsCount || 0,
                totalUsers: totalUsersCount || 0,
                newUsers: newUsersCount || 0,
                activeUsers: activeUsersCount || 0,
                apiUsers: apiUsersCount || 0,
                totalQueries: totalQueriesCount || 0,
                pendingQueries: pendingQueriesCount || 0,
                totalTransactions: totalOrdersCount || 0,
                walletTotalUsers: walletStats[0]?.totalBalance || 0,
                
                // Aggregated stats from totalSalesAggregation
                totalRevenue: totalSalesAggregation.find(x => ["success", "completed"].includes(x._id))?.totalRevenue || 0,
                totalOrders: totalSalesAggregation.find(x => ["success", "completed"].includes(x._id))?.orderCount || 0,
                
                refundRevenue: totalSalesAggregation.find(x => x._id === "refund")?.totalRevenue || 0,
                refundOrders: totalSalesAggregation.find(x => x._id === "refund")?.orderCount || 0,
                
                overallRevenue: totalSalesAggregation.reduce((acc, x) => acc + (x.totalRevenue || 0), 0),
                overallOrders: totalSalesAggregation.reduce((acc, x) => acc + (x.orderCount || 0), 0),

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
