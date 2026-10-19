---
aliases:
  - Overflow
  - Two's complement
  - Wraparound
  - Year 2038 problem
  - Y2038
  - Kill screen
tags:
  - computation
summary: What happens when an integer grows past the largest value its fixed number of bits can hold, usually wrapping silently around to a small or negative number.
---
**Integer overflow** happens when an arithmetic result is too large, or too negative, to fit in the fixed number of bits used to store it. An 8-bit unsigned integer holds 0 to 255, so 255 + 1 can't be stored. On most hardware the value wraps around to 0, like a car's odometer rolling over. Signed integers usually use *two's complement*, in which the top bit carries a negative weight, so adding 1 to the largest 32-bit value, 2,147,483,647, wraps to −2,147,483,648.

The danger is that overflow is usually silent. The program carries on with a wildly wrong number, a [[Silent Failure]], and nothing reports it until something downstream behaves strangely. In C and C++, signed overflow is *undefined behavior*: the compiler may assume it never happens and optimize accordingly, sometimes deleting the very check meant to catch it.

Overflow has caused a long list of failures:

- **Ariane 5 (1996).** About 37 seconds after launch, the rocket's guidance software converted a 64-bit floating-point velocity to a 16-bit signed integer. The value didn't fit, the conversion failed, the guidance system shut down, and the rocket destroyed itself. The code had been reused from Ariane 4, whose slower trajectory never produced such large values.
- **Boeing 787 (2015).** A counter in the electrical system, counting hundredths of a second, would overflow after 248 days of continuous power and shut down the generators, so aviation authorities ordered aircraft to be power-cycled regularly.
- **Pac-Man's level 256.** The level counter was a single byte, and the fruit-drawing routine overflowed at level 256, scrambling half the screen into an unwinnable *kill screen*. Glitches like this are a staple of [[Speedrun]] routes and [[Emulation]] research.

The **Year 2038 problem** is the next big one. Systems that store Unix time, seconds since 1970, in a signed 32-bit integer overflow at 03:14:07 UTC on January 19, 2038, jumping back to December 1901. Most modern systems use 64-bit time, but embedded devices and old file formats remain, alongside the date pitfalls described in [[Time Zone]].

Overflow is also a security problem. A miscalculated buffer size that wraps to a small number leads to a tiny allocation followed by a large write, a classic route to memory corruption. [[Fuzzing]] and [[Static Analysis]] are good at finding these.

Defenses include using wide enough types, checked arithmetic that reports overflow, and saturating arithmetic that clamps at the maximum. A famous bug in [[Binary Search]], computing the midpoint as `(low + high) / 2`, overflowed for arrays of over a billion elements, a reminder to test at the edges, as in [[Boundary Value Analysis]]. [[Floating-Point Arithmetic]] has the related problem of lost precision.

## See also
- [[Schiaparelli Lander Crash]]
- [[Zune Leap Year Bug]]
- [[Endianness]]
- [[Decimal Arithmetic]]
- [[Patriot Missile Failure]]
- [[Disk Partition]]
