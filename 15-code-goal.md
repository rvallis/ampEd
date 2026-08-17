# Claude Compass
## Claude Code
### /goal

---

Every module in Claude Compass has two parts: **THE WHAT** (the actual Claude skill) and **THE HOW** (real stories showing that skill solving a specific, recognizable problem). Pick whichever story feels closest to your own life. You don't need to read them in order, and you don't need to read every module in this course in order either. Start wherever you are.

**By the end of this module, you'll be able to:** set a condition for Claude Code to work toward on its own, and understand exactly what it does and doesn't guarantee about stopping.

---

## 🧠 THE WHAT

# SET THE FINISH LINE, NOT EVERY STEP.

Seven words. `/goal` lets you describe a completion condition, then Claude Code keeps working, turn after turn, until a separate check confirms that condition is actually met.

### The One-Sentence Version

> Instead of prompting Claude Code step by step, you describe what "done" looks like once, and it keeps working toward that condition on its own, checking after every turn whether it's actually there yet.

### The Core Idea

`/goal` sets a completion condition, and after each turn, a separate fast check evaluates whether that condition holds. If not, Claude Code keeps going, another turn, another check, until the condition is genuinely met, at which point it stops automatically and hands control back to you.

**The one thing worth knowing before you rely on this:** there is no hard, built-in spending cap on a goal session. This isn't a minor footnote, it's the single most important caution about the feature. A loose or vague completion condition can drive far more turns than you expect, quietly, before you notice. The real safeguard is writing your own limit directly into the condition itself, something like "or stop after 20 turns and report what remains," rather than assuming the system will stop you automatically.

**Analogy:** think of the difference between giving someone a task with a clear deadline you've set yourself, "work on this until 5pm, then report back regardless of where you are," versus giving them an open-ended task and just trusting them to know when to stop. The first has a real, built-in brake. The second relies entirely on their own judgment about when "done enough" has been reached, which is exactly why a self-imposed stop condition matters here.

### The One Real Caution

| What people assume | What's actually true |
|---|---|
| "It'll stop automatically once it's spent enough" | There's no automatic spending cap, watch your token usage yourself |
| "The stop condition is a hard guarantee" | It's a soft, self-reported check, a separate model judges it each turn |
| "I don't need to write in a limit" | Writing an explicit limit into the condition itself is the actual safeguard |

### Quick Check

You want to set a `/goal` for a long refactoring task but you're worried about it running away with your token budget. What should you actually do?

<details>
<summary><strong>See a strong answer</strong></summary>

> Write an explicit limit directly into the goal condition itself, something like "refactor this module, or stop after 25 turns and report what's left." Don't rely on the system to cap spending automatically, since there is no built-in hard cap, the stop condition is judged turn by turn by a separate model, and a loose condition can run much longer than expected.

The mistake to avoid is treating `/goal` like it has guardrails it doesn't actually have. The guardrail is the one you write yourself.

</details>

---

## 🔄 THE HOW

---

### "The Session That Ran Longer Than Expected, and the Fix"
**For anyone directing longer, more autonomous Claude Code tasks**

Someone set a `/goal` for a cleanup task with a vague condition, essentially "keep going until this is fully fixed," and came back to find it had run through far more turns than expected, since "fully fixed" turned out to be a much fuzzier bar than intended. The fix on the next attempt was writing the condition more precisely, with an explicit turn limit built directly into it. The tool hadn't changed. The clarity of the instruction had.

**This is exactly the caution worth internalizing early: `/goal` will keep going until its own evaluator is satisfied, and if that bar isn't tightly defined, "satisfied" can take a while to arrive.**

*Research note: the absence of a native, automatic spending or turn cap on `/goal` sessions is explicitly documented as the primary risk of the feature, with writing an explicit stop condition into the goal text itself named as the standard mitigation.*

---

### "Setting the Finish Line the Way You'd Brief a Long-Term Sub"
**For teachers thinking about management, or managers thinking about teaching**

Someone comfortable directing long-running work compares `/goal` to leaving detailed plans for a long-term substitute covering an extended absence: you don't just say "keep the class going until it feels done," you say specifically what needs to be covered and by when, because an open-ended instruction to someone working independently, human or AI, tends to run longer and looser than a tightly scoped one.

**Autonomy without a clear boundary isn't really delegation. It's just hoping for the best.**

---

### One Last Thing

`/goal` is genuinely powerful for handing off real autonomous work, but it's also the module in this course where the caution matters as much as the capability. Use it, but write your own limits into it every time.

# SET THE FINISH LINE, NOT EVERY STEP.
