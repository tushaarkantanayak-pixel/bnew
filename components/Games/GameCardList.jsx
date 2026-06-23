"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import { FiArrowRight, FiZap, FiShield } from "react-icons/fi";
import { useState } from "react";

export default function GameCardList({ game, isOutOfStock, index = 0 }) {
  const [imgError, setImgError] = useState(false);
  const disabled = isOutOfStock(game.gameName);

  const getFallbackLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  const getTag = (name) => {
    if (!name) return null;
    const lower = name.toLowerCase();
    if (lower.includes("all region")) {
      return { text: "ALL REGION", bg: "bg-[#f5ecec]", textClass: "text-[#872e2e]" };
    }
    if (lower.includes("double") || lower.includes("india") || lower === "mobile legends" || lower.includes("indian")) {
      return { text: "INDIAN", bg: "bg-[#b1d496]", textClass: "text-white" }; 
    }
    return null;
  };

  const tag = getTag(game.gameName);

  return (
    <div className="h-full">
      <Link
        href={disabled ? "#" : `/games/${game.gameSlug}`}
        className={`group relative flex items-center gap-6 p-4 rounded-sm border transition-all overflow-hidden
        ${disabled
            ? "opacity-40 grayscale cursor-not-allowed border-[var(--border)] bg-[var(--background)]"
            : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/30 hover:shadow-md"
            }`}
      >
        {/* AVATAR SYSTEM */}
        <div className="relative flex-shrink-0">
          <div className={`
            relative w-24 h-24 sm:w-28 sm:h-28 rounded-sm overflow-hidden bg-transparent
          `}>
            {!imgError && game.gameImageId?.image ? (
              <Image
                src={game.gameImageId.image}
                alt={game.gameName}
                fill
                sizes="120px"
                className="object-contain"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--accent)]/20 to-transparent">
                <span className="text-2xl font-black italic tracking-tighter text-[var(--accent)] opacity-40">
                  {getFallbackLetter(game.gameName)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* INFO SYSTEM */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col mb-1.5">
            <h3
              className={`text-[16px] sm:text-[18px] font-[900] uppercase italic leading-tight transition-colors
              ${disabled ? "text-[var(--muted)]" : "text-[var(--foreground)] group-hover:text-[var(--accent)]"}`}
            >
              {game.gameName}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-1">
            {tag && (
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${tag.bg} ${tag.textClass}`}>
                {tag.text}
              </span>
            )}
            {disabled && (
              <span className="px-3 py-1 rounded-full bg-red-400/10 border border-red-400/20 text-red-500/60 text-[10px] font-black uppercase tracking-widest italic">
                Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* ACTION SYSTEM */}
        {!disabled && (
          <div className="relative shrink-0 pr-2">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] group-hover:text-[var(--foreground)] group-hover:bg-[var(--accent)]/20 transition-colors">
              <FiArrowRight size={20} />
            </div>
          </div>
        )}
      </Link>
    </div>
  );
}

