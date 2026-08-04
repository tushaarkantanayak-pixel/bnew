import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import PricingConfig from "@/models/PricingConfig";
import AppSettings from "@/models/AppSettings";
import { applyPricingToItems } from "@/lib/pricingUtils";

/* ================= COC CONFIG ================= */
const COC_CONFIG = {
  gameName: "Clash of Clans",
  gameFrom: "Supercell",
  image: "/game-assets/coc_logo.png",
  gameDescription: "Clash of Clans Top-up (Manual Process). High-speed delivery.",
  inputFieldOne: "Game ID (Player Tag)",
  inputFieldTwo: "Mobile Number",
  isValidationRequired: false,
  gameAvailablity: true,
  itemId: [
    {
      itemName: "Event Pass (India)",
      itemSlug: "coc-event-pass-in",
      sellingPrice: 230,
      dummyPrice: 299,
      itemAvailablity: true,
      index: 1,
      itemImageId: {
        image: "/game-assets/coc_logo.png",
      },
    },
    {
      itemName: "Gold Pass (India)",
      itemSlug: "coc-gold-pass-in",
      sellingPrice: 330,
      dummyPrice: 449,
      itemAvailablity: true,
      index: 2,
      itemImageId: {
        image: "/game-assets/coc_logo.png",
      },
    },
    {
      itemName: "Event Pass (Global)",
      itemSlug: "coc-event-pass-global",
      sellingPrice: 449,
      dummyPrice: 549,
      itemAvailablity: true,
      index: 3,
      itemImageId: {
        image: "/game-assets/coc_logo.png",
      },
    },
    {
      itemName: "Gold Pass (Global)",
      itemSlug: "coc-gold-pass-global",
      sellingPrice: 599,
      dummyPrice: 749,
      itemAvailablity: true,
      index: 4,
      itemImageId: {
        image: "/game-assets/coc_logo.png",
      },
    },
  ],
};


/* ================= ROLE → PRICING (FIXED) ================= */
const resolvePricingRole = (role) => {
  if (["user", "member"].includes(role)) return role;
  return null; // owner → base price
};

/* ================= API ================= */
export async function GET(req, { params }) {
  const { slug } = await params;

  try {
    /* ===== STATIC PRODUCTS ===== */


    if (slug === "coc-manual" || slug === "coc") {
      return NextResponse.json({
        success: true,
        data: { gameSlug: slug, ...COC_CONFIG },
      });
    }







    /* ===== OPTIONAL AUTH ===== */
    let userType = "user";
    const auth = req.headers.get("authorization");

    if (auth?.startsWith("Bearer ")) {
      try {
        const decoded = jwt.verify(
          auth.split(" ")[1],
          process.env.JWT_SECRET
        );
        if (decoded?.userType) userType = decoded.userType;
      } catch { }
    }

    const pricingRole = resolvePricingRole(userType);

    /* ===== FETCH BASE GAME ===== */
    const response = await fetch(
      `https://game-off-ten.vercel.app/api/v1/game/${slug}`,
      {
        headers: { "x-api-key": process.env.API_SECRET_KEY },
      }
    );

    const data = await response.json();
    if (!data?.data?.itemId) return NextResponse.json(data);

    /* ===== FETCH PRICING ===== */
    await connectDB();

    let pricingConfig = null;
    if (pricingRole) {
      pricingConfig = await PricingConfig.findOne({
        userType: pricingRole,
      }).lean();
    }

    const gameSlug = data.data.gameSlug;



    /* ===== APPLY PRICING ===== */
    data.data.itemId = applyPricingToItems(data.data.itemId, gameSlug, pricingConfig);

    /* ================= NORMALIZE FOR GENERIC FLOW ================= */
    if (slug.includes("genshin-impact")) {
      data.data.inputFieldOne = "UID";
      data.data.inputFieldTwo = "Server";
      data.data.inputFieldTwoOptions = [
        { label: "America", value: "america" },
        { label: "Asia", value: "asia" },
        { label: "Europe", value: "europe" },
        { label: "TW_HK_MO", value: "tw_hk_mo" },
      ];
    }

    if (slug.includes("honor-of-kings")) {
      data.data.inputFieldOne = "Player ID";
    }

    if (slug.includes("wuthering-of-waves")) {
      data.data.inputFieldOne = "Player ID";
      data.data.inputFieldTwo = "Server";
      data.data.inputFieldTwoOptions = [
        { label: "America", value: "america" },
        { label: "Asia", value: "asia" },
        { label: "Europe", value: "europe" },
        { label: "SEA", value: "sea" },
      ];
    }

    if (slug.includes("asphalt")) {
      data.data.inputFieldOne = "Player ID";
      data.data.inputFieldTwo = "Platform";
      data.data.inputFieldTwoOptions = [
        { label: "iOS", value: "ios" },
        { label: "Android", value: "android" },
        { label: "Windows", value: "windows" },
        { label: "Huawei", value: "huawei" },
        { label: "Xbox", value: "xbox" },
      ];
    }

    if (slug.includes("8ballpool")) {
      data.data.inputFieldOne = "Player ID";
    }

    /* ===== FILTER DISABLED ITEMS (invisible to regular users) ===== */
    const reqUrl = new URL(req.url);
    const isAdminRequest = reqUrl.searchParams.get("admin") === "true";
    let isOwner = false;
    if (isAdminRequest) {
      try {
        const auth = req.headers.get("authorization");
        if (auth?.startsWith("Bearer ")) {
          const decoded = jwt.verify(auth.split(" ")[1], process.env.JWT_SECRET);
          if (decoded?.userType === "owner") isOwner = true;
        }
      } catch {}
    }

    if (!isOwner) {
      const appSettings = await AppSettings.findOne({}).lean();
      const disabledSet = new Set((appSettings?.disabledItems) || []);
      if (disabledSet.size > 0) {
        data.data.itemId = data.data.itemId.filter(
          (item) => !disabledSet.has(`${gameSlug}_${item.itemSlug}`)
        );
      }
    }

    // Final sort to keep UI clean
    data.data.itemId.sort((a, b) => a.sellingPrice - b.sellingPrice);

    return NextResponse.json(data);
  } catch (err) {
    console.error("Game Fetch Error:", err);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
