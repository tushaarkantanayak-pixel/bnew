"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  RefreshCcw,
  Mail,
  Phone,
  Clock,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  ChevronRight,
  ChevronDown,
  Filter,
  Inbox
} from "lucide-react";
import apiClient from "@/utils/apiClient";

export default function SupportQueriesTab() {
  const [queries, setQueries] = useState([]);
  const [activeQuery, setActiveQuery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 1,
  });

  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    today: 0,
  });

  useEffect(() => {
    fetchQueriesStats();
  }, []);

  useEffect(() => {
    fetchQueriesList();
  }, [page, limit, search]);

  /* ================= FETCH QUERIES STATS ================= */
  const fetchQueriesStats = async () => {
    try {
      const res = await apiClient.get(`/api/admin/support-queries`);
      const data = res.data;
      if (data.success) {
        setStats(data.stats || { total: 0, open: 0, today: 0 });
        setPagination(prev => ({ ...prev, total: data.stats?.total || 0 }));
      }
    } catch (err) {
      console.error("Fetch queries stats failed", err);
    }
  };

  /* ================= FETCH QUERIES LIST ================= */
  const fetchQueriesList = async () => {
    try {
      setLoading(true);

      const res = await apiClient.get(
        `/api/admin/support-queries/data?page=${page}&limit=${limit}&search=${search}`
      );

      const data = res.data;
      setQueries(data?.data || []);
      setPagination(
        data?.pagination || { total: 0, page: 1, totalPages: 1 }
      );
    } catch (err) {
      console.error("Fetch support queries data failed", err);
      setQueries([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE QUERY STATUS ================= */
  const updateQueryStatus = async (id, status) => {
    try {
      setUpdating(true);

      const res = await apiClient.patch("/api/admin/support-queries/status", { id, status });

      if (res.status !== 200 && res.status !== 201) {
        const data = res.data;
        alert(data.message || "Failed to update status");
        return;
      }

      fetchQueriesList();
      fetchQueriesStats();
    } finally {
      setUpdating(false);
    }
  };

  const statusMeta = {
    open: {
      label: "Open",
      class: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      icon: <AlertCircle size={12} />
    },
    in_progress: {
      label: "In Progress",
      class: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      icon: <RefreshCcw size={12} className="animate-spin-slow" />
    },
    resolved: {
      label: "Resolved",
      class: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      icon: <CheckCircle2 size={12} />
    },
    closed: {
      label: "Closed",
      class: "bg-[var(--foreground)]/[0.05] text-[var(--muted)] border-[var(--border)]",
      icon: <X size={12} />
    },
  };

  const getStatus = (status) => status || "open";

  return (
    <div className="space-y-4 pb-6 px-4 md:px-0 max-w-full overflow-x-hidden">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--foreground)] flex items-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] hidden sm:block" />
           Support
        </h2>
          <button
            onClick={() => { fetchQueriesStats(); fetchQueriesList(); }}
            className="w-8 h-8 rounded-full bg-[var(--card)] border border-[var(--border)]/60 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] flex items-center justify-center transition-all shadow-sm active:scale-95 outline-none"
          >
            <RefreshCcw size={12} className={loading ? "animate-spin" : ""} strokeWidth={2.5} />
          </button>
      </div>



      {/* ================= SEARCH & FILTER ================= */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--accent)]" size={14} strokeWidth={2.5} />
          <input
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search queries..."
            className="w-full h-9 pl-9 pr-4 rounded-full border border-[var(--border)]/60 bg-[var(--card)] shadow-sm text-[var(--foreground)] text-[11px] font-bold outline-none focus:ring-1 focus:ring-[var(--accent)]/50 focus:border-[var(--accent)] transition-all placeholder:text-[var(--muted)]/40 placeholder:font-medium"
          />
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 flex flex-col items-center justify-center space-y-3"
            >
              <Loader2 className="animate-spin text-[var(--accent)]" size={32} />
              <p className="text-xs font-bold text-[var(--muted)]/40 uppercase tracking-widest">Loading...</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              {queries.map((q, idx) => {
                const status = getStatus(q.status);
                const meta = statusMeta[status];

                return (
                  <motion.div
                    key={q._id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    onClick={() => setActiveQuery(q)}
                    className="group relative rounded-xl border border-[var(--border)]/40 shadow-sm bg-[var(--card)] active:scale-[0.98] transition-all cursor-pointer p-3 flex items-center gap-3 overflow-hidden"
                  >
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-md"
                      style={{ backgroundColor: meta.label === 'Open' ? '#f59e0b' : meta.label === 'Resolved' ? '#10b981' : '#3b82f6' }}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded border text-[7px] font-black uppercase tracking-widest leading-none ${meta.class}`}>
                          {React.cloneElement(meta.icon, { size: 8, strokeWidth: 3 })}
                          {meta.label}
                        </span>
                        <span className="text-[8px] font-bold text-[var(--muted)]/50 truncate tracking-widest uppercase leading-none">
                          {new Date(q.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <h4 className="text-[11px] font-bold text-[var(--foreground)] truncate group-hover:text-[var(--accent)] leading-tight">
                        {q.email || "Unknown User"}
                      </h4>

                      <p className="text-[10px] text-[var(--muted)]/70 truncate mt-0.5 leading-tight font-medium">
                        {q.message}
                      </p>
                    </div>

                    <div className="w-6 h-6 rounded-full bg-[var(--foreground)]/[0.03] border border-[var(--border)]/40 flex items-center justify-center text-[var(--muted)]/60 shrink-0 shadow-sm">
                      <ChevronRight size={12} strokeWidth={2.5} />
                    </div>
                  </motion.div>
                );
              })}

              {!queries.length && (
                <div className="py-16 text-center border border-dashed border-[var(--border)] rounded-2xl">
                  <Inbox className="mx-auto text-[var(--muted)]/20 mb-2" size={32} />
                  <p className="text-[10px] font-bold text-[var(--muted)]/40 uppercase tracking-widest">No queries found</p>
                </div>
              )}

              {/* ================= PAGINATION ================= */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-between pt-6">
                  <p className="text-[10px] font-bold text-[var(--muted)]/40 uppercase">
                    Page {pagination.page} / {pagination.totalPages}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 rounded-xl border border-[var(--border)] text-[10px] font-bold uppercase text-[var(--muted)] hover:text-[var(--foreground)] disabled:opacity-20 transition-all"
                    >
                      Prev
                    </button>
                    <button
                      onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                      disabled={page === pagination.totalPages}
                      className="px-4 py-2 rounded-xl border border-[var(--border)] text-[10px] font-bold uppercase text-[var(--muted)] hover:text-[var(--foreground)] disabled:opacity-20 transition-all"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {activeQuery && (
          <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveQuery(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-[var(--background)] border border-[var(--border)] rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
                <h3 className="text-base font-bold text-[var(--foreground)]">Query Details</h3>
                <button
                  onClick={() => setActiveQuery(null)}
                  className="w-8 h-8 rounded-full bg-[var(--foreground)]/[0.05] flex items-center justify-center text-[var(--muted)]/40 hover:text-[var(--foreground)] hover:bg-red-500/20 transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <DetailBlock label="Email" value={activeQuery.email || "N/A"} icon={<Mail size={12} />} />
                  <DetailBlock label="Phone" value={activeQuery.phone || "N/A"} icon={<Phone size={12} />} />
                  <DetailBlock label="Order ID" value={activeQuery.orderId || "N/A"} icon={<MessageSquare size={12} />} />
                  <DetailBlock label="Type" value={activeQuery.type} emphasize icon={<MessageSquare size={12} />} />
                  <DetailBlock label="Date" value={new Date(activeQuery.createdAt).toLocaleString()} icon={<Clock size={12} />} />
                </div>

                <div className="space-y-2 p-4 rounded-xl bg-[var(--foreground)]/[0.03] border border-[var(--border)]">
                  <p className="text-[10px] font-bold text-[var(--muted)]/40 uppercase">Message</p>
                  <p className="text-sm font-medium leading-relaxed text-[var(--foreground)]">
                    {activeQuery.message}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-[var(--border)]">
                  <p className="text-[10px] font-bold text-[var(--muted)]/40 uppercase ml-1">Status</p>
                  <CustomDropdown
                    value={getStatus(activeQuery.status)}
                    onChange={(newStatus) => {
                      updateQueryStatus(activeQuery._id, newStatus);
                      setActiveQuery(null);
                    }}
                    disabled={updating}
                    options={[
                      { value: "open", label: "Open" },
                      { value: "in_progress", label: "In Progress" },
                      { value: "resolved", label: "Resolved" },
                      { value: "closed", label: "Closed" },
                    ]}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================= CUSTOM DROPDOWN ================= */
function CustomDropdown({ value, onChange, options, disabled }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          flex items-center justify-between w-full h-11 px-4 
          rounded-xl border border-[var(--border)] bg-[var(--foreground)]/[0.04] 
          text-xs font-bold uppercase transition-all
          ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[var(--foreground)]/[0.08] active:scale-[0.98]"}
          ${isOpen ? "border-[var(--accent)] ring-1 ring-[var(--accent)]/30" : "text-[var(--foreground)]"}
        `}
      >
        <span className={value === "resolved" ? "text-emerald-500" : value === "in_progress" ? "text-blue-500" : value === "open" ? "text-amber-500" : "text-[var(--foreground)]/40"}>
          {selectedOption?.label}
        </span>
        <ChevronDown size={14} className={`transition-transform duration-300 text-[var(--muted)] ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute z-[1110] w-full rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-2xl p-1 overflow-hidden backdrop-blur-xl"
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`
                  w-full px-4 py-2.5 text-left text-[10px] font-bold uppercase rounded-lg transition-all
                  ${option.value === value
                    ? "bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/20"
                    : "text-[var(--foreground)]/60 hover:bg-[var(--foreground)]/[0.05] hover:text-[var(--foreground)]"}
                `}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DetailBlock({ label, value, emphasize, icon }) {
  return (
    <div className="space-y-0.5">
      <p className="text-[10px] font-bold text-[var(--muted)]/40 uppercase flex items-center gap-1.5">
        <span className="text-[var(--accent)]">{icon}</span> {label}
      </p>
      <p className={`text-sm font-bold ${emphasize ? "text-[var(--accent)] capitalize italic" : "text-[var(--foreground)]"}`}>
        {value}
      </p>
    </div>
  );
}

function InsightCard({ label, value, color, pulse }) {
  const colors = {
    blue: "text-blue-500 bg-blue-500/5 border-blue-500/10",
    amber: "text-amber-500 bg-amber-500/5 border-amber-500/10",
    purple: "text-purple-500 bg-purple-500/5 border-purple-500/10",
    emerald: "text-emerald-500 bg-emerald-500/5 border-emerald-500/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-xl border ${colors[color]} flex flex-col items-center justify-center text-center relative overflow-hidden bg-[var(--card)]`}
    >
      {pulse && (
        <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-current animate-ping" />
      )}
      <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-tight opacity-60 mb-0.5">{label}</span>
      <span className="text-xs sm:text-sm font-black tabular-nums whitespace-nowrap">{value}</span>
    </motion.div>
  );
}
