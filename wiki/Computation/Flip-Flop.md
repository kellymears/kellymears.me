---
aliases:
  - Latch
  - D flip-flop
  - Metastability
tags:
  - computation
summary: A circuit with two stable states that stores a single bit, built by feeding logic gates back into each other, and the basic memory element behind registers, counters and every clocked digital system.
---
A **flip-flop** is a digital circuit that stores one bit. Ordinary logic gates are forgetful: their output depends only on their present inputs; see [[Boolean Algebra]]. Wire two gates so that each one's output feeds the other's input, and the circuit gains a second property. It settles into one of two stable states and stays there after the inputs that put it there go away. That feedback loop is the origin of memory in digital hardware.

The idea predates computers. In 1918 the physicists William Eccles and F. W. Jordan described a circuit of two vacuum tubes that would hold either of two states until triggered to switch, which they called a trigger relay. Early electronic computers used tube flip-flops for their working registers, and every processor since has relied on transistor versions; see [[Semiconductor]].

The simplest form is the **SR latch**, two cross-coupled NOR or NAND gates with a "set" input that stores a 1 and a "reset" input that stores a 0. A **gated D latch** adds a data input and an enable signal: while enabled, the output follows the data; when disabled, it holds the last value. A **D flip-flop** refines this so that it samples its input only at an instant, the rising edge of a clock pulse, and ignores changes at all other times; see [[Clock Signal]].

Edge triggering is what makes large synchronous designs possible. Every flip-flop in a chip captures its input at the same tick, logic between them computes the next values during the clock period, and the following tick captures the results. A row of flip-flops forms a [[Processor Register]]. Flip-flops plus logic that computes the next state form a [[Finite State Machine]]. The longest path through the logic between two flip-flops limits how fast the clock can run; see [[Instruction Pipelining]] and [[Binary Adder]].

Flip-flops have timing rules. The input must be stable for a short **setup time** before the clock edge and a **hold time** after it. Violate them, typically when a signal arrives from a part of the system running on a different clock, and the circuit can enter **metastability**, balancing between 0 and 1 for an unpredictable time before falling one way. It cannot be eliminated, only made vanishingly rare, usually by passing the signal through two or more flip-flops in a row so that it has extra time to settle; see [[Race Condition]].

The same cross-coupled structure appears in static memory, where each bit of a processor's cache is held by a pair of inverters feeding each other; see [[Dynamic Random-Access Memory]] and [[Von Neumann Architecture]]. The two stable states of a flip-flop have a perceptual counterpart in figures the eye sees one way and then the other; see [[Multistable Perception]].

## See also
- [[Binary Number]]
- [[Bitwise Operation]]
