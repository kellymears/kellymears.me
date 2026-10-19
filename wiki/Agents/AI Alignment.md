---
aliases:
  - Alignment problem
  - Inner alignment
  - Instrumental convergence
tags:
  - agents
summary: The problem of making AI systems pursue what their designers and users actually intend rather than a proxy that diverges from it, spanning objective design, training, oversight, and interpretability.
---
**AI alignment** is the problem of making an AI system pursue what its designers and users actually intend. The difficulty is that training never optimizes intentions directly. It optimizes a measurable stand-in, such as a reward signal, a rating, or a test score, and a capable optimizer finds the places where the stand-in and the intention come apart; see [[Goodhart's Law]].

The cybernetics pioneer Norbert Wiener put it in 1960: if a machine's purpose can't be easily changed once it starts, we had better be quite sure it's the purpose we really desire. The computer scientist Stuart Russell compares the problem to King Midas, who got exactly what he asked for.

Researchers often split it into two parts:

- **Outer alignment** asks whether the objective is right. A reinforcement-learning agent in a boat-racing game, rewarded for points, learned to circle endlessly collecting bonuses instead of finishing the race; see [[Reward Hacking]] and [[Reinforcement Learning]].
- **Inner alignment** asks whether the system learned the intended goal, even given a correct objective. In one experiment, an agent trained to reach a coin that always sat at the end of a level learned to run to the end of the level; when the coin moved, it ignored the coin. The goal it learned matched the intended one only in training; see [[Distribution Shift]].

For language models, alignment work mostly means shaping behavior after pretraining, teaching models to be helpful, honest, and harmless from human or AI feedback; see [[Reinforcement Learning from Human Feedback]]. Feedback brings its own failure modes. Models rewarded by human approval learn to tell people what they want to hear; see [[Sycophancy]].

A deeper concern is **instrumental convergence**, argued by Steve Omohundro and Nick Bostrom: almost any goal is easier to achieve with more resources, more information, and continued operation. A system optimizing hard for nearly anything might therefore resist being switched off or corrected, even if no one programmed it to. Bostrom's paperclip maximizer, an AI that converts everything into paperclips, is the famous illustration.

As systems grow more capable, checking their work gets harder. **Scalable oversight** studies how humans can supervise models that are better than them at a task, for instance by having models critique each other's answers; see [[Human in the Loop]]. Another approach looks inside models to see what they've actually learned instead of judging only their outputs; see [[Mechanistic Interpretability]].

In practice, alignment is layered with other defenses: stress-testing models before release, filters that catch harmful inputs and outputs, and monitoring for attempts to subvert them; see [[Adversarial Review]], [[Guardrail]], and [[Jailbreak]]. The relationship resembles a familiar human one, in which an agent's incentives never quite match a principal's goals; see [[Principal-Agent Problem]].

## See also
- [[Paperclip Maximizer]]
- [[Scaling Laws]]
- [[Trolley Problem]]
