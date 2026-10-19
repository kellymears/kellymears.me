---
aliases:
  - Context management
tags:
  - agents
summary: Deciding what information a language model sees at each step, from instructions and tools to retrieved documents, memory, and history, the core design problem for agents working over many turns.
---
**Context engineering** is the practice of deciding what goes into a language model's context at each step: instructions, tool definitions, retrieved documents, memory, and the history of the conversation so far. The term spread in 2025 as people building agents found that what the model sees matters more than how any single request is worded; see [[Prompt Engineering]].

The shift reflects how agents work. A single question and answer needs one well-written prompt. An agent may run for hundreds of steps, calling tools and reading their results, and every step adds text; see [[Agentic Loop]]. The question becomes how to manage that growing pile so the model always has what it needs and little else.

Context is limited in several ways. It has a hard size limit; see [[Context Window]]. Every token costs money and time; see [[Token Budget]]. And models get worse at using information as context grows long, missing details buried in the middle; see [[Context Rot]]. More context isn't simply better.

Common techniques:

- **Retrieve on demand.** Rather than loading everything up front, give the model tools to find what it needs when it needs it, such as searching files or querying a database; see [[Retrieval-Augmented Generation]].
- **Compress history.** Summarize older turns, and drop bulky tool results once they've been used.
- **Isolate subtasks.** Hand a self-contained job to a separate model instance with its own clean context, which returns only a short result; see [[Subagent]].
- **Write things down.** Keep notes, plans, and progress in files outside the context, reading them back after a reset; see [[Agent Memory]].
- **Load instructions lazily.** Show short descriptions of available procedures and load the full text only when one is needed; see [[Agent Skill]] and [[Progressive Disclosure]].
- **Keep the stable parts first.** Put unchanging instructions and tools at the start so they can be reused from cache across calls, which is cheaper and faster; see [[Prompt Caching]].

Tools are part of the context too. Each tool's description takes up space, and a tool that returns pages of raw output can crowd out everything else. Well-designed tools have concise descriptions, return just what's useful, and paginate large results. Connecting many tool servers at once can fill a context before any work begins; see [[Model Context Protocol]].

The discipline resembles managing human attention. People can hold only a few things in mind at once, and good documentation surfaces what's relevant instead of everything; see [[Working Memory]]. As models improve, they need less hand-holding, but context remains finite, so choosing what to show stays a design problem.

## See also
- [[Document Chunking]]
- [[Frame Problem]]
