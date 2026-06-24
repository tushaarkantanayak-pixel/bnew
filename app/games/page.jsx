"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiX, FiSearch, FiGrid, FiList, FiTrendingUp, FiZap, FiPackage, FiTv } from "react-icons/fi";

import GameGrid from "@/components/Games/GameGrid";
import GameList from "@/components/Games/GameList";
import FilterModal from "@/components/Games/FilterModal";
import ServiceGridSection from "@/components/Games/ServiceGridSection";
import apiClient from "@/utils/apiClient";

export default function GamesPage() {
  /* ================= STATE ================= */
  const [category, setCategory] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const [featuredGames, setFeaturedGames] = useState([]);
  const [mlbbVeriant, setMlbbVeriant] = useState([]);

  const [otts, setOtts] = useState(null);
  const [memberships, setMemberships] = useState(null);

  const [showFilter, setShowFilter] = useState(false);
  const [sort, setSort] = useState("az");
  const [hideOOS, setHideOOS] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  /* ================= CONFIG ================= */
  const WEEKLY_PASS_SLUG = "mobile-legends270";

  const outOfStockGames = [
    "mobile-legends-backup826",

  ];

  const outOfStockSet = useMemo(() => new Set(outOfStockGames), []);

  const isOutOfStock = useCallback(
    (name) => outOfStockSet.has(name),
    [outOfStockSet]
  );

  /* ================= FETCH ================= */
  useEffect(() => {
    let mounted = true;

    const loadGames = async () => {
      try {
        const res = await apiClient.get("/api/games");
        const json = res.data;
        if (!mounted) return;

        let fetchedGames = json?.data?.games || [];
        let fetchedFeatured = json?.data?.featuredGames || [];
        let fetchedMlbbVariant = json?.data?.mlbbVariants || [];

        // Duplicate Weekly Pass (same slug)
        const weeklyPassSource = fetchedGames.find(
          (g) => g.gameSlug === WEEKLY_PASS_SLUG
        );

        if (weeklyPassSource) {
          const alreadyExists = fetchedGames.some(
            (g) =>
              g.gameSlug === WEEKLY_PASS_SLUG &&
              g.gameName === "Weekly Pass",
          );

          if (!alreadyExists) {
            fetchedGames.push({
              ...weeklyPassSource,
              gameName: "Weekly Pass",
              _variant: "weekly-pass",
              gameImageId: {
                image: "/game-assets/weeklypass.jpg",
              },
            });
          }
        }

        setCategory(json?.data?.category || []);
        setGames(fetchedGames);
        setFeaturedGames(fetchedFeatured);
        setMlbbVeriant(fetchedMlbbVariant);

        setOtts(json?.data?.otts || null);
        setMemberships(json?.data?.memberships || null);
      } catch (err) {
        console.error("Failed to load games:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadGames();
    return () => (mounted = false);
  }, []);

  /* ================= FILTER COUNT ================= */
  const activeFilterCount =
    (sort !== "az" ? 1 : 0) + (hideOOS ? 1 : 0);

  /* ================= PROCESSING ================= */
  const processList = useCallback((list) => {
    let result = [...list];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((g) => g.gameName.toLowerCase().includes(q));
    }
    if (hideOOS) {
      result = result.filter((g) => !isOutOfStock(g.gameName));
    }
    if (sort === "az") {
      result.sort((a, b) => a.gameName.localeCompare(b.gameName));
    } else if (sort === "za") {
      result.sort((a, b) => b.gameName.localeCompare(a.gameName));
    }
    return result;
  }, [searchQuery, hideOOS, sort, isOutOfStock]);

  const processedGames = useMemo(() => processList(games), [games, processList]);
  const processedFeaturedGames = useMemo(() => processList(featuredGames), [featuredGames, processList]);
  const processedMlbbGames = useMemo(() => processList(mlbbVeriant), [mlbbVeriant, processList]);

  const isEmpty = processedGames.length === 0 && processedFeaturedGames.length === 0 && processedMlbbGames.length === 0;

  /* ================= HANDLERS ================= */
  const clearFilters = () => {
    setSort("az");
    setHideOOS(false);
    setSearchQuery("");
  };

  const isMlbbGame = (game) => {
    const slug = game.gameSlug?.toLowerCase() || "";
    const name = game.gameName?.toLowerCase() || "";
    return slug.includes("mlbb") || name.includes("mlbb") || slug.includes("legends988") || slug.includes("weeklymonthly-bundle");
  };

  /* ================= RENDER COMPONENTS ================= */
  const SectionHeader = ({ title, icon: Icon, count, gradient }) => (
    <div className="flex items-center gap-3 mb-6">
      <div className={`w-11 h-11 rounded-[0.9rem] bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-xl shrink-0`}>
        <Icon size={20} />
      </div>
      <div>
        <h2 className="text-[15px] sm:text-base font-bold text-[var(--foreground)] leading-none mb-1.5">
          {title}
        </h2>
        <div className="flex items-center gap-2.5">
          <div className="h-1 w-8 bg-[var(--accent)] rounded-full shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]" />
          <span className="text-[10px] font-bold text-[var(--muted)] tracking-tight">
            {count} Items Found
          </span>
        </div>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-[var(--border)]/50 to-transparent ml-2" />
    </div>
  );

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold tracking-tight text-[11px] sm:text-[12px] transition-all duration-300
        ${activeTab === id
          ? "bg-[var(--foreground)] text-[var(--background)] shadow-sm"
          : "bg-transparent text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/5"
        }`}
    >
      <Icon size={13} className={`shrink-0 ${activeTab === id ? "stroke-[2.5px]" : ""}`} />
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-4 sm:py-6 relative overflow-hidden">
      {/* Background Decorative Glows Removed */}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ================= UNIFIED COMPACT HEADER ================= */}
        <div className="flex flex-col md:flex-row items-center gap-2 mb-10 w-full bg-[var(--card)] p-1.5 rounded-2xl border border-[var(--border)] shadow-sm">
          
          {/* SEARCH */}
          <div className="relative flex-1 w-full group/search shrink-0">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)] group-focus-within/search:text-[var(--foreground)] transition-colors" size={14} />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games..."
              className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-transparent border-none focus:ring-0 outline-none text-[13px] font-medium transition-all placeholder:text-[var(--muted)]/60 text-[var(--foreground)]"
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  <FiX size={14} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* SCROLLABLE ACTION ROW */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar scroll-smooth pl-1 md:pl-0 pb-1 md:pb-0">
            {/* CATEGORY TABS */}
            <div className="flex items-center p-1 shrink-0 rounded-xl bg-[var(--background)] border border-[var(--border)] shadow-inner">
              <TabButton id="all" label="All" icon={FiGrid} />
              <TabButton id="mlbb" label="MLBB" icon={FiZap} />
              <TabButton id="others" label="Others" icon={FiPackage} />
            </div>

            {/* VIEW TOGGLE */}
            <div className="flex items-center p-1 shrink-0 rounded-xl bg-[var(--background)] border border-[var(--border)] shadow-inner">
              {[
                { id: "grid", icon: FiGrid },
                { id: "list", icon: FiList },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id)}
                  className={`p-1.5 rounded-lg transition-all duration-300 ${viewMode === mode.id
                    ? "bg-[var(--foreground)] text-[var(--background)] shadow-sm"
                    : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/5"
                    }`}
                >
                  <mode.icon size={13} className={viewMode === mode.id ? "stroke-[2.5px]" : ""} />
                </button>
              ))}
            </div>

            {/* FILTER BUTTON */}
            <button
              onClick={() => setShowFilter(true)}
              className={`relative shrink-0 flex items-center justify-center w-[34px] h-[34px] rounded-xl transition-all duration-300 border ${activeFilterCount > 0
                ? "bg-[var(--accent)] text-[var(--background)] border-[var(--accent)] shadow-sm"
                : "bg-[var(--background)] border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/5 shadow-inner"
                }`}
            >
              <FiFilter size={13} className={activeFilterCount > 0 ? "stroke-[2.5px]" : ""} />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center bg-[var(--background)] text-[var(--foreground)] rounded-full text-[9px] font-bold border border-[var(--border)] shadow-sm">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ================= GAME CONTENT ================= */}
        <div className="space-y-20">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center flex flex-col items-center justify-center"
              >
                <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin mb-4"></div>
                <h3 className="text-lg font-black italic uppercase tracking-widest text-[var(--muted)]">Loading Games...</h3>
              </motion.div>
            ) : isEmpty ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center"
              >
                <div className="w-24 h-24 bg-[var(--card)] border border-[var(--border)] rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiX size={40} className="text-[var(--muted)]/30" />
                </div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2">No Games Found</h3>
                <p className="text-[var(--muted)] text-sm mb-8">Try adjusting your search or filters to find what you're looking for.</p>
                <button
                  onClick={clearFilters}
                  className="px-8 py-4 rounded-2xl bg-[var(--accent)] text-black font-black uppercase tracking-widest text-xs italic hover:scale-105 transition-transform"
                >
                  Reset All Filters
                </button>
              </motion.div>
            ) : (
              <div>
                {/* 1. FEATURED */}
                {/* {(activeTab === "all" || activeTab === "others") && (processedFeaturedGames.filter(g => activeTab !== "others" || !isMlbbGame(g)).length > 0) && (
                  <div className="mb-20">
                    <SectionHeader
                      title="Elite Picks"
                      icon={FiTrendingUp}
                      count={processedFeaturedGames.filter(g => activeTab !== "others" || !isMlbbGame(g)).length}
                      gradient="from-orange-500 to-amber-600"
                    />
                    {viewMode === "grid"
                      ? <GameGrid games={processedFeaturedGames.filter(g => activeTab !== "others" || !isMlbbGame(g))} isOutOfStock={isOutOfStock} />
                      : <GameList games={processedFeaturedGames.filter(g => activeTab !== "others" || !isMlbbGame(g))} isOutOfStock={isOutOfStock} />
                    }
                  </div>
                )} */}

                {/* 2. MLBB VARIANT */}
                {(activeTab === "all" || activeTab === "mlbb") && processedMlbbGames.length > 0 && (
                  <div className="mb-20">
                    <SectionHeader
                      title="MLBB Special"
                      icon={FiZap}
                      count={processedMlbbGames.length}
                      gradient="from-blue-500 to-indigo-600"
                    />
                    {viewMode === "grid"
                      ? <GameGrid games={processedMlbbGames} isOutOfStock={isOutOfStock} />
                      : <GameList games={processedMlbbGames} isOutOfStock={isOutOfStock} />
                    }
                  </div>
                )}

                {/* 3. ALL GAMES */}
                {(activeTab === "all" || activeTab === "others") && (processedGames.filter(g => activeTab !== "others" || !isMlbbGame(g)).length > 0) && (
                  <div className="mb-20">
                    <SectionHeader
                      title="All Games"
                      icon={FiPackage}
                      count={processedGames.filter(g => activeTab !== "others" || !isMlbbGame(g)).length}
                      gradient="from-[var(--accent)] to-cyan-600"
                    />
                    {viewMode === "grid"
                      ? <GameGrid games={processedGames.filter(g => activeTab !== "others" || !isMlbbGame(g))} isOutOfStock={isOutOfStock} />
                      : <GameList games={processedGames.filter(g => activeTab !== "others" || !isMlbbGame(g))} isOutOfStock={isOutOfStock} />
                    }
                  </div>
                )}

                {/* 4. OTT SECTION */}
                {(activeTab === "all" || activeTab === "streaming") && otts?.items?.length > 0 && !searchQuery && (
                  <div className="mb-10 border-t border-[var(--border)]/50 pt-10">
                    <SectionHeader
                      title="Streaming Apps"
                      icon={FiTv}
                      count={otts.items.length}
                      gradient="from-purple-500 to-indigo-600"
                    />
                    <ServiceGridSection
                      title={null}
                      total={otts.total}
                      items={otts.items}
                      hrefPrefix="/games"
                    />
                  </div>
                )}

                {/* 5. MEMBERSHIP SECTION */}
                {(activeTab === "all" || activeTab === "memberships") && memberships?.items?.length > 0 && !searchQuery && (
                  <div className="mb-10 border-t border-[var(--border)]/50 pt-10">
                    <SectionHeader
                      title="Memberships"
                      icon={FiPackage}
                      count={memberships.items.length}
                      gradient="from-amber-500 to-yellow-600"
                    />
                    <ServiceGridSection
                      title={null}
                      total={memberships.total}
                      items={memberships.items}
                      hrefPrefix="/games"
                      showCategory={false}
                      ctaText="Join Now →"
                    />
                  </div>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* FILTER MODAL */}
      <FilterModal
        open={showFilter}
        onClose={() => setShowFilter(false)}
        sort={sort}
        setSort={setSort}
        hideOOS={hideOOS}
        setHideOOS={setHideOOS}
      />
    </main>
  );
}
