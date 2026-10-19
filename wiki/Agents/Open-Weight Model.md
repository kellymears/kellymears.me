---
aliases:
  - Open weights
  - Local model
  - Local inference
  - GGUF
  - Safetensors
tags:
  - agents
summary: Models whose trained parameters can be downloaded and run anywhere, how they differ from open source, and what running one locally takes.
---
An **open-weight model** is a machine-learning model whose trained parameters, its weights, are published for anyone to download and run. The contrast is with models available only through a vendor's API, where the weights stay on the vendor's servers. With open weights, a large language model becomes a file you can copy, inspect, fine-tune, and run offline.

"Open weights" is deliberately narrower than "open source." Releasing weights doesn't mean releasing the training data, the training code, or the recipe needed to reproduce the model, which is what open source would mean by analogy with software. Licenses vary too. Some, like Apache 2.0 and MIT, impose almost no conditions; others restrict use, such as Meta's Llama license, which requires services with more than 700 million monthly users to ask permission. The Open Source Initiative published a definition of open-source AI in 2024 that most open-weight releases don't meet.

The field moved quickly. Meta's original LLaMA weights, shared with researchers in early 2023, leaked within a week and set off a wave of experimentation. Mistral released Mistral 7B under Apache 2.0 later that year. Alibaba's Qwen, Google's Gemma, and DeepSeek followed, and DeepSeek-R1, released under MIT terms in January 2025, showed an open [[Reasoning Model]] close to the frontier. OpenAI released open-weight models in August 2025. Many of the largest use [[Mixture of Experts]] designs.

Running a model locally is mostly a memory problem. Weights at 16-bit precision take two bytes per parameter, so a 30-billion-parameter model needs about 60 gigabytes before counting the [[KV Cache]]. [[Quantization]] to 4 bits cuts that to around a quarter with modest quality loss, and [[Knowledge Distillation]] produces small models that punch above their size. The llama.cpp project, started by Georgi Gerganov in 2023, made quantized inference practical on ordinary computers, and its **GGUF** file format packages weights with everything needed to load them. Tools such as Ollama wrap it in a simple command line.

The reasons people choose open weights:

- **Privacy.** Data never leaves the machine.
- **Control.** A pinned file doesn't change underneath you, unlike an API model that may be updated without notice, which matters for [[Nondeterminism]] and reproducible evaluation.
- **Customization.** [[Fine-Tuning]], including cheap low-rank adapters, needs the weights.
- **Research.** [[Mechanistic Interpretability]] needs access to internal activations.

The costs are real too. Safety training can be stripped by further fine-tuning, so a released model's [[Guardrail]] behavior isn't permanent, and a release can't be recalled. Model files are also part of the [[Supply Chain Security]] surface: older formats based on Python's pickle could execute arbitrary code when loaded, which is why the **safetensors** format, holding only raw tensors, became the norm. Model hubs such as Hugging Face play the role a [[Package Manager]] registry plays for code.

## See also
- [[Activation Steering]]
- [[Model Routing]]
- [[Transfer Learning]]
- [[Model Merging]]
