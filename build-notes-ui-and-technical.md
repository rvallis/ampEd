# Claude Compass — Build Notes (UI, UX, and Technical)

*Cross-cutting ideas for the eventual web build, captured as they come up so they don't get lost inside individual module files. Not build tasks yet, just documented ideas to revisit when actual development starts.*

---

## Navigation

### Zoomable compass map (current implementation)
**What it is:** The compass screen opens fully zoomed out: three branches render as constellation clusters (a hub node for the branch, satellite nodes for its modules, connected by thin spokes), positioned like a triangle on a starfield. Clicking a branch hub zooms the whole map into that cluster (module nodes get labels once zoomed in). Clicking a module node triggers a full-screen color "portal" transition, a circle in the branch's accent color grows from the click point, covers the screen, the route swaps underneath, then it fades away to reveal the module page, an intentional "diving into the map" moment rather than a plain page navigation.

**Responsive behavior:** the map uses two coordinate layouts, not one shrunk down. Landscape/desktop triangulates the three branches. Portrait/mobile stacks them vertically instead, since a wide triangle wastes most of a tall narrow screen. Layout choice is driven by viewport aspect ratio (`useMapLayout` hook), not a fixed breakpoint, so it responds correctly to window resizing and device rotation.

**Why this over the original horizontal-scroll-row idea:** see Decision 16 in the instructional-design-decisions-log.md. Short version: horizontal scroll rows only reinforced "compass" through naming, not through spatial logic. Rebuilding it as a literal zoomable map makes the metaphor structural, the learner is looking at a whole territory and choosing where to go, which maps directly onto the course's non-linear, choose-your-own-entry-point design decision.

**Status:** implemented, built with framer-motion. Superseded the horizontal-scroll-row idea below (kept for the record, not the current build).

### Horizontal scroll / swipe for branch and module selection (superseded)
**Idea:** For the non-linear navigation model, prototype horizontal scroll or swipe as the primary way learners move between choices at two levels:

- **Branch level:** Swiping horizontally on "Claude Chat" slides over to "Cowork," then "Claude Code," letting a learner move between the three branches without a menu tap.
- **Module level:** Swiping horizontally on a module title, e.g. "Prompting Fundamentals," slides over to the next module in that branch's spine, same interaction pattern, one level deeper.

**Why it's worth prototyping:** using the same gesture at both levels reinforces the "compass" navigation metaphor spatially (movement, direction, choice) rather than just through naming. It also fits naturally with the choose-your-own-entry-point design decision, since horizontal scroll implies "browse and pick," not "follow a forced sequence."

**Status:** built once (working horizontal-scroll-row version existed), then replaced by the zoomable compass map above after seeing it running. The module-level prev/next arrows and swipe gesture on the module page itself are the one surviving piece of this idea, still in use there.

---

## Layout: THE WHAT / THE HOW split view

**Problem it solves:** a learner reading a HOW story often wants to jump back and re-check something specific in THE WHAT (e.g. "what did WHO actually mean again?") without losing their scroll position in the story they were reading.

**Desktop behavior (default, always on, not a toggle):** THE WHAT and THE HOW display as two independently scrollable panes side by side, like two windows on a screen, THE WHAT on the left, THE HOW on the right. Scrolling one pane does not move the other. A learner can jump to check something in THE WHAT and return to exactly where they left off in THE HOW.

**Mobile behavior (different from desktop, not the same layout shrunk down):** true side-by-side panes don't work on a narrow screen, two independently scrollable columns would both become unreadable. Instead, THE HOW slides over THE WHAT as an overlay panel, e.g. a swipe or tap brings the HOW story up as a panel on top of THE WHAT, rather than forcing two columns. THE WHAT stays underneath, scroll position preserved, ready to return to when the panel is dismissed.

**Status:** implemented as described above (desktop split, mobile slide-over panel).

### The WHAT/HOW boundary is a woven line, not a plain divider
**What it is:** the seam between the two panes (the vertical divider on desktop, the horizontal seam at the top of the mobile slide-over panel) renders as an animated two-strand braid in the branch's accent color plus a neutral ink tone, rather than a plain border line.

**Why:** see Decision 17 in instructional-design-decisions-log.md. The content model treats THE WHAT and THE HOW as one continuous skill viewed two ways, not a concept followed by unrelated examples, a plain divider visually contradicts that by reading as "two separate things." The woven motif turns the boundary itself into a reinforcement of the content relationship.

**Status:** implemented (`Braid.tsx`, SVG pattern + SMIL animation for the flowing effect).

---

## Visuals

**Status:** deferred to build phase, not the markdown-drafting phase. Text-stage modules (like `01-chat-prompting-fundamentals.md`) currently have structure (tables, emoji markers, callouts) but no actual visuals, diagrams, or illustrations, since markdown is a text-first medium with no natural home for real graphics.

**What's needed once build phase starts:**
- A visual for each module's core "hook" concept (e.g. WHO. WHAT. FORMAT. REVISE. as a simple diagram or icon set), since the hook is the most reusable and highest-value image per module
- Supporting visuals for individual HOW stories, one per story is a reasonable default, adjustable per story's actual need (consistent with the "as many transfers as are powerful, not a fixed count" principle already locked for story count)
- Decide overall visual style/system before building any individual visuals, so all twenty-plus modules feel like one cohesive course rather than a mismatched set. This should happen once, early in build phase, not module by module.

**Why deferred rather than built now:** building visuals module-by-module in markdown risks locking in a style before a cohesive visual system exists, and duplicates effort once the real web build starts, since markdown-embedded visuals wouldn't carry over cleanly to the final build environment anyway.

---

## Content Patterns (standing rules for every module)

**Section naming:** the two halves of every module are called **THE WHAT** (the skill itself) and **THE HOW** (the real-world stories showing that skill applied), in all caps. Earlier drafts used "The Knowledge" and "The Knowledge Transfer," but "transfer" is instructional-design jargon that isn't self-explanatory to a first-time visitor and creates friction ("why is it called that?") in a course built for fast, self-directed entry. WHAT and HOW are the two questions a learner is already asking themselves, no translation needed. Individual story titles under THE HOW carry no label prefix either, just plain, punchy titles (e.g. "The Quiz Nobody Could Use").

**The hook:** every WHAT section opens with a short, all-caps, punchy header distilling the module's core skill into 2–5 words (e.g. WHO. WHAT. FORMAT. REVISE. for the Prompting Fundamentals module), immediately followed by 1–2 sentences explaining why that hook is the whole point of the module. The same hook reappears woven into any breakdown table or list later in the section, and gets echoed one final time at the module's close, bookending the whole module rather than appearing once and getting forgotten.

**Quick Check reveal:** every Quick Check poses a question and asks the learner to attempt an answer before revealing one. A sample strong answer follows immediately after, inside a collapsible element so the learner has to consciously choose to reveal it rather than seeing it automatically (protects the retrieval-practice effect). The answer doesn't just give the correct response, it explicitly names which parts of the module's core concept the answer demonstrates, so the reveal reinforces the lesson a second time.

---

*Add new cross-cutting build ideas below as they come up.*
