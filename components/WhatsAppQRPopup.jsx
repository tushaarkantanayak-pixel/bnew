"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import { FiX, FiZap, FiUsers, FiCheck } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const WA_URL = "https://whatsapp.com/channel/0029VbCdit23gvWQuqozDE0w";

export default function WhatsAppCommunityPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem("wa_qr_theme_popup");
    if (!shown) {
      const t = setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem("wa_qr_theme_popup", "1");
      }, 700);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative w-full max-w-[290px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Card */}
            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 shadow-2xl flex flex-col items-center gap-5">

              {/* Top accent line */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500" />

              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3.5 right-3.5 w-7 h-7 flex items-center justify-center rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--muted)] hover:text-red-500 hover:border-red-400/40 transition-all duration-200"
              >
                <FiX size={13} />
              </button>

              {/* Icon */}
              <div className="relative mt-1">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-600/20 border border-blue-500/30 flex items-center justify-center text-blue-500">
                  <FiUsers size={26} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-lg bg-blue-600 border-2 border-[var(--card)] flex items-center justify-center text-white shadow">
                  <FiCheck size={10} strokeWidth={4} />
                </div>
              </div>

              {/* Title */}
              <div className="text-center space-y-1">
                <h2 className="text-xl font-[900] uppercase italic tracking-tight leading-tight text-[var(--foreground)]">
                  Join Our <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">Channel</span>
                </h2>
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[var(--muted)] opacity-60 flex items-center justify-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-blue-500 inline-block" />
                  Updates &amp; Service Details
                </p>
              </div>

              {/* QR Code */}
              <div className="rounded-2xl p-3.5 bg-white shadow-md border border-gray-100">
                <QRCodeCanvas
                  value={WA_URL}
                  size={130}
                  level="H"
                  includeMargin={false}
                  fgColor="#000000"
                />
              </div>

              {/* Button */}
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 rounded-[1.2rem] bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-5px_rgba(59,130,246,0.5)] transition-all active:scale-[0.98] group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <FaWhatsapp size={15} className="relative z-10" />
                <span className="text-[10px] font-black uppercase italic tracking-wider relative z-10">Open WhatsApp</span>
                <FiZap size={12} className="relative z-10" />
              </a>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
