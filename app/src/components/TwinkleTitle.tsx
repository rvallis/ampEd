// Same dot shape, same color, and the same twinkle (opacity curve) as the
// starfield background (see Starfield.tsx) — just clipped to a text shape
// instead of scattered across the page, so it reads as those same stars
// happening to shine through the letters rather than a different,
// separate sparkle style layered on top of them. (The animation is
// compass-twinkle-fade rather than Starfield's compass-twinkle: same
// opacity keyframe values, minus the scale pulse, since scaling a
// text-sized box would zoom the letters rather than read as a twinkle.)
//
// Technique: stack two copies of the same text in one CSS grid cell (so
// they're pixel-identical, including how they wrap on narrow screens).
// The bottom copy is the real, solid, fully legible title. Each copy
// above it is transparent except for a handful of small radial-gradient
// dots, painted only where `background-clip: text` finds glyph ink —
// gaps between letters and words never show a dot, because there's
// nothing there to clip to. Three layers with staggered timing fake the
// look of independently twinkling stars without animating every dot
// separately.

interface Dot {
  x: number; // % across the text's own bounding box
  y: number; // % down the text's own bounding box
  size: number; // px radius
}

const LAYERS: { dots: Dot[]; duration: number; delay: number }[] = [
  {
    dots: [
      { x: 49.2, y: 54.3, size: 1.1 },
      { x: 27.5, y: 46, size: 1.6 },
      { x: 12.9, y: 76.5, size: 1.7 },
      { x: 42.2, y: 34.9, size: 1.9 },
    ],
    duration: 3.4,
    delay: 0,
  },
  {
    dots: [
      { x: 63.9, y: 20.4, size: 1.6 },
      { x: 26.7, y: 62, size: 1.2 },
      { x: 55.3, y: 49.1, size: 1.2 },
      { x: 10.4, y: 80.7, size: 2.2 },
    ],
    duration: 4.2,
    delay: 1.4,
  },
  {
    dots: [
      { x: 16.6, y: 46.1, size: 2.2 },
      { x: 65.1, y: 34.7, size: 1.2 },
      { x: 92.7, y: 46.2, size: 1.3 },
      { x: 74, y: 39.6, size: 1.4 },
    ],
    duration: 3.8,
    delay: 2.6,
  },
];

function dotLayerGradient(dots: Dot[]) {
  return dots
    .map(
      (d) =>
        `radial-gradient(circle ${d.size}px at ${d.x}% ${d.y}%, var(--ink-soft) 99%, transparent 100%)`
    )
    .join(", ");
}

/** Renders `text` as a normal, solid, fully legible title, with a few
 * small starfield-style dots twinkling on top of it — confined to the
 * letters themselves, never floating beside or above them. */
export default function TwinkleTitle({ text }: { text: string }) {
  return (
    // block-level grid, not inline-grid: needs to stretch to the full
    // width of its container so the text wraps exactly like plain text
    // would (e.g. onto two lines on a narrow phone), instead of sizing
    // itself to the unwrapped width of the string.
    <span className="relative grid w-full">
      <span style={{ gridArea: "1 / 1" }}>{text}</span>
      {LAYERS.map((layer, i) => (
        <span
          key={i}
          aria-hidden
          className="pointer-events-none select-none"
          style={{
            gridArea: "1 / 1",
            backgroundImage: dotLayerGradient(layer.dots),
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            // compass-twinkle-fade, not compass-twinkle: same opacity
            // curve as the background stars, minus the scale transform
            // (which would zoom the whole text box, not a single dot).
            animation: `compass-twinkle-fade ${layer.duration}s ease-in-out ${layer.delay}s infinite`,
          }}
        >
          {text}
        </span>
      ))}
    </span>
  );
}
