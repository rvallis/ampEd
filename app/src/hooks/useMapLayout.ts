import { useEffect, useState } from "react";
import { LANDSCAPE_LAYOUT, PORTRAIT_LAYOUT, type MapLayout } from "../content/mapLayout";

function isPortrait() {
  return window.innerWidth / window.innerHeight < 1;
}

/** Picks the map layout that fits the current viewport shape, and keeps it
 * updated across resizes/rotations. */
export function useMapLayout(): MapLayout {
  const [portrait, setPortrait] = useState(
    typeof window === "undefined" ? false : isPortrait()
  );

  useEffect(() => {
    const onResize = () => setPortrait(isPortrait());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return portrait ? PORTRAIT_LAYOUT : LANDSCAPE_LAYOUT;
}
