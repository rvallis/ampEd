import Markdown from "./Markdown";
import QuickCheck from "./QuickCheck";
import type { Module } from "../types/content";

export default function WhatPane({
  module,
  accent,
}: {
  module: Module;
  accent: string;
}) {
  return (
    <div className="px-5 md:px-8 py-6 space-y-6 max-w-2xl mx-auto md:mx-0">
      <div>
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: accent }}
        >
          🧠 THE WHAT
        </p>
        <h2
          className="text-2xl md:text-3xl font-bold leading-tight tracking-tight"
          style={{ color: "var(--ink)" }}
        >
          {module.what.hook}
        </h2>
        <div className="mt-3">
          <Markdown>{module.what.hookIntro}</Markdown>
        </div>
      </div>

      {module.what.blocks.map((block, i) => (
        <div key={i}>
          {block.heading && (
            <h3
              className="text-base font-semibold mb-2"
              style={{ color: "var(--ink)" }}
            >
              {block.heading}
            </h3>
          )}
          <Markdown>{block.body}</Markdown>
        </div>
      ))}

      <QuickCheck data={module.what.quickCheck} />
    </div>
  );
}
