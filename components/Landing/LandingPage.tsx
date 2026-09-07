"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowRight, FiCpu, FiCode,
  FiCheck, FiTrendingUp, FiArrowUpRight, FiMessageCircle, FiSend,
  FiZap, FiShare2, FiBriefcase, FiSmartphone,
  FiPlayCircle, FiCreditCard, FiActivity, FiCheckCircle, FiExternalLink
} from "react-icons/fi";
import GameCardGrid from "../Games/GameCardGrid";
import HolographicController from "./HolographicController";
import PromptHeroBar from "./PromptHeroBar";

/* ─── tiny helpers ─── */
const PRIORITY_SLUGS = [
  "pubg-mobile138",
  "genshin-impact265",
  "honor-of-kings57",
  "where-winds-meet280",
  "mobile-legends114",
  "wuthering-of-waves464",
];

const PARTNERS = [
  "MLBB Topup", "Meowji Official", "Scammers Official", "Yuji MLBB",
  "Topup Memo", "Vampenttic Games", "Tronics Official", "BlueBuff Agency", "XYZPay", "Happy Store",
];

const STATS = [
  { value: "8",       label: "Live Products" },
  { value: "₹0",      label: "Setup Cost" },
  { value: "Free",    label: "API Access" },
  { value: "99.9%",   label: "Uptime" },
  { value: "24/7",    label: "Monitoring" },
];

export const PRODUCTS = [
  {
    id: "bluebuff-agency",
    num: "01",
    name: "bluebuff.in",
    categoryKey: "web",
    categoryLabel: "Agency & Solutions",
    tagline: "Digital Agency & Development Studio",
    desc: "Custom web platforms, gaming store builds, mobile apps, and custom tech architecture.",
    icon: FiBriefcase,
    features: ["Custom Stores", "Web & Apps", "UI/UX & Branding", "Tech Architecture"],
    link: "https://bluebuff.in",
    accent: "#3b82f6",
    badge: "AGENCY",
    isNew: false,
  },
  {
    id: "mlbb-topup",
    num: "02",
    name: "mlbbtopup.in",
    categoryKey: "gaming",
    categoryLabel: "Game Top-Up Store",
    tagline: "Instant MLBB & Game Recharges",
    desc: "Fast, reliable Mobile Legends diamond recharge portal with instant Player ID verification.",
    icon: FiSmartphone,
    features: ["Player ID Check", "Instant Delivery", "Auto Wallet", "24/7 Checkout"],
    link: "https://mlbbtopup.in",
    accent: "#8b5cf6",
    badge: "TOP-UP STORE",
    isNew: false,
  },
  {
    id: "games-bluebuff",
    num: "03",
    name: "games.bluebuff.in",
    categoryKey: "gaming",
    categoryLabel: "Gaming Hub",
    tagline: "Game Store & Digital Vouchers",
    desc: "Complete catalog of game top-ups, digital gift cards, and game keys with instant delivery.",
    icon: FiPlayCircle,
    features: ["Multi-Game Catalog", "Digital Vouchers", "Gamer Rewards", "Instant Keys"],
    link: "https://games.bluebuff.in",
    accent: "#10b981",
    badge: "GAMING HUB",
    isNew: false,
  },
  {
    id: "api-bluebuff",
    num: "04",
    name: "api.bluebuff.in",
    categoryKey: "gaming",
    categoryLabel: "Developer API Engine",
    tagline: "Automated Game Top-Up API",
    desc: "High-speed REST API for resellers and store owners to automate fulfillment & sync stock.",
    icon: FiCpu,
    features: ["Sub-Second Speed", "Stock Sync", "Webhook Alerts", "Dev Console"],
    link: "https://api.bluebuff.in",
    accent: "#f59e0b",
    badge: "GAMING API",
    isNew: false,
  },
  {
    id: "web-bluebuff",
    num: "05",
    name: "web.bluebuff.in",
    categoryKey: "web",
    categoryLabel: "Website Builder",
    tagline: "No-Code Website & Bio Link Builder",
    desc: "Build sleek bio-link pages or mini store websites in minutes. Custom domains & analytics.",
    icon: FiShare2,
    features: ["Drag & Drop", "Custom Domains", "Click Analytics", "Mobile First"],
    link: "https://web.bluebuff.in",
    accent: "#ec4899",
    badge: "NO-CODE BUILDER",
    isNew: true,
  },
  {
    id: "cryptopay-bluebuff",
    num: "06",
    name: "cryptopay.bluebuff.in",
    categoryKey: "payments",
    categoryLabel: "Crypto Payments",
    tagline: "Automated Web3 Payment Gateway",
    desc: "Accept USDT, BTC, ETH, and crypto globally with zero chargeback risk & fast settlement.",
    icon: FiCreditCard,
    features: ["USDT, BTC & ETH", "Zero Chargebacks", "Instant Payout", "Auto Webhooks"],
    link: "https://cryptopay.bluebuff.in",
    accent: "#6366f1",
    badge: "CRYPTO PAY",
    isNew: true,
  },
  {
    id: "stalkerweb-bluebuff",
    num: "07",
    name: "stalkerweb.bluebuff.in",
    categoryKey: "infra",
    categoryLabel: "Web Monitoring",
    tagline: "24/7 Web & API Uptime Tracking",
    desc: "Keep your stores, APIs, and servers active 24/7 with instant downtime alerts & SSL checks.",
    icon: FiActivity,
    features: ["24/7 Uptime Check", "Instant Alerts", "SSL Monitor", "Latency Metrics"],
    link: "https://stalkerweb.bluebuff.in",
    accent: "#06b6d4",
    badge: "WEB MONITOR",
    isNew: true,
  },
  {
    id: "xyzpay-site",
    num: "08",
    name: "xyzpay.site",
    categoryKey: "payments",
    categoryLabel: "Payment Gateway",
    tagline: "Instant Merchant Payment Gateway",
    desc: "Fast checkout for digital game stores. High success rate, instant UPI & wallet payouts.",
    icon: FiZap,
    features: ["UPI & Cards", "High Success Rate", "Auto Payouts", "24/7 Security"],
    link: "https://xyzpay.site",
    accent: "#a855f7",
    badge: "PAYMENT GATEWAY",
    isNew: false,
  },
];

const SERVICES = [
  {
    icon: FiCpu,
    tag: "API",
    title: "Game Top-Up API",
    desc: "Connect your storefront to game top-ups instantly powered by api.bluebuff.in.",
    items: ["Auto delivery", "50+ Games", "Live status updates"],
  },
  {
    icon: FiCode,
    tag: "WEB",
    title: "Custom Store Build",
    desc: "BlueBuff Agency builds custom, high-converting game stores tailored to your brand.",
    items: ["Admin dashboard", "SEO ready", "Mobile first"],
    highlight: true,
  },
  {
    icon: FiTrendingUp,
    tag: "GROWTH",
    title: "Marketing & Growth",
    desc: "Scale your revenue with specialized online marketing, store SEO, and gamer ads.",
    items: ["Search ranking", "Social campaigns", "Brand design"],
  },
  {
    icon: FiMessageCircle,
    tag: "BOTS",
    title: "WhatsApp Bots",
    desc: "Automate order processing and customer support 24/7 directly on WhatsApp.",
    items: ["Instant replies", "24/7 uptime", "Auto order sync"],
  },
  {
    icon: FiSend,
    tag: "BOTS",
    title: "Telegram Bots",
    desc: "Deploy Telegram order bots and group management automation with alerts.",
    items: ["Secure token auth", "Group management", "Instant alert bots"],
  },
  {
    icon: FiCreditCard,
    tag: "PAYMENT",
    title: "Payment Integration",
    desc: "Seamless payment gateway & checkout integration with instant order callbacks.",
    items: ["Multi-currency", "Instant Webhooks", "Zero Fee Setup"],
  },
];

/* ═══════════════════════════════════════════════════════ */
export default function LandingPage() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/games");
        const json = await res.json();
        const all = json?.data?.games || [];
        setGames(
          PRIORITY_SLUGS.map((s) => all.find((g: any) => g.gameSlug === s)).filter(Boolean)
        );
      } catch {}
      finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] min-h-screen font-sans overflow-x-hidden selection:bg-[var(--accent)]/20">

      {/* ═══════ HERO ═══════ */}
      <section className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 md:pt-12 md:pb-20 flex flex-col justify-center overflow-hidden border-b border-[var(--border)]">
        {/* 3D DECORATIVE BACKGROUND */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div
            className="absolute bottom-0 left-0 right-0 h-[55%]"
            style={{
              backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
              opacity: 0.04,
              transform: "perspective(600px) rotateX(55deg)",
              transformOrigin: "bottom center",
              maskImage: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
            }}
          />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[15%] -right-[10%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px]"
            style={{ border: "1px solid rgba(var(--accent-rgb), 0.12)", borderRadius: "50%" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--accent)]" />
          </motion.div>
        </div>

        {/* Accent top line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent z-10" />

        {/* Hero Content - Clean, Centered & Uncluttered */}
        <div className="relative z-10 max-w-4xl mx-auto w-full px-4 sm:px-6 md:px-10 pt-4 pb-8 md:pt-6 md:pb-12 flex flex-col items-center text-center gap-4 sm:gap-5 min-w-0">
          
          {/* Minimal Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 w-fit">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[var(--accent)]">
              BLUEBUFF ECOSYSTEM
            </span>
          </div>

          {/* Simple Punchy Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[1000] leading-[1.08] tracking-tight uppercase italic text-[var(--foreground)] break-words max-w-3xl">
            Your Gaming &amp; Web <br className="hidden sm:inline" />
            <span className="text-[var(--accent)]">Ecosystem.</span>
          </h1>

          {/* Simple 1-Line Description */}
          <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed max-w-md">
            Automated game top-ups, developer APIs, website builders, crypto checkout &amp; digital agency solutions.
          </p>

          {/* Pure Holographic Controller SVG (positioned above the input bar) */}
          <div className="w-full max-w-[360px] sm:max-w-[420px] md:max-w-[460px] my-1">
            <HolographicController />
          </div>

          {/* Prompt / Redirect Pill Bar (directly below SVG) */}
          <div className="w-full flex justify-center">
            <PromptHeroBar />
          </div>

          {/* All 8 Platform Links */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap pt-1 max-w-2xl mx-auto">
            <span className="text-[9px] font-black uppercase tracking-wider text-[var(--muted)] opacity-70">
              Platforms:
            </span>
            {PRODUCTS.map((p) => (
              <a
                key={p.id}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--foreground)" }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--card)]/60 border border-[var(--border)] text-[8px] sm:text-[9px] font-bold hover:border-[var(--accent)] hover:!text-[var(--accent)] transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.accent }} />
                <span>{p.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ MARQUEE ═══════ */}
      <section className="py-6 border-b border-[var(--border)] overflow-hidden relative bg-[var(--card)]/10">
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />
        <div className="animate-marquee flex gap-3 w-max">
          {[...PARTNERS, ...PARTNERS].map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[var(--card)]/20 border border-white/[0.04] group hover:border-[var(--accent)]/20 transition-all cursor-default"
            >
              <div className="w-4 h-4 rounded-md bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] text-[8px] font-black border border-[var(--accent)]/10">
                {name.charAt(0)}
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold text-[var(--muted)] whitespace-nowrap group-hover:text-[var(--foreground)] transition-colors">
                {name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ PRODUCTS SUITE SECTION ═══════ */}
      <section id="products-suite" className="py-16 sm:py-20 md:py-24 border-b border-[var(--border)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">

          {/* Section Header (Clean - No Filter Buttons) */}
          <div className="mb-10 text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-[2px] bg-[var(--accent)]" />
              <span className="text-[9px] font-black uppercase tracking-[0.35em] text-[var(--accent)]">
                Products Suite
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-[1000] tracking-tighter uppercase italic leading-none text-[var(--foreground)]">
              Our <span className="text-[var(--accent)]">Products</span>
            </h2>
          </div>

          {/* 8 Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {PRODUCTS.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative flex flex-col justify-between p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)]/40 hover:border-[var(--accent)] transition-all duration-300"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${p.accent}18`, border: `1px solid ${p.accent}40` }}
                    >
                      <p.icon size={20} style={{ color: p.accent }} />
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      {p.isNew && (
                        <span
                          className="px-1.5 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest text-black animate-pulse"
                          style={{ background: p.accent }}
                        >
                          NEW
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-[0.2em] text-[var(--accent)] bg-[var(--accent)]/10 border border-[var(--accent)]/20">
                        {p.badge}
                      </span>
                    </div>
                  </div>

                  {/* Title & Domain */}
                  <div className="space-y-1 mb-3">
                    <h3 className="text-lg font-[1000] uppercase italic tracking-tight leading-none text-[var(--foreground)] truncate">
                      {p.name}
                    </h3>
                    <p className="text-[9px] font-bold uppercase tracking-wider truncate" style={{ color: p.accent }}>
                      {p.tagline}
                    </p>
                    <p className="text-xs text-[var(--muted)] leading-relaxed pt-1 opacity-80 line-clamp-2">
                      {p.desc}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="grid grid-cols-2 gap-1.5 my-3 pt-3 border-t border-[var(--border)]/60">
                    {p.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-1.5 overflow-hidden">
                        <FiCheckCircle size={10} style={{ color: p.accent }} className="flex-shrink-0" />
                        <span className="text-[8px] font-bold uppercase tracking-tight text-[var(--muted)] truncate">
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Row */}
                <div className="pt-3 border-t border-[var(--border)]/40 flex items-center justify-between mt-auto">
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: p.accent, color: "#ffffff" }}
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl !text-white font-black text-[9px] uppercase italic tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md truncate"
                  >
                    <span className="truncate !text-white" style={{ color: "#ffffff" }}>Visit {p.name}</span>
                    <FiExternalLink size={11} className="flex-shrink-0 !text-white" style={{ color: "#ffffff" }} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ INSTANT GAMES ═══════ */}
      <section id="games-section" className="py-16 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">

          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-[2px] bg-[var(--accent)]" />
                <span className="text-[9px] font-black uppercase tracking-[0.35em] text-[var(--accent)]">
                  Top-Up Games
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-[1000] tracking-tighter uppercase italic">
                Instant <span className="text-[var(--accent)]">Delivery</span>
              </h2>
            </div>
            <Link
              href="/games"
              style={{ color: "var(--muted)" }}
              className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] hover:!text-[var(--accent)] transition-colors whitespace-nowrap"
            >
              All Games <FiArrowRight size={12} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl bg-[var(--card)]/30 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {games.map((game, i) => (
                <GameCardGrid
                  key={game?.gameSlug || i}
                  game={game}
                  isOutOfStock={() => false}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════ SERVICES & AGENCY (bluebuff.in) ═══════ */}
      <section id="agency-services" className="py-16 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-[2px] bg-[var(--accent)]" />
              <span className="text-[9px] font-black uppercase tracking-[0.35em] text-[var(--accent)]">
                Agency Services
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-[1000] tracking-tighter uppercase italic">
              Custom Development &amp; <span className="text-[var(--accent)]">Solutions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] rounded-2xl overflow-hidden">
            {SERVICES.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-6 md:p-8 flex flex-col gap-4 group transition-all duration-500 ${
                  s.highlight
                    ? "bg-[var(--accent)]/[0.06]"
                    : "bg-[var(--background)] hover:bg-[var(--card)]/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-black uppercase tracking-[0.35em] text-[var(--accent)]/60 border border-[var(--accent)]/20 px-2 py-1 rounded-md">
                    {s.tag}
                  </span>
                  <s.icon size={16} className="text-[var(--accent)] opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="text-lg font-[1000] tracking-tighter uppercase italic leading-none">{s.title}</h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">{s.desc}</p>

                <div className="space-y-2 mt-auto pt-2">
                  {s.items.map((f, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <FiCheck size={11} className="text-[var(--accent)] flex-shrink-0" />
                      <span className="text-[9px] font-bold text-[var(--muted)] uppercase tracking-wider">{f}</span>
                    </div>
                  ))}
                </div>

                {s.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--accent)]" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
