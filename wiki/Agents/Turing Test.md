---
aliases:
  - Imitation game
  - Chinese room
  - CAPTCHA
tags:
  - agents
summary: Alan Turing's 1950 proposal to replace "can machines think?" with whether a machine can pass for human in conversation, the objections it drew, and why language models made it both easier to pass and less informative.
---
The **Turing test** is a thought experiment Alan Turing proposed in 1950, in a paper titled "Computing Machinery and Intelligence." Rather than argue over the question "Can machines think?", which he considered too vague to answer, he proposed a game. A judge holds typed conversations with two hidden parties, one human and one machine, and tries to tell which is which. If the judge can't reliably tell, the machine has done well at the **imitation game**.

Turing's move was to swap a question about inner experience for one about behavior that could actually be observed. He predicted that by about 2000 machines would fool an average judge 30 percent of the time after five minutes, and he answered objections in advance: that machines can only do what they are told, that they can't be creative, that thinking requires a soul.

The best-known reply came in 1980 from the philosopher John Searle. In his **Chinese room**, a person who speaks no Chinese sits in a room with a rulebook for manipulating Chinese symbols. Messages come in, the person follows the rules, and fluent replies go out. To outsiders the room understands Chinese, yet nobody inside does. Searle's point was that following rules over symbols, which is what programs do, isn't enough for understanding. Critics answered that the whole system, room plus rulebook, might understand even if the person doesn't. The argument is still unsettled; see [[Theory of Mind]] and [[Extended Mind]].

For decades the test mostly measured judges' gullibility. Programs that "passed" competitions did it with tricks: playing a teenager whose odd answers seemed natural, deflecting, joking, making typos on purpose; see [[ELIZA Effect]].

[[Large Language Model]]s changed this. In controlled studies around 2024–2025, people chatting with recent models for a few minutes picked the human little better than chance, and sometimes picked the model as the human more often than the real person. That made the test less useful rather than settled. Passing showed that fluent, human-sounding text is achievable, not that whoever produced it reasons, knows things, or tells the truth; see [[Hallucination]] and [[Sycophancy]]. Most researchers now evaluate models with task benchmarks instead; see [[Evaluation Harness]] and [[Benchmark Contamination]].

The test has an everyday inverse. A **CAPTCHA**, short for "Completely Automated Public Turing test to tell Computers and Humans Apart," has a machine judging whether a human is present. As models learned to read distorted text and label images, CAPTCHAs moved to tracking mouse movement and browsing history, a shift toward watching behavior instead of testing ability; see [[Browser Fingerprinting]] and [[Computer Use]].

The deeper question Turing set aside, whether anything is going on inside, is now argued over in [[Mechanistic Interpretability]] research, which tries to see what models actually compute.

## See also
- [[Artificial General Intelligence]]
- [[Deceptive Alignment]]
- [[Natural Language Processing]]
- [[Stochastic Parrot]]
