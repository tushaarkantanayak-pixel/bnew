"use client";

import { useEffect, useState } from "react";
import { FiClock, FiCheckCircle, FiXCircle, FiRefreshCw, FiExternalLink, FiSearch } from "react-icons/fi";
import { Loader2, ArrowUpRight, ArrowDownRight, CheckCircle2, XCircle, RefreshCcw, ExternalLink, Network, Wallet } from "lucide-react";
import { formatPrice } from "@/utils/currency";
import { motion, AnimatePresence } from "framer-motion";
import apiClient from "@/utils/apiClient";

export default function UsdtTab() {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("submitted");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [actionLoading, setActionLoading] = useState(null); // ID of deposit being processed

  const fetchDeposits = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get(`/api/admin/wallet/usdt?status=${status}&page=${page}`);
      const data = res.data;
      if (data.success) {
        setDeposits(data.deposits || []);
        setTotalPages(data.pagination?.totalPages || 1);
      }
    } catch (err) {
      console.error("Failed to fetch USDT deposits", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, [status, page]);

  const handleAction = async (depositId, action) => {
    if (!confirm(`Are you sure you want to ${action} this deposit?`)) return;

    try {
      setActionLoading(depositId);
      const res = await apiClient.post("/api/admin/wallet/usdt", { depositId, action });
      const data = res.data;
      if (data.success) {
        alert(data.message);
        fetchDeposits(); // Refresh
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(`USDT ${action} error:`, err);
      alert("Server error");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
           <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
             <Wallet size={16} strokeWidth={2.5} />
           </div>
           Crypto Deposits
        </h2>
        
        <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-[var(--card)] border border-[var(--border)]/40 w-full sm:w-auto shadow-sm">
          {[
            { id: "waiting", label: "Waiting" },
            { id: "submitted", label: "Submitted" },
            { id: "confirmed", label: "Confirmed" },
            { id: "failed", label: "Failed" },
            { id: "expired", label: "Expired" }
          ].map(s => (
            <button
              key={s.id}
              onClick={() => { setStatus(s.id); setPage(1); }}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-300 text-center ${
                status === s.id 
                  ? "bg-green-500 text-black shadow-[0_2px_10px_rgba(34,197,94,0.3)] scale-100" 
                  : "text-[var(--muted)] hover:bg-[var(--foreground)]/5 hover:text-[var(--foreground)] scale-95 hover:scale-100"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-green-500" size={32} />
        </div>
      ) : deposits.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-[var(--border)]/60 rounded-3xl bg-[var(--card)]/50">
          <p className="text-[var(--muted)] text-xs uppercase tracking-widest font-black">No {status} deposits found</p>
        </div>
      ) : (
        <>
          {/* MOBILE CARD VIEW */}
          <div className="md:hidden flex flex-col gap-3">
            {deposits.map(d => (
              <motion.div 
                key={d._id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative bg-[var(--card)] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-[var(--border)]/40 rounded-xl p-3 overflow-hidden flex flex-col gap-3"
              >
                {/* Top Row: User & Amount */}
                <div className="flex justify-between items-start gap-2 relative z-10">
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-bold text-[var(--foreground)] truncate leading-none mb-1">{d.userId}</span>
                    <span className="text-[9px] font-mono text-[var(--muted)] truncate leading-none">{d.depositId}</span>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-sm font-black tabular-nums text-green-400 leading-none mb-1">{d.usdtAmount} USDT</span>
                    <span className="text-[9px] font-bold text-[var(--muted)] uppercase leading-none">≈ {formatPrice(d.coinsToCredit)}</span>
                  </div>
                </div>

                {/* Middle Row: TX Hash & Network */}
                <div className="flex justify-between items-center bg-[var(--background)]/50 rounded-lg p-2 relative z-10 border border-[var(--border)]/30">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Network size={12} className="text-green-500 shrink-0" />
                    <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">{d.network}</span>
                  </div>
                  <div className="flex items-center gap-1.5 min-w-0 shrink-0">
                    {d.txHash ? (
                      <>
                        <span className="text-[10px] font-mono text-[var(--muted)] truncate w-[80px]">{d.txHash}</span>
                        <a href={`https://bscscan.com/tx/${d.txHash}`} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400 p-1 bg-green-500/10 rounded-md">
                          <ExternalLink size={10} />
                        </a>
                      </>
                    ) : (
                      <span className="text-[9px] text-amber-500 font-bold uppercase italic">Missing Hash</span>
                    )}
                  </div>
                </div>

                {/* Bottom Row: Date & Actions */}
                <div className="flex justify-between items-end relative z-10 pt-1 border-t border-[var(--border)]/30 mt-1">
                  <div className="text-[9px] font-mono text-[var(--muted)] opacity-80 leading-tight">
                    {new Date(d.createdAt).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                  
                  <div className="flex gap-1.5 shrink-0">
                    {d.status === "submitted" && (
                      <>
                        <button 
                          onClick={() => handleAction(d.depositId, "confirm")}
                          disabled={actionLoading === d.depositId}
                          className="flex items-center justify-center w-7 h-7 rounded-md bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-black transition-all active:scale-95"
                        >
                          {actionLoading === d.depositId ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} strokeWidth={2.5} />}
                        </button>
                        <button 
                          onClick={() => handleAction(d.depositId, "reject")}
                          disabled={actionLoading === d.depositId}
                          className="flex items-center justify-center w-7 h-7 rounded-md bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-95"
                        >
                          <XCircle size={14} strokeWidth={2.5} />
                        </button>
                      </>
                    )}
                    {d.status === "confirmed" && <span className="px-2 py-0.5 rounded border border-green-500/20 bg-green-500/10 text-[9px] font-black text-green-500 uppercase tracking-widest">Confirmed</span>}
                    {d.status === "failed" && <span className="px-2 py-0.5 rounded border border-red-500/20 bg-red-500/10 text-[9px] font-black text-red-500 uppercase tracking-widest">Rejected</span>}
                    {d.status === "expired" && <span className="px-2 py-0.5 rounded border border-amber-500/20 bg-amber-500/10 text-[9px] font-black text-amber-500 uppercase tracking-widest">Expired</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* DESKTOP TABLE VIEW */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-[var(--border)]/60 bg-[var(--card)] shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[var(--border)]/60 bg-[var(--background)]/30 text-[10px] uppercase tracking-widest text-[var(--muted)] font-black">
                  <th className="px-5 py-4">User / ID</th>
                  <th className="px-5 py-4">Amount</th>
                  <th className="px-5 py-4">Network Details</th>
                  <th className="px-5 py-4">Created</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]/40">
                {deposits.map(d => (
                  <tr key={d._id} className="group hover:bg-[var(--foreground)]/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <p className="text-[12px] font-bold text-[var(--foreground)] break-all">{d.userId}</p>
                      <p className="text-[10px] text-[var(--muted)] font-mono mt-0.5">{d.depositId}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-[14px] font-black text-green-400 tabular-nums">{d.usdtAmount} USDT</p>
                      <p className="text-[10px] text-[var(--muted)] font-bold mt-0.5">≈ {formatPrice(d.coinsToCredit)}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1.5">
                        <span className="inline-flex w-max items-center gap-1.5 px-2 py-0.5 rounded border border-green-500/20 bg-green-500/10 text-green-500 text-[9px] font-black uppercase tracking-widest">
                          <Network size={10} /> {d.network}
                        </span>
                        {d.txHash ? (
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-mono text-[var(--muted)] truncate max-w-[120px]" title={d.txHash}>{d.txHash}</span>
                            <a href={`https://bscscan.com/tx/${d.txHash}`} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400 hover:bg-green-500/10 p-1 rounded transition-colors">
                              <ExternalLink size={12} />
                            </a>
                          </div>
                        ) : (
                          <span className="text-[10px] text-amber-500 font-bold uppercase italic tracking-widest">Missing Hash</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-[11px] font-mono text-[var(--muted)] font-medium">
                        {new Date(d.createdAt).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-right">
                      {d.status === "submitted" && (
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleAction(d.depositId, "confirm")}
                            disabled={actionLoading === d.depositId}
                            className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-black hover:shadow-[0_0_12px_rgba(34,197,94,0.4)] transition-all active:scale-95"
                            title="Confirm & Credit"
                          >
                            {actionLoading === d.depositId ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} strokeWidth={2.5} />}
                          </button>
                          <button 
                            onClick={() => handleAction(d.depositId, "reject")}
                            disabled={actionLoading === d.depositId}
                            className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white hover:shadow-[0_0_12px_rgba(239,68,68,0.4)] transition-all active:scale-95"
                            title="Reject"
                          >
                            <XCircle size={16} strokeWidth={2.5} />
                          </button>
                        </div>
                      )}
                      {d.status === "confirmed" && <span className="inline-flex items-center px-2.5 py-1 rounded-md border border-green-500/20 bg-green-500/10 text-[10px] font-black text-green-500 uppercase tracking-widest">Confirmed</span>}
                      {d.status === "failed" && <span className="inline-flex items-center px-2.5 py-1 rounded-md border border-red-500/20 bg-red-500/10 text-[10px] font-black text-red-500 uppercase tracking-widest">Rejected</span>}
                      {d.status === "expired" && <span className="inline-flex items-center px-2.5 py-1 rounded-md border border-amber-500/20 bg-amber-500/10 text-[10px] font-black text-amber-500 uppercase tracking-widest">Expired</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 pt-4 border-t border-[var(--border)]/10">
          <button 
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-4 py-2 rounded-xl bg-[var(--card)] border border-[var(--border)] text-xs font-bold disabled:opacity-30"
          >
            Previous
          </button>
          <span className="flex items-center text-xs font-black text-[var(--muted)]">PAGE {page} OF {totalPages}</span>
          <button 
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className="px-4 py-2 rounded-xl bg-[var(--card)] border border-[var(--border)] text-xs font-bold disabled:opacity-30"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
