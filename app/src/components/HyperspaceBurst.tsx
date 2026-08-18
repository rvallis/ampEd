import { useEffect, useMemo } from "react";

/**
 * A dense radial burst of light streaks converging on screen-center and
 * shooting all the way past the edges of the viewport — the classic
 * "jump to lightspeed" shot: a tight vanishing point in the middle, long
 * streaks reaching every edge, not tied to click position.
 */
export default function HyperspaceBurst({ onDone }: { onDone: () => void }) {
  const streaks = useMemo(() => {
    const count = 170;
    // reach well past the farthest corner regardless of viewport shape
    const diagonal = Math.hypot(window.innerWidth, window.innerHeight);
    return Array.from({ length: count }, (_, i) => {
      const angle = (360 / count) * i + (Math.random() * 4 - 2);
      // tight convergence near dead-center, tiny jitter so it's not a
      // single infinitesimal point
      const startRadiusPercent = Math.random() * 2;
      const rad = (angle * Math.PI) / 180;
      const xPercent = 50 + Math.cos(rad) * startRadiusPercent;
      const yPercent = 50 + Math.sin(rad) * startRadiusPercent;
      const len = diagonal * (0.55 + Math.random() * 0.25);
      const width = 1.2 + Math.random() * 1.6;
      const delay = Math.random() * 35;
      return { angle, xPercent, yPercent, len, width, delay };
    });
  }, []);

  useEffect(() => {
    const t = setTimeout(onDone, 480);
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
              height: `${s.width}px`,
              background:
                "linear-gradient(90deg, rgba(214,227,255,0.95), rgba(214,227,255,0))",
              transformOrigin: "0 50%",
              "--angle": `${s.angle}deg`,
              animation: `hyperspace-streak 440ms ${s.delay}ms cubic-bezier(0.16,0.84,0.24,1) forwards`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
