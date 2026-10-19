---
aliases:
  - Reason and act
  - ReAct prompting
tags:
  - agents
summary: A prompting pattern, introduced in 2022, in which a language model alternates written reasoning with actions such as searches or tool calls and reads each result before deciding what to do next, the template for most early agents.
---
**ReAct**, short for "reason and act," is a pattern in which a language model alternates between thinking in writing and taking actions, reading the result of each action before deciding on the next. It was introduced in a 2022 paper by Shunyu Yao and colleagues at Princeton and Google, and it became the template for most early language-model agents; see [[Agentic Loop]].

Before ReAct, two lines of work ran separately. Chain-of-thought prompting showed that models answer better when they write out reasoning steps first, but the reasoning drew only on what the model already knew, so it could confidently build on false facts; see [[Chain-of-Thought Prompting]] and [[Hallucination]]. Other work had models take actions, such as issuing search queries or moving in a text game, but without explicit reasoning between steps, so they struggled to plan or recover from mistakes.

ReAct interleaves the two. The prompt shows examples of a repeating cycle: a **thought**, where the model reasons about what it knows and what it needs; an **action**, such as searching an encyclopedia for a term; and an **observation**, the result returned by the environment. The model writes the thought and the action, the surrounding program executes the action and appends the observation, and the cycle continues until the model writes a final answer; see [[Tool Use]].

The paper tested this on question answering that required combining several facts, fact checking, and text-based games in simulated households. Grounding reasoning in retrieved facts reduced fabrication, and reasoning between actions helped the model track progress and change course; see [[Retrieval-Augmented Generation]]. The written thoughts also made failures easier to diagnose, since a reader could see where the plan went wrong; see [[Explainable AI]].

The pattern resembles older descriptions of how agents decide, such as the observe-orient-decide-act cycle; see [[OODA Loop]]. The written thoughts are loosely analogous to talking oneself through a task; see [[Inner Speech]].

ReAct's original form, parsing actions out of free text, has largely been replaced. Model providers added native tool calling, in which actions are emitted in a structured format the program can parse reliably; see [[Structured Output]]. Reasoning models think at length before each action without being prompted to; see [[Reasoning Model]]. The underlying loop, however, is unchanged: think, act, observe, repeat.

The pattern has known weaknesses. Every observation stays in the context, so long tasks fill it with stale results and performance degrades; see [[Context Rot]]. Models can loop, repeating a failed action or a search that already came back empty, unless the surrounding program caps the number of steps. And because observations come from outside, they can carry instructions that the model mistakes for its user's; see [[Prompt Injection]].

## See also
- [[Self-Consistency]]
- [[Computer Use]]
- [[Automated Planning]]
