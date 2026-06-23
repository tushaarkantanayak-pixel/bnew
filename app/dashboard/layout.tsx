"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import AuthGuard from "../../components/AuthGuard";
import { FiZap, FiInbox, FiHelpCircle, FiZap as FiZapIcon, FiUser, FiCreditCard, FiUsers, FiKey, FiGift } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "../../store/useAuthStore";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { fetchUser, userDetails, setWalletBalance } = useAuthStore();

    useEffect(() => {
        fetchUser();

        // Listen for wallet updates to refresh balance
        const handleSync = () => {
            const balance = localStorage.getItem("walletBalance");
            if (balance !== null) setWalletBalance(Number(balance));
            fetchUser();
        };

        window.addEventListener("walletUpdated", handleSync);
        window.addEventListener("storage", handleSync);

        return () => {
            window.removeEventListener("walletUpdated", handleSync);
            window.removeEventListener("storage", handleSync);
        };
    }, []);

    const activeTab = pathname.split("/").pop() || "orders";

    const tabCards = [
        { key: "orders", label: "History", value: "Orders", icon: FiInbox, href: "/dashboard/orders" },
        { key: "support", label: "Help", value: "Support", icon: FiHelpCircle, href: "/dashboard/support" },
        { key: "wallet", label: "Money", value: "Wallet", icon: FiCreditCard, href: "/dashboard/wallet" },
        { key: "redeem", label: "Gift", value: "Redeem", icon: FiGift, href: "/dashboard/redeem" },
        { key: "referral", label: "Invite", value: "Referral", icon: FiUsers, href: "/dashboard/referral" },
        // { key: "account", label: "Identity", value: "Profile", icon: FiUser, href: "/dashboard/account" },
    ];

    tabCards.push({ key: "api-keys", label: "Dev API", value: "API Keys", icon: FiKey, href: "/dashboard/api-keys" });

    return (
        <AuthGuard>
            <section className="min-h-screen px-4 sm:px-6 py-6 sm:py-8 bg-[var(--background)]">


                    <div className="max-w-6xl mx-auto relative z-10">
                        {/* TACTICAL HEADER */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
                        >
                            <div className="space-y-2">
                                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[var(--accent)]/5 border border-[var(--accent)]/10">
                                    <FiZap className="text-[var(--accent)] animate-pulse" size={8} />
                                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[var(--accent)] italic">
                                        Online now
                                    </span>
                                </div>
                                <h1 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter leading-none">
                                    MY <span className="text-[var(--accent)]">{tabCards.find(t => t.key === activeTab)?.value || "DASHBOARD"}</span>
                                </h1>
                                <p className="text-[var(--muted)] text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] opacity-30 italic">
                                    User: {userDetails.name || "Guest"} • Connected
                                </p>
                            </div>

                            {/* QUICK STATS */}
                            {/* <div className="flex gap-4">
                                <Link href="/dashboard/wallet" className="px-4 py-2 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-all group">
                                    <p className="text-[8px] font-black uppercase tracking-widest text-[var(--muted)]/40 mb-0.5 group-hover:text-[var(--accent)]/60 transition-colors">Wallet Assets</p>
                                    <p className="text-sm font-black italic text-[var(--accent)] leading-none">{formatPrice(walletBalance)}</p>
                                </Link>
                            </div> */}
                        </motion.div>

                        {/* PAGE CONTENT AREA */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="min-h-[500px]"
                        >
                            {children}
                        </motion.div>
                    </div>
                </section>
        </AuthGuard>
    );
}
