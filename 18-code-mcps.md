# AmpEd
*amplify your ability to educate with Claude*
## Claude Code → MCPs
---

Every module in AmpEd has two parts: **THE WHAT** (the actual Claude skill) and **THE HOW** (real stories showing that skill solving a specific, recognizable problem). Pick whichever story feels closest to your own life. You don't need to read them in order, and you don't need to read every module in this course in order either. Start wherever you are.

**By the end of this module, you'll be able to:** recognize when you're manually copying data into Claude that it could just connect to directly, and know that MCP is the thing that makes that connection possible.

---

## 🧠 THE WHAT

# ONE STANDARD PORT FOR EVERY TOOL.

Six words. MCP, Model Context Protocol, is an open standard that lets Claude connect directly to external tools and data sources, instead of you manually copying information from those tools into the conversation yourself.

### The One-Sentence Version

> The moment you notice you're copying data out of some other tool, an issue tracker, a database, a dashboard, and pasting it into Claude, that's the exact signal an MCP connection could remove that step entirely.

### The Core Idea

MCP is widely described using one consistent analogy, precisely because it's the right one: think of it as a USB-C port for AI. Before a common standard existed, connecting an AI tool to each different external system, GitHub, Slack, a database, meant building a separate custom integration for every single pairing. MCP replaces that with one standard connector: build against MCP once, and any MCP-compatible tool can plug in, the same way USB-C works across phones, laptops, and headphones instead of every device needing its own unique cable.

Once a server is connected, Claude can read from and act on that real system directly, instead of working from what you've pasted in by hand.

**Analogy:** before USB-C, every device needed its own specific charger cable, a genuine hassle when you're carrying three different cables for three different gadgets. USB-C replaced that mess with one universal standard. MCP does the same thing for connecting Claude to outside tools, one standard instead of a custom cable for every single connection.

### The Real Signal to Connect One

| You notice yourself doing this | MCP fixes it by |
|---|---|
| Copying data from a tracker or dashboard into a Claude conversation | Letting Claude read that system directly |
| Manually re-typing information from one app into another | Letting Claude act on the source system itself |
| Wishing Claude "just knew" what was in some other tool | Connecting that tool once, instead of pasting every time |

### Quick Check

You keep manually copying open issues from a project tracker into Claude so it can help you prioritize them. Is this a signal for an MCP connection?

<details>
<summary><strong>See a strong answer</strong></summary>

> Yes, exactly. Repeatedly copying data from an external tool into a conversation is the textbook signal for connecting that tool via MCP instead. Once connected, Claude can read the tracker directly and help you prioritize based on live, current data, no manual copying required.

The test is simple: are you the manual bridge between Claude and some other system? If you're regularly playing that role, an MCP connection can likely replace you as the go-between.

</details>

---

## 🔄 THE HOW

---

### "Replacing Herself as the Human Copy-Paste Bridge"
**For anyone regularly moving information between tools by hand**

Someone managing a project used to copy the current state of her task board into Claude every time she wanted help thinking through priorities, a small but repeated tax on every planning session. Connecting the project tool via MCP meant Claude could just read the board directly, current and real, without her manually refreshing that context every single time.

**She wasn't doing anything wrong by copying it in manually. She just hadn't realized there was a standard way to remove that step entirely.**

*Research note: the specific trigger for connecting an MCP server, noticing you're copying data from another tool into the conversation, is the exact, named signal Anthropic's own documentation gives for when a connection is worth setting up.*

---

### "One Cable Instead of a Drawer Full of Them"
**For anyone who's ever felt overwhelmed by "yet another integration"**

Someone hesitant to connect Claude to several different work tools worried it would mean learning a separate, custom setup for each one. Understanding MCP as a single standard, the same "USB-C" idea used everywhere it's explained, one common connector rather than a unique cable for every tool, made the whole idea click. Setting up the second and third connection felt nothing like the learning curve of the first.

**The fear was learning a new system for every tool. The reality was learning one system, once.**

---

### One Last Thing

This module connects directly back to the Cowork branch's Connectors module, same underlying idea, giving Claude direct access to real tools instead of manual copy-paste, just in Claude Code's more technical context rather than Cowork's everyday one.

# ONE STANDARD PORT FOR EVERY TOOL.
