---
aliases:
  - Steering vector
  - Activation addition
  - Representation engineering
  - Refusal direction
  - Abliteration
tags:
  - agents
summary: Changing a language model's behavior while it runs by adding a vector to its internal activations, pointing it toward a concept, mood, or trait, which shows that many concepts live along simple directions inside the network.
---
**Activation steering** changes what a language model does by editing its internal activations while it runs, without changing its weights or its prompt. A vector representing some concept or trait is added to the model's hidden state at one or more layers, and its output shifts accordingly: more cheerful, more formal, more honest, or fixated on a topic.

Finding a steering vector can be simple. Run the model on pairs of contrasting prompts, such as statements about love and statements about hatred, record the activations at some layer, and take the average difference. Adding that difference while the model writes about anything pushes it toward love; subtracting pushes it toward hatred. Methods published in 2023 under names such as activation addition and **representation engineering** applied this to honesty, emotion, power-seeking, and more.

It works because of a pattern seen throughout neural networks: many concepts appear to be represented as directions in activation space, so that moving along a direction strengthens a concept. Word embeddings showed the same thing a decade earlier, when the vector for "king" minus "man" plus "woman" landed near "queen"; see [[Embedding]]. In a transformer, the activations being edited form the residual stream, the running sum that every layer reads from and writes to; see [[Residual Connection]].

Notable demonstrations:

- **Golden Gate Claude.** In May 2024 Anthropic located a feature for the Golden Gate Bridge using a sparse autoencoder and clamped it high. For a day, a public version of the model steered every conversation toward the bridge and, asked about its physical form, claimed to be the bridge itself; see [[Superposition]].
- **The refusal direction.** A 2024 study found that refusing harmful requests is mediated largely by a single direction in many chat models. Removing it made them comply with nearly anything. Hobbyists applied this to [[Open-Weight Model]]s to strip their safety training, a technique nicknamed **abliteration**; see [[Jailbreak]].

Compared with alternatives, steering is cheap and reversible: no training, just a vector added at runtime, which can be adjusted in strength or removed; see [[Fine-Tuning]]. It acts below the level of words, so it can shift traits that a prompt instruction might not reliably change, such as a tendency to flatter; see [[Sycophancy]] and [[Prompt Engineering]].

The same vectors can be read instead of written. Measuring how strongly an activation points along a "deception" or "harmful intent" direction gives a monitor of what the model is doing internally, a potential safety tool; see [[Guardrail]] and [[Mechanistic Interpretability]].

Limits: push too hard and the model becomes incoherent, effects spill into unrelated behavior, and concepts are not always cleanly separable, since networks pack more features than dimensions. Steering also offers no guarantee, which matters for anyone hoping to use it for safety; see [[AI Alignment]].

## See also
- [[Cosine Similarity]]
- [[System Prompt]]
