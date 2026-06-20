import type { Metadata } from "next";
import BlogPostLayout from "@/components/Blog/BlogPostLayout";
import Link from "next/link";
import Script from "next/script";
import { FiMap, FiTarget, FiZap, FiAnchor, FiAward, FiHelpCircle, FiCheckCircle } from "react-icons/fi";
import AdsterraBanner from "@/components/Ads/AdsterraBanner";
import AdsterraClassicBanner from "@/components/Ads/AdsterraClassicBanner";

export const metadata: Metadata = {
  title: "How to Unlock Inazuma in Genshin Impact (Step by Step)",
  description: "Trying to reach the Electro nation? Here is the complete step-by-step guide to unlocking Inazuma in Genshin Impact, including required Adventure Rank and quests.",
  alternates: { canonical: "https://bluebuff.in/blog/genshin/how-to-unlock-inazuma-genshin" },
};

export default function UnlockInazumaPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I ice bridge to Inazuma using Kaeya?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No! If you try to ice bridge across the ocean to Inazuma, a massive lightning storm will strike you down and teleport you back to Liyue. You must take the ship with Beidou."
        }
      },
      {
        "@type": "Question",
        "name": "What Adventure Rank is required for Inazuma?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You must reach Adventure Rank 30 to start the 'Autumn Winds, Scarlet Leaves' Archon Quest, which is the direct prerequisite to sailing to Inazuma."
        }
      },
      {
        "@type": "Question",
        "name": "How do I start the Autumn Winds, Scarlet Leaves quest?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "After hitting AR 30 and completing the 'A New Star Approaches' quest in Liyue, talk to Atsuko in Liyue Harbor. She will tell you to look for Captain Beidou in the Guyun Stone Forest."
        }
      },
      {
        "@type": "Question",
        "name": "How do I get out of Ritou once I arrive in Inazuma?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When you first arrive, you are locked in the starting port of Ritou. To leave, you must complete the 'Ritou Escape Plan' questline given by Thoma, or secure a Travel Permit."
        }
      },
      {
        "@type": "Question",
        "name": "Why can't I ascend my Inazuma characters early?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Inazuma characters (like Ayaka or Raiden Shogun) require regional specialties found only in Inazuma. Because the nation is story-locked, you cannot farm their materials until you officially sail there."
        }
      }
    ]
  };

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BlogPostLayout
        title="HOW TO UNLOCK INAZUMA IN GENSHIN IMPACT STEP BY STEP"
        category="Quest Guide"
        readTime="8 min read"
        date="March 31, 2026"
        image="/blog/genshin/genshin-inazuma-unlock.png"
        game="Genshin"
      >
        <section className="space-y-8">
          <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-transparent border border-[var(--accent)]/20 overflow-hidden shadow-lg mx-auto">
            <div className="absolute top-0 right-0 p-3 opacity-10"><FiMap size={50} /></div>
            <p className="text-base font-semibold tracking-tight italic leading-snug m-0 text-[var(--foreground)]">
              "We've all tried it. Walking to the edge of the Liyue map, equipping Kaeya, and trying to ice bridge across the ocean to Inazuma. Spoiler alert: You get struck by lightning and teleported back. Here is the actual way to get there."
            </p>
          </div>

          <p className="opacity-80 leading-relaxed text-lg">
            Unlike Mondstadt, Liyue, or Sumeru, you cannot simply walk into <strong>Inazuma</strong>. The Electro nation is fiercely isolated by the Raiden Shogun's decree, surrounded by an impassable thunderstorm that instantly destroys players attempting to cross the sea illegally.
          </p>

          <p className="opacity-80 leading-relaxed">
            If you just pulled an Inazuma character like Kamisato Ayaka or Yae Miko, you are probably desperate to reach the islands to farm their ascension materials. In this step-by-step guide, we will break down exactly how to officially unlock Inazuma in Genshin Impact.
          </p>

          <AdsterraClassicBanner />
        </section>

        <section className="pt-8 space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">The Prerequisites Checklist</h2>
          <p className="opacity-80 leading-relaxed">
            Before you can set sail, you must meet some strict story requirements. Inazuma is a mid-game region, meaning brand new accounts cannot rush there immediately.
          </p>

          <div className="overflow-x-auto rounded-xl border border-[var(--border)] mt-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--accent)]/10">
                  <th className="p-4 border-b border-[var(--border)] font-bold">Requirement Type</th>
                  <th className="p-4 border-b border-[var(--border)] font-bold">Details to Complete</th>
                  <th className="p-4 border-b border-[var(--border)] font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm opacity-90">
                <tr className="border-b border-[var(--border)] hover:bg-[var(--foreground)]/5 transition-colors">
                  <td className="p-4 font-semibold text-[var(--accent)]">Adventure Rank</td>
                  <td className="p-4">Reach Adventure Rank 30.</td>
                  <td className="p-4 text-orange-400 font-bold">Mandatory</td>
                </tr>
                <tr className="border-b border-[var(--border)] hover:bg-[var(--foreground)]/5 transition-colors">
                  <td className="p-4 font-semibold text-[var(--accent)]">Archon Quest (Liyue)</td>
                  <td className="p-4">Complete Chapter 1: Act 3 "A New Star Approaches".</td>
                  <td className="p-4 text-orange-400 font-bold">Mandatory</td>
                </tr>
                <tr className="hover:bg-[var(--foreground)]/5 transition-colors">
                  <td className="p-4 font-semibold text-[var(--accent)]">Archon Quest (Prologue)</td>
                  <td className="p-4">Complete Chapter 2: Prologue "Autumn Winds, Scarlet Leaves".</td>
                  <td className="p-4 text-green-400 font-bold">Final Step</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="pt-8 space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">Step 1: The Liyue Finale</h2>
          <p className="opacity-80 leading-relaxed">
            Your journey actually begins by finishing up your business in Liyue. Ensure you have completely wrapped up the Liyue Archon questline by defeating the final boss (Childe) and saving Liyue Harbor from Osial. 
          </p>
          <p className="opacity-80 leading-relaxed">
            Once "A New Star Approaches" is marked as completed in your quest log, and you hit <strong>Adventure Rank 30</strong>, the game will automatically give you the prologue quest for Inazuma.
          </p>
        </section>

        <div className="w-full flex justify-center my-10">
          <AdsterraBanner />
        </div>

        <section className="pt-8 space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">Step 2: Find Beidou and Kazuha</h2>
          <p className="opacity-80 leading-relaxed">
            The only way to pierce through the thunderstorm surrounding Inazuma is aboard The Alcor, captained by Beidou. 
          </p>
          
          <ul className="space-y-4 my-8">
            <li className="flex gap-4 items-start bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
              <FiTarget className="text-[var(--accent)] shrink-0 mt-1" size={20} />
              <div>
                <strong className="block text-lg mb-1">Talk to Atsuko</strong>
                <span className="opacity-80 text-sm">Head to Liyue Harbor and speak to Atsuko. She is a refugee from Inazuma and will point you toward the Crux Fleet in the Guyun Stone Forest.</span>
              </div>
            </li>
            <li className="flex gap-4 items-start bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
              <FiAnchor className="text-[var(--accent)] shrink-0 mt-1" size={20} />
              <div>
                <strong className="block text-lg mb-1">Board The Alcor</strong>
                <span className="opacity-80 text-sm">Climb to the top of the Guyun Stone Forest cliffs and glide down to the massive pirate ship. Here, you will officially meet Captain Beidou and Kaedehara Kazuha.</span>
              </div>
            </li>
          </ul>

          <p className="opacity-80 leading-relaxed">
            You will need to complete the <strong>"Autumn Winds, Scarlet Leaves"</strong> questline, which involves participating in Beidou's fighting tournament (The Crux Clash). Once you win the tournament, Beidou will agree to smuggle you into Inazuma.
          </p>
        </section>

        <section className="pt-8 space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">Step 3: Setting Sail to Ritou</h2>
          <p className="opacity-80 leading-relaxed">
            With the tournament won, open your quest menu and select <strong>"Setting Sail"</strong>. Go back to Katheryne in Liyue, and then return to The Alcor. 
          </p>
          <p className="opacity-80 leading-relaxed">
            A beautiful cutscene will play showing Beidou's ship navigating through the ferocious lightning storms of the Dark Sea. When the cutscene ends, you will finally step foot on Inazuma soil in the port town of <strong>Ritou</strong>.
          </p>
          <p className="opacity-80 leading-relaxed text-sm italic text-[var(--accent)] font-semibold">
            Warning: You are not free yet! Ritou is heavily guarded. If you try to run out of the port town immediately, guards will teleport you back. You must complete the "Ritou Escape Plan" quest given by Thoma to finally explore the rest of Narukami Island.
          </p>
        </section>

        <section className="pt-12 space-y-6">
          <div className="flex items-center gap-3 mb-6 border-b border-[var(--border)] pb-4">
            <FiHelpCircle className="text-[var(--accent)]" size={28} />
            <h2 className="text-3xl font-black uppercase italic tracking-tighter m-0">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">1. Can I ice bridge to Inazuma using Kaeya?</h3>
              <p className="text-sm opacity-80 leading-relaxed">No! If you try to ice bridge across the ocean to Inazuma, a massive lightning storm will strike you down and teleport you back to Liyue. You must take the ship with Beidou.</p>
            </div>
            
            <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">2. What Adventure Rank is required for Inazuma?</h3>
              <p className="text-sm opacity-80 leading-relaxed">You must reach Adventure Rank 30 to start the 'Autumn Winds, Scarlet Leaves' Archon Quest, which is the direct prerequisite to sailing to Inazuma.</p>
            </div>

            <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">3. How do I start the Autumn Winds, Scarlet Leaves quest?</h3>
              <p className="text-sm opacity-80 leading-relaxed">After hitting AR 30 and completing the 'A New Star Approaches' quest in Liyue, talk to Atsuko in Liyue Harbor. She will tell you to look for Captain Beidou in the Guyun Stone Forest.</p>
            </div>

            <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">4. How do I get out of Ritou once I arrive in Inazuma?</h3>
              <p className="text-sm opacity-80 leading-relaxed">When you first arrive, you are locked in the starting port of Ritou. To leave, you must complete the 'Ritou Escape Plan' questline given by Thoma, or secure a Travel Permit.</p>
            </div>

            <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">5. Why can't I ascend my Inazuma characters early?</h3>
              <p className="text-sm opacity-80 leading-relaxed">Inazuma characters (like Ayaka or Raiden Shogun) require regional specialties found only in Inazuma. Because the nation is story-locked, you cannot farm their materials until you officially sail there.</p>
            </div>
          </div>
        </section>

        <section className="pt-12 space-y-6">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[var(--background)] to-[var(--card)] border border-[var(--accent)]/30 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[var(--accent)]/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[var(--accent)]/20 rounded-full blur-3xl"></div>
            
            <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-4">Conclusion & Key Takeaways</h2>
            <p className="opacity-80 leading-relaxed mb-6">
              Unlike the rest of Teyvat, unlocking Inazuma requires strict dedication to the main storyline. Don't waste your time trying to glitch across the ocean!
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ul className="space-y-2 text-sm opacity-90">
                <li className="flex items-center gap-2"><FiCheckCircle className="text-[var(--accent)]" /> <span className="font-semibold">You must hit Adventure Rank 30.</span></li>
                <li className="flex items-center gap-2"><FiCheckCircle className="text-[var(--accent)]" /> <span className="font-semibold">Complete the Liyue Archon Quests first.</span></li>
              </ul>
              <ul className="space-y-2 text-sm opacity-90">
                <li className="flex items-center gap-2"><FiCheckCircle className="text-[var(--accent)]" /> <span className="font-semibold">Win Beidou's Crux Clash tournament.</span></li>
                <li className="flex items-center gap-2"><FiCheckCircle className="text-[var(--accent)]" /> <span className="font-semibold">Complete Thoma's Ritou Escape Plan to explore.</span></li>
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
