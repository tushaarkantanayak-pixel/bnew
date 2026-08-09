"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Percent,
  Coins,
  Settings2,
  Trash2,
  RefreshCcw,
  Gamepad2,
  Save,
  ChevronDown,
  Info,
  Shield,
  DollarSign,
  Loader2,
  Package,
  Power,
  PowerOff
} from "lucide-react";

import apiClient from "@/utils/apiClient";

const API_BASE = "https://game-off-ten.vercel.app/api/v1";

export default function PricingTab({
  pricingType,
  setPricingType,
  slabs,
  setSlabs,
  overrides,
  setOverrides,
  savingPricing,
  onSave,
}) {
  const [pricingMode, setPricingMode] = useState("percent");
  const [games, setGames] = useState([]);
  const [itemsByGame, setItemsByGame] = useState({});
  const [fixedGameFilter, setFixedGameFilter] = useState("");
  const [fixedItemFilter, setFixedItemFilter] = useState("");
  const [loadingFixedPrices, setLoadingFixedPrices] = useState(false);
  const [bulkPercent, setBulkPercent] = useState("");

  /* ===== DISABLED ITEMS STATE ===== */
  const [disabledKeys, setDisabledKeys] = useState(new Set());
  const [toggling, setToggling] = useState(new Set());

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/games/list`);
        const json = await res.json();
        if (json.success) setGames(json.data.games);
      } catch (e) {
        console.error("Game fetch failed", e);
      }
    })();
  }, []);

  useEffect(() => {
    // Fetch disabled keys on mount
    apiClient.get("/api/admin/disabled-items")
      .then(res => {
        if (res.data?.success) {
          setDisabledKeys(new Set(res.data.data || []));
        }
      })
      .catch(() => {});
  }, []);

  const toggleItem = async (gameSlug, itemSlug) => {
    const key = `${gameSlug}_${itemSlug}`;
    const willDisable = !disabledKeys.has(key);

    setToggling(prev => new Set([...prev, key]));
    try {
      const res = await apiClient.patch("/api/admin/disabled-items", {
        itemKey: key,
        disabled: willDisable,
      });

      if (res.data?.success) {
        setDisabledKeys(prev => {
          const next = new Set(prev);
          willDisable ? next.add(key) : next.delete(key);
          return next;
        });
      }
    } catch (err) {
      console.error("Failed to toggle item", err);
    } finally {
      setToggling(prev => { const n = new Set(prev); n.delete(key); return n; });
    }
  };

  const fetchItemsForGame = async (gameSlug) => {
    if (!gameSlug) return [];
    if (itemsByGame[gameSlug]) return itemsByGame[gameSlug];

    try {
      const res = await fetch(`${API_BASE}/games/${gameSlug}/items`);
      const json = await res.json();
      if (json.success) {
        let items = json.data.items || [];

        /* ================= INJECT COMBO OFFERS (ADMIN) ================= */
        const weeklyPass = items.find((i) => i.itemSlug === "weekly-pass816");
        if (weeklyPass) {
          const combos = [
            { multiplier: 2, label: "2x" },
            { multiplier: 3, label: "3x" },
          ];

          combos.forEach((combo) => {
            const comboSlug = `${weeklyPass.itemSlug}-${combo.multiplier}x`;
            if (!items.find((i) => i.itemSlug === comboSlug)) {
              items.push({
                ...weeklyPass,
                itemName: `${combo.label} ${weeklyPass.itemName}`,
                itemSlug: comboSlug,
                sellingPrice: Number(weeklyPass.sellingPrice) * combo.multiplier,
                index: weeklyPass.index + combo.multiplier * 0.1,
              });
            }
          });
          items.sort((a, b) => (Number(a.sellingPrice) || 0) - (Number(b.sellingPrice) || 0));
        }

        setItemsByGame((p) => ({ ...p, [gameSlug]: items }));
        return items;
      }
    } catch (e) {
      console.error("Item fetch failed", e);
    }
    return [];
  };

  const hydrateFixedPricing = async (gameSlug) => {
    if (!gameSlug) return;
    setLoadingFixedPrices(true);
    try {
      const items = await fetchItemsForGame(gameSlug);
      const hydrated = items.map((item) => {
        const existing = overrides.find(
          (o) => o.gameSlug === gameSlug && o.itemSlug === item.itemSlug
        );
        return {
          gameSlug,
          itemSlug: item.itemSlug,
          itemName: item.itemName,
          fixedPrice: existing?.fixedPrice !== undefined 
            ? Number(Number(existing.fixedPrice).toFixed(2)) 
            : Number(Number(item.sellingPrice || 0).toFixed(2)),
          useOverride: existing?.useOverride ?? false,
        };
      });
      setOverrides(hydrated);
      setFixedItemFilter("");
    } finally {
      setLoadingFixedPrices(false);
    }
  };

  useEffect(() => {
    if (pricingMode !== "fixed") return;
    if (!fixedGameFilter) return;
    hydrateFixedPricing(fixedGameFilter);
  }, [pricingMode, pricingType, fixedGameFilter]);

  const visibleOverrides = useMemo(() => {
    return overrides.filter((o) => {
      if (fixedGameFilter && o.gameSlug !== fixedGameFilter) return false;
      if (fixedItemFilter && o.itemSlug !== fixedItemFilter) return false;
      return true;
    });
  }, [overrides, fixedGameFilter, fixedItemFilter]);

  const updateOverridePrice = (i, value) => {
    setOverrides(prev => prev.map((item, idx) => 
      idx === i ? { ...item, fixedPrice: Math.max(0, Number(value) || 0) } : item
    ));
  };

  const toggleOverride = (i) => {
    setOverrides(prev => prev.map((item, idx) => 
      idx === i ? { ...item, useOverride: !item.useOverride } : item
    ));
  };

  const applyBulkPercentage = () => {
    const percent = Number(bulkPercent);
    if (!Number.isFinite(percent) || percent === 0) return;
    const multiplier = 1 + percent / 100;
    const next = overrides.map((o) => {
      if ((fixedGameFilter && o.gameSlug !== fixedGameFilter) || (fixedItemFilter && o.itemSlug !== fixedItemFilter)) {
        return o;
      }
      return { ...o, fixedPrice: Number((o.fixedPrice * multiplier).toFixed(2)) };
    });
    setOverrides(next);
    setBulkPercent("");
  };

  const updateSlab = (i, key, value) => {
    const next = [...slabs];
    next[i][key] = Math.max(0, Number(value) || 0);
    setSlabs(next);
  };

  const addSlab = () => setSlabs([...slabs, { min: 0, max: 0, percent: 0 }]);
  const deleteSlab = (i) => setSlabs(slabs.filter((_, idx) => idx !== i));
  const canSave = !savingPricing && ((pricingMode === "percent" && slabs.length) || (pricingMode === "fixed" && overrides.length));

  return (
    <div className="space-y-4 pb-20 max-w-full overflow-x-hidden">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2 md:px-0">
        <div className="space-y-0.5">
          <h2 className="text-lg font-black tracking-tight text-[var(--foreground)] flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            Set Prices
          </h2>
          <p className="text-[11px] text-[var(--muted)] font-medium">Manage how much you charge users for different items.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-[var(--card)] p-1 rounded-full border border-[var(--border)]/60 shadow-sm w-full sm:w-auto">
            {[{ id: "percent", label: "Profit (%)", icon: <Percent size={12} strokeWidth={2.5} /> }, { id: "fixed", label: "Fixed Price", icon: <Coins size={12} strokeWidth={2.5} /> }].map((m) => (
              <button
                key={m.id}
                onClick={() => setPricingMode(m.id)}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${pricingMode === m.id
                  ? "bg-[var(--accent)] text-white shadow-[0_2px_10px_rgba(var(--accent-rgb),0.3)] scale-100"
                  : "text-[var(--muted)] hover:bg-[var(--foreground)]/[0.03] hover:text-[var(--foreground)] scale-95 hover:scale-100"
                  }`}
              >
                {m.icon}
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 px-0 md:px-0 mt-2">
        {/* ================= MAIN CONFIGURATION AREA ================= */}
        <div className="lg:col-span-8 space-y-4">
          {/* TARGET ROLE SELECTOR */}
          <div className="p-3.5 sm:p-4 rounded-[1rem] border border-[var(--border)]/40 bg-[var(--card)] shadow-sm space-y-3 relative overflow-hidden">
            <div className="flex items-center gap-2 relative z-10">
              <Settings2 size={14} className="text-[var(--accent)]" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted)]">Target Roles</h3>
            </div>
            <div className="flex flex-row gap-2 relative z-10">
              {["user", "member"].map((type) => (
                <button
                  key={type}
                  onClick={() => setPricingType(type)}
                  className={`flex-1 h-9 rounded-xl border text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${pricingType === type
                    ? "bg-[var(--accent)] border-[var(--accent)] text-white shadow-[0_2px_12px_rgba(var(--accent-rgb),0.25)]"
                    : "bg-[var(--foreground)]/[0.02] border-[var(--border)]/60 text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/[0.05]"
                    }`}
                >
                  {type}s
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {pricingMode === "percent" ? (
              <motion.div
                key="markup"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                className="p-3.5 sm:p-5 rounded-[1rem] border border-[var(--border)]/40 bg-[var(--card)] shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
                      <Percent size={14} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-sm font-black text-[var(--foreground)] tracking-tight">Set Profit Based on Price</h3>
                  </div>
                  <button
                    onClick={addSlab}
                    className="w-full sm:w-auto h-9 px-4 rounded-full bg-[var(--accent)] text-white text-[10px] font-bold uppercase tracking-wider hover:shadow-[0_2px_12px_rgba(var(--accent-rgb),0.3)] active:scale-95 transition-all outline-none"
                  >
                    + New Price Range
                  </button>
                </div>

                <div className="space-y-1.5">
                  <div className="hidden sm:grid grid-cols-12 gap-2 px-2 text-[9px] font-black uppercase tracking-widest text-[var(--muted)]/70">
                    <div className="col-span-4">Minimum Price ($)</div>
                    <div className="col-span-4">Maximum Price ($)</div>
                    <div className="col-span-3">Add Profit (%)</div>
                    <div className="col-span-1"></div>
                  </div>

                  {slabs.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-2.5 items-center p-2.5 sm:p-2 rounded-xl border border-[var(--border)]/60 bg-[var(--card)] shadow-sm"
                    >
                      <div className="col-span-4 flex items-center gap-2 sm:block sm:gap-0">
                        <label className="sm:hidden w-24 shrink-0 text-[10px] font-bold text-[var(--muted)]/70 uppercase tracking-widest">Min Price</label>
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)] text-[11px]">$</span>
                          <input
                            type="number"
                            value={s.min}
                            onChange={(e) => updateSlab(i, "min", e.target.value)}
                            className="w-full h-8 pl-6 pr-3 rounded-lg bg-[var(--foreground)]/[0.02] border border-[var(--border)]/60 text-[var(--foreground)] font-semibold text-xs outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/20 transition-all font-mono"
                            placeholder="0"
                          />
                        </div>
                      </div>
                      <div className="col-span-4 flex items-center gap-2 sm:block sm:gap-0">
                        <label className="sm:hidden w-24 shrink-0 text-[10px] font-bold text-[var(--muted)]/70 uppercase tracking-widest">Max Price</label>
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)] text-[11px]">$</span>
                          <input
                            type="number"
                            value={s.max}
                            onChange={(e) => updateSlab(i, "max", e.target.value)}
                            className="w-full h-8 pl-6 pr-3 rounded-lg bg-[var(--foreground)]/[0.02] border border-[var(--border)]/60 text-[var(--foreground)] font-semibold text-xs outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/20 transition-all font-mono"
                            placeholder="1000"
                          />
                        </div>
                      </div>
                      <div className="col-span-3 flex items-center gap-2 sm:block sm:gap-0">
                        <label className="sm:hidden w-24 shrink-0 text-[10px] font-bold text-[var(--muted)]/70 uppercase tracking-widest">Profit (%)</label>
                        <div className="relative flex-1">
                          <input
                            type="number"
                            value={s.percent}
                            onChange={(e) => updateSlab(i, "percent", e.target.value)}
                            className="w-full h-8 pl-3 pr-7 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] font-black text-xs outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20 transition-all"
                            placeholder="5"
                          />
                          <Percent size={10} strokeWidth={3} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--accent)]/60" />
                        </div>
                      </div>
                      <div className="col-span-1 flex justify-end sm:justify-center">
                        <button
                          onClick={() => deleteSlab(i)}
                          className="p-1.5 rounded-md text-[var(--muted)]/60 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </motion.div>
                  ))}

                  {!slabs.length && (
                    <div className="py-16 text-center border border-dashed border-[var(--border)] rounded-2xl">
                      <p className="text-xs font-medium text-[var(--muted)]">No markup ranges defined.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="fixed"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                className="space-y-4"
              >
                {/* GAME SELECTION */}
                <div className="p-3.5 sm:p-5 rounded-[1rem] border border-[var(--border)]/40 bg-[var(--card)] shadow-sm space-y-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                      <Coins size={14} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-sm font-black text-[var(--foreground)] tracking-tight">Set Custom Prices for Items</h3>
                  </div>

                  <div className="relative">
                    <Gamepad2 className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]/60" size={14} />
                    <select
                      value={fixedGameFilter}
                      onChange={(e) => setFixedGameFilter(e.target.value)}
                      className="w-full h-9 pl-9 pr-8 rounded-lg border border-[var(--border)]/60 bg-[var(--foreground)]/[0.02] text-[var(--foreground)] font-bold text-xs outline-none appearance-none cursor-pointer focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/20 transition-all [color-scheme:dark]"
                    >
                      <option value="">Choose a Game...</option>
                      {games.map((g) => (
                        <option key={g.gameSlug} value={g.gameSlug}>
                          {g.gameName}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]/40 pointer-events-none" size={14} />
                  </div>

                  {fixedGameFilter && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-2.5 rounded-lg bg-[var(--accent)]/5 border border-[var(--accent)]/10">
                      <div className="flex items-center gap-2">
                        <Info size={12} className="text-[var(--accent)]" />
                        <span className="text-[9px] font-black text-[var(--accent)] uppercase tracking-widest shrink-0">Bulk Adjust</span>
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:flex-none sm:w-32">
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-black text-[var(--accent)]">%</span>
                          <input
                            type="number"
                            placeholder="+10 or -5"
                            value={bulkPercent}
                            onChange={(e) => setBulkPercent(e.target.value)}
                            className="w-full h-7 pl-7 pr-2 rounded-md bg-[var(--background)] border border-[var(--accent)]/20 text-[var(--foreground)] font-bold text-[11px] tabular-nums outline-none focus:border-[var(--accent)]/50 transition-all placeholder:text-[var(--muted)]/40"
                          />
                        </div>
                        <button
                          onClick={applyBulkPercentage}
                          disabled={!bulkPercent}
                          className="px-4 h-7 rounded-md bg-[var(--accent)] text-white text-[9px] font-black uppercase tracking-widest shadow-sm disabled:opacity-30 active:scale-95 transition-all shrink-0"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* ITEMS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                  <AnimatePresence>
                    {loadingFixedPrices ? (
                      <div className="col-span-full py-16 flex flex-col items-center justify-center opacity-40">
                        <Loader2 size={24} className="animate-spin text-[var(--accent)] mb-3" />
                        <p className="text-[9px] font-black uppercase tracking-widest">Fetching Prices...</p>
                      </div>
                    ) : (
                      visibleOverrides.map((o, idx) => (
                        <motion.div
                          key={o.itemSlug}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.01 }}
                          className="p-2.5 sm:p-3 rounded-xl border border-[var(--border)]/60 bg-[var(--card)] shadow-sm hover:shadow-md transition-all flex flex-col gap-2 relative overflow-hidden"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex flex-col min-w-0 pr-2">
                              <p className="text-[11px] font-bold text-[var(--foreground)] truncate leading-tight" title={o.itemName || o.itemSlug}>{o.itemName || o.itemSlug}</p>
                              <p className="text-[9px] font-bold text-[var(--muted)]/50 uppercase tracking-widest truncate leading-tight mt-0.5">{o.gameSlug}</p>
                            </div>
                            
                            <div className="flex items-center gap-1.5 shrink-0">
                              {/* OVERRIDE TOGGLE */}
                              <div className="flex flex-col items-center gap-0.5">
                                <button
                                  onClick={() => toggleOverride(overrides.findIndex((x) => x.itemSlug === o.itemSlug))}
                                  className={`w-7 h-4 rounded-full flex items-center p-0.5 transition-colors ${o.useOverride ? 'bg-[var(--accent)] shadow-[0_0_8px_rgba(var(--accent-rgb),0.4)]' : 'bg-[var(--foreground)]/10'}`}
                                >
                                  <div className={`w-3 h-3 rounded-full bg-white transition-transform ${o.useOverride ? 'translate-x-3' : 'translate-x-0'}`} />
                                </button>
                                <span className={`text-[7px] font-black uppercase tracking-widest ${o.useOverride ? 'text-[var(--accent)]' : 'text-[var(--muted)]/40'}`}>Override</span>
                              </div>
                              
                              <div className="w-px h-6 bg-[var(--border)]/60 mx-0.5" />
                              
                              {/* OUT OF SERVICE TOGGLE */}
                              <div className="flex flex-col items-center gap-0.5">
                                <button
                                  onClick={() => toggleItem(o.gameSlug, o.itemSlug)}
                                  disabled={toggling.has(`${o.gameSlug}_${o.itemSlug}`)}
                                  className={`w-7 h-4 rounded-full flex items-center p-0.5 transition-colors ${disabledKeys.has(`${o.gameSlug}_${o.itemSlug}`) ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]'} disabled:opacity-50`}
                                  title={disabledKeys.has(`${o.gameSlug}_${o.itemSlug}`) ? "Currently Out of Service" : "Currently Active"}
                                >
                                  <div className={`w-3 h-3 rounded-full bg-white flex items-center justify-center transition-transform ${disabledKeys.has(`${o.gameSlug}_${o.itemSlug}`) ? 'translate-x-3' : 'translate-x-0'}`} />
                                </button>
                                <span className={`text-[7px] font-black uppercase tracking-widest ${disabledKeys.has(`${o.gameSlug}_${o.itemSlug}`) ? 'text-red-500' : 'text-green-500'}`}>
                                  {disabledKeys.has(`${o.gameSlug}_${o.itemSlug}`) ? 'Disabled' : 'Active'}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between gap-3 pt-1.5 border-t border-[var(--border)]/30 mt-auto">
                            <label className="text-[9px] font-bold text-[var(--muted)]/60 uppercase tracking-widest shrink-0">Selling Price</label>
                            <div className="relative flex-1 opacity-100 transition-opacity max-w-[120px]" style={{ opacity: o.useOverride ? 1 : 0.4 }}>
                              <DollarSign size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--accent)]" />
                              <input
                                type="number"
                                value={o.fixedPrice}
                                onChange={(e) =>
                                  updateOverridePrice(
                                    overrides.findIndex((x) => x.itemSlug === o.itemSlug),
                                    e.target.value
                                  )
                                }
                                className="w-full h-7 pl-7 pr-2 rounded-lg bg-[var(--foreground)]/[0.02] border border-[var(--border)]/60 text-[var(--foreground)] font-bold text-[11px] tabular-nums outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/20 transition-all font-mono shadow-sm"
                                placeholder="0.00"
                                disabled={!o.useOverride}
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================= PRICING SUMMARY SIDEBAR ================= */}
        <div className="lg:col-span-4 space-y-4">
          <div className="lg:sticky lg:top-6 p-5 sm:p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-5">
            <div className="flex items-center gap-3 border-b border-[var(--border)] pb-4">
              <Shield size={18} className="text-[var(--accent)]" />
              <h3 className="text-base font-bold text-[var(--foreground)]">Pricing Summary</h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-medium">
                <span className="text-[var(--muted)]">Price Type</span>
                <span className="text-[var(--foreground)] font-bold capitalize">{pricingMode === 'percent' ? 'Profit (%)' : 'Fixed Price'}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-medium">
                <span className="text-[var(--muted)]">Applies To</span>
                <span className="text-white bg-[var(--accent)] px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize tracking-wide">{pricingType}s</span>
              </div>
              <div className="flex justify-between items-center text-xs font-medium">
                <span className="text-[var(--muted)]">Total Items</span>
                <span className="text-[var(--foreground)] font-bold tabular-nums">{pricingMode === 'percent' ? slabs.length : visibleOverrides.length}</span>
              </div>
            </div>

            <div className="h-px bg-[var(--border)] w-full opacity-30 shadow-sm" />

            <button
              onClick={onSave}
              disabled={!canSave}
              className={`
                  w-full h-12 rounded-xl flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-wider transition-all outline-none
                  ${canSave
                  ? "bg-[var(--accent)] text-white shadow-xl shadow-[var(--accent)]/10 hover:brightness-110 active:scale-95"
                  : "bg-[var(--foreground)]/[0.05] text-[var(--muted)]/40 cursor-not-allowed"}
                `}
            >
              {savingPricing ? (
                <>
                  <RefreshCcw size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Pricing
                </>
              )}
            </button>

            <div className="p-3.5 rounded-xl bg-[var(--foreground)]/[0.02] border border-[var(--border)] space-y-2">
              <div className="flex items-center gap-2 text-[var(--accent)]/60">
                <Info size={14} />
                <span className="text-[10px] font-bold uppercase">Important</span>
              </div>
              <p className="text-[10px] font-medium text-[var(--muted)] leading-relaxed">
                Changes will be applied to the website immediately after saving.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
