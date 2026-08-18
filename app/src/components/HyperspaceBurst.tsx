import { useEffect, useMemo } from "react";

/**
 * A very brief ring of light streaks confined to the outer edge of the
 * screen, each shooting further outward (off-screen) — meant to read as
 * "jumping to lightspeed" glimpsed at the periphery, not an explosion
 * centered on wherever you clicked. The center of the screen (where the
 * map/content actually is) stays completely clear.
 */
export default function HyperspaceBurst({ onDone }: { onDone: () => void }) {
  const streaks = useMemo(() => {
    const count = 64;
    return Array.from({ length: count }, (_, i) => {
      const angle = (360 / count) * i + (Math.random() * 6 - 3);
      const rad = (angle * Math.PI) / 180;
      // start position sits in a band near the edge (34-46% out from
      // center along each axis independently, so it hugs the real screen
      // edge on any aspect ratio, not just a circle inscribed in the
      // smaller dimension)
      const radiusX = 34 + Math.random() * 12;
      const radiusY = 34 + Math.random() * 12;
      const xPercent = 50 + Math.cos(rad) * radiusX;
      const yPercent = 50 + Math.sin(rad) * radiusY;
      const len = 50 + Math.random() * 90;
      const delay = Math.random() * 30;
      return { angle, xPercent, yPercent, len, delay };
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
              left: `${s.xPercent}%`,
              top: `${s.yPercent}%`,
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
