---
aliases:
  - Chain of Thought
  - CoT
tags:
  - agents
summary: Prompting a model to write out intermediate reasoning steps before its final answer, which measurably improves accuracy on multi-step problems.
---
**Chain-of-thought prompting** is a technique where a model is asked — or trained — to produce intermediate reasoning steps before stating a final answer, rather than jumping straight to a conclusion. The seminal result (Wei et al., Google, 2022) showed that a few worked examples demonstrating the reasoning explicitly produced large accuracy gains — and Kojima et al. showed the same year that the zero-shot trick of simply adding "let's think step by step" worked too — on arithmetic and multi-step logic benchmarks compared to prompting for the answer directly — a surprising result at the time, since nothing about the model changed, only what it was asked to output.

The mechanism is usually explained as giving the model's own forward pass more computation to work with: a direct answer is produced in one shot from the prompt, while a chain-of-thought answer lets each generated token condition on the reasoning tokens that came before it, effectively letting the model use its own intermediate output as extra working memory it wouldn't otherwise have. This is also why chain-of-thought output isn't a reliable window into what the model "actually" computed internally — it's a token sequence that helps the next tokens be more accurate, not a transcript of some separate hidden reasoning process, a distinction [[Mechanistic Interpretability]] research keeps having to re-litigate against the intuitive reading of a nicely-formatted reasoning trace.

The technique has since been absorbed into models themselves: so-called "reasoning models" are trained to produce extended chain-of-thought by default (sometimes hidden from the end user, sometimes shown), rather than requiring a prompt-side trick to elicit it, which is the difference between chain-of-thought as a prompting pattern applied to any model and chain-of-thought as a trained-in behavior of a specific model class. It composes directly with [[Agentic Loop]] designs, where reasoning steps interleave with [[Tool Use]] calls rather than running as one uninterrupted block of text.

## See also
- [[Prompt Engineering]]
- [[Agentic Loop]]
- [[Mechanistic Interpretability]]
- [[Large Language Model]]
