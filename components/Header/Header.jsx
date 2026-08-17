"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { formatPrice } from "@/utils/currency";
import { useAuthStore } from "../../store/useAuthStore";

import {
  FiChevronRight, FiLogOut, FiCheckCircle, FiZap, FiX,
  FiLayers, FiGrid, FiShoppingBag, FiMessageSquare, FiUser,
  FiGlobe, FiExternalLink, FiCreditCard
} from "react-icons/fi";

/* ================= CONFIG ================= */
const HEADER_CONFIG = {
  logo: {
    src: "/logoBB.png",
    alt: "Blue Buff",
    width: 140,
    height: 40,
  },

  nav: [
    { label: "Top-Up", href: "/games", icon: FiShoppingBag, color: "#a855f7" },
    { label: "News", href: "/blog", icon: FiLayers, color: "#f43f5e" },
    { label: "Services", href: "/services", icon: FiGrid, color: "#10b981" },
    { label: "Products", href: "/ourproducts", icon: FiGlobe, color: "#00f5ff" },
  ],
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("/");

  const { userDetails, walletBalance, isAuthenticated, logout, fetchUser } = useAuthStore();

  const user = isAuthenticated ? {
    name: userDetails.name,
    email: userDetails.email,
    userId: userDetails.userId,
    userType: userDetails.userType,
    avatar: typeof window !== "undefined" ? localStorage.getItem("avatar") : "",
  } : null;

  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const [showLogoutToast, setShowLogoutToast] = useState(false);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setShowLogoutToast(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  /* ================= SCROLL ================= */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= OUTSIDE CLICK ================= */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Lock scroll when menu open */
  useEffect(() => {
    if (userMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [userMenuOpen]);

  return (
    <header
      className={`fixed top-0 w-full transition-all duration-500 ${scrolled
        ? "backdrop-blur-3xl bg-[var(--background)]/80 border-b border-[var(--border)] active-header"
        : "bg-transparent"
        }`}
      style={{ zIndex: userMenuOpen ? 2147483647 : 1000 }}
    >
      <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`} />

      <div className="max-w-screen-2xl mx-auto w-full px-4 sm:px-6 md:px-10">
        <div className="flex items-center justify-between h-14 md:h-16">

          {/* Logo */}
          <div className="flex-1 flex items-center justify-start">
            <Link href="/" className="relative z-10 flex-shrink-0">
              <div className="hover:scale-105 active:scale-95 transition-transform">
                <Image
                  src={HEADER_CONFIG.logo.src}
                  alt={HEADER_CONFIG.logo.alt}
                  width={HEADER_CONFIG.logo.width}
                  height={HEADER_CONFIG.logo.height}
                  priority
                  className="h-8 md:h-10 w-auto transition-all duration-300"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1 justify-center flex-shrink-0">
            {HEADER_CONFIG.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setActiveNav(item.href)}
                className="relative px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] italic text-[var(--muted)] hover:text-[var(--accent)] transition-all group flex items-center gap-2"
              >
                <span className="relative z-10 opacity-70 group-hover:opacity-100 transition-all">
                  <item.icon size={14} />
                </span>
                <span className="relative z-10">{item.label}</span>
                <motion.span
                  initial={false}
                  animate={{ width: activeNav === item.href ? "100%" : "0%" }}
                  className="absolute bottom-0 left-0 h-[2px] bg-[var(--accent)] transition-all duration-300"
                />
              </Link>
            ))}
          </nav>

          {/* Actions & Menu Button */}
          <div className="flex-1 flex items-center justify-end gap-2 sm:gap-3" ref={dropdownRef}>
            <ThemeToggle />
            <button
              onClick={() => setUserMenuOpen((p) => !p)}
              aria-label="User menu"
              className="hover:scale-105 active:scale-95 relative flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full border border-[var(--border)] bg-[var(--card)]/50 hover:bg-[var(--foreground)]/5 backdrop-blur-md transition-all duration-300 group"
            >
              <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center bg-[var(--accent)]/10">
                {user?.avatar ? (
                  <Image src={user.avatar} alt="Avatar" width={28} height={28} className="object-cover w-full h-full" />
                ) : (
                  <FiUser className="text-[var(--accent)] text-xs" />
                )}
              </div>
              <FiChevronRight className="text-[var(--foreground)]/70 group-hover:text-[var(--foreground)] transition-colors" size={14} />
            </button>

            {/* SIDEBAR DRAWER - POLISHED TOP BUTTONS GRID */}
            <AnimatePresence>
              {userMenuOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setUserMenuOpen(false)}
                    className="fixed inset-0 bg-black/80 z-[2147483646]"
                  />

                  {/* Slide-out Drawer */}
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed right-0 top-0 h-[100dvh] w-[85%] max-w-[360px] z-[2147483647] flex flex-col overflow-hidden bg-[var(--background)] border-l border-[var(--border)]"
                  >
                    {/* 1. PROFILE HEADER */}
                    <div className="relative z-10 px-5 pt-5 pb-4 border-b border-[var(--border)]">
                      <div className="flex items-start justify-between gap-3">
                        {user ? (
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--accent)]/10 flex items-center justify-center text-white text-xl font-black flex-shrink-0">
                              {user?.avatar ? (
                                <Image src={user.avatar} alt="Avatar" width={48} height={48} className="object-cover w-full h-full" />
                              ) : (
                                user.name?.charAt(0) || "U"
                              )}
                            </div>

                            <div className="flex flex-col min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-[15px] font-black text-[var(--foreground)] truncate max-w-[130px] leading-tight">{user.name}</span>
                                <span className="text-[7px] font-black uppercase tracking-wider text-white bg-[var(--accent)] px-1.5 py-0.5 rounded-full flex-shrink-0">{user.userType || "User"}</span>
                              </div>
                              <span className="text-[10px] text-[var(--muted)] truncate max-w-[160px]">{user.email}</span>

                              {/* Wallet Chip */}
                              <div className="flex items-center gap-1 mt-1.5">
                                <span className="text-[9px] font-black text-[var(--accent)] bg-[var(--accent)]/10 border border-[var(--accent)]/20 px-2 py-0.5 rounded-full">
                                  💰 {formatPrice(walletBalance)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                              <FiUser size={22} />
                            </div>
                            <div>
                              <p className="text-sm font-black text-[var(--foreground)]">Guest User</p>
                              <p className="text-[10px] text-[var(--muted)]">Sign in to continue</p>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-1 flex-shrink-0">
                          {user && (
                            <button
                              onClick={handleLogout}
                              className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors"
                              title="Logout"
                            >
                              <FiLogOut size={15} />
                            </button>
                          )}
                          <button
                            onClick={() => setUserMenuOpen(false)}
                            className="w-8 h-8 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                          >
                            <FiX size={18} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Guest Login Callout */}
                    {!user && (
                      <div className="p-4 border-b border-[var(--border)]">
                        <Link
                          href="/login"
                          onClick={() => setUserMenuOpen(false)}
                          className="w-full py-2.5 rounded-xl bg-[var(--accent)] !text-black text-center text-[10px] font-black uppercase italic tracking-widest hover:brightness-110 transition-all block"
                        >
                          Sign In / Register
                        </Link>
                      </div>
                    )}

                    {/* SCROLLABLE BODY */}
                    <div className="relative z-10 flex-1 overflow-y-auto px-4 pt-4 pb-3 space-y-4 custom-scrollbar">

                      {/* 2. REFINED & BEAUTIFIED TOP 4 NAV BUTTONS GRID */}
                      <div className="grid grid-cols-4 gap-2">
                        {HEADER_CONFIG.nav.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setUserMenuOpen(false)}
                            className="flex flex-col items-center justify-center p-2.5 rounded-2xl border border-[var(--border)] bg-[var(--card)]/50 hover:bg-[var(--card)] hover:border-[var(--accent)]/40 hover:scale-[1.03] active:scale-95 transition-all duration-200 text-center group"
                          >
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110"
                              style={{ background: `${item.color}15`, color: item.color }}
                            >
                              <item.icon size={18} />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-wider text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors truncate max-w-full">
                              {item.label}
                            </span>
                          </Link>
                        ))}
                      </div>

                      {/* 3. MAIN SECTION */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 px-1 py-1">
                          <div className="w-1 h-3.5 bg-pink-500 rounded-full" />
                          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--muted)]">MAIN</span>
                        </div>

                        <Link
                          href={user ? "/dashboard" : "/login"}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center justify-between p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--card)]/40 hover:border-[var(--accent)]/30 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center flex-shrink-0">
                              <FiGrid size={16} />
                            </div>
                            <div>
                              <p className="text-xs font-black text-[var(--foreground)] leading-tight">Dashboard</p>
                              <p className="text-[9px] text-[var(--muted)] leading-tight">Go to Dashboard</p>
                            </div>
                          </div>
                          <FiChevronRight size={14} className="text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      </div>

                      {/* 4. SUPPORT SECTION */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 px-1 py-1">
                          <div className="w-1 h-3.5 bg-emerald-500 rounded-full" />
                          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--muted)]">SUPPORT</span>
                        </div>

                        <Link
                          href="/dashboard/support"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center justify-between p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--card)]/40 hover:border-emerald-500/30 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0">
                              <FiMessageSquare size={16} />
                            </div>
                            <div>
                              <p className="text-xs font-black text-[var(--foreground)] leading-tight">Help Center</p>
                              <p className="text-[9px] text-[var(--muted)] leading-tight">Get help 24/7</p>
                            </div>
                          </div>
                          <FiChevronRight size={14} className="text-[var(--muted)] group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      </div>

                      {/* 5. ADMIN CONSOLE — ONLY FOR OWNER */}
                      {user?.userType === "owner" && (
                        <div className="relative mt-2">
                          <Link
                            href="/owner-panal"
                            onClick={() => setUserMenuOpen(false)}
                            className="relative flex items-center justify-between p-3.5 bg-[var(--card)]/60 border border-[var(--border)] hover:border-[var(--accent)] rounded-2xl transition-all duration-300"
                          >
                            <div className="flex items-center gap-3 relative z-10 w-full">
                              <div className="relative flex-shrink-0">
                                <div className="w-9 h-9 rounded-xl bg-[var(--accent)] text-black flex items-center justify-center">
                                  <FiZap size={16} />
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                                  <div className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-[var(--background)]"></div>
                                </div>
                              </div>
                              <div className="flex flex-col min-w-0 flex-1">
                                <h4 className="text-xs font-black uppercase tracking-widest text-[var(--foreground)] mb-0.5">ADMIN CONSOLE</h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-bold text-[var(--accent)] bg-[var(--accent)]/10 px-1.5 py-0.5 rounded-md border border-[var(--accent)]/20 uppercase">OWNER</span>
                                  <span className="text-[9px] font-bold text-[#22c55e] flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-[#22c55e]"></span>Active</span>
                                </div>
                              </div>
                              <div className="w-8 h-8 rounded-full bg-[var(--foreground)]/5 group-hover:bg-[var(--accent)]/10 flex items-center justify-center text-[var(--muted)] group-hover:text-[var(--accent)] transition-all flex-shrink-0">
                                <FiChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                              </div>
                            </div>
                          </Link>
                        </div>
                      )}

                    </div>

                    {/* 6. FIXED BOTTOM PRODUCT TICKER */}
                    <div className="relative z-10 border-t border-[var(--border)] bg-[var(--card)]/20 overflow-hidden flex-shrink-0">
                      <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 18 }}
                        className="flex gap-2 p-2.5 w-max"
                      >
                        {[...Array(2)].map((_, i) => (
                          <div key={i} className="flex gap-2">
                            {[
                              { href: "https://web.bluebuff.in", label: "web.bluebuff.in", sub: "LINK IN BIO", icon: <FiGlobe size={11} />, color: "#db2777" },
                              { href: "https://xyzpay.site", label: "xyzpay.site", sub: "PAYMENT GATEWAY", icon: <FiCreditCard size={11} />, color: "#4f46e5" },
                              { href: "https://games.bluebuff.in", label: "games.bluebuff.in", sub: "FOR GAMES", icon: <FiGlobe size={11} />, color: "#059669" },
                              { href: "https://api.bluebuff.in", label: "api.bluebuff.in", sub: "API ENGINE", icon: <FiZap size={11} />, color: "#f59e0b" },
                              { href: "https://cryptopay.bluebuff.in", label: "cryptopay.bluebuff.in", sub: "CRYPTO PAY", icon: <FiCreditCard size={11} />, color: "#6366f1" },
                              { href: "https://stalkerweb.bluebuff.in", label: "stalkerweb.bluebuff.in", sub: "WEB MONITOR", icon: <FiGlobe size={11} />, color: "#06b6d4" },
                            ].map((link) => (
                              <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--card)]/40 hover:border-[var(--accent)]/30 transition-all min-w-[150px]"
                              >
                                <div className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${link.color}20`, color: link.color }}>
                                  {link.icon}
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[10px] font-black text-[var(--foreground)] leading-tight">{link.label}</span>
                                  <span className="text-[7px] text-[var(--muted)] font-bold uppercase tracking-widest">{link.sub}</span>
                                </div>
                                <FiExternalLink size={10} className="text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors ml-auto flex-shrink-0" />
                              </a>
                            ))}
                          </div>
                        ))}
                      </motion.div>
                    </div>

                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showLogoutToast && (
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[2000]">
            <div className="px-6 py-3 rounded-full bg-[var(--card)] border border-green-500/20 flex items-center gap-3 border">
              <FiCheckCircle className="text-green-500" size={18} />
              <span className="text-xs font-bold text-[var(--foreground)]">Logout Successful</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
