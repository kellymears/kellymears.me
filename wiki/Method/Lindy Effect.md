---
aliases:
  - Lindy
  - Lindy's Law
  - Boring technology
tags:
  - method
summary: The heuristic that for things that don't age physically, such as books, ideas, and technologies, every year survived adds to the expected years remaining, so the old tends to outlast the new.
---
The **Lindy effect** is the idea that for things that don't wear out, such as ideas, books, technologies, and institutions, the longer something has already lasted, the longer it's likely to keep lasting. A book that has been in print for 50 years is likely to stay in print for roughly another 50; one published last year may be forgotten next year.

The name comes from Lindy's, a New York delicatessen where comedians gathered in the 1960s. Writer Albert Goldman observed in 1964 that a comedian's remaining career was proportional to how much material they'd already used up on television. Mathematician Benoit Mandelbrot formalized the idea, and Nassim Nicholas Taleb popularized it in his 2012 book *Antifragile*, restricting it to non-perishable things.

The contrast is with things that age. A person's or a machine's remaining life expectancy *shrinks* as it gets older. For non-perishable things, survival is evidence of robustness: whatever could have killed it had many chances and didn't, so it has probably survived for a reason.

The effect follows when lifespans have a heavy-tailed distribution, where most new things die young and a few last for a very long time; see [[Pareto Principle]]. Under that kind of distribution, having already survived a long time puts something in the long-lived group.

In software, the Lindy effect is one argument for choosing mature, well-understood tools:

- **SQL, Unix, C, and plain text** have lasted for decades and are good bets to last decades more; see [[Relational Database]] and [[Markdown]].
- **New frameworks** mostly don't last. Choosing one is a bet that it will, with real costs if it doesn't; see [[Dependency Hell]] and [[Technical Debt]].
- **Mature tools have known failure modes.** Their problems have been found, documented, and worked around. New ones still hold many surprises.

The engineer Dan McKinley's essay *Choose Boring Technology* makes the same case: each team has a few "innovation tokens," so spend them only where novelty pays.

The limits are real, and worth stating plainly. The Lindy effect is a probabilistic tendency, not a law; old things do disappear, and the age of a thing says nothing about whether it's good. Survival may reflect lock-in rather than quality; see [[Path Dependence]] and [[Survivorship Bias]]. Applied mechanically, it becomes an excuse to reject anything new, and every long-lived technology was once new.

It pairs with [[Chesterton's Fence]], which counsels understanding why something old exists before removing it, and with [[Gall's Law]], which says working complex systems grow from working simple ones.

## See also
- [[Technology Radar]]
- [[Diffusion of Innovations]]
- [[Bathtub Curve]]
- [[Radioactive Decay]]
- [[Public Domain]]
- [[Fax]]
