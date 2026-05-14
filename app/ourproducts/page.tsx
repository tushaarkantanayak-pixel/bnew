"use client";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { motion } from "framer-motion";
import { FiLayers, FiZap, FiChevronRight, FiCheckCircle, FiShield, FiGlobe, FiCpu } from "react-icons/fi";
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
      color: "from-purple-600 to-indigo-400"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">


      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4"
            >
              Our <span className="text-[var(--accent)]">Tactical</span> Products
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[10px] md:text-xs font-bold text-[var(--muted)] uppercase tracking-[0.4em] max-w-2xl mx-auto opacity-50 leading-relaxed"
            >
              The infrastructure for the next generation of gaming entrepreneurs.
            </motion.p>
          </div>

          {/* Products Grid */}
          <div className="space-y-24">
            {products.map((product, i) => (
              <div key={product.id} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex-1 space-y-6"
                >
                  <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20">
                    <product.icon className="text-[var(--accent)]" size={16} />
                    <span className="text-[9px] font-black uppercase tracking-widest text-[var(--accent)] italic">Product 0{i + 1}</span>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">{product.name}</h2>
                    <p className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-wide opacity-80">{product.tagline}</p>
                    <p className="text-[12px] text-[var(--muted)] font-medium leading-relaxed opacity-60 max-w-lg">
                      {product.desc}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[var(--card)]/40 border border-white/5">
                        <FiCheckCircle className="text-[var(--accent)] flex-shrink-0" size={14} />
                        <span className="text-[9px] font-black uppercase tracking-tight text-[var(--foreground)] opacity-70">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <button className="px-6 py-3 rounded-xl bg-[var(--accent)] text-white text-[9px] font-black uppercase italic tracking-widest hover:brightness-110 shadow-lg shadow-[var(--accent)]/20 transition-all">
                      Get Started
                    </button>
                    <button className="flex items-center gap-2 text-[9px] font-black uppercase italic tracking-widest text-[var(--muted)] hover:text-[var(--foreground)] transition-all">
                      Docs <FiChevronRight />
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex-1 relative w-full"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-10 blur-[100px] rounded-full`} />
                  <div className="relative aspect-video rounded-[2.5rem] bg-[var(--card)] border border-white/10 shadow-xl overflow-hidden flex items-center justify-center group">
                    <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:30px_30px]" />
                    <product.icon size={80} className="text-[var(--accent)] opacity-20 group-hover:scale-110 transition-transform duration-700" />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Infrastructure Banner */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 p-8 rounded-[2.5rem] bg-gradient-to-br from-[var(--card)] to-[var(--background)] border border-white/5 text-center space-y-6 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
            <div className="space-y-2">
              <h3 className="text-xl md:text-3xl font-black uppercase italic tracking-tighter">Ready to Deploy?</h3>
              <p className="text-[9px] font-bold text-[var(--muted)] uppercase tracking-[0.2em] opacity-40">Live in under 24 hours.</p>
            </div>
            <div className="flex justify-center">
              <button className="px-8 py-4 rounded-xl bg-[var(--foreground)] text-[var(--background)] text-[9px] font-black uppercase italic tracking-widest hover:bg-[var(--accent)] hover:text-white transition-all">
                Contact Sales
              </button>
            </div>
          </motion.div>
        </div>
      </main>


    </div>
  );
}
