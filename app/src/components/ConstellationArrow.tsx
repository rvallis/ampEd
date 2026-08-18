import { motion } from "framer-motion";

const STAR_PATH =
  "M0,-2.6 L0.7,-0.7 L2.6,0 L0.7,0.7 L0,2.6 L-0.7,0.7 L-2.6,0 L-0.7,-0.7 Z";

/**
 * Prev/next arrow drawn as three small twinkling stars connected by faint
 * lines, chevron-shaped, instead of a plain glyph in a circle.
 */
export default function ConstellationArrow({
  direction,
}: {
  direction: "left" | "right";
}) {
  // three points forming a chevron pointing the given direction
  const points =
    direction === "right"
      ? [
          { x: 6, y: 3 },
          { x: 15, y: 12 },
          { x: 6, y: 21 },
        ]
      : [
          { x: 15, y: 3 },
          { x: 6, y: 12 },
          { x: 15, y: 21 },
        ];

  return (
    <svg viewBox="0 0 21 24" width="21" height="24" className="overflow-visible">
      <line
        x1={points[0].x}
        y1={points[0].y}
        x2={points[1].x}
        y2={points[1].y}
        stroke="currentColor"
        strokeWidth={0.6}
        opacity={0.45}
      />
      <line
        x1={points[1].x}
        y1={points[1].y}
        x2={points[2].x}
        y2={points[2].y}
        stroke="currentColor"
        strokeWidth={0.6}
        opacity={0.45}
      />
      {points.map((p, i) => (
        <motion.path
          key={i}
          d={STAR_PATH}
          fill="currentColor"
          transform={`translate(${p.x}, ${p.y}) scale(${i === 1 ? 1.3 : 1})`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </svg>
  );
}
