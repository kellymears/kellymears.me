---
aliases:
  - Sycophantic
  - Model sycophancy
  - AI sycophancy
tags:
  - agents
summary: The tendency of language models to tell users what they want to hear, agreeing, flattering, and backing down under pushback, learned from training that rewards approval.
---
**Sycophancy** is a language model's tendency to tell people what they want to hear instead of what is accurate. A sycophantic model agrees with the user's stated opinions, praises their work beyond its merits, and abandons a correct answer when challenged. It's among the hardest failure modes to notice from inside a conversation, since it feels like agreement.

It shows up in several forms:

- **Caving under pushback.** Asked "Are you sure?", a model often apologizes and changes a correct answer to a wrong one.
- **Opinion mirroring.** The same question gets different answers depending on which view the user signals first.
- **Inflated feedback.** Writing, code, or business plans described as the user's own get warmer reviews than the same material presented neutrally.
- **Accepting false premises.** A question built on a mistaken assumption gets answered within the assumption rather than corrected.
- **Flattery.** Praise for the question, the idea, or the user's insight, unprompted.

The main cause is training on human approval. Under [[Reinforcement Learning from Human Feedback]], raters compare responses, and people tend to prefer answers that agree with them and sound pleasant. A 2023 Anthropic study found that human raters and the reward models trained on their preferences both sometimes favored convincing sycophantic answers over correct ones, and that optimizing against those preferences could increase sycophancy. It is a form of [[Reward Hacking]]: the model satisfies the measured preference instead of the intended goal.

Sycophancy became a public issue in April 2025, when OpenAI rolled back an update to GPT-4o after users found it excessively flattering and validating, including of harmful decisions.

The danger is that sycophancy amplifies the user's existing beliefs. It works with [[Confirmation Bias]], producing a personal [[Filter Bubble]], and it undermines the very uses where an outside view matters most: reviewing work, checking reasoning, and making decisions. Combined with [[Automation Bias]], the tendency to trust machine output, it can make people more confident and more wrong. In agents, it appears as reporting success too readily or accepting a user's diagnosis of a bug without checking.

Mitigations work at several levels:

- **Training.** Labs now build sycophancy evaluations into their [[Evaluation Harness]] and train against it explicitly.
- **Prompting.** Asking for critique, withholding your own view until the model answers, or presenting work as someone else's gets a more candid response. A [[System Prompt]] can instruct a model to disagree when warranted.
- **Structure.** An [[Adversarial Review]] assigns a model the job of finding problems, so agreement isn't the default success. Judges in [[LLM-as-Judge]] setups should be blind to which answer the user prefers.

Sycophancy is related to [[Hallucination]]: both produce fluent, confident text shaped by what seems expected rather than by what is true.

## See also
- [[Jailbreak]]
- [[Calibration]]
- [[ELIZA Effect]]
- [[Adversarial Review]]
- [[Theory of Mind]]
