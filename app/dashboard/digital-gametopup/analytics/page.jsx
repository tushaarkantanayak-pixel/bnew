"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiBarChart2, FiCalendar, FiArrowUpRight, FiArrowDownLeft, FiClock, FiSearch, FiTrendingUp, FiShoppingBag } from "react-icons/fi";
import { useAuthStore } from "@/store/useAuthStore";
import { formatPrice } from "@/utils/currency";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AnalyticsPage() {
    const { token, walletBalance } = useAuthStore();
    const [range, setRange] = useState("7d");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [isCustom, setIsCustom] = useState(false);
    
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        totalCredit: 0,
        totalDebit: 0,
        chartData: [],
        topItems: [],
        lastUpdated: null
    });

    const fetchAnalytics = async () => {
        if (!token) return;
        try {
            setLoading(true);
            
            let query = `?range=${range}`;
            if (isCustom && fromDate && toDate) {
                query = `?from=${fromDate}&to=${toDate}`;
            }

            const res = await axios.get(`/api/user/analytics${query}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.success) {
                setData({
                    totalCredit: res.data.totalCredit || 0,
                    totalDebit: res.data.totalDebit || 0,
                    chartData: res.data.chartData || [],
                    topItems: res.data.topItems || [],
                    lastUpdated: res.data.lastUpdated
                });
            }
        } catch (error) {
            console.error("Failed to fetch analytics:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isCustom) {
            fetchAnalytics();
        }
    }, [range, isCustom, token]);

    const handleCustomSearch = () => {
        if (!fromDate || !toDate) return;
        
        const start = new Date(fromDate);
        const end = new Date(toDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        
        if (diffDays > 180) {
            alert("Maximum allowed timeline is 6 months (180 days). Please select a shorter range.");
            return;
        }

        setIsCustom(true);
        fetchAnalytics();
    };

    const handlePreset = (r) => {
        setIsCustom(false);
        setFromDate("");
        setToDate("");
        setRange(r);
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[var(--card)] border border-[var(--border)] p-3 rounded-xl shadow-xl">
                    <p className="text-[10px] font-bold text-[var(--muted)] mb-2 uppercase tracking-widest">{label}</p>
                    <div className="space-y-1">
                        <p className="text-xs font-black text-green-500 flex items-center gap-2">
                            <FiArrowDownLeft size={10} /> +{formatPrice(payload[0].value)}
                        </p>
                        <p className="text-xs font-black text-red-500 flex items-center gap-2">
                            <FiArrowUpRight size={10} /> -{formatPrice(payload[1].value)}
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-4 sm:space-y-6 pb-20">
            {/* HEADER (Last Updated Only) */}
            <div className="flex justify-end mb-2 sm:mb-4">
                <div className="flex items-center gap-2 bg-[var(--card)] border border-[var(--border)] px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold text-[var(--muted)] shadow-sm">
                    <FiClock className="text-[var(--accent)]" size={12} />
                    Last Updated: {data.lastUpdated ? new Date(data.lastUpdated).toLocaleString() : "Just now"}
                </div>
            </div>

            {/* FILTERS */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                {/* Presets */}
                <div className="flex gap-1 p-1 rounded-xl bg-[var(--card)] border border-[var(--border)] w-full sm:w-auto shadow-sm">
                    {["1d", "7d", "30d"].map((r) => (
                        <button
                            key={r}
                            onClick={() => handlePreset(r)}
                            className={`flex-1 sm:flex-none px-3 sm:px-5 py-1.5 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${
                                !isCustom && range === r
                                    ? "bg-[var(--accent)] text-white shadow-md"
                                    : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/5"
                            }`}
                        >
                            {r}
                        </button>
                    ))}
                </div>

                {/* Custom Date Range */}
                <div className="flex items-center w-full sm:w-auto bg-[var(--card)] border border-[var(--border)] p-1 rounded-xl shadow-sm">
                    <div className="relative flex-1 sm:w-32 flex items-center">
                        <FiCalendar className="absolute left-2 text-[var(--muted)] pointer-events-none" size={10} />
                        <input 
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            onClick={(e) => {
                                try { e.target.showPicker(); } catch(err) {}
                            }}
                            className="w-full pl-6 pr-2 py-1.5 rounded-lg bg-transparent text-[10px] sm:text-xs font-bold text-[var(--foreground)] outline-none focus:bg-[var(--foreground)]/5 transition-colors cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full"
                        />
                    </div>
                    
                    <div className="w-px h-4 bg-[var(--border)] mx-1" />
                    
                    <div className="relative flex-1 sm:w-32 flex items-center">
                        <FiCalendar className="absolute left-2 text-[var(--muted)] pointer-events-none" size={10} />
                        <input 
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            onClick={(e) => {
                                try { e.target.showPicker(); } catch(err) {}
                            }}
                            className="w-full pl-6 pr-2 py-1.5 rounded-lg bg-transparent text-[10px] sm:text-xs font-bold text-[var(--foreground)] outline-none focus:bg-[var(--foreground)]/5 transition-colors cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full"
                        />
                    </div>
                    
                    <button 
                        onClick={handleCustomSearch}
                        disabled={!fromDate || !toDate}
                        className="p-1.5 ml-1 rounded-lg bg-[var(--accent)] text-white disabled:opacity-50 hover:brightness-110 transition-all flex-shrink-0 shadow-sm"
                    >
                        <FiSearch size={14} />
                    </button>
                </div>
            </div>

            {/* METRIC CARDS */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {/* Credit */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[var(--card)] border border-[var(--border)] p-2 sm:p-5 rounded-xl sm:rounded-2xl relative overflow-hidden flex flex-col justify-center"
                >
                    <div className="absolute top-0 right-0 p-1 sm:p-4 opacity-10">
                        <FiArrowDownLeft className="text-green-500 w-6 h-6 sm:w-12 sm:h-12" />
                    </div>
                    <p className="text-[7px] sm:text-[10px] font-black uppercase tracking-widest text-[var(--muted)] mb-0.5 sm:mb-1">Credit In</p>
                    <p className="text-xs sm:text-2xl font-black italic text-green-500 truncate">{formatPrice(data.totalCredit)}</p>
                </motion.div>

                {/* Balance */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-[var(--accent)] border border-[var(--accent)] p-2 sm:p-5 rounded-xl sm:rounded-2xl relative overflow-hidden text-white flex flex-col justify-center"
                >
                    <div className="absolute top-0 right-0 w-16 sm:w-32 h-16 sm:h-32 bg-white/10 rounded-full blur-xl sm:blur-2xl -translate-y-1/2 translate-x-1/4"></div>
                    <p className="text-[7px] sm:text-[10px] font-black uppercase tracking-widest text-white/70 mb-0.5 sm:mb-1">Balance</p>
                    <p className="text-xs sm:text-2xl font-black italic shadow-black/10 drop-shadow-md truncate">{formatPrice(walletBalance)}</p>
                </motion.div>

                {/* Debit */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[var(--card)] border border-[var(--border)] p-2 sm:p-5 rounded-xl sm:rounded-2xl relative overflow-hidden flex flex-col justify-center"
                >
                    <div className="absolute top-0 right-0 p-1 sm:p-4 opacity-10">
                        <FiArrowUpRight className="text-red-500 w-6 h-6 sm:w-12 sm:h-12" />
                    </div>
                    <p className="text-[7px] sm:text-[10px] font-black uppercase tracking-widest text-[var(--muted)] mb-0.5 sm:mb-1">Debit Out</p>
                    <p className="text-xs sm:text-2xl font-black italic text-red-500 truncate">{formatPrice(data.totalDebit)}</p>
                </motion.div>
            </div>

            {/* CHART */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[var(--card)] border border-[var(--border)] p-3 sm:p-6 rounded-2xl"
            >
                <h3 className="text-[10px] sm:text-sm font-black uppercase tracking-widest text-[var(--foreground)] mb-4 sm:mb-6">Cash Flow Over Time</h3>
                
                <div className="h-[200px] sm:h-[300px] w-full">
                    {loading ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : data.chartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                                <XAxis 
                                    dataKey="date" 
                                    tick={{ fontSize: 10, fill: 'var(--muted)', fontWeight: 'bold' }} 
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(val) => val.split("-").slice(1).join("/")}
                                />
                                <YAxis 
                                    tick={{ fontSize: 10, fill: 'var(--muted)', fontWeight: 'bold' }} 
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(val) => `$${val}`}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Line 
                                    type="monotone" 
                                    dataKey="credit" 
                                    stroke="#22c55e" 
                                    strokeWidth={3}
                                    dot={false}
                                    activeDot={{ r: 6, fill: "#22c55e" }}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="debit" 
                                    stroke="#ef4444" 
                                    strokeWidth={3}
                                    dot={false}
                                    activeDot={{ r: 6, fill: "#ef4444" }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-[var(--muted)]">
                            <FiBarChart2 size={32} className="opacity-20 mb-2" />
                            <p className="text-xs font-bold uppercase tracking-widest">No Data Found</p>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* TOP 5 PURCHASED ITEMS */}
            {data.topItems && data.topItems.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-[var(--card)] border border-[var(--border)] p-3 sm:p-6 rounded-2xl"
                >
                    <div className="flex items-center gap-2 mb-4 sm:mb-6">
                        <FiTrendingUp className="text-[var(--accent)]" />
                        <h3 className="text-[10px] sm:text-sm font-black uppercase tracking-widest text-[var(--foreground)]">Your Top 5 Purchased Items</h3>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        {data.topItems.map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-2 sm:p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] hover:border-[var(--accent)]/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-black italic">
                                        #{i + 1}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <p className="text-xs sm:text-sm font-bold text-[var(--foreground)] truncate">{item.name}</p>
                                        <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[var(--muted)] truncate">{item.game}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[var(--card)] border border-[var(--border)] flex-shrink-0">
                                    <FiShoppingBag size={10} className="text-[var(--accent)]" />
                                    <span className="text-[10px] sm:text-xs font-bold text-[var(--foreground)]">{item.sold} Purchased</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
