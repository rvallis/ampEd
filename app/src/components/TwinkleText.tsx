import { motion } from "framer-motion";

const STAR_PATH =
  "M0,-2.6 L0.7,-0.7 L2.6,0 L0.7,0.7 L0,2.6 L-0.7,0.7 L-2.6,0 L-0.7,-0.7 Z";

/**
 * A single small twinkling star, the same 8-point sparkle shape and
 * staggered-opacity twinkle as the constellation icon language
 * (ConstellationArrow/House), scaled down into a typographic accent
 * rather than a full icon. Sits absolutely positioned in the corner of
 * whatever letter it's attached to via TwinkleText below.
 */
function LetterTwinkle({ delay }: { delay: number }) {
  return (
    <motion.svg
      viewBox="-3 -3 6 6"
      className="pointer-events-none absolute -top-1.5 -right-1 h-2 w-2 md:-top-2 md:-right-1.5 md:h-2.5 md:w-2.5"
      animate={{ opacity: [0.3, 0.85, 0.3], scale: [0.85, 1.05, 0.85] }}
      transition={{
        duration: 2.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <path d={STAR_PATH} fill="currentColor" />
    </motion.svg>
  );
}

/**
 * Renders `text` as-is, except the characters at `indices` each get a
 * small twinkling star pinned to their top-right corner. Kept deliberately
 * sparse (a couple of letters, not every letter) so it reads as a subtle
 * accent tying the headline back to the constellation-map theme, not a
 * decoration. Inherits color from its parent via currentColor, same as
 * the rest of the constellation icon language, so it always matches the
 * text it's twinkling on.
 */
export default function TwinkleText({
  text,
  indices,
}: {
  text: string;
  indices: number[];
}) {
  return (
    <>
      {[...text].map((char, i) => {
        if (!indices.includes(i)) return char;
        return (
          <span key={i} className="relative inline-block">
            {char}
            <LetterTwinkle delay={indices.indexOf(i) * 0.4} />
          </span>
        );
      })}
    </>
  );
}
