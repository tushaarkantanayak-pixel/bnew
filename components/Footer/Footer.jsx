"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import {
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiHeart,
  FiChevronUp,
  FiShield,
  FiExternalLink
} from "react-icons/fi";

const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || "Blue Buff";
const TRUSTPILOT_URL = "https://www.trustpilot.com/evaluate/bluebuff.in";

const FOOTER_LINKS = [
  {
    title: "Main Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Store", href: "/games" },
      { label: "Services", href: "/services" },

      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Auto Top-Ups", href: "/dashboard/digital-gametopup" },
      { label: "Rewards", href: "/dashboard/earning" },
      { label: "API Keys", href: "/dashboard/digital-gametopup/api-keys" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "About", href: "/about" },
      { label: "Privacy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms-and-conditions" },
      { label: "Support", href: "/dashboard/support" },
      { label: "Refunds", href: "/refund-policy" },
    ],
  },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/bluebuff.in", icon: FiInstagram },
  { label: "Twitter", href: "https://x.com/tk_dev_", icon: FiTwitter },
  { label: "YouTube", href: "https://youtube.com", icon: FiYoutube },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative mt-8 bg-[var(--background)] border-t border-[var(--border)] pt-12 pb-6 overflow-hidden">
      {/* Subtle Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />
      <div className="absolute bottom-0 left-[10%] w-[30%] h-[100px] bg-[var(--accent)]/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">

          {/* BRAND BLOCK - REFINED SPACE */}
          <div className="md:col-span-3 space-y-6">
            <Link href="/" className="group block">
              <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase leading-none bg-gradient-to-r from-[var(--accent)] via-[var(--foreground)] to-[var(--accent)] bg-clip-text text-transparent group-hover:brightness-110 transition-all">
                {BRAND}
              </h2>
              <p className="mt-3 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--foreground)] italic leading-relaxed max-w-[260px]">
                THE FASTEST AND CHEAPEST GAME TOP-UPS IN INDIA.
              </p>
            </Link>

            {/* Trustpillot Card - Compact High-End */}
            <a
              href={TRUSTPILOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-[1.02] hover:translate-x-1 flex items-center gap-4 p-3.5 rounded-2xl bg-[var(--card)]/30 backdrop-blur-sm border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all border-dashed group"
            >
              <div className="bg-white p-1 rounded-lg shadow-sm group-hover:rotate-2 transition-transform">
                <QRCodeCanvas
                  value={TRUSTPILOT_URL}
                  size={42}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="Q"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-0.5 text-[var(--accent)] mb-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FiShield key={i} size={9} fill="currentColor" />
                  ))}
                </div>
                <p className="text-[7px] font-black uppercase tracking-widest text-[var(--muted)]">
                  TRUSTED ON TRUSTPILOT <FiExternalLink className="inline mb-0.5 opacity-30" size={8} />
                </p>
              </div>
            </a>
          </div>

          {/* LINKS GRID - SYMMETRICAL */}
          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 gap-y-8 gap-x-4">
            {FOOTER_LINKS.map((section) => (
              <div key={section.title} className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-[1px] bg-[var(--accent)]/40 rounded-full" />
                  <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--accent)]/80 italic">
                    {section.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[10px] sm:text-[11px] font-bold uppercase italic tracking-wider text-[var(--muted)] hover:text-[var(--accent)] transition-all leading-none block hover:translate-x-1"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Mobile-only Find Us (fills the 4th grid slot next to Legal) */}
            <div className="md:hidden space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-[1px] bg-[var(--accent)]/40 rounded-full" />
                <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--accent)]/80 italic">
                  Find Us
                </h3>
              </div>
              <div className="flex items-center gap-2.5">
                {SOCIALS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="hover:-translate-y-[3px] hover:scale-110 active:scale-90 w-9 h-9 rounded-xl bg-[var(--card)]/40 backdrop-blur-sm border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-all shadow-sm"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* FIND US & ACTION BLOCK (Desktop) / ACTION BLOCK ONLY (Mobile) */}
          <div className="md:col-span-3 flex flex-col md:items-end gap-8 mt-4 md:mt-0">
            <div className="hidden md:block space-y-4 md:text-right">
              <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--accent)]/80 italic">
                Find Us
              </h3>
              <div className="flex items-center justify-start md:justify-end gap-2.5">
                {SOCIALS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="hover:-translate-y-[3px] hover:scale-110 active:scale-90 w-9 h-9 rounded-xl bg-[var(--card)]/40 backdrop-blur-sm border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-all shadow-sm"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-auto group flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-[var(--muted)] hover:text-[var(--accent)] transition-all italic"
            >
              Back to Top
              <div className="w-8 h-8 rounded-xl bg-[var(--card)]/40 border border-[var(--border)] flex items-center justify-center shadow-md group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all">
                <FiChevronUp size={16} />
              </div>
            </button>
          </div>
        </div>

        {/* BOTTOM STRIP - HIGH-END DENSITY */}
        <div className="pt-6 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-5 text-[var(--muted-foreground)]">
          <div className="flex items-center gap-3 group/india cursor-default">
            <div className="flex gap-1">
              <div className="w-1 h-3 bg-[#FF9933] rounded-full shadow-[0_0_8px_#FF9933]" />
              <div className="w-1 h-3 bg-white rounded-full shadow-[0_0_8px_white]" />
              <div className="w-1 h-3 bg-[#138808] rounded-full shadow-[0_0_8px_#138808]" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.15em] italic text-[var(--foreground)]">
              MADE IN INDIA 🇮🇳
            </span>
          </div>

          <div className="flex items-center gap-8 text-[8px] font-black uppercase tracking-[0.1em] italic">
            <span className="tracking-[0.3em]">24/7 AUTOMATED</span>
          </div>
        </div>

        {/* COPYRIGHT SUB-STRIP */}
        <div className="mt-6 text-center opacity-20">
          <span className="text-[8px] font-black uppercase tracking-[0.2em] italic">
            © {new Date().getFullYear()} {BRAND.toUpperCase()} • ALL RIGHTS RESERVED
          </span>
        </div>
      </div>
    </footer>
  );
}
