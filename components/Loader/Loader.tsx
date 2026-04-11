"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface BlueBuffLoaderProps {
  progress?: number;
  duration?: number;
  onComplete?: () => void;
  showText?: boolean;
  text?: string;
}

export default function BlueBuffLoader({
  progress = 0,
  duration = 700,
  onComplete,
  showText = true,
  text = "JUST A MOMENT...",
}: BlueBuffLoaderProps) {
  const [internalProgress, setInternalProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (progress > 0) {
      setInternalProgress(progress);
      if (progress >= 100) {
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 800);
      }
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / duration, 1);
      
      // Smooth progress for the line
      setInternalProgress(t * 100);

      if (t >= 1) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 800);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [progress, duration, onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
      >
        {/* Subtle background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--accent)]/5 blur-[120px] rounded-full" />
        </div>

        <div className="relative flex flex-col items-center gap-10">
          {/* Logo with pulsing glow */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-[var(--accent)] blur-2xl rounded-full"
            />
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <Image
                src="/logo.png"
                alt="BlueBuff"
                fill
                className="object-contain drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                priority
              />
            </div>
          </motion.div>

          {/* Progress Line & Dots */}
          <div className="flex flex-col items-center gap-6">
            {/* Minimal Progress Line */}
            <div className="w-32 h-[2px] bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 className="h-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]"
                 animate={{ width: `${internalProgress}%` }}
                 transition={{ ease: "circOut" }}
               />
            </div>

            {/* Bouncing Dots */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -6, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                  className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]"
                />
              ))}
            </div>
          </div>

          {/* Loading Text */}
          {showText && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center gap-2"
            >
              <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-[0.3em] text-white text-center">
                {text.toUpperCase()}
              </h2>
              {/* Optional subtext based on progress */}
              <motion.p 
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]"
              >
                {internalProgress < 100 ? "Syncing Data" : "Finalizing"}
              </motion.p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
