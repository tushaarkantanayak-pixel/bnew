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
  { value: "10+",    label: "Clients" },
  { value: "1K+",   label: "Orders" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7",  label: "Support" },
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

      {/* ── fixed ambient glows ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[20%] left-[-10%] w-[50vw] h-[60vh] bg-[var(--accent)]/[0.06] blur-[120px] rounded-full" />
        <div className="absolute top-[60%] right-[-5%]  w-[35vw] h-[40vh] bg-purple-600/[0.05] blur-[100px] rounded-full" />
      </div>

      {/* ═══════ HERO ═══════ */}
      <section
        className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden border-b border-[var(--border)]"
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
              WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
            }}
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
              style={{ boxShadow: "0 0 12px 4px rgba(var(--accent-rgb),0.5)" }}
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
                position: "relative",
                boxShadow: "inset 0 0 20px rgba(var(--accent-rgb),0.05), 0 0 20px rgba(var(--accent-rgb),0.08)",
              }}
            >
              {/* inner face */}
              <div style={{
                position: "absolute", inset: 12,
                border: "1px solid rgba(var(--accent-rgb),0.12)",
              }} />
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
              transform: "rotate(45deg)",
              boxShadow: "0 0 10px rgba(var(--accent-rgb),0.12)",
            }} />
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
              style={{ top: t, left: l, opacity: Number(o), boxShadow: "0 0 8px 2px rgba(var(--accent-rgb),0.3)" }}
            />
          ))}

          {/* Accent glow blob center-right */}
          <div className="absolute top-[10%] right-[5%] w-[30vw] h-[30vw] max-w-[360px] max-h-[360px] bg-[var(--accent)]/[0.06] blur-[90px] rounded-full" />
        </div>

        {/* thin top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent z-10" />

        {/* content grid */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-10 pt-16 md:pt-16 pb-16 md:py-0 grid md:grid-cols-2 gap-12 items-center">

          {/* ── LEFT: text ── */}
          <div className="flex flex-col gap-7">

            {/* eyebrow */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-[var(--accent)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[var(--accent)]">
                India's Gaming Platform
              </span>
            </div>

            {/* headline */}
            <h1 className="text-[clamp(2.2rem,6vw,4.8rem)] font-[1000] leading-[1.0] tracking-[-0.03em] uppercase italic">
              Start your
              <br />
              <span className="text-[var(--accent)]">Gaming Store</span>
              <br />
              & Grow Fast.
            </h1>

            {/* sub */}
            <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed max-w-md">
              Custom stores, automatic top-ups, easy payments, and tools for gamers — everything you need.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                style={{ color: "#000" }}
                className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-[var(--accent)] font-black uppercase tracking-[0.2em] text-[11px] italic hover:brightness-110 active:scale-95 transition-all shadow-[0_10px_40px_-10px_rgba(var(--accent-rgb),0.5)]"
              >
                Contact Us
                <span className="w-7 h-7 rounded-full bg-black/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <FiArrowRight size={14} style={{ color: "#000" }} />
                </span>
              </Link>

              <Link
                href="/games"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)]/40 font-black uppercase tracking-[0.2em] text-[11px] italic transition-all"
              >
                Top-Up Now
              </Link>

              <a
                href="https://web.bluebuff.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)]/40 font-black uppercase tracking-[0.2em] text-[11px] italic transition-all"
              >
                Create your free website
                <FiArrowUpRight size={13} />
              </a>
            </div>

            {/* micro stats row */}
            <div className="flex items-center gap-6 pt-2">
              {STATS.map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-xl font-[1000] tracking-tighter text-[var(--accent)] leading-none">{s.value}</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--muted)]/50 mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: premium floating dashboard */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex items-center justify-center relative h-[340px] md:h-[480px] mt-6 md:mt-0"
          >
            {/* Ambient glow pool */}
            <div className="absolute w-[320px] h-[320px] bg-[var(--accent)]/20 blur-[90px] rounded-full" />

            {/* MAIN CARD */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-full md:w-[280px] rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(168,85,247,0.25)",
                boxShadow: "0 0 40px rgba(168,85,247,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* card top bar */}
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(168,85,247,0.12)" }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" style={{ boxShadow: "0 0 8px rgba(168,85,247,0.8)" }} />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--accent)]">BlueBuff Console</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[var(--foreground)]/10" />
                  <div className="w-2 h-2 rounded-full bg-[var(--foreground)]/10" />
                  <div className="w-2 h-2 rounded-full bg-[var(--accent)]/40" />
                </div>
              </div>

              {/* card body */}
              <div className="p-5 space-y-4">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.3em] text-[var(--muted)]/60 font-bold mb-1">Total Orders Processed</p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-[1000] tracking-tighter text-[var(--foreground)]">1,247</span>
                    <span className="text-[10px] font-black text-green-400 mb-1 flex items-center gap-0.5">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 2l3 4H2l3-4z" fill="currentColor"/></svg>
                      +12%
                    </span>
                  </div>
                </div>

                {/* sparkline bars */}
                <div className="flex items-end gap-1 h-10">
                  {[40,65,45,80,55,90,70,85,60,95,75,100].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 0.4 + i * 0.05, duration: 0.4 }}
                      className="flex-1 rounded-sm origin-bottom"
                      style={{
                        height: `${h}%`,
                        background: i === 11 ? "var(--accent)" : `rgba(168,85,247,${0.15 + (i / 11) * 0.35})`,
                      }}
                    />
                  ))}
                </div>

                <div style={{ borderTop: "1px solid rgba(168,85,247,0.1)" }} />

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Uptime", value: "99.9%", color: "#4ade80" },
                    { label: "Clients", value: "10+", color: "var(--accent)" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <p className="text-[7px] uppercase tracking-[0.25em] font-black mb-1" style={{ color: "rgba(161,161,170,0.5)" }}>{s.label}</p>
                      <p className="text-lg font-[1000] tracking-tighter" style={{ color: s.color }}>{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* FLOATING CHIP: delivery */}
            <motion.div
              animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-[10%] -left-[2%] z-20 hidden md:flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{
                background: "rgba(10,0,30,0.85)",
                border: "1px solid rgba(168,85,247,0.3)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 32px rgba(168,85,247,0.2)",
              }}
            >
              <div className="w-6 h-6 rounded-lg flex items-center justify-center text-sm" style={{ background: "rgba(168,85,247,0.15)" }}>&#9889;</div>
              <div>
                <p className="text-[7px] uppercase tracking-widest font-black" style={{ color: "rgba(168,85,247,0.6)" }}>Delivery</p>
                <p className="text-[11px] font-[1000] text-white leading-none">Instant</p>
              </div>
            </motion.div>

            {/* FLOATING CHIP: secure */}
            <motion.div
              animate={{ y: [0, 8, 0], x: [0, -4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[12%] -right-[2%] z-20 hidden md:flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{
                background: "rgba(10,0,30,0.85)",
                border: "1px solid rgba(74,222,128,0.25)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 32px rgba(74,222,128,0.1)",
              }}
            >
              <div className="w-6 h-6 rounded-lg flex items-center justify-center text-sm" style={{ background: "rgba(74,222,128,0.1)" }}>&#128274;</div>
              <div>
                <p className="text-[7px] uppercase tracking-widest font-black" style={{ color: "rgba(74,222,128,0.6)" }}>Payment</p>
                <p className="text-[11px] font-[1000] text-white leading-none">100% Secure</p>
              </div>
            </motion.div>

            {/* FLOATING CHIP: support */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute top-[52%] -left-[5%] z-20 hidden md:flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{
                background: "rgba(10,0,30,0.85)",
                border: "1px solid rgba(250,204,21,0.2)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 32px rgba(250,204,21,0.08)",
              }}
            >
              <div className="w-6 h-6 rounded-lg flex items-center justify-center text-sm" style={{ background: "rgba(250,204,21,0.1)" }}>&#127918;</div>
              <div>
                <p className="text-[7px] uppercase tracking-widest font-black" style={{ color: "rgba(250,204,21,0.6)" }}>Support</p>
                <p className="text-[11px] font-[1000] text-white leading-none">24 / 7</p>
              </div>
            </motion.div>

            {/* pulsing corner orbs */}
            {(["top-2 right-2", "bottom-2 left-2"]).map((pos, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 1.2 }}
                className={`absolute ${pos} w-3 h-3 rounded-full z-30 hidden md:block`}
                style={{ background: "var(--accent)", boxShadow: "0 0 12px 4px rgba(168,85,247,0.5)" }}
              />
            ))}
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
