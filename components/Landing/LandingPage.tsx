"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowRight, FiShield, FiCpu, FiCode,
  FiCheck, FiTrendingUp, FiArrowUpRight,
} from "react-icons/fi";
import GameCardGrid from "../Games/GameCardGrid";

/* ─── tiny helpers ─── */
const PRIORITY_SLUGS = [
  "pubg-mobile138",
  "genshin-impact742",
  "honor-of-kings57",
  "where-winds-meet280",
  "mobile-legends270",
  "wuthering-of-waves464",
];

const PARTNERS = [
  "MLBB Topup","Meowji Official","Scammers Official","Yuji MLBB",
  "Topup Memo","Vampenttic Games","Tronics Official","BlueBuff","Happy Store",
];

const STATS = [
  { value: "₹0",      label: "Setup Cost" },
  { value: "Free",    label: "API Access" },
  { value: "10+",     label: "Clients" },
  { value: "1K+",     label: "Orders" },
  { value: "99.9%",   label: "Uptime" },
  { value: "24/7",    label: "Support" },
];

const SERVICES = [
  {
    icon: FiCpu,
    tag: "API",
    title: "Game Top-Up API",
    desc: "Connect to game top-ups instantly. Fast, automatic, and always online.",
    items: ["Auto delivery", "Many games", "Live updates"],
  },
  {
    icon: FiCode,
    tag: "WEB",
    title: "Custom Stores",
    desc: "We build fast, beautiful game stores for your business.",
    items: ["Admin dashboard", "SEO ready", "Mobile first"],
    highlight: true,
  },
  {
    icon: FiTrendingUp,
    tag: "GROWTH",
    title: "Marketing & SEO",
    desc: "Get more customers with smart online marketing.",
    items: ["Search ranking", "Social ads", "Brand kit"],
  },
];

/* ═══════════════════════════════════════════════════════ */
export default function LandingPage() {
  const [games, setGames]   = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [revenue, setRevenue] = useState<number>(500);

  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch("/api/games");
        const json = await res.json();
        const all  = json?.data?.games || [];
        setGames(
          PRIORITY_SLUGS.map(s => all.find((g: any) => g.gameSlug === s)).filter(Boolean)
        );
      } catch {}
      finally { setLoading(false); }
    })();
  }, []);

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] min-h-screen font-sans overflow-x-hidden selection:bg-[var(--accent)]/20">

      {/* ── fixed ambient glows removed ── */}

      {/* ═══════ HERO ═══════ */}
      <section
        className="relative min-h-[100svh] flex flex-col justify-center md:justify-start md:pt-0 overflow-hidden border-b border-[var(--border)]"
      >
        {/* ── 3D DECORATIVE BACKGROUND ── */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

          {/* Perspective grid floor */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[55%]"
            style={{
              backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
              opacity: 0.04,
              transform: "perspective(600px) rotateX(55deg)",
              transformOrigin: "bottom center",
              maskImage: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)" }}
          />

          {/* Large outer glow ring — top right */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[15%] -right-[10%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px]"
            style={{ border: "1px solid rgba(var(--accent-rgb), 0.12)", borderRadius: "50%" }}
          >
            {/* dot on ring */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--accent)]"
              
            />
          </motion.div>

          {/* Inner ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[5%] right-[2%] w-[38vw] h-[38vw] max-w-[450px] max-h-[450px]"
            style={{ border: "1px dashed rgba(var(--accent-rgb), 0.08)", borderRadius: "50%" }}
          >
            <div
              className="absolute bottom-0 right-[20%] translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--accent)]/50"
            />
          </motion.div>

          {/* Floating wireframe cube — right side */}
          <motion.div
            animate={{ y: [-12, 12, -12], rotateZ: [0, 5, 0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[18%] right-[18%] hidden md:block"
            style={{ width: 90, height: 90, perspective: 400 }}
          >
            <div
              style={{
                width: "100%", height: "100%",
                border: "1px solid rgba(var(--accent-rgb),0.25)",
                transform: "rotateX(30deg) rotateY(45deg)",
                position: "relative" }}
            >
              {/* inner face */}
              <div style={{
                position: "absolute", inset: 12,
                border: "1px solid rgba(var(--accent-rgb),0.12)" }} />
            </div>
          </motion.div>

          {/* Small diamond top-left */}
          <motion.div
            animate={{ y: [-8, 8, -8], rotate: [0, 45, 90, 135, 180] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[30%] left-[6%] hidden md:block"
          >
            <div style={{
              width: 28, height: 28,
              border: "1px solid rgba(var(--accent-rgb),0.2)",
              transform: "rotate(45deg)" }} />
          </motion.div>

          {/* Wireframe Sphere (Intersecting rings) */}
          <motion.div
            animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[60%] left-[12%] hidden md:block"
            style={{ width: 80, height: 80, transformStyle: "preserve-3d" }}
          >
            <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(var(--accent-rgb),0.15)", borderRadius: "50%", transform: "rotateY(0deg)" }} />
            <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(var(--accent-rgb),0.15)", borderRadius: "50%", transform: "rotateY(60deg)" }} />
            <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(var(--accent-rgb),0.15)", borderRadius: "50%", transform: "rotateY(120deg)" }} />
            <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(var(--accent-rgb),0.15)", borderRadius: "50%", transform: "rotateX(90deg)" }} />
          </motion.div>



          {/* Tiny orb cluster */}
          {[["14%","55%","0.5"],["22%","40%","0.3"],["12%","65%","0.4"]].map(([t,l,o],i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.4, 1], opacity: [Number(o)*0.6, Number(o), Number(o)*0.6] }}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.8 }}
              className="absolute w-1.5 h-1.5 rounded-full bg-[var(--accent)] hidden md:block"
              style={{ top: t, left: l, opacity: Number(o) }}
            />
          ))}


        </div>

        {/* thin top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent z-10" />

        {/* content grid */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-10 pt-24 md:pt-[72px] pb-16 md:py-0 grid md:grid-cols-2 gap-12 items-center">

          {/* ── LEFT: text ── */}
          <div className="flex flex-col gap-7">

            {/* eyebrow */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-[var(--accent)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[var(--accent)]">
                Free to Build, Free API
              </span>
            </div>

            {/* headline */}
            <h1 className="text-[clamp(2.5rem,5vw,4.2rem)] font-[1000] leading-[1.0] tracking-[-0.03em] uppercase italic text-[var(--foreground)] mb-3">
              Your Own Game
              <br />
              <span className="text-[var(--accent)]">Top-Up Store.</span>
            </h1>
            <h2 className="text-[clamp(1.5rem,2.5vw,2.2rem)] font-bold leading-[1.2] tracking-tight text-[var(--foreground)]/90">
              Pay Only When You Earn.
            </h2>

            {/* sub */}
            <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed max-w-md">
              Launch a fully automated top-up store under your brand — free setup, free API access, zero upfront cost. Choose a simple monthly plan or pay a small % of your profit. You grow, we grow.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard/digital-gametopup/api-keys"
                style={{ color: "#000" }}
                className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-[var(--accent)] font-black uppercase tracking-[0.2em] text-[11px] italic hover:brightness-110 active:scale-95 transition-all "
              >
                Get Free API Keys
                <span className="w-7 h-7 rounded-full bg-black/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <FiArrowRight size={14} style={{ color: "#000" }} />
                </span>
              </Link>

              <Link
                href="/games"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)]/40 font-black uppercase tracking-[0.2em] text-[11px] italic transition-all"
              >
                <span>💎</span>
                Game Topup Now
              </Link>
            </div>

            {/* micro stats row */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 pt-2">
              {STATS.map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-xl font-[1000] tracking-tighter text-[var(--accent)] leading-none">{s.value}</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--muted)] mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Pricing & Value Props */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col gap-4 relative w-full mt-6 md:mt-0"
          >

            {/* Bottom block: Pay only when you earn */}
            <div 
              className="bg-[var(--card)]/40 rounded-[24px] p-4 md:p-5 w-full flex flex-col shadow-2xl relative overflow-hidden backdrop-blur-3xl border border-[var(--border)]"
            >
              <h3 className="text-2xl md:text-3xl font-[800] text-[var(--foreground)] tracking-tight mb-2">Automatic Top-up Website Cost</h3>
              <p className="text-sm md:text-base text-[var(--muted)] mb-5">Pay only when you earn. Choose the plan that fits your store.</p>

              {/* Interactive Revenue Slider */}
              <div className="mb-5 p-4 rounded-xl bg-[var(--card)]/50 border border-[var(--border)]">
                <div className="flex justify-between items-end mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Est. Monthly Revenue</label>
                  <span className="text-lg font-bold text-[var(--accent)]">${revenue.toLocaleString('en-US')}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="100"
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full h-1.5 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                  aria-label="Estimated Monthly Revenue"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-3">
                {/* Fixed monthly fee card */}
                <div 
                  className={`bg-[var(--card)]/50 backdrop-blur-md rounded-[16px] p-4 flex flex-col transition-all duration-300 ${revenue * 0.015 > 5 ? 'border border-[var(--accent)] shadow-[0_0_20px_rgba(168,85,247,0.15)]' : 'border border-[var(--border)]'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-[var(--muted)]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    </div>
                    {revenue * 0.015 > 5 && (
                      <div className="bg-[var(--accent)]/10 text-[var(--accent)] text-[11px] font-bold px-3 py-1 rounded-full border border-[var(--accent)]/20">
                        Best value for you
                      </div>
                    )}
                  </div>
                  <h4 className="text-lg font-bold text-[var(--foreground)] tracking-tight mb-2">Fixed monthly fee</h4>
                  <div className="text-3xl font-[1000] text-[var(--foreground)] mb-2">$5<span className="text-sm font-normal text-[var(--muted)]"> /mo</span></div>
                  <p className="text-sm text-[var(--muted)] mb-5 flex-1 leading-relaxed">One predictable charge each month. Best once your volume is steady.</p>
                  <Link href="/contact" className="block text-center w-full py-2.5 rounded-lg border border-[var(--border)] text-sm font-medium text-[var(--foreground)] hover:bg-[var(--foreground)]/5 transition-colors">Learn more</Link>
                </div>

                {/* Percentage of profit card */}
                <div 
                  className={`bg-[var(--card)]/50 backdrop-blur-md rounded-[16px] p-4 flex flex-col relative overflow-hidden transition-all duration-300 ${revenue * 0.015 <= 5 ? 'border border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'border border-[var(--border)]'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    {revenue * 0.015 <= 5 ? (
                      <div className="bg-blue-500/10 text-blue-500 text-[11px] font-bold px-3 py-1 rounded-full border border-blue-500/20">
                        Best for new stores
                      </div>
                    ) : (
                      <div />
                    )}
                    <div className="text-[var(--foreground)]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-[var(--foreground)] tracking-tight mb-2">Percentage fee</h4>
                  <div className="text-3xl font-[1000] text-[var(--foreground)] mb-2">
                    ${(revenue * 0.015).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\.00$/, '')}
                    <span className="text-sm font-normal text-[var(--muted)]"> /mo (1.5%)</span>
                  </div>
                  <p className="text-sm text-[var(--muted)] mb-5 flex-1 leading-relaxed">Pay less when you earn less. Scales naturally as your store grows.</p>
                  <Link href="/contact" className="block text-center w-full py-2.5 rounded-lg border border-[var(--border)] text-sm font-medium text-[var(--foreground)] hover:bg-[var(--foreground)]/5 transition-colors">Learn more</Link>
                </div>
              </div>

              <div className="mt-5 p-4 rounded-xl bg-[var(--background)]/50 border border-[var(--border)]">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--foreground)] mb-3">Requirements to get started:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-xs text-[var(--muted)]">
                    <svg className="shrink-0 mt-0.5 text-[var(--accent)]" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span><strong>Bring your own domain</strong> (or we can provide a subdomain for $20/m)</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-[var(--muted)]">
                    <svg className="shrink-0 mt-0.5 text-[var(--accent)]" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span><strong>Bring any payment gateway</strong> or business merchant account</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 flex items-start gap-2 text-[11px] text-[var(--muted)]">
                <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                <p>Monthly billing begins once your store goes live and starts processing orders.</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1.5 opacity-30">
          <div className="w-[1px] h-8 bg-[var(--foreground)] animate-pulse" />
          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[var(--muted)]">scroll</span>
        </div>
      </section>

      {/* ═══════ MARQUEE ═══════ */}
      <section className="py-10 border-b border-[var(--border)] overflow-hidden relative bg-[var(--card)]/10">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />
        <p className="text-center text-[9px] font-black uppercase tracking-[0.45em] text-[var(--muted)]/80 mb-5">
          Trusted across India
        </p>
        <div className="animate-marquee flex gap-3 w-max">
          {[...PARTNERS, ...PARTNERS].map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--card)]/20 border border-white/[0.04] group hover:border-[var(--accent)]/20 transition-all cursor-default"
            >
              <div className="w-5 h-5 rounded-md bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] text-[9px] font-black border border-[var(--accent)]/10">
                {name.charAt(0)}
              </div>
              <span className="text-[10px] font-bold text-[var(--muted)] whitespace-nowrap group-hover:text-[var(--foreground)] transition-colors">{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ SERVICES ═══════ */}
      <section className="py-24 border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-5 md:px-10">

          {/* section label */}
          <div className="flex items-center gap-4 mb-14">
            <div className="w-6 h-[2px] bg-[var(--accent)]" />
            <h2 className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--accent)] m-0 p-0">Our Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)]">
            {SERVICES.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-8 md:p-10 flex flex-col gap-5 group transition-all duration-500 ${
                  s.highlight
                    ? "bg-[var(--accent)]/[0.06]"
                    : "bg-[var(--background)] hover:bg-[var(--card)]/30"
                }`}
              >
                {/* tag */}
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[var(--accent)]/60 border border-[var(--accent)]/20 px-2 py-1 rounded-md">
                    {s.tag}
                  </span>
                  <s.icon size={16} className="text-[var(--accent)] opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="text-xl font-[1000] tracking-tighter uppercase leading-none">{s.title}</h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">{s.desc}</p>

                <div className="space-y-2 mt-auto">
                  {s.items.map((f, j) => (
                    <div key={j} className="flex items-center gap-2.5">
                      <FiCheck size={11} className="text-[var(--accent)] flex-shrink-0" />
                      <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider">{f}</span>
                    </div>
                  ))}
                </div>

                {s.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--accent)]" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <Link
              href="/services"
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              All services <FiArrowUpRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ GAMES ═══════ */}
      <section id="games-section" className="py-24 border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-5 md:px-10">

          {/* header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-[2px] bg-[var(--accent)]" />
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--accent)]">Top-Up Games</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-[1000] tracking-tighter uppercase">
                Instant <span className="text-[var(--accent)]">Delivery</span>
              </h2>
            </div>
            <Link
              href="/games"
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted)] hover:text-[var(--accent)] transition-colors whitespace-nowrap"
            >
              All Games <FiArrowRight size={12} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-3 sm:gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl bg-[var(--card)]/30 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-3 sm:gap-4">
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

      {/* ═══════ CTA ═══════ */}
      <section className="py-28">
        <div className="max-w-5xl mx-auto px-3 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2rem] border border-[var(--border)] px-4 py-8 md:p-16 overflow-hidden"
          >
            {/* bg decoration */}
            <div className="absolute inset-0 bg-[var(--card)]/20" />
            <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-[var(--accent)]/[0.04] blur-[80px]" />
            <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[var(--accent)]/30 to-transparent" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
              <div className="space-y-4 max-w-xl">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-[2px] bg-[var(--accent)]" />
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--accent)]">Ready to grow?</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-[1000] tracking-tighter uppercase leading-none">
                  Build your<br />
                  <span className="text-[var(--accent)]">Empire</span> with us
                </h2>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  Let's build your next big project together — stores, APIs, and gaming tools all in one place.
                </p>
              </div>

              <div className="flex flex-col gap-3 flex-shrink-0">
                <Link
                  href="/contact"
                  style={{ color: "#000" }}
                  className="group flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-[var(--accent)] font-black uppercase tracking-[0.2em] text-[12px] italic hover:brightness-110 active:scale-95 transition-all whitespace-nowrap"
                >
                  Contact Us
                  <span className="w-7 h-7 rounded-full bg-black/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <FiArrowRight size={14} style={{ color: "#000" }} />
                  </span>
                </Link>
                <Link
                  href="/services"
                  className="text-center text-[10px] font-black uppercase tracking-[0.25em] text-[var(--muted)] hover:text-[var(--accent)] transition-colors py-2"
                >
                  View Services →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
