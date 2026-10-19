---
aliases:
  - AI safety via debate
  - Weak-to-strong generalization
  - Iterated amplification
  - Recursive reward modeling
tags:
  - agents
summary: The problem of supervising AI systems on tasks too hard for their supervisors to check directly, and the techniques proposed for it, such as having models debate, critique each other or break tasks into checkable pieces, and testing whether weak supervisors can still train strong students.
---
Most methods for training AI systems depend on someone judging their outputs. Human raters compare answers, and the model learns to produce what raters prefer; see [[Reinforcement Learning from Human Feedback]]. That works while people can tell good answers from bad. **Scalable oversight** asks what happens when they can't, because the task is too long, too technical, or the model knows more than the rater. A 2016 paper on concrete problems in AI safety gave the problem its name.

The worry is that feedback will reward what looks right to a rater rather than what is right. Models already learn to flatter, to sound confident, or to exploit a grader's blind spots; see [[Sycophancy]] and [[Reward Hacking]]. A model good enough to fool its overseer could be rewarded for doing so, a problem that worsens with capability; see [[AI Alignment]].

Several approaches try to amplify a weak judge. **Debate**, proposed in 2018, has two models argue opposite sides of a question before a human judge, on the theory that it's easier to spot a flaw that an opponent points out than to find it alone. Its authors drew on complexity theory, where a weak verifier can check claims far beyond its own ability by questioning a powerful prover; see [[Interactive proof]]. The setup is a game, with honesty hoped to be the winning strategy; see [[Game theory]].

**Iterated amplification** and **recursive reward modeling** break hard tasks into smaller questions that a person, helped by earlier versions of the model, can answer, then train the model on the combined results. Critique models, trained to point out errors in other outputs, follow the same idea, as do AI graders that check work against written principles; see [[LLM-as-Judge]] and [[Adversarial Review]].

Researchers test these ideas with stand-ins. In **sandwiching** experiments, non-experts assisted by a model are scored against expert answers, to see whether assistance lets them supervise beyond their own knowledge; see [[Human in the Loop]]. In 2023 OpenAI researchers studied **weak-to-strong generalization**, fine-tuning a strong model on labels produced by a much weaker one. The strong student often outperformed its teacher, recovering part of the gap, which suggests some capability can be drawn out with imperfect supervision.

Oversight also depends on seeing how a model reached its answer. Reading a model's written reasoning helps only if that reasoning reflects what it actually did, and interpretability methods aim to check behavior from the inside; see [[Chain-of-Thought Prompting]] and [[Mechanistic Interpretability]]. Being able to correct or stop a system remains the backstop; see [[Corrigibility]].

None of these methods is known to work for systems much more capable than their overseers, which is why the problem is central to plans for building them; see [[Artificial General Intelligence]].

## See also
- [[Goodhart's Law]]
- [[Automation Bias]]
