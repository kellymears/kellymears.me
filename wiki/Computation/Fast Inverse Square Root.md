---
aliases:
  - 0x5F3759DF
  - Quake III inverse square root
tags:
  - computation
summary: A famous bit-level hack that approximates one over the square root of a number by reinterpreting a float as an integer and subtracting it from a magic constant, a staple of 1990s 3D graphics and of programming folklore.
---
**Fast inverse square root** is a short routine that approximates one divided by the square root of a floating-point number. It became famous after id Software released the source code of Quake III Arena in 2005, where readers found a function that subtracted a float's bits, treated as an integer, from the mysterious constant 0x5F3759DF, accompanied by a terse, profane comment.

The reciprocal square root is needed constantly in 3D graphics. Normalizing a vector, scaling it to length one, means dividing by its length, which is a square root. Lighting calculations normalize surface normals and light directions for every vertex or pixel; see [[Shading Model]] and [[Normal Mapping]]. In the late 1990s, square roots and divisions were slow on consumer processors, so a fast approximation mattered.

The routine works in three steps:

1. **Reinterpret** the 32-bit float's bits as an integer. Because a float stores an exponent and a fraction, its bit pattern, read as an integer, is roughly a scaled and shifted logarithm of the number; see [[Floating-Point Arithmetic]].
2. **Subtract** half of that integer from the magic constant. Halving and negating a logarithm corresponds to taking one over the square root, and the constant corrects the offset. The result, read back as a float, is a decent first guess; see [[Bitwise Operation]].
3. **Refine** the guess with one step of Newton's method, which roughly squares the accuracy and brings the error to well under 1 percent; see [[Newton's Method]].

The code's origins were a small mystery. Its authorship was widely misattributed, and later investigations traced it back through earlier work at graphics hardware and workstation companies in the late 1980s, with several engineers involved. In 2003 the mathematician Chris Lomont analyzed the constant and found that slightly different values give marginally better results after the Newton step.

The routine is no longer the fastest option. Processors gained dedicated reciprocal square root instructions, and graphics hardware computes these in its shader units; see [[SIMD]], [[Instruction Set Architecture]], and [[Graphics Processing Unit]]. The original trick also reads a float's memory as an integer through a pointer cast, which modern C and C++ treat as undefined behavior; see [[Undefined behavior]]. Today it's mostly a teaching example.

Its lasting appeal is as folklore. It captures a period when game programmers squeezed hardware with clever tricks, a culture shared with the demoscene and with engines such as Doom's; see [[Demoscene]] and [[Doom Engine]]. It also shows how a well-chosen approximation plus a correction step can beat exact computation. Copying it into code today, though, is usually a case of optimizing without measuring; see [[Premature Optimization]].

## See also
- [[Quaternion]]
- [[Code Comment]]
