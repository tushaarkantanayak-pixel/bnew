"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import { FiArrowRight, FiZap, FiShield } from "react-icons/fi";

export default function GameCardList({ game, isOutOfStock, index = 0 }) {
  const [imgError, setImgError] = useState(false);
  const disabled = isOutOfStock(game.gameName);

  const getFallbackLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

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
            relative w-18 h-18 sm:w-20 sm:h-20 rounded-[1.4rem] overflow-hidden border z-10 bg-[var(--background)]
            ${disabled
              ? "border-white/10"
              : "border-white/10 group-hover:border-[var(--accent)]/30"
            }
          `}>
            {!imgError && game.gameImageId?.image ? (
              <Image
                src={game.gameImageId.image}
                alt={game.gameName}
                fill
                sizes="120px"
                className="object-cover"
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
            {/* TAGS REMOVED */}
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

