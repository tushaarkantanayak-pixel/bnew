"use client";

import { motion } from "framer-motion";
import {
  FiBriefcase, FiSmartphone, FiPlayCircle, FiCpu, FiShare2,
  FiCreditCard, FiActivity, FiZap, FiCheckCircle, FiExternalLink, FiArrowRight
} from "react-icons/fi";
import Link from "next/link";

export const PRODUCTS = [
  {
    id: "bluebuff-agency",
    num: "01",
    name: "bluebuff.in",
    categoryLabel: "Agency & Digital Solutions",
    tagline: "Digital Agency & Custom Software Studio",
    desc: "Full-service digital agency building custom web platforms, gaming store builds, mobile apps, and enterprise automation.",
    icon: FiBriefcase,
    features: [
      "Custom Store Engineering",
      "Full Stack Web & Mobile Apps",
      "UI/UX Design & Branding",
      "Custom API Integrations",
      "SEO & Growth Strategy",
      "Dedicated Technical Support"
    ],
    link: "https://bluebuff.in",
    accent: "#3b82f6",
    badge: "AGENCY HUB",
    isNew: false,
  },
  {
    id: "mlbb-topup",
    num: "02",
    name: "mlbbtopup.in",
    categoryLabel: "Game Top-Up Portal",
    tagline: "Dedicated MLBB & Mobile Game Recharges",
    desc: "Fast, reliable, and instant Mobile Legends & premier mobile games diamond recharge portal with real-time Player ID verification.",
    icon: FiSmartphone,
    features: [
      "Real-Time Player ID Check",
      "Instant Diamond Delivery",
      "Automated Wallet Balance",
      "Multiple Local Payment Options",
      "24/7 Automated Processing",
      "Order Tracking & History"
    ],
    link: "https://mlbbtopup.in",
    accent: "#8b5cf6",
    badge: "TOP-UP STORE",
    isNew: false,
  },
  {
    id: "games-bluebuff",
    num: "03",
    name: "games.bluebuff.in",
    categoryLabel: "Gaming Destination",
    tagline: "All-in-One Game Store & Voucher Hub",
    desc: "Explore a massive library of game top-ups, digital gift cards, and game keys with seamless instant delivery.",
    icon: FiPlayCircle,
    features: [
      "Comprehensive Game Catalog",
      "Digital Vouchers & Gift Cards",
      "Exclusive Member Rewards",
      "Secure Instant Delivery",
      "24/7 Gamer Support",
      "User-Friendly Interface"
    ],
    link: "https://games.bluebuff.in",
    accent: "#10b981",
    badge: "GAMING HUB",
    isNew: false,
  },
  {
    id: "api-bluebuff",
    num: "04",
    name: "api.bluebuff.in",
    categoryLabel: "Developer API Engine",
    tagline: "Automated Game Top-Up API Infrastructure",
    desc: "High-speed, scalable REST API for top-up resellers and game store owners to automate fulfillment and sync live stock.",
    icon: FiCpu,
    features: [
      "Sub-Second Order Fulfillment",
      "Real-Time Stock Sync",
      "Instant Webhook Notifications",
      "Developer API Console",
      "Automated Balance Refunds",
      "Multi-Game API Integration"
    ],
    link: "https://api.bluebuff.in",
    accent: "#f59e0b",
    badge: "GAMING API",
    isNew: false,
  },
  {
    id: "web-bluebuff",
    num: "05",
    name: "web.bluebuff.in",
    categoryLabel: "Website & Link-in-Bio Builder",
    tagline: "No-Code Store & Link-in-Bio Builder",
    desc: "Build sleek link-in-bio pages or mini store websites in minutes. Custom domain support, drag-and-drop elements, and live analytics.",
    icon: FiShare2,
    features: [
      "Custom Link-in-Bio Layouts",
      "Drag & Drop Page Builder",
      "Custom Domain Support",
      "Social Buttons & Custom Links",
      "Analytics & Click Tracking",
      "Mobile-First Responsive Design"
    ],
    link: "https://web.bluebuff.in",
    accent: "#ec4899",
    badge: "NO-CODE BUILDER",
    isNew: true,
  },
  {
    id: "cryptopay-bluebuff",
    num: "06",
    name: "cryptopay.bluebuff.in",
    categoryLabel: "Crypto & Web3 Payment Gateway",
    tagline: "Automated Crypto Payment Gateway",
    desc: "Accept USDT, Bitcoin, Ethereum, and crypto tokens globally with zero chargeback risk, auto payment verification, and fast payout.",
    icon: FiCreditCard,
    features: [
      "Multi-Chain Crypto Support (USDT, BTC, ETH)",
      "Instant Payment Verification",
      "Zero Chargeback Risk",
      "Auto Payment Webhooks",
      "Fast & Low-Fee Settlement",
      "Merchant Payment Dashboard"
    ],
    link: "https://cryptopay.bluebuff.in",
    accent: "#6366f1",
    badge: "CRYPTO PAYMENTS",
    isNew: true,
  },
  {
    id: "stalkerweb-bluebuff",
    num: "07",
    name: "stalkerweb.bluebuff.in",
    categoryLabel: "Web Infrastructure & Monitoring",
    tagline: "24/7 Web & API Uptime Monitoring",
    desc: "Keep your online store, API endpoints, and web applications running 24/7 with instant downtime alerts, SSL check, and latency logs.",
    icon: FiActivity,
    features: [
      "24/7 Continuous Uptime Monitoring",
      "Instant Email & Telegram Downtime Alerts",
      "SSL Certificate Monitoring",
      "Latency & Response Time Logs",
      "Public Status Pages",
      "Global Health Diagnostics"
    ],
    link: "https://stalkerweb.bluebuff.in",
    accent: "#06b6d4",
    badge: "WEB MONITORING",
    isNew: true,
  },
  {
    id: "xyzpay-site",
    num: "08",
    name: "xyzpay.site",
    categoryLabel: "Automated Payment Gateway",
    tagline: "Fast & Safe Merchant Payments",
    desc: "Fast and safe payment checkout solution for online game stores. High transaction success rate, instant UPI & wallet payouts, and 24/7 monitoring.",
    icon: FiZap,
    features: [
      "Instant UPI & Local Cards",
      "High Success Transaction Rate",
      "Automated Wallet & Merchant Payouts",
      "Zero Maintenance Downtime",
      "Seamless API & Web Integration",
      "24/7 Transaction Monitoring"
    ],
    link: "https://xyzpay.site",
    accent: "#a855f7",
    badge: "PAYMENT GATEWAY",
    isNew: false,
  },
];

export default function OurProductsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="pt-6 sm:pt-8 md:pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">

          {/* Hero Section */}
          <div className="text-left mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 mb-3 max-w-full">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse flex-shrink-0" />
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.25em] text-[var(--accent)] truncate">
                The BlueBuff Ecosystem Suite (8 Products)
              </span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl md:text-5xl font-[1000] italic uppercase tracking-tighter mb-3"
            >
              Our <span className="text-[var(--accent)]">Products</span> &amp; Infrastructure
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xs sm:text-sm font-medium text-[var(--muted)] max-w-2xl leading-relaxed opacity-85"
            >
              Discover all 8 powerful products engineered by BlueBuff. From agency solutions and top-up portals to developer APIs, no-code builders, payment gateways, crypto checkouts, and web monitoring tools.
            </motion.p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="flex flex-col justify-between p-5 sm:p-6 rounded-[1.5rem] sm:rounded-[1.75rem] bg-[var(--card)]/40 border border-[var(--border)] hover:border-[var(--accent)] transition-all shadow-md group relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 rounded-[1.75rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top left, ${product.accent}15 0%, transparent 70%)` }}
                />

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-inner flex-shrink-0"
                      style={{ background: `${product.accent}18`, border: `1px solid ${product.accent}40` }}
                    >
                      <product.icon style={{ color: product.accent }} size={20} />
                    </div>

                    <div className="flex gap-1.5 items-center flex-wrap justify-end">
                      {product.isNew && (
                        <span
                          className="px-2 py-0.5 rounded-full text-[7px] sm:text-[8px] font-black uppercase tracking-widest text-black animate-pulse"
                          style={{ background: product.accent }}
                        >
                          NEW
                        </span>
                      )}
                      <span className="px-2 py-0.5 bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 text-[7px] sm:text-[8px] font-black uppercase tracking-widest rounded-full">
                        {product.badge}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-4">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-[1000] uppercase italic tracking-tighter leading-tight truncate">
                      {product.name}
                    </h2>
                    <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wide truncate" style={{ color: product.accent }}>
                      {product.tagline}
                    </p>
                    <p className="text-xs text-[var(--muted)] font-medium leading-relaxed opacity-80 pt-1 line-clamp-3">
                      {product.desc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1.5 pt-3 border-t border-[var(--border)]/60">
                      {product.features.map((feature, j) => (
                        <div key={j} className="flex items-center gap-1.5 overflow-hidden">
                          <FiCheckCircle style={{ color: product.accent }} size={10} className="flex-shrink-0" />
                          <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-tight text-[var(--muted)] truncate">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-[var(--border)]/40 mt-auto">
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: product.accent, color: "#ffffff" }}
                    className="flex-1 py-2.5 rounded-xl !text-white font-black text-[9px] sm:text-[10px] uppercase italic tracking-wider hover:brightness-110 shadow-md transition-all text-center flex items-center justify-center gap-1.5 truncate"
                  >
                    <span className="truncate !text-white" style={{ color: "#ffffff" }}>Visit {product.name}</span>
                    <FiExternalLink size={12} className="flex-shrink-0 !text-white" style={{ color: "#ffffff" }} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Infrastructure Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 sm:mt-16 p-6 sm:p-10 md:p-12 rounded-[2rem] bg-gradient-to-br from-[var(--card)] to-[var(--background)] border border-[var(--accent)]/30 text-center space-y-4 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-[1000] uppercase italic tracking-tighter">
                Ready to Partner or Build?
              </h3>
              <p className="text-[10px] sm:text-xs font-bold text-[var(--muted)] uppercase tracking-[0.2em]">
                Explore how the BlueBuff ecosystem can transform your business.
              </p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <Link
                href="/contact"
                style={{ color: "#000000" }}
                className="px-6 py-3 rounded-xl bg-[var(--accent)] !text-black text-[9px] sm:text-[10px] font-black uppercase italic tracking-widest hover:brightness-110 transition-all flex items-center gap-2"
              >
                <span style={{ color: "#000000" }}>Contact Sales &amp; Agency</span>
                <FiArrowRight size={14} style={{ color: "#000000" }} />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
