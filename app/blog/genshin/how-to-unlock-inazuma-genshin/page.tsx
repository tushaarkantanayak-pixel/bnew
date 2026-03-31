import type { Metadata } from "next";
import BlogPostLayout from "@/components/Blog/BlogPostLayout";
import Link from "next/link";
import { FiCompass, FiZap, FiShield, FiTarget, FiStar, FiMap, FiAnchor, FiActivity, FiGlobe } from "react-icons/fi";

export const metadata: Metadata = {
  title: "How to Unlock Inazuma in Genshin Impact Step by Step – 2026",
  description: "Ready to cross the ocean? Master the fastest way to unlock Inazuma with our elite Archon Quest guide for India players.",
  alternates: { canonical: "https://bluebuff.in/blog/genshin/how-to-unlock-inazuma-genshin" },
};

export default function BlogPage() {
  return (
    <BlogPostLayout
      title="HOW TO UNLOCK INAZUMA IN GENSHIN IMPACT STEP BY STEP"
      category="Quest Guide"
      readTime="8 min read"
      date="March 31, 2026"
      image="/blog/genshin-inazuma-unlock.png"
      game="Genshin"
    >
      <section className="space-y-8">
        <div className="relative p-8 rounded-[32px] bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-transparent border border-[var(--accent)]/20 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-10"><FiCompass size={80} /></div>
          <p className="text-lg md:text-xl font-bold tracking-tight italic leading-relaxed m-0 text-[var(--foreground)]">
            "INAZUMA is a land of thunder and lightning, but getting there is the first major hurdle for every Traveler in 2026. This is the definitive path to crossing the sea."
          </p>
        </div>

        <p className="opacity-80 leading-relaxed">
            Unlike Mondstadt and Liyue, <strong>Inazuma</strong> is an island nation separated by the treacherous <em>Dark Sea</em>. You cannot swim or ice-bridge your way there. To unlock the Land of Eternity, you must follow a specific sequence of Archon Quests and reach a minimum Adventure Rank. This step-by-step walkthrough ensures you don't miss a single beat.
        </p>
      </section>

      <section className="pt-12 space-y-6">
        <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-1 bg-[var(--accent)] rounded-full" />
            <h2 className="text-3xl font-black uppercase italic tracking-tighter col-span-full">The <span className="text-[var(--accent)]">Prerequisites 📋</span></h2>
        </div>
        
        <p className="opacity-80 leading-relaxed text-sm">
            Before you can even begin the voyage with <strong>Beidou</strong> and <strong>Kazuha</strong>, your account must meet these three non-negotiable requirements.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Adventure Rank 30", icon: FiStar, desc: "You must be at least AR 30 to trigger the Archon Quest Chapter II: Act I." },
            { name: "Liyue Archon Quests", icon: FiMap, desc: "Complete 'A New Star Approaches' and 'Autumn Winds, Scarlet Leaves'." },
            { name: "The Alcor Ship", icon: FiAnchor, desc: "Unlock the ability to board Beidou's ship at Gunyun Stone Forest." }
          ].map((item, i) => (
            <div key={i} className="group p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all">
                <div className="flex items-center justify-between mb-3 text-[var(--accent)]">
                    <item.icon />
                </div>
                <h3 className="text-lg font-black uppercase italic tracking-tighter mb-2">{item.name}</h3>
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
            <h3 className="italic font-black uppercase text-[var(--accent)] m-0">Step 1: Autumn Winds, Scarlet Leaves 🍁</h3>
          </div>
          <p className="opacity-80 leading-relaxed mb-4">
            After finishing the main Liyue storyline, talk to <strong>Katheryne</strong> in Liyue Harbor. This will trigger the "A New Star Approaches" follow-up quest. You will meet <strong>Beidou</strong> and <strong>Kazuha</strong> during the <em>Crux Clash</em> tournament in Guyun Stone Forest.
          </p>
          <p className="opacity-80 leading-relaxed italic text-[11px]">
            <strong>Pro Tip:</strong> Ensure your main DPS is well-built for the Crux Clash. Though you can't use elemental skills in the later stages, having high-attack artifacts makes it a breeze.
          </p>
        </div>
      </div>

      <section className="pt-12 space-y-6 text-sm">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter italic">Step 2: <span className="text-[var(--accent)]">The Immovable God & the Eternal Euthymia ⚡</span></h2>
        <p className="opacity-80 leading-relaxed">
            Head to Liyue Harbor and seek out <strong>Katheryne</strong> again. She will introduce you to a girl named <strong>Tohma</strong> (via a cutscene later) through the quest "Set Sail." You'll be instructed to board Beidou's flagship, <strong>The Alcor</strong>, which is stationed to the east of Guyun Stone Forest.
        </p>
        <div className="p-6 rounded-2xl bg-[var(--accent)]/5 border-l-2 border-[var(--accent)] mb-6">
            <p className="italic m-0 text-[11px] opacity-70">
                <strong>Warning:</strong> Once you land in Ritou, you cannot leave the immediate area until you complete the initial Inazuma Archon Quest tasks. Pack your inventory with food and ascension materials before you leave Liyue!
            </p>
        </div>
      </section>

      <section className="pt-12 space-y-6 text-sm">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter">Step 3: <span className="text-[var(--accent)]">Entry into Ritou ⛩️</span></h2>
        <p className="opacity-80 leading-relaxed">
            Upon arriving, you will meet <strong>Thoma</strong>. He will guide you through the <em>Outlander Affairs Agency</em> in Ritou. This is a crucial story moment where you learn about the <strong>Vision Hunt Decree</strong>. 
        </p>
        <p className="opacity-80 leading-relaxed">
            <strong>The Travel Permit:</strong> To freely explore Narukami Island, you must obtain a Travel Permit. Follow Thoma's instructions and meet with <strong>Hiiragi Chisato</strong> to unlock the path beyond Ritou's gates.
        </p>
      </section>

      <section className="pt-12 space-y-6 text-sm">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter">Ascending <span className="text-[var(--accent)]">Inazuma Characters 💎</span></h2>
        <p className="opacity-80 leading-relaxed">
            Unlocking Inazuma is priority #1 if you've recently pulled <strong>Raiden Shogun, Ayaka, or Yoimiya</strong>. Their ascension materials (like Amakumo Fruits or Sakura Blooms) are exclusively found on the Inazuma islands.
        </p>
        <p className="opacity-80 leading-relaxed">
            If you need extra resins for farming these boss materials or Primogems for that next Inazuma character pull, always use a <strong>trusted top-up India</strong> route. <strong>BlueBuff</strong> provides the fastest <strong>Genshin Primogem UPI recharge</strong>, so you can focus on mastering the lightning-fast combat of the Thunder Region.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-16">
        <div className="p-8 rounded-[32px] bg-[var(--accent)]/5 border border-[var(--border)]">
          <FiTarget size={32} className="text-[var(--accent)] mb-4" />
          <h4 className="text-xl font-black uppercase italic mb-2 tracking-tighter">AR Barriers</h4>
          <p className="text-[11px] opacity-60 m-0 leading-relaxed">If you are below AR 30, prioritize World Quests and daily commissions first to hit the level cap.</p>
        </div>
        <div className="p-8 rounded-[32px] bg-[var(--accent)]/5 border border-[var(--border)]">
          <FiGlobe size={32} className="text-[var(--accent)] mb-4" />
          <h4 className="text-xl font-black uppercase italic mb-2 tracking-tighter">Interactive Map</h4>
          <p className="text-[11px] opacity-60 m-0 leading-relaxed">Inazuma is full of vertical terrain. Use the official map to find the Waverider Waypoints early for easy travel.</p>
        </div>
      </div>

      <section className="mt-12 py-10 border-t border-[var(--border)] border-dashed text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--muted)] opacity-40 mb-6">Need Primogems for Inazuma pulls? We got you.</p>
        <div className="flex justify-center">
            <Link 
                href="/games/genshin-impact988" 
                className="px-12 py-4 rounded-2xl bg-[var(--foreground)] text-[var(--background)] text-[11px] font-black uppercase tracking-[0.2em] italic hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-[var(--foreground)]/20"
            >
                Genshin India Shop
            </Link>
        </div>
      </section>

      <p className="mt-8 text-xs opacity-50 italic text-center">
        The definitive <strong>Genshin Impact India</strong> guide to unlocking Inazuma fast. Secure your <strong>primogem top-up UPI</strong> at BlueBuff and start your island adventure today.
      </p>
    </BlogPostLayout>
  );
}
