"use client";

import { motion } from "framer-motion";
import { FiFileText, FiAlertCircle, FiShield, FiGlobe, FiInfo } from "react-icons/fi";

const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || "Blue Buff";

export default function TermsAndConditions() {
  const sections = [
    {
      id: "01",
      title: "Who can use this",
      content: "You must be 18 or older to use our site. If you are younger, please ask your parents or guardians for permission first."
    },
    {
      id: "02",
      title: "How to use",
      content: "Please use Blue Buff fairly. You must give us the correct Game ID and Zone so we can send your items quickly. If you give wrong info, we might not be able to help."
    },
    {
      id: "03",
      title: "Delivery",
      content: "All our items are digital and sent right away. Once we send the items to your game account, the deal is finished and cannot be changed."
    },
    {
      id: "04",
      title: "Payments",
      content: "We use safe and private ways to pay. We do not save your bank or card details. We can block any payments that look like a scam."
    },
    {
      id: "05",
      title: "Refunds",
      content: "Because digital items are sent instantly, we usually don't give refunds. We only help with refunds if there is a big technical problem on our side."
    },
    {
      id: "06",
      title: "No Cheating",
      content: "If you try to cheat, use bots, or lie about payments, we will have to block your account forever."
    },
    {
      id: "07",
      title: "Our Brand",
      content: "Blue Buff is our own brand. The games like Mobile Legends belong to their own companies. We are an independent store."
    },
    {
      id: "08",
      title: "Our Limits",
      content: "We are not responsible if you give us the wrong ID, or if the game company has a server problem."
    }
  ];

  return (
    <main className="min-h-screen relative overflow-hidden bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)]/30 pb-32 transition-colors duration-300 px-6">

      <div className="max-w-4xl mx-auto pt-16 md:pt-24 relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center md:text-left"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--accent)]/5 border border-[var(--accent)]/10 mb-6 font-sans">
            <span className="text-[var(--accent)] text-[10px] font-black uppercase tracking-widest italic">Legal Agreement</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-[1000] italic tracking-tighter uppercase leading-none mb-2">
            TERMS & <span className="text-[var(--accent)]">CONDITIONS</span>
          </h1>
          <p className="text-[var(--muted)] text-[10px] font-black uppercase tracking-[0.3em] opacity-40 italic">
            Defining the Service Standards
          </p>
          <div className="flex items-center gap-4 mt-8 text-[9px] font-black uppercase tracking-widest opacity-30 italic justify-center md:justify-start">
            <FiFileText size={14} className="text-[var(--accent)]" />
            <span>REVISED: JANUARY 2026</span>
          </div>
        </motion.div>

        {/* SECTIONS GRID-LIST */}
        <div className="space-y-4">
          {sections.map((section, i) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-8 rounded-3xl bg-[var(--card)]/40 border border-[var(--border)] group hover:border-[var(--accent)]/30 transition-all flex flex-col md:flex-row gap-6"
            >
              <div className="text-2xl font-black italic text-[var(--accent)] opacity-20 group-hover:opacity-100 transition-opacity leading-none pt-1">
                {section.id}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-[900] italic uppercase tracking-tighter text-[var(--foreground)] mb-3">{section.title}</h2>
                <p className="text-xs md:text-sm text-[var(--muted)] leading-relaxed opacity-60 italic">{section.content}</p>
              </div>
            </motion.section>
          ))}
        </div>

        {/* FINAL NOTES */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 pt-16 border-t border-[var(--border)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-rose-500/5 border border-rose-500/10 flex items-start gap-4">
              <FiAlertCircle className="text-rose-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-[10px] font-black uppercase text-rose-500 tracking-widest mb-2">Suspension Policy</h3>
                <p className="text-[9px] font-bold text-[var(--muted)] opacity-50 uppercase leading-relaxed">Violations of these terms result in immediate termination of account access without prior warning.</p>
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-[var(--accent)]/5 border border-[var(--accent)]/10 flex items-start gap-4">
              <FiGlobe className="text-[var(--accent)] mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-[10px] font-black uppercase text-[var(--accent)] tracking-widest mb-2">Governing Law</h3>
                <p className="text-[9px] font-bold text-[var(--muted)] opacity-50 uppercase leading-relaxed">All agreements are interpreted under the local jurisdiction of our operational base.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center opacity-30 flex items-center justify-center gap-3">
            <FiInfo size={14} />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] italic">Contact Support for technical clarifications.</span>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
