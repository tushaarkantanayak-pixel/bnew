import { connectDB } from "@/lib/mongodb";
import Blocklist from "@/models/Blocklist";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const requireOwner = (req) => {
    const auth = req.headers.get("authorization");
    if (!auth || !auth.startsWith("Bearer ")) {
        return { error: "Unauthorized", status: 401 };
    }
    try {
        const token = auth.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.userType !== "owner") {
            return { error: "Forbidden", status: 403 };
        }
        return { decoded };
    } catch {
        return { error: "Invalid token", status: 401 };
    }
};

export async function GET(req) {
    try {
        await connectDB();
        const authCheck = requireOwner(req);
        if (authCheck.error) {
            return NextResponse.json({ success: false, message: authCheck.error }, { status: authCheck.status });
        }

        const url = new URL(req.url);
        const type = url.searchParams.get("type");
        const query = type ? { type } : {};

        const blocklist = await Blocklist.find(query).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: blocklist });
    } catch (err) {
        console.error("GET blocklist error:", err);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const authCheck = requireOwner(req);
        if (authCheck.error) {
            return NextResponse.json({ success: false, message: authCheck.error }, { status: authCheck.status });
        }

        const { type, value, reason } = await req.json();

        if (!type || !value) {
            return NextResponse.json({ success: false, message: "Type and value are required" }, { status: 400 });
        }

        let normalizedValue = value.trim();
        if (type === "email") normalizedValue = normalizedValue.toLowerCase();

        const exists = await Blocklist.findOne({ type, value: normalizedValue });
        if (exists) {
            return NextResponse.json({ success: false, message: "This entry is already blocked" }, { status: 400 });
        }

        const newEntry = await Blocklist.create({ type, value: normalizedValue, reason });
        return NextResponse.json({ success: true, message: "Added to blocklist", data: newEntry });
    } catch (err) {
        console.error("POST blocklist error:", err);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await connectDB();
        const authCheck = requireOwner(req);
        if (authCheck.error) {
            return NextResponse.json({ success: false, message: authCheck.error }, { status: authCheck.status });
        }

        const url = new URL(req.url);
        const id = url.searchParams.get("id");

        if (!id) {
            return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
        }

        await Blocklist.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: "Removed from blocklist" });
    } catch (err) {
        console.error("DELETE blocklist error:", err);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
