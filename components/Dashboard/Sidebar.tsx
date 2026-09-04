"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FiUsers, 
    FiGift, 
    FiMessageSquare, 
    FiMenu, 
    FiX
} from "react-icons/fi";

const SIDEBAR_LINKS = [
    {
        title: "Rewards",
        items: [
            { label: "Redeem Code", href: "/dashboard/earning/redeem", icon: FiGift },
            { label: "Refer & Earn", href: "/dashboard/earning/referral", icon: FiUsers },
        ]
    },
    {
        title: "Support",
        items: [
            { label: "Help Center", href: "/dashboard/support", icon: FiMessageSquare },
        ]
    }
];

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
    const pathname = usePathname();

    const toggleSidebar = () => setIsOpen(!isOpen);
    const closeSidebar = () => setIsOpen(false);

    const SidebarContent = () => (
        <div className="h-full flex flex-col py-6 px-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-8 px-2">
                {/* <Link href="/" className="text-xl font-black italic tracking-tighter uppercase text-[var(--foreground)]" onClick={closeSidebar}>
                    BLUE<span className="text-[var(--accent)]">BUFF</span>
                </Link> */}
                {/* The close button was removed from here */}
            </div>

            <div className="space-y-8 flex-1">
                {SIDEBAR_LINKS.map((section) => (
                    <div key={section.title} className="space-y-2">
                        <h4 className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest px-2 opacity-50">
                            {section.title}
                        </h4>
                        <div className="space-y-1">
                            {section.items.map((item) => {
                                const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={closeSidebar}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                                            isActive 
                                                ? "bg-[var(--accent)]/10 text-[var(--accent)]" 
                                                : "text-[var(--muted)] hover:bg-[var(--foreground)]/5 hover:text-[var(--foreground)]"
                                        }`}
                                    >
                                        <item.icon 
                                            size={18} 
                                            className={`${isActive ? "text-[var(--accent)]" : "text-[var(--muted)] group-hover:text-[var(--foreground)]"} transition-colors`} 
                                        />
                                        <span className={`text-sm font-bold tracking-wide ${isActive ? "" : "opacity-80 group-hover:opacity-100"}`}>
                                            {item.label}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <>
            {/* MOBILE HAMBURGER BUTTON */}
            <div className="md:hidden fixed bottom-6 right-6 z-50">
                <button 
                    onClick={toggleSidebar}
                    className="w-14 h-14 rounded-full bg-[var(--accent)] text-black flex items-center justify-center shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)] transition-transform hover:scale-105 active:scale-95"
                >
                    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {/* MOBILE OVERLAY */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeSidebar}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* SIDEBAR CONTAINER */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-[var(--card)] border-r border-[var(--border)] transform transition-transform duration-300 ease-in-out
                md:relative md:!translate-x-0 md:h-auto md:min-h-screen
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <SidebarContent />
            </div>
        </>
    );
}
