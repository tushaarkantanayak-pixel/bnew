"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Wallet, DollarSign, List, ShoppingCart, Tag, Gift, Users, MessageSquare, Mail, Image, Key, BarChart2, Settings
} from "lucide-react";
import apiClient from "@/utils/apiClient";

import AuthGuard from "@/components/AuthGuard";
import UsersTab from "@/components/admin/UsersTab";
import OrdersTab from "@/components/admin/OrdersTab";
import PricingTab from "@/components/admin/PricingTab";
import TransactionsTab from "@/components/admin/TransactionsTab";
import SupportQueriesTab from "@/components/admin/SupportQueriesTab";
import BannersTab from "@/components/admin/BannersTab";
import StatsTab from "@/components/admin/StatsTab";
import SettingsTab from "@/components/admin/SettingsTab";
import RedeemCodesTab from "@/components/admin/RedeemCodesTab";
import ApiKeysTab from "@/components/admin/ApiKeysTab";
import UsdtTab from "@/components/admin/UsdtTab";
import PromotionalTab from "@/components/admin/PromotionalTab";
import { formatPrice } from "@/utils/currency";




const SIDEBAR_CATEGORIES = [
  {
    title: "Finance & Payments",
    items: [
      { id: "wallet", label: "Wallet", icon: <Wallet /> },
      { id: "usdt", label: "USDT", icon: <DollarSign /> },
      { id: "transactions", label: "Transactions", icon: <List /> },
    ]
  },
  {
    title: "Store Management",
    items: [
      { id: "orders", label: "Orders", icon: <ShoppingCart /> },
      { id: "pricing", label: "Pricing", icon: <Tag /> },
      { id: "redeem", label: "Redeem", icon: <Gift /> },
    ]
  },
  {
    title: "Users & Support",
    items: [
      { id: "users", label: "Users", icon: <Users /> },
      { id: "queries", label: "Queries", icon: <MessageSquare /> },
      { id: "promotional", label: "Promotional", icon: <Mail /> },
    ]
  },
  {
    title: "System & Setup",
    items: [
      { id: "api-keys", label: "API Keys", icon: <Key /> },
      { id: "banners", label: "Banners", icon: <Image /> },
      { id: "stats", label: "Stats", icon: <BarChart2 /> },
      { id: "settings", label: "Settings", icon: <Settings /> },
    ]
  }
];

export default function AdminPanalPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("orders");
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("userType");
    if (role === "owner") {
      setIsOwner(true);
      setLoading(false);
    } else {
      // For extra security, verify with API
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      apiClient.get("/api/auth/me")
        .then(res => {
          const data = res.data;
          if (data.success && data.user?.userType === "owner") {
            setIsOwner(true);
            localStorage.setItem("userType", "owner");
          } else {
            router.push("/");
          }
        })
        .catch(() => router.push("/"))
        .finally(() => setLoading(false));
    }
  }, []);

  const [queries, setQueries] = useState([]);

  const [balance, setBalance] = useState(null);
  const [banners, setBanners] = useState([]);


  /* ================= TABLE CONTROLS ================= */
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  /* ================= PRICING STATE ================= */
  const [pricingType, setPricingType] = useState("user");
  const [slabs, setSlabs] = useState([{ min: 0, max: 100, percent: 0 }]);
  const [overrides, setOverrides] = useState([]);
  const [savingPricing, setSavingPricing] = useState(false);

  /* ================= HELPERS ================= */
  const normalizeSlabs = (list) =>
    [...list].sort((a, b) => a.min - b.min);

  const resetControls = () => {
    setSearch("");
    setPage(1);
  };


  /* ================= FETCH BALANCE ================= */
  const fetchBalance = async () => {
    try {
      const res = await apiClient.get("/api/game/balance");
      const data = res.data;
      if (data.success) {
        setBalance(data?.balance?.data?.balance ?? data.balance);
      }
    } catch (err) {
      console.error("Balance fetch failed", err);
    }
  };


  const fetchBanners = async () => {
    const res = await apiClient.get("/api/admin/banners/game-banners");
    const data = res.data;
    setBanners(data.data || []);
  };




  /* ================= FETCH PRICING ================= */
  const fetchPricing = async (type) => {
    const res = await apiClient.get(`/api/admin/pricing?userType=${type}`);
    const data = res.data;

    if (data.success) {
      const rate = Number(process.env.NEXT_PUBLIC_USD_RATE) || 98;
      const convertedSlabs = (data.data?.slabs || []).map(s => ({
        ...s,
        min: s.min / rate,
        max: s.max / rate
      }));
      const convertedOverrides = (data.data?.overrides || []).map(o => ({
        ...o,
        fixedPrice: o.fixedPrice / rate
      }));

      setSlabs(
        convertedSlabs.length
          ? convertedSlabs
          : [{ min: 0, max: 0, percent: 0 }]
      );
      setOverrides(convertedOverrides);
    }

  };

  /* ================= SAVE PRICING ================= */
  const savePricing = async () => {
    try {
      setSavingPricing(true);

        const rate = Number(process.env.NEXT_PUBLIC_USD_RATE) || 98;
        const res = await apiClient.patch("/api/admin/pricing", {
          userType: pricingType,
          slabs: normalizeSlabs(slabs).map(s => ({
            ...s,
            min: Math.round(s.min * rate),
            max: Math.round(s.max * rate)
          })),
          overrides: overrides.map(o => ({
            ...o,
            fixedPrice: Math.round(o.fixedPrice * rate),
            useOverride: Boolean(o.useOverride)
          })),
        });


        if (res.data.success) {
          alert("Pricing updated successfully");
        } else {
          alert(res.data.message || "Failed");
        }
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    } finally {
      setSavingPricing(false);
    }
  };



  /* ================= EFFECTS ================= */
  useEffect(() => {
    fetchBalance();
  }, []);

  useEffect(() => {
    resetControls();
  }, [activeTab]);
  useEffect(() => {
    if (activeTab === "banners") fetchBanners();
  }, [activeTab]);


  useEffect(() => {
    if (activeTab === "pricing") fetchPricing(pricingType);
  }, [activeTab, pricingType, page, search]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isOwner) return null;

  return (
    <AuthGuard>
      <section className="min-h-screen bg-[var(--background)] px-2 sm:px-6 py-3">
        <div className="max-w-6xl mx-auto">
          {/* COMPACT HEADER ROW */}
          <div className="mb-4 flex items-center justify-between bg-[var(--card)] py-2 px-3 sm:px-4 rounded-xl border border-[var(--border)] relative overflow-hidden">
            {/* Bottom accent bar */}
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[var(--accent)] to-purple-500" />
            
            {/* Left side: Admin Panel Info & Balance */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5 opacity-70">
                <h1 className="text-[9px] sm:text-[10px] font-bold tracking-widest text-[var(--foreground)] uppercase">
                  Admin Panel
                </h1>
                <span className="h-1 w-1 rounded-full bg-[var(--accent)] shrink-0" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <p className="text-base sm:text-lg font-black text-[var(--foreground)] tracking-tight">
                  {balance !== null
                    ? (() => {
                        const num = parseFloat(String(balance).replace(/[^\d.]/g, ""));
                        return isNaN(num) ? String(balance) : `$${num.toFixed(2)}`;
                      })()
                    : "Loading…"}
                </p>
                <span className="text-[8px] font-bold text-green-500 uppercase tracking-widest">
                  Available
                </span>
              </div>
            </div>

            {/* Right side: Hamburger Menu */}
            <div className="flex items-center gap-3">
              <h2 className="hidden sm:block text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider">
                {activeTab.replace('-', ' ')}
              </h2>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-lg bg-[var(--foreground)]/[0.05] hover:bg-[var(--foreground)]/[0.1] transition-colors"
              >
                <Menu size={18} className="text-[var(--foreground)]" />
              </button>
            </div>
          </div>

          {/* OVERLAY & SIDEBAR */}
          <div 
            className={`fixed inset-0 z-[99999] transition-opacity duration-300 ${
              isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar */}
            <div 
              className={`absolute top-0 right-0 h-full w-[80%] max-w-[320px] bg-[var(--card)] border-l border-[var(--border)] shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
                isSidebarOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
                <h3 className="font-extrabold text-[var(--foreground)]">Admin Menu</h3>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1.5 rounded-md text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/[0.05] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-4">
                {SIDEBAR_CATEGORIES.map((category) => (
                  <div key={category.title} className="flex flex-col gap-1">
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-[var(--muted)] px-3 mb-0.5">
                      {category.title}
                    </h4>
                    {category.items.map((tab) => {
                      const isActive = activeTab === tab.id;

                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id);
                            setIsSidebarOpen(false);
                          }}
                          className={`
                            w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 uppercase tracking-wider
                            ${isActive
                              ? "bg-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/25"
                              : "text-[var(--muted)] hover:bg-[var(--foreground)]/[0.03] hover:text-[var(--foreground)]"
                            }
                          `}
                        >
                          <span className={`text-base ${isActive ? "text-white" : "text-[var(--accent)]"}`}>{tab.icon}</span>
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>






          {/* TAB CONTENT RENDERING */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-3 sm:p-6">
            {activeTab === "wallet" && <StatsTab />}
            {activeTab === "usdt" && <UsdtTab />}
            {activeTab === "redeem" && <RedeemCodesTab />}
            {activeTab === "users" && (
              <UsersTab />
            )}

            {activeTab === "api-keys" && (
              <ApiKeysTab />
            )}

            {activeTab === "promotional" && (
              <PromotionalTab />
            )}

            {activeTab === "orders" && (
              <OrdersTab

              />
            )}

            {activeTab === "transactions" && (
              <TransactionsTab />
            )}

            {activeTab === "queries" && (
              <SupportQueriesTab

              />
            )}
            {activeTab === "banners" && (
              <BannersTab banners={banners} onRefresh={fetchBanners} />
            )}


            {activeTab === "pricing" && (
              <PricingTab
                pricingType={pricingType}
                setPricingType={setPricingType}
                slabs={slabs}
                setSlabs={setSlabs}
                overrides={overrides}
                setOverrides={setOverrides}
                savingPricing={savingPricing}
                onSave={savePricing}
              />
            )}
            {activeTab === "settings" && (
              <SettingsTab />
            )}
          </div>


        </div>
      </section>
    </AuthGuard>
  );
}
