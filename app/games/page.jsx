"use client";

import { FiExternalLink, FiShoppingBag } from "react-icons/fi";

export default function GamesPage() {
  return (
    <main className="min-h-[75vh] bg-[var(--background)] px-4 py-16 sm:py-24 relative overflow-hidden flex items-center justify-center">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--accent)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto w-full relative z-10 text-center">
        <div className="p-6 sm:p-10 rounded-3xl border border-[var(--border)] bg-[var(--card)]/70 backdrop-blur-xl shadow-2xl flex flex-col items-center gap-6">
          
          <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center border border-[var(--accent)]/20 shadow-inner">
            <FiShoppingBag size={30} />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-[1000] uppercase italic tracking-tight text-[var(--foreground)]">
              Top-Up &amp; API Portal
            </h1>
            <p className="text-xs sm:text-sm text-[var(--muted)] max-w-md mx-auto leading-relaxed">
              Direct storefront orders and developer API services are hosted on our dedicated platforms:
            </p>
          </div>

          <div className="w-full flex flex-col sm:flex-row gap-4 pt-2">
            {/* INR Purchase Card */}
            <a
              href="https://mlbbtopup.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 group flex flex-col items-center justify-between p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]/80 hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] mb-1">
                  Direct Storefront
                </span>
                <p className="text-xs sm:text-sm text-[var(--foreground)] font-semibold">
                  If want to purchase in <span className="text-[var(--accent)] font-black">INR</span> visit:
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[var(--accent)] !text-black font-black text-xs uppercase tracking-wider group-hover:brightness-110 transition-all shadow-md">
                <span>mlbbtopup.in</span>
                <FiExternalLink size={13} />
              </div>
            </a>

            {/* API Service Card */}
            <a
              href="https://api.bluebuff.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 group flex flex-col items-center justify-between p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]/80 hover:border-amber-500 hover:bg-amber-500/5 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1">
                  Developer Engine
                </span>
                <p className="text-xs sm:text-sm text-[var(--foreground)] font-semibold">
                  For <span className="text-amber-400 font-black">API service</span> visit:
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-400 !text-black font-black text-xs uppercase tracking-wider group-hover:brightness-110 transition-all shadow-md">
                <span>api.bluebuff.in</span>
                <FiExternalLink size={13} />
              </div>
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}
