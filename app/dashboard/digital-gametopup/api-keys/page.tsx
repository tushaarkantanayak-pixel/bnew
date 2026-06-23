"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiPlus, FiTrash2, FiCopy, FiCheck, FiKey, FiLock,
    FiAlertCircle, FiRefreshCw, FiShield, FiGlobe,
    FiEdit2, FiSave, FiX, FiBarChart, FiMapPin
} from "react-icons/fi";
import Link from "next/link";
import { useAuthStore } from "../../../../store/useAuthStore";
import { formatPrice } from "@/utils/currency";
import apiClient from "@/utils/apiClient";


interface ApiKey {
    _id: string;
    name: string;
    lastFour: string;
    status: string;
    createdAt: string;
    lastUsed: string | null;
    lastUsedIp: string | null;
    allowedIps: string[];
    dailyLimit: number;
    usedToday: number;
    rawKey?: string;
}

export default function ApiKeysPage() {
    const { userDetails } = useAuthStore();
    const [keys, setKeys] = useState<ApiKey[]>([]);
    const [loading, setLoading] = useState(true);
    const [newKeyName, setNewKeyName] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [copiedKey, setCopiedKey] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null);

    // Security Edit States
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValues, setEditValues] = useState<{ name: string, dailyLimit: number, allowedIpString: string }>({
        name: "",
        dailyLimit: 0,
        allowedIpString: ""
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const hasFetched = useRef(false);

    const fetchKeys = async () => {
        try {
            const res = await apiClient.get("/api/user/keys");
            const data = res.data;
            if (data.success) {
                setKeys(data.keys);
            }
        } catch (err) {
            console.error("Failed to fetch keys", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetchKeys();
        }
    }, []);

    const handleCreateKey = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newKeyName.trim()) return;

        if (userDetails.userType !== "member" && userDetails.userType !== "owner") {
            setError("Only members can generate API keys.");
            setIsCreating(false);
            return;
        }

        setIsCreating(true);
        setError(null);

        try {
            const res = await apiClient.post("/api/user/keys", { name: newKeyName });
            const data = res.data;
            if (data.success) {
                setKeys([data.key, ...keys]);
                setNewlyCreatedKey(data.key.rawKey);
                setNewKeyName("");
            } else {
                setError(data.message || "Failed to create key");
            }
        } catch (err) {
            setError("Server error. Please try again.");
        } finally {
            setIsCreating(false);
        }
    };

    const handleUpdateKey = async (id: string) => {
        setIsUpdating(true);
        setError(null);
        try {
            const res = await apiClient.put(`/api/user/keys/${id}`, {
                name: editValues.name,
                dailyLimit: editValues.dailyLimit,
                allowedIps: editValues.allowedIpString.split(',').map(ip => ip.trim()).filter(ip => ip !== '')
            });
            const data = res.data;
            if (data.success) {
                setKeys(keys.map(k => k._id === id ? data.key : k));
                setEditingId(null);
            } else {
                setError(data.message || "Failed to update key");
            }
        } catch (err) {
            setError("Failed to update security settings.");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleRevokeKey = async (id: string) => {
        if (!confirm("Are you sure you want to revoke this API key? This cannot be undone.")) return;

        try {
            const res = await apiClient.delete(`/api/user/keys/${id}`);
            const data = res.data;
            if (data.success) {
                setKeys(keys.filter((k: any) => k._id !== id));
            }
        } catch (err) {
            console.error("Failed to revoke key", err);
        }
    };

    const handleRegenerateKey = async (id: string) => {
        if (!confirm("Regenerating will IMMEDIATELY invalidate your current key. Proceed?")) return;

        setError(null);
        try {
            const res = await apiClient.patch(`/api/user/keys/${id}`);
            const data = res.data;
            if (data.success) {
                setKeys(keys.map(k => k._id === id ? data.key : k));
                setNewlyCreatedKey(data.key.rawKey);
            } else {
                setError(data.message || "Failed to regenerate key");
            }
        } catch (err) {
            setError("Failed to regenerate key. Please try again.");
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedKey(text);
        setTimeout(() => setCopiedKey(null), 2000);
    };

    const startEditing = (key: ApiKey) => {
        setEditingId(key._id);
        setEditValues({
            name: key.name,
            dailyLimit: key.dailyLimit || 1000,
            allowedIpString: (key.allowedIps || []).join(', ')
        });
    };



    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-end gap-4">
                <div className="flex gap-2">
                    {keys.length < 2 && (
                        (userDetails.userType === "member" || userDetails.userType === "owner") ? (
                            <form onSubmit={handleCreateKey} className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Key Label (e.g. My Website)"
                                    value={newKeyName}
                                    onChange={(e) => setNewKeyName(e.target.value)}
                                    className="px-4 py-2 rounded-xl bg-foreground/5 border border-foreground/10 focus:border-accent outline-none transition-all text-sm w-full md:w-64"
                                    disabled={isCreating}
                                />
                                <button
                                    type="submit"
                                    disabled={isCreating || !newKeyName.trim()}
                                    className="px-4 py-2 rounded-xl bg-accent text-background font-black italic uppercase text-xs flex items-center gap-2 hover:scale-105 transition-all disabled:opacity-50"
                                >
                                    {isCreating ? <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" /> : <FiPlus />}
                                    Create Key
                                </button>
                            </form>
                        ) : (
                            <Link
                                href="/dashboard/support"
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase italic hover:bg-amber-500/20 transition-all"
                            >
                                <FiLock /> Only Member Feature - Contact Support
                            </Link>
                        )
                    )}
                </div>
            </div>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-500 text-sm font-bold"
                >
                    <FiAlertCircle />
                    {error}
                </motion.div>
            )}

            {newlyCreatedKey && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-5 rounded-2xl bg-accent/10 border border-accent/30 space-y-3 shadow-[0_0_30px_rgba(0,229,255,0.1)]"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-accent font-black italic uppercase text-sm">Secret Key Generated</h3>
                            <p className="text-muted text-[10px] font-bold uppercase tracking-widest">Copy this key safely. You cannot view it again.</p>
                        </div>
                        <button
                            onClick={() => setNewlyCreatedKey(null)}
                            className="text-muted hover:text-foreground transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="flex items-center gap-2 p-4 rounded-xl bg-foreground/5 border border-foreground/10 font-mono text-sm leading-none">
                        <span className="flex-1 truncate text-accent">{newlyCreatedKey}</span>
                        <button
                            onClick={() => copyToClipboard(newlyCreatedKey)}
                            className="p-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-all"
                        >
                            {copiedKey === newlyCreatedKey ? <FiCheck /> : <FiCopy />}
                        </button>
                    </div>
                </motion.div>
            )}

            <div className="grid gap-4">
                {loading ? (
                    <div className="h-40 animate-pulse bg-foreground/5 rounded-2xl border border-foreground/5" />
                ) : keys.length === 0 ? (
                    <div className="p-12 text-center rounded-3xl border border-dashed border-foreground/10 opacity-40">
                        <FiKey className="mx-auto mb-4" size={32} />
                        <p className="text-sm font-bold uppercase tracking-widest">No API keys active</p>
                    </div>
                ) : (
                    <AnimatePresence>
                        {keys.map((key: ApiKey) => (
                            <motion.div
                                key={key._id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="group p-0.5 rounded-2xl bg-gradient-to-br from-foreground/10 to-transparent border border-foreground/5 hover:border-accent/30 transition-all shadow-xl"
                            >
                                <div className="p-4 rounded-xl bg-card/80 backdrop-blur-sm">
                                    <div className="flex flex-col md:flex-row gap-4">
                                        {/* Main Info */}
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                                                        <FiShield size={20} />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-black italic uppercase text-base leading-none mb-1">{key.name}</h3>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] bg-foreground/10 px-2 py-0.5 rounded font-mono text-foreground/60">TK_****{key.lastFour}</span>
                                                            <button
                                                                onClick={() => alert("For security, full API keys are only shown once during creation. If you've lost your key, please use the 'Regenerate' option to get a new one.")}
                                                                className="text-[8px] font-black uppercase text-accent hover:underline"
                                                            >
                                                                Show Full Key?
                                                            </button>
                                                            {key.allowedIps?.length > 0 && (
                                                                <span className="text-[8px] bg-accent text-background font-black uppercase px-1.5 rounded-sm">IP Locked</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => editingId === key._id ? setEditingId(null) : startEditing(key)}
                                                        className={`p-2 rounded-xl transition-all ${editingId === key._id ? 'bg-foreground/10 text-foreground' : 'bg-accent/10 text-accent hover:bg-accent/20'}`}
                                                    >
                                                        {editingId === key._id ? <FiX /> : <FiEdit2 />}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Usage Progress */}
                                            <div className="space-y-1.5 pt-2">
                                                <div className="flex justify-between text-[10px] font-black uppercase italic">
                                                    <span className="text-foreground/60 flex items-center gap-1"><FiBarChart /> Daily Budget</span>
                                                    <span className="text-accent">{formatPrice(key.usedToday || 0)} / {formatPrice(key.dailyLimit || 1000)}</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-foreground/10 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${Math.min(((key.usedToday || 0) / (key.dailyLimit || 1000)) * 100, 100)}%` }}
                                                        className={`h-full rounded-full ${(key.usedToday || 0) > (key.dailyLimit || 1000) * 0.8 ? 'bg-red-500' : 'bg-accent'}`}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="p-2 rounded-xl bg-foreground/5 border border-foreground/5">
                                                    <p className="text-[8px] font-bold uppercase text-foreground/50 mb-0.5 flex items-center gap-1"><FiGlobe /> Last IP</p>
                                                    <p className="text-xs font-mono text-foreground/80">{key.lastUsedIp || "Never used"}</p>
                                                </div>
                                                <div className="p-2 rounded-xl bg-foreground/5 border border-foreground/5">
                                                    <p className="text-[8px] font-bold uppercase text-foreground/50 mb-1 flex items-center gap-1"><FiMapPin /> Status</p>
                                                    <p className="text-xs font-black italic uppercase text-green-500">Live & Secure</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions or Edit Form */}
                                        <div className="w-full md:w-72 border-t md:border-t-0 md:border-l border-foreground/10 pt-3 md:pt-0 md:pl-4 flex flex-col justify-between">
                                            {editingId === key._id ? (
                                                <div className="space-y-2">
                                                    <div className="space-y-1">
                                                        <label className="text-[9px] font-black uppercase text-foreground/60 ml-1">Daily Limit ($)</label>
                                                        <input
                                                            type="number"
                                                            min={1}
                                                            max={1000}
                                                            value={editValues.dailyLimit}
                                                            onChange={(e) => setEditValues({ ...editValues, dailyLimit: Math.min(parseInt(e.target.value) || 1, 1000) })}
                                                            className="w-full bg-background border border-foreground/20 rounded-xl px-3 py-1.5 text-xs outline-none focus:border-accent transition-all"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[9px] font-black uppercase text-foreground/60 ml-1">Allowed IPs (Optional - Comma separated)</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Leave empty for all"
                                                            value={editValues.allowedIpString}
                                                            onChange={(e) => setEditValues({ ...editValues, allowedIpString: e.target.value })}
                                                            className="w-full bg-background border border-foreground/20 rounded-xl px-3 py-1.5 text-xs outline-none focus:border-accent transition-all font-mono"
                                                        />
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleUpdateKey(key._id)}
                                                            disabled={isUpdating}
                                                            className="flex-1 bg-accent text-background font-black uppercase italic text-[10px] py-2 rounded-xl flex items-center justify-center gap-2"
                                                        >
                                                            {isUpdating ? "..." : <><FiSave /> Save</>}
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-2">
                                                    <button
                                                        onClick={() => handleRegenerateKey(key._id)}
                                                        className="w-full p-2.5 rounded-xl bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 transition-all flex items-center justify-center gap-2 text-xs font-black uppercase italic"
                                                    >
                                                        <FiRefreshCw size={14} /> Regenerate
                                                    </button>
                                                    <button
                                                        onClick={() => handleRevokeKey(key._id)}
                                                        className="w-full p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all flex items-center justify-center gap-2 text-xs font-black uppercase italic"
                                                    >
                                                        <FiTrash2 size={14} /> Revoke Key
                                                    </button>

                                                    <div className="pt-2 text-[8px] text-foreground/40 text-center font-bold uppercase tracking-widest leading-relaxed">
                                                        Use with caution. Revoking or Regenerating is irreversible.
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/10 space-y-2">
                    <h4 className="text-amber-500 text-xs font-black uppercase tracking-widest flex items-center gap-2 text-balance">
                        <FiAlertCircle /> Security is Active
                    </h4>
                    <p className="text-muted text-[10px] leading-relaxed font-bold opacity-60">
                        1. <b>Lock by IP (Optional):</b> Only allow certain computers to use your key.<br />
                        2. <b>Daily Limits:</b> Stop spending if it goes over your limit.
                    </p>
                </div>

                <div className="p-5 rounded-2xl bg-accent/5 border border-accent/10 space-y-3">
                    <div className="flex items-center justify-between">
                        <h4 className="text-accent text-xs font-black uppercase tracking-widest flex items-center gap-2">
                            <FiKey /> Developer Files
                        </h4>
                        <a href="/api-docs.html" target="_blank" className="text-[10px] font-black uppercase italic text-accent hover:underline">
                            v1.0 API Specs 📄
                        </a>
                    </div>
                    <div className="space-y-3">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-foreground/50 uppercase">API URL</p>
                            <code className="text-[10px] bg-foreground/10 px-2 py-1 rounded block truncate text-accent font-mono">
                                https://bluebuff.in/api/service
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
