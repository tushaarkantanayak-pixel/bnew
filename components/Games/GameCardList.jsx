"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import { FiArrowRight, FiZap, FiShield } from "react-icons/fi";

export default function GameCardList({ game, isOutOfStock, index = 0 }) {
  const disabled = isOutOfStock(game.gameName);

  return (
    <div>
      <Link
        href={disabled ? "#" : `/games/${game.gameSlug}`}
        className={`group relative flex items-center gap-4 p-2.5 rounded-[1.8rem] border transition-all overflow-hidden
        ${disabled
            ? "opacity-40 grayscale cursor-not-allowed border-[var(--border)] bg-[var(--card)]/50"
            : "border-[var(--border)] bg-[var(--card)]/60 backdrop-blur-3xl hover:border-[var(--accent)]/30 hover:bg-[var(--card)]/80 shadow-md"
            }`}
      >
        {/* AVATAR SYSTEM */}
        <div className="relative flex-shrink-0">
          <div className={`
            relative w-18 h-18 sm:w-20 sm:h-20 rounded-[1.4rem] overflow-hidden border z-10
            ${disabled
              ? "border-white/10"
              : "border-white/10 group-hover:border-[var(--accent)]/30"
            }
          `}>
            <Image
              src={game.gameImageId?.image || logo}
              alt={game.gameName}
              fill
              sizes="120px"
              className="object-cover"
            />
          </div>
        </div>

        {/* INFO SYSTEM */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex flex-col mb-2.5">
            <h3
              className={`text-[14px] sm:text-[15px] font-bold leading-tight transition-colors
              ${disabled ? "text-[var(--muted)]" : "text-[var(--foreground)] group-hover:text-[var(--accent)]"}`}
            >
              {game.gameName}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {!disabled && game.tagId && !game.gameSlug?.toLowerCase().includes('bgmi') && (
              <span
                className="text-[8px] font-black uppercase tracking-[0.1em] px-2 py-0.5 rounded-md backdrop-blur-xl border border-white/10 flex items-center gap-1.5 shadow-sm"
                style={{
                  background: `linear-gradient(135deg, ${game.tagId.tagBackground}dd, ${game.tagId.tagBackground}99)`,
                  color: "#ffffff",
                  borderColor: `${game.tagId.tagBackground}66`,
                }}
              >
                {game.tagId.tagName === "Manual" && <FiZap size={10} fill="#ffffff" />}
                {game.tagId.tagName}
              </span>
            )}
            {disabled && (
              <span className="px-3 py-1.5 rounded-xl bg-red-400/10 border border-red-400/20 text-red-500/60 text-[8px] font-black uppercase tracking-widest italic">
                Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* ACTION SYSTEM */}
        {!disabled && (
          <div className="relative shrink-0 pr-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] group-hover:text-black group-hover:bg-[var(--accent)] transition-colors">
              <FiArrowRight size={18} />
            </div>
          </div>
        )}
      </Link>
    </div>
  );
}

