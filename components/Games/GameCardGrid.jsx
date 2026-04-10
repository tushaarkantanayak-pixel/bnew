"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import { FiChevronRight, FiEye, FiZap } from "react-icons/fi";

export default function GameCardGrid({ game, isOutOfStock, index = 0 }) {
  const disabled = isOutOfStock(game.gameName);

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
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            src={game.gameImageId?.image || logo}
            alt={game.gameName}
            fill
            sizes="(max-width: 768px) 33vw, 25vw"
            className={`object-cover ${disabled ? "grayscale blur-[2px]" : ""}`}
          />

          {/* OVERLAYS */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />

          {/* TAG / BADGE */}
          {!disabled && game.tagId && !game.gameSlug?.toLowerCase().includes('bgmi') && (
            <div className="absolute top-2 left-2 z-20">
              <span
                className="text-[8px] font-black uppercase tracking-[0.1em] px-2 py-0.5 rounded-md backdrop-blur-xl border flex items-center gap-1.5 shadow-sm"
                style={{
                  background: `linear-gradient(135deg, ${game.tagId.tagBackground}dd, ${game.tagId.tagBackground}99)`,
                  color: "#ffffff",
                  borderColor: `${game.tagId.tagBackground}66`,
                }}
              >
                {game.tagId.tagName === "Manual" && <FiZap size={10} fill="#ffffff" />}
                {game.tagId.tagName}
              </span>
            </div>
          )}

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
