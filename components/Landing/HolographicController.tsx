"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiZap, FiCreditCard, FiShoppingBag, FiArrowUpRight, FiMessageCircle, FiSend } from "react-icons/fi";
import Link from "next/link";

/* ─────────────────────────────────────────────
   Hotspot definitions
   x / y  = percentage of the SVG viewBox (800 × 450)
   tip    = which side the tooltip card opens
───────────────────────────────────────────── */
type TipDir = "right" | "left" | "below";

interface Hotspot {
  id: string;
  label: string;
  desc: string;
  color: string;
  x: string;
  y: string;
  tip: TipDir;
  Icon: React.ElementType;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "api",
    label: "Game API",
    desc: "50+ titles · instant delivery",
    color: "#00f5ff",
    x: "29%",
    y: "44%",
    tip: "right",
    Icon: FiZap,
  },
  {
    id: "payments",
    label: "Payments",
    desc: "Any gateway · zero hassle",
    color: "#a855f7",
    x: "50%",
    y: "30%",
    tip: "below",
    Icon: FiCreditCard,
  },
  {
    id: "storefront",
    label: "Your Storefront",
    desc: "Branded · live in days",
    color: "#4ade80",
    x: "68%",
    y: "44%",
    tip: "left",
    Icon: FiShoppingBag,
  },
  {
    id: "whatsapp",
    label: "WhatsApp Bot",
    desc: "Auto orders · 24/7 support",
    color: "#25D366",
    x: "23%",
    y: "78%",
    tip: "right",
    Icon: FiMessageCircle,
  },
  {
    id: "telegram",
    label: "Telegram Bot",
    desc: "Alerts · group management",
    color: "#229ED9",
    x: "77%",
    y: "78%",
    tip: "left",
    Icon: FiSend,
  },
];

/* ─────────────────────────────────────────────
   Tooltip card
───────────────────────────────────────────── */
function Tooltip({ h }: { h: Hotspot }) {
  const posClass: Record<TipDir, string> = {
    right:  "left-6 top-1/2 -translate-y-1/2 ml-2",
    left:   "right-6 top-1/2 -translate-y-1/2 mr-2",
    below:  "top-6 left-1/2 -translate-x-1/2 mt-2",
  };
  return (
    <AnimatePresence>
      <motion.div
        className={`absolute z-30 pointer-events-none ${posClass[h.tip]}`}
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.88 }}
        transition={{ duration: 0.14, ease: "easeOut" }}
      >
        <div
          className="px-3.5 py-2.5 rounded-2xl whitespace-nowrap shadow-2xl backdrop-blur-md border"
          style={{
            borderColor: `${h.color}45`,
            background: "var(--card)",
            boxShadow: `0 0 28px ${h.color}22, 0 4px 24px rgba(0,0,0,0.35)`,
          }}
        >
          <div className="flex items-center gap-2 mb-0.5">
            <h.Icon size={11} style={{ color: h.color }} />
            <span
              className="text-[10px] font-black uppercase tracking-[0.2em]"
              style={{ color: h.color }}
            >
              {h.label}
            </span>
          </div>
          <p className="text-[9px] text-[var(--muted)] opacity-65 leading-snug">{h.desc}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   Hotspot marker (pulsing dot + tooltip)
───────────────────────────────────────────── */
function HotspotMarker({
  h,
  index,
  isActive,
  onEnter,
  onLeave,
}: {
  h: Hotspot;
  index: number;
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      className="absolute"
      style={{ left: h.x, top: h.y, transform: "translate(-50%,-50%)", zIndex: 20 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.9 + index * 0.18, type: "spring", stiffness: 200, damping: 16 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="relative cursor-pointer">
        {/* outer ping 1 */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: `1px solid ${h.color}` }}
          animate={{ scale: [1, 2.6], opacity: [0.65, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: index * 0.85 }}
        />
        {/* outer ping 2 (offset) */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: `1px solid ${h.color}` }}
          animate={{ scale: [1, 2.6], opacity: [0.65, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: index * 0.85 + 1.3 }}
        />

        {/* core dot */}
        <motion.div
          className="w-4 h-4 rounded-full border-2 relative z-10 flex items-center justify-center"
          style={{
            borderColor: h.color,
            backgroundColor: `${h.color}28`,
            boxShadow: isActive
              ? `0 0 18px ${h.color}80, 0 0 6px ${h.color}60`
              : `0 0 10px ${h.color}50`,
          }}
          animate={isActive ? { scale: 1.3 } : { scale: [1, 1.12, 1] }}
          transition={
            isActive
              ? { duration: 0.18 }
              : { duration: 2.2, repeat: Infinity, delay: index * 0.4 }
          }
        />

        {isActive && <Tooltip h={h} />}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   The SVG game controller (holographic wireframe)
   ViewBox: 0 0 800 450
───────────────────────────────────────────── */
function ControllerSVG({ active }: { active: string | null }) {
  const cyanOpacity = [0.65, 1, 0.65];
  const purpleOpacity = [0.42, 0.88, 0.42];

  return (
    <svg
      viewBox="0 0 800 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <defs>
        {/* Soft glow on cyan elements */}
        <filter id="hc-glow-c" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Stronger glow on purple elements */}
        <filter id="hc-glow-p" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── TOP BODY ARC ── */}
      <motion.path
        d="M 195 230
           C 192 195 188 160 193 132
           C 196 108 203 90 217 78
           C 230 66 250 60 270 62
           C 287 64 298 74 308 88
           C 337 64 368 54 400 54
           C 432 54 463 64 492 88
           C 502 74 513 64 530 62
           C 550 60 570 66 583 78
           C 597 90 604 108 607 132
           C 612 160 608 195 605 230"
        stroke="#00f5ff"
        strokeWidth="1.6"
        filter="url(#hc-glow-c)"
        animate={{ opacity: cyanOpacity }}
        transition={{ duration: 3.2, repeat: Infinity }}
      />

      {/* ── LEFT SIDE DOWN TO GRIP ── */}
      <motion.path
        d="M 195 230 C 192 252 191 264 193 276 L 260 284"
        stroke="#00f5ff"
        strokeWidth="1.6"
        filter="url(#hc-glow-c)"
        animate={{ opacity: cyanOpacity }}
        transition={{ duration: 3.2, repeat: Infinity, delay: 0.4 }}
      />
      {/* ── RIGHT SIDE DOWN TO GRIP ── */}
      <motion.path
        d="M 605 230 C 608 252 609 264 607 276 L 540 284"
        stroke="#00f5ff"
        strokeWidth="1.6"
        filter="url(#hc-glow-c)"
        animate={{ opacity: cyanOpacity }}
        transition={{ duration: 3.2, repeat: Infinity, delay: 0.8 }}
      />

      {/* ── BOTTOM CENTRE BRIDGE ── */}
      <motion.path
        d="M 260 284 Q 330 296 400 296 Q 470 296 540 284"
        stroke="#00f5ff"
        strokeWidth="1.6"
        filter="url(#hc-glow-c)"
        animate={{ opacity: cyanOpacity }}
        transition={{ duration: 3.6, repeat: Infinity, delay: 1 }}
      />

      {/* ── LEFT GRIP ── */}
      <motion.path
        d="M 193 276
           C 182 296 172 322 168 352
           C 164 378 170 402 186 414
           C 201 424 226 422 246 414
           C 265 406 275 386 277 360
           C 279 336 272 310 263 288
           L 260 284"
        stroke="#00f5ff"
        strokeWidth="1.6"
        filter="url(#hc-glow-c)"
        animate={{ opacity: cyanOpacity }}
        transition={{ duration: 3.2, repeat: Infinity, delay: 0.5 }}
      />
      {/* ── RIGHT GRIP ── */}
      <motion.path
        d="M 607 276
           C 618 296 628 322 632 352
           C 636 378 630 402 614 414
           C 599 424 574 422 554 414
           C 535 406 525 386 523 360
           C 521 336 528 310 537 288
           L 540 284"
        stroke="#00f5ff"
        strokeWidth="1.6"
        filter="url(#hc-glow-c)"
        animate={{ opacity: cyanOpacity }}
        transition={{ duration: 3.2, repeat: Infinity, delay: 0.9 }}
      />

      {/* ── L1 SHOULDER ── */}
      <motion.path
        d="M 195 172 C 190 154 190 138 194 125
           C 198 112 208 105 224 104
           C 244 102 264 110 280 124
           L 308 88"
        stroke="#00f5ff"
        strokeWidth="1.4"
        filter="url(#hc-glow-c)"
        animate={{ opacity: cyanOpacity }}
        transition={{ duration: 2.6, repeat: Infinity }}
      />
      {/* ── R1 SHOULDER ── */}
      <motion.path
        d="M 605 172 C 610 154 610 138 606 125
           C 602 112 592 105 576 104
           C 556 102 536 110 520 124
           L 492 88"
        stroke="#00f5ff"
        strokeWidth="1.4"
        filter="url(#hc-glow-c)"
        animate={{ opacity: cyanOpacity }}
        transition={{ duration: 2.6, repeat: Infinity, delay: 0.6 }}
      />

      {/* ── L2 TRIGGER ── */}
      <motion.path
        d="M 194 125 C 190 103 192 77 202 62
           C 212 48 230 44 250 48
           C 270 52 282 67 286 86"
        stroke="#a855f7"
        strokeWidth="1.5"
        filter="url(#hc-glow-p)"
        animate={{ opacity: purpleOpacity }}
        transition={{ duration: 2.1, repeat: Infinity }}
      />
      {/* ── R2 TRIGGER ── */}
      <motion.path
        d="M 606 125 C 610 103 608 77 598 62
           C 588 48 570 44 550 48
           C 530 52 518 67 514 86"
        stroke="#a855f7"
        strokeWidth="1.5"
        filter="url(#hc-glow-p)"
        animate={{ opacity: purpleOpacity }}
        transition={{ duration: 2.1, repeat: Infinity, delay: 0.55 }}
      />

      {/* ═══ D-PAD (left area, centred ~x=235 y=200) ═══ */}
      {/* Horizontal arm */}
      <motion.rect
        x="204" y="188" width="64" height="22" rx="5"
        stroke={active === "api" ? "#00f5ff" : "#00f5ff"}
        strokeWidth={active === "api" ? "2" : "1.5"}
        fill="rgba(0,245,255,0.06)"
        filter="url(#hc-glow-c)"
        animate={{ opacity: active === "api" ? [0.9, 1, 0.9] : cyanOpacity }}
        transition={{ duration: 2.1, repeat: Infinity }}
      />
      {/* Vertical arm */}
      <motion.rect
        x="225" y="167" width="22" height="64" rx="5"
        stroke="#00f5ff"
        strokeWidth={active === "api" ? "2" : "1.5"}
        fill="rgba(0,245,255,0.06)"
        filter="url(#hc-glow-c)"
        animate={{ opacity: active === "api" ? [0.9, 1, 0.9] : cyanOpacity }}
        transition={{ duration: 2.1, repeat: Infinity, delay: 0.3 }}
      />

      {/* ═══ LEFT STICK (x=308 y=242) ═══ */}
      <motion.circle
        cx="308" cy="242" r="30"
        stroke="#00f5ff" strokeWidth="1.5"
        fill="rgba(0,245,255,0.04)"
        filter="url(#hc-glow-c)"
        animate={{ opacity: cyanOpacity }}
        transition={{ duration: 3.6, repeat: Infinity }}
      />
      <motion.circle
        cx="308" cy="242" r="13"
        stroke="#00f5ff" strokeWidth="1"
        fill="rgba(0,245,255,0.09)"
        animate={{ opacity: [0.3, 0.65, 0.3] }}
        transition={{ duration: 3.6, repeat: Infinity }}
      />

      {/* ═══ RIGHT STICK (x=462 y=242) ═══ */}
      <motion.circle
        cx="462" cy="242" r="30"
        stroke="#00f5ff" strokeWidth="1.5"
        fill="rgba(0,245,255,0.04)"
        filter="url(#hc-glow-c)"
        animate={{ opacity: cyanOpacity }}
        transition={{ duration: 3.6, repeat: Infinity, delay: 0.6 }}
      />
      <motion.circle
        cx="462" cy="242" r="13"
        stroke="#00f5ff" strokeWidth="1"
        fill="rgba(0,245,255,0.09)"
        animate={{ opacity: [0.3, 0.65, 0.3] }}
        transition={{ duration: 3.6, repeat: Infinity, delay: 0.6 }}
      />

      {/* ═══ FACE BUTTONS (centre ~x=546 y=192) ═══ */}
      {/* △ top */}
      <motion.circle cx="546" cy="163" r="15" stroke="#f0abfc" strokeWidth="1.5" fill="rgba(240,171,252,0.07)" filter="url(#hc-glow-p)"
        animate={{ opacity: active === "storefront" ? [0.9, 1, 0.9] : [0.45, 1, 0.45] }}
        transition={{ duration: 2.3, repeat: Infinity, delay: 0 }} />
      {/* ✕ bottom */}
      <motion.circle cx="546" cy="222" r="15" stroke="#f0abfc" strokeWidth="1.5" fill="rgba(240,171,252,0.07)" filter="url(#hc-glow-p)"
        animate={{ opacity: active === "storefront" ? [0.9, 1, 0.9] : [0.45, 1, 0.45] }}
        transition={{ duration: 2.3, repeat: Infinity, delay: 0.58 }} />
      {/* □ left */}
      <motion.circle cx="518" cy="192" r="15" stroke="#f0abfc" strokeWidth="1.5" fill="rgba(240,171,252,0.07)" filter="url(#hc-glow-p)"
        animate={{ opacity: active === "storefront" ? [0.9, 1, 0.9] : [0.45, 1, 0.45] }}
        transition={{ duration: 2.3, repeat: Infinity, delay: 0.29 }} />
      {/* ○ right */}
      <motion.circle cx="574" cy="192" r="15" stroke="#f0abfc" strokeWidth="1.5" fill="rgba(240,171,252,0.07)" filter="url(#hc-glow-p)"
        animate={{ opacity: active === "storefront" ? [0.9, 1, 0.9] : [0.45, 1, 0.45] }}
        transition={{ duration: 2.3, repeat: Infinity, delay: 0.87 }} />

      {/* ═══ CENTRE / TOUCHPAD ═══ */}
      {/* Touchpad */}
      <motion.rect
        x="350" y="116" width="100" height="64" rx="12"
        stroke={active === "payments" ? "#c084fc" : "#a855f7"}
        strokeWidth={active === "payments" ? "2" : "1.5"}
        fill="rgba(168,85,247,0.07)"
        filter="url(#hc-glow-p)"
        animate={{ opacity: active === "payments" ? [0.9, 1, 0.9] : purpleOpacity }}
        transition={{ duration: 3.8, repeat: Infinity }}
      />
      {/* Home button */}
      <motion.circle cx="400" cy="195" r="18"
        stroke={active === "payments" ? "#c084fc" : "#a855f7"}
        strokeWidth={active === "payments" ? "2" : "1.5"}
        fill="rgba(168,85,247,0.09)"
        animate={{
          opacity: active === "payments" ? [0.9, 1, 0.9] : purpleOpacity,
          scale: [1, 1.04, 1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      {/* Share */}
      <motion.circle cx="360" cy="190" r="9" stroke="#a855f7" strokeWidth="1" fill="rgba(168,85,247,0.06)"
        animate={{ opacity: [0.28, 0.68, 0.28] }} transition={{ duration: 3.1, repeat: Infinity }} />
      {/* Options */}
      <motion.circle cx="440" cy="190" r="9" stroke="#a855f7" strokeWidth="1" fill="rgba(168,85,247,0.06)"
        animate={{ opacity: [0.28, 0.68, 0.28] }} transition={{ duration: 3.1, repeat: Infinity, delay: 0.5 }} />

      {/* ═══ HOLOGRAPHIC SCAN LINES ═══ */}
      {[88, 122, 156, 190, 224, 258, 292].map((y, i) => (
        <motion.line
          key={`sl-${i}`}
          x1="162" y1={y} x2="638" y2={y}
          stroke="#00f5ff" strokeWidth="0.4"
          animate={{ opacity: [0, 0.11, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.24 }}
        />
      ))}

      {/* ═══ AMBIENT GRID DOTS ═══ */}
      {([
        [400, 28], [295, 26], [505, 26],
        [160, 400], [400, 424], [640, 400],
        [240, 420], [560, 420],
      ] as [number, number][]).map(([cx, cy], i) => (
        <motion.circle
          key={`gd-${i}`}
          cx={cx} cy={cy} r="1.8"
          fill="#00f5ff"
          animate={{ opacity: [0, 0.45, 0], scale: [0.5, 1.6, 0.5] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.38 }}
        />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Main exported section
───────────────────────────────────────────── */
export default function HolographicControllerSection() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="relative py-20 md:py-28 border-b border-[var(--border)] overflow-hidden bg-[var(--background)]">

      {/* Ambient radial glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[420px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(0,245,255,0.055) 0%, rgba(168,85,247,0.04) 45%, transparent 72%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-10">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 mb-5">
            <FiZap size={10} className="text-[var(--accent)]" />
            <span className="text-[9px] font-black uppercase tracking-[0.35em] text-[var(--accent)]">
              Platform Preview
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-[1000] tracking-tighter uppercase italic leading-[1.05] mb-3">
            Everything Wired
            <br />
            <span className="text-[var(--accent)]">Into One Platform</span>
          </h2>
          <p className="text-sm text-[var(--muted)] opacity-60">
            Hover the glowing spots to explore your store's features
          </p>
        </motion.div>

        {/* ── Controller + Hotspots ── */}
        <motion.div
          className="relative w-full max-w-3xl mx-auto select-none"
          style={{ aspectRatio: "16/9" }}
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Float + tilt animation wrapper */}
          <motion.div
            className="w-full h-full"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="w-full h-full"
              animate={{ rotateY: [0, 5, 0, -5, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
            >
              <ControllerSVG active={active} />
            </motion.div>
          </motion.div>

          {/* Hotspot markers — absolutely positioned over the SVG container */}
          {HOTSPOTS.map((h, i) => (
            <HotspotMarker
              key={h.id}
              h={h}
              index={i}
              isActive={active === h.id}
              onEnter={() => setActive(h.id)}
              onLeave={() => setActive(null)}
            />
          ))}
        </motion.div>

        {/* ── Bottom pill labels ── */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.55 }}
        >
          {HOTSPOTS.map((h) => (
            <motion.button
              key={h.id}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all duration-200"
              style={{
                borderColor: active === h.id ? h.color : `${h.color}35`,
                backgroundColor: active === h.id ? `${h.color}18` : `${h.color}08`,
                color: h.color,
                boxShadow: active === h.id ? `0 0 14px ${h.color}30` : "none",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onMouseEnter={() => setActive(h.id)}
              onMouseLeave={() => setActive(null)}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: h.color }} />
              {h.label}
            </motion.button>
          ))}

          <Link
            href="/services"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--foreground)] text-[var(--background)] text-[10px] font-black uppercase tracking-widest italic hover:opacity-85 transition-all"
          >
            All Services <FiArrowUpRight size={12} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
