"use client";

import { motion } from "framer-motion";
import { FiCpu, FiCode, FiCloud, FiTrendingUp, FiShoppingCart, FiArrowRight, FiMessageCircle, FiZap, FiSend } from "react-icons/fi";

export default function ServicesPage() {
  const whatsappLink = "https://wa.me/919178521537";

  const services = [
    {
      title: "API Connections",
      desc: "Fast, automatic connections for top-ups and game data.",
      icon: FiCpu,
      badge: "ELITE SPEED",
      active: true,
    },
    {
      title: "Custom Websites",
      desc: "Custom websites built to handle traffic and sell more.",
      icon: FiCode,
      badge: "ENTERPRISE",
      active: true,
    },
    {
      title: "Cloud Hosting",
      desc: "Fast, secure servers built to handle heavy traffic.",
      icon: FiCloud,
      badge: "ULTRA STABLE",
      active: true,
    },
    {
      title: "SEO Marketing",
      desc: "Get to the top of search results and get more customers.",
      icon: FiTrendingUp,
      badge: "MARKET LEADER",
      active: true,
    },
    {
      title: "Gaming Store Setup",
      desc: "Everything you need to launch your own gaming store.",
      icon: FiShoppingCart,
      badge: "WHITELABEL",
      active: true,
    },
    {
      title: "WhatsApp Bots",
      desc: "Automated customer support via WhatsApp. (1.5/mo or 1% of revenue)",
      icon: FiMessageCircle,
      badge: "AUTOMATION",
      active: true,
    },
    {
      title: "Telegram Bots",
      desc: "Fast and secure Telegram bot integration. (1/mo or 1% of revenue)",
      icon: FiSend,
      badge: "AUTOMATION",
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

      <div className="max-w-7xl mx-auto pt-8 md:pt-12 relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-left mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-2">
            Our <span className="text-[var(--accent)]">Solutions</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[10px] md:text-xs font-bold text-[var(--muted)] uppercase tracking-[0.4em] max-w-2xl opacity-50 leading-relaxed"
          >
            Grow your gaming business with our expert technology. We build the tools you need to succeed.
          </motion.p>
        </motion.div>

        {/* SERVICES LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => service.active && window.open(whatsappLink, "_blank")}
                className={`group relative p-4 md:p-5 rounded-[1.5rem] bg-[var(--card)]/40 border border-[var(--border)] transition-all duration-500 flex flex-col gap-3 hover:border-[var(--accent)]/50 hover:shadow-2xl hover:-translate-y-1 shadow-sm`}
              >
                {/* Top Row */}
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:text-white transition-all duration-500">
                    <Icon size={20} />
                  </div>
                  <span className="text-[8px] font-black px-3 py-1 rounded-full bg-white/5 text-[var(--muted)] border border-white/10 tracking-widest uppercase group-hover:text-[var(--accent)] group-hover:border-[var(--accent)]/30 transition-colors">
                    {service.badge}
                  </span>
                </div>

                {/* Bottom Section */}
                <div className="space-y-1.5 mt-1">
                  <h3 className="text-base font-black uppercase tracking-tighter italic text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-[var(--muted)] text-[10px] leading-relaxed opacity-60 font-bold uppercase tracking-tight">
                    {service.desc}
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
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
          className="mt-12 p-6 md:p-8 rounded-3xl border border-[var(--accent)]/20 bg-gradient-to-br from-[var(--card)]/60 to-[var(--background)] relative overflow-hidden text-center"
        >
          <div className="absolute inset-0 bg-[var(--accent)]/5 blur-[80px] pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <h4 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter">Ready to <span className="text-[var(--accent)]">Start?</span></h4>
            <p className="text-[var(--muted)] text-[11px] font-bold uppercase tracking-wider opacity-80 max-w-sm mx-auto">
              Our team is here to help you build and grow your business.
            </p>
            <button
              onClick={() => window.open(whatsappLink, "_blank")}
              className="mt-2 px-8 py-3.5 rounded-xl bg-[var(--accent)] text-white font-black uppercase tracking-wider text-[11px] italic shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <FiMessageCircle size={16} />
              Message Us
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
