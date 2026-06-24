"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { useState } from "react";

export default function GameCardGrid({ game, isOutOfStock, index = 0 }) {
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
        
        {/* Ultra-Compact Premium Card */}
        <div className={`relative h-full bg-[var(--card)] rounded-[14px] p-1 flex flex-col transition-all duration-500 ease-out
          ${disabled 
            ? "opacity-60 cursor-not-allowed border border-[var(--border)]" 
            : "border border-[var(--border)] hover:border-[var(--border)]/80 shadow-sm hover:shadow-md hover:-translate-y-0.5"}`}
        >
          {/* Top Image Container */}
          <div className="relative w-full aspect-square sm:aspect-[4/3] rounded-[10px] overflow-hidden bg-[var(--background)]">
            
            {/* Tag / Badge */}
            {tag && (
              <div className="absolute top-1.5 left-1.5 z-20">
                <span className={`px-1.5 py-0.5 rounded border text-[8px] sm:text-[9px] font-semibold tracking-wide shadow-sm ${tag.badge}`}>
                  {tag.text}
                </span>
              </div>
            )}

            {!imgError && game.gameImageId?.image ? (
              <Image
                src={game.gameImageId.image}
                alt={game.gameName}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-105 ${disabled ? "grayscale opacity-80" : ""}`}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--accent)]/5">
                <span className="text-2xl font-medium tracking-tight text-[var(--accent)] opacity-30">
                  {getFallbackLetter(game.gameName)}
                </span>
              </div>
            )}
            
            {/* Out of Stock Overlay */}
            {disabled && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-30">
                <span className="px-1.5 py-0.5 rounded border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] text-[8px] font-semibold uppercase tracking-widest shadow-sm">
                  Sold Out
                </span>
              </div>
            )}
          </div>

          {/* Bottom Content Container - ULTRA COMPACT */}
          <div className="flex-1 p-1.5 sm:p-2 flex flex-col justify-between">
            {/* break-words fixes the "WEEKLY/MONTHLY" overflow issue */}
            <h3 className={`text-[11px] sm:text-[13px] font-bold tracking-tight leading-[1.2] break-words whitespace-normal transition-colors duration-300
              ${disabled ? "text-[var(--muted)]" : "text-[var(--foreground)] group-hover:text-[var(--accent)]"}`}
              style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
              title={game.gameName}
            >
              {game.gameName}
            </h3>

            {/* Minimal Arrow Bottom Right */}
            {!disabled && (
              <div className="flex justify-end mt-1">
                <div className="w-5 h-5 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] group-hover:border-[var(--foreground)] transition-all duration-300 ease-out">
                  <FiArrowRight size={10} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
