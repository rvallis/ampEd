import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BRANCH_META, BRANCH_ORDER, modulesByBranch } from "../content/modules";
import ScrollRow from "../components/ScrollRow";
import type { BranchSlug } from "../types/content";

const ACCENT: Record<BranchSlug, { fg: string; bg: string; border: string }> = {
  chat: { fg: "var(--chat)", bg: "var(--chat-bg)", border: "var(--chat)" },
  cowork: { fg: "var(--cowork)", bg: "var(--cowork-bg)", border: "var(--cowork)" },
  code: { fg: "var(--code)", bg: "var(--code-bg)", border: "var(--code)" },
};

export default function Home() {
  const [active, setActive] = useState<BranchSlug>("chat");
  const navigate = useNavigate();
  const accent = ACCENT[active];

  return (
    <div className="min-h-svh flex flex-col" style={{ background: "var(--paper)" }}>
      <header className="px-6 pt-10 pb-4 text-center">
        <p
          className="text-xs font-semibold uppercase tracking-[0.2em] mb-2"
          style={{ color: "var(--ink-soft)" }}
        >
          🧭 Claude Compass
        </p>
        <h1
          className="text-3xl md:text-4xl font-bold tracking-tight"
          style={{ color: "var(--ink)" }}
        >
          Start wherever you are.
        </h1>
        <p
          className="mt-2 text-sm md:text-base max-w-xl mx-auto"
          style={{ color: "var(--ink-soft)" }}
        >
          Every module stands on its own, zero assumed prior knowledge.
          Pick a branch, then a module. Swipe or click through.
        </p>
      </header>

      {/* branch level */}
      <section className="px-6 mt-4">
        <ScrollRow>
          {BRANCH_ORDER.map((b) => {
            const meta = BRANCH_META[b];
            const a = ACCENT[b];
            const isActive = b === active;
            return (
              <button
                key={b}
                onClick={() => setActive(b)}
                className="scroll-snap-item shrink-0 w-[260px] md:w-[300px] text-left rounded-2xl border-2 p-5 transition-transform"
                style={{
                  borderColor: isActive ? a.border : "var(--border)",
                  background: isActive ? a.bg : "var(--paper-raised)",
                  transform: isActive ? "translateY(-2px)" : "none",
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: a.fg }}
                >
                  {modulesByBranch(b).length} modules
                </p>
                <h2
                  className="text-xl font-bold mb-1"
                  style={{ color: "var(--ink)" }}
                >
                  {meta.name}
                </h2>
                <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
                  {meta.blurb}
                </p>
              </button>
            );
          })}
        </ScrollRow>
      </section>

      {/* module level, for the active branch */}
      <section className="px-6 mt-6 flex-1">
        <p className="text-sm mb-1" style={{ color: "var(--ink-soft)" }}>
          {BRANCH_META[active].audience}
        </p>
        <ScrollRow>
          {modulesByBranch(active).map((m) => (
            <button
              key={m.slug}
              onClick={() => navigate(`/${m.branch}/${m.slug}`)}
              className="scroll-snap-item shrink-0 w-[240px] md:w-[280px] text-left rounded-2xl border p-5 hover:-translate-y-0.5 transition-transform"
              style={{
                borderColor: "var(--border)",
                background: "var(--paper-raised)",
              }}
            >
              <p
                className="text-[11px] font-semibold uppercase tracking-widest mb-2"
                style={{ color: accent.fg }}
              >
                {m.title}
              </p>
              <p
                className="text-base font-bold leading-snug"
                style={{ color: "var(--ink)" }}
              >
                {m.what.hook}
              </p>
            </button>
          ))}
        </ScrollRow>
      </section>

      <footer
        className="px-6 py-6 text-center text-xs"
        style={{ color: "var(--ink-soft)" }}
      >
        Claude Chat · Cowork · Claude Code — one idea, three ways in.
      </footer>
    </div>
  );
}
