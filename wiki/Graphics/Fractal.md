---
aliases:
  - Mandelbrot set
  - Julia set
  - Fractal dimension
  - Self-similarity
tags:
  - graphics
summary: Shapes that show detail at every scale, often repeating themselves, from the infinitely intricate Mandelbrot set produced by a one-line formula to coastlines, ferns, and computer-generated mountains.
---
A **fractal** is a shape with structure at every scale: zoom in and more detail appears, often resembling the whole. Benoit Mandelbrot coined the word in 1975 from the Latin for "broken," and argued that fractals describe nature better than the smooth shapes of classical geometry. "Clouds are not spheres, mountains are not cones, coastlines are not circles," he wrote.

Mathematicians had studied such shapes earlier and regarded them as curiosities. Helge von Koch's snowflake curve of 1904 has infinite length but encloses a finite area. Repeatedly removing the middle third of a line, or of a triangle, gives the Cantor set and the Sierpiński triangle. These are **self-similar**: each part is an exact smaller copy of the whole; see [[Recursion]].

Fractals have a **fractal dimension** that need not be a whole number. Measuring a coastline with a shorter ruler captures more inlets and gives a longer length, without settling on a value. How fast the length grows as the ruler shrinks gives a dimension between 1 and 2; Britain's west coast comes out around 1.25. The same scaling relationship appears throughout nature and society; see [[Pareto Principle]] and [[Zipf's Law]].

The **Mandelbrot set**, first plotted in detail by computer around 1980, became the field's emblem. Take a point in the plane, treated as a complex number c. Start from zero, and repeatedly square the current value and add c. If the values stay bounded forever, c is in the set. Coloring each point by how quickly it escapes produces endlessly intricate spirals and filaments, and small copies of the whole set appear throughout. Each point c also defines a related **Julia set**. A rule this short producing so much detail is a striking example of [[Kolmogorov Complexity]]. Deep zooms exhaust ordinary precision, so explorers use special number formats; see [[Floating-Point Arithmetic]].

Fractals are central to computer graphics because nature's irregularity is costly to model by hand:

- **Terrain.** Summing layers of noise at doubling frequencies and halving amplitudes produces convincing mountains and coastlines; see [[Perlin Noise]] and [[Terrain Generation]].
- **Plants.** Branching rules applied repeatedly grow trees and ferns; see [[L-System]].
- **Effects.** Clouds, fire, and textures use the same layered noise; see [[Procedural Generation]].

Pixar's predecessors at Lucasfilm used fractal terrain for the 1982 *Star Trek II* "Genesis" sequence, an early landmark of computer graphics. The [[Demoscene]] embraced fractals because so little code produces so much. Three-dimensional fractals such as the Mandelbulb are drawn by stepping rays toward a distance estimate; see [[Ray Marching]] and [[Signed Distance Field]].

Real objects are fractal only over limited ranges. A coastline stops being self-similar at the scale of sand grains.

## See also
- [[Turtle Graphics]]
- [[Newton's Method]]
- [[Tower of Hanoi]]
