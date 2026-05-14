"use client";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { motion } from "framer-motion";
import { FiCpu, FiCode, FiCloud, FiCheckCircle, FiChevronRight, FiTrendingUp, FiSmartphone, FiUsers } from "react-icons/fi";

export default function ServicesPage() {
  const services = [
    {
      title: "API Integration",
      desc: "We connect your website to many games automatically. It's fast, safe, and easy to manage your business.",
      icon: FiCpu,
      tag: "Very Fast",
      features: ["Auto Top-ups", "Safe Payments", "Real-time Data"]
    },
    {
      title: "Custom Websites",
      desc: "We build beautiful and fast websites for your game store. Everything is made specifically for your brand.",
      icon: FiCode,
      tag: "Professional",
      features: ["Mobile Ready", "Easy to Use", "Fast Loading"]
    },
    {
      title: "Safe Hosting",
      desc: "We keep your website online 24/7 with our safe server hosting. You don't have to worry about anything.",
      icon: FiCloud,
      tag: "Always Online",
      features: ["Secure Servers", "Daily Backups", "24/7 Support"]
    },
    {
      title: "Marketing & SEO",
      desc: "We help more customers find your store on Google and social media so you can sell more.",
      icon: FiTrendingUp,
      tag: "Growth",
      features: ["Google Ads", "Better Search Rank", "More Traffic"]
    },
    {
      title: "Graphic Design",
      desc: "We create professional logos, banners, and game cards that make your brand look amazing.",
      icon: FiSmartphone,
      tag: "Design",
      features: ["Logos & Banners", "Game Assets", "Social Media Art"]
    },
    {
      title: "Social Media",
      desc: "We manage your WhatsApp and Telegram groups to keep your community active and happy.",
      icon: FiUsers,
      tag: "Community",
      features: ["Group Management", "Daily Updates", "Giveaways"]
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">


      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4"
            >
              Our <span className="text-[var(--accent)]">Solutions</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[10px] md:text-xs font-bold text-[var(--muted)] uppercase tracking-[0.4em] max-w-2xl mx-auto opacity-50 leading-relaxed"
            >
              Everything you need to grow your gaming business easily.
            </motion.p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 rounded-[2.5rem] bg-[var(--card)]/40 border border-white/5 hover:border-[var(--accent)]/30 transition-all duration-500 overflow-hidden flex flex-col"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all">
                    <service.icon size={22} />
                  </div>
                  <span className="text-[7px] font-black uppercase tracking-widest text-[var(--muted)]/40 border border-white/5 px-2 py-1 rounded-full group-hover:text-[var(--accent)] group-hover:border-[var(--accent)]/20 transition-all">{service.tag}</span>
                </div>

                <h4 className="text-lg font-black uppercase italic tracking-tighter mb-3 group-hover:text-[var(--accent)] transition-colors">{service.title}</h4>
                <p className="text-[11px] text-[var(--muted)] leading-relaxed font-bold uppercase tracking-wide opacity-50 mb-8">
                  {service.desc}
                </p>

                <div className="mt-auto space-y-3">
                  {service.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-2.5">
                      <FiCheckCircle className="text-[var(--accent)]" size={14} />
                      <span className="text-[9px] font-black uppercase tracking-tight text-[var(--foreground)] opacity-70">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="mt-8 flex items-center gap-2 text-[9px] font-black uppercase italic tracking-widest text-[var(--accent)] hover:translate-x-2 transition-transform">
                  Learn More <FiChevronRight />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Contact Banner */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 p-8 rounded-[2.5rem] bg-gradient-to-br from-[var(--card)] to-[var(--background)] border border-white/5 text-center space-y-6 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
            <div className="space-y-2">
              <h3 className="text-xl md:text-3xl font-black uppercase italic tracking-tighter">Need a Custom Plan?</h3>
              <p className="text-[9px] font-bold text-[var(--muted)] uppercase tracking-[0.2em] opacity-40">Talk to us and we'll help you build your dream store.</p>
            </div>
            <div className="flex justify-center">
              <button className="px-8 py-4 rounded-xl bg-[var(--foreground)] text-[var(--background)] text-[9px] font-black uppercase italic tracking-widest hover:bg-[var(--accent)] hover:text-white transition-all">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </main>


    </div>
  );
}
