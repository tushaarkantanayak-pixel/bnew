import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { generateUserId } from "@/lib/generateUserId";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        // 🔒 SECRET HEADER CHECK: Prevent unauthorized bot access
        const authSecret = request.headers.get("x-auth-secret");
        if (authSecret !== process.env.HYBRID_AUTH_SECRET) {
            return Response.json(
                { success: false, message: "Unauthorized access to this endpoint" },
                { status: 403 }
            );
        }

        await connectDB();
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return Response.json(
                { success: false, message: "Email and password are required" },
                { status: 400 }
            );
        }

        const normalizedEmail = email.toLowerCase().trim();

        // 1. Check if user exists
        let foundUser = await User.findOne({ email: normalizedEmail });

        if (!foundUser) {
            // 2. Register if not exists
            const hashedPassword = await bcrypt.hash(password, 10);
            const name = normalizedEmail.split("@")[0];
            const dummyPhone = Math.floor(1000000000 + Math.random() * 9000000000).toString();
            const userId = generateUserId(name, dummyPhone);

            foundUser = await User.create({
                userId,
                name,
                email: normalizedEmail,
                password: hashedPassword,
                provider: "local",
                wallet: 0,
                order: 0,
                userType: "user",
            });
        } else {
            // 3. Login check if user exists
            if (foundUser.provider === "google" && !foundUser.password) {
                // 🔒 SECURITY FIX: Prevent ATO (Account Takeover)
                // Do NOT allow setting password here blindly.
                return Response.json(
                    {
                        success: false,
                        message: "Please login with Google or use 'Forgot Password' to set a password."
                    },
                    { status: 400 }
                );
            } else {
                const isMatch = await bcrypt.compare(password, foundUser.password);
                if (!isMatch) {
                    return Response.json(
                        { success: false, message: "Invalid password for this email" },
                        { status: 401 }
                    );
                }
            }
        }

        /* ================= UPDATE LAST LOGIN ================= */
        const ip = request.headers.get("x-forwarded-for") || "unknown";
        foundUser.lastLogin = new Date();
        foundUser.lastLoginIp = ip;
        await foundUser.save();

        // 4. Generate Token
        const token = jwt.sign(
            {
                userId: foundUser._id,
                userType: foundUser.userType,
            },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );

        return Response.json(
            {
                success: true,
                message: "Authentication successful",
                token,
                user: {
                    name: foundUser.name,
                    email: foundUser.email,
                    userId: foundUser.userId,
                    userType: foundUser.userType,
                    avatar: foundUser.avatar,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Hybrid Auth Error:", error);
        return Response.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}
