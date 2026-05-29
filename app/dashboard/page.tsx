"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "../../components/AuthGuard";

import { FiActivity, FiZap, FiKey, FiLayers, FiShoppingBag, FiUsers, FiGift, FiMessageSquare, FiExternalLink, FiChevronRight, FiGlobe } from "react-icons/fi";
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
      { label: "web.bluebuff.in", href: "https://web.bluebuff.in", icon: FiGlobe, desc: "Make your own customised web", external: true },
    ]
  }
];

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div className="space-y-8 py-6">
        {DASHBOARD_SECTIONS.map((section, idx) => (
          <div key={section.title} className="space-y-4">
            <div className="flex flex-col gap-1 px-2">
              <h3 className="text-lg font-black uppercase italic tracking-tighter text-[var(--foreground)]">
                {section.title}
              </h3>
              <p className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest opacity-40 italic">
                {section.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {section.items.map((item, itemIdx) => (
                <Link 
                  key={item.label} 
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  className="group relative p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[var(--accent)]/30 hover:bg-white/[0.04] transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden flex items-center gap-3"
                >
                  {/* Subtle Background Glow */}
                  <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-20 h-20 bg-[var(--accent)]/5 blur-2xl rounded-full group-hover:bg-[var(--accent)]/10 transition-all pointer-events-none" />
                  
                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-[var(--muted)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all duration-300">
                    <item.icon size={18} className="group-hover:scale-110 transition-transform" />
                  </div>
                  
                  {/* Text Content */}
                  <div className="relative z-10 flex-1 min-w-0">
                    <h4 className="text-sm font-black uppercase tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors flex items-center gap-1.5 leading-tight truncate">
                      {item.label}
                      {item.external && <FiExternalLink size={10} className="opacity-40" />}
                    </h4>
                    <p className="text-[9px] text-[var(--muted)] mt-0.5 font-bold uppercase tracking-widest opacity-40 truncate">
                      {item.desc}
                    </p>
                  </div>
                  
                  {/* Action Icon */}
                  <div className="relative z-10 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[var(--muted)] opacity-20 group-hover:opacity-100 group-hover:bg-[var(--accent)]/10 group-hover:text-[var(--accent)] transition-all">
                    <FiChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
