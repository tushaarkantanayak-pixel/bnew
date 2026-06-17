"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { formatPrice } from "@/utils/currency";
import { useAuthStore } from "../../store/useAuthStore";

import { FiChevronRight, FiLogOut, FiCheckCircle, FiShield, FiZap, FiMenu, FiX, FiLayers, FiCompass, FiGrid, FiShoppingBag, FiMessageSquare, FiUser, FiBell, FiUsers, FiKey, FiGift, FiGlobe } from "react-icons/fi";

/* ================= CONFIG ================= */
const HEADER_CONFIG = {
  logo: {
    src: "/logoBB.png",
    alt: "Blue Buff",
    width: 140,
    height: 40,
  },

  nav: [
    { label: "Top-Up", href: "/games", icon: <FiShoppingBag size={14} /> },
    { label: "News", href: "/blog", icon: <FiLayers size={14} /> },
    { label: "Services", href: "/services", icon: <FiGrid size={14} /> },
    { label: "Our Products", href: "/ourproducts", icon: <FiGrid size={14} /> },
  ],

  userMenu: {
    sections: [
      {
        title: "My Dashboard",
        items: [
          { label: "Account Overview", href: "/dashboard", icon: <FiCompass size={14} />, desc: "Central Hub" },
        ]
      },
      {
        title: "Digital Game Topup",
        items: [
          { label: "API Setup", href: "/dashboard/digital-gametopup/api-keys", icon: <FiKey size={14} />, desc: "Automatic game topups" },
          { label: "My Wallet", href: "/dashboard/digital-gametopup/wallet", icon: <FiLayers size={14} />, desc: "Balance & Recharge" },
          { label: "My Orders", href: "/dashboard/digital-gametopup/orders", icon: <FiShoppingBag size={14} />, desc: "Track your top-ups" },
        ]
      },
      {
        title: "Support",
        items: [
          { label: "Help Center", href: "/dashboard/support", icon: <FiMessageSquare size={14} />, desc: "Get help 24/7" },
        ]
      },
      {
        title: "Earning",
        items: [
          { label: "Refer & Earn", href: "/dashboard/earning/referral", icon: <FiUsers size={14} />, desc: "Invite & Rewards" },
          { label: "Redeem Code", href: "/dashboard/earning/redeem", icon: <FiGift size={14} />, desc: "Use vouchers" },
        ]
      },
      {
        title: "Gateway",
        items: [
          { label: "XYZPay.site", href: "https://xyzpay.site", icon: <FiZap size={14} />, desc: "Contact to avail subscription" },
          { label: "web.bluebuff.in", href: "https://web.bluebuff.in", icon: <FiGlobe size={14} />, desc: "Make your own customised web" },
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
      [sec.title]: sec.title !== "Earning"
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

  /* ================= PUSH NOTIFICATIONS ================= */
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showSubscribeToast, setShowSubscribeToast] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      window.OneSignalDeferred = window.OneSignalDeferred || [];
      // @ts-ignore
      window.OneSignalDeferred.push(async (OneSignal) => {
        setIsSubscribed(OneSignal.Notifications.permission === "granted");
        OneSignal.Notifications.addEventListener("permissionChange", (permission) => {
          const granted = permission === "granted";
          setIsSubscribed(granted);
          if (granted) {
            setShowSubscribeToast(true);
            setTimeout(() => setShowSubscribeToast(false), 3000);
          }
        });
      });
    }
  }, []);

  const handlePushToggle = () => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      const OneSignal = window.OneSignal;
      if (OneSignal) {
        OneSignal.Notifications.requestPermission();
      } else {
        // @ts-ignore
        const OneSignalDeferred = window.OneSignalDeferred || [];
        // @ts-ignore
        OneSignalDeferred.push(async (OneSignal) => {
          await OneSignal.Notifications.requestPermission();
        });
      }
    }
  };

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
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 w-full transition-all duration-500 ${scrolled
        ? "backdrop-blur-3xl bg-[var(--background)]/80 shadow-2xl border-b border-[var(--border)] active-header"
        : "bg-transparent"
        }`}
      style={{ zIndex: userMenuOpen ? 2147483647 : 1000 }}
    >
      <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`} />

      <div className="w-full px-4 md:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">

          <div className="flex-1 flex items-center justify-start">
            <Link href="/" className="relative z-10 flex-shrink-0">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Image
                  src={HEADER_CONFIG.logo.src}
                  alt={HEADER_CONFIG.logo.alt}
                  width={HEADER_CONFIG.logo.width}
                  height={HEADER_CONFIG.logo.height}
                  priority
                  className="h-8 md:h-10 w-auto transition-all duration-300"
                />
              </motion.div>
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setUserMenuOpen((p) => !p)}
              className="relative flex items-center gap-2 pl-3 pr-1 py-1 rounded-full border border-[var(--border)] bg-[var(--card)]/50 hover:bg-[var(--foreground)]/5 backdrop-blur-md transition-all duration-300 shadow-sm group"
            >
              <FiMenu className="text-[var(--foreground)]/70 group-hover:text-[var(--foreground)] transition-colors ml-0.5" size={18} />
              <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-[var(--accent)]/10 shadow-inner">
                {user?.avatar ? (
                  <Image src={user.avatar} alt="Avatar" width={32} height={32} className="object-cover w-full h-full" />
                ) : (
                  <FiUser className="text-[var(--accent)] text-sm" />
                )}
              </div>
            </motion.button>

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
                    className="fixed right-0 top-0 h-[100dvh] w-[85%] max-w-[380px] bg-[var(--background)] dark:bg-[#050505] light:bg-white border-l border-[var(--border)] z-[2147483647] shadow-[-20px_0_100px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
                    style={{ background: 'var(--background)', opacity: 1 }}
                  >
                    <div className="absolute inset-0 bg-[var(--background)] pointer-events-none" style={{ background: 'var(--background)', opacity: 1 }} />
                    <div
                      className="absolute -top-[10%] -right-[10%] w-[120%] h-[120%] bg-[radial-gradient(circle,var(--accent)_0%,transparent_60%)] opacity-[0.05] blur-[100px] pointer-events-none"
                    />
                    {/* Dark overlay for extra depth */}
                    <div className="absolute inset-0 bg-[var(--foreground)]/[0.02] pointer-events-none" />

                    {/* Compact Profile Header */}
                    <div className="relative z-10 p-4 flex items-center justify-between border-b border-[var(--border)]">
                      <div className="flex items-center gap-3 min-w-0">
                        {user ? (
                          <>
                            <div className="w-10 h-10 rounded-xl overflow-hidden border border-[var(--border)] shadow-sm">
                              {user?.avatar ? (
                                <Image src={user.avatar} alt="Avatar" width={40} height={40} className="object-cover" />
                              ) : (
                                <div className="w-full h-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] text-lg font-black">{user.name?.charAt(0)}</div>
                              )}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-[var(--foreground)] truncate max-w-[140px] leading-tight">{user.name}</span>
                                <span className="text-[8px] font-black uppercase tracking-wider text-[var(--accent)] bg-[var(--accent)]/10 px-1.5 py-0.5 rounded border border-[var(--accent)]/20">{user.userType || "User"}</span>
                              </div>
                              <span className="text-[10px] text-[var(--muted)] truncate max-w-[140px] italic">{user.email}</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]"><FiUser size={16} /></div>
                            <span className="text-sm font-bold">Guest Account</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {user && (
                          <button onClick={handleLogout} className="w-9 h-9 rounded-full hover:bg-red-500/10 flex items-center justify-center text-red-500 transition-colors" title="Logout"><FiLogOut size={18} /></button>
                        )}
                        <button onClick={() => setUserMenuOpen(false)} className="w-9 h-9 rounded-full hover:bg-[var(--foreground)]/5 flex items-center justify-center text-[var(--muted)] transition-colors"><FiX size={22} /></button>
                      </div>
                    </div>

                    <div className="relative z-10 flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">

                      {/* Login Banner for guests */}
                      {!user && (
                        <div className="flex items-center justify-between p-3 rounded-2xl bg-[var(--accent)]/5 border border-[var(--accent)]/15 mb-1">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]"><FiZap size={14} /></div>
                            <span className="text-xs font-bold text-[var(--foreground)]">Sign in to access all features</span>
                          </div>
                          <Link href="/login" onClick={() => setUserMenuOpen(false)} className="px-3 py-1.5 rounded-lg bg-[var(--accent)] !text-[var(--background)] text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all flex-shrink-0">Login</Link>
                        </div>
                      )}

                      {/* Nav Quick Links — always visible */}
                      <div className="grid grid-cols-4 gap-1.5 mb-3">
                        {HEADER_CONFIG.nav.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            onClick={() => setUserMenuOpen(false)}
                            className="flex flex-col items-center justify-center p-2 rounded-xl bg-[var(--foreground)]/[0.03] border border-white/5 hover:bg-[var(--accent)] hover:text-black transition-all group"
                          >
                            <span className="text-[var(--accent)] group-hover:text-black mb-1.5 transition-colors">{item.icon}</span>
                            <span className="text-[8px] font-black uppercase tracking-tight leading-none text-center">{item.label}</span>
                          </Link>
                        ))}
                      </div>

                      {/* Menu sections — always visible */}
                      <div className="space-y-1">
                        {HEADER_CONFIG.userMenu.sections.map((section) => (
                          <div key={section.title} className="space-y-0.5">
                            <button 
                              onClick={() => toggleSection(section.title)}
                              className="w-full flex items-center justify-between text-[8px] font-black uppercase tracking-[0.4em] text-[var(--muted)]/30 pl-2 pr-4 py-0.5 hover:text-[var(--muted)]/70 transition-colors"
                            >
                              <span>{section.title}</span>
                              <motion.div
                                animate={{ rotate: expandedSections[section.title] ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <FiChevronRight size={10} />
                              </motion.div>
                            </button>
                            <AnimatePresence initial={false}>
                              {expandedSections[section.title] && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className={section.title === "Earning" ? "grid grid-cols-2 gap-1.5" : "space-y-0.5"}>
                                    {section.items.map((item) => (
                                      <Link
                                        key={item.label}
                                        href={user ? item.href : "/login"}
                                        target={item.href.startsWith("http") ? "_blank" : undefined}
                                        onClick={() => setUserMenuOpen(false)}
                                        className={`flex items-center ${section.title === "Earning" ? "justify-start gap-1.5 py-1 px-1.5" : "justify-between py-1 px-2"} rounded-lg bg-[var(--foreground)]/[0.01] border border-white/[0.02] hover:border-[var(--accent)]/10 hover:bg-[var(--accent)]/5 transition-all group ${!user ? "opacity-50" : ""}`}
                                      >
                                        <div className={`flex items-center ${section.title === "Earning" ? "gap-1.5" : "gap-1.5"} min-w-0`}>
                                          <div className="w-5 h-5 rounded bg-[var(--foreground)]/5 flex items-center justify-center text-[var(--muted)] group-hover:text-[var(--accent)] transition-all flex-shrink-0">{item.icon}</div>
                                          <div className="flex flex-col min-w-0">
                                            <p className="text-[11px] font-bold text-[var(--foreground)] leading-tight truncate">{item.label}</p>
                                            <p className="text-[8px] text-[var(--muted)] opacity-50 truncate leading-[10px]">{item.desc}</p>
                                          </div>
                                        </div>
                                        {section.title !== "Earning" && (
                                          <div className="flex items-center gap-2 flex-shrink-0">
                                            {item.label === "My Wallet" && user && (
                                              <span className="text-[10px] font-black text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-md border border-[var(--accent)]/10 leading-none">
                                                {formatPrice(walletBalance)}
                                              </span>
                                            )}
                                            <FiChevronRight className="text-[var(--muted)] opacity-20 group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all" />
                                          </div>
                                        )}
                                      </Link>
                                    ))}
                                  </div>
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
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent)] to-purple-600 flex items-center justify-center shadow-lg">
                                  <FiZap size={18} className="text-white" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 flex h-3 w-3">
                                  <div className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-[var(--background)]"></div>
                                </div>
                              </div>
                              <div className="flex flex-col min-w-0 flex-1">
                                <h4 className="text-xs font-black uppercase tracking-widest text-[var(--foreground)] mb-1">Admin Console</h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-bold text-[var(--accent)] bg-[var(--accent)]/10 px-1.5 py-0.5 rounded-md border border-[var(--accent)]/20 uppercase">Owner</span>
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


    </motion.header>
  );
}
