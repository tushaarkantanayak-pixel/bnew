import { connectDB } from "@/lib/mongodb";
import AppSettings from "@/models/AppSettings";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

/* ================= AUTH HELPERS ================= */
const requireOwner = (req) => {
    const auth = req.headers.get("authorization");
    if (!auth || !auth.startsWith("Bearer ")) return { error: "Unauthorized", status: 401 };
    try {
        const token = auth.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.userType !== "owner") return { error: "Forbidden", status: 403 };
        return { decoded };
    } catch {
        return { error: "Invalid token", status: 401 };
    }
};

/* ================= GET DISABLED ITEMS ================= */
export async function GET(req) {
    try {
        await connectDB();

        const authCheck = requireOwner(req);
        if (authCheck.error) {
            return NextResponse.json(
                { success: false, message: authCheck.error },
                { status: authCheck.status }
            );
        }

        let settings = await AppSettings.findOne({});
        if (!settings) {
            settings = await AppSettings.create({});
        }

        return NextResponse.json({
            success: true,
            data: settings.disabledItems,
        });
    } catch (err) {
        console.error("GET disabled-items error:", err);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}

/* ================= UPDATE DISABLED ITEMS ================= */
export async function PATCH(req) {
    try {
        await connectDB();

        const authCheck = requireOwner(req);
        if (authCheck.error) {
            return NextResponse.json(
                { success: false, message: authCheck.error },
                { status: authCheck.status }
            );
        }

        const body = await req.json();
        const { itemKey, disabled } = body;

        if (!itemKey || typeof itemKey !== "string") {
            return NextResponse.json(
                { success: false, message: "itemKey is required and must be a string" },
                { status: 400 }
            );
        }

        if (typeof disabled !== "boolean") {
            return NextResponse.json(
                { success: false, message: "disabled must be a boolean" },
                { status: 400 }
            );
        }

        let settings = await AppSettings.findOne({});
        if (!settings) {
            settings = new AppSettings({});
        }

        if (disabled) {
            // Add itemKey if not already present
            if (!settings.disabledItems.includes(itemKey)) {
                settings.disabledItems.push(itemKey);
            }
        } else {
            // Remove itemKey from the array
            settings.disabledItems = settings.disabledItems.filter((key) => key !== itemKey);
        }

        await settings.save();
        revalidateTag("app-settings");

        return NextResponse.json({
            success: true,
            message: "Disabled items updated successfully",
            data: settings.disabledItems,
        });
    } catch (err) {
        console.error("PATCH disabled-items error:", err);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
