#!/usr/bin/env node
/**
 * Parses the 22 learner-facing module .md files (locked template, see
 * ../../CLAUDE.md section 5) into structured JSON the app can render as
 * independently-interactive WHAT / HOW panes, rather than dumping raw
 * markdown.
 *
 * Deliberately block-based rather than hardcoding every subsection name:
 * modules vary (some have an extra "Why This Module Comes First" or "A Real
 * Caution Worth Knowing" aside, some skip the research note, two are single
 * real case studies instead of several stories). Only the *structural*
 * skeleton is assumed to be locked: title stack, lead-in, THE WHAT (hook +
 * intro + N sections + Quick Check), THE HOW (N stories + One Last Thing).
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_ROOT = join(__dirname, "..", ".."); // Claude Compass/
const OUT_DIR = join(__dirname, "..", "src", "content");

const BRANCH_NAMES = {
  chat: "Claude Chat",
  cowork: "Cowork",
  code: "Claude Code",
};

const FILE_RE = /^(\d{2})-(chat|cowork|code)-(.+)\.md$/;

function stripRule(lines) {
  // drop stray "---" divider-only lines, keep everything else as-is
  return lines.filter((l) => l.trim() !== "---" && l.trim() !== "***");
}

function joinTrim(lines) {
  return stripRule(lines).join("\n").trim();
}

function cleanHeading(raw) {
  // strip leading emoji/symbol clutter, e.g. "💡 The Core Idea" -> "The Core Idea"
  return raw.replace(/^[^\p{L}\p{N}]+/u, "").trim();
}

function cleanStoryTitle(raw) {
  const noEmoji = raw.replace(/^[^\p{L}\p{N}"]+/u, "").trim();
  const m = noEmoji.match(/^["“](.+)["”]$/);
  return m ? m[1] : noEmoji;
}

function findIndex(lines, re, from = 0) {
  for (let i = from; i < lines.length; i++) {
    if (re.test(lines[i])) return i;
  }
  return -1;
}

function parseModule(filename, raw) {
  const match = filename.match(FILE_RE);
  if (!match) throw new Error(`Unexpected filename: ${filename}`);
  const [, orderStr, branch, rest] = match;

  const lines = raw.split("\n");

  // --- title stack ---
  const titleLine = lines.find((l) => l.startsWith("### "));
  const title = titleLine ? titleLine.replace(/^###\s+/, "").trim() : rest;

  const whatIdx = findIndex(lines, /^##\s.*THE WHAT/i);
  const howIdx = findIndex(lines, /^##\s.*THE HOW/i);
  if (whatIdx === -1 || howIdx === -1) {
    throw new Error(`${filename}: couldn't find THE WHAT / THE HOW headings`);
  }

  // --- lead-in (between title stack and THE WHAT) ---
  const titleStackEnd = lines.indexOf(titleLine) + 1;
  const leadInLines = lines.slice(titleStackEnd, whatIdx);
  const leadInParas = joinTrim(leadInLines)
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const objectiveIdx = leadInParas.findIndex((p) =>
    /^\*\*By the end of this module/i.test(p)
  );
  let objective = "";
  let leadIn = leadInParas;
  if (objectiveIdx !== -1) {
    objective = leadInParas[objectiveIdx].replace(
      /^\*\*By the end of this module, you'll be able to:\*\*\s*/i,
      ""
    );
    leadIn = leadInParas.filter((_, i) => i !== objectiveIdx);
  }

  // --- THE WHAT ---
  const whatLines = lines.slice(whatIdx + 1, howIdx);
  let cursor = 0;
  while (cursor < whatLines.length && whatLines[cursor].trim() === "")
    cursor++;
  if (!whatLines[cursor]?.startsWith("# ")) {
    throw new Error(`${filename}: expected hook (H1) at start of THE WHAT`);
  }
  const hook = whatLines[cursor].replace(/^#\s+/, "").trim();
  cursor++;

  const firstH3 = findIndex(whatLines, /^###\s/, cursor);
  const hookIntro = joinTrim(whatLines.slice(cursor, firstH3));

  const blocks = [];
  let quickCheck = { prompt: "", answer: "" };
  let i = firstH3;
  while (i !== -1 && i < whatLines.length) {
    const headingRaw = whatLines[i].replace(/^###\s+/, "").trim();
    const next = findIndex(whatLines, /^###\s/, i + 1);
    const bodyLines = whatLines.slice(i + 1, next === -1 ? undefined : next);

    if (/Quick Check/i.test(headingRaw)) {
      const detailsIdx = findIndex(bodyLines, /^<details>/i);
      const prompt = joinTrim(bodyLines.slice(0, detailsIdx));
      const summaryIdx = findIndex(bodyLines, /^<summary>/i, detailsIdx);
      const closeIdx = findIndex(bodyLines, /^<\/details>/i, detailsIdx);
      const answer = joinTrim(bodyLines.slice(summaryIdx + 1, closeIdx));
      quickCheck = { prompt, answer };
    } else {
      blocks.push({
        heading: cleanHeading(headingRaw),
        body: joinTrim(bodyLines),
      });
    }
    i = next;
  }

  // --- THE HOW ---
  const closingIdx = findIndex(lines, /^###\s.*One Last Thing/i, howIdx);
  if (closingIdx === -1) {
    throw new Error(`${filename}: couldn't find "One Last Thing" closing`);
  }
  const howLines = lines.slice(howIdx + 1, closingIdx);
  const stories = [];
  let s = findIndex(howLines, /^###\s/);
  while (s !== -1 && s < howLines.length) {
    const headingRaw = howLines[s].replace(/^###\s+/, "").trim();
    const next = findIndex(howLines, /^###\s/, s + 1);
    const bodyLines = howLines.slice(s + 1, next === -1 ? undefined : next);

    let bi = 0;
    while (bi < bodyLines.length && bodyLines[bi].trim() === "") bi++;
    let audience = "";
    const audienceMatch = bodyLines[bi]?.trim().match(/^\*\*(.+)\*\*$/);
    if (audienceMatch) {
      audience = audienceMatch[1];
      bi++;
    }
    stories.push({
      title: cleanStoryTitle(headingRaw),
      audience,
      body: joinTrim(bodyLines.slice(bi)),
    });
    s = next;
  }

  // --- closing ---
  const closingLines = lines.slice(closingIdx + 1);
  const closingHookLineIdx = closingLines
    .map((l, idx) => (l.startsWith("# ") ? idx : -1))
    .filter((idx) => idx !== -1)
    .pop();
  const closingHook =
    closingHookLineIdx !== undefined
      ? closingLines[closingHookLineIdx].replace(/^#\s+/, "").trim()
      : hook;
  const bridge = joinTrim(
    closingLines.slice(0, closingHookLineIdx ?? closingLines.length)
  );

  return {
    order: Number(orderStr),
    slug: rest,
    branch,
    branchName: BRANCH_NAMES[branch],
    title,
    leadIn,
    objective,
    what: { hook, hookIntro, blocks, quickCheck },
    how: { stories },
    closing: { bridge, hook: closingHook },
  };
}

function main() {
  const files = readdirSync(CONTENT_ROOT).filter((f) => FILE_RE.test(f));
  files.sort();

  const modules = files.map((f) => {
    const raw = readFileSync(join(CONTENT_ROOT, f), "utf-8");
    try {
      return parseModule(f, raw);
    } catch (err) {
      throw new Error(`Failed parsing ${f}: ${err.message}`);
    }
  });

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(
    join(OUT_DIR, "modules.json"),
    JSON.stringify(modules, null, 2)
  );

  const branchOrder = ["chat", "cowork", "code"];
  console.log(`Parsed ${modules.length} modules:`);
  for (const b of branchOrder) {
    const count = modules.filter((m) => m.branch === b).length;
    console.log(`  ${BRANCH_NAMES[b]}: ${count}`);
  }
}

main();
