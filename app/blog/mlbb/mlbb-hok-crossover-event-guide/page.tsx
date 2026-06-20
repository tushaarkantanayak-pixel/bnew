import type { Metadata } from "next";
import BlogPostLayout from "@/components/Blog/BlogPostLayout";
import Link from "next/link";
import Script from "next/script";
import { FiStar, FiZap, FiTarget, FiDatabase, FiHelpCircle, FiCheckCircle, FiGift } from "react-icons/fi";
import AdsterraBanner from "@/components/Ads/AdsterraBanner";
import AdsterraClassicBanner from "@/components/Ads/AdsterraClassicBanner";

export const metadata: Metadata = {
  title: "Honor of Kings x MLBB Crossover Event Guide (2026)",
  description: "Master the biggest MOBA crossover of the decade! Learn how to unlock exclusive skins, farm event tokens, and maximize your rewards in the HoK x MLBB event.",
  alternates: { canonical: "https://bluebuff.in/blog/mlbb/mlbb-hok-crossover-event-guide" },
};

export default function HoKCrossoverPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "When does the HoK x MLBB crossover end?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The massive crossover event runs for exactly 30 days. Be sure to check the in-game event timer, as all unused tokens will vanish when the event concludes."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get a crossover skin completely for free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! By completing all the daily and weekly crossover quests, you can accumulate enough King's Tokens to purchase one Epic-tier crossover skin for free."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to play Honor of Kings to get rewards?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. While there are account linking bonuses for players who play both games, the primary MLBB rewards can be farmed entirely within the Mobile Legends client."
        }
      },
      {
        "@type": "Question",
        "name": "Are the crossover skins limited edition?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Once the crossover event concludes, these skins will be locked in the vault and may never return, making them some of the rarest skins in MLBB history."
        }
      },
      {
        "@type": "Question",
        "name": "What is the fastest way to get King's Tokens?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The fastest way to get tokens is by doing the 'Recharge MLBB Diamonds' tasks. However, if you are F2P, playing ranked matches with friends yields the highest daily tokens."
        }
      }
    ]
  };

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BlogPostLayout
        title="HOW TO MASTER THE HONOR OF KINGS X MLBB EVENT"
        category="Event Guide"
        readTime="5 min read"
        date="March 29, 2026"
        image="/blog/mlbb/mlbb-hok.png"
        game="MLBB"
      >
        <section className="space-y-8">
          <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-transparent border border-[var(--accent)]/20 overflow-hidden shadow-lg mx-auto">
            <div className="absolute top-0 right-0 p-3 opacity-10"><FiGift size={50} /></div>
            <p className="text-base font-semibold tracking-tight italic leading-snug m-0 text-[var(--foreground)]">
              "Two MOBA titans finally colliding. The Honor of Kings x MLBB crossover isn't just an event; it's a massive goldmine for free skins, limited borders, and exclusive recall effects. Don't miss out."
            </p>
          </div>

          <p className="opacity-80 leading-relaxed text-lg">
            For years, <strong>Mobile Legends: Bang Bang</strong> and <strong>Honor of Kings</strong> have dominated the mobile esports scene as fierce rivals. Now, in an unprecedented move, Moonton and Level Infinite have joined forces for the biggest crossover event of 2026.
          </p>

          <p className="opacity-80 leading-relaxed">
            The event brings iconic HoK heroes into the Land of Dawn through highly detailed, limited-edition skins. However, the event menu is incredibly complex, featuring multiple currencies, gacha draws, and hidden quests. Here is your definitive guide to farming tokens and unlocking rewards before the event ends.
          </p>

          <AdsterraClassicBanner />
        </section>

        <section className="pt-8 space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">Event Currencies Explained</h2>
          <p className="opacity-80 leading-relaxed">
            The crossover introduces several new tokens. Understanding which token buys which reward is crucial so you do not accidentally waste your farming efforts on the wrong items.
          </p>

          <div className="overflow-x-auto rounded-xl border border-[var(--border)] mt-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--accent)]/10">
                  <th className="p-4 border-b border-[var(--border)] font-bold">Token Name</th>
                  <th className="p-4 border-b border-[var(--border)] font-bold">How to Obtain</th>
                  <th className="p-4 border-b border-[var(--border)] font-bold">Best Used For</th>
                </tr>
              </thead>
              <tbody className="text-sm opacity-90">
                <tr className="border-b border-[var(--border)] hover:bg-[var(--foreground)]/5 transition-colors">
                  <td className="p-4 font-semibold text-[var(--accent)]">King's Tokens</td>
                  <td className="p-4">Daily logins, ranked matches, diamond recharges.</td>
                  <td className="p-4 text-green-400 font-bold">Epic Free Skin</td>
                </tr>
                <tr className="border-b border-[var(--border)] hover:bg-[var(--foreground)]/5 transition-colors">
                  <td className="p-4 font-semibold text-[var(--accent)]">Imperial Seals</td>
                  <td className="p-4">Duplicate skins from the gacha draw.</td>
                  <td className="p-4 text-yellow-400 font-bold">Legendary Crossover Skin</td>
                </tr>
                <tr className="hover:bg-[var(--foreground)]/5 transition-colors">
                  <td className="p-4 font-semibold text-[var(--accent)]">Alliance Badges</td>
                  <td className="p-4">Sharing the event on social media.</td>
                  <td className="p-4 text-orange-400 font-bold">Recall Effects & Emotes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="pt-8 space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">How to Get the Free Epic Skin</h2>
          <p className="opacity-80 leading-relaxed">
            The highlight of the event is the free Epic-tier crossover skin available in the event shop. To get it, you need exactly <strong>1,200 King's Tokens</strong>. As a Free-to-Play (F2P) player, you must be incredibly disciplined to hit this number.
          </p>
          
          <ul className="space-y-4 my-8">
            <li className="flex gap-4 items-start bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
              <FiTarget className="text-[var(--accent)] shrink-0 mt-1" size={20} />
              <div>
                <strong className="block text-lg mb-1">Play Ranked with Friends</strong>
                <span className="opacity-80 text-sm">Playing solo yields 10 tokens per match, but playing in a duo or trio squad boosts this to 25 tokens per match. Always invite your friends.</span>
              </div>
            </li>
            <li className="flex gap-4 items-start bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
              <FiZap className="text-[var(--accent)] shrink-0 mt-1" size={20} />
              <div>
                <strong className="block text-lg mb-1">The Weekend Boost</strong>
                <span className="opacity-80 text-sm">Log in every Saturday and Sunday during the event. Moonton activates a "Weekend Multiplier" that doubles all King's Tokens earned from matches.</span>
              </div>
            </li>
          </ul>
        </section>

        <div className="w-full flex justify-center my-10">
          <AdsterraBanner />
        </div>

        <section className="pt-8 space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">The Diamond Recharge Tasks</h2>
          <p className="opacity-80 leading-relaxed">
            If you want to unlock the premium, Legendary-tier crossover skins (like the Gusion x Li Bai skin), you will have to dive into the event's gacha system. This requires MLBB Diamonds.
          </p>
          <p className="opacity-80 leading-relaxed">
            Fortunately, the event features <strong>Premium Supply phases</strong>. During these specific weekend phases, recharging diamonds rewards you with massive amounts of free draw tickets.
          </p>
          <ol className="list-decimal pl-6 space-y-3 opacity-80">
            <li><strong>Phase 1:</strong> Recharging 250 Diamonds yields 15 free gacha tickets.</li>
            <li><strong>Phase 2:</strong> Recharging another 250 Diamonds two weeks later yields another 15 tickets.</li>
            <li><strong>Strategy:</strong> Never draw directly with Diamonds. Always recharge during these phases, claim your free tickets, and use the tickets to draw!</li>
          </ol>
        </section>

        <section className="pt-12 space-y-6">
          <div className="flex items-center gap-3 mb-6 border-b border-[var(--border)] pb-4">
            <FiHelpCircle className="text-[var(--accent)]" size={28} />
            <h2 className="text-3xl font-black uppercase italic tracking-tighter m-0">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">1. When does the HoK x MLBB crossover end?</h3>
              <p className="text-sm opacity-80 leading-relaxed">The massive crossover event runs for exactly 30 days. Be sure to check the in-game event timer, as all unused tokens will vanish when the event concludes.</p>
            </div>
            
            <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">2. Can I get a crossover skin completely for free?</h3>
              <p className="text-sm opacity-80 leading-relaxed">Yes! By completing all the daily and weekly crossover quests, you can accumulate enough King's Tokens to purchase one Epic-tier crossover skin for free.</p>
            </div>

            <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">3. Do I need to play Honor of Kings to get rewards?</h3>
              <p className="text-sm opacity-80 leading-relaxed">No. While there are account linking bonuses for players who play both games, the primary MLBB rewards can be farmed entirely within the Mobile Legends client.</p>
            </div>

            <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">4. Are the crossover skins limited edition?</h3>
              <p className="text-sm opacity-80 leading-relaxed">Yes. Once the crossover event concludes, these skins will be locked in the vault and may never return, making them some of the rarest skins in MLBB history.</p>
            </div>

            <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">5. What is the fastest way to get King's Tokens?</h3>
              <p className="text-sm opacity-80 leading-relaxed">The fastest way to get tokens is by doing the 'Recharge MLBB Diamonds' tasks. However, if you are F2P, playing ranked matches with friends yields the highest daily tokens.</p>
            </div>
          </div>
        </section>

        <section className="pt-12 space-y-6">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[var(--background)] to-[var(--card)] border border-[var(--accent)]/30 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[var(--accent)]/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[var(--accent)]/20 rounded-full blur-3xl"></div>
            
            <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-4">Conclusion & Key Takeaways</h2>
            <p className="opacity-80 leading-relaxed mb-6">
              The HoK x MLBB crossover is incredibly generous if you know how to farm the tokens efficiently. Log in daily, play with friends, and save your diamond recharges for the Premium Supply phases.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ul className="space-y-2 text-sm opacity-90">
                <li className="flex items-center gap-2"><FiCheckCircle className="text-[var(--accent)]" /> <span className="font-semibold">Farm 1,200 King's Tokens for the free Epic Skin.</span></li>
                <li className="flex items-center gap-2"><FiCheckCircle className="text-[var(--accent)]" /> <span className="font-semibold">Play ranked in a Duo/Trio for bonus token yield.</span></li>
              </ul>
              <ul className="space-y-2 text-sm opacity-90">
                <li className="flex items-center gap-2"><FiCheckCircle className="text-[var(--accent)]" /> <span className="font-semibold">Only recharge diamonds during Premium Supply.</span></li>
                <li className="flex items-center gap-2"><FiCheckCircle className="text-[var(--accent)]" /> <span className="font-semibold">All unused tokens will expire after 30 days.</span></li>
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
            Recharge MLBB Diamonds Instantly
          </a>
        </div>
      </BlogPostLayout>
    </>
  );
}
