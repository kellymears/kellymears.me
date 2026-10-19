---
aliases:
  - Few-shot prompting
  - Few-shot learning
  - Zero-shot prompting
  - Many-shot prompting
  - Few-shot examples
tags:
  - agents
summary: A language model's ability to pick up a task from examples or instructions in its prompt, without any change to its weights, and the quirks of how it does so.
---
**In-context learning** is a language model's ability to perform a new task from instructions or examples given in its [[Prompt]], with no change to the model's weights. Show a model three examples of English words paired with their French translations, then a fourth English word, and it produces the French. Nothing was trained; the model inferred the task from the context alone.

The 2020 GPT-3 paper, titled "Language Models are Few-Shot Learners," made the ability famous. It compared three settings:

- **Zero-shot**: only an instruction, such as "Translate to French."
- **One-shot**: the instruction plus one example.
- **Few-shot**: the instruction plus several examples.

Larger models benefited much more from examples than smaller ones, and few-shot performance on some tasks approached models that had been specifically trained for them. In-context learning made [[Prompt Engineering]] a practical alternative to training a separate model for every task.

How it works is still studied. [[Mechanistic Interpretability]] research at Anthropic in 2022 identified *induction heads*, attention circuits that find an earlier occurrence of the current pattern and copy what came next; see [[Attention Mechanism]]. They form at a specific point in training, at the same moment in-context learning ability jumps, which suggests they are part of the mechanism.

Experiments show that examples teach less, and differently, than one might expect:

- **Format matters more than labels.** A 2022 study found that few-shot examples helped even when their answers were randomly wrong, because the model mostly learned the format and the range of possible outputs.
- **Order and balance matter.** Results shift depending on which example comes last and how often each answer appears, an effect like the [[Anchoring Effect]] in people.
- **Examples get copied.** Models imitate surface features such as length, phrasing, and topic, so three similar examples can narrow output more than intended. Varied examples generalize better.

Larger [[Context Window]] sizes enabled *many-shot* learning with hundreds or thousands of examples, which can rival [[Fine-Tuning]] for some tasks without the training. The same capacity has a downside: Anthropic showed in 2024 that many-shot examples of harmful answers could override safety training, a jailbreak technique. Long example sets are expensive per call, which [[Prompt Caching]] helps by reusing the processed prefix.

In-context learning is also how a model uses retrieved documents. [[Retrieval-Augmented Generation]] works because the model can absorb facts and conventions from text placed in its context and apply them immediately. The knowledge is temporary: it lasts only as long as it remains in context, which is why durable lessons in agents go into [[Agent Memory]] or instructions rather than relying on a single conversation.

The choice between showing and telling recurs in practice. Instructions state rules clearly but can be misread; examples demonstrate behavior but invite imitation of incidental features.

## See also
- [[Activation Patching]]
- [[Fine-Tuning]]
- [[Transfer Learning]]
- [[Instruction Tuning]]
- [[Priming]]
