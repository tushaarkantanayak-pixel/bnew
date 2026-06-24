"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { useState } from "react";

export default function GameCardList({ game, isOutOfStock, index = 0 }) {
  const [imgError, setImgError] = useState(false);
  
  if (!game) return null;
  const disabled = isOutOfStock(game.gameName);

  const getFallbackLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  const getTag = (name) => {
    if (!name) return null;
    const lower = name.toLowerCase();
    if (lower.includes("all region")) {
      return { text: "All Region", badge: "bg-blue-500 text-white border-blue-600 shadow-sm" };
    }
    if (lower.includes("double") || lower.includes("india") || lower === "mobile legends" || lower.includes("indian")) {
      return { text: "Indian", badge: "bg-emerald-500 text-white border-emerald-600 shadow-sm" }; 
    }
    return null;
  };

  const tag = getTag(game.gameName);

  return (
    <div className="h-full">
      <Link href={disabled ? "#" : `/games/${game.gameSlug}`} className="block h-full group">
        
        {/* Premium Minimalist Card */}
        <div className={`relative h-full bg-[var(--card)] rounded-[20px] p-2.5 sm:p-3 flex items-center gap-4 sm:gap-5 transition-all duration-500 ease-out
          ${disabled 
            ? "opacity-60 cursor-not-allowed border border-[var(--border)]" 
            : "border border-[var(--border)] hover:border-[var(--border)]/80 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.03)] hover:-translate-y-0.5"}`}
        >
          {/* Left Image Container */}
          <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-[14px] overflow-hidden bg-[var(--background)] border border-[var(--border)]/50">
            {!imgError && game.gameImageId?.image ? (
              <Image
                src={game.gameImageId.image}
                alt={game.gameName}
                fill
                sizes="120px"
                className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-105 ${disabled ? "grayscale opacity-80" : ""}`}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--accent)]/5">
                <span className="text-3xl font-medium tracking-tight text-[var(--accent)] opacity-30">
                  {getFallbackLetter(game.gameName)}
                </span>
              </div>
            )}
            
            {/* Out of Stock Overlay */}
            {disabled && (
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--background)]/80 backdrop-blur-sm z-30">
                <span className="px-2 py-1 rounded border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] text-[8px] font-semibold uppercase tracking-widest shadow-sm">
                  Sold Out
                </span>
              </div>
            )}
          </div>

          {/* Right Content Container */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            {/* Added min-w-0 wrapper ensures truncation works smoothly */}
            <div className="min-w-0 w-full pr-2">
              <h3 className={`text-[15px] sm:text-[16px] font-bold tracking-tight leading-snug whitespace-normal transition-colors duration-300 mb-2.5
                ${disabled ? "text-[var(--muted)]" : "text-[var(--foreground)] group-hover:text-[var(--accent)]"}`}
                style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                title={game.gameName}
              >
                {game.gameName}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {tag && (
                <span className={`px-2.5 py-1 rounded-md border text-[10px] font-semibold tracking-wide shadow-sm ${tag.badge}`}>
                  {tag.text}
                </span>
              )}
            </div>
          </div>

          {/* Minimal Arrow */}
          {!disabled && (
            <div className="shrink-0 pr-2 sm:pr-3 flex items-center">
               <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] group-hover:border-[var(--foreground)] transition-all duration-300 ease-out shadow-sm">
                 <FiArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
               </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
