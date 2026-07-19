"use client";

import { useEffect, useState, useCallback } from "react";
import { Loader2, RefreshCcw, DollarSign, Users, Package, TrendingUp, Wallet, ArrowUpRight, Zap, MessageSquare, Key } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/utils/currency";
import apiClient from "@/utils/apiClient";

const TIMEFRAMES = [
    { value: 1, label: "1D" },
    { value: 7, label: "7D" },
    { value: 30, label: "30D" },
];

export default function DashboardTab() {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [timeframe, setTimeframe] = useState(1);
    const [lastUpdated, setLastUpdated] = useState(null);
    
    const [data, setData] = useState({
        walletTotalUsers: 0,
        totalRevenue: 0,
        totalOrders: 0,
        topCustomers: [],
        topProducts: []
    });

    const [apiBalance, setApiBalance] = useState(null);

    const fetchDashboardData = useCallback(async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        else setLoading(true);

        try {
            const [statsRes, balanceRes] = await Promise.all([
                apiClient.get(`/api/admin/dashboard?days=${timeframe}`),
                apiClient.get("/api/game/balance")
            ]);

            if (statsRes.data?.success) {
                setData(statsRes.data.data);
            }

            if (balanceRes.data?.success) {
                setApiBalance(balanceRes.data?.balance?.data?.balance ?? balanceRes.data.balance);
            }

            setLastUpdated(new Date());
        } catch (err) {
            console.error("Dashboard fetch failed", err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [timeframe]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    const MetricCard = ({ title, value, subValue, icon: Icon, color, delay }) => (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.3 }}
            className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col gap-2 relative overflow-hidden group"
        >
            <div className={`absolute -right-4 -top-4 w-20 h-20 bg-${color}-500/10 rounded-full blur-2xl group-hover:bg-${color}-500/20 transition-all`} />
            <div className="flex justify-between items-start relative z-10">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center bg-${color}-500/10 text-${color}-500`}>
                    <Icon size={16} />
                </div>
            </div>
            <div className="relative z-10 mt-1">
                <h4 className="text-[9px] font-bold text-[var(--muted)] uppercase tracking-widest">{title}</h4>
                <div className="flex items-baseline gap-2 mt-0.5">
                    <p className="text-lg font-black text-[var(--foreground)] tracking-tight">
                        {typeof value === 'number' ? formatPrice(value) : value}
                    </p>
                    {subValue && (
                        <p className="text-[10px] font-bold text-[var(--muted)] tracking-wider">
                            ({subValue})
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="space-y-6 pb-20 max-w-full overflow-x-hidden">
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">Overall Stats</h2>
                    {lastUpdated && (
                        <p className="text-xs text-[var(--muted)] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Last updated: {lastUpdated.toLocaleTimeString()}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    {/* TIMEFRAME SELECTOR */}
                    <div className="flex bg-[var(--foreground)]/[0.03] p-1 rounded-xl border border-[var(--border)]">
                        {TIMEFRAMES.map((t) => (
                            <button
                                key={t.value}
                                onClick={() => setTimeframe(t.value)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                    timeframe === t.value
                                        ? "bg-[var(--accent)] text-white shadow-md"
                                        : "text-[var(--muted)] hover:text-[var(--foreground)]"
                                }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    {/* REFRESH BUTTON */}
                    <button
                        onClick={() => fetchDashboardData(true)}
                        disabled={refreshing || loading}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--foreground)]/[0.03] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] active:scale-95 transition-all outline-none disabled:opacity-50"
                    >
                        <RefreshCcw size={16} className={refreshing ? "animate-spin" : ""} />
                    </button>
                </div>
            </div>

            {loading && !data.totalRevenue ? (
                <div className="py-32 flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="animate-spin text-[var(--accent)]" size={32} />
                    <p className="text-sm font-bold text-[var(--muted)] uppercase tracking-widest">Loading Dashboard...</p>
                </div>
            ) : (
                <>
                    {/* KPIS */}
                    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-3">
                        <MetricCard 
                            title={`Total Value (${timeframe}d)`} 
                            value={data.overallRevenue || 0} 
                            subValue={(data.overallOrders || 0) + " TX"}
                            icon={Package} 
                            color="indigo" 
                            delay={0.1} 
                        />
                        <MetricCard 
                            title={`Success Sell (${timeframe}d)`} 
                            value={data.totalRevenue} 
                            subValue={(data.totalOrders || 0) + " TX"}
                            icon={TrendingUp} 
                            color="emerald" 
                            delay={0.15} 
                        />
                        <MetricCard 
                            title={`Refunded (${timeframe}d)`} 
                            value={data.refundRevenue || 0} 
                            subValue={(data.refundOrders || 0) + " TX"}
                            icon={RefreshCcw} 
                            color="red" 
                            delay={0.2} 
                        />
                        <MetricCard 
                            title="My API Balance" 
                            value={apiBalance !== null ? apiBalance : "Error"} 
                            icon={DollarSign} 
                            color="blue" 
                            delay={0.2} 
                        />
                        <MetricCard 
                            title="User Wallets (Active)" 
                            value={data.walletTotalUsers} 
                            subValue={(data.activeWalletsCount?.toString() || "0") + " Active"}
                            icon={Wallet} 
                            color="purple" 
                            delay={0.3} 
                        />
                        <MetricCard 
                            title={`Users Tracker (${timeframe}d)`} 
                            value={data.totalUsers?.toString() || "0"} 
                            subValue={`${data.newUsers || 0} New • ${data.activeUsers || 0} Active`}
                            icon={Users} 
                            color="orange" 
                            delay={0.5} 
                        />
                        <MetricCard 
                            title={`Support Queries (${timeframe}d)`} 
                            value={`${data.pendingQueries || 0} Pending`} 
                            subValue={(data.totalQueries || 0) + " Total"}
                            icon={MessageSquare} 
                            color="rose" 
                            delay={0.65} 
                        />
                        <MetricCard 
                            title="API Key Users" 
                            value={data.apiUsers?.toString() || "0"} 
                            icon={Key} 
                            color="blue" 
                            delay={0.7} 
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* TOP CUSTOMERS */}
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5"
                        >
                            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[var(--border)]">
                                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
                                    <Users size={16} />
                                </div>
                                <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider">Top Customers ({timeframe}d)</h3>
                            </div>
                            
                            <div className="space-y-1">
                                {data.topCustomers.length === 0 ? (
                                    <p className="text-xs text-[var(--muted)] py-4 text-center">No sales data in this period.</p>
                                ) : (
                                    data.topCustomers.map((c, i) => (
                                        <div key={c.email} className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--foreground)]/[0.02] transition-colors">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-6 h-6 rounded-md bg-[var(--foreground)]/5 flex items-center justify-center text-[10px] font-black text-[var(--muted)]">
                                                    #{i + 1}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-bold text-[var(--foreground)] truncate">{c.email}</p>
                                                    <p className="text-[10px] text-[var(--muted)]">{c.ordersCount} orders</p>
                                                </div>
                                            </div>
                                            <div className="text-sm font-black text-emerald-500 tracking-tight shrink-0">
                                                {formatPrice(c.totalSpent)}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </motion.div>

                        {/* TOP PRODUCTS */}
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5"
                        >
                            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[var(--border)]">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                                    <Package size={16} />
                                </div>
                                <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider">Top Selling Products ({timeframe}d)</h3>
                            </div>
                            
                            <div className="space-y-1">
                                {data.topProducts.length === 0 ? (
                                    <p className="text-xs text-[var(--muted)] py-4 text-center">No sales data in this period.</p>
                                ) : (
                                    data.topProducts.map((p, i) => (
                                        <div key={`${p.gameSlug}-${p.itemName}`} className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--foreground)]/[0.02] transition-colors">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-6 h-6 rounded-md bg-[var(--foreground)]/5 flex items-center justify-center text-[10px] font-black text-[var(--muted)]">
                                                    #{i + 1}
                                                </div>
                                                <div className="min-w-0 flex flex-col gap-0.5">
                                                    <p className="text-xs font-bold text-[var(--foreground)] truncate leading-none">{p.itemName}</p>
                                                    <p className="text-[9px] font-bold uppercase tracking-widest text-[var(--muted)]/60 leading-none">{p.gameSlug}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end shrink-0">
                                                <div className="text-sm font-black text-blue-500 tracking-tight">
                                                    {formatPrice(p.totalRevenue)}
                                                </div>
                                                <p className="text-[10px] font-bold text-[var(--muted)]">{p.unitsSold} units</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </div>
    );
}
