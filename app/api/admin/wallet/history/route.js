import { connectDB } from "@/lib/mongodb";
import WalletTransaction from "@/models/WalletTransaction";
import User from "@/models/User";
import jwt from "jsonwebtoken";

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

        /* ================= QUERY PARAMS ================= */
        const { searchParams } = new URL(req.url);

        const page = Math.max(parseInt(searchParams.get("page") || "1"), 1);
        const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 100);
        const search = searchParams.get("search")?.trim();
        const type = searchParams.get("type")?.trim(); // credit or debit

        const skip = (page - 1) * limit;

        /* ================= FILTER ================= */
        let filter = {};

        if (search) {
            const matchingUsers = await User.find({ email: { $regex: search, $options: "i" } }, "_id").lean();
            const matchingUserIds = matchingUsers.map(u => u._id);

            filter.$or = [
                { transactionId: { $regex: search, $options: "i" } },
                { userId: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { referenceId: { $regex: search, $options: "i" } },
            ];

            if (matchingUserIds.length > 0) {
                filter.$or.push({ userObjectId: { $in: matchingUserIds } });
            }
        }

        if (type) {
            filter.type = type;
        }

        /* ================= QUERY ================= */
        const [transactions, total] = await Promise.all([
            WalletTransaction.find(filter)
                .populate("userObjectId", "email")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            WalletTransaction.countDocuments(filter),
        ]);

        const formattedTransactions = transactions.map(t => ({
            ...t,
            email: t.userObjectId?.email || "",
        }));

        /* ================= RESPONSE ================= */
        return Response.json({
            success: true,
            data: formattedTransactions,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (err) {
        console.error("Wallet history fetch failed", err);
        return Response.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}
