/** A soft diagonal galaxy band behind the compass map's dot starfield.
 * Pure CSS (`.galaxy-band` in index.css), no image asset — stays as
 * lightweight as Starfield.tsx and matches its code-generated look
 * rather than introducing a photographic element. Renders behind
 * Starfield in the DOM so the twinkling dots sit on top of the glow. */
export default function Galaxy() {
  return (
    <div
      aria-hidden
      className="galaxy-band pointer-events-none absolute inset-0 overflow-hidden"
    />
  );
}
