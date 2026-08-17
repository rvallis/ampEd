import { useId } from "react";

/**
 * The seam between THE WHAT and THE HOW, rendered as two interwoven
 * strands rather than a plain divider line — the point being that the two
 * halves aren't separate content blocks bolted together, they're one
 * continuous thing viewed two ways.
 */
export default function Braid({
  colorA,
  colorB,
  orientation = "vertical",
}: {
  colorA: string;
  colorB: string;
  orientation?: "vertical" | "horizontal";
}) {
  const rawId = useId();
  const id = `braid-${rawId.replace(/[:]/g, "")}`;
  const vertical = orientation === "vertical";

  return (
    <div
      aria-hidden
      className={vertical ? "hidden md:block w-4 h-full shrink-0" : "w-full h-4 shrink-0"}
    >
      <svg width="100%" height="100%" style={{ display: "block" }}>
        <defs>
          <pattern
            id={id}
            width={vertical ? 16 : 48}
            height={vertical ? 48 : 16}
            patternUnits="userSpaceOnUse"
          >
            {vertical ? (
              <>
                <path
                  d="M0,0 C4,12 12,12 16,24 C12,36 4,36 0,48"
                  fill="none"
                  stroke={colorA}
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  opacity={0.85}
                />
                <path
                  d="M16,0 C12,12 4,12 0,24 C4,36 12,36 16,48"
                  fill="none"
                  stroke={colorB}
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  opacity={0.55}
                />
              </>
            ) : (
              <>
                <path
                  d="M0,0 C12,4 12,12 24,16 C36,12 36,4 48,0"
                  fill="none"
                  stroke={colorA}
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  opacity={0.85}
                />
                <path
                  d="M0,16 C12,12 12,4 24,0 C36,4 36,12 48,16"
                  fill="none"
                  stroke={colorB}
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  opacity={0.55}
                />
              </>
            )}
            <animate
              attributeName={vertical ? "y" : "x"}
              values="0;48"
              dur="4s"
              repeatCount="indefinite"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}
