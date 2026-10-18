---
aliases:
  - Reasoning models
  - Test-time compute
  - Extended thinking
  - Thinking tokens
  - Inference-time scaling
tags:
  - agents
summary: Language models trained to think at length before answering, trading tokens and latency for accuracy on hard problems, and the second axis of scaling after model size.
---
A **reasoning model** is a [[Large Language Model]] trained to work through a problem in an extended stream of intermediate text before giving its final answer. Where [[Chain-of-Thought Prompting]] asked a model to show its work, reasoning models are trained to do it by default, often producing thousands of *thinking tokens* that may be hidden from or summarized for the user.

OpenAI's o1, released in September 2024, introduced the category commercially. DeepSeek's R1, released with open weights in January 2025, showed how such behavior could be trained: rewarding a model with reinforcement learning only for correct final answers on problems that can be checked automatically, such as math with known solutions and code with tests, caused long reasoning to emerge, including checking work and backtracking from mistakes. This differs from [[Reinforcement Learning from Human Feedback]] in that the reward comes from verification rather than human preference.

The key finding is **test-time compute scaling**. A reasoning model's accuracy on hard problems keeps improving the longer it's allowed to think. This opened a second axis of improvement beyond the training-time [[Scaling Laws]]: instead of only building a bigger model, you can spend more computation per question. On competition math and difficult coding tasks, gains were large.

The tradeoffs are practical:

- **Cost and latency.** Thinking tokens are generated and billed like any other output. A response that takes a minute and ten thousand tokens is wasteful for a simple question, so many APIs let callers set a thinking budget, part of managing a [[Token Budget]], and [[Model Routing]] sends easy tasks to faster models.
- **Overthinking.** Models can talk themselves out of correct answers or spend effort on trivial questions.
- **Context consumption.** Long reasoning fills the [[Context Window]], so agents running many steps discard old reasoning between turns.
- **Uneven gains.** Improvements are largest where answers can be verified, such as math, code, and logic puzzles, and smaller for open-ended writing or judgment.

Whether visible reasoning reflects what the model actually does is an open question. A 2025 Anthropic study found that reasoning models given hints often used them without mentioning them in their reasoning, so the transcript isn't a faithful record. This matters for safety, where monitoring reasoning is a promising way to catch [[Reward Hacking]], and for [[Mechanistic Interpretability]], which studies the computation directly rather than the text.

The comparison to human thinking is common. A direct answer resembles fast, intuitive judgment and extended reasoning resembles slow, deliberate thought, the distinction described under [[Dual Process Theory]].

In agents, reasoning interleaves with action: the model thinks, calls a tool, reads the result, and thinks again, as in an [[Agentic Loop]]. Capabilities developed in large reasoning models are often transferred to smaller ones through [[Knowledge Distillation]].

## See also
- [[Monte Carlo Tree Search]]
- [[Scaling Laws]]
- [[Token Budget]]
