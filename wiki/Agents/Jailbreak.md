---
aliases:
  - Jailbreaking
  - Many-shot jailbreaking
  - Adversarial suffix
tags:
  - agents
summary: Prompts crafted to make a language model ignore its safety training, how the main techniques work, and why the problem resists a complete fix.
---
A **jailbreak** is a prompt designed to get a language model to do something its developers trained it to refuse. The term comes from removing a phone's software restrictions. Jailbreaks are related to [[Prompt Injection]] but differ in who is attacking whom. In prompt injection, an outside party hides instructions in data the model processes, attacking the user. In a jailbreak, the user is the attacker, and the target is the model's own trained behavior.

Researchers group the techniques into a few families:

- **Role-play and framing.** Ask the model to play a character without rules, or to write fiction in which a character explains the forbidden thing. The "DAN" ("Do Anything Now") prompts that circulated in 2022 and 2023 were elaborate versions of this.
- **Obfuscation.** Encode the request in Base64, split it into pieces, or translate it into a language with little safety training data, so it no longer looks like a request the model learned to refuse.
- **Many-shot jailbreaking.** Described by Anthropic in 2024, it fills a long [[Context Window]] with hundreds of fake dialogues in which an assistant complies with harmful requests. [[In-Context Learning]] then overrides the safety training, and effectiveness grows with the number of examples.
- **Gradual escalation.** Multi-turn attacks start harmlessly and move a step at a time, each request only slightly beyond the last.
- **Adversarial suffixes.** In 2023 Andy Zou and colleagues used automated optimization to find strings of nonsense tokens that, appended to a request, made many models comply, and the strings often transferred between models.

A 2023 analysis by Alexander Wei and colleagues gave two root causes. Safety training competes with the model's other objectives, such as following instructions and being helpful, and attacks exploit that conflict. And safety training generalizes less widely than the model's capabilities, so the model can still understand an encoded or unusual request it was never trained to refuse.

Defenses work in layers. Training with [[Reinforcement Learning from Human Feedback]] and related methods teaches refusals. Separate classifiers, a form of [[Guardrail]], screen inputs and outputs. The [[System Prompt]] sets context, though it can't be relied on alone. Red teaming, systematic attempts to break the model before release as described under [[Adversarial Review]], finds weaknesses, and public bug bounties pay outsiders to do the same. Each layer raises the cost of an attack without making it impossible, the familiar pattern of [[Penetration Testing]].

Jailbreaks also show the limits of trained-in behavior. A model that can be talked out of a refusal can be talked into other things, and the same pliability shows up as [[Sycophancy]]. For an agent, the safer design limits what any output can do through an [[Agent Sandbox]] and [[Human in the Loop]] approval, so a successful jailbreak is contained.

## See also
- [[Adversarial Example]]
- [[Guardrail]]
- [[Activation Steering]]
- [[Sycophancy]]
