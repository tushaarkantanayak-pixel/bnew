"use client";
 
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import { FiChevronRight, FiEye, FiZap } from "react-icons/fi";
import { useState } from "react";
 
export default function GameCardGrid({ game, isOutOfStock, index = 0 }) {
  const [imgError, setImgError] = useState(false);
  const disabled = isOutOfStock(game.gameName);
 
  const getFallbackLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };
 
  return (
    <div>
      <Link
        href={disabled ? "#" : `/games/${game.gameSlug}`}
        className={`group relative block rounded-2xl overflow-hidden border transition-all
        ${disabled
            ? "opacity-60 cursor-not-allowed border-[var(--border)] bg-[var(--background)]"
            : "border-[var(--border)] bg-[var(--card)]/40 hover:border-[var(--accent)]/50"
          }`}
      >
        {/* IMAGE CONTAINER */}
        <div className="relative w-full aspect-square overflow-hidden bg-[var(--background)]">
          {!imgError && game.gameImageId?.image ? (
            <Image
              src={game.gameImageId.image}
              alt={game.gameName}
              fill
              sizes="(max-width: 768px) 33vw, 25vw"
              className={`object-cover ${disabled ? "grayscale blur-[2px]" : ""}`}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--accent)]/20 to-transparent">
              <span className="text-4xl font-black italic tracking-tighter text-[var(--accent)] opacity-40">
                {getFallbackLetter(game.gameName)}
              </span>
            </div>
          )}
 
          {/* OVERLAYS */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
 
          {/* VIEW BUTTON (HOVER ONLY) */}
          {!disabled && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                <FiEye size={20} />
              </div>
            </div>
          )}
 
          {/* OUT OF STOCK OVERLAY */}
          {disabled && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
              <span className="px-4 py-2 rounded-xl bg-red-500/90 text-white text-[10px] font-black uppercase tracking-widest italic">
                SOLD OUT
              </span>
            </div>
          )}
        </div>
 
        {/* CONTENT */}
        <div className="p-2.5 relative">
          <div className="mb-1 flex items-center justify-between gap-2">
            <h3
              className={`text-[10px] sm:text-[11px] font-bold leading-tight transition-colors
              ${disabled ? "text-[var(--muted)]" : "text-[var(--foreground)] group-hover:text-[var(--accent)]"}`}
            >
              {game.gameName}
            </h3>
            {!disabled && (
              <FiChevronRight className="text-[var(--muted)] group-hover:text-[var(--accent)]" size={14} />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
