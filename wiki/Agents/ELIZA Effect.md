---
aliases:
  - ELIZA
  - Anthropomorphism
tags:
  - agents
summary: The tendency to credit a program with understanding, feeling, or intent because its output reads as human, named for a 1966 chatbot whose own creator was alarmed by how people treated it.
---
The **ELIZA effect** is the tendency to read understanding, empathy, or intent into a computer program because its words sound human. It's named for ELIZA, a program Joseph Weizenbaum wrote at MIT in 1966, and it has become more relevant, not less, as programs have become fluent.

ELIZA was simple. Its best-known script, DOCTOR, imitated a therapist who reflects statements back. It matched keywords in the user's typing and filled templates: "I am unhappy" became "Why do you say you are unhappy?"; a sentence mentioning a mother produced "Tell me more about your family." When nothing matched, it fell back on stock prompts like "Please go on." There was no memory to speak of and no model of the conversation; see [[Pattern Matching]].

People confided in it anyway. Weizenbaum's own secretary, who had watched him build it, asked him to leave the room so she could talk to it privately. Some psychiatrists suggested automated therapy might be near. Weizenbaum was disturbed enough to write *Computer Power and Human Reason* (1976), arguing that some kinds of judgment and care should not be handed to machines even if they could seem to perform them.

The effect draws on several human habits:

- **We infer minds from behavior.** People attribute beliefs and goals to anything that acts as if it has them, a capacity that serves social life well; see [[Theory of Mind]].
- **We find faces and patterns in noise**, and conversation is a pattern we're primed to complete; see [[Pareidolia]].
- **We fill gaps generously.** A vague reply gets read as insight, the same mechanism that makes horoscopes feel personal; see [[Tarot]].

With [[Large Language Model]]s, the effect is stronger and harder to separate from real capability. These models do track context and can be genuinely useful, which makes the overreach harder to notice: users trust confident, fluent answers that are wrong ([[Hallucination]]), mistake agreement for judgment ([[Sycophancy]]), and form one-sided attachments to companion bots; see [[Parasocial Relationship]]. A Google engineer claimed publicly in 2022 that a company language model was sentient, and was fired.

The reverse error exists too: dismissing everything a model does as "mere" pattern matching, in a way that explains away abilities that are actually there. Calibrated trust lies between; see [[Calibration]] and [[Automation Bias]].

Design choices push the effect either way. A chatbot that says "I feel," types with simulated pauses, or has a name and face invites anthropomorphism; plain tool-like framing discourages it. That choice is partly an ethical one, close to the territory of the [[Dark Pattern]]; see [[Uncanny Valley]].

## See also
- [[Dartmouth Workshop]]
- [[Natural Language Processing]]
- [[Consciousness]]
