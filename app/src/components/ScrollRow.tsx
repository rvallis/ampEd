import { useRef, type ReactNode } from "react";

/**
 * Horizontal snap-scroll row used at both nav levels (branch row on the
 * compass screen, module row within a branch's spine). Native overflow
 * scroll + CSS scroll-snap does the actual swipe/trackpad/touch handling
 * for free; the chevrons are just a discoverability aid for mouse-only
 * desktop users, since a vertical wheel doesn't hint at horizontal content.
 */
export default function ScrollRow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative group/row">
      <div
        ref={ref}
        className={`scroll-row flex gap-4 overflow-x-auto px-1 py-2 ${className}`}
      >
        {children}
      </div>
      <button
        aria-label="Scroll left"
        onClick={() => scrollBy(-1)}
        className="hidden md:flex items-center justify-center absolute -left-4 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full border shadow-sm opacity-0 group-hover/row:opacity-100 transition-opacity"
        style={{
          background: "var(--paper-raised)",
          borderColor: "var(--border)",
          color: "var(--ink)",
        }}
      >
        ‹
      </button>
      <button
        aria-label="Scroll right"
        onClick={() => scrollBy(1)}
        className="hidden md:flex items-center justify-center absolute -right-4 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full border shadow-sm opacity-0 group-hover/row:opacity-100 transition-opacity"
        style={{
          background: "var(--paper-raised)",
          borderColor: "var(--border)",
          color: "var(--ink)",
        }}
      >
        ›
      </button>
    </div>
  );
}
