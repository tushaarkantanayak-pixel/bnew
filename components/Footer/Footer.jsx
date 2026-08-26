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
    title: "Links",
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
    <footer className="relative mt-8 bg-[var(--background)] border-t border-[var(--border)] pt-8 pb-6 overflow-hidden">
      {/* Accent top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent" />

      <div className="max-w-7xl w-full px-4 sm:px-6 md:px-10 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-6">

          {/* BRAND & TRUSTPILOT BLOCK */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Link href="/" className="group inline-block">
                <h2 className="text-2xl sm:text-3xl font-[1000] tracking-tight italic uppercase text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  bluebuff<span className="text-[var(--accent)]">.in</span>
                </h2>
              </Link>

              {/* Social icons inline on mobile/desktop */}
              <div className="flex items-center gap-1.5 md:hidden">
                {SOCIALS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-7 h-7 rounded-lg bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
                  >
                    <Icon size={13} />
                  </a>
                ))}
              </div>
            </div>

            <p className="text-xs text-[var(--muted)] leading-relaxed max-w-sm">
              Automated game top-ups, developer APIs, and digital gaming assets.
            </p>

            {/* Compact Trustpilot Badge */}
            <div className="flex items-center gap-3 pt-0.5">
              <a
                href={TRUSTPILOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl bg-[var(--card)]/60 border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all group"
              >
                <div className="bg-white p-1 rounded-md shadow-xs flex-shrink-0">
                  <QRCodeCanvas
                    value={TRUSTPILOT_URL}
                    size={28}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="Q"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-0.5 text-[var(--accent)]">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <FiShield key={i} size={9} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-[9px] font-black uppercase tracking-wider text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors flex items-center gap-1 mt-0.5">
                    Trustpilot <FiExternalLink size={9} className="opacity-50" />
                  </p>
                </div>
              </a>

              {/* Social icons on desktop */}
              <div className="hidden md:flex items-center gap-1.5 ml-2">
                {SOCIALS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-7 h-7 rounded-lg bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all hover:scale-105"
                  >
                    <Icon size={13} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* COMPACT LINKS GRID (3 Columns side-by-side) */}
          <div className="md:col-span-7 grid grid-cols-3 gap-3 sm:gap-6 pt-1">
            {FOOTER_LINKS.map((section) => (
              <div key={section.title} className="space-y-2">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--accent)]">
                  {section.title}
                </h3>
                <ul className="space-y-1.5">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-xs font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors block truncate"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* COPYRIGHT SUB-STRIP (Super Compact) */}
        <div className="pt-4 border-t border-[var(--border)]/50 flex flex-row items-center justify-between text-[11px] text-[var(--muted)]">
          <p className="font-medium truncate">
            © {new Date().getFullYear()} <span className="font-bold text-[var(--foreground)]">bluebuff.in</span>
          </p>
          <p className="text-[10px] text-[var(--muted)]/80">
            Automated Ecosystem
          </p>
        </div>
      </div>
    </footer>
  );
}
