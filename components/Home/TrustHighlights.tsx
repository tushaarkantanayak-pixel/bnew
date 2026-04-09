"use client";

import { motion } from "framer-motion";
import {
  FiZap,
  FiShield,
  FiCreditCard,
  FiPhone,
  FiUsers,
  FiCpu
} from "react-icons/fi";

const HIGHLIGHTS = [
  {
    label: "DELIVERY",
    value: "24/7",
    subtitle: "Always Fast",
    icon: FiZap,
    color: "var(--accent)",
  },
  {
    label: "SAFE",
    value: "100%",
    subtitle: "Safe & Legal",
    icon: FiShield,
    color: "var(--accent)",
  },
  {
    label: "PAYMENTS",
    value: "SECURE",
    subtitle: "Safe Checkout",
    icon: FiCreditCard,
    color: "var(--accent)",
  },
  {
    label: "SUPPORT",
    value: "FAST",
    subtitle: "Quick Help",
    icon: FiPhone,
    color: "var(--accent)",
  },
  {
    label: "PLAYERS",
    value: "10K+",
    subtitle: "Happy Customers",
    icon: FiUsers,
    color: "var(--accent)",
  },
  {
    label: "TOP-UP",
    value: "AUTO",
    subtitle: "Instant Process",
    icon: FiCpu,
    color: "var(--accent)",
  },
];

export default function TrustHighlights() {
  return (
    <section className="py-8 bg-[var(--background)] px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
            <h2 className="text-[15px] sm:text-base font-bold text-[var(--foreground)] tracking-tight">WHY PLAYERS <span className="text-[var(--accent)]">CHOOSE US</span></h2>
            <div className="w-8 h-[2px] bg-[var(--accent)]/40 mt-1" />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {HIGHLIGHTS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -2 }}
              className="group relative p-3.5 rounded-xl bg-[var(--card)]/40 border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                {/* ICON TAG */}
                <div className="w-10 h-10 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)]/60 group-hover:text-[var(--accent)] group-hover:bg-[var(--accent)]/10 transition-all shadow-sm">
                  <item.icon size={18} />
                </div>

                {/* LABEL */}
                <div className="text-[8px] font-bold text-[var(--muted)] opacity-40 leading-none">
                  {item.label}
                </div>

                {/* VALUE & SUBTITLE */}
                <div className="space-y-0.5">
                  <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors leading-none">
                    {item.value}
                  </h3>
                  <p className="text-[10px] font-medium text-[var(--muted)] opacity-70">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* SIDE GLOW ON HOVER */}
              <div className="absolute inset-x-4 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
