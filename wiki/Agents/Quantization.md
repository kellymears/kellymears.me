---
aliases:
  - Model Quantization
tags:
  - agents
summary: Storing a model's weights at lower numeric precision to shrink memory and speed inference, at some cost to accuracy.
---
**Quantization** is the process of converting a model's weights — and sometimes its intermediate activations — from a higher-precision numeric format to a lower-precision one, typically from 16-bit or 32-bit floating point down to 8-bit or 4-bit integers, in order to shrink memory footprint and speed up inference. A model quantized from 16-bit to 4-bit roughly quarters its memory requirement, which is often the difference between needing a data-center GPU and running comfortably on a laptop or phone.

The tradeoff is precision loss: every weight is now represented by fewer possible values, so the model's outputs shift slightly from the full-precision original, and past some aggressiveness threshold that shift becomes measurable degradation in output quality. The engineering work in quantization methods (GPTQ, AWQ, GGUF's various quant levels) is mostly about minimizing that degradation for a given bit-width — which weights matter most to preserve precisely, how to calibrate the rounding to the actual distribution of values in the trained model, rather than rounding naively. Quantization-aware training goes further, incorporating the eventual quantization into the training process itself rather than applying it as a fully separate post-hoc step.

Quantization is largely orthogonal to [[Fine-Tuning]] — a model can be fine-tuned, then quantized, or quantized and then fine-tuned further with quantization-aware methods like QLoRA, which fine-tunes on top of a quantized base to keep the memory savings during training as well as inference. It's also the reason a locally-run open-weight model (an "Ollama model" running on someone's own GPU) is very often a quantized version of a larger release rather than the full-precision original — the full-precision weights are frequently too large to run outside a datacenter, and quantization is what makes local inference on consumer hardware feasible at all.

## See also
- [[Fine-Tuning]]
- [[Large Language Model]]
- [[Token Budget]]
- [[Temperature Sampling]]
