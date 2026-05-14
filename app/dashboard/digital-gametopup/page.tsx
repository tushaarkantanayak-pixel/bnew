"use client";

import AuthGuard from "../../../components/AuthGuard";
import { FiKey, FiLayers, FiShoppingBag, FiChevronRight } from "react-icons/fi";
import Link from "next/link";

const ITEMS = [
  { label: "API Keys", href: "/dashboard/digital-gametopup/api-keys", icon: FiKey, desc: "Automatic game topups" },
  { label: "My Wallet", href: "/dashboard/digital-gametopup/wallet", icon: FiLayers, desc: "Balance & Recharge" },
  { label: "My Orders", href: "/dashboard/digital-gametopup/orders", icon: FiShoppingBag, desc: "Track your top-ups" },
];

export default function DigitalTopupPage() {
  return (
    <AuthGuard>
      <div className="space-y-12 py-10">
        <div className="flex flex-col gap-1 px-2">
          <h3 className="text-xl font-black uppercase italic tracking-tighter text-[var(--foreground)]">
            Digital Game Topup-Auto
          </h3>
          <p className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest opacity-40 italic">
            Automated delivery & asset management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ITEMS.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              className="group relative p-6 rounded-3xl bg-[var(--card)]/40 border border-white/5 hover:border-[var(--accent)]/30 transition-all duration-300 shadow-xl overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--accent)]/5 blur-2xl rounded-full group-hover:bg-[var(--accent)]/10 transition-all" />
              
              <div className="relative z-10 flex items-start justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/5 border border-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all">
                    <item.icon size={22} />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-tight text-[var(--foreground)]">
                      {item.label}
                    </h4>
                    <p className="text-[10px] text-[var(--muted)] mt-1 font-bold uppercase tracking-wide opacity-50">
                      {item.desc}
                    </p>
                  </div>
                </div>
                
                <div className="w-8 h-8 rounded-full bg-[var(--foreground)]/5 flex items-center justify-center text-[var(--muted)] group-hover:bg-[var(--accent)]/10 group-hover:text-[var(--accent)] transition-all">
                  <FiChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AuthGuard>
  );
}
