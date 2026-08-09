"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { formatPrice } from "@/utils/currency";
import { useAuthStore } from "../../store/useAuthStore";

import { FiChevronRight, FiLogOut, FiCheckCircle, FiShield, FiZap, FiMenu, FiX, FiLayers, FiCompass, FiGrid, FiShoppingBag, FiMessageSquare, FiUser, FiBell, FiUsers, FiKey, FiGift, FiGlobe, FiBarChart2, FiExternalLink, FiCreditCard } from "react-icons/fi";

/* ================= CONFIG ================= */
const HEADER_CONFIG = {
  logo: {
    src: "/logoBB.png",
    alt: "Blue Buff",
    width: 140,
    height: 40,
  },

  nav: [
    { label: "Top-Up", href: "/games", icon: <FiShoppingBag size={14} />, color: "#a855f7" }, // Purple
    { label: "News", href: "/blog", icon: <FiLayers size={14} />, color: "#f43f5e" }, // Rose
    { label: "Services", href: "/services", icon: <FiGrid size={14} />, color: "#10b981" }, // Emerald
    { label: "Products", href: "/ourproducts", icon: <FiGrid size={14} />, color: "#00f5ff" }, // Cyan
  ],

    userMenu: {
    sections: [
      {
        title: "Main",
        color: "#e879f9", // Fuchsia
        items: [
          { label: "Dashboard", href: "/dashboard", icon: <FiGrid size={14} />, desc: "Go to Dashboard", color: "#e879f9" },
        ]
      },
      {
        title: "Support",
        color: "#10b981", // Emerald
        items: [
          { label: "Help Center", href: "/dashboard/support", icon: <FiMessageSquare size={14} />, desc: "Get help 24/7", color: "#10b981" },
        ]
      }
    ],
    roles: {
      owner: { label: "Admin Console", href: "/owner-panal", icon: <FiZap size={14} /> },
    },
  },
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("/");
  const [expandedSections, setExpandedSections] = useState(() => 
    HEADER_CONFIG.userMenu.sections.reduce((acc, sec) => ({ 
      ...acc, 
      [sec.title]: true
    }), {})
  );

  const toggleSection = (title) => {
    setExpandedSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const { userDetails, walletBalance, isAuthenticated, token, logout, fetchUser } = useAuthStore();
  
  // Map useAuthStore state to the legacy `user` variable expected by Header.jsx
  const user = isAuthenticated ? {
    name: userDetails.name,
    email: userDetails.email,
    userId: userDetails.userId,
    userType: userDetails.userType,
    avatar: typeof window !== "undefined" ? localStorage.getItem("avatar") : "",
  } : null;

  const loading = false; // Handled smoothly by Zustand now

  const dropdownRef = useRef(null);


  /* ================= AUTH ================= */
  useEffect(() => {
    // Rely on global Zustand store for authentication.
    fetchUser();
  }, [fetchUser]);

  const [showLogoutToast, setShowLogoutToast] = useState(false);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setShowLogoutToast(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
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

  // Prevent background scroll when drawer is open
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
        ? "backdrop-blur-3xl bg-[var(--background)]/80 shadow-2xl border-b border-[var(--border)] active-header"
        : "bg-transparent"
        }`}
      style={{ zIndex: userMenuOpen ? 2147483647 : 1000 }}
    >
      <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`} />

      <div className="max-w-screen-2xl mx-auto w-full px-5 md:px-10">
        <div className="flex items-center justify-between h-14 md:h-16">

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

          <nav className="hidden xl:flex items-center space-x-0.5 justify-center flex-shrink-0">
            {HEADER_CONFIG.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setActiveNav(item.href)}
                className="relative px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] italic text-[var(--muted)] hover:text-[var(--accent)] transition-all group flex items-center gap-2"
              >
                <span className="relative z-10 opacity-70 group-hover:opacity-100 transition-all">{item.icon}</span>
                <span className="relative z-10">{item.label}</span>
                <motion.span
                  initial={false}
                  animate={{ width: activeNav === item.href ? "100%" : "0%" }}
                  className="absolute bottom-0 left-0 h-[2px] bg-[var(--accent)] shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)] transition-all duration-300"
                />
                <div className="absolute inset-0 bg-[var(--accent)]/0 group-hover:bg-[var(--accent)]/5 transition-colors duration-300" />
              </Link>
            ))}
          </nav>

          <div className="flex-1 flex items-center justify-end gap-2 sm:gap-3" ref={dropdownRef}>
            <ThemeToggle />
            <button
              onClick={() => setUserMenuOpen((p) => !p)}
              aria-label="User menu"
              className="hover:scale-105 active:scale-95 relative flex items-center gap-1 pl-1 pr-2 py-1 rounded-full border border-[var(--border)] bg-[var(--card)]/50 hover:bg-[var(--foreground)]/5 backdrop-blur-md transition-all duration-300 shadow-sm group"
            >
              <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center bg-[var(--accent)]/10 shadow-inner">
                {user?.avatar ? (
                  <Image src={user.avatar} alt="Avatar" width={28} height={28} className="object-cover w-full h-full" />
                ) : (
                  <FiUser className="text-[var(--accent)] text-xs" />
                )}
              </div>
              <FiChevronRight className="text-[var(--foreground)]/70 group-hover:text-[var(--foreground)] transition-colors" size={14} />
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setUserMenuOpen(false)}
                    className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[2147483646] !pointer-events-auto"
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
                  />

                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed right-0 top-0 h-[100dvh] w-[85%] max-w-[360px] z-[2147483647] flex flex-col overflow-hidden"
                    style={{ background: 'var(--background)' }}
                  >
                    {/* Ambient glow */}
                    <div className="absolute inset-0 bg-[var(--background)] pointer-events-none" />
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--accent)] opacity-[0.07] blur-[80px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent pointer-events-none" />

                    {/* ── PROFILE HEADER ── */}
                    <div className="relative z-10 px-5 pt-5 pb-4 border-b border-[var(--foreground)]/6">
                      <div className="flex items-start justify-between gap-3">
                        {user ? (
                          <div className="flex items-center gap-3 min-w-0">
                            {/* Avatar with accent ring */}
                            <div className="relative flex-shrink-0">
                              <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-[var(--accent)] to-purple-600 opacity-60 blur-[2px]" />
                              <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-[var(--background)]">
                                {user?.avatar ? (
                                  <Image src={user.avatar} alt="Avatar" width={48} height={48} className="object-cover w-full h-full" />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-[var(--accent)] to-purple-700 flex items-center justify-center text-white text-xl font-black">{user.name?.charAt(0)}</div>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-[15px] font-black text-[var(--foreground)] truncate max-w-[130px] leading-tight">{user.name}</span>
                                <span className="text-[7px] font-black uppercase tracking-wider text-white bg-[var(--accent)] px-1.5 py-0.5 rounded-full">{user.userType || "User"}</span>
                              </div>
                              <span className="text-[10px] text-[var(--muted)]/60 truncate max-w-[160px]">{user.email}</span>
                              {/* Wallet chip */}
                              <div className="flex items-center gap-1 mt-1.5">
                                <span className="text-[9px] font-black text-[var(--accent)] bg-[var(--accent)]/10 border border-[var(--accent)]/20 px-2 py-0.5 rounded-full">
                                  💰 {formatPrice(walletBalance)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
                              <FiUser size={22} />
                            </div>
                            <div>
                              <p className="text-sm font-black text-[var(--foreground)]">Guest</p>
                              <p className="text-[10px] text-[var(--muted)]/60">Sign in to continue</p>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {user && (
                            <button onClick={handleLogout} className="w-8 h-8 rounded-xl hover:bg-red-500/10 flex items-center justify-center text-red-400 transition-colors" title="Logout">
                              <FiLogOut size={15} />
                            </button>
                          )}
                          <button onClick={() => setUserMenuOpen(false)} className="w-8 h-8 rounded-xl hover:bg-[var(--foreground)]/8 flex items-center justify-center text-[var(--muted)] transition-colors">
                            <FiX size={18} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 flex-1 overflow-y-auto px-4 pt-4 pb-3 space-y-4 custom-scrollbar">

                      {/* Login Banner for guests */}
                      {!user && (
                        <div className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-[var(--accent)]/10 to-purple-600/5 border border-[var(--accent)]/20">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-[var(--accent)] flex items-center justify-center"><FiZap size={13} className="text-white" /></div>
                            <span className="text-[11px] font-bold text-[var(--foreground)]">Sign in for full access</span>
                          </div>
                          <Link href="/login" onClick={() => setUserMenuOpen(false)} className="px-3 py-1.5 rounded-lg bg-[var(--accent)] text-white text-[9px] font-black uppercase tracking-widest hover:brightness-110 transition-all flex-shrink-0">Login</Link>
                        </div>
                      )}

                      {/* Nav Quick Links */}
                      <div className="grid grid-cols-4 gap-2">
                        {HEADER_CONFIG.nav.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setUserMenuOpen(false)}
                            className="relative flex flex-col items-center justify-center py-3 px-1 rounded-2xl border border-[var(--foreground)]/8 bg-[var(--foreground)]/[0.04] hover:border-[var(--accent)]/40 transition-all duration-200 group overflow-hidden"
                          >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" style={{ background: `${item.color}10` }} />
                            <span className="mb-1.5 transition-colors" style={{ color: item.color }}>
                              {item.icon}
                            </span>
                            <span className="text-[8px] font-black uppercase tracking-tight text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
                              {item.label}
                            </span>
                          </Link>
                        ))}
                      </div>

                      {/* Menu sections */}
                      <div className="space-y-3">
                        {HEADER_CONFIG.userMenu.sections.filter(section => user || section.title === "Extras").map((section) => (
                          <div key={section.title}>
                            <button
                              onClick={() => toggleSection(section.title)}
                              className="w-full flex items-center justify-between px-1 py-1 mb-1 group"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-1 h-3 rounded-full" style={{ background: section.color }} />
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--muted)]/50 group-hover:text-[var(--muted)] transition-colors">{section.title}</span>
                              </div>
                              <motion.div
                                animate={{ rotate: expandedSections[section.title] ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-[var(--muted)]/30"
                              >
                                <FiChevronRight size={11} />
                              </motion.div>
                            </button>
                            <AnimatePresence initial={false}>
                              {expandedSections[section.title] && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden space-y-1"
                                >
                                  {section.items.map((item) => (
                                    <Link
                                      key={item.label}
                                      href={user ? item.href : "/login"}
                                      onClick={() => setUserMenuOpen(false)}
                                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl border border-[var(--foreground)]/6 bg-[var(--foreground)]/[0.03] hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/5 transition-all group ${!user ? "opacity-40" : ""}`}
                                    >
                                      <div className="flex items-center gap-3">
                                        <div
                                          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                                          style={{ background: `${item.color}18`, color: item.color }}
                                        >
                                          {item.icon}
                                        </div>
                                        <div>
                                          <p className="text-[12px] font-black text-[var(--foreground)] leading-tight">{item.label}</p>
                                          <p className="text-[9px] text-[var(--muted)]/50 leading-tight">{item.desc}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        {item.label === "My Wallet" && user && (
                                          <span className="text-[9px] font-black px-2 py-0.5 rounded-full" style={{ color: item.color, background: `${item.color}15` }}>
                                            {formatPrice(walletBalance)}
                                          </span>
                                        )}
                                        <FiChevronRight size={13} className="text-[var(--muted)]/20 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all" />
                                      </div>
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>

                      {/* Admin Console — only for owner */}
                      {user?.userType === "owner" && (
                        <div className="relative mt-3 group">
                          <Link
                            href="/owner-panal"
                            onClick={() => setUserMenuOpen(false)}
                            className="relative flex items-center justify-between p-3 bg-[var(--background)] border border-[var(--border)] rounded-2xl overflow-hidden transition-all duration-300"
                          >
                            <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-[var(--foreground)]/5 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="flex items-center gap-3 relative z-10 w-full">
                              <div className="relative flex-shrink-0">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-purple-600 flex items-center justify-center shadow-lg">
                                  <FiZap size={14} className="text-white" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 flex h-3 w-3">
                                  <div className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-[var(--background)]"></div>
                                </div>
                              </div>
                              <div className="flex flex-col min-w-0 flex-1">
                                <h4 className="text-sm font-black uppercase tracking-widest text-[var(--foreground)] mb-1">Admin Console</h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold text-[var(--accent)] bg-[var(--accent)]/10 px-1.5 py-0.5 rounded-md border border-[var(--accent)]/20 uppercase">Owner</span>
                                  <span className="text-[10px] font-bold text-[#22c55e] flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-[#22c55e]"></span>Active</span>
                                </div>
                              </div>
                              <div className="w-8 h-8 rounded-full bg-[var(--foreground)]/5 group-hover:bg-[var(--accent)]/10 flex items-center justify-center text-[var(--muted)] group-hover:text-[var(--accent)] transition-all flex-shrink-0">
                                <FiChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                              </div>
                            </div>
                          </Link>
                        </div>
                      )}

                    </div> {/* End of scrollable content */}

                    {/* Fixed Bottom — scrolling product links */}
                    <div className="relative z-10 border-t border-[var(--foreground)]/6 bg-[var(--foreground)]/[0.02] overflow-hidden flex-shrink-0">
                      <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 18 }}
                        className="flex gap-2 p-2.5 w-max"
                      >
                        {[...Array(2)].map((_, i) => (
                          <div key={i} className="flex gap-2">
                            {[
                              { href: "https://xyzpay.site", label: "xyzpay.site", sub: "Payment Gateway", icon: <FiCreditCard size={11} />, color: "#4f46e5" },
                              { href: "https://games.bluebuff.in", label: "games.bluebuff.in", sub: "For Games", icon: <FiGlobe size={11} />, color: "#059669" },
                              { href: "https://web.bluebuff.in", label: "web.bluebuff.in", sub: "Link in Bio", icon: <FiGlobe size={11} />, color: "#db2777" },
                            ].map((link) => (
                              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                                className="group flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--foreground)]/8 bg-[var(--foreground)]/[0.04] hover:border-[var(--accent)]/30 transition-all min-w-[150px]"
                              >
                                <div className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${link.color}20`, color: link.color }}>
                                  {link.icon}
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[10px] font-black text-[var(--foreground)] leading-tight">{link.label}</span>
                                  <span className="text-[7px] text-[var(--muted)]/50 font-bold uppercase tracking-widest">{link.sub}</span>
                                </div>
                                <FiExternalLink size={10} className="text-[var(--muted)]/30 group-hover:text-[var(--accent)] transition-colors ml-auto flex-shrink-0" />
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
            <div className="px-6 py-3 rounded-full bg-[var(--card)] border border-green-500/20 flex items-center gap-3 shadow-xl backdrop-blur-xl">
              <FiCheckCircle className="text-green-500" size={18} />
              <span className="text-xs font-bold text-[var(--foreground)]">Logout Successful</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </header>
  );
}
