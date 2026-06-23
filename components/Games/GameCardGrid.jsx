"use client";
 
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiChevronRight, FiEye } from "react-icons/fi";
import { useState } from "react";
 
export default function GameCardGrid({ game, isOutOfStock, index = 0 }) {
  const [imgError, setImgError] = useState(false);
  
  // 3D Tilt Setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!game) return null;
  const disabled = isOutOfStock(game.gameName);
 
  const getFallbackLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  const getTag = (name) => {
    if (!name) return null;
    const lower = name.toLowerCase();
    if (lower.includes("all region")) {
      return { text: "ALL REGION", bg: "bg-[#e8d5d5]", textClass: "text-[#7a2021]" };
    }
    if (lower.includes("double") || lower.includes("india") || lower === "mobile legends" || lower.includes("indian")) {
      return { text: "INDIAN", bg: "bg-[#7db45c]", textClass: "text-white" }; 
    }
    return null;
  };

  const tag = getTag(game.gameName);
 
  return (
    <motion.div
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className="h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={disabled ? "#" : `/games/${game.gameSlug}`} className="block h-full">
        <motion.div
          style={{ rotateX, rotateY }}
          className={`group relative flex flex-col h-full rounded-sm overflow-hidden border transition-all shadow-sm
          ${disabled
              ? "opacity-60 cursor-not-allowed border-[var(--border)] bg-[var(--background)]"
              : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/50 hover:shadow-md"
            }`}
        >
          {/* IMAGE CONTAINER */}
          <div className="relative w-full aspect-square overflow-hidden bg-[var(--background)]">
            {tag && (
              <div className={`absolute top-4 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase shadow-sm ${tag.bg} ${tag.textClass}`}>
                {tag.text}
              </div>
            )}
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
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-40 pointer-events-none" />
  
            {/* VIEW BUTTON (HOVER ONLY) */}
            {!disabled && (
              <div
                style={{ transform: "translateZ(30px)" }}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl">
                  <FiEye size={18} />
                </div>
              </div>
            )}
  
            {/* OUT OF STOCK OVERLAY */}
            {disabled && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] z-30">
                <span className="px-4 py-2 rounded-xl bg-red-500/90 text-white text-[10px] font-black uppercase tracking-widest italic">
                  SOLD OUT
                </span>
              </div>
            )}
          </div>
  
          {/* CONTENT */}
          <div
            className="flex-1 p-3.5 relative bg-[var(--card)] flex flex-col justify-center"
            style={{ transform: "translateZ(20px)" }}
          >
            <div className="flex items-center justify-between gap-2">
              <h3
                className={`text-[12px] sm:text-[13px] font-[900] uppercase italic leading-tight transition-colors
                ${disabled ? "text-[var(--muted)]" : "text-[var(--foreground)] group-hover:text-[var(--accent)]"}`}
              >
                {game.gameName}
              </h3>
              {!disabled && (
                <FiChevronRight className="text-gray-400 group-hover:text-[var(--accent)] flex-shrink-0" size={16} />
              )}
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
