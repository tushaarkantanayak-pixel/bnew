import type { Metadata } from "next";
import BlogPostLayout from "@/components/Blog/BlogPostLayout";
import Script from "next/script";
import { FiCheckCircle, FiHelpCircle } from "react-icons/fi";
import AdsterraBanner from "@/components/Ads/AdsterraBanner";
import AdsterraClassicBanner from "@/components/Ads/AdsterraClassicBanner";

export const metadata: Metadata = {
  title: "Top 10 MLBB Hero Skins & Price List in India (2026)",
  description: "Discover the ultimate list of the best Mobile Legends skins in 2026! We break down the exact Diamond costs and INR prices for Elite, Epic, and Collector skins.",
  alternates: { canonical: "https://bluebuff.in/blog/mlbb/mlbb-skin-price-list-india-2026" },
};

export default function MLBBSkinPriceListIndia2026Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much is 1000 Diamonds in MLBB India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In 2026, 1000 Diamonds will cost you approximately ₹1,200 to ₹1,300, depending on the top-up platform you choose."
        }
      },
      {
        "@type": "Question",
        "name": "Can I gift a skin to my friend in MLBB?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! You can gift skins to your friends. However, both of your accounts need to be above Level 20, and you must have been friends in the game for at least 7 days."
        }
      },
      {
        "@type": "Question",
        "name": "What is the most expensive skin in Mobile Legends?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Legend skins are generally the most expensive. They are obtained through the Magic Wheel and can cost anywhere from 8,000 to 10,000 Diamonds."
        }
      }
    ]
  };

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BlogPostLayout
        title="TOP 10 BEST MLBB HERO SKINS IN 2026: COMPLETE PRICE LIST IN INDIA"
        category="Game Guide"
        readTime="7 min read"
        date="June 23, 2026"
        image="/blog/mlbb/mlbb-skin-price-banner.png"
        game="MLBB"
      >
        <section className="space-y-8">
          <p className="opacity-80 leading-relaxed text-lg">
            Mobile Legends: Bang Bang (MLBB) has released hundreds of gorgeous skins over the years. But if you want to flex on your opponents in 2026, which skins are truly worth your hard-earned Diamonds?
          </p>
          <p className="opacity-80 leading-relaxed">
            Whether you are looking for an affordable Elite skin or preparing to drop serious cash on a Collector skin, we have put together a curated list of the absolute best skins in the game right now. Below, you will find our top picks along with their exact Diamond costs and estimated prices in Indian Rupees (INR) based on the 2026 conversion rate of roughly <strong>₹1.25 per Diamond</strong>.
          </p>

          <AdsterraClassicBanner />
        </section>

        <section className="pt-8 space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">1. Granger - "Starfall Knight" (Legend)</h2>
          <p className="opacity-80 leading-relaxed">
            Granger’s Legend skin remains one of the most visually stunning items in the game. With cosmic sound effects and galaxy-themed visuals, it is a must-have for marksman mains.
          </p>
          <ul className="list-disc pl-6 space-y-2 opacity-80">
            <li><strong>Tier:</strong> Legend</li>
            <li><strong>Diamond Cost:</strong> ~8,000 - 10,000 (via Magic Wheel)</li>
            <li><strong>Estimated Cost (INR):</strong> ₹10,000 - ₹12,500</li>
          </ul>
        </section>

        <section className="pt-8 space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">2. Chou - "Thunderfist" (HERO Series)</h2>
          <p className="opacity-80 leading-relaxed">
            Chou is the king of outplays, and his Thunderfist skin gives his kicks an electrifying punch. This limited-time event skin is heavily sought after.
          </p>
          <ul className="list-disc pl-6 space-y-2 opacity-80">
            <li><strong>Tier:</strong> HERO (Limited Epic)</li>
            <li><strong>Diamond Cost:</strong> ~4,000 - 5,000 (Event Gacha)</li>
            <li><strong>Estimated Cost (INR):</strong> ₹5,000 - ₹6,250</li>
          </ul>
        </section>

        <section className="pt-8 space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">3. Ling - "Serene Plume" (Collector)</h2>
          <p className="opacity-80 leading-relaxed">
            Ling’s Collector skin makes wall-jumping look like pure poetry. The elegant blue and gold particle effects are incredibly distracting (in a good way) for the enemy team.
          </p>
          <ul className="list-disc pl-6 space-y-2 opacity-80">
            <li><strong>Tier:</strong> Collector</li>
            <li><strong>Diamond Cost:</strong> ~3,500 - 5,000 (Grand Collection)</li>
            <li><strong>Estimated Cost (INR):</strong> ₹4,375 - ₹6,250</li>
          </ul>
        </section>
        
        <div className="w-full flex justify-center my-10">
          <AdsterraBanner />
        </div>

        <section className="pt-8 space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">Bonus: Build Your Own Skin Price Calculator!</h2>
          <p className="opacity-80 leading-relaxed">
            If you are a developer or a student learning to code, you can easily calculate exactly how much any skin in MLBB will cost you. Here is a simple JavaScript code snippet you can run in your browser's console:
          </p>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm border border-gray-800">
            <code>{`/**
 * Simple MLBB Skin Cost Calculator
 * Calculates the real-world cost of MLBB Diamonds in INR
 */

function calculateSkinCost(diamondAmount) {
  // Current average conversion rate in India for 2026
  const ratePerDiamond = 1.25; 
  
  // Calculate total price
  const totalPrice = diamondAmount * ratePerDiamond;
  
  // Return the formatted string
  return \`To buy \${diamondAmount} Diamonds, you will need approximately ₹\${totalPrice.toFixed(2)} INR.\`;
}

// Example: Let's calculate the price for an Epic Skin (899 Diamonds)
const epicSkinPrice = calculateSkinCost(899);
console.log("Epic Skin Cost:", epicSkinPrice);
`}</code>
          </pre>
        </section>

        <section className="pt-8 space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
              <h3 className="font-bold flex items-center gap-2 mb-2"><FiHelpCircle className="text-[var(--accent)]" /> How much is 1000 Diamonds in MLBB India?</h3>
              <p className="opacity-80 text-sm">In 2026, 1000 Diamonds will cost you approximately ₹1,200 to ₹1,300, depending on the top-up platform you choose.</p>
            </div>
            <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
              <h3 className="font-bold flex items-center gap-2 mb-2"><FiHelpCircle className="text-[var(--accent)]" /> Can I gift a skin to my friend in MLBB?</h3>
              <p className="opacity-80 text-sm">Yes! You can gift skins to your friends. However, both of your accounts need to be above Level 20, and you must have been friends in the game for at least 7 days.</p>
            </div>
            <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
              <h3 className="font-bold flex items-center gap-2 mb-2"><FiHelpCircle className="text-[var(--accent)]" /> What is the most expensive skin in Mobile Legends?</h3>
              <p className="opacity-80 text-sm">Legend skins are generally the most expensive. They are obtained through the Magic Wheel and can cost anywhere from 8,000 to 10,000 Diamonds.</p>
            </div>
          </div>
        </section>

      </BlogPostLayout>
    </>
  );
}
