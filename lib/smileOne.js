import crypto from "crypto";

export function generateSmileSign(params, secretKey) {
    // 1. Sort keys alphabetically
    const sortedKeys = Object.keys(params).sort();

    // 2. Build query string: "key1=val1&key2=val2..."
    const queryString = sortedKeys
        .map(key => `${key}=${params[key]}`)
        .join("&");

    // 3. Append Secret Key (with &) and Double MD5
    const firstHash = crypto.createHash("md5").update(queryString + "&" + secretKey).digest("hex");
    const finalSign = crypto.createHash("md5").update(firstHash).digest("hex");

    return finalSign;
}

/* ============================================================
   SMILE ONE PRODUCT REGISTRY
   ─────────────────────────────────────────────────────────
   SMILE_PRODUCT_MAPPING  →  what SmileOne CAN handle (numeric IDs)
   SMILE_ACTIVE_ITEMS     →  what is CURRENTLY routed to SmileOne

   1Game is always the default for everything.
   SmileOne is only used for items listed in SMILE_ACTIVE_ITEMS.

   ► TO SUPPORT A NEW PRODUCT ON SMILE ONE:
       1. Add its entry to SMILE_PRODUCT_MAPPING (get numeric ID from SmileOne)
       2. Add its key to SMILE_ACTIVE_ITEMS to activate it

   ► TO ROUTE AN ITEM TO SMILE ONE:
       Add the key to SMILE_ACTIVE_ITEMS  →  "gameSlug_itemSlug"

   ► TO STOP ROUTING AN ITEM TO SMILE ONE:
       Remove the key from SMILE_ACTIVE_ITEMS  →  back to 1Game

   ► EMERGENCY KILL SWITCH:
       Toggle OFF in Owner Panel → Settings → MLBB Weekly Pass Provider
       (sets mlbbWeeklyProvider = "1game", overrides everything)
   ============================================================ */

export const SMILE_PRODUCT_MAPPING = {
    // 🎮 MLBB — Main Diamond Packs
    "mobile-legends114_weekly-pass816":        "16642",
    "mobile-legends114_twilight-pass663":      "33",
    "mobile-legends114_86990":                 "13",
    "mobile-legends114_172216":                "23",
    "mobile-legends114_257547":                "25",
    "mobile-legends114_706359":                "26",
    "mobile-legends114_2195687":               "27",
    "mobile-legends114_3688967":               "28",
    "mobile-legends114_5532521":               "29",
    "mobile-legends114_9288716":               "30",

    // 💎 MLBB — Double Denominations
    "mlbb-double332_55--first-time-5050-else-55601":     "22590",
    "mlbb-double332_165-first-time-150150-else-165242":  "22591",
    "mlbb-double332_275-first-time-250250-else-275322":  "22592",
    "mlbb-double332_565-first-time-500500-else-565749":  "22593",

    // 📦 MLBB — Weekly / Monthly Bundles
    "weeklymonthly-bundle646_weekly-bundle434":  "26555",
    "weeklymonthly-bundle646_monthly-bundle570": "26556",

    // 👑 Honor of Kings (HoK)
    "honor-of-kings57_16227":   "16643",
    "honor-of-kings57_80146":   "16644",
    "honor-of-kings57_240433":  "16645",
    "honor-of-kings57_40046":   "16646",
    "honor-of-kings57_560618":  "16647",
    "honor-of-kings57_83050":   "16648",
    "honor-of-kings57_1245227": "16649",
    "honor-of-kings57_2508329": "16650",
    "honor-of-kings57_4180735": "16651",
    "honor-of-kings57_8360323": "16652",

    // 🔁 Backward-compatibility aliases
    "mobile-legends114_weekly-pass":         "16642",
    "mobile-legends114_weekly-diamond-pass": "16642",
    "mobile-legends114_weekly-pass-2x":      "16642",
};

/* ============================================================
   SMILE ONE ACTIVE ITEMS
   ─────────────────────────────────────────────────────────
   Only items listed here are actually ROUTED to SmileOne.
   Everything NOT in this Set goes to 1Game automatically.

   Starts EMPTY → 1Game handles 100% of orders by default.

   To activate an item on SmileOne:
     uncomment its line (or add a new line) below.
   ============================================================ */

export const SMILE_ACTIVE_ITEMS = new Set([
    // ─── MLBB — Weekly Pass ───────────────────────────────
    // "mobile-legends114_weekly-pass816",
    // "mobile-legends114_twilight-pass663",
    // "mobile-legends114_weekly-pass",
    // "mobile-legends114_weekly-diamond-pass",
    // "mobile-legends114_weekly-pass-2x",

    // ─── MLBB — Diamond Packs ─────────────────────────────
    // "mobile-legends114_86990",
    // "mobile-legends114_172216",
    // "mobile-legends114_257547",
    // "mobile-legends114_706359",
    // "mobile-legends114_2195687",
    // "mobile-legends114_3688967",
    // "mobile-legends114_5532521",
    // "mobile-legends114_9288716",

    // ─── MLBB — Double Denominations ──────────────────────
    // "mlbb-double332_55--first-time-5050-else-55601",
    // "mlbb-double332_165-first-time-150150-else-165242",
    // "mlbb-double332_275-first-time-250250-else-275322",
    // "mlbb-double332_565-first-time-500500-else-565749",

    // ─── MLBB — Weekly / Monthly Bundles ──────────────────
    // "weeklymonthly-bundle646_weekly-bundle434",
    // "weeklymonthly-bundle646_monthly-bundle570",

    // ─── Honor of Kings ───────────────────────────────────
    // "honor-of-kings57_16227",
    // "honor-of-kings57_80146",
    // "honor-of-kings57_240433",
    // "honor-of-kings57_40046",
    // "honor-of-kings57_560618",
    // "honor-of-kings57_83050",
    // "honor-of-kings57_1245227",
    // "honor-of-kings57_2508329",
    // "honor-of-kings57_4180735",
    // "honor-of-kings57_8360323",
]);

/** Maps gameSlug → SmileOne 'product' field name */
export const SMILE_GAME_TYPE_MAPPING = {
    "mobile-legends114":       "mobilelegends",
    "mlbb-double332":          "mobilelegends",
    "weeklymonthly-bundle646": "mobilelegends",
    "honor-of-kings57":        "hok",
};

/**
 * Returns true if this specific item is opted-in to SmileOne routing.
 *
 * 1Game is always the default. SmileOne is only used when:
 *   1. The global switch is ON  (mlbbWeeklyProvider === "smileone" in AppSettings)
 *   2. AND this item's key is listed in SMILE_ACTIVE_ITEMS above.
 *
 * To route an item to SmileOne: add its key to SMILE_ACTIVE_ITEMS.
 * To stop: remove it. No route files ever need to be touched.
 *
 * @param {string} gameSlug
 * @param {string} itemSlug
 * @returns {boolean}
 */
export function canFulfillWithSmile(gameSlug, itemSlug) {
    return SMILE_ACTIVE_ITEMS.has(`${gameSlug}_${itemSlug}`);
}

export async function placeSmileOrder(orderData) {
    const isSandbox = process.env.SMILE_MODE === "sandbox";

    const SMILE_UID = isSandbox ? process.env.SMILE_SANDBOX_UID : process.env.SMILE_PRODUCTION_UID;
    const SMILE_EMAIL = isSandbox ? process.env.SMILE_SANDBOX_EMAIL : process.env.SMILE_PRODUCTION_EMAIL;
    const SMILE_SECRET = isSandbox ? process.env.SMILE_SANDBOX_SECRET : process.env.SMILE_PRODUCTION_SECRET;

    // Endpoints from documentation screenshots
    const ENDPOINT = isSandbox
        ? "https://frontsmie.smile.one/smilecoin/api/createorder"
        : "https://www.smile.one/smilecoin/api/createorder";

    console.log(`[SmileOne] Using ${isSandbox ? "SANDBOX" : "PRODUCTION"} Mode`);

    // Resolve numeric product ID and game type from module-level maps
    const productKey = `${orderData.gameSlug}_${orderData.itemSlug}`;
    const numericProductId = SMILE_PRODUCT_MAPPING[productKey] || orderData.smileProductId || orderData.productId;
    const smileProductType = SMILE_GAME_TYPE_MAPPING[orderData.gameSlug] || "mobilelegends";

    // fields according to the documentation: email, uid, userid, zoneid, product, productid, time, sign
    const params = {
        email: SMILE_EMAIL,
        uid: SMILE_UID,
        userid: String(orderData.playerId),
        zoneid: orderData.zoneId ? String(orderData.zoneId) : undefined,
        product: smileProductType,
        productid: String(numericProductId),
        time: Math.floor(Date.now() / 1000), // UNIX timestamp (Int)
        orderno: orderData.orderId,
    };

    params.sign = generateSmileSign(params, SMILE_SECRET);

    console.log("[SmileOne] Placing Order (Form Data):", params.orderno);

    try {
        const formData = new URLSearchParams();
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined) formData.append(key, value);
        }

        const response = await fetch(ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData.toString()
        });

        const data = await response.json();
        console.log("[SmileOne] API Response:", JSON.stringify(data));

        return {
            success: data.status === 200 || data.success === true || data.code === 200,
            data: data
        };
    } catch (error) {
        console.error("[SmileOne] API Error:", error);
        return { success: false, error: error.message };
    }
}

/**
 * Fetches the product list from Smile One API.
 * @param {string} productName - The name of the product (e.g., 'mobilelegends')
 * @returns {Promise<Object>} The API response containing the product list.
 */
export async function getSmileProducts(productName = "mobilelegends") {
    const isSandbox = process.env.SMILE_MODE === "sandbox";

    const SMILE_UID = isSandbox ? process.env.SMILE_SANDBOX_UID : process.env.SMILE_PRODUCTION_UID;
    const SMILE_EMAIL = isSandbox ? process.env.SMILE_SANDBOX_EMAIL : process.env.SMILE_PRODUCTION_EMAIL;
    const SMILE_SECRET = isSandbox ? process.env.SMILE_SANDBOX_SECRET : process.env.SMILE_PRODUCTION_SECRET;

    const ENDPOINT = isSandbox
        ? "https://frontsmie.smile.one/smilecoin/api/productlist"
        : "https://www.smile.one/smilecoin/api/productlist";

    const params = {
        uid: SMILE_UID,
        email: SMILE_EMAIL,
        product: productName,
        time: Math.floor(Date.now() / 1000),
    };

    params.sign = generateSmileSign(params, SMILE_SECRET);

    console.log(`[SmileOne] Fetching Product List for: ${productName} (${isSandbox ? "SANDBOX" : "PRODUCTION"})`);

    try {
        const formData = new URLSearchParams();
        for (const [key, value] of Object.entries(params)) {
            formData.append(key, value);
        }

        const response = await fetch(ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData.toString()
        });

        const data = await response.json();

        if (data.status === 200 && data.data && data.data.product) {
            console.log(`[SmileOne] Successfully fetched ${data.data.product.length} products.`);
        } else {
            console.error("[SmileOne] Product List Response Error:", data);
        }

        return data;
    } catch (error) {
        console.error("[SmileOne] Product List Network Error:", error);
        return { status: 500, message: error.message };
    }
}

/**
 * Validates a user's game ID and zone ID using Smile One API.
 * @param {string} userId - The game user ID
 * @param {string} zoneId - The game zone ID
 * @param {string} productName - The name of the product (default: 'mobilelegends')
 * @returns {Promise<Object>} The API response containing user info (username, etc.)
 */
export async function checkSmileUser(userId, zoneId, productName = "mobilelegends") {
    const isSandbox = process.env.SMILE_MODE === "sandbox";

    const SMILE_UID = isSandbox ? process.env.SMILE_SANDBOX_UID : process.env.SMILE_PRODUCTION_UID;
    const SMILE_EMAIL = isSandbox ? process.env.SMILE_SANDBOX_EMAIL : process.env.SMILE_PRODUCTION_EMAIL;
    const SMILE_SECRET = isSandbox ? process.env.SMILE_SANDBOX_SECRET : process.env.SMILE_PRODUCTION_SECRET;

    const ENDPOINT = isSandbox
        ? "https://frontsmie.smile.one/smilecoin/api/getroleinfo"
        : "https://www.smile.one/smilecoin/api/getroleinfo";

    const params = {
        uid: SMILE_UID,
        email: SMILE_EMAIL,
        product: productName,
        userid: String(userId),
        zoneid: String(zoneId),
        time: Math.floor(Date.now() / 1000),
    };

    params.sign = generateSmileSign(params, SMILE_SECRET);

    console.log(`[SmileOne] Validating user: ${userId} (${zoneId}) on ${productName}`);

    try {
        const formData = new URLSearchParams();
        for (const [key, value] of Object.entries(params)) {
            formData.append(key, value);
        }

        const response = await fetch(ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData.toString()
        });

        const data = await response.json();

        if (data.status === 200 && data.data) {
            console.log(`[SmileOne] User found: ${data.data.username || "Unknown"}`);
        } else {
            console.error("[SmileOne] User Validation Error:", data);
        }

        return data;
    } catch (error) {
        console.error("[SmileOne] User Validation Network Error:", error);
        return { status: 500, message: error.message };
    }
}

/**
 * Checks the agent's account balance on Smile One.
 * @returns {Promise<Object>} The API response containing balance info.
 */
export async function getSmileBalance() {
    const isSandbox = process.env.SMILE_MODE === "sandbox";

    const SMILE_UID = isSandbox ? process.env.SMILE_SANDBOX_UID : process.env.SMILE_PRODUCTION_UID;
    const SMILE_EMAIL = isSandbox ? process.env.SMILE_SANDBOX_EMAIL : process.env.SMILE_PRODUCTION_EMAIL;
    const SMILE_SECRET = isSandbox ? process.env.SMILE_SANDBOX_SECRET : process.env.SMILE_PRODUCTION_SECRET;

    const ENDPOINT = isSandbox
        ? "https://frontsmie.smile.one/smilecoin/api/getbalance"
        : "https://www.smile.one/smilecoin/api/getbalance";

    const params = {
        uid: SMILE_UID,
        email: SMILE_EMAIL,
        time: Math.floor(Date.now() / 1000),
    };

    params.sign = generateSmileSign(params, SMILE_SECRET);

    console.log(`[SmileOne] Checking Balance (${isSandbox ? "SANDBOX" : "PRODUCTION"})`);

    try {
        const formData = new URLSearchParams();
        for (const [key, value] of Object.entries(params)) {
            formData.append(key, value);
        }

        const response = await fetch(ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData.toString()
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("[SmileOne] Balance Check Network Error:", error);
        return { status: 500, message: error.message };
    }
}

/**
 * Checks the status of a specific order on Smile One.
 * @param {string} orderNo - The Smile One order number or your internal order number (depending on API)
 * @returns {Promise<Object>} The API response containing order status.
 */
export async function getSmileOrderStatus(orderNo) {
    const isSandbox = process.env.SMILE_MODE === "sandbox";

    const SMILE_UID = isSandbox ? process.env.SMILE_SANDBOX_UID : process.env.SMILE_PRODUCTION_UID;
    const SMILE_EMAIL = isSandbox ? process.env.SMILE_SANDBOX_EMAIL : process.env.SMILE_PRODUCTION_EMAIL;
    const SMILE_SECRET = isSandbox ? process.env.SMILE_SANDBOX_SECRET : process.env.SMILE_PRODUCTION_SECRET;

    const ENDPOINT = isSandbox
        ? "https://frontsmie.smile.one/smilecoin/api/orderquery"
        : "https://www.smile.one/smilecoin/api/orderquery";

    const params = {
        uid: SMILE_UID,
        email: SMILE_EMAIL,
        orderno: orderNo,
        time: Math.floor(Date.now() / 1000),
    };

    params.sign = generateSmileSign(params, SMILE_SECRET);

    console.log(`[SmileOne] Checking Order Status: ${orderNo}`);

    try {
        const formData = new URLSearchParams();
        for (const [key, value] of Object.entries(params)) {
            formData.append(key, value);
        }

        const response = await fetch(ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData.toString()
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("[SmileOne] Order Query Network Error:", error);
        return { status: 500, message: error.message };
    }
}
