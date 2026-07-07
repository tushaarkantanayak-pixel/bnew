"use client";

import { motion } from "framer-motion";

export default function GameSkeleton() {
  const shimmerClass = "relative overflow-hidden bg-[var(--foreground)]/5 rounded-2xl animate-pulse";

  return (
    <div className="min-h-screen bg-[var(--background)] px-4 md:px-0 py-10 pt-2">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Game Switcher Skeleton */}
        <div className="w-full mb-5 relative z-20">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-[2px] bg-[var(--foreground)]/10" />
              <div className="h-3 w-24 bg-[var(--foreground)]/10 rounded-full" />
            </div>
          </div>
          <div className="flex gap-3 overflow-hidden pb-2 px-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div key={i} className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[var(--foreground)]/5 animate-pulse" />
            ))}
          </div>
        </div>

        {/* Game Header Skeleton */}
        <div className="relative mb-6">
          <div className={`w-full h-16 md:h-20 ${shimmerClass} flex items-center justify-between px-3 py-2 md:px-5 md:py-2`}>
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-13 md:h-13 rounded-xl md:rounded-2xl bg-[var(--foreground)]/10" />
              <div className="h-5 w-32 md:w-48 bg-[var(--foreground)]/10 rounded-lg" />
            </div>
            <div className="flex gap-2">
              <div className="hidden md:block w-24 h-8 bg-[var(--foreground)]/10 rounded-full" />
              <div className="hidden md:block w-24 h-8 bg-[var(--foreground)]/10 rounded-full" />
            </div>
          </div>
        </div>

        {/* Package Selector Skeleton */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-6 w-32 bg-[var(--foreground)]/10 rounded-lg" />
              <div className="h-4 w-16 bg-[var(--foreground)]/5 rounded-full" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div key={i} className={`h-24 md:h-28 ${shimmerClass}`} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
