"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AuthGuard from "../../components/AuthGuard";
import { FiZap, FiInbox, FiHelpCircle, FiUser, FiCreditCard, FiUsers, FiKey, FiGift, FiBarChart2, FiMenu } from "react-icons/fi";
import Link from "next/link";
import Sidebar from "../../components/Dashboard/Sidebar";
import { usePathname } from "next/navigation";
import { useAuthStore } from "../../store/useAuthStore";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { fetchUser, userDetails, setWalletBalance } = useAuthStore();
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
        { key: "analytics", label: "Analytics", value: "Analytics", icon: FiBarChart2, href: "/dashboard/digital-gametopup/analytics" },
        // { key: "account", label: "Identity", value: "Profile", icon: FiUser, href: "/dashboard/account" },
    ];

    tabCards.push({ key: "api-keys", label: "Dev API", value: "API Keys", icon: FiKey, href: "/dashboard/api-keys" });

    return (
        <AuthGuard>
            <section className="min-h-screen bg-[var(--background)] flex flex-col md:flex-row overflow-hidden">
                <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
                <div className="flex-1 min-w-0 px-4 sm:px-6 py-4 max-h-screen overflow-y-auto">
                    <div className="max-w-6xl mx-auto relative z-10 pb-20 md:pb-0">
                        {/* TACTICAL HEADER */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6"
                        >
                            <div className="space-y-1">
                                <h1 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter leading-none">
                                    MY <span className="text-[var(--accent)]">{tabCards.find(t => t.key === activeTab)?.value || "DASHBOARD"}</span>
                                </h1>
                                <p className="text-[var(--muted)] text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-60">
                                    {userDetails.name || "Guest"}
                                </p>
                            </div>
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
                </div>
            </section>
        </AuthGuard>
    );
}
