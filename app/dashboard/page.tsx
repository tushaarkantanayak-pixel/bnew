"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "../../components/AuthGuard";

import { FiActivity, FiZap, FiKey, FiLayers, FiShoppingBag, FiUsers, FiGift, FiMessageSquare, FiExternalLink, FiChevronRight } from "react-icons/fi";
import Link from "next/link";

interface DashboardItem {
  label: string;
  href: string;
  icon: any;
  desc: string;
  external?: boolean;
}

interface DashboardSection {
  title: string;
  desc: string;
  items: DashboardItem[];
}

const DASHBOARD_SECTIONS: DashboardSection[] = [
  {
    title: "Game Topup-Auto",
    desc: "Automated delivery & asset management",
    items: [
      { label: "API Keys", href: "/dashboard/digital-gametopup/api-keys", icon: FiKey, desc: "Automatic game topups" },
      { label: "My Wallet", href: "/dashboard/digital-gametopup/wallet", icon: FiLayers, desc: "Balance & Recharge" },
      { label: "My Orders", href: "/dashboard/digital-gametopup/orders", icon: FiShoppingBag, desc: "Track your top-ups" },
    ]
  },
  {
    title: "Earning",
    desc: "Reward systems & voucher redemption",
    items: [
      { label: "Refer & Earn", href: "/dashboard/earning/referral", icon: FiUsers, desc: "Invite & Rewards" },
      { label: "Redeem Code", href: "/dashboard/earning/redeem", icon: FiGift, desc: "Use vouchers" },
    ]
  },
  {
    title: "Support",
    desc: "Technical & customer assistance",
    items: [
      { label: "Help Center", href: "/dashboard/support", icon: FiMessageSquare, desc: "Get help 24/7" },
    ]
  },
  {
    title: "Payment Gateway",
    desc: "External billing solutions",
    items: [
      { label: "XYZPay.site", href: "https://xyzpay.site", icon: FiExternalLink, desc: "Contact to avail subscription", external: true },
    ]
  }
];

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div className="space-y-12 py-10">
        {DASHBOARD_SECTIONS.map((section, idx) => (
          <div key={section.title} className="space-y-6">
            <div className="flex flex-col gap-1 px-2">
              <h3 className="text-xl font-black uppercase italic tracking-tighter text-[var(--foreground)]">
                {section.title}
              </h3>
              <p className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest opacity-40 italic">
                {section.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.items.map((item, itemIdx) => (
                <Link 
                  key={item.label} 
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  className="group relative p-6 rounded-3xl bg-[var(--card)]/40 border border-white/5 hover:border-[var(--accent)]/30 transition-all duration-300 shadow-xl overflow-hidden"
                >
                  {/* Subtle Background Glow */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--accent)]/5 blur-2xl rounded-full group-hover:bg-[var(--accent)]/10 transition-all" />
                  
                  <div className="relative z-10 flex items-start justify-between">
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/5 border border-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all">
                        <item.icon size={22} />
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-black uppercase tracking-tight text-[var(--foreground)] flex items-center gap-2">
                          {item.label}
                          {item.external && <FiExternalLink size={10} className="opacity-40" />}
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
        ))}

        {/* Footer Note */}
        <div className="pt-10 border-t border-[var(--border)] flex flex-col items-center justify-center text-center">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-10 h-1 rounded-full bg-[var(--accent)]/10" />
              ))}
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--muted)] opacity-30 italic">
              Blue Buff Systems Terminal • Authorized Access Only
            </p>
        </div>
      </div>
    </AuthGuard>
  );
}
