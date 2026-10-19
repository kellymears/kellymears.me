---
aliases:
  - Reflected binary code
tags:
  - computation
summary: An ordering of binary numbers in which consecutive values differ in exactly one bit, so a reading taken mid-change is never wildly wrong, used in position sensors, chip design, and logic simplification.
---
**A Gray code** orders binary numbers so that each value differs from the next in exactly one bit. Counting from 0 to 7 in ordinary binary sometimes flips three bits at once, as in going from 011 to 100. In a Gray code the sequence runs 000, 001, 011, 010, 110, 111, 101, 100, and every step changes a single bit; see [[Binary Number]].

It's named for Frank Gray of Bell Labs, who patented it in the 1940s for a vacuum tube that converted analog signals to digital, calling it **reflected binary code**. Émile Baudot had used the same idea in telegraphy in the 1870s; see [[Telegraph]]. The name describes the construction: take the list for n bits, append a mirror-image copy, put 0 in front of the first half and 1 in front of the second. Converting a binary number to Gray code takes one step: combine it with itself shifted right by one, using exclusive or; see [[Bitwise Operation]].

The problem it solves is reading a value while it changes. Physical bits never flip at precisely the same instant. A sensor reporting a dial's position in ordinary binary, caught between 3 and 4, might briefly read any mix of old and new bits, such as 111, which is 7. In Gray code only one bit is changing, so a mid-transition reading is either the old value or the new one, never something unrelated.

That makes it standard in several places:

- **Rotary encoders**, which report the angle of a shaft or knob through a pattern of tracks on a disk.
- **Clock domain crossings in chips.** When a counter is passed between circuits running on different clocks, the receiver may sample it mid-change. Gray-coded pointers make that harmless, which is how hardware queues between clock domains work; see [[Clock Signal]] and [[Race Condition]].
- **State machines.** Encoding states so that common transitions flip one bit reduces glitches and power use; see [[Finite State Machine]].
- **Karnaugh maps**, a pencil-and-paper method for simplifying logic, arrange rows and columns in Gray order so that adjacent cells differ in one variable; see [[Boolean Algebra]].

Geometrically, a Gray code is a path that visits every corner of a cube, or of its higher-dimensional versions, exactly once, moving along one edge at a time. It also turns up in puzzles. The disk moved at each step of the optimal [[Tower of Hanoi]] solution matches the bit that changes in the Gray code, and the old Chinese rings puzzle follows the same pattern.

Gray codes protect against one kind of error, ambiguity during a transition, not corrupted bits in storage or transmission; that's the job of an [[Error-Correcting Code]]. Both share the measure of how many bits separate two codes; see [[Information Theory]].

## See also
- [[Caesar Cipher]]
- [[Flip-Flop]]
- [[De Bruijn Sequence]]
- [[Space-Filling Curve]]
