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
      <Link href={disabled ? "#" : `/games/${game.gameSlug}`} className="block h-full outline-none">
        
        {/* Simplified Flush Card */}
        <div className={`group relative h-full bg-transparent flex flex-col transition-all duration-300 ease-out
          ${disabled 
            ? "opacity-60 cursor-not-allowed" 
            : ""}`}
        >
          {/* Top Image Container - Flush edges */}
          <div className="relative w-full aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--card)] border border-[var(--border)] group-hover:border-[var(--accent)] group-hover:shadow-[0_4px_20px_-10px_rgba(var(--accent-rgb),0.3)] transition-all duration-300">
            
            {/* Tag / Badge */}
            {tag && (
              <div className="absolute top-2 left-2 z-20">
                <span className={`px-2 py-1 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest shadow-sm ${tag.badge}`}>
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
                className={`object-cover transition-transform duration-500 group-hover:scale-105 ${disabled ? "grayscale opacity-80" : ""}`}
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
                <span className="px-2 py-1 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] text-[9px] font-black uppercase tracking-widest shadow-sm">
                  Sold Out
                </span>
              </div>
            )}
          </div>

          {/* Bottom Content Container - Floating Text */}
          <div className="flex-1 pt-3 pb-1 px-1 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2">
              <h3 className={`text-[12px] sm:text-[14px] font-black tracking-tight leading-tight transition-colors duration-300 group-hover:text-[var(--accent)]
                ${disabled ? "text-[var(--muted)]" : "text-[var(--foreground)]"}`}
                style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                title={game.gameName}
              >
                {game.gameName}
              </h3>

              {!disabled && (
                <div className="w-6 h-6 shrink-0 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors mt-0.5">
                  <FiArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
