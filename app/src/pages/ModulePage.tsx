import { useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { adjacentModule, getModule } from "../content/modules";
import type { BranchSlug } from "../types/content";
import WhatPane from "../components/WhatPane";
import HowPane from "../components/HowPane";
import Braid from "../components/Braid";

const ACCENT: Record<BranchSlug, { fg: string; bg: string }> = {
  chat: { fg: "var(--chat)", bg: "var(--chat-bg)" },
  cowork: { fg: "var(--cowork)", bg: "var(--cowork-bg)" },
  code: { fg: "var(--code)", bg: "var(--code-bg)" },
};

export default function ModulePage() {
  const { branch, slug } = useParams<{ branch: string; slug: string }>();
  const navigate = useNavigate();
  const [howOpen, setHowOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const module = getModule(branch, slug);
  if (!module) return <Navigate to="/" replace />;

  const accent = ACCENT[module.branch];
  const prev = adjacentModule(module, -1);
  const next = adjacentModule(module, 1);

  const goTo = (m: typeof prev) => {
    if (m) navigate(`/${m.branch}/${m.slug}`);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].pageX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].pageX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 60) return;
    if (dx < 0) goTo(next);
    else goTo(prev);
  };

  return (
    <motion.div
      className="h-svh flex flex-col"
      style={{ background: "var(--paper)" }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {/* top bar */}
      <header
        className="h-16 shrink-0 flex items-center gap-2 md:gap-3 px-3 md:px-6 border-b"
        style={{ borderColor: "var(--border)", background: "var(--paper)" }}
      >
        <Link
          to="/"
          aria-label="Back to compass"
          className="shrink-0 h-9 w-9 flex items-center justify-center rounded-full border"
          style={{ borderColor: "var(--border)", color: "var(--ink)" }}
        >
          🧭
        </Link>

        <button
          onClick={() => goTo(prev)}
          disabled={!prev}
          aria-label="Previous module"
          className="hidden md:flex shrink-0 h-9 w-9 rounded-full border disabled:opacity-30 disabled:cursor-default"
          style={{ borderColor: "var(--border)", color: "var(--ink)" }}
        >
          ‹
        </button>

        <div
          className="flex-1 min-w-0 select-none"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <p
            className="text-[10px] md:text-[11px] font-semibold uppercase tracking-widest truncate"
            style={{ color: accent.fg }}
          >
            {module.branchName}
          </p>
          <h1
            className="text-sm md:text-lg font-bold truncate"
            style={{ color: "var(--ink)" }}
          >
            {module.title}
          </h1>
        </div>

        <button
          onClick={() => goTo(next)}
          disabled={!next}
          aria-label="Next module"
          className="hidden md:flex shrink-0 h-9 w-9 rounded-full border disabled:opacity-30 disabled:cursor-default"
          style={{ borderColor: "var(--border)", color: "var(--ink)" }}
        >
          ›
        </button>

        {/* mobile-only: jump to HOW */}
        <button
          onClick={() => setHowOpen(true)}
          className="md:hidden shrink-0 text-xs font-semibold rounded-full px-3 py-2"
          style={{ background: accent.bg, color: accent.fg }}
        >
          See it in action →
        </button>
      </header>

      {/* content */}
      <div className="flex-1 min-h-0 relative">
        {/* desktop: independently-scrollable side by side panes, woven together */}
        <div className="hidden md:flex h-full">
          <div className="flex-1 h-full overflow-y-auto">
            <WhatPane module={module} accent={accent.fg} />
          </div>
          <Braid colorA={accent.fg} colorB="var(--ink-soft)" />
          <div className="flex-1 h-full overflow-y-auto">
            <HowPane module={module} accent={accent.fg} accentBg={accent.bg} />
          </div>
        </div>

        {/* mobile: WHAT full width, HOW slides over as a panel */}
        <div className="md:hidden h-full overflow-y-auto">
          <WhatPane module={module} accent={accent.fg} />
        </div>
        <div
          className={`md:hidden absolute inset-0 z-20 transition-transform duration-300 ease-out ${
            howOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ background: "var(--paper)" }}
        >
          <div
            className="h-12 shrink-0 flex items-center gap-2 px-4 border-b"
            style={{ borderColor: "var(--border)" }}
          >
            <button
              onClick={() => setHowOpen(false)}
              className="text-sm font-semibold flex items-center gap-1"
              style={{ color: "var(--ink)" }}
            >
              ← Back to THE WHAT
            </button>
          </div>
          <Braid colorA={accent.fg} colorB="var(--ink-soft)" orientation="horizontal" />
          <div className="h-[calc(100%-3rem-1rem)] overflow-y-auto">
            <HowPane module={module} accent={accent.fg} accentBg={accent.bg} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
