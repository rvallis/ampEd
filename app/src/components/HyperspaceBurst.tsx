import { useEffect, useMemo } from "react";

/**
 * A very brief radiating burst of light streaks from a click point, meant
 * to read as "jumping to lightspeed" the instant you click a branch or
 * module. Plays on top of whatever transition that click already triggers
 * (map zoom, or the color portal for a module dive) rather than replacing
 * it.
 */
export default function HyperspaceBurst({
  xPercent,
  yPercent,
  onDone,
}: {
  xPercent: number;
  yPercent: number;
  onDone: () => void;
}) {
  const streaks = useMemo(() => {
    const count = 56;
    return Array.from({ length: count }, (_, i) => {
      const angle = (360 / count) * i + (Math.random() * 8 - 4);
      const len = 55 + Math.random() * 140;
      const delay = Math.random() * 30;
      return { angle, len, delay };
    });
  }, []);

  useEffect(() => {
    const t = setTimeout(onDone, 420);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
      {streaks.map((s, i) => (
        <div
          key={i}
          style={
            {
              position: "absolute",
              left: `${xPercent}%`,
              top: `${yPercent}%`,
              width: `${s.len}px`,
              height: "2px",
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0))",
              transformOrigin: "0 50%",
              "--angle": `${s.angle}deg`,
              animation: `hyperspace-streak 380ms ${s.delay}ms cubic-bezier(0.2,0.8,0.2,1) forwards`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
