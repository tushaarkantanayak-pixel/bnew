import type { Metadata } from "next";
import BlogPostLayout from "@/components/Blog/BlogPostLayout";
import Link from "next/link";
import Script from "next/script";
import { FiStar, FiZap, FiShield, FiTarget, FiTrendingUp, FiDatabase, FiDollarSign, FiActivity, FiRefreshCw, FiGrid, FiHelpCircle, FiCheckCircle } from "react-icons/fi";
import AdsterraBanner from "@/components/Ads/AdsterraBanner";
import AdsterraClassicBanner from "@/components/Ads/AdsterraClassicBanner";

export const metadata: Metadata = {
  title: "How Genshin Impact Pity System Works (Simple 2026 Guide)",
  description: "Learn how the Genshin Impact Pity system works. We explain soft pity, hard pity, and the 50/50 rule in simple terms for beginners to save Primogems.",
  alternates: { canonical: "https://bluebuff.in/blog/genshin/genshin-pity-system-explained" },
};

export default function BlogPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is soft pity in Genshin Impact?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Soft pity starts at the 74th wish on the character banner. The base drop rate of 0.6% dramatically increases to roughly 32% per pull, making it highly likely to get a 5-star character before reaching 90 wishes."
        }
      },
      {
        "@type": "Question",
        "name": "How does the 50/50 rule work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When you pull a 5-star on the limited banner, there is a 50% chance it will be the featured character and a 50% chance it will be a standard character. If you lose the 50/50, your next 5-star is 100% guaranteed to be the featured character."
        }
      },
      {
        "@type": "Question",
        "name": "Does pity reset when the banner changes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, your pity count carries over to the next limited character banner. If you did 50 pulls on the current banner without getting a 5-star, you will start the next banner at 50 pity."
        }
      },
      {
        "@type": "Question",
        "name": "How many Primogems do I need for a guaranteed 5-star?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To hit hard pity (90 pulls) you need 14,400 Primogems. To guarantee the featured character (worst-case scenario of 180 pulls), you need exactly 28,800 Primogems."
        }
      },
      {
        "@type": "Question",
        "name": "Is the weapon banner pity different?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Hard pity on the weapon banner is 80 pulls instead of 90. Additionally, it uses a 75/25 chance system and the Epitomized Path to guarantee your chosen weapon after 2 failed 5-star pulls."
        }
      }
    ]
  };

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BlogPostLayout
      title="HOW PITY SYSTEM WORKS IN GENSHIN IMPACT (EXPLAINED SIMPLY)"
      category="Gacha Guide"
      readTime="12 min read"
      date="March 31, 2026"
      image="/blog/genshin/genshin-pity-v2.png"
      game="Genshin"
    >
      <section className="space-y-8">
        <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-transparent border border-[var(--accent)]/20 overflow-hidden shadow-lg mx-auto">
          <div className="absolute top-0 right-0 p-3 opacity-10"><FiStar size={50} /></div>
          <p className="text-base font-semibold tracking-tight italic leading-snug m-0 text-[var(--foreground)]">
            "Genshin Impact isn't just a game; it's a game of calculated risks. Understanding <strong>Soft Pity and Hard Pity</strong> is the difference between getting your favorite C6 character and wasting thousands of Primogems for nothing."
          </p>
        </div>

        <p className="opacity-80 leading-relaxed text-lg">
          For many players, the Genshin Impact gacha system can feel completely random. You might see your friends pull a 5-star in their first ten pulls, while you spend months saving up just to get a character you didn't even want.
        </p>

        <p className="opacity-80 leading-relaxed">
          However, behind the flashy animations of the Wish screen lies a deterministic mathematical system designed to guarantee you high-rarity drops. This guide breaks down the <strong>Genshin Pity System</strong> into simple, easy-to-understand rules so you can plan your pulls and manage your Primogems perfectly.
        </p>
        
        <AdsterraClassicBanner />
      </section>

      <section className="pt-8 space-y-6">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter">Pity System Breakdown: Hard Pity vs. Soft Pity</h2>
        <p className="opacity-80 leading-relaxed">
          The term "Pity" simply refers to a safety net built into the game. It ensures that if you have terrible luck, the game will eventually take pity on you and give you a guaranteed high-tier item.
        </p>

        <div className="overflow-x-auto rounded-xl border border-[var(--border)] mt-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--accent)]/10">
                <th className="p-4 border-b border-[var(--border)] font-bold">Banner Type</th>
                <th className="p-4 border-b border-[var(--border)] font-bold">Soft Pity Starts</th>
                <th className="p-4 border-b border-[var(--border)] font-bold">Hard Pity (Guarantee)</th>
              </tr>
            </thead>
            <tbody className="text-sm opacity-90">
              <tr className="border-b border-[var(--border)] hover:bg-[var(--foreground)]/5 transition-colors">
                <td className="p-4 font-semibold text-[var(--accent)]">Character Event</td>
                <td className="p-4">Wish #74</td>
                <td className="p-4">Wish #90</td>
              </tr>
              <tr className="border-b border-[var(--border)] hover:bg-[var(--foreground)]/5 transition-colors">
                <td className="p-4 font-semibold text-[var(--accent)]">Weapon Event</td>
                <td className="p-4">Wish #65</td>
                <td className="p-4">Wish #80</td>
              </tr>
              <tr className="hover:bg-[var(--foreground)]/5 transition-colors">
                <td className="p-4 font-semibold text-[var(--accent)]">Standard Banner</td>
                <td className="p-4">Wish #74</td>
                <td className="p-4">Wish #90</td>
              </tr>
            </tbody>
          </table>
        </div>

        <ul className="space-y-4 my-8">
          <li className="flex gap-4 items-start bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
            <FiZap className="text-[var(--accent)] shrink-0 mt-1" size={20} />
            <div>
              <strong className="block text-lg mb-1">Soft Pity Explained</strong>
              <span className="opacity-80 text-sm">From wish 1 to 73, your chance of getting a 5-star is only 0.6%. But starting at wish 74, the game drastically increases your odds to roughly 32% per pull. Most players get their 5-star in this range.</span>
            </div>
          </li>
          <li className="flex gap-4 items-start bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
            <FiShield className="text-[var(--accent)] shrink-0 mt-1" size={20} />
            <div>
              <strong className="block text-lg mb-1">Hard Pity Explained</strong>
              <span className="opacity-80 text-sm">If you somehow have incredibly bad luck and fail the soft pity checks, your 90th pull is mathematically guaranteed to be a 5-star character. Hitting exactly 90 is actually extremely rare!</span>
            </div>
          </li>
        </ul>
      </section>

      <div className="w-full flex justify-center my-10">
        <AdsterraBanner />
      </div>

      <section className="pt-8 space-y-6">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter">The Dreaded 50/50 Rule</h2>
        <p className="opacity-80 leading-relaxed">
          The most important concept to master is the <strong>50/50 probability</strong> on the Limited Character Banner. When you finally see that glorious gold shooting star, there is only a 50% chance it is the featured character (like Arlecchino or Raiden Shogun). The other 50% chance is a "Standard" 5-star character from the permanent pool (like Jean, Diluc, or Qiqi).
        </p>
        <p className="opacity-80 leading-relaxed">
          <strong>The Guarantee:</strong> If you "lose" your 50/50 and get a standard character, don't despair! Your NEXT 5-star pull is 100% guaranteed to be the featured character on the banner. 
        </p>
        <p className="opacity-80 leading-relaxed">
          Even better, this guarantee carries over. If you lose the 50/50 today, you can save that 100% guarantee for a completely different character releasing months from now.
        </p>
      </section>

      <section className="pt-8 space-y-6">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter">How to Track Your Pity Count</h2>
        <p className="opacity-80 leading-relaxed">
          Genshin Impact doesn't explicitly tell you your exact pity number on the main screen, but tracking it is incredibly simple. To find out how close you are to a guaranteed 5-star, open the Wish menu and click the <strong>History</strong> button at the bottom. 
        </p>
        <p className="opacity-80 leading-relaxed">
          Each page in the history log displays exactly 5 wishes. Simply count the number of pages since your last 5-star pull and multiply by 5. For example, if your last 5-star was 8 pages ago, you are at exactly 40 pity. This manual tracking is crucial when you are trying to "build pity" without accidentally pulling a character you don't want!
        </p>
      </section>

      <section className="pt-12 space-y-6">
        <div className="flex items-center gap-3 mb-6 border-b border-[var(--border)] pb-4">
          <FiHelpCircle className="text-[var(--accent)]" size={28} />
          <h2 className="text-3xl font-black uppercase italic tracking-tighter m-0">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
            <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">1. What is soft pity in Genshin Impact?</h3>
            <p className="text-sm opacity-80 leading-relaxed">Soft pity starts at the 74th wish on the character banner. The base drop rate of 0.6% dramatically increases to roughly 32% per pull, making it highly likely to get a 5-star character before reaching 90 wishes.</p>
          </div>
          
          <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
            <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">2. How does the 50/50 rule work?</h3>
            <p className="text-sm opacity-80 leading-relaxed">When you pull a 5-star on the limited banner, there is a 50% chance it will be the featured character and a 50% chance it will be a standard character. If you lose the 50/50, your next 5-star is 100% guaranteed to be the featured character.</p>
          </div>

          <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
            <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">3. Does pity reset when the banner changes?</h3>
            <p className="text-sm opacity-80 leading-relaxed">No, your pity count carries over to the next limited character banner. If you did 50 pulls on the current banner without getting a 5-star, you will start the next banner at exactly 50 pity.</p>
          </div>

          <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
            <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">4. How many Primogems do I need for a guaranteed 5-star?</h3>
            <p className="text-sm opacity-80 leading-relaxed">To hit hard pity (90 pulls) you need 14,400 Primogems. To guarantee the featured character (worst-case scenario of losing the 50/50 and doing 180 pulls), you need exactly 28,800 Primogems.</p>
          </div>

          <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
            <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">5. Is the weapon banner pity different?</h3>
            <p className="text-sm opacity-80 leading-relaxed">Yes. Hard pity on the weapon banner is 80 pulls instead of 90. Additionally, it uses a 75/25 chance system and an Epitomized Path feature to guarantee your chosen weapon after 2 failed 5-star pulls.</p>
          </div>
        </div>
      </section>

      <section className="pt-12 space-y-6">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-[var(--background)] to-[var(--card)] border border-[var(--accent)]/30 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[var(--accent)]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[var(--accent)]/20 rounded-full blur-3xl"></div>
          
          <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-4">Conclusion & Key Takeaways</h2>
          <p className="opacity-80 leading-relaxed mb-6">
            Understanding the math behind Genshin Impact's gacha system transforms the game from gambling to strategic resource management. By knowing your pity count, you can plan months in advance and guarantee you never miss your favorite characters.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ul className="space-y-2 text-sm opacity-90">
              <li className="flex items-center gap-2"><FiCheckCircle className="text-[var(--accent)]" /> <span className="font-semibold">Soft Pity starts at 74 pulls.</span></li>
              <li className="flex items-center gap-2"><FiCheckCircle className="text-[var(--accent)]" /> <span className="font-semibold">Hard Pity guarantees a 5-star at 90 pulls.</span></li>
            </ul>
            <ul className="space-y-2 text-sm opacity-90">
              <li className="flex items-center gap-2"><FiCheckCircle className="text-[var(--accent)]" /> <span className="font-semibold">Losing the 50/50 guarantees the next character.</span></li>
              <li className="flex items-center gap-2"><FiCheckCircle className="text-[var(--accent)]" /> <span className="font-semibold">Pity count always carries over between banners.</span></li>
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
          Top-Up Primogems Now
        </a>
      </div>
    </BlogPostLayout>
    </>
  );
}
