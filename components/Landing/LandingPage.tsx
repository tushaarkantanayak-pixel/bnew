"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiZap, FiShield, FiCpu, FiUsers, FiClock, FiCode, FiSmartphone, FiCloud, FiCheck, FiTrendingUp, FiLayers, FiChevronRight, FiGrid, FiCompass } from "react-icons/fi";
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

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] min-h-screen font-sans selection:bg-[var(--accent)]/30">

      {/* --- HERO SECTION (Matrix Inspired) --- */}
      <section className="relative pt-32 pb-40 overflow-hidden bg-[var(--background)] border-b border-[var(--border)]">

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[var(--accent)] text-[11px] font-black uppercase tracking-[0.4em] mb-8 block"
          >
            Trusted by 50,000+ Gamers
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-[4.5rem] font-black tracking-tight mb-8 leading-[0.9]"
          >
            Elevate Your <span className="text-[var(--accent)]">Gaming</span> <br />
            Infrastructure to Elite Levels
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-[var(--muted)] text-sm md:text-lg font-medium leading-relaxed mb-12"
          >
            The best place for automatic game top-ups and custom gaming websites.
            We help you build and grow your gaming business easily.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-6"
          >
            <button
              onClick={scrollToGames}
              className="w-full sm:w-auto px-12 py-5 rounded-xl bg-[var(--accent)] text-white font-black uppercase tracking-widest text-[10px] hover:shadow-[0_20px_40px_rgba(var(--accent-rgb),0.3)] hover:brightness-110 transition-all active:scale-95 shadow-lg italic"
            >
              Explore Marketplace
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
              <Link 
                href="/services"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--foreground)] font-black uppercase tracking-widest text-[9px] italic transition-all group"
              >
                <FiGrid className="text-[var(--accent)] group-hover:scale-110 transition-transform" />
                Services
              </Link>
              <Link 
                href="/ourproducts"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--foreground)] font-black uppercase tracking-widest text-[9px] italic transition-all group"
              >
                <FiLayers className="text-[var(--accent)] group-hover:scale-110 transition-transform" />
                Our Products
              </Link>
              <Link 
                href="/dashboard"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--foreground)] font-black uppercase tracking-widest text-[9px] italic transition-all group"
              >
                <FiCompass className="text-[var(--accent)] group-hover:scale-110 transition-transform" />
                Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SOLUTIONS SECTION --- */}
      <section className="py-24 bg-[var(--background)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-4">Our Solutions</h2>
            <p className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-[0.5em] italic opacity-80">Everything you need for your game store</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: FiCpu,
                title: "API Integration",
                desc: "Fast and automatic API connections for game top-ups and easy business workflows.",
                tag: "Very Fast"
              },
              {
                icon: FiCode,
                title: "Custom Websites",
                desc: "Beautiful and fast websites made specifically for your game store.",
                tag: "Professional"
              },
              {
                icon: FiCloud,
                title: "Safe Hosting",
                desc: "Safe and secure server hosting so your website is always online.",
                tag: "Always Online"
              },
              {
                icon: FiTrendingUp,
                title: "Marketing & SEO",
                desc: "We help more customers find your store on Google and social media.",
                tag: "Growth"
              },
              {
                icon: FiSmartphone,
                title: "Graphic Design",
                desc: "Professional logos and banners that make your brand look amazing.",
                tag: "Design"
              },
              {
                icon: FiUsers,
                title: "Social Media",
                desc: "We manage your community groups to keep your users active.",
                tag: "Community"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 rounded-[2.5rem] bg-[var(--card)]/40 border border-white/5 hover:border-[var(--accent)]/30 transition-all duration-500 overflow-hidden"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all">
                    <item.icon size={22} />
                  </div>
                  <span className="text-[7px] font-black uppercase tracking-widest text-[var(--muted)]/40 border border-white/5 px-2 py-1 rounded-full group-hover:text-[var(--accent)] group-hover:border-[var(--accent)]/20 transition-all">{item.tag}</span>
                </div>
                
                <h4 className="text-lg font-black uppercase italic tracking-tighter mb-3 group-hover:text-[var(--accent)] transition-colors">{item.title}</h4>
                <p className="text-[11px] text-[var(--muted)] leading-relaxed font-bold uppercase tracking-wide opacity-50">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRODUCTS SECTION --- */}
      <section id="products" className="py-32 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter">Our Products</h2>
            <p className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-[0.4em] mt-4">Tactical infrastructure for gaming businesses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Topup Web",
                desc: "Fast and automatic game top-up websites that are easy to use.",
                icon: FiLayers,
                features: ["Check IDs easily", "Works for many games", "Automatic delivery", "Easy admin panel"]
              },
              {
                name: "Payment Gateway",
                desc: "Safe and fast ways to accept payments from your customers.",
                icon: FiZap,
                features: ["Get money fast", "Low fees", "Safe payments", "24/7 monitoring"]
              }
            ].map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative p-8 rounded-[2.5rem] bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--accent)]/5 blur-[100px] rounded-full group-hover:bg-[var(--accent)]/10 transition-all" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] mb-8 group-hover:bg-[var(--accent)] group-hover:text-black transition-all">
                    <product.icon size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4">{product.name}</h3>
                  <p className="text-[var(--muted)] text-xs font-bold uppercase tracking-wide opacity-60 leading-relaxed mb-8">
                    {product.desc}
                  </p>

                  <ul className="grid grid-cols-2 gap-3 mb-10">
                    {product.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[var(--muted)]/40 italic">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase italic tracking-widest text-[var(--accent)] hover:translate-x-2 transition-transform">
                    Learn More <FiChevronRight />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-32 bg-[var(--background)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter">Investment Plans</h2>
            <p className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-[0.4em] mt-4">Scalable pricing for every stage</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-[90rem] mx-auto">
            {[
              {
                name: "Nano",
                subtitle: "For Personal Use",
                price: "499",
                features: ["Personal API Keys", "Basic Integration", "100 Daily Orders", "Email Support"],
                color: "slate",
              },
              {
                name: "Starter",
                subtitle: "For Small Sellers",
                price: "1,999",
                features: ["Business API Keys", "Wallet System", "1k Daily Orders", "WhatsApp Support"],
                color: "blue",
              },
              {
                name: "Growth",
                subtitle: "For Power Users",
                price: "4,999",
                features: ["Automated Panel", "Multi-Game API", "10k Daily Orders", "24/7 Priority Support"],
                color: "indigo",
                popular: true,
              },
              {
                name: "Professional",
                subtitle: "For Enterprise",
                price: "9,999",
                features: ["Enterprise API Hub", "Custom Dashboard", "Unlimited Orders", "Dedicated Manager"],
                color: "purple",
              },
              {
                name: "Ultimate",
                subtitle: "For SaaS Owners",
                price: "Custom",
                features: ["Whitelabel Solution", "Custom Infrastructure", "Full Source Access", "Priority SLA"],
                color: "emerald",
              }
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-[2rem] bg-[var(--card)] border ${plan.popular ? 'border-[var(--accent)] shadow-xl scale-105 z-10' : 'border-[var(--border)]'} flex flex-col items-center text-center relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[var(--accent)] text-white text-[8px] font-black rounded-full uppercase tracking-widest italic shadow-lg">
                    Best Value
                  </div>
                )}
                <h4 className="text-lg font-black uppercase italic tracking-tighter mb-1">{plan.name}</h4>
                <p className="text-[8px] font-bold text-[var(--muted)] uppercase tracking-widest mb-6">{plan.subtitle}</p>
                
                <div className="text-3xl font-black italic tracking-tighter mb-8">
                  {plan.price !== "Custom" && <span className="text-sm">₹</span>}{plan.price}
                </div>

                <ul className="w-full space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-[9px] font-bold text-[var(--muted)] uppercase tracking-tight">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${plan.popular ? 'bg-[var(--accent)] text-white' : 'border border-[var(--accent)]/30 text-[var(--accent)]'}`}>
                        <FiCheck size={10} />
                      </div> 
                      <span className="truncate">{f}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-xl font-black uppercase tracking-widest text-[8px] italic transition-all ${plan.popular ? 'bg-[var(--accent)] text-white hover:brightness-110 shadow-lg' : 'border border-[var(--border)] hover:bg-[var(--foreground)] hover:text-[var(--background)]'}`}>
                  Select
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TRANSFORMATION SECTION --- */}
      <section className="py-40 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-[var(--accent)]/10 blur-[120px] rounded-full" />
              <img
                src="/landing/transformation.png"
                alt="Transformation"
                className="relative w-full max-w-xl mx-auto opacity-90 hover:scale-105 transition-all duration-700 rounded-[3rem] shadow-2xl"
              />
            </div>

            <div className="space-y-10">
              <h2 className="text-3xl md:text-[4rem] font-black uppercase italic tracking-tighter leading-[0.9]">
                Pioneering the <br />
                <span className="text-[var(--accent)]">Digital Vanguard</span>
              </h2>
              <p className="text-sm md:text-lg text-[var(--muted)] leading-relaxed font-bold uppercase tracking-widest opacity-80">
                BlueBuff is more than a platform; it's a movement. We are dedicated to providing the technical backbone for the world's most ambitious gamers and developers. Our mission is to democratize elite gaming infrastructure.
              </p>
              <button className="px-12 py-5 rounded-2xl bg-[var(--accent)] text-white font-black uppercase tracking-[0.2em] text-[11px] italic hover:shadow-2xl transition-all shadow-lg">
                Our Philosophy
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- GAMES GRID SECTION (Preview) --- */}
      <section id="games-section" className="py-24 bg-[var(--background)] border-t border-[var(--border)] relative overflow-hidden">
        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6 text-left">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-[4rem] font-black uppercase italic tracking-tighter">Global Marketplace</h2>
              <p className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-[0.4em] italic">Automated delivery across all systems</p>
            </div>
            <div className="w-24 h-1.5 bg-[var(--accent)] rounded-full shadow-[0_0_20px_rgba(var(--accent-rgb),0.5)] mb-4" />
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl bg-[var(--card)] animate-pulse border border-[var(--border)]" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
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

          <div className="mt-20 text-center">
            <Link 
              href="/games"
              className="inline-flex items-center gap-4 px-12 py-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--foreground)] font-black uppercase tracking-[0.2em] text-[11px] italic transition-all group shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              Show All Assets
              <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-white group-hover:rotate-45 transition-transform">
                <FiArrowRight size={16} />
              </div>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
