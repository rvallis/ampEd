# Handoff: AmpEd project, for Upwork profile / cover letter writing

*Paste this into a session helping write Upwork profile copy or job cover letters. It's project material, not learner-facing content — pull whatever's useful, don't quote it verbatim as if it were already-polished copy.*

---

## The one-line version

Built AmpEd, a fully custom web application teaching people how to direct Claude, entirely through AI-directed development in Claude Code — not a template, not a no-code tool, a real React/TypeScript app with a novel zoomable-map navigation system, designed and debugged through live iteration.

## Who this is for (background context for the writer)

17 years as a public school educator, now doing freelance instructional design work directed through Claude and Claude Code. The positioning is a hybrid that doesn't have an existing job title: deep pedagogy and domain expertise *combined with* the ability to direct AI to build sophisticated, real, working software — not a traditional instructional designer (who'd hand this off to a developer), and not a traditional developer (who lacks the pedagogy). AmpEd is the flagship proof of that combination: the medium itself (a custom-built app, not an off-the-shelf authoring tool) is part of the argument, not just the content inside it.

## What AmpEd actually is

A non-linear course teaching Claude skills to anyone who has to teach, train, onboard, or coach someone else — not just K-12 teachers, also a manager training a new hire, a freelancer training a client. 22 modules across three tracks (Claude Chat, Cowork, Claude Code), each following a locked instructional template (a "WHAT" skill section and a "HOW" real-world-story section). Built as a real web app because the *build itself* needed to demonstrate the AI-directed-builder skill, not just describe it.

**Live site:** https://amped-eta.vercel.app
**Repo (public):** https://github.com/rvallis/ampEd

## The strongest, most specific proof points

Use these over generic "I used AI to build a website" framing — they show judgment and real troubleshooting, not just execution:

- **Directed a live redesign after seeing the first version working, not before.** The navigation started as a conventional horizontal-scrolling card UI (a reasonable, literal build of the original spec). After seeing it running, recognized it wasn't actually earning its "compass" concept — it just reordered cards. Directed a full rebuild into a literal zoomable star-map (three branches as constellations, click to zoom, click a module to dive in with a full-screen transition). That's a design judgment call made from a working prototype, the kind of iteration a real product process requires, not a one-shot AI generation.
- **Found and fixed two genuine production bugs during deployment**, not aesthetic tweaks: (1) the site's content pipeline silently returned zero parsed modules in production because the deploy method wasn't giving the build access to the source content files — diagnosed and fixed by switching to a git-integrated deployment; (2) direct links into the app 404'd because a single-page React app needs an explicit server rewrite rule, which was missing — added and verified. Both are real "why is production broken when it worked locally" debugging, the kind of thing that separates someone directing a build from someone just prompting for a demo.
- **Iterated the UI through several rounds of specific, directed critique** — removing a cluttered instructional header, redesigning hover interactions, correcting a text-transform math bug that caused off-screen clipping when zooming, moving a hyperspace-style click animation from "centered on the cursor" (called out as looking like an accidental explosion) to "confined to the screen's outer edge" on request. Each round was reviewed live in a real browser and corrected against actual on-screen feedback, not accepted sight-unseen.
- **Designed real information architecture**, not just visuals: a content pipeline that parses 22 independently-authored markdown files (with natural inconsistencies — different section counts, optional research citations, two modules that are real case studies instead of invented stories) into one consistent typed data model, without forcing every file into a rigid template that would have broken on the exceptions.
- **Full ownership of the deployment pipeline**: initialized git, set up GitHub via secure device-code OAuth (no credentials ever exposed), configured a public repo with commit identity scrubbed of personal email, connected it to Vercel, and diagnosed a monorepo root-directory / build-context issue that a copy-paste deploy guide wouldn't have caught.

## Tech stack (for keyword-matching against job posts)

React, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router, Vercel (CI/CD, git-integrated deploys), GitHub, Node.js build tooling, custom SVG/animation work, content-driven architecture (markdown-to-structured-data pipeline).

## Tone notes for the writer

The person's own writing voice (used throughout the actual course content) is direct, warm, a little wry, allergic to textbook-jargon and generic AI-positioning language, and never uses em dashes. Cover letters and profile copy should sound like a specific person who has actually built a specific thing, not a template.
