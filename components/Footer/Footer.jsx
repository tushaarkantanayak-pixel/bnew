"use client";

import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import {
  FiInstagram,
  FiTwitter,
  FiLinkedin,
  FiShield,
  FiExternalLink
} from "react-icons/fi";

const BRAND_NAME = "bluebuff.in";
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
      { label: "About Us", href: "/about" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Support", href: "/dashboard/support" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/bluebuff.in", icon: FiInstagram },
  { label: "Twitter", href: "https://x.com/tk_dev_", icon: FiTwitter },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/bluebuffesports", icon: FiLinkedin },
];

export default function Footer() {
  return (
    <footer className="relative mt-12 bg-[var(--background)] border-t border-[var(--border)] pt-12 pb-8 overflow-hidden">
      {/* Ambient Lighting Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent" />
      <div className="absolute bottom-0 left-[10%] w-[30%] h-[120px] bg-[var(--accent)]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl w-full px-4 sm:px-6 md:px-10 lg:px-12 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-10">

          {/* BRAND BLOCK */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="group inline-block">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight italic uppercase text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                bluebuff<span className="text-[var(--accent)]">.in</span>
              </h2>
            </Link>
            <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed max-w-sm">
              Your premium hub for automated game top-ups, API keys, and digital gaming assets.
            </p>

            {/* Trustpilot Card */}
            <a
              href={TRUSTPILOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3.5 p-3 rounded-2xl bg-[var(--card)]/50 backdrop-blur-sm border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all group"
            >
              <div className="bg-white p-1.5 rounded-lg shadow-sm group-hover:scale-105 transition-transform">
                <QRCodeCanvas
                  value={TRUSTPILOT_URL}
                  size={40}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="Q"
                />
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-[var(--accent)] mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FiShield key={i} size={11} fill="currentColor" />
                  ))}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors flex items-center gap-1">
                  TRUSTED ON TRUSTPILOT <FiExternalLink size={10} className="opacity-60" />
                </p>
              </div>
            </a>
          </div>

          {/* LINKS GRID */}
          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            {FOOTER_LINKS.map((section) => (
              <div key={section.title} className="space-y-3.5">
                <h3 className="text-xs font-black uppercase tracking-[0.15em] text-[var(--accent)]">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-xs sm:text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors block py-0.5"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* FIND US */}
          <div className="md:col-span-2 space-y-3.5">
            <h3 className="text-xs font-black uppercase tracking-[0.15em] text-[var(--accent)]">
              Find Us
            </h3>
            <div className="flex items-center gap-2.5">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/50 transition-all hover:scale-105 active:scale-95 shadow-sm"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* COPYRIGHT SUB-STRIP */}
        <div className="pt-6 border-t border-[var(--border)]/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--muted)]">
          <p className="font-medium text-center sm:text-left">
            © {new Date().getFullYear()} <span className="font-bold text-[var(--foreground)]">bluebuff.in</span>. All rights reserved.
          </p>
          <p className="text-[11px] text-[var(--muted)]/80 text-center sm:text-right">
            Automated Game Top-Ups & Digital Assets
          </p>
        </div>
      </div>
    </footer>
  );
}
