---
aliases:
  - Creative coding
  - Algorithmic art
  - Pen plotter
tags:
  - graphics
summary: Art made by designing a system, such as a program, a set of rules, or a process, and letting it produce the work, practiced since the earliest computer graphics and spanning plotter drawings, live-coded visuals, and arguments about authorship.
---
**Generative art** is art made by setting up a system that produces the work with some degree of autonomy. The artist designs rules, a program, or a process, and the system makes the final piece. Often the rules include randomness, so running the same system again yields a different, related result.

The idea predates computers. Composers used dice games to assemble music in the eighteenth century. In the 1960s conceptual artist Sol LeWitt wrote instructions for wall drawings that others carried out, so the idea was the artwork and each execution a variation. Swiss and Bauhaus design traditions favored systematic grids and rules; see [[Bauhaus]].

Computer art arrived in the mid-1960s. Georg Nees and Frieder Nake in Germany and A. Michael Noll in the United States exhibited plotter drawings made from programs in 1965. Vera Molnár, who had been making systematic drawings by hand, began working with computers in 1968 and continued for more than five decades. **Pen plotters**, machines that move a pen over paper under computer control, produced most early work, and the medium has seen a revival; see [[Vector Graphics]]. Harold Cohen built a program called AARON, starting around 1973, that made drawings on its own and evolved over decades.

Common techniques include:

- **Noise.** Smooth random fields create organic textures, flow lines, and terrain; see [[Perlin Noise]].
- **Rules and growth.** Simple local rules repeated many times produce complex patterns; see [[Cellular Automaton]] and [[L-System]].
- **Agents.** Many small actors, each following simple behaviors, trace paths that build an image; see [[Boids]].
- **Geometry.** Recursive subdivision, tilings, and partitions of the plane; see [[Fractal]].
- **Controlled randomness.** Seeds make a random system reproducible, so a chosen output can be regenerated exactly; see [[Seeded Randomness]].

The term **creative coding** covers the community and tools that grew around programming as an artistic medium. Processing, created by Casey Reas and Ben Fry in 2001, made graphics programming approachable for artists and designers, and inspired p5.js and others. Shader artists write entire images as programs run per pixel; see [[Shader]]. The demoscene, which turned real-time graphics into competitive art, overlaps heavily; see [[Demoscene]]. Many generative artists started with turtle drawings; see [[Turtle Graphics]].

Generative art drew mainstream attention around 2021, when platforms sold algorithmic works as blockchain tokens, with each buyer receiving an output generated from a unique seed. The market boomed and then contracted.

Image generators driven by machine learning raised sharper questions about authorship. In earlier generative art, the artist wrote the system. With large trained models, the system encodes the work of many other artists, and the person's role shrinks to a prompt; see [[Diffusion Model]] and [[Death of the Author]].

## See also
- [[Domain Warping]]
- [[Blue Noise]]
