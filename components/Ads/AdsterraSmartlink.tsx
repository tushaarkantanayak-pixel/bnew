interface AdsterraSmartlinkProps {
  text?: string;
  className?: string;
}

export default function AdsterraSmartlink({ text = "Click Here", className = "" }: AdsterraSmartlinkProps) {
  return (
    <a 
      href="https://www.effectivecpmnetwork.com/mz7p74hi?key=424bdbc50c95b2040133be37571cf3c8"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block px-6 py-3 bg-[var(--foreground)] text-[var(--background)] text-sm font-black uppercase tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[var(--foreground)]/20 ${className}`}
    >
      {text}
    </a>
  );
}
