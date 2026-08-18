import { motion } from "framer-motion";

const STAR_PATH =
  "M0,-2.6 L0.7,-0.7 L2.6,0 L0.7,0.7 L0,2.6 L-0.7,0.7 L-2.6,0 L-0.7,-0.7 Z";

// house outline traced through 5 points: roof peak, down each slope, across
// the base
const POINTS = [
  { x: 12, y: 3 }, // peak
  { x: 3, y: 11 }, // roof left
  { x: 3, y: 21 }, // base left
  { x: 21, y: 21 }, // base right
  { x: 21, y: 11 }, // roof right
];

/**
 * Home button drawn the same way as the prev/next arrows: a shape traced
 * through small twinkling stars connected by faint lines, instead of an
 * emoji.
 */
export default function ConstellationHouse() {
  const lines = POINTS.map((p, i) => [p, POINTS[(i + 1) % POINTS.length]]);

  return (
    <svg viewBox="0 0 24 24" width="22" height="22" className="overflow-visible">
      {lines.map(([a, b], i) => (
        <line
          key={i}
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          stroke="currentColor"
          strokeWidth={0.6}
          opacity={0.45}
        />
      ))}
      {POINTS.map((p, i) => (
        <motion.path
          key={i}
          d={STAR_PATH}
          fill="currentColor"
          transform={`translate(${p.x}, ${p.y})`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.25,
          }}
        />
      ))}
    </svg>
  );
}
