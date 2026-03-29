import type { Metadata } from "next";
import BlogPostLayout from "@/components/Blog/BlogPostLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Master the Honor of Kings x MLBB Crossover Event",
  description: "Learn how to unlock rewards and exclusive skins during the HOK x MLBB collaboration in 2026.",
  alternates: { canonical: "https://bluebuff.in/blog/mlbb/mlbb-hok-crossover-event-guide" },
};

export default function BlogPage() {
  return (
    <BlogPostLayout
      title="HOW TO MASTER THE HONOR OF KINGS X MLBB CROSSOVER EVENT"
      category="Event Guide"
      readTime="5 min read"
      date="March 29, 2026"
      image="/blog/mlbb-hok.png"
      game="MLBB"
    >
      <p className="text-lg md:text-xl font-medium !opacity-100 italic border-l-4 border-[var(--accent)] pl-6 py-2 bg-[var(--accent)]/5 rounded-r-2xl">
        The crossover of the century is here! Honor of Kings (HOK) and Mobile Legends: Bang Bang (MLBB) have teamed up for a massive event in 2026. Here's how you can make the most of this unique collaboration.
      </p>

      <h2>1. Limited-Time Skins</h2>
      <p>
        The highlight of this event is the exclusive "Cross-Over Skins." Imagine Chou in an HOK-inspired outfit or Athena from HOK appearing as a guest hero in the MLBB universe.
      </p>
      <ul>
        <li><strong>Chou - Dragon Warrior:</strong> Inspired by HOK's classic aesthetics.</li>
        <li><strong>Guinevere - Lotus Princess:</strong> A beautiful fusion design.</li>
        <li><strong>Event Currency:</strong> You'll need "Legacy Fragments" to roll for these skins in the special event draw.</li>
      </ul>

      <div className="bg-[var(--card)] border border-[var(--border)] p-10 rounded-[40px] my-16 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent)]" />
        <h3 className="italic font-black uppercase text-[var(--accent)] mb-4">Pro Strategy 💎</h3>
        <p className="text-sm italic opacity-70 m-0">
          Make sure to log in every day to collect free "Legacy Fragments." Completing certain missions will grant you extra rolls, saving you a lot of Diamonds.
        </p>
      </div>

      <h2>2. Event Challenges</h2>
      <p>
        Participate in the "Dual-World Quest" where you can earn rewards in both games simultaneously. These challenges often involve winning ranked matches or securing a certain number of kills.
      </p>

      <h2>3. Special Rewards</h2>
      <p>
        Don't miss out on the animated emotes, borders, and recall effects that are exclusive to the HOK x MLBB event. These will never be available again!
      </p>

      <p>
        Need more Diamonds for the event draw? Check out our <Link href="/games/mobile-legends988" className="text-[var(--accent)] underline transition-opacity">MLBB Diamond Bundles</Link> for the best prices in 2026.
      </p>
    </BlogPostLayout>
  );
}
