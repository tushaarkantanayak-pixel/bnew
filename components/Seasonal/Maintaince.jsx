"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSettings, FiTool, FiClock, FiLogOut, FiActivity, FiLock, FiMessageCircle } from "react-icons/fi";

export default function Maintaince() {
    const [show, setShow] = useState(true);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("token"));
    }, []);

    const handleLoggingOff = () => {
        setIsLoggingOut(true);
        const keysToRemove = ["token", "userName", "email", "userId", "phone", "userType", "walletBalance", "pending_topup_order", "avatar"];
        keysToRemove.forEach(key => localStorage.removeItem(key));
        localStorage.removeItem("mlbb_verified_players");
        setTimeout(() => {
            window.location.href = "/";
        }, 2500);
    };

    const handleLogin = () => {
        window.location.href = "/login";
    };

    const handleWhatsApp = () => {
        window.open("https://whatsapp.com/channel/0029Vb87jgR17En1n5PKy129", "_blank");
    };

    return (
        <AnimatePresence>
            {show && (
                <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-[360px] bg-[#0c0c0e] border border-blue-500/10 rounded-[30px] p-6 text-center shadow-2xl overflow-hidden"
                    >
                        {/* Subtle Glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none" />

                        <div className="relative z-10 flex flex-col items-center">
                            {/* Simple Maintenance Icon */}
                            <div className="relative mb-6">
                                <div className="w-20 h-20 rounded-full bg-blue-500/5 border border-blue-500/10 flex items-center justify-center backdrop-blur-sm">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    >
                                        <FiSettings className="text-blue-500 opacity-20 text-4xl" />
                                    </motion.div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <FiTool className="text-blue-400 text-2xl" />
                                </div>
                                <motion.div
                                    animate={{ 
                                        y: [0, -5, 0],
                                        opacity: [0.3, 0.6, 0.3]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="absolute -top-1 -right-2 text-blue-400"
                                >
                                    <FiClock size={16} />
                                </motion.div>
                            </div>

                            <h2 className="text-2xl font-black italic uppercase tracking-tight text-white mb-1">
                                System Under <span className="text-blue-500">Maintenance</span>
                            </h2>
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-400/50 mb-4">
                                Checking things for you
                            </p>

                            <div className="bg-white/5 rounded-2xl p-4 w-full mb-6 border border-white/5">
                                <p className="text-white/80 text-sm font-medium">
                                    We'll be back in <span className="text-blue-400 font-bold">10-30 min</span>.
                                </p>
                            </div>

                            <div className="w-full space-y-3">
                                <motion.button
                                    onClick={handleWhatsApp}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-2 group"
                                >
                                    <FiMessageCircle className="text-emerald-400 group-hover:scale-110 transition-transform" />
                                    Join in WP for Quick Topup
                                </motion.button>

                                {!isLoggedIn ? (
                                    <motion.button
                                        onClick={handleLogin}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                                    >
                                        <FiLock className="text-sm" />
                                        Login
                                    </motion.button>
                                ) : !isLoggingOut ? (
                                    <motion.button
                                        onClick={handleLoggingOff}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-2 group"
                                    >
                                        <FiLogOut className="text-sm group-hover:-translate-x-1 transition-transform" />
                                        Logout
                                    </motion.button>
                                ) : (
                                    <div className="py-2">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"
                                        />
                                    </div>
                                )}
                            </div>

                            <p className="mt-6 text-[7px] font-black uppercase tracking-[0.4em] text-white/20 italic">
                                Blue Buff • 2026
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
