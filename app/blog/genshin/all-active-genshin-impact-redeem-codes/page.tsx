import type { Metadata } from "next";
import BlogPostLayout from "@/components/Blog/BlogPostLayout";
import Link from "next/link";
import Script from "next/script";
import { FiGift, FiZap, FiTarget, FiDatabase, FiHelpCircle, FiCheckCircle, FiUnlock } from "react-icons/fi";
import AdsterraBanner from "@/components/Ads/AdsterraBanner";
import AdsterraClassicBanner from "@/components/Ads/AdsterraClassicBanner";

export const metadata: Metadata = {
  title: "All Active Genshin Impact Redeem Codes (2026)",
  description: "Get the latest active Genshin Impact promo codes for free Primogems, Mora, and Hero's Wits. We update this list daily so you never miss a free reward.",
  alternates: { canonical: "https://bluebuff.in/blog/genshin/all-active-genshin-impact-redeem-codes" },
};

export default function GenshinCodesPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I redeem Genshin Impact codes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can redeem codes in-game by going to Settings > Account > Redeem Code, or by logging into the official HoYoverse gift redemption website."
        }
      },
      {
        "@type": "Question",
        "name": "Why is my Genshin Impact promo code invalid?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The code may be expired, entered incorrectly, or already redeemed on your account. Livestream codes expire very quickly, usually within 12 to 24 hours."
        }
      },
      {
        "@type": "Question",
        "name": "What Adventure Rank is required to redeem codes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You must reach Adventure Rank 10 to unlock the ability to redeem promotional codes and receive the items in your in-game mailbox."
        }
      },
      {
        "@type": "Question",
        "name": "How often does Genshin release new codes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "HoYoverse releases three new codes during every Special Program Livestream (every 6 weeks), and usually drops 1-2 minor codes at the start of a new patch."
        }
      },
      {
        "@type": "Question",
        "name": "Can I redeem Genshin codes on PlayStation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, PS4 and PS5 players can redeem codes directly through the in-game Settings menu under the Account tab."
        }
      }
    ]
  };

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BlogPostLayout
        title="ALL ACTIVE GENSHIN IMPACT REDEEM CODES (UPDATED DAILY)"
        category="Redeem Codes"
        readTime="4 min read"
        date="March 31, 2026"
        image="/blog/genshin/genshin-redeem-codes.png"
        game="Genshin"
      >
        <section className="space-y-8">
          <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-transparent border border-[var(--accent)]/20 overflow-hidden shadow-lg mx-auto">
            <div className="absolute top-0 right-0 p-3 opacity-10"><FiGift size={50} /></div>
            <p className="text-base font-semibold tracking-tight italic leading-snug m-0 text-[var(--foreground)]">
              "Never pay full price for Primogems if you don't have to. Bookmark this page, because we hunt down every single free promo code HoYoverse drops so you can stack wishes for free."
            </p>
          </div>

          <p className="opacity-80 leading-relaxed text-lg">
            HoYoverse loves to give back to the <strong>Genshin Impact</strong> community by regularly dropping promotional codes. These codes are packed with free Primogems, Mora, Hero's Wits, and Mystic Enhancement Ores.
          </p>

          <p className="opacity-80 leading-relaxed">
            However, most of these codes expire incredibly fast. Livestream codes, for example, are only valid for 12 hours! To ensure you never miss out, we update this master list of active Genshin Impact redeem codes every single day.
          </p>

          <AdsterraClassicBanner />
        </section>

        <section className="pt-8 space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">Current Active Codes</h2>
          <p className="opacity-80 leading-relaxed">
            Here are all the currently active promo codes. Be sure to copy them exactly as they are written, as they are case-sensitive.
          </p>

          <div className="overflow-x-auto rounded-xl border border-[var(--border)] mt-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--accent)]/10">
                  <th className="p-4 border-b border-[var(--border)] font-bold">Promo Code</th>
                  <th className="p-4 border-b border-[var(--border)] font-bold">Rewards</th>
                  <th className="p-4 border-b border-[var(--border)] font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm opacity-90">
                <tr className="border-b border-[var(--border)] hover:bg-[var(--foreground)]/5 transition-colors">
                  <td className="p-4 font-mono font-bold text-[var(--accent)] text-lg tracking-widest">GENSHINGIFT</td>
                  <td className="p-4">50 Primogems, 3x Hero's Wit</td>
                  <td className="p-4 text-green-400 font-bold">Permanent</td>
                </tr>
                <tr className="border-b border-[var(--border)] hover:bg-[var(--foreground)]/5 transition-colors">
                  <td className="p-4 font-mono font-bold text-[var(--accent)] text-lg tracking-widest">WAZGIQ9M</td>
                  <td className="p-4">10,000 Mora, 10x Adventurer's Experience</td>
                  <td className="p-4 text-green-400 font-bold">Active</td>
                </tr>
                <tr className="border-b border-[var(--border)] hover:bg-[var(--foreground)]/5 transition-colors">
                  <td className="p-4 font-mono font-bold text-[var(--accent)] text-lg tracking-widest">CT2BDW7JD</td>
                  <td className="p-4">60 Primogems, 5x Adventurer's Experience</td>
                  <td className="p-4 text-yellow-400 font-bold">Expiring Soon</td>
                </tr>
                <tr className="hover:bg-[var(--foreground)]/5 transition-colors opacity-50">
                  <td className="p-4 font-mono font-bold line-through">PT8SG36HK</td>
                  <td className="p-4 line-through">100 Primogems, 10x Mystic Ore</td>
                  <td className="p-4 text-red-400 font-bold">Expired</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="pt-8 space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">How to Redeem Your Codes</h2>
          <p className="opacity-80 leading-relaxed">
            Redeeming your codes is simple, but there is one major catch: <strong>You must be Adventure Rank 10</strong> or higher to use the redemption system. Once you hit AR 10, you have two ways to claim your loot.
          </p>
          
          <ul className="space-y-4 my-8">
            <li className="flex gap-4 items-start bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
              <FiUnlock className="text-[var(--accent)] shrink-0 mt-1" size={20} />
              <div>
                <strong className="block text-lg mb-1">Method 1: In-Game (Fastest)</strong>
                <span className="opacity-80 text-sm">Open the Paimon Menu. Go to Settings (the gear icon) &gt; Account &gt; Redeem Code. Paste your code and hit exchange. The items will be sent to your in-game mailbox immediately.</span>
              </div>
            </li>
            <li className="flex gap-4 items-start bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
              <FiDatabase className="text-[var(--accent)] shrink-0 mt-1" size={20} />
              <div>
                <strong className="block text-lg mb-1">Method 2: Official Website</strong>
                <span className="opacity-80 text-sm">Go to the official HoYoverse gift redemption website. Log in with your account details, select your server region, and paste the promo code.</span>
              </div>
            </li>
          </ul>
        </section>

        <div className="w-full flex justify-center my-10">
          <AdsterraBanner />
        </div>

        <section className="pt-8 space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">The 300 Primogem Livestream Codes</h2>
          <p className="opacity-80 leading-relaxed">
            The most important codes of the entire game drop during the Special Program Livestreams. About two weeks before a new version update, HoYoverse hosts a broadcast on Twitch and YouTube.
          </p>
          <p className="opacity-80 leading-relaxed">
            During the broadcast, they drop exactly three unique promo codes, each worth 100 Primogems. These codes are a massive boost, but they are designed to punish players who don't pay attention: <strong>Livestream codes expire in exactly 12 hours.</strong> 
          </p>
          <p className="opacity-80 leading-relaxed text-sm italic text-[var(--accent)] font-semibold">
            Pro Tip: You don't actually have to watch the livestream! Just check back on this page the day of the broadcast, as we update our table within minutes of the codes going live.
          </p>
        </section>

        <section className="pt-12 space-y-6">
          <div className="flex items-center gap-3 mb-6 border-b border-[var(--border)] pb-4">
            <FiHelpCircle className="text-[var(--accent)]" size={28} />
            <h2 className="text-3xl font-black uppercase italic tracking-tighter m-0">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">1. How do I redeem Genshin Impact codes?</h3>
              <p className="text-sm opacity-80 leading-relaxed">You can redeem codes in-game by going to Settings &gt; Account &gt; Redeem Code, or by logging into the official HoYoverse gift redemption website.</p>
            </div>
            
            <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">2. Why is my Genshin Impact promo code invalid?</h3>
              <p className="text-sm opacity-80 leading-relaxed">The code may be expired, entered incorrectly, or already redeemed on your account. Livestream codes expire very quickly, usually within 12 to 24 hours.</p>
            </div>

            <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">3. What Adventure Rank is required to redeem codes?</h3>
              <p className="text-sm opacity-80 leading-relaxed">You must reach Adventure Rank 10 to unlock the ability to redeem promotional codes and receive the items in your in-game mailbox.</p>
            </div>

            <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">4. How often does Genshin release new codes?</h3>
              <p className="text-sm opacity-80 leading-relaxed">HoYoverse releases three new codes during every Special Program Livestream (every 6 weeks), and usually drops 1-2 minor codes at the start of a new patch.</p>
            </div>

            <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">5. Can I redeem Genshin codes on PlayStation?</h3>
              <p className="text-sm opacity-80 leading-relaxed">Yes, PS4 and PS5 players can redeem codes directly through the in-game Settings menu under the Account tab.</p>
            </div>
          </div>
        </section>

        <section className="pt-12 space-y-6">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[var(--background)] to-[var(--card)] border border-[var(--accent)]/30 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[var(--accent)]/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[var(--accent)]/20 rounded-full blur-3xl"></div>
            
            <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-4">Conclusion & Key Takeaways</h2>
            <p className="opacity-80 leading-relaxed mb-6">
              Claiming free promo codes is the easiest way to stack up Primogems for your next 5-star character pull. Always redeem codes the moment you see them to avoid expiration!
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ul className="space-y-2 text-sm opacity-90">
                <li className="flex items-center gap-2"><FiCheckCircle className="text-[var(--accent)]" /> <span className="font-semibold">GENSHINGIFT is permanent and always active.</span></li>
                <li className="flex items-center gap-2"><FiCheckCircle className="text-[var(--accent)]" /> <span className="font-semibold">You must be Adventure Rank 10 to redeem.</span></li>
              </ul>
              <ul className="space-y-2 text-sm opacity-90">
                <li className="flex items-center gap-2"><FiCheckCircle className="text-[var(--accent)]" /> <span className="font-semibold">Livestream codes expire in exactly 12 hours.</span></li>
                <li className="flex items-center gap-2"><FiCheckCircle className="text-[var(--accent)]" /> <span className="font-semibold">Redeem quickly in-game via the Account tab.</span></li>
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
            Top-Up Genesis Crystals Now
          </a>
        </div>
      </BlogPostLayout>
    </>
  );
}
