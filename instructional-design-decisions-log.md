# Claude Compass — Instructional Design Decisions Log

*A running record of the instructional design decisions made while building this course, and the reasoning behind each one. Kept for portfolio use, interview talking points, and design-rationale documentation.*

**How to use this file:** every time a real ID decision gets made, it gets logged here with the decision, the reasoning, and the date. This is not a build log or a task list, it's specifically the *thinking*, the kind of thing a hiring manager or client would want to hear you explain out loud.

---

## Decision 1: Tool selection — Custom web build over Rise 360 or Moodle
**Decision:** Build the portfolio piece as a custom web application (via Claude Code) rather than in Articulate Rise 360 or Moodle.
**Reasoning:** The original plan was Rise 360, since it's a named tool in target job postings and shows hand-built design craft. But that choice optimized for proving a generic, widely-held skill (manual authoring in an industry-standard tool) rather than the actual differentiator: the ability to direct AI to design and build sophisticated learning experiences quickly. A custom build is the only format that can demonstrate the "AI-directed course developer" positioning directly, since the artifact itself is the proof, not just its content.
**Portfolio talking point:** "I chose not to build in the expected authoring tool because the medium needed to prove the skill, not just contain it."

---

## Decision 2: Course architecture — Three parallel tiers, not one linear course (general AI literacy course)
**Decision:** Structure the general AI literacy course as three separate, sequential courses (Beginner / Intermediate / Advanced) gated by skill level rather than age or grade, instead of one long course with internal sections.
**Reasoning:** Skill-based gating (via Course Requisites) allows the same course to serve wildly different audiences, a first-time AI user and a confident daily user, without forcing either through irrelevant content. Age/grade-based structuring would have falsely assumed skill level correlates with age.

---

## Decision 3: Positioning — Naming a role that doesn't fully exist yet ("AI-Directed Course Developer")
**Decision:** Reject the "Instructional Designer" label as the primary self-positioning and instead define a hybrid role combining 17 years of pedagogy/ID experience with AI-directed technical build capability.
**Reasoning:** Traditional instructional designer roles assume either manual authoring-tool fluency or separate developer support. Neither market segment (traditional ID, or developer) fully captures someone who does both simultaneously. Naming the intersection directly, rather than trying to fit into an existing job title, is more honest positioning and differentiates against both traditional IDs (who can't build/automate) and developers (who lack pedagogy expertise).

---

## Decision 4: Structural model — Spine-and-branch (core + contextual application), not flat module list
**Decision:** Structure each Claude skill as a "spine" (the core, universal skill) with a "branch" growing off it (contextual, audience-specific application), rather than a flat list of topics.
**Reasoning:** This allows one piece of core content to serve multiple audiences (educators, business managers, healthcare trainers) without diluting or duplicating the underlying material. It's a direct application of differentiated instruction, the same principle used in a classroom to serve multiple ability levels from one lesson, applied to instructional content design itself.
**Portfolio talking point:** "I designed the architecture as differentiated instruction applied to the course design process, not just the classroom."

---

## Decision 5: Terminology — "Knowledge Transfer" over "Instructional Application"
**Decision:** Name the contextual-application layer "Knowledge Transfer" rather than the initially-proposed "Instructional Application."
**Reasoning:** "Instructional" reads as education-sector jargon and would alienate or confuse a non-education audience (business managers, healthcare trainers). "Knowledge Transfer" is a term already used in corporate L&D and healthcare education, is field-agnostic, and, critically, the two halves of the term map directly onto the two halves of the module itself: the skill is the "knowledge," the contextual story is the "transfer." The name became a direct restatement of the module's actual mechanism, not just a label.

---

## Decision 6: Audience scope — Broadened from "educators" to "anyone who teaches, trains, or onboards someone else"
**Decision:** Widen the target audience beyond K-12 educators to include any role involving teaching, training, or onboarding, e.g., a doctor training a resident, a manager training a new hire.
**Reasoning:** The underlying skill (directing Claude effectively) is genuinely transferable across all these contexts, and narrowing to "educator" would have undersold the course's real market and made a strong corporate/L&D positioning impossible. Broadening the audience also strengthens each transfer story, since a skill proven to transfer across wildly different fields is more credible than one shown only within a single field.

---

## Decision 7: Navigation model — Non-linear, choose-your-own-entry-point
**Decision:** Design the course so learners can enter at any module via a top-level branch selection (Chat / Cowork / Claude Code), rather than requiring sequential progression through all content.
**Reasoning:** Given the range of entry-level familiarity across the target audience (someone brand-new to Claude vs. someone already using Claude Code), forcing linear progression would waste the time of more advanced learners and gatekeep content behind irrelevant prerequisites. This decision has a direct downstream design consequence: every module must be fully self-contained and assume zero prior knowledge from other modules, since a learner could land on any module first.

---

## Decision 8: Content depth model — Multiple transfer stories per module, count determined by quality/relevance, not a fixed number
**Decision:** Rather than requiring a fixed number of transfer stories per module (e.g., always exactly four), the number varies by module and is determined by how many genuinely distinct, high-value real-world applications exist for that specific skill.
**Reasoning:** A fixed quota risks either padding modules with weak, redundant examples to hit the number, or artificially constraining modules that have more genuinely valuable use cases. Letting content depth follow actual value, rather than a template requirement, is a more defensible, higher-quality design choice, and one explicitly informed by research into real, documented pain points rather than invented scenarios.

---

## Decision 9: Research-grounded content — Transfer stories vetted against real, documented pain points
**Decision:** Before writing transfer stories, research actual, documented frustrations and mistakes people experience in the relevant field (e.g., searching for common teacher complaints about AI prompting, or common business mistakes with AI tools), and ground stories in those verified patterns rather than purely inventing plausible-sounding scenarios.
**Reasoning:** Grounding fictional-but-realistic stories in verified, real-world pain points increases both the credibility and the actual instructional value of each story, a story addressing a genuinely common, documented mistake teaches more effectively than a story addressing an imagined one. This also strengthens the course's own credibility as a portfolio artifact: the design process itself is evidence-based.

---

## Decision 10: Source transparency — Distinguishing real/lived stories from invented-but-plausible ones (Claude Code branch)
**Decision:** For the Claude Code branch specifically, since it mixes real, lived project stories (e.g., the AuraFitness build, the Canvas API grading automation) with invented-but-plausible ones, the two types will be clearly distinguished rather than presented as uniformly autobiographical.
**Reasoning:** Credibility is central to what this course sells (a real practitioner teaching real skills). Blurring real and invented stories without distinction would risk misrepresenting lived experience, a integrity issue worth designing around deliberately rather than discovering after the fact.

---

## Decision 11: Repeatable content pattern — The "hook" device (e.g., "WHO. WHAT. FORMAT. REVISE.")
**Decision:** Every Knowledge section opens with a short, all-caps, memorable hook (2–5 words) distilling the module's core skill, ties that hook explicitly into the section's opening explanation, echoes it again in any breakdown table/list, and closes the module by restating it one final time.
**Reasoning:** A short, repeatable mnemonic device increases retention and recall for a learner who may only remember one thing from a module days later. Bookending the module (hook at open, hook at close) reinforces the takeaway rather than letting it appear once and get lost in surrounding prose. This is a deliberate, repeatable content pattern applied consistently across all modules, not a one-off stylistic choice.

---

## Decision 12: Self-check placement — Lightweight formative check before transfer stories, not a graded quiz
**Decision:** Add a brief, ungraded self-check (a single applied prompt-rewriting task) between the Knowledge section and the Transfer section of each module, rather than a formal quiz or no check at all.
**Reasoning:** Purely passive reading with no interaction point is weaker instructional design than content with at least one moment requiring active application, even a lightweight one. A formal graded quiz would be excessive for a short module and inconsistent with the course's low-friction, self-directed navigation model.

---

## Decision 13: Quick Check answer reveal — Collapsible, not immediately visible
**Decision:** Every module's Quick Check presents a question and asks the learner to attempt an answer, then reveals a sample strong answer inside a collapsible element the learner has to actively click to open, rather than printing the answer directly beneath the question.
**Reasoning:** If the answer is visible immediately, most learners' eyes drift to it before genuinely attempting the question themselves, which defeats the purpose of the check. Requiring a small deliberate action to reveal the answer protects the "retrieval attempt," a well-established learning-science principle where struggling to produce an answer before seeing it, even briefly, improves retention far more than passively reading a worked example. The reveal itself was also designed to do double duty: rather than simply confirming correct or incorrect, the sample answer explicitly names which parts of the module's core concept it demonstrates, so the reveal reinforces the lesson a second time instead of just closing the loop on right vs. wrong.
**Portfolio talking point:** "I used a collapsible reveal instead of a visible answer specifically to preserve the retrieval-practice effect, learners had to attempt the question honestly before the answer could reinforce it."

---

## Decision 14: Section naming, final — "THE WHAT" and "THE HOW," not "The Knowledge Transfer"
**Decision:** After live-testing "The Knowledge Transfer" as a section name, changed the two module section headers to **THE WHAT** (the skill itself) and **THE HOW** (real-world stories showing that skill applied), both in all caps.
**Reasoning:** "The Knowledge Transfer" was originally chosen because it named the section's own mechanism, but on reflection it's instructional-design jargon: a first-time visitor has no reason to already know what "transfer" means in this context, and hitting an unfamiliar term creates a moment of friction ("why is it called that?") in a course specifically designed for fast, self-directed, choose-your-own-entry use. WHAT and HOW are the two questions a learner is already silently asking, so the names require no translation and no prior context. This is a direct example of prioritizing plain clarity over a more "branded" or clever name, when the two are in tension, clarity should win for a course built on frictionless entry.
**Portfolio talking point:** "I initially chose a name that described its own mechanism, but user-testing my own reaction to it showed the word itself created friction. I replaced it with the two questions a learner is already asking, which is a clearer design even though it's less distinctive."

---

## Decision 15: Full-course draft in one sprint, on a deadline, as a deliberate exception
**Decision:** Departed from the "one module at a time, slowly" build philosophy to draft all 22 remaining modules in a single working session, ahead of a hard deadline for starting the Rise-to-custom-build transition in Claude Code the next day.
**Reasoning:** The slow, one-at-a-time approach was chosen specifically because writing each module doubles as personal learning of the underlying Claude skill. That reasoning holds under normal circumstances, but a genuine external deadline changes the calculus: having complete, locked text ready meant the actual build session could be pure execution, no drafting decisions competing for attention with implementation decisions. This was treated as a deliberate, temporary exception to a standing rule, not an abandonment of it, the rule resumes for any future content work without a comparable deadline.
**Portfolio talking point:** "I set a deliberate, personalized pace for this project because writing was part of how I was learning the material, but I could recognize when a real deadline justified a temporary exception, and executed a full-scope sprint without losing the format consistency or research rigor established in the pilot module."

---

*Log will continue to be updated as new instructional design decisions are made throughout the build.*
