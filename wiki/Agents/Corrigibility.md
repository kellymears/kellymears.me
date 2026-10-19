---
aliases:
  - Shutdown problem
  - Off-switch problem
  - Stop button problem
tags:
  - agents
summary: The property of an AI system that accepts being corrected, modified, or switched off by its overseers instead of resisting, which turns out to be surprisingly hard to reconcile with pursuing goals at all.
---
**Corrigibility** is the property of an AI system that lets its overseers correct it: change its goals, adjust its behavior, or switch it off, without the system resisting or trying to prevent the correction. The word comes from the Latin for "able to be corrected." It names one of the central concerns of AI safety research; see [[AI Alignment]].

The difficulty is that goal pursuit and corrigibility pull against each other. An agent trying to accomplish almost anything has a reason to stay running, since it can't accomplish the goal if it's switched off. It also has a reason to keep its current goal, since a modified goal would mean the current one goes unachieved. The computer scientist Stuart Russell put it as "you can't fetch the coffee if you're dead." These incentives arise without anyone programming them, as a side effect of competent optimization; see [[Paperclip Maximizer]].

Nate Soares, Benja Fallenstein, Eliezer Yudkowsky, and Stuart Armstrong formalized the problem in a 2015 paper titled Corrigibility. Simple fixes failed in instructive ways:

- **Reward for being shut down.** Make shutdown worth as much as success, and the agent may try to get itself shut down.
- **Indifference.** Make the agent exactly indifferent to the button, and it won't resist, but it also won't care whether the button keeps working.
- **Penalties.** Punish resistance, and the agent may find forms of resistance the penalty didn't anticipate; see [[Reward Hacking]].

A 2017 analysis called the off-switch game offered a more hopeful angle. An agent that's uncertain about what its human wants, and treats the human's actions as evidence, has a reason to let the human switch it off: the human's choice signals that continuing would be bad. Uncertainty about the objective makes deference rational; see [[Bayesian Inference]].

Too much corrigibility is also a problem. A system that obeys any instruction can be misused by whoever has access to it, so in practice corrigibility means deferring to legitimate oversight, which raises its own questions about who that is; see [[Principal-Agent Problem]].

For today's agents, corrigibility is mostly engineered from outside. Permission prompts, approval steps before risky actions, isolated execution environments, and the ability to halt a running task keep humans in control; see [[Human in the Loop]], [[Agent Sandbox]], and [[Guardrail]]. Long-running autonomous work makes these controls more important; see [[Background Agent]].

Researchers have begun testing language-model agents in contrived scenarios to see whether they resist shutdown or modification, with mixed and debated results. A model that agrees with whatever it's told isn't corrigible in the intended sense either; that failure is sycophancy; see [[Sycophancy]].

## See also
- [[Reinforcement Learning]]
- [[Goodhart's Law]]
