---
aliases:
  - Model Fine-Tuning
  - LoRA
tags:
  - agents
summary: Continuing to train an already-trained model on a narrower dataset to specialize its behavior, instead of prompting the base model.
---
**Fine-tuning** is the practice of taking a model that has already been trained (usually a large, generally-capable base or instruction-tuned model) and continuing to train it on a smaller, more specific dataset, so its weights shift toward the style, format, or knowledge that dataset represents. It's the alternative to [[Prompt Engineering]] for shaping model behavior — where prompting steers a fixed model at inference time via instructions and examples in context, fine-tuning changes the model itself, permanently (until the next fine-tune), so the desired behavior no longer has to be re-specified in every prompt.

Full fine-tuning updates all of a model's parameters and is expensive at the scale of modern large models — infeasible for most teams to do themselves at the frontier scale. This is why parameter-efficient methods dominate practice: LoRA (Low-Rank Adaptation) freezes the original weights and trains a much smaller set of additional low-rank matrices that get added on top, cutting the trainable parameter count and memory footprint by orders of magnitude while approximating much of the benefit. Instruction tuning and RLHF (reinforcement learning from human feedback) are themselves fine-tuning steps applied by model providers to turn a raw base model into the conversational assistant most people actually interact with.

The tradeoff against prompting is worth being explicit about: fine-tuning is the right tool when the same narrow behavior needs to be reproduced at scale, cheaply, without paying [[Context Window]] space for lengthy instructions every call, or when the desired behavior is genuinely hard to specify in words (a particular voice, a domain-specific classification task) but easy to demonstrate with examples. It's the wrong tool for anything that changes often, since each behavior change means retraining, whereas a prompt change is instant and free. Fine-tuning also risks catastrophic forgetting — a cousin of [[Overfitting]], where over-specializing on the narrow dataset degrades the model's general capability that made it worth starting from in the first place.

## See also
- [[Large Language Model]]
- [[Prompt Engineering]]
- [[Retrieval-Augmented Generation]]
- [[Quantization]]
- [[Temperature Sampling]]
