---
aliases:
  - Context length
tags:
  - agents
summary: The bounded span of tokens a model can attend to in a single request.
---
The **context window** is the maximum number of [[Token]]s a [[Large Language Model]] can consider at once. Everything the model knows about the immediate situation — instructions, conversation history, tool definitions, retrieved files, tool results — must fit inside it.

Its boundedness is the central constraint of applied language-model work. As windows have grown from a few thousand tokens to a million, the constraint has changed character rather than disappeared: the question is now less "will it fit" and more "does including this help". Filling a window with marginally relevant material measurably degrades attention to the material that mattered.

This makes *context engineering* the real discipline: choosing what to load, when, and in what form. The recurring techniques are to summarize rather than paste, to store artifacts outside the window and pass **handles** to them, to retrieve on demand rather than pre-loading, and to prune instructions describing capabilities that no longer exist.

Long-running work eventually exceeds any window. The usual answers are summarizing older turns into a compact form, delegating self-contained work to a [[Subagent]] with its own window, and persisting durable facts to [[Agent Memory]].

## See also
- [[Token Budget]]
- [[Prompt]]
- [[Agentic Loop]]
- [[Multi-Agent Orchestration]]

## Related
- [[Tool Use]]
- [[System Prompt]]
