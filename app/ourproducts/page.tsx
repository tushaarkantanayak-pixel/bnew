"use client";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { motion } from "framer-motion";
import { FiLayers, FiZap, FiChevronRight, FiCheckCircle, FiShield, FiGlobe, FiCpu, FiShare2 } from "react-icons/fi";
import Link from "next/link";

export default function OurProductsPage() {
  const products = [
    {
      id: "topup-web",
      name: "Game Topupweb",
      tagline: "The best website for game top-ups",
      desc: "Get a fast and automatic website for your game top-up business. It's easy to set up and works with many games.",
      icon: FiLayers,
      features: [
        "Check Player IDs easily",
        "Connect to many games",
        "Automatic wallet system",
        "Easy admin dashboard",
        "Make it look like your brand",
        "Safe and secure payments"
      ],
      link: "https://mlbbtopup.in",
      color: "from-blue-600 to-cyan-400"
    },
    {
      id: "payment-gateway",
      name: "Payment Gateway",
      tagline: "Fast and safe payments for your store",
      desc: "A secure way to accept payments from your customers. We make sure your money gets to you quickly and safely.",
      icon: FiZap,
      features: [
        "Get your money fast",
        "High payment success rate",
        "Supports UPI and more",
        "Safety and security first",
        "Easy to connect to your site",
        "24/7 monitoring"
      ],
      link: "https://xyzpay.site",
      color: "from-purple-600 to-indigo-400"
    },
    {
      id: "social-store-builder",
      name: "Social Store Builder",
      tagline: "Sell on Instagram, WhatsApp & Telegram",
      desc: "Sell gaming products directly on Instagram, WhatsApp, and Telegram. No coding needed, set up in minutes.",
      icon: FiShare2,
      features: [
        "Instagram & WhatsApp ready",
        "One-click product sharing",
        "Built-in order tracking",
        "No-code setup",
        "Branded storefront link",
        "Real-time notifications"
      ],
      link: "https://web.bluebuff.in",
      color: "from-pink-500 to-rose-400",
      isNew: true,
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">


      <main className="pt-8 md:pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-2"
            >
              Our <span className="text-[var(--accent)]">Products</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[10px] md:text-xs font-bold text-[var(--muted)] uppercase tracking-[0.4em] max-w-2xl mx-auto opacity-50 leading-relaxed"
            >
              Tools to grow your gaming business.
            </motion.p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col p-6 rounded-[2rem] bg-[var(--card)]/40 border border-[var(--foreground)]/5 hover:border-[var(--accent)]/50 transition-all shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center">
                    <product.icon className="text-[var(--accent)]" size={24} />
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-[var(--foreground)]/5 text-[var(--muted)] border border-[var(--foreground)]/10 text-[8px] font-black uppercase tracking-widest rounded-full">
                      Product 0{i + 1}
                    </span>
                    {(product as any).isNew && (
                      <span className="px-2 py-1 bg-[var(--accent)] text-black text-[8px] font-black rounded-full uppercase tracking-widest animate-pulse shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]">
                        NEW
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-3 flex-1">
                  <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter leading-tight">{product.name}</h2>
                  <p className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-wide opacity-80">{product.tagline}</p>
                  <p className="text-[11px] text-[var(--muted)] font-medium leading-relaxed opacity-60">
                    {product.desc}
                  </p>

                  <div className="grid grid-cols-1 gap-2 pt-2">
                    {product.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-2 p-2 rounded-xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/10">
                        <FiCheckCircle className="text-[var(--accent)] flex-shrink-0" size={12} />
                        <span className="text-[9px] font-black uppercase tracking-tight text-[var(--foreground)] opacity-70 truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-6 mt-auto">
                  <a href={product.link || "#"} target="_blank" rel="noopener noreferrer" className="flex-1 py-2.5 rounded-xl bg-[var(--accent)] !text-black text-[9px] font-black uppercase italic tracking-widest hover:brightness-110 shadow-lg shadow-[var(--accent)]/20 transition-all text-center">
                    Get Started
                  </a>
                  <button className="px-4 py-2.5 rounded-xl bg-[var(--foreground)]/5 text-[9px] font-black uppercase italic tracking-widest text-[var(--muted)] hover:text-[var(--foreground)] transition-all">
                    Docs
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Infrastructure Banner */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-6 md:p-8 rounded-[2rem] bg-gradient-to-br from-[var(--card)] to-[var(--background)] border border-[var(--foreground)]/5 text-center space-y-3 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">Ready to Start?</h3>
              <p className="text-[9px] font-bold text-[var(--muted)] uppercase tracking-[0.2em] opacity-40">Get started today.</p>
            </div>
            <div className="flex justify-center mt-2">
              <button className="px-6 py-3 rounded-xl bg-[var(--foreground)] text-[var(--background)] text-[9px] font-black uppercase italic tracking-widest hover:bg-[var(--accent)] hover:text-white transition-all">
                Contact Sales
              </button>
            </div>
          </motion.div>
        </div>
      </main>


    </div>
  );
}
