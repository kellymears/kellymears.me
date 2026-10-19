---
aliases:
  - Majority voting
  - Best-of-N sampling
  - Universal self-consistency
tags:
  - agents
summary: Sampling several independent reasoning paths from a language model and taking the most common answer, a simple way to trade more computation for accuracy, and a signal of when the model is unsure.
---
**Self-consistency** is a technique for improving a language model's answers by asking the same question several times and taking a vote. The model generates multiple independent chains of reasoning, each sampled with some randomness, and the final answer that appears most often wins.

It was introduced in 2022 by researchers at Google as an extension of [[Chain-of-Thought Prompting]]. On grade-school math word problems, sampling forty reasoning paths and voting raised one large model's accuracy from about 57 to 74 percent, with no training at all.

The intuition is that there are many ways to reason correctly but they tend to arrive at the same answer, while mistakes scatter in different directions. One sample might slip on arithmetic, another misread the question, but those errors rarely agree. The randomness that makes outputs vary is what makes the vote work; see [[Temperature Sampling]] and [[Nondeterminism]]. It is a small-scale version of averaging independent judgments; see [[Wisdom of the Crowd]].

Variants:

- **Majority voting** needs answers that can be compared exactly, such as a number or a multiple-choice letter.
- **Universal self-consistency** handles free-form answers by asking a model to read all the samples and pick the one most consistent with the rest.
- **Best-of-N sampling** generates several answers and picks one with an external scorer, a trained reward model, a test suite, or another model acting as judge; see [[LLM-as-Judge]] and [[Reinforcement Learning from Human Feedback]].

Running many samples in parallel and combining them is a common agent pattern; see [[Fan-Out and Fan-In]].

Agreement is also information. If thirty of forty samples agree, the answer is likely right; if they split evenly, the model is guessing. That makes the agreement rate a useful confidence estimate, and disagreement among samples is one practical way to flag likely fabrications; see [[Calibration]] and [[Hallucination]].

The costs and limits:

- **Compute.** Forty samples cost forty times as much, and gains flatten after a few dozen; see [[Token Budget]].
- **Shared mistakes.** If the model has a systematic misconception, most samples share it, and the vote confirms the error with false confidence. Independence is the assumption, and samples from one model are never fully independent.
- **Open-ended tasks.** For writing or design, there's no single answer to count.

Self-consistency was an early demonstration that spending more computation at answer time, not just at training time, buys accuracy. Reasoning models now do some of this internally, exploring and checking alternatives within one long response; see [[Reasoning Model]]. The same principle appears in ensembles of classic models, where many weak learners vote; see [[Ensemble learning]].

## See also
- [[Monte Carlo Method]]
- [[Beam Search]]
- [[ReAct]]
