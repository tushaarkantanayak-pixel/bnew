import type { Metadata } from "next";
import BlogPostLayout from "@/components/Blog/BlogPostLayout";
import Link from "next/link";
import { FiKey, FiZap, FiShield, FiTarget, FiStar, FiActivity, FiCopy, FiCheckCircle, FiExternalLink, FiLayers } from "react-icons/fi";

export const metadata: Metadata = {
  title: "All Active Genshin Impact Redeem Codes (Updated Daily) – 2026",
  description: "Never miss free Primogems! Get the latest active Genshin Impact redeem codes here with our step-by-step redemption guide for India travelers.",
  alternates: { canonical: "https://bluebuff.in/blog/genshin/all-active-genshin-impact-redeem-codes" },
};

export default function BlogPage() {
  return (
    <BlogPostLayout
      title="ALL ACTIVE GENSHIN IMPACT REDEEM CODES (UPDATED DAILY) – 2026"
      category="Redeem Codes"
      readTime="15 min read"
      date="March 31, 2026"
      image="/blog/genshin-redeem-codes.png"
      game="Genshin"
    >
      <section className="space-y-8">
        <div className="relative p-8 rounded-[32px] bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-transparent border border-[var(--accent)]/20 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-10"><FiKey size={80} /></div>
          <p className="text-lg md:text-xl font-bold tracking-tight italic leading-relaxed m-0 text-[var(--foreground)] text-center">
            "FREE PRIMOGEMS are every player's best friend. Bookmark this page and never miss a code before it expires."
          </p>
        </div>

        <p className="opacity-80 leading-relaxed text-center">
            While farming is great, <strong>Redeem Codes</strong> are the easiest way to get free rewards. From regular 60-Primogem codes to special livestream 300-Primogem codes, we track every active code in <strong>Genshin Impact 2026</strong>.
        </p>
      </section>

      <section className="pt-12 space-y-6">
        <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-1 bg-[var(--accent)] rounded-full" />
            <h2 className="text-3xl font-black uppercase italic tracking-tighter col-span-full">Active <span className="text-[var(--accent)]">Redeem Codes 🔑</span></h2>
        </div>
        
        <p className="opacity-80 leading-relaxed text-xs mb-8 italic">
            *Code availability subject to server region and account level (Usually requires AR 10+).
        </p>

        <div className="space-y-4">
          {[
            { code: "GENSHINGIFT", rewards: "50 Primogems, 3x Hero's Wit", status: "Active (Ongoing)", color: "text-green-500" },
            { code: "DAQS99XSHPV5", rewards: "60 Primogems, 5x Adventurer's Experience", status: "Active (Mar 2026)", color: "text-[var(--accent)]" },
            { code: "XBRU2H3XYZ7C", rewards: "10,000 Mora, 10x Adventurer's Experience", status: "Active (Mar 2026)", color: "text-[var(--accent)]" },
            { code: "MTNU2H3GHP2V", rewards: "30-Day Food Bundle, 30,000 Mora", status: "Expiring Soon", color: "text-orange-500" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all gap-4">
                <div className="flex flex-col gap-1">
                    <span className={`text-[8px] font-black uppercase tracking-widest ${item.color} italic mb-1 flex items-center gap-1`}>
                        <FiCheckCircle size={10} /> {item.status}
                    </span>
                    <span className="text-2xl font-black tracking-tighter uppercase italic">{item.code}</span>
                    <span className="text-[10px] opacity-40 uppercase tracking-widest">{item.rewards}</span>
                </div>
                <button className="px-6 py-2 rounded-xl bg-[var(--accent)] text-black text-[10px] font-black uppercase tracking-[0.2em] italic hover:scale-105 active:scale-95 transition-all text-center">
                    Copy Code
                </button>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-16 space-y-8 text-sm">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter col-span-full italic">How to <span className="text-[var(--accent)]">Redeem Codes 🛠️</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-[32px] bg-[var(--card)] border border-[var(--border)] relative overflow-hidden group">
                <div className="flex items-center gap-3 mb-6">
                    <FiZap size={20} className="text-[var(--accent)]" />
                    <h3 className="italic font-black uppercase m-0 leading-none">Method 1: Browser (Fastest)</h3>
                </div>
                <ol className="space-y-4 opacity-80 list-decimal pl-5 text-[11px] italic">
                    <li>Visit the official <strong>Genshin Impact Code Redemption</strong> site.</li>
                    <li>Log in to your <strong>HoYoverse account</strong> and select your server (Asia, EU, NA).</li>
                    <li>Enter the code exactly as shown above.</li>
                    <li>Click 'Redeem' and check your in-game mailbox in India instantly.</li>
                </ol>
            </div>
            
            <div className="p-8 rounded-[32px] bg-[var(--card)] border border-[var(--border)] relative overflow-hidden group">
                <div className="flex items-center gap-3 mb-6">
                    <FiTarget size={20} className="text-[var(--accent)]" />
                    <h3 className="italic font-black uppercase m-0 leading-none">Method 2: In-Game</h3>
                </div>
                <ol className="space-y-4 opacity-80 list-decimal pl-5 text-[11px] italic">
                    <li>Open the <strong>Paimon Menu</strong> (Esc / Top-left icon).</li>
                    <li>Go to <strong>Settings</strong> (Gear Icon) &gt; <strong>Account</strong>.</li>
                    <li>Find 'Redeem Code' and click 'Redeem Now'.</li>
                    <li>Paste the code and confirm to receive your free Primogems.</li>
                </ol>
            </div>
        </div>
      </section>

      <div className="bg-[var(--card)] border border-[var(--border)] p-10 rounded-[40px] my-16 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--accent)]" />
        <div className="relative z-10 text-sm">
          <div className="flex items-center gap-3 mb-4">
            <FiShield size={20} className="text-[var(--accent)]" />
            <h3 className="italic font-black uppercase text-[var(--accent)] m-0">Redeem Code Expirations & Limits ⏳</h3>
          </div>
          <p className="opacity-80 leading-relaxed mb-4 leading-relaxed">
            Many new Travelers in India are often confused as to why a code might not work. In 2026, the <strong>Genshin Impact code system</strong> follows strict logic: Each code is <strong>One-Time Use</strong> per account. If you've redeemed "GENSHINGIFT" in 2024, you cannot redeem it again in 2026.
          </p>
          <ul className="space-y-3 opacity-80 list-none p-0 italic text-[11px]">
            <li className="flex gap-3 items-center"><FiCheckCircle className="text-[var(--accent)] flex-shrink-0" /> <strong>Account Level:</strong> Most codes require you to reach Adventure Rank 10.</li>
            <li className="flex gap-3 items-center"><FiCheckCircle className="text-[var(--accent)] flex-shrink-0" /> <strong>Case Sensitivity:</strong> While most codes are upper-case, always copy-paste to avoid typos.</li>
            <li className="flex gap-3 items-center"><FiCheckCircle className="text-[var(--accent)] flex-shrink-0" /> <strong>Region Lock:</strong> Some promotional codes are locked to specific servers (Asia/EU/NA). Double-check your server in the Paimon menu.</li>
          </ul>
        </div>
      </div>

      <section className="pt-12 space-y-6 text-sm">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter italic">Free <span className="text-[var(--accent)]">Livestream Codes (300 Primos) 📺</span></h2>
        <p className="opacity-80 leading-relaxed">
            Every six weeks, HoYoverse does a <strong>Livestream</strong> to show the next game update. During these streams, they share three codes worth a total of <strong>300 Primogems</strong> plus extra materials.
        </p>
        <div className="p-6 rounded-2xl bg-[var(--background)] border border-[var(--border)] mb-8 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[var(--accent)] text-[9px] font-black uppercase italic italic tracking-widest"><FiLayers /> How to Catch Livestream Codes</div>
            <p className="text-[10px] opacity-60 leading-relaxed m-0 italic italic leading-relaxed">
                These codes expire fast — usually in <strong>16 to 24 hours</strong>. We update this page as soon as codes go live. Check back right after any 'Version Update' announcements so you don't miss out.
            </p>
        </div>
      </section>

      <section className="pt-12 space-y-6 text-sm">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter italic">Other Rewards: <span className="text-[var(--accent)]">More Than Just Primogems 💎</span></h2>
        <p className="opacity-80 leading-relaxed">
            Primogems are great, but the <strong>other rewards</strong> in these codes matter too. <strong>Mora</strong>, <strong>Hero's Wit</strong>, and <strong>Adventurer's Experience</strong> are all very useful for leveling up your characters.
        </p>
        <p className="opacity-80 leading-relaxed">
            For high-level players in India, Mora is often the main problem. Using these codes for extra Mora lets you spend your Original Resin on farming good artifacts instead of running Ley Lines for gold.
        </p>
      </section>

      <section className="pt-12 space-y-6 text-sm">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter">Build Up Your <span className="text-[var(--accent)]">Pity Over Time 🛡️</span></h2>
        <p className="opacity-80 leading-relaxed">
            Many experienced players use redeem codes to slowly build up pity. While 60 Primogems might seem small, over 12 months these free codes can add up to 10-15 extra wishes.
        </p>
        <p className="opacity-80 leading-relaxed">
            When you're chasing a C2 character or a signature weapon, that small buffer can be the difference between a successful pull and a wasted 50/50. 
        </p>
        <p className="opacity-80 leading-relaxed italic border-l-2 border-[var(--accent)] pl-6 py-2">
            <strong>Need more Primogems?</strong> If you've used all active codes and are still short before a banner ends, don't worry. Top up your Genesis Crystals through <strong>BlueBuff</strong> using <strong>UPI, Google Pay, or PhonePe</strong> for instant delivery at the best price in India.
        </p>
      </section>

      <section className="mt-12 py-10 border-t border-[var(--border)] border-dashed text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--muted)] opacity-40 mb-6">Codes are only half the battle. Gear up your account with top-ups.</p>
        <div className="flex justify-center">
            <Link 
                href="/games/genshin-impact988" 
                className="px-12 py-4 rounded-2xl bg-[var(--foreground)] text-[var(--background)] text-[11px] font-black uppercase tracking-[0.2em] italic hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-[var(--foreground)]/20 flex items-center gap-2"
            >
                Shop Genesis Crystals <FiExternalLink size={12} />
            </Link>
        </div>
      </section>

      <p className="mt-8 text-xs opacity-50 italic text-center">
        The definitive **Genshin Impact India** redeem code tracker. Bookmark BlueBuff for the newest codes and the fastest **Genshin Primogem UPI top-up** in 2026.
      </p>
    </BlogPostLayout>
  );
}
