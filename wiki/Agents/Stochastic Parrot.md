---
aliases:
  - Stochastic parrots
tags:
  - agents
summary: A 2021 critique of large language models as systems that stitch together plausible text with no grasp of meaning, from a paper whose fallout at Google became as famous as its argument.
---
**"Stochastic parrot"** is a phrase from a 2021 paper by Emily M. Bender, Timnit Gebru, Angelina McMillan-Major, and Margaret Mitchell, "On the Dangers of Stochastic Parrots: Can Language Models Be Too Big?" It describes a language model as a system that stitches together sequences of words according to probabilities learned from its training text, without any reference to meaning; see [[Large Language Model]].

The paper made several arguments beyond the phrase:

- **Cost.** Training ever-larger models uses large amounts of energy, and the benefits and costs fall on different people.
- **Data.** Training sets scraped from the web are too big to document or audit, and they overrepresent some voices and encode their biases; see [[Web scraping]] and [[Algorithmic Bias]].
- **Meaning.** Fluent text invites readers to assume a mind behind it, which makes errors and bias persuasive; see [[ELIZA Effect]].
- **Direction.** Effort spent making models bigger was effort not spent on curating data and understanding what models do.

The meaning argument drew on an earlier paper by Bender and Alexander Koller, which imagined a hyperintelligent octopus tapping an undersea cable between two people stranded on separate islands. Learning only the statistics of their messages, it could hold up its end of small talk. But when one asked how to fend off a bear with sticks, it would have no idea what a bear or a stick is. It's a [[Thought Experiment]] in the line of the [[Chinese room]]: form alone, the authors argued, can't teach meaning.

The paper became famous partly for its fallout at Google. Gebru, then a co-lead of Google's ethical AI team, said she was fired in December 2020 after the company asked her to withdraw the paper or remove the Google authors' names; Google said she resigned. Mitchell, the other co-lead, was fired in February 2021, and appeared on the published paper under the pseudonym "Shmargaret Shmitchell."

The phrase spread after ChatGPT's release in late 2022, used by critics as shorthand and adopted ironically by some enthusiasts. The debate continues:

- **Against the strong version.** Researchers trained a small model only on move sequences from the board game Othello and found it had formed an internal picture of the board, which they could edit to change its moves. Similar probing finds structure tracking real-world facts in larger models; see [[Mechanistic Interpretability]]. To some, that counts as a world model.
- **For it.** Models still produce confident falsehoods, which fits text continuation better than understanding; see [[Hallucination]]. And a capability that shows up on a test may reflect test data leaking into training; see [[Benchmark Contamination]].

At minimum, the image reminds users that a model's output is a sample from a distribution. A simple [[Markov Chain]] parrots in the same sense, only badly.

## See also
- [[Scaling Laws]]
- [[Pretraining]]
- [[World Model]]
