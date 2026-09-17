"use client";

interface MarqueeTickerProps {
  text?: string;
  className?: string;
  reverse?: boolean;
}

export default function MarqueeTicker({
  text = "★ EDOTHON '26 ★ 24 HOURS CONTINUOUS HACKATHON ★ POWERED BY EDOBASE ★ OCT 17-18, 2026 ★ BUILD THE UNEXPECTED ★ ₹200 PER TEAM ★ REGISTRATION OPEN ★",
  className = "bg-[#9ae885] text-black border-y-2 border-black",
  reverse = false,
}: MarqueeTickerProps) {
  const items = Array(8).fill(text);

  return (
    <div className={`overflow-hidden whitespace-nowrap select-none py-2.5 font-mono text-xs sm:text-sm font-extrabold tracking-wider ${className}`}>
      <div className={`inline-flex gap-8 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {items.map((str, idx) => (
          <span key={idx} className="shrink-0 flex items-center gap-3">
            {str}
          </span>
        ))}
      </div>
    </div>
  );
}
