import Markdown from "./Markdown";
import type { Module } from "../types/content";

export default function HowPane({
  module,
  accent,
  accentBg,
}: {
  module: Module;
  accent: string;
  accentBg: string;
}) {
  return (
    <div className="px-5 md:px-8 py-6 space-y-6 max-w-2xl mx-auto md:mx-0">
      <p
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: accent }}
      >
        ⚡ THE HOW
      </p>

      {module.how.stories.map((story, i) => (
        <article
          key={i}
          className="rounded-xl border p-5"
          style={{ borderColor: "var(--border)", background: "var(--paper-raised)" }}
        >
          <h3
            className="text-lg font-bold leading-snug"
            style={{ color: "var(--ink)" }}
          >
            "{story.title}"
          </h3>
          {story.audience && (
            <span
              className="inline-block mt-2 mb-3 text-xs font-medium rounded-full px-3 py-1"
              style={{ background: accentBg, color: accent }}
            >
              {story.audience}
            </span>
          )}
          <Markdown>{story.body}</Markdown>
        </article>
      ))}

      <div
        className="rounded-xl border p-5"
        style={{ borderColor: "var(--border)", background: "var(--border-soft)" }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: "var(--ink-soft)" }}
        >
          🎯 One Last Thing
        </p>
        <Markdown>{module.closing.bridge}</Markdown>
        <p
          className="mt-4 text-lg font-bold tracking-tight"
          style={{ color: accent }}
        >
          {module.closing.hook}
        </p>
      </div>
    </div>
  );
}
