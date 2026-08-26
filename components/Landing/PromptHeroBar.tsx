"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SHOWCASE_ITEMS = [
  {
    text: "Explore All 8 Ecosystem Products",
    tag: "PRODUCTS",
    target: "#products-suite",
    isExternal: false,
  },
  {
    text: "Instant MLBB & Game Top-Up Store",
    tag: "TOP-UP",
    target: "#games-section",
    isExternal: false,
  },
  {
    text: "Sub-Second Game Top-Up API Engine",
    tag: "API",
    target: "/dashboard/digital-gametopup/api-keys",
    isExternal: false,
  },
  {
    text: "Custom Game Store & Studio Build",
    tag: "AGENCY",
    target: "#agency-services",
    isExternal: false,
  },
  {
    text: "Crypto & Instant Merchant Payments",
    tag: "PAYMENTS",
    target: "https://cryptopay.bluebuff.in",
    isExternal: true,
  },
];

export default function PromptHeroBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SHOWCASE_ITEMS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const current = SHOWCASE_ITEMS[index];

  const handleClick = (e: React.MouseEvent, target: string, isExternal: boolean) => {
    if (isExternal) {
      e.preventDefault();
      window.open(target, "_blank", "noopener,noreferrer");
      return;
    }
    if (target.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="w-full max-w-md min-w-0">
      {/* ─── Sleek, Minimal, Non-Overflowing Redirect Pill ─── */}
      <a
        href={current.target}
        onClick={(e) => handleClick(e, current.target, current.isExternal)}
        className="group relative flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[var(--card)]/90 hover:bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-[var(--accent)]/15 active:scale-[0.99] cursor-pointer w-full min-w-0 overflow-hidden box-border"
      >
        {/* Subtle Ambient Glow on Hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/0 via-[var(--accent)]/[0.08] to-[var(--accent)]/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Left AI / Peanut Icon */}
        <div className="flex-shrink-0 flex items-center justify-center text-[var(--accent)]">
          <svg
            viewBox="0 0 32 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-105"
          >
            <path
              d="M8.5 2.5C4.9 2.5 2 5.4 2 9C2 12.6 4.9 15.5 8.5 15.5C11.8 15.5 13.5 13 16 13C18.5 13 20.2 15.5 23.5 15.5C27.1 15.5 30 12.6 30 9C30 5.4 27.1 2.5 23.5 2.5C20.2 2.5 18.5 5 16 5C14 5 11.8 2.5 8.5 2.5Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Middle Showcase Text */}
        <div className="flex-1 min-w-0 flex items-center gap-1.5 sm:gap-2 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5 sm:gap-2 truncate min-w-0 w-full"
            >
              <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 flex-shrink-0">
                {current.tag}
              </span>
              <span className="text-[11px] sm:text-xs md:text-sm font-black uppercase italic tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors truncate">
                {current.text}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Circular Action Arrow */}
        <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--accent)] group-hover:brightness-110 active:scale-95 text-black flex items-center justify-center transition-all shadow-xs">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          >
            <path d="M6 16v-3a3 3 0 0 1 3-3h9" />
            <path d="m14 5 5 5-5 5" />
          </svg>
        </div>
      </a>
    </div>
  );
}
