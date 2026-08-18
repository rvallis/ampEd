import { useEffect, useMemo, useState } from "react";

/** Cheap, deterministic twinkle field for the map background. Pure CSS
 * animation (opacity keyframes), no per-frame JS.
 *
 * When `burstNonce` changes, the same stars briefly stretch into streaks
 * radiating away from screen-center (farther stars stretch further, like
 * real hyperdrive perspective) instead of a separate synthetic overlay --
 * the light-speed effect *is* the background you're already looking at. */
export default function Starfield({
  count = 70,
  burstNonce,
}: {
  count?: number;
  burstNonce?: number | null;
}) {
  const stars = useMemo(() => {
    // deterministic pseudo-random so it doesn't reshuffle on re-render
    let seed = 42;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    return Array.from({ length: count }, () => {
      const x = rand() * 100;
      const y = rand() * 100;
      const dx = x - 50;
      const dy = y - 50;
      return {
        x,
        y,
        size: 1 + rand() * 1.8,
        delay: rand() * 6,
        duration: 3 + rand() * 4,
        angleDeg: Math.atan2(dy, dx) * (180 / Math.PI),
        distance: Math.hypot(dx, dy),
      };
    });
  }, [count]);

  const [bursting, setBursting] = useState(false);
  useEffect(() => {
    if (burstNonce == null) return;
    setBursting(true);
    const t = setTimeout(() => setBursting(false), 440);
    return () => clearTimeout(t);
  }, [burstNonce]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s, i) =>
        bursting ? (
          <span
            key={i}
            className="absolute"
            style={
              {
                left: `${s.x}%`,
                top: `${s.y}%`,
                height: 1.5,
                background:
                  "linear-gradient(90deg, rgba(214,227,255,0.95), rgba(214,227,255,0))",
                transformOrigin: "0 50%",
                transform: `rotate(${s.angleDeg}deg)`,
                "--burst-len": `${16 + s.distance * 7}px`,
                animation: "star-streak 420ms cubic-bezier(0.16,0.84,0.24,1) forwards",
              } as React.CSSProperties
            }
          />
        ) : (
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
        )
      )}
    </div>
  );
}
