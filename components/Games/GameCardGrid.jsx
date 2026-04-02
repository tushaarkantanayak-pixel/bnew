"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import { FiChevronRight, FiEye, FiZap } from "react-icons/fi";

export default function GameCardGrid({ game, isOutOfStock, index = 0 }) {
  const disabled = isOutOfStock(game.gameName);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: index * 0.03,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      whileHover={{ y: -5 }}
    >
      <Link
        href={disabled ? "#" : `/games/${game.gameSlug}`}
        className={`group relative block rounded-2xl overflow-hidden border transition-all duration-500
        ${disabled
            ? "opacity-60 cursor-not-allowed border-[var(--border)] bg-[var(--background)]"
            : "border-[var(--border)] bg-[var(--card)]/40 hover:border-[var(--accent)]/50 hover:shadow-lg"
          }`}
      >
        {/* IMAGE CONTAINER */}
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            src={game.gameImageId?.image || logo}
            alt={game.gameName}
            fill
            sizes="(max-width: 768px) 33vw, 25vw"
            className={`object-cover transition-all duration-700
              ${disabled
                ? "grayscale blur-[2px]"
                : "group-hover:scale-110 group-hover:rotate-1"
              }`}
          />

          {/* OVERLAYS */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

          {/* HOVER GLOW */}
          {!disabled && (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-radial-gradient from-[var(--accent)]/20 via-transparent to-transparent pointer-events-none" />
          )}

          {/* TAG / BADGE */}
          {!disabled && game.tagId && (
            <div className="absolute top-2 left-2 z-20">
              <span
                className="text-[8px] font-black uppercase tracking-[0.1em] px-2 py-0.5 rounded-md backdrop-blur-xl border flex items-center gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform hover:scale-105"
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
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-2xl">
                <FiEye size={20} />
              </div>
            </div>
          )}

          {/* OUT OF STOCK OVERLAY */}
          {disabled && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
              <span className="px-4 py-2 rounded-xl bg-red-500/90 text-white text-[10px] font-black uppercase tracking-widest italic shadow-2xl">
                SOLD OUT
              </span>
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-2.5 relative">
          <div className="mb-1 flex items-center justify-between gap-2">
            <h3
              className={`text-[10px] sm:text-[11px] font-bold leading-tight line-clamp-2 transition-colors
              ${disabled ? "text-[var(--muted)]" : "text-[var(--foreground)] group-hover:text-[var(--accent)]"}`}
            >
              {game.gameName}
            </h3>
            {!disabled && (
              <FiChevronRight className="text-[var(--muted)] group-hover:text-[var(--accent)] transition-all group-hover:translate-x-1" size={14} />
            )}
          </div>


        </div>
      </Link>
    </motion.div>
  );
}
