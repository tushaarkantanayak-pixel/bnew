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
          "mobile-legends270"
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
      { name: "Growth", subtitle: "Auto Wallet", price: "4,999", features: ["Everything in Starter", "Wallet System", "Advanced Admin", "Analytics", "24/7 Support"], popular: true },
      { name: "Pro", subtitle: "Full Auto Hub", price: "9,999", features: ["Everything in Growth", "Auto Delivery", "Perfect SEO", "Priority Support", "Custom Design"] }
    ],
    billing: [
      { name: "NANO", subtitle: "49rs /month", price: "49", features: ["API Key", "All Log", "Merchant Add", "Customer Support"] },
      { name: "Whitelabel", subtitle: "Your Brand", price: "Custom", features: ["Custom Brand", "Full Control", "Unlimited Nodes", "Direct Support"] }
    ],
    business: [
      { name: "Landing", subtitle: "Single Page", price: "999", features: ["Responsive Design", "Landing Pages", "No Backend / No DB", "Easy Setup"] },
      { name: "Blog", subtitle: "Content Hub", price: "2,999", features: ["Admin Panel", "SEO Ready", "Fast Loading", "Easy Writing"], popular: true },
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

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--accent)]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `radial-gradient(var(--accent) 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} />
      </div>

      {/* ============================================================ */}
      {/* MOBILE HERO — full-bleed, shown only below md breakpoint      */}
      {/* ============================================================ */}
      <section className="relative md:hidden overflow-hidden" style={{ height: "100svh", minHeight: "640px" }}>

        {/* ── Background image ── */}
        <img
          src="/landing/1.png"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ zIndex: 0 }}
        />

        {/* ── Heavy dark gradient from bottom so text always readable ── */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background: "linear-gradient(to top, #000000 0%, #000000cc 38%, #00000066 60%, transparent 100%)"
          }}
        />
        {/* left-side dark strip for badge readability */}
        <div
          className="absolute inset-0"
          style={{ zIndex: 1, background: "linear-gradient(to right, #000000aa 0%, transparent 70%)" }}
        />

        {/* ── TOP badge ── */}
        <div className="absolute top-0 left-0 right-0 pt-4 px-5" style={{ zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(12px)" }}
          >
            <FiShield size={10} color="var(--accent)" />
            <span style={{ color: "var(--accent)", fontSize: "9px", fontWeight: 900, letterSpacing: "0.22em", textTransform: "uppercase" }}>
              India&apos;s Most Trusted Gaming Infrastructure
            </span>
          </motion.div>
        </div>

        {/* ── BOTTOM content: heading + subtitle + CTAs ── */}
        <div
          className="absolute bottom-0 left-0 right-0 px-5 flex flex-col gap-4"
          style={{ zIndex: 2, paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 80px)" }}
        >
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: "clamp(2.2rem, 10vw, 3rem)",
              fontWeight: 1000,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              fontStyle: "italic",
              color: "#ffffff",
              margin: 0,
            }}
          >
            BUILD YOUR{" "}
            <span style={{ color: "var(--accent)" }}>STORE &amp;<br />ESPORTS</span>
            <br />EMPIRE{" "}
            <span style={{ color: "var(--accent)" }}>TODAY</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            style={{ color: "rgba(255,255,255,0.65)", fontSize: "12px", fontWeight: 500, lineHeight: 1.5, margin: 0 }}
          >
            Dominate the game. We handle the infrastructure.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            className="flex flex-col gap-3 w-full"
          >
            {/* Primary — Request Service */}
            <Link
              href="/contact"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                padding: "14px 24px",
                borderRadius: "16px",
                background: "var(--accent)",
                color: "#ffffff",
                fontWeight: 900,
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                fontStyle: "italic",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                textDecoration: "none",
              }}
            >
              <span style={{ color: "#ffffff" }}>Request Service</span>
              <span style={{
                width: 30, height: 30, borderRadius: "50%",
                background: "rgba(255,255,255,0.22)",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <FiArrowRight size={15} color="#ffffff" />
              </span>
            </Link>

            {/* Secondary — Build Your Own Store */}
            <a
              href="https://web.bluebuff.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "13px 24px",
                borderRadius: "16px",
                border: "1.5px solid rgba(255,255,255,0.25)",
                background: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
                color: "#ffffff",
                fontWeight: 900,
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                fontStyle: "italic",
                textDecoration: "none",
              }}
            >
              <span style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "var(--accent)",
                flexShrink: 0,
                boxShadow: "0 0 8px var(--accent)"
              }} />
              <span style={{ color: "#ffffff" }}>Build Your Own Store</span>
              <FiArrowRight size={13} color="#ffffff" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* DESKTOP HERO — shown only on md+                             */}
      {/* ============================================================ */}
      <section className="relative hidden md:flex pt-14 pb-12 md:pb-16 overflow-hidden bg-[var(--background)] text-[var(--foreground)] min-h-[60vh] items-center border-b border-[var(--border)]">
        
        {/* Background glow effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent)]/10 blur-[150px] rounded-full" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column (Text) */}
          <div className="flex flex-col items-start text-left relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-[10px] font-black uppercase tracking-[0.3em] mb-6 md:mb-8"
            >
              <FiShield size={12} />
              India's Most Trusted Gaming Infrastructure
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-4xl lg:text-[3.5rem] font-[1000] mb-3 leading-[1.1] tracking-tighter uppercase italic"
            >
              BUILD YOUR <span className="text-[var(--accent)]">STORE & ESPORTS</span> <br />
              EMPIRE <span className="text-[var(--accent)]">TODAY</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-2 max-w-lg mb-4"
            >
              {[
                "Game Top-up API",
                "Custom Websites",
                "Social Store Builder",
                "Safe Hosting",
                "Payment Gateway",
                "Logo & Design",
                "Esports Tools",
                "Marketing & SEO",
                "24/7 Support",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--card)]/50 text-[var(--muted)] text-[8px] font-black uppercase tracking-widest opacity-80"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4 w-full"
            >
              <div className="flex flex-wrap items-center gap-4">
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
                    <div className="w-7 h-7 rounded-lg bg-[var(--foreground)]/5 flex items-center justify-center border border-[var(--border)] group-hover:border-[var(--accent)]/30 group-hover:bg-[var(--accent)]/10 transition-all duration-400 shrink-0">
                      <item.icon className="text-[var(--accent)] group-hover:scale-110 transition-all duration-300" size={13} />
                    </div>
                    <span className="group-hover:translate-x-0.5 transition-transform duration-300 whitespace-nowrap">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>

              <Link href="/contact" className="relative group w-full sm:w-auto self-start px-10 py-4 rounded-2xl bg-[var(--accent)] !text-white font-bold uppercase tracking-[0.3em] text-[13px] md:text-[14px] italic transition-all duration-500 hover:shadow-[0_20px_50px_-10px_rgba(var(--accent-rgb),0.5)] hover:-translate-y-1 active:scale-95 overflow-hidden shadow-xl">
                <span className="relative z-10 flex items-center justify-center gap-4">
                  Request Service
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:!text-[var(--accent)] group-hover:translate-x-1.5 transition-all duration-500">
                    <FiArrowRight size={15} />
                  </div>
                </span>
              </Link>

              {/* Build Your Own Store secondary CTA */}
              <a
                href="https://web.bluebuff.in"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto self-start inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl border border-[var(--accent)]/40 bg-[var(--accent)]/5 text-[var(--accent)] font-black uppercase tracking-[0.2em] text-[11px] md:text-[12px] italic transition-all duration-300 hover:bg-[var(--accent)]/15 hover:border-[var(--accent)]/70 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_-5px_rgba(var(--accent-rgb),0.3)]"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse shrink-0" />
                Build Your Own Store
                <FiArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </motion.div>
            
            {/* The sweeping arc line decoration */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="absolute top-[90%] left-[-20%] w-[120%] h-[200px] pointer-events-none hidden md:block"
            >
               <svg viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-60">
                 <path d="M -100 100 Q 250 200 450 50" stroke="url(#accentGradient)" strokeWidth="1.5" fill="none" />
                 <circle cx="450" cy="50" r="4" fill="var(--accent)" />
                 <defs>
                   <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
                     <stop offset="100%" stopColor="var(--accent)" stopOpacity="1" />
                   </linearGradient>
                 </defs>
               </svg>
            </motion.div>
          </div>

          {/* Right Column (Slanted Images) */}
          <div className="relative h-[300px] md:h-[400px] lg:h-[450px] w-full flex items-center justify-end lg:-mr-[15%] z-10 perspective-[1000px] mt-6 lg:mt-0">
             {/* Container for the skewed cards */}
             <div className="flex gap-2 md:gap-4 transform -skew-x-[15deg] h-full overflow-hidden lg:overflow-visible w-[120%] lg:w-[130%] justify-center lg:justify-end ml-[-10%] lg:ml-0">
               
               {/* Card 1 */}
               <motion.div 
                 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                 className="relative w-[70px] md:w-[130px] lg:w-[160px] h-full overflow-hidden shadow-2xl group hover:w-[100px] md:hover:w-[180px] lg:hover:w-[220px] transition-all duration-500 border-2 border-[var(--border)]"
               >
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                 <img src="/landing/hero_mage.png" className="absolute w-[250%] md:w-[180%] lg:w-[160%] h-full max-w-none object-cover transform skew-x-[15deg] -ml-[75%] md:-ml-[40%] lg:-ml-[30%] group-hover:scale-105 transition-transform duration-700" alt="Mage" />
               </motion.div>

               {/* Card 2 */}
               <motion.div 
                 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                 className="relative w-[70px] md:w-[130px] lg:w-[160px] h-[95%] self-center overflow-hidden shadow-2xl group hover:w-[100px] md:hover:w-[180px] lg:hover:w-[220px] transition-all duration-500 border-2 border-[var(--border)]"
               >
                 <div className="absolute inset-0 bg-red-900/50 group-hover:bg-black/0 transition-colors duration-500 z-10 mix-blend-multiply" />
                 <img src="/landing/hero_rogue.png" className="absolute w-[250%] md:w-[180%] lg:w-[160%] h-full max-w-none object-cover transform skew-x-[15deg] -ml-[75%] md:-ml-[40%] lg:-ml-[30%] group-hover:scale-105 transition-transform duration-700" alt="Rogue" />
               </motion.div>

               {/* Card 3 */}
               <motion.div 
                 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                 className="relative w-[70px] md:w-[130px] lg:w-[160px] h-[90%] self-center overflow-hidden shadow-2xl group hover:w-[100px] md:hover:w-[180px] lg:hover:w-[220px] transition-all duration-500 border-2 border-[var(--border)]"
               >
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                 <img src="/landing/hero_tactical.png" className="absolute w-[250%] md:w-[180%] lg:w-[160%] h-full max-w-none object-cover transform skew-x-[15deg] -ml-[75%] md:-ml-[40%] lg:-ml-[30%] group-hover:scale-105 transition-transform duration-700" alt="Tactical" />
               </motion.div>

               {/* Card 4 */}
               <motion.div 
                 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                 className="relative w-[70px] md:w-[130px] lg:w-[160px] h-[85%] self-center overflow-hidden shadow-2xl group hover:w-[100px] md:hover:w-[180px] lg:hover:w-[220px] transition-all duration-500 border-2 border-[var(--border)]"
               >
                 <div className="absolute inset-0 bg-[var(--accent)]/30 group-hover:bg-black/0 transition-colors duration-500 z-10 mix-blend-overlay" />
                 <img src="/landing/hero_cyborg.png" className="absolute w-[250%] md:w-[180%] lg:w-[160%] h-full max-w-none object-cover transform skew-x-[15deg] -ml-[75%] md:-ml-[40%] lg:-ml-[30%] group-hover:scale-105 transition-transform duration-700" alt="Cyborg" />
               </motion.div>

             </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-[var(--border)] bg-[var(--background)] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-[10px] font-bold uppercase tracking-widest mb-4">
              <FiUsers size={12} />
              Community Trusted
            </div>
            <h2 className="text-3xl md:text-5xl font-[1000] tracking-tighter uppercase mb-4 leading-none">
              TEAMS THAT <span className="text-[var(--accent)]">DEPEND ON US</span>
            </h2>
            <p className="text-sm text-[var(--muted)] max-w-lg mx-auto">From solo developers to growing gaming platforms.</p>
          </div>
        </div>

        <div className="relative w-full overflow-hidden flex flex-col gap-6 z-10">
          {/* Fading edges for marquee */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--background)] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--background)] to-transparent z-20 pointer-events-none" />
          
          <div className="animate-marquee flex gap-6 w-max">
            {[
              "MLBB Topup", "Meowji Official", "Scammers Official", "Yuji MLBB", "Topup Memo", "Vampenttic Games", "Tronics Official", "BlueBuff", "Happy Official Store",
              "MLBB Topup", "Meowji Official", "Scammers Official", "Yuji MLBB", "Topup Memo", "Vampenttic Games", "Tronics Official", "BlueBuff", "Happy Official Store"
            ].map((team, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-[var(--card)]/40 border border-white/5 backdrop-blur-md hover:border-[var(--accent)]/30 transition-all cursor-default group"
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] font-bold text-sm border border-[var(--accent)]/20 group-hover:scale-110 transition-transform">
                  {team.charAt(0)}
                </div>
                <span className="text-sm font-bold tracking-wider text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors whitespace-nowrap">
                  {team}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SOLUTIONS SECTION --- */}
      <section className="py-24 relative overflow-hidden bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-[1000] tracking-tighter uppercase mb-4 leading-none">
              POWER YOUR <span className="text-[var(--accent)]">STORE</span>
            </h2>
            <p className="text-sm text-[var(--muted)] max-w-lg mx-auto">Premium tools built specifically to scale your gaming business.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: FiCpu, title: "Fast API", desc: "Connect your store to top-up providers with blazing fast and reliable systems.", tag: "Lightning Fast" },
              { icon: FiCode, title: "Custom Websites", desc: "We build beautiful, highly-performant websites tailored to your gaming brand.", tag: "Bespoke" },
              { icon: FiCloud, title: "Safe Hosting", desc: "Secure and robust server infrastructure that keeps your platform online 24/7.", tag: "99.9% Uptime" },
              { icon: FiTrendingUp, title: "Marketing & SEO", desc: "Expand your reach and acquire more customers through targeted digital marketing.", tag: "Growth" },
              { icon: FiSmartphone, title: "Brand Identity", desc: "Professional logos, banners, and UI design to make your store stand out.", tag: "Design" },
              { icon: FiAward, title: "Esports Tools", desc: "Integrated tournament brackets, team management, and automated stat tracking.", tag: "Pro Events" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 rounded-3xl bg-[var(--card)]/40 backdrop-blur-xl border border-white/5 hover:border-[var(--accent)]/30 hover:bg-[var(--card)]/60 transition-all duration-500"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] border border-[var(--accent)]/20 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)] transition-all duration-500">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] border border-[var(--accent)]/20">
                      {item.tag}
                    </div>
                  </div>
                  <h4 className="text-2xl font-[1000] uppercase tracking-tighter mb-3 group-hover:text-[var(--accent)] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MISSION STATS BAR --- */}
      <section className="py-16 bg-[var(--card)]/10 border-y border-[var(--border)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-transparent to-[var(--background)] pointer-events-none z-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { label: "Business Clients", value: "10+" },
              { label: "Combined Orders", value: "1,000+" },
              { label: "Success Rate", value: "99.9%" },
              { label: "Fast Systems", value: "24/7" }
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-2 group">
                <div className="text-4xl md:text-5xl font-[1000] tracking-tighter text-[var(--accent)] drop-shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)] group-hover:scale-105 transition-transform">{stat.value}</div>
                <div className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRODUCTS SECTION --- */}
      <section id="products" className="py-24 bg-[var(--background)] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-[1000] tracking-tighter uppercase mb-4 leading-none">
              BEST <span className="text-[var(--accent)]">TOOLS</span>
            </h2>
            <p className="text-sm text-[var(--muted)] max-w-lg mx-auto">Core systems powering the next generation of esports platforms.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                name: "Game Topup System",
                desc: "The ultimate solution for selling game items. Fully automated, lightning fast, and highly secure for high-volume transactions.",
                icon: FiLayers,
                features: ["Real-time ID verification", "Multi-game support", "Instant delivery", "Comprehensive dashboard"],
                tag: "Core Product",
                color: "from-blue-500 to-cyan-400",
              },
              {
                name: "Payment Gateway",
                desc: "A secure, robust payment infrastructure designed specifically to handle gaming transactions with zero downtime.",
                icon: FiZap,
                features: ["Instant settlements", "Ultra-low fees", "Bank-grade security", "99.99% uptime SLA"],
                tag: "Infrastructure",
                color: "from-purple-500 to-indigo-400",
              },
              {
                name: "Social Store Builder",
                desc: "Launch your own branded social commerce store and sell gaming products directly through Instagram, WhatsApp, and Telegram with zero friction.",
                icon: FiUsers,
                features: ["Instagram & WhatsApp ready", "One-click product sharing", "Built-in order tracking", "No-code setup"],
                tag: "New",
                color: "from-pink-500 to-rose-400",
                isNew: true,
              },
            ].map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group relative p-8 md:p-10 rounded-3xl bg-[var(--card)]/40 border ${
                  (product as any).isNew
                    ? 'border-[var(--accent)]/40 shadow-[0_0_40px_rgba(var(--accent-rgb),0.1)]'
                    : 'border-white/5 hover:border-[var(--accent)]/30'
                } hover:bg-[var(--card)]/60 transition-all duration-700 overflow-hidden`}
              >
                {/* Background glow effect */}
                <div className={`absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br ${(product as any).color} opacity-5 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none group-hover:opacity-10 transition-opacity duration-700`} />

                {(product as any).isNew && (
                  <div className="absolute -top-3 -right-3 z-20">
                    <div className="px-3 py-1 bg-[var(--accent)] text-white text-[9px] font-black rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)] animate-pulse">
                      NEW
                    </div>
                  </div>
                )}

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] border border-[var(--accent)]/20 shadow-[0_0_20px_rgba(var(--accent-rgb),0.2)] group-hover:scale-110 transition-transform">
                      <product.icon className="w-8 h-8" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[9px] font-black uppercase tracking-widest text-[var(--accent)]">
                      {(product as any).tag}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-[1000] tracking-tighter mb-4 group-hover:text-[var(--accent)] transition-colors">{product.name}</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed mb-8 flex-grow">
                    {product.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                    {product.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-3 text-xs font-bold text-[var(--muted)]">
                        <FiCheck className="text-[var(--accent)]" size={14} />
                        {f}
                      </div>
                    ))}
                  </div>

                  <Link href="/ourproducts" className="mt-auto self-start inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all group/btn">
                    Explore Details <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 relative overflow-hidden border-y border-[var(--border)] bg-[var(--background)]">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)]/5 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-[1000] tracking-tighter uppercase mb-4 leading-none">
              CHOOSE A <span className="text-[var(--accent)]">PLAN</span>
            </h2>
            <p className="text-xs md:text-sm text-[var(--muted)] max-w-lg mx-auto">Scalable solutions designed for every stage of your business.</p>
          </div>

          {/* TAB SELECTOR */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-12">
            {[
              { id: "gaming", label: "Gaming Stores", icon: FiLayers },
              { id: "billing", label: "Payment Gateway", icon: FiZap },
              { id: "business", label: "Business Sites", icon: FiGrid },
              { id: "esports", label: "Esports", icon: FiAward }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`flex items-center gap-1.5 md:gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full font-bold uppercase tracking-wider text-[9px] md:text-[10px] transition-all border ${activeCategory === tab.id
                  ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]'
                  : 'bg-[var(--card)]/50 text-[var(--muted)] border-white/5 hover:border-[var(--accent)]/30 hover:bg-[var(--card)]'
                  }`}
              >
                <tab.icon className="w-3 h-3 md:w-3.5 md:h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {pricingData[activeCategory as keyof typeof pricingData].map((plan: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group p-6 md:p-8 rounded-3xl bg-[var(--card)]/40 backdrop-blur-xl border ${plan.popular ? 'border-[var(--accent)] shadow-[0_0_30px_rgba(var(--accent-rgb),0.15)] lg:scale-105 z-10' : 'border-white/5 hover:border-[var(--accent)]/30'} flex flex-col relative transition-all duration-500`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--accent)] text-white text-[9px] font-bold rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(var(--accent-rgb),0.4)] whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-5">
                  <h4 className="text-lg md:text-xl font-[1000] tracking-tight mb-1">{plan.name}</h4>
                  <p className="text-[10px] md:text-[11px] font-bold text-[var(--muted)] uppercase tracking-wider">{plan.subtitle}</p>
                </div>

                <div className="text-center text-3xl md:text-4xl font-[1000] tracking-tighter mb-6 text-[var(--foreground)]">
                  {plan.price !== "Contact" && plan.price !== "Custom" && <span className="text-xl md:text-2xl mr-1 text-[var(--accent)]">₹</span>}{plan.price}
                </div>

                <div className="w-full space-y-3 mb-8 flex-grow">
                  {plan.features.map((f: string, j: number) => (
                    <div key={j} className={`flex items-start gap-3 text-xs md:text-sm font-medium transition-all duration-300 ${j === 0 ? 'text-[var(--foreground)]' : 'text-[var(--muted)]'}`}>
                      <FiCheck className={`mt-0.5 ${j === 0 ? 'text-[var(--accent)] drop-shadow-[0_0_5px_rgba(var(--accent-rgb),0.5)]' : 'text-[var(--accent)]/60'} flex-shrink-0`} size={14} />
                      <span className="leading-tight">{f}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-3.5 rounded-xl font-bold uppercase tracking-widest text-[10px] md:text-[11px] transition-all ${plan.popular ? 'bg-[var(--accent)] text-white hover:shadow-[0_10px_20px_rgba(var(--accent-rgb),0.3)]' : 'bg-white/5 hover:bg-white/10 text-[var(--foreground)] border border-white/5 hover:border-white/10'}`}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- TRANSFORMATION SECTION --- */}
      <section className="py-24 bg-[var(--background)] relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Image Side */}
            <div className="relative group perspective-[1000px] lg:order-1 order-2 mt-8 lg:mt-0">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-[var(--accent)]/20 blur-[60px] rounded-full group-hover:bg-[var(--accent)]/30 transition-colors duration-700" />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 bg-[var(--card)]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/20 to-transparent opacity-80 z-10 pointer-events-none" />
                <img
                  src="/landing/transformation.png"
                  alt="Transformation"
                  className="w-full h-[400px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </motion.div>
              
              {/* Decorative Tech Corners */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-[var(--accent)] rounded-tl-[2rem] opacity-50 group-hover:opacity-100 group-hover:-top-8 group-hover:-left-8 transition-all duration-500 pointer-events-none z-0" />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-[var(--accent)] rounded-br-[2rem] opacity-50 group-hover:opacity-100 group-hover:-bottom-8 group-hover:-right-8 transition-all duration-500 pointer-events-none z-20" />
            </div>

            {/* Right Text Side */}
            <div className="space-y-8 lg:order-2 order-1">
              <div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-[10px] font-bold uppercase tracking-widest mb-6"
                >
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                  Our Purpose
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-[1000] tracking-tighter leading-[1] mb-6 uppercase">
                  DRIVING <br/>
                  <span className="text-[var(--accent)] drop-shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)]">INNOVATION</span>
                </h2>
                <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed max-w-lg font-medium">
                  BlueBuff provides visionary game shop owners with the advanced infrastructure required to scale securely and efficiently in a competitive market.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { title: "Bank-Grade Security", desc: "Military-grade encryption for all transactions.", icon: FiShield },
                  { title: "Accelerated Growth", desc: "Scale your userbase with intelligent tools.", icon: FiTrendingUp }
                ].map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="flex items-start gap-5 p-5 rounded-3xl bg-[var(--card)]/30 backdrop-blur-md border border-white/5 hover:border-[var(--accent)]/40 hover:bg-[var(--card)]/50 transition-all group/item"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0 group-hover/item:scale-110 transition-transform shadow-[0_0_15px_rgba(var(--accent-rgb),0.2)] border border-[var(--accent)]/20">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-base font-[1000] tracking-tight mb-1 group-hover/item:text-[var(--accent)] transition-colors uppercase italic">{item.title}</h4>
                      <p className="text-xs text-[var(--muted)] font-bold">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button 
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="group px-8 py-4 rounded-xl border border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)] font-bold uppercase tracking-widest text-[11px] transition-all hover:bg-[var(--accent)] hover:!text-white hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)] hover:-translate-y-1 active:scale-95 flex items-center gap-3"
              >
                Discover More <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
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
