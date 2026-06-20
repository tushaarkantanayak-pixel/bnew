"use client";
import { useState } from "react";

interface AdsterraSmartlinkProps {
  text?: string;
  className?: string;
}

export default function AdsterraSmartlink({ text = "Click Here", className = "" }: AdsterraSmartlinkProps) {
  const [clickedOnce, setClickedOnce] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!clickedOnce) {
      // First click: let the default behavior happen (opens Adsterra link)
      setClickedOnce(true);
    } else {
      // Second click: prevent default and go to mlbbtopup.in
      e.preventDefault();
      window.open("https://mlbbtopup.in", "_blank");
    }
  };

  return (
    <a 
      href="https://www.effectivecpmnetwork.com/mz7p74hi?key=424bdbc50c95b2040133be37571cf3c8"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-block px-5 py-2.5 bg-[var(--foreground)] text-[var(--background)] text-xs font-black uppercase tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[var(--foreground)]/20 whitespace-nowrap shrink-0 ${className}`}
    >
      {text}
    </a>
  );
}
