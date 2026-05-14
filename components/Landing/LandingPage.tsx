"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiZap, FiShield, FiCpu, FiUsers, FiClock, FiCode, FiSmartphone, FiCloud, FiCheck, FiTrendingUp, FiLayers, FiChevronRight, FiGrid, FiCompass, FiAward } from "react-icons/fi";
import GameCardGrid from "../Games/GameCardGrid";

export default function LandingPage() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch("/api/games");
        const json = await res.json();
        const allGames = json?.data?.games || [];

        const prioritySlugs = [
          "pubg-mobile138",
          "genshin-impact742",
          "honor-of-kings57",
          "where-winds-meet280",
          "mobile-legends988"
        ];

        const filtered = prioritySlugs
          .map(slug => allGames.find((g: any) => g.gameSlug === slug))
          .filter(Boolean);

        setGames(filtered);
      } catch (err) {
        console.error("Failed to fetch games:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  const scrollToGames = () => {
    const gamesSection = document.getElementById("games-section");
    if (gamesSection) {
      gamesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [activeCategory, setActiveCategory] = useState("gaming");

  const pricingData = {
    gaming: [
      { name: "Starter", subtitle: "Manual Store", price: "999", features: ["Manual Delivery", "Name Check", "Easy Admin", "WhatsApp Help"] },
      { name: "Growth", subtitle: "Auto Wallet", price: "4,999", features: ["Wallet System", "User Dashboard", "Orders Panel", "24/7 Support"], popular: true },
      { name: "Pro", subtitle: "Full Auto Hub", price: "9,999", features: ["Auto Delivery", "Bulk API", "Elite Analytics", "Priority SLA"] }
    ],
    billing: [
      { name: "Nano API", subtitle: "Basic Access", price: "49", features: ["API Keys", "Single Node", "Basic Logs", "Email Help"] },
      { name: "Whitelabel", subtitle: "Your Brand", price: "Custom", features: ["Custom Brand", "Full Control", "Unlimited Nodes", "Direct Support"] }
    ],
    business: [
      { name: "Landing", subtitle: "Single Page", price: "999", features: ["Modern Design", "Contact Form", "Mobile Ready", "Easy Setup"] },
      { name: "Blog", subtitle: "Content Hub", price: "1,499", features: ["Admin Panel", "SEO Ready", "Fast Loading", "Easy Writing"], popular: true },
      { name: "Custom Web", subtitle: "Any Project", price: "Contact", features: ["Specific Tools", "Complex Logic", "Full Hosting", "Long Support"] }
    ],
    esports: [
      { name: "Tourney Page", subtitle: "Single Event", price: "999", features: ["Event Details", "Simple Sign-up", "Mobile Ready", "Fast Setup"] },
      { name: "Esports Hub", subtitle: "Team System", price: "2,499", features: ["Team Rankings", "Match Results", "Player Profiles", "Admin Panel"], popular: true },
      { name: "League System", subtitle: "Full League", price: "Custom", features: ["Auto Brackets", "Point System", "Full Control", "Custom Rules"] }
    ]
  };

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] min-h-screen font-sans selection:bg-[var(--accent)]/30 overflow-x-hidden">

      {/* --- DYNAMIC BACKGROUND ELEMENTS --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--accent)]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `radial-gradient(var(--accent) 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-8 md:pt-32 pb-32 md:pb-40 overflow-hidden border-b border-[var(--border)]">
        {/* Animated Grid lines */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent" />
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <FiShield size={12} />
            India's Most Trusted Gaming Infrastructure
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-[4.8rem] font-[1000] tracking-tighter mb-8 leading-[0.85] italic uppercase"
          >
            BUILD YOUR <span className="text-[var(--accent)]">STORE & ESPORTS</span> <br />
            EMPIRE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] via-purple-400 to-blue-400">TODAY</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto text-[var(--muted)] text-sm md:text-base font-bold uppercase tracking-widest opacity-60 leading-relaxed mb-12 italic"
          >
            Automated Top-ups • Tournament Brackets • Safe Payments.
            The only tools you need to run a professional gaming business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="flex items-center justify-center gap-6 px-4">
              {[
                { label: "Services", href: "/services", icon: FiGrid },
                { label: "Products", href: "/ourproducts", icon: FiLayers },
                { label: "Dashboard", href: "/dashboard", icon: FiCompass },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="group flex items-center gap-2.5 text-[var(--muted)] hover:text-[var(--foreground)] font-black uppercase tracking-[0.15em] text-[9px] italic transition-all duration-300"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-[var(--accent)]/30 group-hover:bg-[var(--accent)]/10 transition-all duration-400 shrink-0">
                    <item.icon className="text-[var(--accent)] group-hover:scale-110 transition-all duration-300" size={13} />
                  </div>
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300 whitespace-nowrap">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>

            <button className="relative group w-full sm:w-auto px-10 py-3.5 rounded-2xl bg-gradient-to-r from-[var(--accent)] via-emerald-500 to-[var(--accent)] bg-[length:200%_auto] text-white font-[1000] uppercase tracking-[0.3em] text-[12px] italic transition-all duration-700 hover:bg-right hover:shadow-[0_0_40px_rgba(var(--accent-rgb),0.4)] hover:-translate-y-1 active:scale-95 overflow-hidden shadow-xl">
              {/* Internal Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
              
              <span className="relative z-10 flex items-center justify-center gap-3">
                Request Service 
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[var(--accent)] group-hover:translate-x-1.5 transition-all duration-500">
                  <FiArrowRight size={13} />
                </div>
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- TRUSTED BY SECTION --- */}
      <section className="py-20 border-b border-[var(--border)] bg-[var(--card)]/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="w-12 h-1 bg-[var(--accent)] rounded-full mx-auto mb-6" />
            <h2 className="text-3xl md:text-6xl font-[1000] italic tracking-tighter uppercase mb-4 leading-none">
              TEAMS THAT <span className="text-[var(--accent)]">DEPEND ON US</span>
            </h2>
            <p className="text-[10px] font-black text-[var(--muted)] uppercase tracking-[0.5em] opacity-40 italic">From solo developers to growing gaming platforms</p>
          </div>

          <div className="flex flex-col items-center gap-3 md:gap-4">
            {/* Row 1 — 3 items */}
            <div className="flex justify-center gap-3 md:gap-4 w-full">
              {["MLBB Topup", "Meowji Official", "Scammers Official"].map((team, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex-1 max-w-[220px] px-4 py-5 rounded-2xl bg-[var(--card)]/40 border border-white/5 backdrop-blur-sm text-[var(--muted)] font-[1000] uppercase tracking-wider text-[10px] md:text-[11px] italic hover:border-[var(--accent)]/30 hover:text-[var(--accent)] transition-all cursor-default text-center flex items-center justify-center"
                >
                  {team}
                </motion.div>
              ))}
            </div>
            {/* Row 2 — 2 items */}
            <div className="flex justify-center gap-3 md:gap-4">
              {["Yuji MLBB", "Topup Memo"].map((team, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i + 3) * 0.05 }}
                  className="w-[220px] px-4 py-5 rounded-2xl bg-[var(--card)]/40 border border-white/5 backdrop-blur-sm text-[var(--muted)] font-[1000] uppercase tracking-wider text-[10px] md:text-[11px] italic hover:border-[var(--accent)]/30 hover:text-[var(--accent)] transition-all cursor-default text-center flex items-center justify-center"
                >
                  {team}
                </motion.div>
              ))}
            </div>
            {/* Row 3 — 3 items */}
            <div className="flex justify-center gap-3 md:gap-4 w-full">
              {["Vampenttic Games", "Tronics Official", "BlueBuff"].map((team, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i + 5) * 0.05 }}
                  className="flex-1 max-w-[220px] px-4 py-5 rounded-2xl bg-[var(--card)]/40 border border-white/5 backdrop-blur-sm text-[var(--muted)] font-[1000] uppercase tracking-wider text-[10px] md:text-[11px] italic hover:border-[var(--accent)]/30 hover:text-[var(--accent)] transition-all cursor-default text-center flex items-center justify-center"
                >
                  {team}
                </motion.div>
              ))}
            </div>
            {/* Row 4 — 1 item */}
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="w-[220px] px-4 py-5 rounded-2xl bg-[var(--card)]/40 border border-white/5 backdrop-blur-sm text-[var(--muted)] font-[1000] uppercase tracking-wider text-[10px] md:text-[11px] italic hover:border-[var(--accent)]/30 hover:text-[var(--accent)] transition-all cursor-default text-center flex items-center justify-center"
              >
                Happy Store
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SOLUTIONS SECTION --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="w-12 h-1 bg-[var(--accent)] rounded-full mx-auto mb-6" />
            <h2 className="text-3xl md:text-6xl font-[1000] italic tracking-tighter uppercase mb-4 leading-none">
              HELP YOUR <span className="text-[var(--accent)]">STORE</span>
            </h2>
            <p className="text-[10px] font-black text-[var(--muted)] uppercase tracking-[0.5em] opacity-40 italic">Easy tools to grow your business</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: FiCpu, title: "Fast API", desc: "Connect your store to top-up providers with very fast and reliable systems.", tag: "Very Fast" },
              { icon: FiCode, title: "Easy Websites", desc: "We build beautiful and fast websites made for your game store.", tag: "Simple" },
              { icon: FiCloud, title: "Safe Hosting", desc: "Safe and strong servers that keep your website online all the time.", tag: "Always Online" },
              { icon: FiTrendingUp, title: "Marketing", desc: "Help more customers find your store on Google and social media.", tag: "Get Customers" },
              { icon: FiSmartphone, title: "Logo & Design", desc: "We make professional logos and banners to make your store look amazing.", tag: "Design" },
              { icon: FiAward, title: "Esports Tools", desc: "We build tournament brackets and player stat systems for your gaming events.", tag: "Pro Events" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-[var(--card)]/30 backdrop-blur-sm border border-white/5 hover:border-[var(--accent)]/40 hover:bg-[var(--card)]/50 transition-all duration-500"
              >
                <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity text-[var(--foreground)]">
                  <item.icon size={120} />
                </div>

                <div className="relative z-10">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] mb-6 md:mb-8 border border-[var(--accent)]/20 shadow-[0_0_20px_-5px_rgba(var(--accent-rgb),0.3)]">
                    <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-[8px] font-black uppercase tracking-widest text-[var(--muted)] mb-3 md:mb-4 border border-white/5">{item.tag}</div>
                  <h4 className="text-xl md:text-2xl font-[900] uppercase italic tracking-tighter mb-3 md:mb-4 group-hover:text-[var(--accent)] transition-colors">{item.title}</h4>
                  <p className="text-[12px] text-[var(--muted)] leading-relaxed font-bold uppercase tracking-tight opacity-50">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MISSION STATS BAR --- */}
      <section className="py-20 border-y border-[var(--border)] bg-[var(--card)]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Business Clients", value: "10+" },
              { label: "Combined Orders", value: "1,000+" },
              { label: "Success Rate", value: "99.9%" },
              { label: "Fast Systems", value: "24/7" }
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="text-3xl md:text-5xl font-[1000] italic tracking-tighter text-[var(--accent)] uppercase">{stat.value}</div>
                <div className="text-[10px] font-black text-[var(--muted)] uppercase tracking-[0.3em] opacity-40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRODUCTS SECTION --- */}
      <section id="products" className="py-20 md:py-32 bg-[var(--background)] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <div className="w-12 h-1 bg-[var(--accent)] rounded-full mx-auto mb-6" />
            <h2 className="text-3xl md:text-6xl font-[1000] italic tracking-tighter uppercase mb-4 leading-none">
              BEST <span className="text-[var(--accent)]">TOOLS</span>
            </h2>
            <p className="text-[10px] font-black text-[var(--muted)] uppercase tracking-[0.5em] opacity-40 italic">Simple systems to help your store</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {[
              {
                name: "Game Topupweb",
                desc: "The best way to sell game items. Fully automatic, very fast, and easy for customers to use.",
                icon: FiLayers,
                features: ["Check IDs quickly", "Support many games", "Automatic delivery", "Easy admin panel"],
                accent: "var(--accent)"
              },
              {
                name: "Payment Gateway",
                desc: "A safe and fast way to take payments for your game store orders.",
                icon: FiZap,
                features: ["Get money fast", "Very low fees", "Safe and secure", "Always working"],
                accent: "#a855f7"
              }
            ].map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative p-6 md:p-12 rounded-[2.5rem] md:rounded-[4rem] bg-[var(--card)]/40 border border-white/5 hover:border-[var(--accent)]/30 transition-all duration-700"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[4rem]" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] mb-6 md:mb-10 group-hover:scale-110 transition-transform">
                    <product.icon className="w-8 h-8 md:w-10 md:h-10" />
                  </div>

                  <h3 className="text-2xl md:text-5xl font-[1000] uppercase italic tracking-tighter mb-4 md:mb-6">{product.name}</h3>
                  <p className="text-[12px] md:text-[13px] text-[var(--muted)] font-bold uppercase tracking-widest opacity-60 leading-relaxed mb-8 md:mb-10">
                    {product.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-12">
                    {product.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-2 md:gap-3 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[var(--muted)]/40 italic">
                        <FiCheck className="text-[var(--accent)]" />
                        {f}
                      </div>
                    ))}
                  </div>

                  <button className="inline-flex items-center gap-4 text-[12px] font-[1000] uppercase italic tracking-[0.2em] text-[var(--accent)] group-hover:gap-6 transition-all">
                    See More Details <FiArrowRight />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 relative overflow-hidden border-y border-[var(--border)]">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent)]/5 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="w-12 h-1 bg-[var(--accent)] rounded-full mx-auto mb-6" />
            <h2 className="text-3xl md:text-6xl font-[1000] italic tracking-tighter uppercase mb-4 leading-none">
              CHOOSE A <span className="text-[var(--accent)]">PLAN</span>
            </h2>
            <p className="text-[10px] font-black text-[var(--muted)] uppercase tracking-[0.5em] opacity-40 italic">Simple prices for every business</p>
          </div>

          {/* TAB SELECTOR */}
          <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-2 md:gap-3 mb-10 md:mb-16">
            {[
              { id: "gaming", label: "Gaming Stores", icon: FiLayers },
              { id: "billing", label: "Billing Systems", icon: FiZap },
              { id: "business", label: "Business Sites", icon: FiGrid },
              { id: "esports", label: "Esports", icon: FiAward }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`flex items-center gap-2 md:gap-3 px-4 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-[1000] uppercase italic tracking-widest text-[8px] md:text-[9px] transition-all border ${activeCategory === tab.id
                  ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                  : 'bg-white/5 text-[var(--muted)] border-white/5 hover:border-[var(--accent)]/30'
                  }`}
              >
                <tab.icon className="w-3 h-3 md:w-3.5 md:h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {pricingData[activeCategory as keyof typeof pricingData].map((plan: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] bg-[var(--card)]/40 backdrop-blur-xl border ${plan.popular ? 'border-[var(--accent)] shadow-[0_0_40px_-10px_rgba(var(--accent-rgb),0.3)] scale-105 z-10' : 'border-white/5'} flex flex-col items-center text-center relative hover:border-[var(--accent)]/40 transition-all duration-500`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[var(--accent)] text-white text-[8px] font-[1000] rounded-full uppercase tracking-[0.2em] italic shadow-lg">
                    Best Value
                  </div>
                )}
                <h4 className="text-2xl font-[1000] uppercase italic tracking-tighter mb-1">{plan.name}</h4>
                <p className="text-[9px] font-black text-[var(--muted)] uppercase tracking-widest mb-6 md:mb-10 opacity-40">{plan.subtitle}</p>

                <div className="text-4xl md:text-5xl font-[1000] italic tracking-tighter mb-8 md:mb-12 text-[var(--foreground)]">
                  {plan.price !== "Contact" && plan.price !== "Custom" && <span className="text-xl mr-1 text-[var(--accent)]">₹</span>}{plan.price}
                </div>

                <div className="w-full space-y-3 md:space-y-5 mb-8 md:mb-12 text-left">
                  {plan.features.map((f: string, j: number) => (
                    <div key={j} className="flex items-center gap-3 text-[9px] md:text-[10px] font-black text-[var(--muted)] uppercase tracking-tight opacity-50 italic">
                      <FiCheck className="text-[var(--accent)] flex-shrink-0" size={14} />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-4 md:py-5 rounded-xl md:rounded-2xl font-[1000] uppercase tracking-widest text-[10px] italic transition-all ${plan.popular ? 'bg-[var(--accent)] text-white hover:shadow-[0_10px_20px_rgba(var(--accent-rgb),0.3)]' : 'bg-white/5 hover:bg-white/10 text-[var(--foreground)]'}`}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- TRANSFORMATION SECTION --- */}
      <section className="py-24 md:py-40 bg-[var(--background)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/5 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-[var(--accent)]/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img
                src="/landing/transformation.png"
                alt="Transformation"
                className="relative w-full max-w-xl mx-auto rounded-[4rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>

            <div className="space-y-10">
              <div className="w-12 h-1 bg-[var(--accent)] rounded-full mb-6" />
              <h2 className="text-4xl md:text-8xl font-[1000] uppercase italic tracking-tighter leading-[0.8] mb-6">
                OUR <span className="text-[var(--accent)]">MISSION</span>
              </h2>
              <p className="text-[13px] md:text-lg text-[var(--muted)] leading-relaxed font-bold uppercase tracking-widest opacity-60 italic">
                BlueBuff helps the next generation of gaming store owners. We build the tools that help you grow your business with speed and safety.
              </p>
              <button className="relative group px-12 py-5 rounded-2xl border border-[var(--accent)]/30 text-[var(--accent)] font-[1000] uppercase tracking-[0.3em] text-[11px] italic overflow-hidden transition-all hover:text-white">
                <div className="absolute inset-0 bg-[var(--accent)] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10">Learn More</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- GAMES GRID SECTION --- */}
      <section id="games-section" className="py-16 md:py-24 bg-[var(--background)] border-t border-[var(--border)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="w-12 h-1 bg-[var(--accent)] rounded-full mx-auto mb-6" />
            <h2 className="text-4xl md:text-7xl font-[1000] uppercase italic tracking-tighter leading-none mb-4">
              ASSET <span className="text-[var(--accent)]">HUB</span>
            </h2>
            <p className="text-[10px] font-black text-[var(--muted)] uppercase tracking-[0.5em] italic opacity-40">Fast and automatic game top-ups</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-[2rem] bg-[var(--card)] animate-pulse border border-white/5" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-6">
              {games.map((game, i) => (
                <GameCardGrid
                  key={game.gameSlug}
                  game={game}
                  isOutOfStock={() => false}
                  index={i}
                />
              ))}
            </div>
          )}

          <div className="mt-24 text-center">
            <Link
              href="/games"
              className="inline-flex items-center gap-4 md:gap-6 px-10 py-4 md:px-16 md:py-6 rounded-2xl md:rounded-[2.5rem] bg-[var(--card)] border border-white/5 hover:border-[var(--accent)]/40 text-[var(--foreground)] font-[1000] uppercase tracking-[0.3em] text-[10px] md:text-[12px] italic transition-all group shadow-2xl"
            >
              View All Games
              <div className="w-10 h-10 rounded-2xl bg-[var(--accent)] flex items-center justify-center text-white group-hover:rotate-[360deg] transition-all duration-700 shadow-lg">
                <FiArrowRight size={18} />
              </div>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
