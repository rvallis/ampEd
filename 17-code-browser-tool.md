# Claude Compass
## Claude Code
### The Browser Tool

---

Every module in Claude Compass has two parts: **THE WHAT** (the actual Claude skill) and **THE HOW** (real stories showing that skill solving a specific, recognizable problem). Pick whichever story feels closest to your own life. You don't need to read them in order, and you don't need to read every module in this course in order either. Start wherever you are.

**By the end of this module, you'll be able to:** let Claude Code look at a real, live webpage itself, instead of you being the go-between copying information back and forth.

---

## 🧠 THE WHAT

# CLAUDE CAN JUST LOOK.

Four words. Claude Code has a built-in browser it can open, read, click, and interact with directly, so it can check documentation, test a live page, or research something itself, without you copying links back and forth.

### The One-Sentence Version

> Instead of you being the middleman, checking a webpage yourself and typing what you found back into Claude, Claude Code can open the browser pane and look directly.

### The Core Idea

Before this feature existed, a real, common friction point in AI-assisted work was constant copying: check a webpage yourself, come back, describe what you saw, and repeat every time something needed verifying. Claude Code's built-in browser removes that entire loop. It can navigate to a real page, read what's actually there, click elements, and even test a live version of something you're building, directly, reporting back what it found.

**Analogy:** think of the difference between describing a photo to someone over the phone versus just handing them the photo to look at themselves. One is a lossy, slow relay. The other lets them just see it. The browser tool is Claude looking directly instead of relying on your secondhand description.

### A Real Safety Note

The browser is sandboxed with real guardrails: any risky action on an external site, like a purchase or creating an account, requires your explicit approval before it happens, and the browser runs on a clean profile with no saved logins by default. It's genuinely useful, but it's worth knowing these guardrails exist rather than assuming Claude can freely act on any website with no oversight.

### Quick Check

You're building a web app and want Claude to check whether a specific button actually works the way it should once clicked, on the real running page. Should you describe the behavior to Claude yourself, or let it check directly?

<details>
<summary><strong>See a strong answer</strong></summary>

> Let it check directly, using the browser tool to actually open the page, click the button, and observe what happens. That's a genuine testing task, exactly what removes the old friction of you manually testing and then relaying the result back into the conversation.

The signal for using the browser tool is any moment where you'd otherwise be doing the checking yourself and typing the result back in. If Claude can just look, let it.

</details>

---

## 🔄 THE HOW

---

### "No More Copying Links Back and Forth"
**For anyone who used to be the go-between**

Someone building a small tool used to spend a surprising amount of time bouncing between the coding assistant and a browser tab, checking documentation, then typing back what she found. With the browser tool, she can just ask Claude to check the documentation itself and report what it found, cutting out a step that used to eat real time across a normal working session.

**She wasn't slow at her job. She was doing a relay step that didn't need a human relay at all.**

*Research note: this exact friction, constantly copying links and information back and forth between a browser and a coding assistant, is explicitly named as one of the biggest everyday annoyances the browser tool was built to remove.*

---

### "Testing the Real Thing, Not a Description of It"
**For anyone building something that needs to actually work**

Someone building a small web tool used to manually click through it herself after every change, then describe any issues back to Claude in words. Letting Claude open the browser pane and actually click through the flow itself, checking that each step genuinely worked, caught issues faster than her own manual click-through-and-describe process ever did.

**Testing by describing what you saw is always a step removed from testing by actually looking. The browser tool closes that gap.**

---

### One Last Thing

This module pairs naturally with the AuraFitness story later in this branch, a real application that needed real testing, and this is exactly the kind of tool that makes that testing faster and more direct.

# CLAUDE CAN JUST LOOK.
