import type { BranchSlug } from "../types/content";
import { modulesByBranch } from "./modules";

export interface MapLayout {
  width: number;
  height: number;
  anchors: Record<BranchSlug, { x: number; y: number }>;
  ringRadius: Record<BranchSlug, number>;
  startAngle: Record<BranchSlug, number>;
}

/** Widescreen layout: three branches spread as a triangle. Matches a
 * typical landscape browser window. */
export const LANDSCAPE_LAYOUT: MapLayout = {
  width: 160,
  height: 100,
  anchors: {
    chat: { x: 44, y: 32 },
    cowork: { x: 118, y: 36 },
    code: { x: 80, y: 78 },
  },
  ringRadius: { chat: 16, cowork: 14, code: 19 },
  startAngle: { chat: -100, cowork: -60, code: -95 },
};

/** Portrait layout: three branches stacked top-to-bottom instead of
 * triangulated, since a wide triangle wastes most of a tall, narrow
 * screen (phones). */
export const PORTRAIT_LAYOUT: MapLayout = {
  width: 100,
  height: 170,
  anchors: {
    chat: { x: 50, y: 34 },
    cowork: { x: 50, y: 88 },
    code: { x: 50, y: 142 },
  },
  ringRadius: { chat: 21, cowork: 18, code: 23 },
  startAngle: { chat: -100, cowork: -70, code: -95 },
};

export interface ModuleNode {
  slug: string;
  x: number;
  y: number;
  angleDeg: number;
}

export function moduleNodes(branch: BranchSlug, layout: MapLayout): ModuleNode[] {
  const mods = modulesByBranch(branch);
  const anchor = layout.anchors[branch];
  const radius = layout.ringRadius[branch];
  const start = layout.startAngle[branch];
  const step = 360 / mods.length;
  // preserveAspectRatio="meet" scales x and y uniformly, so a true circle
  // in viewBox space (cos*r, sin*r) stays circular on screen regardless of
  // the viewBox's own width:height ratio — no correction factor needed.
  return mods.map((m, i) => {
    const angleDeg = start + step * i;
    const rad = (angleDeg * Math.PI) / 180;
    return {
      slug: m.slug,
      x: anchor.x + Math.cos(rad) * radius,
      y: anchor.y + Math.sin(rad) * radius,
      angleDeg,
    };
  });
}
