"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMessageCircle, FiSend, FiZap, FiCheck } from "react-icons/fi";

export default function PricingSection() {
  const [revenue, setRevenue] = useState<number>(500);
  const [activeTab, setActiveTab] = useState<"website" | "whatsapp" | "telegram">("website");

  const renderSlider = () => (
    <div className="mb-6 p-4 md:p-5 rounded-2xl bg-black/40 border border-[var(--border)]/50 shadow-inner">
      <div className="flex justify-between items-center mb-4">
        <label className="text-[11px] font-black uppercase tracking-widest text-[var(--muted)]">Est. Monthly Revenue</label>
        <span className="text-lg md:text-xl font-[1000] text-[var(--accent)]">${revenue.toLocaleString("en-US")}</span>
      </div>
      <input type="range" min="100" max="10000" step="100" value={revenue}
        onChange={(e) => setRevenue(Number(e.target.value))}
        className="w-full h-2 bg-[var(--border)] rounded-full appearance-none cursor-pointer accent-[var(--accent)]"
        aria-label="Estimated Monthly Revenue"
      />
    </div>
  );

  return (
    <section className="relative py-20 md:py-28 border-b border-[var(--border)] overflow-hidden bg-[var(--background)]">
      {/* Ambient radial glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[420px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(0,245,255,0.055) 0%, rgba(168,85,247,0.04) 45%, transparent 72%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-10">
        {/* ── Header ── */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 mb-5">
            <FiZap size={10} className="text-[var(--accent)]" />
            <span className="text-[9px] font-black uppercase tracking-[0.35em] text-[var(--accent)]">
              Pricing & Plans
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-[1000] tracking-tighter uppercase italic leading-[1.05] mb-3">
            Simple Pricing,
            <br />
            <span className="text-[var(--accent)]">Built to Scale</span>
          </h2>
          <p className="text-sm text-[var(--muted)] opacity-60">
            Choose the perfect plan for your business size.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex flex-col gap-4 relative w-full mx-auto"
        >
          <div className="bg-[var(--card)]/40 rounded-[24px] p-4 md:p-6 w-full flex flex-col shadow-2xl relative overflow-hidden backdrop-blur-3xl border border-[var(--border)]">
            {/* ── Tab header ── */}
            <div className="flex gap-1 p-1.5 rounded-2xl bg-[var(--background)]/60 border border-[var(--border)] mb-6 overflow-x-auto scrollbar-hide">
              {([
                { id: "website", label: "Website", icon: "🌐" },
                { id: "whatsapp", label: "WhatsApp Bot", icon: "💬" },
                { id: "telegram", label: "Telegram Bot", icon: "✈️" },
              ] as const).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex min-w-max items-center justify-center gap-1.5 md:gap-2 py-2 md:py-2.5 px-2 md:px-3 rounded-xl text-[9px] md:text-[11px] font-black uppercase tracking-wider md:tracking-widest transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-[var(--foreground)] text-[var(--background)] shadow-lg scale-[1.02]"
                      : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card)]/50"
                  }`}
                >
                  <span className="text-sm">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                </button>
              ))}
            </div>

            {/* ── Website Tab ── */}
            {activeTab === "website" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <h3 className="text-2xl font-[800] text-[var(--foreground)] tracking-tight mb-1">Top-Up Website</h3>
                <p className="text-sm text-[var(--muted)] mb-6">Pay only when you earn. Choose what fits your store.</p>

                {renderSlider()}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Fixed plan */}
                  <div className={`rounded-2xl p-5 flex flex-col transition-all duration-300 relative overflow-hidden ${
                    revenue * 0.015 > 5 ? "border-2 border-[var(--accent)] bg-[var(--accent)]/5 shadow-[0_0_24px_rgba(168,85,247,0.15)]" : "border border-[var(--border)] bg-[var(--card)]/40 hover:bg-[var(--card)]/60"
                  }`}>
                    {revenue * 0.015 > 5 && (
                      <span className="text-[10px] font-black text-[var(--accent)] uppercase tracking-widest mb-3 block flex items-center gap-1">★ Best for you</span>
                    )}
                    <div className="text-[11px] font-bold text-[var(--muted)] uppercase tracking-wider mb-2">Fixed</div>
                    <div className="text-4xl font-[1000] text-[var(--foreground)] leading-none mb-1">$5</div>
                    <div className="text-[11px] text-[var(--muted)] mb-4">/month</div>
                    <p className="text-[11px] text-[var(--muted)] opacity-80 leading-relaxed flex-1">One flat charge. Best once volume is steady.</p>
                  </div>

                  {/* Percentage plan */}
                  <div className={`rounded-2xl p-5 flex flex-col transition-all duration-300 relative overflow-hidden ${
                    revenue * 0.015 <= 5 ? "border-2 border-blue-500 bg-blue-500/5 shadow-[0_0_24px_rgba(59,130,246,0.15)]" : "border border-[var(--border)] bg-[var(--card)]/40 hover:bg-[var(--card)]/60"
                  }`}>
                    {revenue * 0.015 <= 5 && (
                      <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3 block flex items-center gap-1">★ Best for you</span>
                    )}
                    <div className="text-[11px] font-bold text-[var(--muted)] uppercase tracking-wider mb-2">Revenue %</div>
                    <div className="text-4xl font-[1000] text-[var(--foreground)] leading-none mb-1">
                      ${(revenue * 0.015).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-[11px] text-[var(--muted)] mb-4">/month (1.5%)</div>
                    <p className="text-[11px] text-[var(--muted)] opacity-80 leading-relaxed flex-1">Pay less while you grow. Scales naturally with your revenue.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/20 border border-[var(--border)]/50 space-y-2.5">
                  {[
                    { text: "Bring your own domain", sub: "or subdomain for $20/m" },
                    { text: "Bring any payment gateway", sub: "or business merchant account" },
                  ].map((r, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-[11px] text-[var(--muted)]">
                      <FiCheck className="shrink-0 mt-0.5 text-[var(--accent)]" size={14} />
                      <span><strong className="text-[var(--foreground)] font-bold">{r.text}</strong> {r.sub}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── WhatsApp Bot Tab ── */}
            {activeTab === "whatsapp" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center shadow-[0_0_15px_rgba(37,211,102,0.2)]">
                    <FiMessageCircle size={24} className="text-[#25D366]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-[800] text-[var(--foreground)] tracking-tight leading-none mb-1.5">WhatsApp Bot</h3>
                    <p className="text-[11px] text-[var(--muted)] opacity-80 uppercase tracking-wider font-bold">Automate orders & customer support</p>
                  </div>
                </div>

                {renderSlider()}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Flat plan */}
                  <div className={`rounded-2xl p-5 flex flex-col transition-all duration-300 relative overflow-hidden ${
                    revenue * 0.01 > 1.5 ? "border-2 border-[#25D366] bg-[#25D366]/5 shadow-[0_0_24px_rgba(37,211,102,0.15)]" : "border border-[#25D366]/20 bg-[#25D366]/5 hover:bg-[#25D366]/10"
                  }`}>
                    {revenue * 0.01 > 1.5 && (
                      <span className="text-[10px] font-black text-[#25D366] uppercase tracking-widest mb-3 block flex items-center gap-1">★ Best for you</span>
                    )}
                    <div className="text-[11px] font-bold text-[#25D366] uppercase tracking-wider mb-2">Flat Monthly</div>
                    <div className="text-4xl font-[1000] text-[var(--foreground)] leading-none mb-1">$1.5</div>
                    <div className="text-[11px] text-[var(--muted)] mb-4">/month</div>
                    <p className="text-[11px] text-[var(--muted)] opacity-80 leading-relaxed flex-1">Fixed cost. Best for established businesses with steady traffic.</p>
                  </div>

                  {/* Revenue plan */}
                  <div className={`rounded-2xl p-5 flex flex-col transition-all duration-300 relative overflow-hidden ${
                    revenue * 0.01 <= 1.5 ? "border-2 border-blue-500 bg-blue-500/5 shadow-[0_0_24px_rgba(59,130,246,0.15)]" : "border border-[var(--border)] bg-[var(--card)]/40 hover:bg-[var(--card)]/60"
                  }`}>
                    {revenue * 0.01 <= 1.5 && (
                      <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3 block flex items-center gap-1">★ Best for you</span>
                    )}
                    <div className="text-[11px] font-bold text-[var(--muted)] uppercase tracking-wider mb-2">Revenue %</div>
                    <div className="text-4xl font-[1000] text-[var(--foreground)] leading-none mb-1">
                      ${(revenue * 0.01).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-[11px] text-[var(--muted)] mb-4">/month (1%)</div>
                    <p className="text-[11px] text-[var(--muted)] opacity-80 leading-relaxed flex-1">Start light. Scales as your orders grow — risk-free.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-[#25D366]/20 bg-[#25D366]/5 space-y-3">
                  <p className="text-[11px] font-black uppercase tracking-widest text-[#25D366] mb-3">What's included</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {["Auto order confirmations", "24/7 customer replies", "Payment & delivery alerts", "Multi-language support"].map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-[11px] text-[var(--muted)] font-medium">
                        <FiCheck className="shrink-0 text-[#25D366]" size={14} />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Telegram Bot Tab ── */}
            {activeTab === "telegram" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#229ED9]/15 border border-[#229ED9]/30 flex items-center justify-center shadow-[0_0_15px_rgba(34,158,217,0.2)]">
                    <FiSend size={24} className="text-[#229ED9]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-[800] text-[var(--foreground)] tracking-tight leading-none mb-1.5">Telegram Bot</h3>
                    <p className="text-[11px] text-[var(--muted)] opacity-80 uppercase tracking-wider font-bold">Alerts, group management & secure ops</p>
                  </div>
                </div>

                {renderSlider()}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Flat plan */}
                  <div className={`rounded-2xl p-5 flex flex-col transition-all duration-300 relative overflow-hidden ${
                    revenue * 0.01 > 1 ? "border-2 border-[#229ED9] bg-[#229ED9]/5 shadow-[0_0_24px_rgba(34,158,217,0.15)]" : "border border-[#229ED9]/20 bg-[#229ED9]/5 hover:bg-[#229ED9]/10"
                  }`}>
                    {revenue * 0.01 > 1 && (
                      <span className="text-[10px] font-black text-[#229ED9] uppercase tracking-widest mb-3 block flex items-center gap-1">★ Best for you</span>
                    )}
                    <div className="text-[11px] font-bold text-[#229ED9] uppercase tracking-wider mb-2">Flat Monthly</div>
                    <div className="text-4xl font-[1000] text-[var(--foreground)] leading-none mb-1">$1</div>
                    <div className="text-[11px] text-[var(--muted)] mb-4">/month</div>
                    <p className="text-[11px] text-[var(--muted)] opacity-80 leading-relaxed flex-1">Predictable cost. Best for active communities and channels.</p>
                  </div>

                  {/* Revenue plan */}
                  <div className={`rounded-2xl p-5 flex flex-col transition-all duration-300 relative overflow-hidden ${
                    revenue * 0.01 <= 1 ? "border-2 border-blue-500 bg-blue-500/5 shadow-[0_0_24px_rgba(59,130,246,0.15)]" : "border border-[var(--border)] bg-[var(--card)]/40 hover:bg-[var(--card)]/60"
                  }`}>
                    {revenue * 0.01 <= 1 && (
                      <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3 block flex items-center gap-1">★ Best for you</span>
                    )}
                    <div className="text-[11px] font-bold text-[var(--muted)] uppercase tracking-wider mb-2">Revenue %</div>
                    <div className="text-4xl font-[1000] text-[var(--foreground)] leading-none mb-1">
                      ${(revenue * 0.01).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-[11px] text-[var(--muted)] mb-4">/month (1%)</div>
                    <p className="text-[11px] text-[var(--muted)] opacity-80 leading-relaxed flex-1">Only pay when you earn. Perfect for new bot deployments.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-[#229ED9]/20 bg-[#229ED9]/5 space-y-3">
                  <p className="text-[11px] font-black uppercase tracking-widest text-[#229ED9] mb-3">What's included</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {["Instant top-up notifications", "Group & channel management", "Secure inline payments", "Order status broadcasts"].map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-[11px] text-[var(--muted)] font-medium">
                        <FiCheck className="shrink-0 text-[#229ED9]" size={14} />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Footer note ── */}
            <div className="mt-6 flex items-start gap-2 text-[11px] text-[var(--muted)] opacity-60 justify-center">
              <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
              <p>Billing begins once your service goes live.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
