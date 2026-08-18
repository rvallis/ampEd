# AmpEd
*amplify your ability to educate*
## Claude Code → Canvas API Automation
---

Every module in AmpEd has two parts: **THE WHAT** (the actual Claude skill) and **THE HOW** (real stories showing that skill solving a specific, recognizable problem). Pick whichever story feels closest to your own life. You don't need to read them in order, and you don't need to read every module in this course in order either. Start wherever you are.

**By the end of this module, you'll be able to:** understand what makes an LMS actually automatable, and recognize the difference between a tool you can direct Claude Code to build inside of, and one you can't.

---

## 🧠 THE WHAT

# OPEN API MEANS OPEN DOOR.

Five words. Whether Claude Code can directly build, automate, or integrate with a piece of software comes down to one question: does it expose an open, documented API. If yes, real automation is possible. If not, it isn't, no matter how capable Claude is.

### The One-Sentence Version

> The single most important question before trying to automate any tool with Claude Code isn't "is Claude smart enough," it's "does this tool expose an API Claude can actually talk to."

### The Core Idea

Canvas, the learning management system, has an open REST API, a documented, standardized way for outside programs to read and write data into it directly: creating assignments, updating grades, pulling rosters, all without a human clicking through the interface by hand. That's what makes Canvas automatable in a way that some other tools, tools built with a closed, manual-only interface, simply aren't.

This is a genuinely important distinction to internalize as a general skill, not just a Canvas-specific fact. Different software makes different design choices based on who its buyer is. Software built for IT departments and system administrators tends to expose open APIs, since integration is exactly what that buyer wants. Software built for individual, non-technical users to operate entirely by hand often doesn't, since an open API isn't part of what that buyer is asking for.

**Analogy:** think of the difference between a building with a keyed side door built specifically for deliveries, versus a building where the only way in is the manned front desk. The first was designed to be entered by something other than a person walking up. The second wasn't, no matter how good you are at talking your way past the front desk.

### The Real Diagnostic Question

| Ask this first | Not this |
|---|---|
| "Does this tool have a documented, open API?" | "Is Claude Code capable enough to automate this?" |
| Check the tool's own developer documentation | Assume automation is always possible with enough cleverness |
| Look at who the tool is built for, IT/admin buyers usually mean an API exists | Assume every popular tool works the same way under the hood |

### Quick Check

You're evaluating whether you can build a real Claude Code automation for two different tools, one aimed at IT departments wanting integration, one aimed at individual users who just want to click through a simple interface by hand. Which one is more likely to actually support automation?

<details>
<summary><strong>See a strong answer</strong></summary>

> The tool aimed at IT departments. That buyer specifically wants integration capability, which is exactly the kind of product decision that leads to an open, documented API existing in the first place. The consumer-facing, click-through tool is far less likely to expose one, since its buyer never asked for that capability.

The diagnostic isn't about how popular or well-built a tool is. It's about who the tool was built to be sold to, and whether integration was part of that pitch.

</details>

---

## 🔄 THE HOW

---

### "Checking the API First, Before Promising Anything to a Client"
**For anyone offering automation work to clients**

Someone evaluating a potential automation project for a client learned to check one thing before quoting any price or timeline: does the target software actually expose a documented API. On one project, the tool in question turned out to have no public API at all, a closed, manual-only interface, meaning no amount of Claude Code cleverness could build a real integration. Catching that before committing to the work saved a project that was never going to be possible in the first place.

**The lesson wasn't a Canvas lesson specifically. It was a general filter: check the API exists before promising automation is possible.**

---

### "Explaining the Real Constraint to a Non-Technical Client"
**For teachers thinking about management, or managers thinking about teaching**

Someone directing automation projects learned to explain this distinction plainly to non-technical clients who assumed "AI can automate anything": some tools were built to be opened up to other software, and some were built specifically to be operated by a human clicking through, and no amount of AI capability changes which category a given tool falls into. Setting that expectation early avoided a lot of frustrated conversations later.

**Being honest about this limitation up front built more trust than overpromising ever would have.**

---

### One Last Thing

This module sets up the next two, real case studies where an open API made genuine automation possible. Understanding why that mattered here is what makes those next two stories instructive rather than just impressive.

# OPEN API MEANS OPEN DOOR.
