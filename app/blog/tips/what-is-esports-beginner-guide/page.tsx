import type { Metadata } from "next";
import BlogPostLayout from "@/components/Blog/BlogPostLayout";
import AdsterraBanner from "@/components/Ads/AdsterraBanner";
import AdsterraClassicBanner from "@/components/Ads/AdsterraClassicBanner";
import Link from "next/link";
import { FiTrendingUp, FiTarget, FiUsers, FiAward, FiPlayCircle, FiShield, FiHelpCircle } from "react-icons/fi";

export const metadata: Metadata = {
  title: "What Is Esports? The Complete Beginner's Guide (2026)",
  description: "Discover what esports is in this complete beginner's guide. Learn about the biggest games, tournaments, teams, and how to start watching competitive gaming today.",
  alternates: { canonical: "https://bluebuff.in/blog/tips/what-is-esports-beginner-guide" },
};

export default function WhatIsEsportsPage() {
  return (
    <BlogPostLayout
      title="WHAT IS ESPORTS? THE COMPLETE BEGINNER'S GUIDE"
      category="Guides"
      readTime="12 min read"
      date="June 21, 2026"
      image="/blog/generic/esports-stadium.png"
      author="Admin"
      game="Esports"
    >
      <section className="space-y-8">
        <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-transparent border border-[var(--accent)]/20 overflow-hidden shadow-lg mx-auto">
          <div className="absolute top-0 right-0 p-3 opacity-10"><FiPlayCircle size={50} /></div>
          <p className="text-base font-semibold tracking-tight italic leading-snug m-0 text-[var(--foreground)]">
            "Gone are the days when video games were just a hobby. Today, competitive gaming fills massive stadiums, hands out millions in prize money, and draws more viewers than traditional sports events."
          </p>
        </div>

        <p className="opacity-80 leading-relaxed text-lg">
          If you have ever heard your friends talking about a "world championship" for a video game and wondered what they meant, you have just discovered <strong>esports</strong>. In recent years, the gaming industry has exploded into a massive competitive scene.
        </p>

        <p className="opacity-80 leading-relaxed">
          But what exactly is esports? How does it work? And how do players make money just by playing games on their phones or PCs? In this complete beginner’s guide, we will break down everything you need to know about competitive gaming in simple, easy-to-understand terms. Whether you are a casual mobile gamer or a curious parent, this guide is for you.
        </p>
        <AdsterraClassicBanner />
      </section>

      <section className="pt-8 space-y-6">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter">What Exactly Is Esports?</h2>
        <p className="opacity-80 leading-relaxed">
          The term <strong>esports</strong> is short for "electronic sports." Put simply, it is the world of organized, competitive video gaming. Just like traditional sports such as football or cricket, esports has professional players, organized teams, leagues, massive tournaments, and millions of passionate fans watching the matches live.
        </p>
        <p className="opacity-80 leading-relaxed">
          However, instead of playing on a physical field, these athletes compete in virtual arenas. They use strategy, lightning-fast reflexes, and incredible teamwork to outplay their opponents. The matches are usually broadcasted live over the internet on platforms like YouTube and Twitch, often accompanied by professional commentators (called "casters") who analyze the game play-by-play.
        </p>
      </section>

      <div className="w-full flex justify-center my-10">
        <AdsterraBanner />
      </div>

      <section className="pt-4 space-y-6">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter">How Big Is The Esports Industry?</h2>
        <p className="opacity-80 leading-relaxed">
          You might be surprised to learn that esports is not a niche hobby anymore. It is a multi-billion dollar global industry. In 2026, major tournaments are generating numbers that rival the Super Bowl and the FIFA World Cup.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-8">
          <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
            <FiUsers className="text-[var(--accent)] mb-4" size={30} />
            <h3 className="font-bold text-xl mb-2">Massive Viewership</h3>
            <p className="text-sm opacity-80">Global esports viewership has crossed 600 million people. Major tournaments like the League of Legends World Championship regularly pull in over 5 million peak concurrent viewers.</p>
          </div>
          <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
            <FiAward className="text-yellow-400 mb-4" size={30} />
            <h3 className="font-bold text-xl mb-2">Life-Changing Prize Pools</h3>
            <p className="text-sm opacity-80">Prize money in esports is staggering. The annual Dota 2 tournament, "The International," has previously featured prize pools exceeding $40 million USD in a single event.</p>
          </div>
        </div>

        <p className="opacity-80 leading-relaxed">
          Players sign multi-million dollar contracts, secure massive brand sponsorships (from companies like Red Bull, Mercedes-Benz, and Nike), and are treated like true celebrities in their home countries.
        </p>
      </section>

      <section className="pt-8 space-y-6">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter">The Biggest Genres in Esports</h2>
        <p className="opacity-80 leading-relaxed">
          Not every video game can be an esport. A game needs to be highly competitive, skill-based, and balanced so that the better player always wins. Here are the primary genres that dominate the esports landscape today:
        </p>

        <div className="overflow-x-auto rounded-xl border border-[var(--border)] mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--accent)]/10">
                <th className="p-4 border-b border-[var(--border)] font-bold">Genre</th>
                <th className="p-4 border-b border-[var(--border)] font-bold">Description</th>
                <th className="p-4 border-b border-[var(--border)] font-bold">Popular Games</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-[var(--border)] hover:bg-[var(--foreground)]/5 transition-colors">
                <td className="p-4 font-semibold">MOBA (Multiplayer Online Battle Arena)</td>
                <td className="p-4 opacity-80">Two teams of five fight to destroy the enemy's main base while defending their own. Very strategy heavy.</td>
                <td className="p-4 text-[var(--accent)] font-medium">League of Legends, Dota 2, MLBB, Honor of Kings</td>
              </tr>
              <tr className="border-b border-[var(--border)] hover:bg-[var(--foreground)]/5 transition-colors">
                <td className="p-4 font-semibold">FPS (First-Person Shooter)</td>
                <td className="p-4 opacity-80">Gun-based combat from the character's perspective. Requires precise aim and quick reflexes.</td>
                <td className="p-4 text-[var(--accent)] font-medium">CS2, Valorant, Call of Duty</td>
              </tr>
              <tr className="border-b border-[var(--border)] hover:bg-[var(--foreground)]/5 transition-colors">
                <td className="p-4 font-semibold">Battle Royale</td>
                <td className="p-4 opacity-80">Dozens of players drop onto a shrinking map. The last team or person standing wins.</td>
                <td className="p-4 text-[var(--accent)] font-medium">PUBG Mobile, Free Fire, Fortnite</td>
              </tr>
              <tr className="border-b border-[var(--border)] hover:bg-[var(--foreground)]/5 transition-colors">
                <td className="p-4 font-semibold">Fighting Games</td>
                <td className="p-4 opacity-80">1-on-1 hand-to-hand combat games focusing on complex button combos and predicting the enemy.</td>
                <td className="p-4 text-[var(--accent)] font-medium">Street Fighter 6, Tekken 8, Super Smash Bros</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="pt-8 space-y-6">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter">The Rise of Mobile Esports</h2>
        <p className="opacity-80 leading-relaxed">
          While PC and console gaming built the foundation of esports, <strong>Mobile Esports</strong> is currently taking over the world, especially in regions like Southeast Asia, India, and Latin America.
        </p>
        <p className="opacity-80 leading-relaxed">
          Why? Because almost everyone has a smartphone. You don't need an expensive gaming PC to compete. Games like <strong>Mobile Legends: Bang Bang (MLBB)</strong>, <strong>PUBG Mobile</strong>, and <strong>Honor of Kings</strong> have created accessible pathways for teenagers to become millionaire athletes right from their bedrooms.
        </p>
        <ul className="space-y-4 my-6">
          <li className="flex gap-4 items-start bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
            <FiTarget className="text-[var(--accent)] shrink-0 mt-1" size={20} />
            <div>
              <strong className="block text-lg mb-1">M-Series World Championship</strong>
              <span className="opacity-80 text-sm">The absolute pinnacle of Mobile Legends esports, drawing millions of live viewers to watch the best squads from the Philippines and Indonesia battle it out.</span>
            </div>
          </li>
          <li className="flex gap-4 items-start bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
            <FiTarget className="text-[var(--accent)] shrink-0 mt-1" size={20} />
            <div>
              <strong className="block text-lg mb-1">PMGC (PUBG Mobile Global Championship)</strong>
              <span className="opacity-80 text-sm">The highest tier of Battle Royale competition, featuring top-tier squads rotating, shooting, and surviving for massive multi-million dollar prize pools.</span>
            </div>
          </li>
        </ul>
      </section>

      <div className="w-full flex justify-center my-10">
        <AdsterraBanner />
      </div>

      <section className="pt-8 space-y-6">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter">How to Get Started as a Fan</h2>
        <p className="opacity-80 leading-relaxed">
          Watching esports for the first time can be overwhelming due to the fast pace and confusing terminology. Here is how you can ease into it:
        </p>
        <ol className="list-decimal pl-6 space-y-3 opacity-80">
          <li><strong>Pick a Game You Understand:</strong> The best way to enjoy esports is to play the game yourself. If you play MLBB casually, start by watching MLBB tournaments. You will immediately appreciate the insane skill level of the pros.</li>
          <li><strong>Find a Platform:</strong> Head over to YouTube Gaming or Twitch.tv. You will find dedicated channels streaming tournaments live almost every weekend.</li>
          <li><strong>Pick a Team to Support:</strong> Sports are always more fun when you have a favorite team! Follow popular organizations like T1, Team Liquid, Blacklist International, or ONIC Esports.</li>
          <li><strong>Listen to the Casters:</strong> The commentators are there to explain what is happening. Even if you don't understand the strategy initially, their hype and explanations will quickly teach you the basics.</li>
        </ol>
      </section>

      <section className="pt-12 space-y-6">
        <div className="flex items-center gap-3 mb-6 border-b border-[var(--border)] pb-4">
          <FiHelpCircle className="text-[var(--accent)]" size={28} />
          <h2 className="text-3xl font-black uppercase italic tracking-tighter m-0">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
            <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">1. Is esports considered a real sport?</h3>
            <p className="text-sm opacity-80 leading-relaxed">Yes. Many countries, including the USA, China, and South Korea, officially recognize esports athletes as professional sportspeople, granting them athletic visas. Furthermore, esports has even been featured as a medal event in the Asian Games.</p>
          </div>
          
          <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
            <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">2. How do esports players make money?</h3>
            <p className="text-sm opacity-80 leading-relaxed">Players earn money through multiple streams: monthly salaries paid by their team organizations, tournament prize money, brand sponsorships, and streaming revenue from platforms like Twitch and YouTube.</p>
          </div>

          <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
            <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">3. What is the difference between a gamer and an esports athlete?</h3>
            <p className="text-sm opacity-80 leading-relaxed">A gamer plays video games for fun and entertainment. An esports athlete plays a specific game at a highly competitive level as their full-time profession, adhering to strict training schedules, coaching, and strategic analysis.</p>
          </div>

          <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
            <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">4. Can I play esports on my phone?</h3>
            <p className="text-sm opacity-80 leading-relaxed">Absolutely! Mobile esports is currently the fastest-growing sector of the industry. Games like Free Fire, Mobile Legends, and PUBG Mobile have massive, highly lucrative competitive circuits.</p>
          </div>

          <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
            <h3 className="font-bold text-lg mb-2 text-[var(--accent)]">5. How old do you have to be to compete?</h3>
            <p className="text-sm opacity-80 leading-relaxed">It depends on the game and tournament rules. Most major leagues require players to be at least 16 or 18 years old, but some prodigies get signed to developmental "academy" rosters as young as 14.</p>
          </div>
        </div>
      </section>

      <section className="pt-12 space-y-6">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-[var(--background)] to-[var(--card)] border border-[var(--accent)]/30 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[var(--accent)]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[var(--accent)]/20 rounded-full blur-3xl"></div>
          
          <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-4">Conclusion & Key Takeaways</h2>
          <p className="opacity-80 leading-relaxed mb-6">
            Esports is no longer just a trend—it is the undeniable future of competitive entertainment. As internet infrastructure improves and mobile devices become more powerful, the barrier to entry will only continue to lower, allowing incredible hidden talents to rise to global stardom.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ul className="space-y-2 text-sm opacity-90">
              <li className="flex items-center gap-2"><FiShield className="text-[var(--accent)]" /> <span className="font-semibold">It's a Billion Dollar Industry</span></li>
              <li className="flex items-center gap-2"><FiShield className="text-[var(--accent)]" /> <span className="font-semibold">Players are treated like traditional athletes</span></li>
            </ul>
            <ul className="space-y-2 text-sm opacity-90">
              <li className="flex items-center gap-2"><FiShield className="text-[var(--accent)]" /> <span className="font-semibold">Mobile gaming is taking over</span></li>
              <li className="flex items-center gap-2"><FiShield className="text-[var(--accent)]" /> <span className="font-semibold">You only need a smartphone to start</span></li>
            </ul>
          </div>
        </div>
      </section>
    </BlogPostLayout>
  );
}
