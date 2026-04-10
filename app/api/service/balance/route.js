import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import ApiKey from "@/models/ApiKey";
import { validateApiKey } from "@/lib/apiKeyAuth";
import { ensureDailyReset } from "@/lib/apiKeyUtils";

export async function GET(req) {
    try {
        const auth = await validateApiKey(req);
        if (!auth.success) {
            return NextResponse.json({ success: false, message: auth.message }, { status: 401 });
        }

        await connectDB();
        const user = await User.findById(auth.user.id);

        // API Spend Limit Calculation
        const keyDocRaw = await ApiKey.findById(auth.key.id);
        const keyDoc = await ensureDailyReset(keyDocRaw);
        const usedToday = keyDoc?.usedToday || 0;
        const dailyLimit = keyDoc?.dailyLimit || 0;

        const rate = Number(process.env.NEXT_PUBLIC_USD_RATE) || 98.5;

        return NextResponse.json({
            success: true,
            wallet: Number((user.wallet / rate).toFixed(2)),
            currency: "USD",
            userType: user.userType,
            name: user.name,
            userId: user.userId,
            usage: {
                usedToday: Number((usedToday / rate).toFixed(2)),
                dailyLimit: Number((dailyLimit / rate).toFixed(2)),
                remaining: Number((Math.max(0, dailyLimit - usedToday) / rate).toFixed(2)),
                isLimitReached: usedToday >= dailyLimit
            }
        });

    } catch (error) {
        console.error("Balance API Error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
