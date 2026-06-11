import { NextResponse } from "next/server";
import { validateApiKey } from "@/lib/apiKeyAuth";

export async function GET(req) {
    try {
        const auth = await validateApiKey(req);
        if (!auth.success) {
            return NextResponse.json({ success: false, message: auth.message }, { status: 401 });
        }

        // Fetching games directly from the external source as requested
        const response = await fetch("https://game-off-ten.vercel.app/api/v1/game", {
            method: "GET",
            headers: {
                "x-api-key": process.env.API_SECRET_KEY,
            },
            cache: "no-store",
        });

        const data = await response.json();

        if (!data.success) {
            return NextResponse.json({ success: false, message: "Failed to fetch source games" }, { status: 500 });
        }

        // Normalize and send the games list
        const internalGames = data.data.games.map((g) => ({
            name: g.gameName,
            slug: g.gameSlug,
            publisher: g.gameFrom,
            available: g.gameAvailablity
        }));


        return NextResponse.json({
            success: true,
            games: internalGames
        });

    } catch (error) {
        console.error("Service Games API Error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
