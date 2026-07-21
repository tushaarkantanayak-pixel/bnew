import PricingConfig from "@/models/PricingConfig";

/* ================= STATIC CONFIGS ================= */




export const BGMI_CONFIG = {
    itemId: [
        { itemSlug: "bgmi-60", itemName: "60 UC", sellingPrice: 73 },
        { itemSlug: "bgmi-325", itemName: "325 UC", sellingPrice: 365 },
        { itemSlug: "bgmi-660", itemName: "660 UC", sellingPrice: 720 },
        { itemSlug: "bgmi-1800", itemName: "1800 UC", sellingPrice: 1800 },
        { itemSlug: "bgmi-3850", itemName: "3850 UC", sellingPrice: 2650 },
        { itemSlug: "bgmi-8100", itemName: "8100 UC", sellingPrice: 7200 },
    ],
};

const resolvePricingRole = (role) => {
    if (["user", "member"].includes(role)) return role;
    return null; // owner → base price
};

export async function calculateItemPrice(gameSlug, itemSlug, userType) {
    let baseItem = null;
    let itemName = "";

    // 1. Check local static configs
    if (gameSlug === "bgmi-manual") {
        baseItem = BGMI_CONFIG.itemId.find((i) => i.itemSlug === itemSlug);
    }

    // 2. If not found locally, fetch from external API
    if (!baseItem) {
        try {
            const response = await fetch(
                `https://game-off-ten.vercel.app/api/v1/game/${gameSlug}`,
                {
                    headers: { "x-api-key": process.env.API_SECRET_KEY },
                }
            );
            const data = await response.json();
            if (data?.success && data.data?.itemId) {
                baseItem = data.data.itemId.find((i) => i.itemSlug === itemSlug);
            }
        } catch (error) {
            console.error("External API Price Fetch Error:", error);
        }
    }

    if (!baseItem) return null;

    itemName = baseItem.itemName || itemSlug;
    const basePrice = Number(baseItem.sellingPrice);

    // 3. Apply Markup/Overrides based on User Type
    const pricingRole = resolvePricingRole(userType);
    if (!pricingRole) return { price: Math.ceil(basePrice), itemName }; // Owner or base

    const pricingConfig = await PricingConfig.findOne({ userType: pricingRole }).lean();

    let finalPrice = basePrice;
    const override = pricingConfig?.overrides?.find(
        (o) => o.gameSlug === gameSlug && o.itemSlug === itemSlug
    );

    if (override?.fixedPrice != null && override.useOverride) {
        finalPrice = override.fixedPrice;
    } else {
        const slab = pricingConfig?.slabs?.find(
            (s) => basePrice >= s.min && basePrice < s.max
        );
        if (slab) {
            finalPrice = basePrice * (1 + slab.percent / 100);
        }
    }

    return { price: Math.ceil(finalPrice), itemName };
}

export function applyPricingToItems(items, gameSlug, pricingConfig) {
    return items.map((item) => {
        const basePrice = Number(item.sellingPrice);
        let finalPrice = basePrice;

        const override = pricingConfig?.overrides?.find(
            (o) => o.gameSlug === gameSlug && o.itemSlug === item.itemSlug
        );

        if (override?.fixedPrice != null && override.useOverride) {
            finalPrice = override.fixedPrice;
        } else {
            const slab = pricingConfig?.slabs?.find(
                (s) => basePrice >= s.min && basePrice < s.max
            );
            if (slab) {
                finalPrice = basePrice * (1 + slab.percent / 100);
            }
        }

        return {
            ...item,
            sellingPrice: Math.ceil(finalPrice),
        };
    });
}
