"use client";

import { motion } from "framer-motion";
import { FiCpu, FiCode, FiCloud, FiTrendingUp, FiShoppingCart, FiArrowRight, FiMessageCircle, FiZap } from "react-icons/fi";

export default function ServicesPage() {
  const whatsappLink = "https://wa.me/919178521537";

  const services = [
    {
      title: "API Integration",
      desc: "High-speed, automated API connections for top-ups, game data, and seamless business workflows.",
      icon: FiCpu,
      badge: "ELITE SPEED",
      active: true,
    },
    {
      title: "Custom Website Development",
      desc: "Bespoke web applications built for scale, performance, and high-conversion gaming storefronts.",
      icon: FiCode,
      badge: "ENTERPRISE",
      active: true,
    },
    {
      title: "Cloud Infrastructure",
      desc: "Secure, high-uptime server solutions optimized for heavy traffic and instant digital delivery.",
      icon: FiCloud,
      badge: "ULTRA STABLE",
      active: true,
    },
    {
      title: "SEO Mastery",
      desc: "Dominating search rankings with advanced industry-specific strategies to drive organic growth.",
      icon: FiTrendingUp,
      badge: "MARKET LEADER",
      active: true,
    },
    {
      title: "Automated Marketplaces",
      desc: "End-to-end white-label solutions for launching your own branded gaming digital armory.",
      icon: FiShoppingCart,
      badge: "WHITELABEL",
      active: true,
    },
  ];

  return (
    <section className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-32 transition-colors duration-300 px-6">
      {/* BACKGROUND DECOR */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] aspect-square bg-[var(--accent)]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] aspect-square bg-[var(--accent)]/5 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto pt-24 md:pt-32 relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 mb-6">
            <FiZap className="text-[var(--accent)]" size={12} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--accent)]">Professional Services</span>
          </div>
          <h1 className="text-4xl md:text-[5rem] font-black italic tracking-tighter uppercase leading-[0.8] mb-6">
            <span className="text-[var(--accent)]">OUR</span> <br /> SOLUTIONS
          </h1>
          <p className="max-w-xl text-[var(--muted)] text-[12px] font-bold uppercase tracking-[0.2em] leading-relaxed opacity-60">
            Scale your gaming infrastructure with enterprise-grade technology and expert-level implementation. We build the backbone of modern gaming businesses.
          </p>
        </motion.div>

        {/* SERVICES LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => service.active && window.open(whatsappLink, "_blank")}
                className={`group relative p-8 rounded-[2.5rem] bg-[var(--card)]/40 border border-[var(--border)] transition-all duration-500 flex flex-col justify-between aspect-square md:aspect-auto min-h-[300px] hover:border-[var(--accent)]/50 hover:shadow-2xl hover:-translate-y-1 shadow-sm`}
              >
                {/* Top Row */}
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:text-white transition-all duration-500">
                    <Icon size={28} />
                  </div>
                  <span className="text-[8px] font-black px-3 py-1 rounded-full bg-white/5 text-[var(--muted)] border border-white/10 tracking-widest uppercase group-hover:text-[var(--accent)] group-hover:border-[var(--accent)]/30 transition-colors">
                    {service.badge}
                  </span>
                </div>

                {/* Bottom Section */}
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter italic text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-[var(--muted)] text-[11px] leading-relaxed opacity-60 font-bold uppercase tracking-tight">
                    {service.desc}
                  </p>
                  <div className="pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                    Inquire Now <FiArrowRight />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA SECTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-24 p-12 rounded-[3rem] border border-[var(--accent)]/20 bg-gradient-to-br from-[var(--card)]/60 to-[var(--background)] relative overflow-hidden text-center"
        >
          <div className="absolute inset-0 bg-[var(--accent)]/5 blur-[80px] pointer-events-none" />
          <div className="relative z-10 space-y-8">
            <h4 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter">Ready to <span className="text-[var(--accent)]">Ascend?</span></h4>
            <p className="text-[var(--muted)] text-[11px] font-black uppercase tracking-[0.3em] opacity-60 max-w-md mx-auto">
              Our experts are ready to architect your next big digital move.
            </p>
            <button
              onClick={() => window.open(whatsappLink, "_blank")}
              className="px-12 py-5 rounded-2xl bg-[var(--accent)] text-white font-black uppercase tracking-[0.3em] text-[11px] italic shadow-2xl hover:scale-[1.05] active:scale-95 transition-all flex items-center gap-3 mx-auto"
            >
              <FiMessageCircle size={16} />
              Consult With Us
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
