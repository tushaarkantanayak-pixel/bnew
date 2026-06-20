"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";

export default function AdsterraStickyBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const adHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>body { margin: 0; padding: 0; display: flex; justify-content: center; background: transparent; overflow: hidden; }</style>
      </head>
      <body>
        <script>
          atOptions = {
            'key' : '75da51e743f311aa177c2d9f662b4310',
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="https://www.highperformanceformat.com/75da51e743f311aa177c2d9f662b4310/invoke.js"></script>
      </body>
    </html>
  `;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] bg-[var(--background)]/80 backdrop-blur-md border-t border-[var(--border)] shadow-[0_-10px_30px_rgba(0,0,0,0.1)] transition-transform duration-500 flex justify-center py-2">
      <div className="relative max-w-[728px] w-full flex justify-center">
        {/* Close Button */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute -top-8 right-2 sm:right-0 bg-[var(--card)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-colors z-[101]"
          aria-label="Close Ad"
        >
          <FiX size={12} />
        </button>

        {/* Ad Iframe */}
        <div className="w-full flex justify-center h-[50px] sm:h-[90px] overflow-hidden bg-transparent">
          <iframe
            title="Adsterra Sticky Banner"
            srcDoc={adHtml}
            width="100%"
            height="100"
            style={{ border: "none", overflow: "hidden", background: "transparent" }}
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
}
