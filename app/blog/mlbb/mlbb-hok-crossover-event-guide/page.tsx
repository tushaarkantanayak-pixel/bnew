import type { Metadata } from "next";
import BlogPostLayout from "@/components/Blog/BlogPostLayout";
import Link from "next/link";
import { FiTrendingUp, FiStar, FiShield, FiCheck, FiAlertCircle } from "react-icons/fi";

export const metadata: Metadata = {
  title: "How to Master the Honor of Kings x MLBB Crossover Event",
  description: "Learn how to unlock rewards and exclusive skins during the HOK x MLBB collaboration in 2026.",
  alternates: { canonical: "https://bluebuff.in/blog/mlbb/mlbb-hok-crossover-event-guide" },
};

export default function BlogPage() {
  return (
    <BlogPostLayout
      title="HOW TO USE THE HONOR OF KINGS X MLBB EVENT"
      category="Event Guide"
      readTime="10 min read"
      date="March 29, 2026"
      image="/blog/mlbb-hok.png"
      game="MLBB"
    >
      <section className="space-y-8">
        <div className="relative p-8 rounded-[32px] bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-transparent border border-[var(--accent)]/20 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-10"><FiTrendingUp size={80} /></div>
          <p className="text-lg md:text-xl font-bold tracking-tight italic leading-relaxed m-0 text-[var(--foreground)]">
            "The CROSSOVER OF THE CENTURY has arrived! MLBB and Honor of Kings join forces in 2026 for a massive global event. This isn't just a skin drop—it's a complete thematic overhaul of the Land of Dawn."
          </p>
        </div>

        <p className="opacity-70 leading-relaxed">
          The 2026 <strong>MLBB x Honor of Kings collaboration</strong> adds a new "Event Quest" system. For the first time, players can win prizes by finishing challenges in both games. This guide covers everything from <strong>new skins</strong> to <strong>getting free rewards</strong>.
        </p>
      </section>

      <section className="pt-12">
        <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-1 bg-[var(--accent)] rounded-full" />
            <h2 className="text-3xl font-black uppercase italic tracking-tighter col-span-full">The Skin <span className="text-[var(--accent)]">Showcase</span></h2>
        </div>
        
        <p className="opacity-70 leading-relaxed mb-8">
            The best part of this event is the new set of special skins. These aren't just recolors; they have new effects and looks based on the HOK games. In 2026, MLBB skins have changed to show off these new styles.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Chou", role: "Warrior", grade: "Legend", desc: "Spear of the Zenith transformation with dragon-themed Jeet Kune Do effects." },
            { name: "Guinevere", role: "Mage / Fighter", grade: "Collector", desc: "Lotus Princess design featuring glowing petal trails and a cherry blossom ultimate." },
            { name: "Arlott", role: "Assassin", grade: "Event Ltd", desc: "Celestial Spear aesthetic blending HOK's elite designs with Arlott's dash mastery." }
          ].map((skin, i) => (
            <div key={i} className="group p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-1 rounded">{skin.grade}</span>
                    <FiStar className="text-[var(--accent)]" />
                </div>
                <h3 className="text-lg font-black uppercase italic tracking-tighter mb-2">{skin.name}</h3>
                <p className="text-[10px] leading-relaxed opacity-60 m-0">{skin.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-12 space-y-6 text-sm">
        <h2 className="text-2xl font-black uppercase italic tracking-tighter">The World Pillar <span className="text-[var(--accent)]">Community Hub</span></h2>
        <p className="opacity-80 leading-relaxed">
            One of the most unique aspects of the <strong>HOK x MLBB event</strong> is the "World Pillar Project." This is a global progression system where every match played by the community contributes to a collective milestone. As the pillar grows, all players—regardless of their rank or diamond spending—unlock <strong>exclusive map themes</strong> and shared passive bonuses.
        </p>
        <p className="opacity-80 leading-relaxed">
            In previous collaborations, events were often isolated to the individual player. However, the 2026 <strong>Honor of Kings partnership</strong> marks a shift toward a more unified global MOBA experience. By participating in the World Pillar, you aren't just farming for yourself; you're helping the entire Indian server unlock the "Celestial Arena" map skin, which is widely considered the <strong>best map aesthetic in MLBB history</strong>.
        </p>
      </section>

      <section className="pt-12 space-y-6 text-sm">
        <h2 className="text-2xl font-black uppercase italic tracking-tighter italic">Cultural Impact of <span className="text-[var(--accent)]">MOBA Collaborations</span></h2>
        <p className="opacity-80 leading-relaxed">
            The crossover between <strong>Mobile Legends and Honor of Kings</strong> isn't just about gameplay—it's a massive cultural milestone for the mobile gaming community. For years, these two titles were seen as fierce rivals, competing for the top spot in the global market. Seeing them join forces shows a new level of maturity in the industry, where player experience is prioritized over corporate competition.
        </p>
        <p className="opacity-80 leading-relaxed">
            For <strong>Indian MLBB players</strong>, this event is great. It brings the high quality look of Honor of Kings directly into the game you already love. It's a fresh look for your favorite heroes. This isn't just an event; it's a <strong>big party for mobile gamers</strong>.
        </p>
      </section>

      <div className="bg-[var(--card)] border border-[var(--border)] p-10 rounded-[40px] my-16 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--accent)]" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <FiShield size={20} className="text-[var(--accent)]" />
            <h3 className="italic font-black uppercase text-[var(--accent)] m-0">India Diamond Strategy 🛡️</h3>
          </div>
          <p className="text-sm italic opacity-70 mb-4 font-medium">
            Crossover events can be pricey. If you're in India, try to use the daily discounts to get these skins for less.          </p>
          <p className="text-sm italic opacity-70 m-0">
            Ensure your account is ready with a <strong>fast and cheap MLBB diamond recharge</strong> from <strong>BlueBuff</strong> to catch the lucky hour bonuses and bonus token events.
          </p>
        </div>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-black uppercase italic tracking-tighter">F2P <span className="text-[var(--accent)]">Event Checklist</span></h2>
        <p className="opacity-70 leading-relaxed text-sm">
            Don't have diamonds? No problem. You can still unlock high-tier rewards like <strong>Event Borders, Emotes, and potentially a Special Skin</strong> by following this daily routine:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "Login daily for free 'Legacy Fragments'",
            "Share the event page once a week",
            "Win 3 matches in a party daily",
            "Destroy 15 turrets total this week",
            "Kill 10 Lords or Turtles in Rank",
            "Reach Level 10 in the Crossover Pass"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-[var(--card)]/40 border border-[var(--border)] italic">
              <div className="w-5 h-5 rounded-md bg-[var(--accent)]/20 border border-[var(--border)]/30 flex items-center justify-center flex-shrink-0">
                <FiCheck size={12} className="text-[var(--accent)]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-tight">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-12 space-y-6">
        <div className="p-8 rounded-[32px] bg-red-500/5 border border-red-500/20">
          <div className="flex items-center gap-3 mb-4 text-red-400">
            <FiAlertCircle size={20} />
            <h4 className="m-0 font-black uppercase italic tracking-tighter text-sm">Pro Tip: The Bonus Token Phase</h4>
          </div>
          <p className="text-[11px] leading-relaxed opacity-70 italic m-0">
            Never spend all your diamonds on Day 1! Wait for the <strong>Bonus Recharge Phases</strong>. Mobile Legends traditionally hosts two phases where topping up just 250 diamonds grants you <strong>30+ free draw tokens</strong>. This effectively cuts the cost of a Collector skin in half. Use <strong>BlueBuff</strong> for instant delivery during these peak hours to avoid missing out.
          </p>
        </div>
        
        <div className="p-8 rounded-[32px] bg-[var(--accent)]/5 border border-[var(--border)]">
            <h4 className="m-0 font-black uppercase italic tracking-tighter text-sm mb-4">Conclusion: A New Era for MOBA</h4>
            <p className="text-[11px] leading-relaxed opacity-70 italic m-0">
                The <strong>HOK x MLBB event</strong> represents a milestone in gaming collaborations. Whether you're here for the legendary skins or just the new map aesthetics, this event is one for the history books. Keep grinding those fragments and good luck on your draws!
            </p>
        </div>
      </section>

      <section className="mt-12 py-10 border-t border-[var(--border)] border-dashed text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--muted)] opacity-40 mb-6">Want the new skins? Top up safely.</p>
        <div className="flex justify-center">
            <Link 
                href="/games/mobile-legends988" 
                className="px-8 py-3 rounded-xl bg-[var(--foreground)] text-[var(--background)] text-[10px] font-black uppercase tracking-widest italic hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[var(--foreground)]/10"
            >
                Get MLBB Diamonds Now
            </Link>
        </div>
      </section>

      <p className="mt-8 text-xs opacity-50 italic">
        Need help with your <strong>MLBB recharge India UPI</strong>? Contact our support team for instant assistance with your <strong>Honor of Kings crossover event</strong> top-ups.
      </p>
    </BlogPostLayout>
  );
}
