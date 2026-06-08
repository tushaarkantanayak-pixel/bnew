"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiZap, FiShield, FiCpu, FiUsers, FiCode, FiCheck, FiTrendingUp } from "react-icons/fi";
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

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] min-h-screen font-sans overflow-x-hidden">

      {/* ── SUBTLE BACKGROUND GLOW ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[50vh] bg-[var(--accent)]/5 blur-[140px] rounded-full" />
      </div>

      {/* ══════════════════════════════════════════ */}
      {/*  HERO                                      */}
      {/* ══════════════════════════════════════════ */}

      {/* Mobile hero */}
      <section className="relative md:hidden overflow-hidden" style={{ height: "100svh", minHeight: 620 }}>
        <img
          src="/landing/1.png"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ zIndex: 0 }}
        />
        <div className="absolute inset-0" style={{ zIndex: 1, background: "linear-gradient(to top, #000 0%, #000c 38%, #0006 60%, transparent 100%)" }} />
        <div className="absolute inset-0" style={{ zIndex: 1, background: "linear-gradient(to right, #000a 0%, transparent 70%)" }} />

        {/* badge */}
        <div className="absolute top-0 left-0 right-0 pt-20 px-5" style={{ zIndex: 2 }}>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(12px)" }}
          >
            <FiShield size={10} color="var(--accent)" />
            <span style={{ color: "var(--accent)", fontSize: 9, fontWeight: 900, letterSpacing: "0.22em", textTransform: "uppercase" }}>
              India's Most Trusted Gaming Infrastructure
            </span>
          </div>
        </div>

        {/* bottom content */}
        <div className="absolute bottom-0 left-0 right-0 px-5 flex flex-col gap-4" style={{ zIndex: 2, paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 80px)" }}>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontSize: "clamp(2.2rem, 10vw, 3rem)", fontWeight: 1000, lineHeight: 1, letterSpacing: "-0.03em", textTransform: "uppercase", fontStyle: "italic", color: "#fff", margin: 0 }}
          >
            BUILD YOUR{" "}
            <span style={{ color: "var(--accent)" }}>STORE &<br />ESPORTS</span>
            <br />EMPIRE{" "}
            <span style={{ color: "var(--accent)" }}>TODAY</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
            style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, fontWeight: 500, lineHeight: 1.5, margin: 0 }}
          >
            Dominate the game. We handle the infrastructure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}
            className="flex flex-col gap-3 w-full"
          >
            <Link
              href="/contact"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "14px 24px", borderRadius: 16, background: "var(--accent)", color: "#000", fontWeight: 900, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.22em", fontStyle: "italic", textDecoration: "none" }}
            >
              <span>Request Service</span>
              <span style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FiArrowRight size={15} color="#000" />
              </span>
            </Link>

            <Link
              href="/games"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "13px 24px", borderRadius: 16, border: "1.5px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)", color: "#fff", fontWeight: 900, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", fontStyle: "italic", textDecoration: "none" }}
            >
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
              Top-Up Games
              <FiArrowRight size={13} color="#fff" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Desktop hero */}
      <section className="relative hidden md:flex pt-20 pb-16 overflow-hidden min-h-[70vh] items-center border-b border-[var(--border)]">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[700px] h-[700px] bg-[var(--accent)]/8 blur-[150px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div className="flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-[10px] font-black uppercase tracking-[0.3em] mb-8"
            >
              <FiShield size={12} />
              India's Most Trusted Gaming Infrastructure
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              className="text-4xl lg:text-[3.8rem] font-[1000] mb-5 leading-[1.05] tracking-tighter uppercase italic"
            >
              BUILD YOUR{" "}
              <span className="text-[var(--accent)]">STORE</span>
              <br />& ESPORTS{" "}
              <span className="text-[var(--accent)]">EMPIRE</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="text-sm text-[var(--muted)] leading-relaxed max-w-md mb-10"
            >
              Dominate the game. We handle the infrastructure — APIs, websites, hosting, payments, and esports tools.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <Link
                href="/contact"
                className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-[var(--accent)] font-black uppercase tracking-[0.25em] text-[12px] italic hover:brightness-110 hover:-translate-y-0.5 transition-all shadow-xl"
                style={{ color: '#000' }}
              >
                Request Service
                <div className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform" style={{ color: '#000' }}>
                  <FiArrowRight size={14} />
                </div>
              </Link>

              <Link
                href="/games"
                className="flex items-center gap-2 px-6 py-4 rounded-2xl border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)]/40 font-black uppercase tracking-[0.2em] text-[11px] italic transition-all"
              >
                Top-Up Games
                <FiArrowRight size={13} />
              </Link>
            </motion.div>
          </div>

          {/* Right — slanted hero cards */}
          <div className="relative h-[380px] lg:h-[440px] w-full flex items-center justify-end">
            <div className="flex gap-3 transform -skew-x-[12deg] h-full overflow-hidden w-[110%] justify-end">
              {[
                { src: "/landing/hero_mage.png", delay: 0.2 },
                { src: "/landing/hero_rogue.png", delay: 0.3, h: "95%" },
                { src: "/landing/hero_tactical.png", delay: 0.4, h: "90%" },
                { src: "/landing/hero_cyborg.png", delay: 0.5, h: "85%" },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: card.delay }}
                  className="relative w-[120px] lg:w-[150px] overflow-hidden shadow-2xl group hover:w-[180px] lg:hover:w-[210px] transition-all duration-500 border border-[var(--border)]"
                  style={{ height: card.h || "100%", alignSelf: "center" }}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                  <img
                    src={card.src}
                    className="absolute w-[170%] h-full max-w-none object-cover transform skew-x-[12deg] -ml-[35%] group-hover:scale-105 transition-transform duration-700"
                    alt=""
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/*  MARQUEE — Partners                        */}
      {/* ══════════════════════════════════════════ */}
      <section className="py-12 border-b border-[var(--border)] overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />
        <div className="text-center mb-6">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--muted)]/40">Trusted by teams across India</p>
        </div>
        <div className="animate-marquee flex gap-4 w-max">
          {[
            "MLBB Topup", "Meowji Official", "Scammers Official", "Yuji MLBB",
            "Topup Memo", "Vampenttic Games", "Tronics Official", "BlueBuff", "Happy Store",
            "MLBB Topup", "Meowji Official", "Scammers Official", "Yuji MLBB",
            "Topup Memo", "Vampenttic Games", "Tronics Official", "BlueBuff", "Happy Store",
          ].map((team, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-[var(--card)]/30 border border-white/5 cursor-default group hover:border-[var(--accent)]/20 transition-all"
            >
              <div className="w-6 h-6 rounded-md bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] text-[10px] font-black border border-[var(--accent)]/15 group-hover:scale-110 transition-transform">
                {team.charAt(0)}
              </div>
              <span className="text-[11px] font-bold text-[var(--muted)] whitespace-nowrap group-hover:text-[var(--foreground)] transition-colors">{team}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/*  STATS                                     */}
      {/* ══════════════════════════════════════════ */}
      <section className="py-14 border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Business Clients", value: "10+" },
              { label: "Combined Orders", value: "1,000+" },
              { label: "Success Rate", value: "99.9%" },
              { label: "Support", value: "24/7" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-[1000] tracking-tighter text-[var(--accent)] mb-1">{stat.value}</div>
                <div className="text-[9px] font-black text-[var(--muted)]/50 uppercase tracking-[0.25em]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/*  SERVICES — 3 cards                        */}
      {/* ══════════════════════════════════════════ */}
      <section className="py-20 border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-4xl font-[1000] tracking-tighter uppercase mb-3">
              What We <span className="text-[var(--accent)]">Offer</span>
            </h2>
            <p className="text-xs text-[var(--muted)] max-w-sm mx-auto">Premium tools built specifically to scale your gaming business.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: FiCpu,
                title: "Fast API Integration",
                desc: "Connect your store to top-up providers with blazing-fast, reliable automated systems.",
                features: ["Auto top-ups", "Real-time delivery", "Multi-game support"],
              },
              {
                icon: FiCode,
                title: "Custom Websites",
                desc: "Beautiful, high-performance storefronts tailored to your gaming brand.",
                features: ["Mobile ready", "SEO optimized", "Admin panel"],
                accent: true,
              },
              {
                icon: FiTrendingUp,
                title: "Marketing & Growth",
                desc: "Expand your reach and acquire more customers through targeted digital strategies.",
                features: ["SEO mastery", "Social media", "Brand identity"],
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group p-7 rounded-3xl border transition-all duration-500 flex flex-col ${
                  item.accent
                    ? "bg-[var(--accent)]/8 border-[var(--accent)]/30"
                    : "bg-[var(--card)]/30 border-white/5 hover:border-[var(--accent)]/20"
                }`}
              >
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-6 border ${item.accent ? "bg-[var(--accent)]/20 border-[var(--accent)]/30 text-[var(--accent)]" : "bg-[var(--foreground)]/5 border-[var(--border)] text-[var(--accent)]"}`}>
                  <item.icon size={20} />
                </div>
                <h3 className="text-base font-[1000] uppercase tracking-tighter mb-3">{item.title}</h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed mb-6 flex-grow">{item.desc}</p>
                <div className="space-y-2">
                  {item.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2.5">
                      <FiCheck size={12} className="text-[var(--accent)] flex-shrink-0" />
                      <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wide">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              View all services <FiArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/*  TOP-UP GAMES                              */}
      {/* ══════════════════════════════════════════ */}
      <section id="games-section" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-2xl md:text-4xl font-[1000] tracking-tighter uppercase mb-2">
                Top-Up <span className="text-[var(--accent)]">Games</span>
              </h2>
              <p className="text-xs text-[var(--muted)]">Instant delivery. Lowest prices.</p>
            </div>
            <Link
              href="/games"
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-[var(--muted)] hover:text-[var(--accent)] transition-colors whitespace-nowrap"
            >
              All Games <FiArrowRight size={12} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl bg-[var(--card)]/40 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-4">
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

      {/* ══════════════════════════════════════════ */}
      {/*  CTA BANNER                                */}
      {/* ══════════════════════════════════════════ */}
      <section className="py-20 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-[10px] font-black uppercase tracking-[0.3em]">
              <FiZap size={11} />
              Ready to scale?
            </div>
            <h2 className="text-3xl md:text-5xl font-[1000] tracking-tighter uppercase leading-none">
              Let's Build Your <span className="text-[var(--accent)]">Empire</span>
            </h2>
            <p className="text-sm text-[var(--muted)] max-w-md mx-auto leading-relaxed">
              Talk to us and we'll architect your next big digital move — from storefront to esports infrastructure.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-[var(--accent)] font-black uppercase tracking-[0.25em] text-[12px] italic hover:brightness-110 hover:-translate-y-0.5 transition-all shadow-xl"
                style={{ color: '#000' }}
              >
                Contact Us <FiArrowRight size={14} />
              </Link>
              <Link
                href="/services"
                className="flex items-center gap-2 px-6 py-4 rounded-2xl border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)]/40 font-black uppercase tracking-[0.2em] text-[11px] italic transition-all"
              >
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
