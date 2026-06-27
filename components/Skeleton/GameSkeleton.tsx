"use client";

import { motion } from "framer-motion";

const shimmer = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.3, 0.7, 0.3],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const blockClass = "relative overflow-hidden bg-[var(--card)]/40 border border-white/5";

const ShimmerEffect = () => (
  <motion.div
    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
    animate={{ translateX: ["-100%", "200%"] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
  />
);

export default function GameSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--background)] px-4 py-8 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Game Switcher Skeleton */}
        <motion.div variants={shimmer} initial="initial" animate="animate" className={`h-12 w-full max-w-md rounded-2xl mx-auto flex items-center justify-between p-1 ${blockClass}`}>
          <div className="w-1/2 h-full bg-white/5 rounded-xl" />
          <div className="w-1/2 h-full rounded-xl" />
          <ShimmerEffect />
        </motion.div>

        {/* Header Skeleton */}
        <motion.div variants={shimmer} initial="initial" animate="animate" className="flex flex-col md:flex-row items-center gap-8 pt-8">
          <div className={`w-40 h-40 md:w-56 md:h-56 rounded-[2.5rem] shadow-[0_0_30px_rgba(255,255,255,0.02)] flex-shrink-0 ${blockClass}`}>
            <ShimmerEffect />
          </div>
          <div className="flex-1 space-y-5 text-center md:text-left w-full flex flex-col items-center md:items-start">
            <div className={`h-10 w-3/4 max-w-md rounded-xl ${blockClass}`}>
              <ShimmerEffect />
            </div>
            <div className={`h-4 w-1/3 max-w-[150px] bg-[var(--accent)]/10 rounded-full ${blockClass} !border-none`}>
              <ShimmerEffect />
            </div>
            <div className="flex gap-3 justify-center md:justify-start w-full">
              <div className={`h-8 w-28 rounded-lg ${blockClass}`}>
                 <ShimmerEffect />
              </div>
              <div className={`h-8 w-28 rounded-lg ${blockClass}`}>
                 <ShimmerEffect />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Package Selector Skeleton */}
        <motion.div variants={shimmer} initial="initial" animate="animate" className="space-y-6 pt-4">
          <div className="flex justify-between items-center">
            <div className={`h-8 w-48 rounded-xl ${blockClass}`}>
              <ShimmerEffect />
            </div>
            <div className={`h-8 w-24 rounded-xl ${blockClass}`}>
              <ShimmerEffect />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`aspect-[4/5] rounded-2xl p-4 flex flex-col items-center justify-center space-y-4 shadow-lg ${blockClass}`}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent)]/20 to-transparent rotate-12 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-white/5 blur-sm" />
                </div>
                <div className={`h-4 w-20 rounded-lg bg-white/5`} />
                <div className={`h-3 w-12 rounded-lg bg-[var(--accent)]/10`} />
                <ShimmerEffect />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Buy Panel Skeleton */}
        <motion.div variants={shimmer} initial="initial" animate="animate" className={`max-w-4xl mx-auto p-8 rounded-[3rem] space-y-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] ${blockClass}`}>
          <ShimmerEffect />
          <div className="space-y-4 relative z-10">
            <div className="h-6 w-40 bg-white/5 rounded-lg" />
            <div className="h-16 w-full bg-white/[0.02] rounded-2xl border border-white/5" />
          </div>
          <div className="h-16 w-full bg-gradient-to-r from-[var(--accent)]/20 via-[var(--accent)]/10 to-[var(--accent)]/20 rounded-2xl relative overflow-hidden">
             <div className="absolute inset-0 bg-[var(--accent)]/20 blur-xl" />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
