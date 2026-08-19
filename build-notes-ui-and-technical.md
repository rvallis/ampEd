# AmpEd — Build Notes (UI, UX, and Technical)

*Cross-cutting ideas for the eventual web build, captured as they come up so they don't get lost inside individual module files. Not build tasks yet, just documented ideas to revisit when actual development starts.*

---

## Navigation

### Horizontal scroll / swipe for branch and module selection
**Idea:** For the non-linear navigation model, prototype horizontal scroll or swipe as the primary way learners move between choices at two levels:

- **Branch level:** Swiping horizontally on "Claude Chat" slides over to "Cowork," then "Claude Code," letting a learner move between the three branches without a menu tap.
- **Module level:** Swiping horizontally on a module title, e.g. "Prompting Fundamentals," slides over to the next module in that branch's spine, same interaction pattern, one level deeper.

**Why it's worth prototyping:** using the same gesture at both levels reinforces the "compass" navigation metaphor spatially (movement, direction, choice) rather than just through naming. It also fits naturally with the choose-your-own-entry-point design decision, since horizontal scroll implies "browse and pick," not "follow a forced sequence."

**Status:** idea only, not a text/markdown-stage concern. Revisit once the actual web/app build begins.

---

### Portrait map: top clearance for the overlaid headline

**What it is:** on the compass map's portrait/mobile layout (`PORTRAIT_LAYOUT` in `mapLayout.ts`), the three branch anchors sit 26 viewBox units lower than a bare even three-way vertical split would place them, and the layout's total height grows by the same amount to keep the spacing between clusters unchanged. Cowork and Claude Code shift down by the same 26 units as Chat, so the whole stack moves as a block rather than compressing.

**Why:** the headline ("Amplify Your Ability to Educate" on the overview, the zoomed branch name in that same slot) is an absolutely-positioned overlay on top of the map, not part of the SVG's own coordinate space. On a narrow phone screen the headline wraps to two lines and, without this offset, its text runs directly through the Claude Chat cluster's topmost node and spoke — first reported as a real overlap on a live phone screenshot, not a hypothetical.

**Standing rule:** any future change to the portrait layout's vertical rhythm (adding a fourth branch, rebalancing ring radii, etc.) needs to keep this top offset, or re-verify against a real narrow-screen screenshot that the topmost node of the first cluster still clears the two-line headline zone.

**Status:** implemented (`app/src/content/mapLayout.ts`, `PORTRAIT_LAYOUT`). Landscape layout is unaffected — the headline sits well clear of the triangulated desktop layout already.

---

### Zoomed branch view: module labels running off the screen edge

**What it is:** when a branch is zoomed into on a narrow phone, all of that branch's module labels are visible at once (not just one on hover), and the ones pointing closest to due left or right were running off the edge of the screen — reported from a live phone screenshot on Claude Code, Claude Chat, and Cowork alike. Two changes fixed it: the zoom-in scale dropped from 1.9x to 1.5x (`ZOOM` in `Home.tsx`), and zoomed-in label truncation became angle-aware instead of a flat character count.

**Why angle-aware, not just a shorter flat limit:** a node pointing straight up or down from its branch hub has much more horizontal room for its label than one pointing straight out sideways, which already spends most of the available width just reaching its own position. A flat character cap has to be conservative enough for the worst-angle node, which needlessly chops labels that had room to spare (confirmed while testing: a blanket 16-character cap was still clipping "Interview-Me Prompting" at an almost-due-left angle while needlessly truncating "Prompting Fundamentals," which points nearly straight up and had plenty of room). `zoomedLabelBudget()` in `Home.tsx` instead computes, per node, how much of the zoomed-in visible width is left after that node's own radial distance, and sizes the truncation to that.

**How it was verified:** this one was checked against a real render, not eyeballed from the numbers. With dependencies installed and a Vite dev server running locally, Playwright (pointed at this environment's pre-installed Chromium at `/opt/pw-browsers/chromium`) drove a real browser to zoom into each of the three branches at a phone viewport and read every label's actual `getBoundingClientRect()` against the viewport edges — an objective clip check, not a visual guess. All three branches came back clean at `ZOOM = 1.5`. Two earlier fix attempts on this same class of problem (the headline twinkle) went through multiple rounds of guessing at CSS math with no way to see the result; this is the harder-won lesson from that — when a fix depends on real layout/rendering behavior, render it and measure before shipping if there's any way to do so.

**Standing rule:** if the module count for any branch grows, or ring radii change again, re-run this same check (spin up `npm run dev`, screenshot or measure `getBoundingClientRect()` for each zoomed branch's labels at a narrow phone width) rather than re-deriving the geometry by hand.

**Status:** implemented (`app/src/pages/Home.tsx`: `ZOOM`, `zoomedLabelBudget()`).

---

## Layout: THE WHAT / THE HOW split view

**Problem it solves:** a learner reading a HOW story often wants to jump back and re-check something specific in THE WHAT (e.g. "what did WHO actually mean again?") without losing their scroll position in the story they were reading.

**Desktop behavior (default, always on, not a toggle):** THE WHAT and THE HOW display as two independently scrollable panes side by side, like two windows on a screen, THE WHAT on the left, THE HOW on the right. Scrolling one pane does not move the other. A learner can jump to check something in THE WHAT and return to exactly where they left off in THE HOW.

**Mobile behavior (different from desktop, not the same layout shrunk down):** true side-by-side panes don't work on a narrow screen, two independently scrollable columns would both become unreadable. Instead, THE HOW slides over THE WHAT as an overlay panel, e.g. a swipe or tap brings the HOW story up as a panel on top of THE WHAT, rather than forcing two columns. THE WHAT stays underneath, scroll position preserved, ready to return to when the panel is dismissed.

**Status:** implemented and live (desktop split, mobile slide-over panel), plus the woven-braid boundary treatment below.

---

## Visuals

**Status:** deferred to build phase, not the markdown-drafting phase. Text-stage modules (like `01-chat-prompting-fundamentals.md`) currently have structure (tables, emoji markers, callouts) but no actual visuals, diagrams, or illustrations, since markdown is a text-first medium with no natural home for real graphics.

**What's needed once build phase starts:**
- A visual for each module's core "hook" concept (e.g. WHO. WHAT. FORMAT. REVISE. as a simple diagram or icon set), since the hook is the most reusable and highest-value image per module
- Supporting visuals for individual HOW stories, one per story is a reasonable default, adjustable per story's actual need (consistent with the "as many transfers as are powerful, not a fixed count" principle already locked for story count)
- Decide overall visual style/system before building any individual visuals, so all twenty-plus modules feel like one cohesive course rather than a mismatched set. This should happen once, early in build phase, not module by module.

**Why deferred rather than built now:** building visuals module-by-module in markdown risks locking in a style before a cohesive visual system exists, and duplicates effort once the real web build starts, since markdown-embedded visuals wouldn't carry over cleanly to the final build environment anyway.

---

## Compass map background: galaxy band

**What it is:** a soft, diagonal galaxy-band glow sits behind the compass map's existing dot starfield (`Galaxy.tsx`, rendered under `Starfield.tsx` in `Home.tsx`) — a warm gold/amber core fading through dusty rose to cool blue-violet at the edges, suggesting the Milky Way band the person referenced as a visual target, without being a literal reproduction of it.

**Built procedurally, not as an image:** it's a single `div` styled entirely with layered CSS gradients (`.galaxy-band` in `index.css`) — a wide blurred `linear-gradient` stripe for the band itself plus a soft `radial-gradient` bulge to thicken the core, no image asset. This was a deliberate choice over using an actual photo: the rest of the map (dot starfield, constellation icons) is entirely code-generated, so a photographic background would both add real page weight and be a style departure from that established abstract, hand-drawn identity. Matches Starfield.tsx's own "cheap, deterministic, no images" approach.

**Theme-aware, not just color-swapped:** light and dark mode need genuinely different treatment, not the same gradient with different hex values. Dark mode blends the band onto near-black paper with `mix-blend-mode: screen`, so it actually glows the way a real night-sky photo does. Light mode uses `multiply` at much lower opacity against the cream paper, since `screen` would just wash out and disappear on a bright background — same gradient shape, tuned per-theme via the existing `--galaxy-*` CSS custom properties (same pattern as `--ink`/`--paper`/the branch accent colors, overridden under the existing `prefers-color-scheme: dark` block).

**Scope:** compass map only (`Home.tsx`), matching where the dot starfield already lives — module reading pages don't have a starfield today either, so this doesn't extend that boundary.

**How it was checked:** rendered and screenshotted via the same local dev-server-plus-Playwright setup as the zoomed-label-clipping fix above, in both light and dark, and at both a phone and a desktop viewport (the band's cool edge only becomes visible on the wider desktop crop — worth checking both when touching this again).

**Status:** implemented (`app/src/components/Galaxy.tsx`, `.galaxy-band` and `--galaxy-*` custom properties in `index.css`).

---

## Content Patterns (standing rules for every module)

**Section naming:** the two halves of every module are called **THE WHAT** (the skill itself) and **THE HOW** (the real-world stories showing that skill applied), in all caps. Earlier drafts used "The Knowledge" and "The Knowledge Transfer," but "transfer" is instructional-design jargon that isn't self-explanatory to a first-time visitor and creates friction ("why is it called that?") in a course built for fast, self-directed entry. WHAT and HOW are the two questions a learner is already asking themselves, no translation needed. Individual story titles under THE HOW carry no label prefix either, just plain, punchy titles (e.g. "The Quiz Nobody Could Use").

**The hook:** every WHAT section opens with a short, all-caps, punchy header distilling the module's core skill into 2–5 words (e.g. WHO. WHAT. FORMAT. REVISE. for the Prompting Fundamentals module), immediately followed by 1–2 sentences explaining why that hook is the whole point of the module. The same hook reappears woven into any breakdown table or list later in the section, and gets echoed one final time at the module's close, bookending the whole module rather than appearing once and getting forgotten.

**Quick Check reveal:** every Quick Check poses a question and asks the learner to attempt an answer before revealing one. A sample strong answer follows immediately after, inside a collapsible element so the learner has to consciously choose to reveal it rather than seeing it automatically (protects the retrieval-practice effect). The answer doesn't just give the correct response, it explicitly names which parts of the module's core concept the answer demonstrates, so the reveal reinforces the lesson a second time.

---

## Icon language: constellation stars, not emoji or plain glyphs

**What it is:** every icon-sized interactive control on the compass map and module page is drawn from a small number of twinkling star points connected by thin faint lines, tracing the shape of whatever it represents, rather than using an emoji or a plain SVG glyph. Currently: the prev/next module arrows (`ConstellationArrow.tsx`, three points forming a chevron), and the home/back button (`ConstellationHouse.tsx`, five points tracing a house outline). Both share the same 8-point sparkle path and the same per-point staggered opacity twinkle.

**Why:** it's the one piece of visual identity that ties every interactive chrome element back to the starfield/compass theme, rather than having navigation controls feel like generic UI bolted onto a themed background. It's also a direct, deliberate rejection of using an actual home/arrow emoji for these two specific controls, after the person asked for the change explicitly.

**Standing rule:** if a new small icon-sized control gets added later (not full illustrations, this doesn't apply to the deferred visuals system in the Visuals section below), default to this same technique for consistency rather than reaching for an emoji or a stock icon set.

**Status:** implemented (`app/src/components/ConstellationArrow.tsx`, `ConstellationHouse.tsx`).

---

## Hub hover pulse

**What it is:** in the compass map's overview state, hovering a branch's hub (the central dot, e.g. Claude Chat's) makes the branch name text pulse in the same gentle rhythm the hub dot already always pulses in ambiently (scale 1 → 1.12 → 1, 3s loop). The text is otherwise static.

**How it's built:** framer-motion's `whileHover` on the wrapping `<motion.g>` combined with a `variants` prop on the child `<motion.text>` (parent gesture drives a named variant on the child), not hand-rolled hover state. This is the idiomatic framer-motion pattern for "hovering element A should animate element B" and is more reliable than manual `onMouseEnter`/`onMouseLeave` + conditional `animate` props.

**Status:** implemented, overview state only (the name isn't rendered at the hub once a branch is zoomed in — see the zoomed-branch-name-relocates note above).

---

## Hyperspace / light-speed click effect — tried, removed

Multiple approaches were built and iterated on for a sci-fi "hyperspace jump" flash on every branch/module click: a synthetic streak-burst centered on the click point, then confined to the screen's outer edge, then rebuilt as a dense full-screen radial convergence from center, then rebuilt again to stretch the actual background starfield stars themselves instead of a separate overlay. All were removed entirely at the person's request ("it just doesn't look good"). **Don't re-add any version of this without the person explicitly asking again** — it was tried thoroughly, not overlooked.

---

*Add new cross-cutting build ideas below as they come up.*
