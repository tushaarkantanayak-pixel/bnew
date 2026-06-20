import type { Metadata } from "next";
import BlogPostLayout from "@/components/Blog/BlogPostLayout";
import Link from "next/link";
import Script from "next/script";
import { FiTrendingDown, FiTarget, FiZap, FiMap, FiHelpCircle, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";
import AdsterraBanner from "@/components/Ads/AdsterraBanner";
import AdsterraClassicBanner from "@/components/Ads/AdsterraClassicBanner";

export const metadata: Metadata = {
  title: "5 Mistakes Throwing Your MLBB Games (And How to Stop)",
  description: "Stop losing winning games! Discover the 5 most common mistakes even Mythic Mobile Legends players make, from map awareness to poor drafting.",
  alternates: { canonical: "https://bluebuff.in/blog/mlbb/mlbb-avoid-common-mistakes-to-win" },
};

export default function MLBBCommonMistakesPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why do I always lose in the late game in MLBB?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Late-game losses are usually caused by overextending without vision or failing to secure the Enhanced Lord, allowing the enemy team to wipe you out with long respawn timers."
        }
      },
      {
        "@type": "Question",
        "name": "Is it bad to chase kills in Mobile Legends?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Chasing kills (tunnel vision) often drags you into unrevealed bushes where the enemy team is waiting to ambush you. Always prioritize pushing towers over chasing kills."
        }
      },
      {
        "@type": "Question",
        "name": "When should I recall to base?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Recall when your HP or Mana is dangerously low, or immediately after wiping the enemy team and pushing a wave, so you can spend your gold and contest the next objective with full health."
        }
      },
      {
        "@type": "Question",
        "name": "Why is anti-heal so important in MLBB?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Anti-heal items (like Sea Halberd or Necklace of Durance) reduce the enemy's lifesteal and shield generation by 50%. This is mandatory against heroes like Estes, Uranus, and Ruby."
        }
      },
      {
        "@type": "Question",
        "name": "How do I stop getting tilted in solo queue?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mute toxic teammates immediately, take a 10-minute break after two consecutive losses, and focus solely on your own gameplay and macro decisions rather than your team's mistakes."
        }
      }
    ]
  };

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BlogPostLayout
        title="STOP THROWING GAMES! 5 COMMON MISTAKES EVEN PRO MLBB PLAYERS MAKE"
        category="Tips & Tricks"
        readTime="6 min read"
        date="March 28, 2026"
        image="/blog/mlbb/mlbb-mistakes.png"
        game="MLBB"
      >
        <section className="space-y-8">
          <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-transparent border border-[var(--accent)]/20 overflow-hidden shadow-lg mx-auto">
            <div className="absolute top-0 right-0 p-3 opacity-10"><FiTrendingDown size={50} /></div>
            <p className="text-base font-semibold tracking-tight italic leading-snug m-0 text-[var(--foreground)]">
              "You are up 15 kills. You have taken every turtle. The enemy base is exposed. Suddenly, your team fights in the jungle, gets completely wiped, and you lose the game. Sound familiar? Here is why it keeps happening."
            </p>
          </div>

          <p className="opacity-80 leading-relaxed text-lg">
            There is nothing more frustrating in <strong>Mobile Legends: Bang Bang (MLBB)</strong> than an "epic comeback" by the enemy team. You had the game in the palm of your hands, but one tiny mistake threw away a 20-minute effort.
          </p>

          <p className="opacity-80 leading-relaxed">
            The truth is, mechanical skill will only get you so far. The difference between an Epic player and a Mythic Immortal player is macro-level discipline. In this guide, we break down the 5 most common mistakes that cause players to throw winning games, and exactly how to fix them.
          </p>

          <AdsterraClassicBanner />
        </section>

        <section className="pt-8 space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">Mistake 1: The "Tunnel Vision" Kill Chase</h2>
          <p className="opacity-80 leading-relaxed">
            We have all seen it. The enemy Marksman is at 10% HP and running into their jungle. Your team's Assassin decides to chase them halfway across the map, completely ignoring the fact that none of the other four enemies are visible on the minimap.
          </p>
          <p className="opacity-80 leading-relaxed">
            <strong>The Fix:</strong> Never chase a kill past the river if you do not have vision of the enemy Roamer and Mid Laner. <em>Kills do not win games; destroying the enemy crystal wins games.</em> If the enemy is running away to recall, use that 15-second window to steal their jungle buffs or push a tower for free gold.
          </p>
        </section>

        <section className="pt-8 space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">Mistake 2: Ignoring Anti-Heal Items</h2>
          <p className="opacity-80 leading-relaxed">
            Imagine trying to fight an Estes, Uranus, and Ruby without a single anti-heal item on your team. It is mathematically impossible to win that team fight, yet players consistently blindly follow their "Pro Builds" and refuse to adapt.
          </p>

          <div className="overflow-x-auto rounded-xl border border-[var(--border)] mt-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--accent)]/10">
                  <th className="p-4 border-b border-[var(--border)] font-bold">Your Role</th>
                  <th className="p-4 border-b border-[var(--border)] font-bold">Required Anti-Heal Item</th>
                  <th className="p-4 border-b border-[var(--border)] font-bold">When to Buy</th>
                </tr>
              </thead>
              <tbody className="text-sm opacity-90">
                <tr className="border-b border-[var(--border)] hover:bg-[var(--foreground)]/5 transition-colors">
                  <td className="p-4 font-semibold text-[var(--accent)]">Physical Damage / MM</td>
                  <td className="p-4">Sea Halberd</td>
                  <td className="p-4">2nd or 3rd Item</td>
                </tr>
                <tr className="border-b border-[var(--border)] hover:bg-[var(--foreground)]/5 transition-colors">
                  <td className="p-4 font-semibold text-[var(--accent)]">Magic Damage / Mage</td>
                  <td className="p-4">Necklace of Durance (NoD)</td>
                  <td className="p-4">2nd Item</td>
                </tr>
                <tr className="hover:bg-[var(--foreground)]/5 transition-colors">
                  <td className="p-4 font-semibold text-[var(--accent)]">Tank / Roamer</td>
                  <td className="p-4">Dominance Ice</td>
                  <td className="p-4 font-bold text-green-400">1st Item (Mandatory)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="w-full flex justify-center my-10">
          <AdsterraBanner />
        </div>

        <section className="pt-8 space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">Mistake 3: Starting Lord Without Zoning</h2>
          <p className="opacity-80 leading-relaxed">
            Your team secures a double kill. Your Jungler immediately starts attacking the Lord. The enemy team's remaining three players walk up, their Jungler uses Retribution, steals the Lord, and turns the game around. Sound familiar?
          </p>
          <p className="opacity-80 leading-relaxed">
            <strong>The Fix:</strong> The Roamer and Exp Laner should <em>never</em> hit the Lord. Their job is to stand in the bushes near the river and "zone" the enemy away. If the enemy Jungler cannot get close to the pit, they cannot steal the objective.
          </p>
        </section>

        <section className="pt-8 space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">Mistake 4: Not Clearing Super Minions</h2>
          <p className="opacity-80 leading-relaxed">
            Late-game super minions deal massive damage to your base. Often, a team will wipe the enemy, rush straight down the middle lane to end the game, and completely ignore the massive wave of super minions destroying their own crystal in the side lane.
          </p>
          <p className="opacity-80 leading-relaxed">
            <strong>The Fix:</strong> Always check your side lanes before committing to a 5-man push. Send your most mobile hero (usually the Assassin or Exp Laner) to quickly clear the side waves while the rest of the team groups up mid.
          </p>
        </section>

        <section className="pt-12 space-y-6">
          <div className="flex items-center gap-3 mb-6 border-b border-[var(--border)] pb-4">
            <FiHelpCircle className="text-[var(--accent)]" size={28} />
            <h2 className="text-3xl font-black uppercase italic tracking-tighter m-0">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">1. Why do I always lose in the late game in MLBB?</h3>
              <p className="text-sm opacity-80 leading-relaxed">Late-game losses are usually caused by overextending without vision or failing to secure the Enhanced Lord, allowing the enemy team to wipe you out with long respawn timers.</p>
            </div>
            
            <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">2. Is it bad to chase kills in Mobile Legends?</h3>
              <p className="text-sm opacity-80 leading-relaxed">Yes. Chasing kills (tunnel vision) often drags you into unrevealed bushes where the enemy team is waiting to ambush you. Always prioritize pushing towers over chasing kills.</p>
            </div>

            <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">3. When should I recall to base?</h3>
              <p className="text-sm opacity-80 leading-relaxed">Recall when your HP or Mana is dangerously low, or immediately after wiping the enemy team and pushing a wave, so you can spend your gold and contest the next objective with full health.</p>
            </div>

            <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">4. Why is anti-heal so important in MLBB?</h3>
              <p className="text-sm opacity-80 leading-relaxed">Anti-heal items (like Sea Halberd or Necklace of Durance) reduce the enemy's lifesteal and shield generation by 50%. This is mandatory against heroes like Estes, Uranus, and Ruby.</p>
            </div>

            <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">5. How do I stop getting tilted in solo queue?</h3>
              <p className="text-sm opacity-80 leading-relaxed">Mute toxic teammates immediately, take a 10-minute break after two consecutive losses, and focus solely on your own gameplay and macro decisions rather than your team's mistakes.</p>
            </div>
          </div>
        </section>

        <section className="pt-12 space-y-6">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[var(--background)] to-[var(--card)] border border-[var(--accent)]/30 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[var(--accent)]/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[var(--accent)]/20 rounded-full blur-3xl"></div>
            
            <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-4">Conclusion & Key Takeaways</h2>
            <p className="opacity-80 leading-relaxed mb-6">
              Stop playing on autopilot! By actively thinking about your item builds, map vision, and objective control, you will instantly see a massive boost in your ranked win rate.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ul className="space-y-2 text-sm opacity-90">
                <li className="flex items-center gap-2"><FiCheckCircle className="text-[var(--accent)]" /> <span className="font-semibold">Towers win games. Do not blindly chase kills.</span></li>
                <li className="flex items-center gap-2"><FiCheckCircle className="text-[var(--accent)]" /> <span className="font-semibold">Always build anti-heal against heavy sustain teams.</span></li>
              </ul>
              <ul className="space-y-2 text-sm opacity-90">
                <li className="flex items-center gap-2"><FiCheckCircle className="text-[var(--accent)]" /> <span className="font-semibold">Roamers MUST zone the enemy away during Lord attempts.</span></li>
                <li className="flex items-center gap-2"><FiCheckCircle className="text-[var(--accent)]" /> <span className="font-semibold">Clear side lane super minions before grouping up mid.</span></li>
              </ul>
            </div>
          </div>
        </section>

        <div className="flex justify-center mt-12 mb-8 relative z-10">
          <a
            href="https://mlbbtopup.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 md:px-12 py-4 rounded-2xl bg-[var(--accent)] !text-white font-black uppercase tracking-[0.2em] italic hover:scale-105 active:scale-95 transition-transform shadow-xl shadow-[var(--accent)]/30 border-2 border-[var(--accent)] no-underline"
          >
            Buy MLBB Diamonds - BlueBuff Top-Up
          </a>
        </div>
      </BlogPostLayout>
    </>
  );
}
