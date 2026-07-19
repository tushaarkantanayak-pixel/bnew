import { NextResponse } from "next/server";

// Simple proxy — fetches raw game data from the external API.
// No disabled-item filtering. Used exclusively by the admin Products tab.
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug")?.trim();

    if (!slug) {
        return NextResponse.json({ success: false, message: "Missing slug" }, { status: 400 });
    }

    try {
        const res = await fetch(
            `https://game-off-ten.vercel.app/api/v1/game/${slug}`,
            {
                headers: { "x-api-key": process.env.API_SECRET_KEY },
                cache: "no-store",
            }
        );

        if (!res.ok) {
            const text = await res.text();
            console.error(`[game-items] External API error ${res.status}:`, text);
            return NextResponse.json(
                { success: false, message: `External API returned ${res.status}` },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);

    } catch (err) {
        console.error("[game-items] fetch failed:", err);
        return NextResponse.json(
            { success: false, message: "Failed to reach external API", detail: err.message },
            { status: 502 }
        );
    }
}
