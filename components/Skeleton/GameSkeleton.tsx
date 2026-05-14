"use client";

import { motion } from "framer-motion";

export default function GameSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--background)] px-4 py-8 animate-pulse">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Game Switcher Skeleton */}
        <div className="h-12 w-full max-w-md bg-[var(--card)]/40 rounded-2xl border border-white/5 mx-auto" />

        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row items-center gap-8 pt-8">
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-[2.5rem] bg-[var(--card)]/40 border border-white/5" />
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="h-10 w-64 bg-[var(--card)]/40 rounded-xl mx-auto md:mx-0" />
            <div className="h-4 w-32 bg-[var(--accent)]/10 rounded-full mx-auto md:mx-0" />
            <div className="flex gap-3 justify-center md:justify-start">
              <div className="h-10 w-32 bg-[var(--card)]/40 rounded-xl" />
              <div className="h-10 w-32 bg-[var(--card)]/40 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Package Selector Skeleton */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="h-8 w-48 bg-[var(--card)]/40 rounded-xl" />
            <div className="h-8 w-24 bg-[var(--card)]/40 rounded-xl" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="aspect-square bg-[var(--card)]/40 rounded-2xl border border-white/5 p-4 flex flex-col items-center justify-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10" />
                <div className="h-4 w-16 bg-[var(--card)]/60 rounded-lg" />
                <div className="h-3 w-12 bg-[var(--accent)]/10 rounded-lg" />
              </div>
            ))}
          </div>
        </div>

        {/* Buy Panel Skeleton */}
        <div className="max-w-4xl mx-auto p-8 rounded-[3rem] bg-[var(--card)]/40 border border-white/5 space-y-8">
          <div className="space-y-4">
            <div className="h-6 w-32 bg-[var(--card)]/40 rounded-lg" />
            <div className="h-14 w-full bg-[var(--card)]/60 rounded-xl border border-white/5" />
          </div>
          <div className="h-16 w-full bg-[var(--accent)]/20 rounded-2xl" />
        </div>

      </div>
    </div>
  );
}
