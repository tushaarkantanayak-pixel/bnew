"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>("dark");

  // Load stored theme on mount
  useEffect(() => {
    const stored = localStorage.getItem("theme") || "dark";
    setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored);
  }, []);

  // Toggle theme handler
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const isDark = theme === "dark";

  return (
    <div className="relative z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className={`relative flex items-center gap-2 px-1.5 py-1.5 rounded-full transition-all duration-300 group border bg-[var(--background)]/50 border-[var(--border)]/30 hover:border-[var(--border)] hover:bg-[var(--background)]/80 backdrop-blur-md`}
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        <div className={`relative flex items-center justify-center w-8 h-8 rounded-full overflow-hidden transition-all duration-300 bg-[var(--foreground)]/5 text-[var(--foreground)]`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-sm"
            >
              {isDark ? "🌙" : "☀️"}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.button>
    </div>
  );
}
