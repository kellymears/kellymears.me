---
aliases:
  - Hilbert curve
  - Z-order curve
  - Morton order
  - Peano curve
tags:
  - computation
summary: A continuous curve that passes through every point of a square or cube, used in computing to lay multidimensional data along a single line so that points close in space tend to stay close in memory.
---
A **space-filling curve** is a continuous curve that passes through every point of a square, cube, or higher-dimensional region. The first was described by Giuseppe Peano in 1890, and David Hilbert published a simpler version, now called the **Hilbert curve**, in 1891. Both came as a shock to mathematicians: a one-dimensional line, drawn without lifting the pen, could cover a two-dimensional area completely.

The construction is recursive. Divide a square into four quadrants, visit them in a fixed order, then replace each quadrant with a smaller, rotated copy of the same pattern, and repeat forever; see [[Recursion]]. Each finite stage is an ordinary path through a grid. The limit of the process is the curve itself, which is continuous but so crumpled that it has no tangent anywhere, an early example of the self-similar shapes later called fractals; see [[Fractal]].

The result also unsettled ideas about dimension. A continuous map from a line onto a square shows that the points of the two can be matched up, a fact already proved for sets by Georg Cantor; see [[Cantor's Diagonal Argument]]. The curve can't be one-to-one, though: some points of the square are visited more than once.

In computing, the curves matter for a practical reason. Memory and disks are one-dimensional, but much data is not: map coordinates, image pixels, points in a simulation. Storing a grid row by row keeps horizontal neighbors together but puts vertical neighbors a whole row apart. Ordering cells along a space-filling curve instead keeps points that are near each other in space mostly near each other in memory, which helps caches and reduces disk reads; see [[Locality of Reference]].

The simplest version in practice is the **Z-order curve**, also called **Morton order** after a 1966 IBM report by Guy Morton. A cell's position along it is found by interleaving the bits of its coordinates: the first bit of x, then the first bit of y, and so on; see [[Binary Number]]. The resulting single number can be stored in an ordinary sorted index, letting a database answer two-dimensional range queries with a one-dimensional structure; see [[Database Index]].

Several familiar systems use this idea. Geographic encodings that turn latitude and longitude into a short string interleave bits the same way, so nearby places usually share prefixes; see [[Geohash]]. Graphics hardware often stores textures in a tiled, Z-ordered layout so that a small square of pixels sits in one block of memory; see [[Texture Mapping]].

The Hilbert curve preserves locality better than Z-order, because it never jumps: consecutive cells always touch. Z-order makes occasional long leaps between quadrants. The trade-off is cost, since Hilbert indices take more work to compute. Related ideas appear in tree structures that split space recursively into smaller cells; see [[Spatial Partitioning]].

## See also
- [[Gray Code]]
- [[Hash Function]]
- [[Low-Discrepancy Sequence]]
