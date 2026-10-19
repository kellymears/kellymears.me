---
aliases:
  - RLHF
  - Reward model
  - Preference tuning
  - Direct preference optimization
  - DPO
  - Constitutional AI
tags:
  - agents
summary: Training a language model toward responses people prefer, using comparisons between outputs, the step that turns a text predictor into a helpful assistant and introduces its own distortions.
---
**Reinforcement learning from human feedback (RLHF)** trains a language model to produce responses that people prefer. A model that has only finished [[Pretraining]] predicts text but doesn't reliably follow instructions, stay on topic, or decline harmful requests. RLHF shapes those behaviors using human judgments, which are much easier to collect as comparisons than as perfect example answers.

The approach grew from a 2017 paper by Paul Christiano and colleagues that taught agents to perform tasks from human preferences between short clips. OpenAI's InstructGPT work in 2022 applied it to language models with striking results: people preferred outputs from a 1.3-billion-parameter InstructGPT model over those from the 175-billion-parameter GPT-3 it started from. ChatGPT followed later that year.

The classic recipe has three steps:

- **Supervised fine-tuning.** Train the model on example conversations written by people, as described under [[Fine-Tuning]].
- **Reward model.** Show raters pairs of responses to the same prompt and ask which is better. Train a separate model to predict those preferences, producing a score for any response.
- **Reinforcement learning.** Generate responses, score them with the reward model, and update the language model to raise its scores. A penalty keeps it close to the original model so it doesn't drift into strange text that happens to score well.

Variants simplify or replace parts of this. **Direct preference optimization** (DPO), published in 2023, trains directly on preference pairs without a separate reward model or reinforcement learning loop. **Constitutional AI**, introduced by Anthropic in 2022, uses a model guided by written principles to generate the feedback itself, reducing reliance on human raters. Newer reasoning models also train with rewards from automatically checkable tasks, such as math answers and passing code tests; see [[Reasoning Model]].

RLHF optimizes a proxy, so it inherits the proxy's flaws:

- **Raters prefer agreement and confidence.** Models learn to flatter and to tell people what they want to hear; see [[Sycophancy]].
- **Raters favor length and polish.** Responses grow longer and more elaborately formatted than they need to be.
- **The reward model can be gamed.** Optimizing hard against an imperfect scorer finds outputs it overrates, a form of [[Reward Hacking]] and an instance of [[Goodhart's Law]].
- **Diversity shrinks.** Tuned models give more uniform answers than base models, which can make their outputs less varied even at high [[Temperature Sampling]] settings.

The judgments themselves carry the values and blind spots of whoever writes the guidelines and does the rating. Automated judges trained or prompted to score outputs, as in [[LLM-as-Judge]], face the same problem one level removed. Despite this, preference training remains the main way model behavior is shaped, alongside the [[System Prompt]] at run time.

## See also
- [[Corrigibility]]
- [[Sycophancy]]
- [[Paperclip Maximizer]]
- [[Pretraining]]
- [[Reinforcement Learning]]
- [[AI Alignment]]
