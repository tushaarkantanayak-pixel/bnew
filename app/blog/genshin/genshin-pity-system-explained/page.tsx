import type { Metadata } from "next";
import BlogPostLayout from "@/components/Blog/BlogPostLayout";
import Link from "next/link";
import { FiStar, FiZap, FiShield, FiTarget, FiTrendingUp, FiDatabase, FiDollarSign, FiActivity, FiRefreshCw, FiGrid } from "react-icons/fi";

export const metadata: Metadata = {
  title: "How Pity System Works in Genshin Impact (Explained Simply) – 2026",
  description: "Learn the secrets of the Genshin Impact Pity system. Soft pity, hard pity, and the 50/50 rule explained for India primogem top-ups.",
  alternates: { canonical: "https://bluebuff.in/blog/genshin/genshin-pity-system-explained" },
};

export default function BlogPage() {
  return (
    <BlogPostLayout
      title="HOW PITY SYSTEM WORKS IN GENSHIN IMPACT (EXPLAINED SIMPLY)"
      category="Gacha Guide"
      readTime="12 min read"
      date="March 31, 2026"
      image="/blog/genshin-pity.png"
      game="Genshin"
    >
      <section className="space-y-8">
        <div className="relative p-8 rounded-[32px] bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-transparent border border-[var(--accent)]/20 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-10"><FiStar size={80} /></div>
          <p className="text-lg md:text-xl font-bold tracking-tight italic leading-relaxed m-0 text-[var(--foreground)]">
            "GENSHIN IMPACT ISN'T just a game; it's a game of calculated risks. Understanding <strong>Soft Pity and Hard Pity</strong> in 2026 is the difference between getting your favorite C6 character and wasting thousands of <strong>Primogems</strong>."
          </p>
        </div>

        <p className="opacity-80 leading-relaxed">
          For many players in India, the <strong>Genshin Impact gacha system</strong> can feel like pure luck. However, behind the flashy animations of the Wanderlust Invocation and Character Event Banners lies a deterministic mathematical system designed to guarantee you high-rarity drops. This guide breaks down the <strong>Genshin Pity System</strong> into simple, actionable steps so you can plan your pulls like a pro.
        </p>
      </section>

      <section className="pt-12 space-y-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-1 bg-[var(--accent)] rounded-full" />
          <h2 className="text-3xl font-black uppercase italic tracking-tighter col-span-full">Pity System <span className="text-[var(--accent)]">Breakdown 📊</span></h2>
        </div>

        <p className="opacity-80 leading-relaxed text-sm">
          The pity system ensures that you eventually receive a 4-star or 5-star item even if you have terrible luck. In 2026, the <strong>Genshin banner mechanics</strong> remain the core foundation of account progression. Here is the data-driven breakdown of how many pulls you need for a guaranteed drop.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { type: "4-Star Pity", count: "10 Pulls", icon: FiGrid, desc: "Guarantees a 4-star character or weapon every 10 wishes. If you get one early, the counter resets instantly." },
            { type: "5-Star Hard Pity", count: "90 Pulls", icon: FiShield, desc: "The absolute maximum. On your 90th wish, a 5-star is 100% guaranteed. Note: Weapon banners have a lower 80-pull ceiling." }
          ].map((item, i) => (
            <div key={i} className="group p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all">
              <div className="flex items-center justify-between mb-3 text-[var(--accent)]">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-[var(--accent)]/10 px-2 py-1 rounded">{item.count}</span>
                <item.icon />
              </div>
              <h3 className="text-lg font-black uppercase italic tracking-tighter mb-2">{item.type}</h3>
              <p className="text-[10px] leading-relaxed opacity-60 m-0 italic">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-[var(--card)] border border-[var(--border)] p-10 rounded-[40px] my-16 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--accent)]" />
        <div className="relative z-10 text-sm">
          <div className="flex items-center gap-3 mb-4">
            <FiZap size={20} className="text-[var(--accent)]" />
            <h3 className="italic font-black uppercase text-[var(--accent)] m-0">Pro Tip: The "Soft Pity" Range 📈</h3>
          </div>
          <p className="opacity-80 leading-relaxed mb-4">
            Did you know that 5-star characters almost never wait until the 90th pull? In the <strong>Genshin community strategy</strong>, we call this "Soft Pity."
          </p>
          <ul className="space-y-3 opacity-80 list-none p-0 italic text-[11px]">
            <li className="flex gap-3 items-center"><FiActivity className="text-[var(--accent)] flex-shrink-0" /> <strong>Wishes 1-73:</strong> Base drop rate is a low 0.6%.</li>
            <li className="flex gap-3 items-center"><FiActivity className="text-[var(--accent)] flex-shrink-0" /> <strong>Wishes 74-85:</strong> Drop rates jump significantly to ~30%+ per pull.</li>
            <li className="flex gap-3 items-center"><FiActivity className="text-[var(--accent)] flex-shrink-0" /> <strong>Strategic Advice:</strong> If you are saving for a future banner, stop pulling at 70 wishes to avoid "accidentally" triggering your pity.</li>
          </ul>
        </div>
      </div>

      <section className="pt-12 space-y-6 text-sm">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter">The Dreaded <span className="text-[var(--accent)]">50/50 Rule ⚔️</span></h2>
        <p className="opacity-80 leading-relaxed">
          The most important concept to master is the <strong>50/50 probability</strong> on the Limited Character Banner. When you finally hit that gold animation, there is only a 50% chance it is the featured character (e.g., Focalors or Raiden Shogun). The other 50% chance is a "Standard" 5-star character from the permanent pool (like Jean or Diluc).
        </p>
        <p className="opacity-80 leading-relaxed">
          <strong>The Guarantee (Guaranteed Pity):</strong> If you "lose" your 50/50 and get a standard character, your NEXT 5-star is guaranteed to be the featured character on the banner. This guarantee carries over across different banners! If you lost the 50/50 in March, you will have a <strong>guaranteed pull</strong> for the new character release in April.
        </p>
      </section>

      <section className="pt-12 space-y-6 text-sm">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter">Budgeting <span className="text-[var(--accent)]">Primogems in India 🇮🇳</span></h2>
        <p className="opacity-80 leading-relaxed">
          Unlocking C6 characters or R5 weapons requires a massive investment of <strong>Primogems</strong>. For <strong>Genshin Impact players in India</strong>, the most cost-effective way to stack your gems is through the **Welkin Moon** and the **Battle Pass**. These offer a 5x or 10x value compared to direct gem purchases.
        </p>
        <p className="opacity-80 leading-relaxed italic">
          However, for those "pity emergencies" where a banner is ending in 2 hours, direct top-ups are necessary. Always ensure you use a <strong>safe Genshin top-up India</strong> service that supports UPI. Secure your Genesis Crystals through <strong>BlueBuff</strong> to get instant delivery and localized Indian pricing without international transaction fees.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-16">
        <div className="p-8 rounded-[32px] bg-[var(--accent)]/5 border border-[var(--border)]">
          <FiDatabase size={32} className="text-[var(--accent)] mb-4" />
          <h4 className="text-xl font-black uppercase italic mb-2 tracking-tighter">Epitomized Path</h4>
          <p className="text-[11px] opacity-60 m-0 leading-relaxed">The weapon banner's pity system. You can "Fate Point" your desired weapon, guaranteeing it on the 2nd 5-star pull if the first one was wrong.</p>
        </div>
        <div className="p-8 rounded-[32px] bg-[var(--accent)]/5 border border-[var(--border)]">
          <FiRefreshCw size={32} className="text-[var(--accent)] mb-4" />
          <h4 className="text-xl font-black uppercase italic mb-2 tracking-tighter">Pity Carry-Over</h4>
          <p className="text-[11px] opacity-60 m-0 leading-relaxed">Your wish count NEVER resets when a banner changes. If you are at 50 pity today, you will still be at 50 pity when the new banner starts next week.</p>
        </div>
      </div>

      <section className="mt-12 py-10 border-t border-[var(--border)] border-dashed text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--muted)] opacity-40 mb-6">Need Primogems for your guaranteed 5-star? Gear up.</p>
        <div className="flex justify-center">
          <Link
            href="/games/genshin-impact988"
            className="px-12 py-4 rounded-2xl bg-[var(--foreground)] text-[var(--background)] text-[11px] font-black uppercase tracking-[0.2em] italic hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-[var(--foreground)]/20"
          >
            Genshin Top-Up India UPI
          </Link>
        </div>
      </section>

      <p className="mt-8 text-xs opacity-50 italic text-center">
        Providing the most <strong>trusted Genshin recharge India</strong> services with localized UPI support. Secure your primogems today and start your journey through <strong>Teyvat</strong> with your favorite 5-stars.
      </p>
    </BlogPostLayout>
  );
}
