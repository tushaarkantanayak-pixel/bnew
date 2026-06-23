"use client";

import { FiGrid, FiList, FiCheckCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { formatPrice } from "@/utils/currency";


export default function PackageSelector({
  items,
  activeItem,
  setActiveItem,
  viewMode,
  setViewMode,
  sliderRef,
  buyPanelRef,
  calculateDiscount,
  scrollToItem,
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-0">
      {/* ================= HEADER & VIEW TOGGLE ================= */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-[950] tracking-tighter text-[var(--foreground)] lowercase">
             <span className="text-[var(--accent)] drop-shadow-[0_0_10px_rgba(var(--accent-rgb),0.3)]">package</span>
          </h2>
          <span className="hidden sm:block w-4 h-[1px] bg-[var(--border)]" />
          <p className="text-[9px] font-black uppercase tracking-widest text-[var(--muted)]/50">
            {items.length} packs
          </p>
        </div>


      </div>

      {/* ================= CONTENT ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pb-10">
              {items.map((item) => {
                const discount = calculateDiscount(item.sellingPrice, item.dummyPrice);
                const isActive = activeItem.itemSlug === item.itemSlug;

                return (
                  <div
                    key={item.itemSlug}
                    onClick={() => {
                      setActiveItem(item);
                      buyPanelRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }}
                    className={`relative group rounded-2xl p-4 cursor-pointer border transition-all duration-200 overflow-hidden active:scale-[0.98]
                    ${isActive
                        ? "border-[var(--accent)] bg-[var(--accent)]/[0.04] shadow-[0_10px_30px_-10px_rgba(var(--accent-rgb),0.3)] ring-1 ring-[var(--accent)]/30"
                        : "border-[var(--border)] bg-[var(--card)]/40 hover:border-[var(--accent)]/30"
                      }`}
                  >
                    {isActive && (
                      <div className="absolute top-2 right-2 text-[var(--accent)] opacity-80">
                        <FiCheckCircle size={12} />
                      </div>
                    )}

                    {discount > 0 && (
                      <span className="absolute top-0 left-0 bg-[var(--accent)] text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-br-lg z-20">
                        {discount}% OFF
                      </span>
                    )}

                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`relative w-6 h-6 rounded-lg overflow-hidden shrink-0 transition-all duration-500 ${isActive ? "ring-1 ring-[var(--accent)]" : "bg-[var(--muted)]/10"}`}>
                          <Image
                            src={item?.itemImageId?.image || item?.image || "/logo.png"}
                            alt={item.itemName}
                            fill
                            unoptimized
                            className={`object-cover ${item.itemAvailablity === false ? "grayscale opacity-50" : ""}`}
                          />
                        </div>
                        <p className={`text-[10px] font-bold tracking-tight line-clamp-1 leading-none ${isActive ? "text-[var(--foreground)]" : "text-[var(--muted)]"}`}>
                          {item.itemName}
                        </p>
                      </div>

                      {item.itemAvailablity === false && (
                        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                          <span className="bg-rose-500/90 text-white text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest border border-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.4)]">
                            Out of Stock
                          </span>
                        </div>
                      )}

                      <div className={`flex items-baseline gap-1.5 border-t border-[var(--border)] pt-3 ${item.itemAvailablity === false ? "opacity-30" : ""}`}>
                        <span className={`text-xl font-[1000] tracking-tighter leading-none ${isActive ? "text-[var(--accent)]" : "text-[var(--foreground)]"}`}>
                          {formatPrice(item.sellingPrice)}
                        </span>
                        {item.dummyPrice && (
                          <span className="text-[10px] font-bold text-[var(--muted)] line-through opacity-20">
                            {formatPrice(item.dummyPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
    </div>
  );
}
