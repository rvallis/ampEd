# AmpEd — Handoff for Claude Code

This file exists so a new Claude Code session can pick up this project with full context, without the person re-explaining it from scratch. Read this first, before touching any other file in this folder.

**Naming note:** the project is called **AmpEd** (tagline: *"amplify your ability to educate with Claude"*), renamed from an earlier working title ("Claude Compass"). The folder this all lives in, and this file's own path, may still say `claude-compass` — that's just the folder name on disk, not the product name. Don't rename the folder unless asked; just use "AmpEd" as the product name in all learner-facing UI, copy, and page titles.

---

## 0. Current status (read this first — it's not aspirational, it's built and live)

The site is a real, deployed, working app — not a plan. Don't treat anything below as "to build" unless it's explicitly flagged as open in Section 7.

- **Live:** https://ampedai.vercel.app
- **Repo (public):** https://github.com/rvallis/ampEd — the `app/` subfolder is the actual Vite/React/TypeScript build; the repo root (this folder) holds the 22 source module `.md` files plus this handoff, the decisions log, and build-notes
- **Deploy pipeline:** git-connected to Vercel — every push to `main` auto-deploys. No manual deploy steps needed. Vercel project root directory is set to `app`.
- **Navigation is genuinely a zoomable compass map**, not horizontal scroll rows (see Section 3's note and `build-notes-ui-and-technical.md` for the full story of why that changed after the first version was seen running).
- **What's been through real iteration already**, so don't re-propose these from scratch: the WHAT/HOW split view, the constellation-style icon language (prev/next arrows and the home button are literally traced through small twinkling stars, not emoji or plain glyphs — see `build-notes-ui-and-technical.md`), module titles floating with no background box, wraparound module navigation (prev/next loops forever, no dead ends). A "hyperspace"/light-speed click effect was built, iterated on extensively across several different approaches, and ultimately **removed entirely** because it didn't look good — don't re-add it without the person explicitly asking again.
- If you're a fresh session picking this up cold (e.g. a cloud/mobile session with no memory of prior conversations): read this file fully, then `build-notes-ui-and-technical.md`, then skim `instructional-design-decisions-log.md`'s most recent entries and the last handful of `git log` messages in `app/` for the most current tactical context. That combination should be sufficient — if you find yourself needing to ask the person to re-explain something already answered here, that's a gap worth closing in this file.

---

## 1. What this project is

AmpEd is a portfolio piece and a real learning resource, built by an AI-directed course developer (17 years as a public school educator, now building freelance instructional design work directed through Claude and Claude Code). It's the flagship proof of a specific professional identity: someone with deep pedagogy and domain expertise who directs AI to build sophisticated things, rather than a traditional instructional designer or a traditional developer.

**The overarching idea of the course itself:** gain Claude knowledge and know how to transfer it, for anyone who has to teach, train, onboard, or coach someone else. Not just K-12 teachers, also a doctor training a resident, a manager training a new hire, a freelancer training a client.

This is not a generic AI-literacy course. It is specifically about Claude, and it is being built as a custom web application (not Rise 360, not Moodle, not Canvas), because the medium itself needs to prove the "AI-directed builder" skill, not just contain content about it.

## 2. What's in this folder right now

- **22 module files** (`01-chat-prompting-fundamentals.md` through `22-code-aurafitness.md`) — fully drafted learner-facing content, organized by branch (see below). These are the source content for the site. They are NOT meant to be shipped as raw markdown pages; they need to be built into the actual interactive web experience described in this handoff.
- **`instructional-design-decisions-log.md`** — a running log of every real instructional-design decision made across this project, with reasoning, kept for the person's own portfolio/interview use. Not learner-facing. Don't build this into the site. Keep updating it if you make further ID decisions during the build (see Section 6).
- **`build-notes-ui-and-technical.md`** — the actual build spec for UI/UX patterns that apply across the whole site (navigation, layout, content patterns). Read this in full before writing any frontend code. It documents decisions already made, not just ideas.
- **This file, `CLAUDE.md`** — you're reading it.

## 3. The site's architecture

**Top level:** one overarching idea (see Section 1), branching into three tracks:

- **Claude Chat** (8 modules) — conversational, chat-native skills
- **Cowork** (4 modules) — practice-facing (freelancers/consultants/anyone running their own work), NOT classroom-facing
- **Claude Code** (10 modules) — technical, agentic, building-focused

Full module list and order is in Section 4.

**Navigation model — this is the most important structural decision:** the course is **non-linear, choose-your-own-entry-point**. A learner can land on any single module first, with zero assumed prior knowledge from any other module. This is why every module is self-contained (states its own learning objective, doesn't reference "as covered in the last module" for anything essential).

Per `build-notes-ui-and-technical.md`, the target interaction pattern for navigation is **horizontal scroll/swipe** at two levels:
- Branch level: swiping across "Claude Chat" → "Cowork" → "Claude Code"
- Module level: swiping across modules within a branch's spine

This is documented as an idea to prototype, not yet validated in a working build. Treat it as the default direction, but flag to the person if it proves impractical. (Status update, build phase: the current implementation actually supersedes this with a zoomable compass-map navigation — see `build-notes-ui-and-technical.md` for what's actually built and why.)

## 4. Full module list, in file order

**Claude Chat**
1. `01-chat-prompting-fundamentals.md` — Prompting Fundamentals (WHO. WHAT. FORMAT. REVISE.)
2. `02-chat-iterative-refinement.md` — Iterative Refinement (FIRST DRAFT, NOT FINAL DRAFT.)
3. `03-chat-artifacts.md` — Artifacts (NOT A MESSAGE. A THING.)
4. `04-chat-file-analysis.md` — File Analysis (UPLOAD IT, DON'T RETYPE IT.)
5. `05-chat-prompt-chaining.md` — Prompt Chaining (ONE BIG ASK BECOMES A FEW SMALL ONES.)
6. `06-chat-custom-instructions.md` — Custom Instructions (SAY IT ONCE. NOT EVERY TIME.)
7. `07-chat-interview-me-prompting.md` — Interview-Me Prompting (LET IT ASK FIRST.)
8. `08-chat-claude-with-other-tools.md` — Using Claude Alongside Another Tool (KNOW THE HANDOFF BEFORE YOU START.)

**Cowork**
9. `09-cowork-connectors.md` — Connectors (CLAUDE SEES YOUR ACTUAL WORLD.)
10. `10-cowork-email-calendar.md` — Email and Calendar Management (LET IT HANDLE THE ROUTINE PART.)
11. `11-cowork-file-document-handling.md` — File and Document Handling (HAND OVER THE FOLDER, NOT THE SUMMARY.)
12. `12-cowork-multi-step-delegation.md` — Multi-Step Task Delegation (ONE INSTRUCTION, MANY STEPS.)

**Claude Code**
13. `13-code-chat-vs-code.md` — Chat vs. Code (CHAT TALKS. CODE ACTS.)
14. `14-code-auto-compact.md` — Auto-Compact (LONG SESSIONS FILL UP. COMPACT CLEARS SPACE.)
15. `15-code-goal.md` — /goal (SET THE FINISH LINE, NOT EVERY STEP.)
16. `16-code-dispatch.md` — Dispatch (YOUR PHONE BECOMES THE REMOTE.) — bridges Cowork and Claude Code, see the module's own note
17. `17-code-browser-tool.md` — The Browser Tool (CLAUDE CAN JUST LOOK.)
18. `18-code-mcps.md` — MCPs (ONE STANDARD PORT FOR EVERY TOOL.)
19. `19-code-claude-skills.md` — Claude Skills (TEACH IT ONCE. USE IT FOREVER.)
20. `20-code-canvas-api-automation.md` — Canvas API Automation (OPEN API MEANS OPEN DOOR.)
21. `21-code-apps-script-grading-pipeline.md` — The Apps Script Grading Pipeline (SMALL AND SPECIFIC BEATS BIG AND VAGUE.) — **real, lived case study, not invented**
22. `22-code-aurafitness.md` — AuraFitness (THE BIG THING IS BUILT FROM SMALL SESSIONS.) — **real, lived case study, not invented**

## 5. Locked content template — every module follows this structure

Do not deviate from this without checking with the person first; it's been deliberately iterated on and locked.

1. **Title stack:** `# AmpEd` / `*amplify your ability to educate with Claude*` (italic tagline) / `## [Branch name] → [Module title]` — no module numbers anywhere in learner-facing content, title alone is the identifier
2. **Lead-in:** explains the WHAT/HOW two-part structure, tells the learner they can enter non-linearly, states the module's specific learning objective
3. **`## 🧠 THE WHAT`** — opens with a short (2–7 word) all-caps punchy hook distilling the module's core skill, immediately followed by 1–2 sentences on why that hook is the whole point. This is followed by: a one-sentence version (blockquote), a "Core Idea" section with a plain-language explanation (not skipped in favor of jumping straight to an analogy — the idea must be stated in its own words first, analogy comes after), an **Analogy** callout, a breakdown table or list that echoes the hook's own words, and a **Quick Check** — a question the learner attempts before revealing an answer inside a collapsible `<details>` block. The revealed answer must explicitly tie back to the module's core concept, not just state a correct answer.
4. **`## 🔄 THE HOW`** — several (not a fixed count — as many as are genuinely powerful, not padded) real-feeling stories, each with its own title (no "Transfer:" label prefix), targeted at a specific audience angle stated under the title, and where possible grounded in real, documented pain-point research (marked with a `*Research note:*` italic line citing what was found, when research grounding exists — not every module has one, some are Claude-product-specific and reasoned rather than literature-grounded, and two modules are real lived case studies rather than invented stories at all).
5. **Closing:** a short "One Last Thing" bridging line connecting the module to its neighbors, followed by the hook echoed one final time in all caps — the hook bookends the module, appearing once at the open and once at the close, nowhere in between.

**Section naming is locked:** the two halves are called **THE WHAT** and **THE HOW**, in all caps, not "Knowledge/Transfer" (an earlier, rejected naming — see Decision 14 in the decisions log for why plain clarity won over a more "branded" name).

## 6. If you make instructional-design decisions during the build

Some real ID decisions will get made during implementation (e.g., how a Quick Check reveal actually animates, how the horizontal scroll degrades on a device that doesn't support touch gestures well). When that happens:

- Add a new entry to `instructional-design-decisions-log.md`, following the exact format already used there (Decision, Reasoning, Portfolio talking point). This file is for the person's job-search portfolio — treat every real design call during the build as a potential entry.
- Add any new cross-cutting UI/UX pattern to `build-notes-ui-and-technical.md` under a relevant heading, so it's documented as a standing pattern, not just embedded once in whichever module happened to need it first.

Do not add build-log or changelog content into the individual module `.md` files themselves — those stay learner-facing only, per an earlier explicit decision to separate the two.

## 7. Known open items / things not yet decided

- **Visuals are entirely deferred.** No diagrams, illustrations, or hook visuals exist yet in any module. `build-notes-ui-and-technical.md` has the full spec for what's needed (a visual per module hook, per-story visuals, and a locked visual system decided once, early, before building individual visuals) — read that section before generating any imagery.
- **Video is deferred.** The plan is text first, refine and lock it, then the person personally narrates screen-recording video afterward (own voice, not AI-cloned — see the decisions log for why). Don't build video infrastructure as a priority; text/reading experience comes first.
- **The WHAT/HOW split-view desktop layout and mobile slide-over-panel behavior** is specified in detail in `build-notes-ui-and-technical.md` — this is a real, locked interaction spec, not a vague idea, implement it as described there.
- **Storage/backend:** not yet decided in any of this planning. If persistent state (e.g., tracking which modules a learner has viewed) is wanted, that's an open question for the person, not something to assume.

## 8. Tone reminder for anything you draft or edit

The person built these modules explicitly to avoid textbook-jargon voice. Analogies should feel lived-in and specific, not generic. No em dashes anywhere (a standing personal writing preference). Keep any new copy consistent with the existing modules' register: direct, warm, a little wry, always tying back to a concrete real-world scenario rather than abstract description.
