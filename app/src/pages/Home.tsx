import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BRANCH_META, BRANCH_ORDER, modulesByBranch } from "../content/modules";
import { moduleNodes, type MapLayout } from "../content/mapLayout";
import { useMapLayout } from "../hooks/useMapLayout";
import Starfield from "../components/Starfield";
import { useZoomTransition } from "../transition/ZoomTransition";
import type { BranchSlug } from "../types/content";

const ACCENT: Record<BranchSlug, string> = {
  chat: "var(--chat)",
  cowork: "var(--cowork)",
  code: "var(--code)",
};

const ZOOM = 1.9;

export default function Home() {
  const [zoomed, setZoomed] = useState<BranchSlug | null>(null);
  const navigate = useNavigate();
  const { zoomInto } = useZoomTransition();
  const layout = useMapLayout();

  // Re-center the zoomed anchor at viewport-middle rather than just scaling
  // around it in place (which would push anything left/above the anchor
  // off-screen). transform-origin stays pinned at 0,0 so these percentages
  // (which resolve against the element's own untransformed box, per the
  // CSS transform spec) land the anchor dead center after scaling.
  const targetXPercent = zoomed ? (layout.anchors[zoomed].x / layout.width) * 100 : 0;
  const targetYPercent = zoomed ? (layout.anchors[zoomed].y / layout.height) * 100 : 0;
  const mapX = zoomed ? `${50 - targetXPercent * ZOOM}%` : "0%";
  const mapY = zoomed ? `${50 - targetYPercent * ZOOM}%` : "0%";

  const diveIntoModule = (
    branch: BranchSlug,
    slug: string,
    e: React.MouseEvent
  ) => {
    const xPercent = (e.clientX / window.innerWidth) * 100;
    const yPercent = (e.clientY / window.innerHeight) * 100;
    zoomInto({ xPercent, yPercent, color: ACCENT[branch] }, () =>
      navigate(`/${branch}/${slug}`)
    );
  };

  return (
    <div
      className="relative w-full h-svh overflow-hidden"
      style={{ background: "var(--paper)" }}
    >
      <Starfield />

      {/* title, recedes when zoomed */}
      <motion.header
        className="absolute top-0 inset-x-0 z-10 px-6 pt-8 text-center pointer-events-none"
        animate={{ opacity: zoomed ? 0 : 1, y: zoomed ? -16 : 0 }}
        transition={{ duration: 0.35 }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-[0.2em] mb-2"
          style={{ color: "var(--ink-soft)" }}
        >
          🧭 AmpEd
        </p>
        <h1
          className="text-2xl md:text-4xl font-bold tracking-tight"
          style={{ color: "var(--ink)" }}
        >
          Amplify your ability to educate with Claude.
        </h1>
        <p
          className="mt-2 text-xs md:text-sm max-w-md mx-auto"
          style={{ color: "var(--ink-soft)" }}
        >
          Start wherever you are. One idea, three ways in. Click a branch to
          zoom in, click a module
          to dive in.
        </p>
      </motion.header>

      {/* back-to-map control */}
      <AnimatePresence>
        {zoomed && (
          <motion.button
            key="back"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setZoomed(null)}
            className="absolute top-5 left-5 z-20 h-11 w-11 rounded-full border flex items-center justify-center text-lg"
            style={{
              borderColor: "var(--border)",
              background: "var(--paper-raised)",
              color: "var(--ink)",
            }}
            aria-label="Zoom back out to the full map"
          >
            🧭
          </motion.button>
        )}
      </AnimatePresence>

      {/* the map */}
      <motion.div
        className="absolute inset-0"
        style={{ transformOrigin: "0 0" }}
        animate={{ x: mapX, y: mapY, scale: zoomed ? ZOOM : 1 }}
        transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }}
      >
        <svg
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full select-none"
        >
          {BRANCH_ORDER.map((branch) => (
            <BranchCluster
              key={branch}
              branch={branch}
              layout={layout}
              dimmed={zoomed !== null && zoomed !== branch}
              zoomed={zoomed === branch}
              onSelectBranch={() => setZoomed(branch)}
              onSelectModule={(slug, e) => diveIntoModule(branch, slug, e)}
            />
          ))}
        </svg>
      </motion.div>

      <footer
        className="absolute bottom-0 inset-x-0 px-6 py-5 text-center text-xs pointer-events-none"
        style={{ color: "var(--ink-soft)" }}
      >
        Claude Chat · Cowork · Claude Code
      </footer>
    </div>
  );
}

function BranchCluster({
  branch,
  layout,
  dimmed,
  zoomed,
  onSelectBranch,
  onSelectModule,
}: {
  branch: BranchSlug;
  layout: MapLayout;
  dimmed: boolean;
  zoomed: boolean;
  onSelectBranch: () => void;
  onSelectModule: (slug: string, e: React.MouseEvent) => void;
}) {
  const anchor = layout.anchors[branch];
  const nodes = moduleNodes(branch, layout);
  const mods = modulesByBranch(branch);
  const accent = ACCENT[branch];

  return (
    <motion.g
      animate={{ opacity: dimmed ? 0.07 : 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* spokes */}
      {nodes.map((n) => (
        <line
          key={n.slug}
          x1={anchor.x}
          y1={anchor.y}
          x2={n.x}
          y2={n.y}
          stroke={accent}
          strokeWidth={0.25}
          opacity={0.5}
        />
      ))}

      {/* module nodes */}
      {nodes.map((n, i) => {
        const angleRight = Math.cos((n.angleDeg * Math.PI) / 180) >= 0;
        const mod = mods[i];
        return (
          <g
            key={n.slug}
            onClick={(e) => onSelectModule(n.slug, e)}
            style={{ cursor: "pointer" }}
          >
            <circle cx={n.x} cy={n.y} r={2.6} fill="transparent" />
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={1.1}
              fill={accent}
              whileHover={{ scale: 1.6 }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            />
            <AnimatePresence>
              {zoomed && (
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.025, duration: 0.25 }}
                  x={n.x + (angleRight ? 2.2 : -2.2)}
                  y={n.y + 0.6}
                  textAnchor={angleRight ? "start" : "end"}
                  fontSize={2.3}
                  fontWeight={600}
                  fill="var(--ink)"
                  style={{ pointerEvents: "none" }}
                >
                  {mod.title.length > 22
                    ? `${mod.title.slice(0, 21)}…`
                    : mod.title}
                </motion.text>
              )}
            </AnimatePresence>
          </g>
        );
      })}

      {/* branch anchor */}
      <g
        onClick={onSelectBranch}
        style={{ cursor: zoomed ? "default" : "pointer" }}
      >
        <circle cx={anchor.x} cy={anchor.y} r={6} fill="transparent" />
        <motion.circle
          cx={anchor.x}
          cy={anchor.y}
          r={2.4}
          fill={accent}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: `${anchor.x}px ${anchor.y}px` }}
        />
        <text
          x={anchor.x}
          y={anchor.y - 4.2}
          textAnchor="middle"
          fontSize={zoomed ? 5.2 : 4}
          fontWeight={700}
          fill="var(--ink)"
          style={{ transition: "font-size 0.3s" }}
        >
          {BRANCH_META[branch].name}
        </text>
        {!zoomed && (
          <text
            x={anchor.x}
            y={anchor.y + 8.5}
            textAnchor="middle"
            fontSize={2.2}
            fill="var(--ink-soft)"
          >
            {mods.length} modules
          </text>
        )}
      </g>
    </motion.g>
  );
}
