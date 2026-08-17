# Claude Compass
## Claude Code
### Auto-Compact

---

Every module in Claude Compass has two parts: **THE WHAT** (the actual Claude skill) and **THE HOW** (real stories showing that skill solving a specific, recognizable problem). Pick whichever story feels closest to your own life. You don't need to read them in order, and you don't need to read every module in this course in order either. Start wherever you are.

**By the end of this module, you'll be able to:** recognize when a long Claude Code session is getting overloaded, and know what auto-compact does about it.

---

## 🧠 THE WHAT

# LONG SESSIONS FILL UP. COMPACT CLEARS SPACE.

Six words. A Claude Code session has a limited amount of working memory, called a context window. As it fills, quality can degrade, and compacting the conversation clears space to keep working well.

### The One-Sentence Version

> Once a session's context window climbs past about half full, response quality can start to slip, and compacting, either automatically or with `/compact`, is how you clear space without losing the thread entirely.

### The Core Idea

Every Claude Code session has a limited amount of space for everything it's holding in mind at once, your instructions, the files it's read, its own past responses. That's the context window. As a long session runs, that space fills up, and once it climbs past roughly half full, Claude's thinking quality can start to degrade, since it's juggling more than is ideal.

Compacting compresses the conversation, keeping the important parts while freeing up room, so the session can keep going without losing track of what's happened so far. This can happen automatically as the window fills, or you can trigger it yourself with `/compact` when you notice things slowing down or a session growing long.

**Analogy:** think of a desk that's been piling up with papers all week. At some point it's not that you've lost anything, it's that finding what you actually need takes longer and you're more likely to make a mistake with all the clutter around. Tidying the desk, keeping what matters, clearing the rest, isn't starting over, it's making the same information easier to actually work with.

### When to Notice This Matters

| Signal | What to do |
|---|---|
| A session has been running a long time with lots of back-and-forth | Keep an eye on context usage, it's likely climbing |
| Responses start feeling slower or less sharp | This can be a sign the context window is getting full |
| You're past the halfway point of a long session | Consider compacting proactively rather than waiting for a problem |

### Quick Check

You're deep into a long Claude Code session, several hours of building and iterating, and notice responses starting to feel a little off. What's a reasonable next move?

<details>
<summary><strong>See a strong answer</strong></summary>

> Check your context usage and consider compacting, either letting auto-compact handle it or running `/compact` yourself. This is a well-known pattern: as a session's context window fills, especially past the halfway point, response quality can genuinely degrade, and compacting is the standard fix, not a sign something's broken.

The key insight is that this isn't a bug to work around, it's expected behavior in any long session, and knowing to watch for it is the actual skill.

</details>

---

## 🔄 THE HOW

---

### "Noticing the Slowdown Before It Became a Real Problem"
**For anyone running long, multi-hour build sessions**

Someone deep into building a full application over a multi-hour Claude Code session started noticing responses feeling a little less sharp partway through the afternoon, small inconsistencies that hadn't shown up earlier. Checking context usage confirmed the session had climbed well past half full. Compacting cleared things up, and the rest of the session ran the way the morning had.

**Nothing had gone wrong. A long session filling its context window is expected, and knowing the signal meant catching it early instead of fighting confusing output for an hour.**

*Research note: context window degradation past roughly the halfway mark, and `/compact` as the standard response, is documented, specific guidance from people who work in Claude Code regularly, not a workaround discovered by accident.*

---

### "Building the Habit of Checking In, Not Just Reacting"
**For anyone new to long agentic sessions**

Someone new to running long Claude Code sessions used to just push through when things started feeling off, assuming it was normal friction. Learning to actually check context usage as a habit, the way you'd glance at a fuel gauge on a long drive rather than waiting for the car to sputter, changed how she worked. Proactive compacting before a real problem, rather than reactive compacting after one, became the default.

**The tool was never the issue. Not knowing to check the gauge was.**

---

### One Last Thing

This is a small, quiet piece of Claude Code fluency, but it matters more the longer and more ambitious your sessions get. A quick unit script rarely runs long enough to need this. A full application build, over hours, almost always will.

# LONG SESSIONS FILL UP. COMPACT CLEARS SPACE.
