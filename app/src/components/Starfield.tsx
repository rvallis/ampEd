import { useMemo } from "react";

/** Cheap, deterministic twinkle field for the map background. Pure CSS
 * animation (opacity keyframes), no per-frame JS. */
export default function Starfield({ count = 70 }: { count?: number }) {
  const stars = useMemo(() => {
    // deterministic pseudo-random so it doesn't reshuffle on re-render
    let seed = 42;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    return Array.from({ length: count }, () => ({
      x: rand() * 100,
      y: rand() * 100,
      size: 1 + rand() * 1.8,
      delay: rand() * 6,
      duration: 3 + rand() * 4,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: "var(--ink-soft)",
            opacity: 0.35,
            animation: `compass-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
