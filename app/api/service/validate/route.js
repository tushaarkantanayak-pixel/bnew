import { NextResponse } from "next/server";
import { validateApiKey } from "@/lib/apiKeyAuth";

export async function POST(req) {
    try {
        const auth = await validateApiKey(req);
        if (!auth.success) {
            return NextResponse.json({ success: false, message: auth.message }, { status: 401 });
        }

        const body = await req.json();
        const { gameSlug, playerId, zoneId, itemSlug } = body;

        const isMLBB = gameSlug.includes("mlbb") || gameSlug.includes("legends988") || gameSlug.includes("weeklymonthly-bundle");

        let nameData = null;
        let regionData = null;
        let isValid = false;
        let username = "Unknown";
        let region = "Global";

        // 1. Always check name for ALL games (Universal validator)
        try {
            const nameCheckResp = await fetch("https://game-off-ten.vercel.app/api/v1/check-region/namecheck", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": process.env.API_SECRET_KEY,
                },
                body: JSON.stringify({
                    productId: `${gameSlug}_${itemSlug || "default"}`,
                    playerId: String(playerId),
                    zoneId: String(zoneId || "NA"),
                }),
            });

            nameData = await nameCheckResp.json();
            if ((nameData?.success === 200 || nameData?.success === true) && (nameData?.data?.username || nameData?.data?.name) && nameData?.data?.valid !== false) {
                username = nameData?.data?.username || nameData?.data?.name || "Unknown";
                region = nameData?.data?.region || "Global";
                isValid = true;
            }
        } catch (nameErr) {
            console.error("Name check API failed:", nameErr);
        }

        // 2. Special check for MLBB to verify region
        if (isMLBB) {
            try {
                const regionCheckResp = await fetch("https://game-off-ten.vercel.app/api/v1/check-region", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": process.env.API_SECRET_KEY,
                    },
                    body: JSON.stringify({ id: String(playerId), zone: String(zoneId || "") }),
                });

                regionData = await regionCheckResp.json();
                if (regionData?.success === 200 && (regionData?.data?.username || regionData?.data?.region)) {
                    region = regionData.data.region || region;
                    username = regionData.data.username || username;
                    isValid = true;
                }
            } catch (regionErr) {
                console.error("Region check API failed:", regionErr);
            }
        }

        if (isValid) {
            // ⚡ REGION RESTRICTION CHECK (Only for specific MLBB slugs)
            const restrictedSlugs = ["mobile-legends988", "mlbb-double332", "weeklymonthly-bundle931"];
            if (restrictedSlugs.includes(gameSlug)) {
                const playerRegion = region.toUpperCase();
                const restrictedRegions = ["INDO", "ID", "PH", "SG", "RU", "MY", "MM"];

                if (restrictedRegions.includes(playerRegion)) {
                    return NextResponse.json({
                        success: false,
                        message: `Validation failed: Orders from ${playerRegion} region are not allowed for this product.`
                    }, { status: 400 });
                }
            }

            return NextResponse.json({
                success: 200,
                message: "Validation successful",
                data: {
                    username,
                    region,
                    playerId,
                    zoneId
                }
            });
        } else {
            const finalMessage = regionData?.message || nameData?.message || "Player not found. Please check your ID and Zone.";
            return NextResponse.json({
                success: false,
                message: finalMessage
            }, { status: 200 }); // Returning 200 but success: false (as per standard practice for validation result)
        }

    } catch (error) {
        console.error("Service Region Check API Error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
