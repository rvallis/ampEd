# AmpEd
*amplify your ability to educate with Claude*
## Claude Code → The Apps Script Grading Pipeline
---

Every module in AmpEd has two parts: **THE WHAT** (the actual Claude skill) and **THE HOW** (real stories showing that skill solving a specific, recognizable problem). Pick whichever story feels closest to your own life. You don't need to read them in order, and you don't need to read every module in this course in order either. Start wherever you are.

**A note on this module:** unlike most modules in this course, this one is a single real, lived case study, not several invented-but-realistic stories. This actually happened, built with Claude Code, and is used weekly in a real classroom.

**By the end of this module, you'll be able to:** see a concrete example of a small, focused automation, built once, that eliminates a repeated weekly task entirely.

---

## 🧠 THE WHAT

# SMALL AND SPECIFIC BEATS BIG AND VAGUE.

Six words. The most useful automations aren't sprawling systems. They're small, tightly scoped pipelines that solve one specific, recurring task completely.

### The One-Sentence Version

> A weekly task that used to require manually entering data into a gradebook can become a script that reads a spreadsheet and writes directly into that gradebook, if the target system has an open API and the task itself is well defined.

### The Core Idea

This is a real automation, built with Claude Code, that connects a Google Sheets spreadsheet directly to Canvas using Canvas's API. Every week, PE and health class points get entered into a spreadsheet, and the script reads that spreadsheet and automatically creates the assignment in Canvas, populating each student's score using their Canvas ID, and, when a comment exists explaining why a grade wasn't full points, pushing that comment in as well.

What makes this a strong example isn't its complexity, it's the opposite. It's a small, specific, well-bounded task: one input (the spreadsheet), one output (Canvas grades and comments), one clear rule connecting them. That specificity is exactly why it works reliably every week without needing constant babysitting.

**Analogy:** think of the difference between hiring someone to "help with grading" in some general sense, versus hiring someone with one very specific job: take the numbers from this spreadsheet, and put them in Canvas, exactly like this, every week. The second job description is boring precisely because it's so clear, and that clarity is what makes it something you can actually hand off reliably.

### What Made This Automation Work

| Ingredient | Why it mattered |
|---|---|
| Canvas has an open API | Without it, none of this would be possible, no matter how good the script was |
| The task was narrow and well-defined | One spreadsheet, one destination, one clear mapping between them |
| The rule for comments was simple and consistent | "If there's a comment explaining a lost point, include it" is easy to automate reliably |

### Quick Check

Someone asks you to help automate "all of their grading." Based on this example, what's your first move?

<details>
<summary><strong>See a strong answer</strong></summary>

> Push back on the vagueness first. "All of their grading" is exactly the kind of broad, undefined request that resists reliable automation. The real move is narrowing it down to something as specific as this example, one clear input, one clear output, one clear rule, before attempting to build anything.

The lesson from this real automation isn't "automate everything." It's "automate one clearly defined thing extremely well, then consider whether the next thing is worth doing the same way."

</details>

---

## 🔄 THE HOW

---

### "The Weekly Task That Just Stopped Being a Task"
**A real, lived account**

Before this automation existed, every week meant manually creating a Canvas assignment for weekly PE and health points, then entering each student's score by hand, and, for students who'd lost points, typing an explanatory comment individually. It was routine, but it was real time, every single week, for an entire school year.

Now the spreadsheet gets filled in once, and the script does the rest: it reads the data, creates the Canvas assignment, matches each student by their Canvas ID, writes in their score, and adds the comment where one exists. What used to be a recurring weekly task became something that happens automatically once the spreadsheet is filled in.

**This wasn't a hypothetical efficiency gain. It's real time given back, every single week, from a task that had no real reason to require manual entry once Canvas's API made the direct connection possible.**

---

### One Last Thing

This is what a domain-expert-director workflow actually looks like in practice: not a sprawling, ambitious system, but a small, well-scoped automation, directed by someone who understood both the classroom need and how to direct Claude Code to meet it precisely.

# SMALL AND SPECIFIC BEATS BIG AND VAGUE.
