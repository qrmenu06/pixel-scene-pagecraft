import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ as: Tag = "div", className, children, delay = 0 }: { as?: ElementType; className?: string | undefined; children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("is-in"), io.unobserve(e.target))),
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

/** İnce rüzgâr çizgileri — dekoratif, ekran okuyuculardan gizli. */
export function WindLines({ className }: { className?: string | undefined }) {
  return (
    <svg aria-hidden className={cn("pointer-events-none absolute inset-0 h-full w-full", className)} viewBox="0 0 1200 600" preserveAspectRatio="none" fill="none">
      {[90, 180, 300, 420, 510].map((y, i) => (
        <g key={y} className="animate-wind" style={{ animationDelay: `${-i * 1.7}s`, animationDuration: `${8 + i * 2}s` }}>
          <path d={`M-100 ${y} C 200 ${y - 40}, 400 ${y + 40}, 700 ${y} S 1100 ${y - 30}, 1400 ${y}`} stroke="currentColor" strokeOpacity={0.12 + i * 0.03} strokeWidth={1.2} />
        </g>
      ))}
    </svg>
  );
}
