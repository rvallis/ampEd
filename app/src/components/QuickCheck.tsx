import { useState } from "react";
import Markdown from "./Markdown";
import type { QuickCheck as QuickCheckType } from "../types/content";

/**
 * The learner attempts an answer before revealing one. The reveal is a
 * conscious click (not a native <details>, so we control the affordance
 * copy and can style the moment) to protect the retrieval-practice effect
 * per build-notes-ui-and-technical.md.
 */
export default function QuickCheck({ data }: { data: QuickCheckType }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <section
      className="rounded-xl border p-5"
      style={{ borderColor: "var(--border)", background: "var(--paper-raised)" }}
    >
      <h3
        className="text-sm font-semibold uppercase tracking-wide mb-3"
        style={{ color: "var(--ink)" }}
      >
        ✅ Quick Check
      </h3>
      <Markdown>{data.prompt}</Markdown>

      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="mt-4 text-sm font-medium rounded-full px-4 py-2 border transition-colors cursor-pointer"
          style={{
            borderColor: "var(--border)",
            color: "var(--ink)",
          }}
        >
          Try it yourself first, then see a strong answer
        </button>
      ) : (
        <div
          className="mt-4 pt-4 border-t"
          style={{ borderColor: "var(--border-soft)" }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-wide mb-2"
            style={{ color: "var(--ink-soft)" }}
          >
            A strong answer
          </p>
          <Markdown>{data.answer}</Markdown>
        </div>
      )}
    </section>
  );
}
