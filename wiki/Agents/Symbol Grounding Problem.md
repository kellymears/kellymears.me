---
aliases:
  - Symbol grounding
  - Grounding problem
tags:
  - agents
summary: The question of how symbols in a system get their meaning, rather than only being defined by other symbols, posed for classic AI in 1990 and revived by language models that learn from text alone, with answers ranging from sensors and bodies to the claim that structure is enough.
---
The **symbol grounding problem** asks how the symbols a system manipulates come to mean anything. A word in a dictionary is defined by other words, which are defined by still more words. Stevan Harnad, who posed the problem in 1990, compared it to learning Chinese as a first language from nothing but a Chinese-to-Chinese dictionary. You could trace definitions forever without ever reaching what any word refers to. People escape the loop because some words connect to perception and action: "red" is tied to seeing red things.

The problem was aimed at symbolic AI, whose programs manipulated tokens like CAT and ON according to rules. The tokens meant something to the programmers, but nothing in the system connected them to cats; see [[Expert System]]. John Searle's 1980 thought experiment made a similar point: a person following a rulebook to answer Chinese questions might produce perfect replies without understanding a word; see [[Chinese room]]. Harnad's proposal was a hybrid, grounding basic symbols in sensory categories learned by neural networks and building the rest by combination; see [[Neural Network]].

Language models revived the question. They learn from text alone, building meaning from which words appear together, and represent each word as a point in a space shaped entirely by other words; see [[Embedding]] and [[Word2Vec]]. Critics argue that this is the dictionary loop on an enormous scale. In 2020 Emily Bender and Alexander Koller described a hyper-intelligent octopus tapping an undersea telegraph cable between two people, learning to mimic their replies perfectly yet unable to help when one asks how to fend off a bear, because it has never encountered a bear; see [[Stochastic Parrot]]. On this view fluent text can coexist with no grip on the world, one source of confident [[Hallucination]].

Others answer that text is itself grounded, since people wrote it about the world, and that a model compressing enough of it must recover much of the world's structure. Probing studies find internal representations of things like board positions, spatial layout and time, suggesting some world modeling emerges from text alone; see [[World Model]] and [[Linear Probe]].

A practical response is to widen the input. [[Multimodal Model]]s link words to images, sound and video, and robots tie them to action and feedback. That's close to Harnad's proposal and to theories holding that human concepts are rooted in the body's interaction with its surroundings; see [[Embodied Cognition]].

The problem connects to two other old puzzles. The [[Frame Problem]] asks how a system knows which of its beliefs an action changes, and [[Moravec's Paradox]] notes that perception, the very skill grounding is meant to supply, turned out harder than reasoning. Whether grounding is necessary for meaning, or only for reliable action, is still disputed.

## See also
- [[ELIZA Effect]]
- [[Signifier]]
