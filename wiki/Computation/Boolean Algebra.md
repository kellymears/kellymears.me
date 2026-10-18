---
aliases:
  - Logic gate
  - De Morgan's laws
  - Truth table
tags:
  - computation
summary: The algebra of true and false, with operations AND, OR, and NOT, which George Boole invented to describe reasoning and Claude Shannon showed could describe switching circuits, making it the foundation of digital hardware.
---
**Boolean algebra** is the algebra of two values, true and false, often written 1 and 0. Its basic operations are AND, which is true only when both inputs are true; OR, which is true when at least one is; and NOT, which flips a value. Every digital computer is built from physical devices that carry out these operations.

George Boole introduced the system in 1847 and developed it in *The Laws of Thought* in 1854, aiming to express reasoning as calculation. Variables stood for classes or propositions, and logical arguments became equations to solve.

In 1937 Claude Shannon, then a master's student at MIT, showed that circuits of relays and switches obey exactly Boole's rules: switches in series act like AND, switches in parallel act like OR. Circuit design could be done with algebra rather than trial and error. His thesis is often called the most important master's thesis of the century; see [[Information Theory]] for his later work.

Some identities are used constantly:

- **De Morgan's laws.** NOT (a AND b) equals (NOT a) OR (NOT b), and NOT (a OR b) equals (NOT a) AND (NOT b). Programmers use them to simplify conditions and to rewrite negated tests.
- **Distribution.** AND distributes over OR, as multiplication does over addition, and, unlike ordinary arithmetic, OR also distributes over AND.

A **truth table** lists the output for every combination of inputs. Any truth table can be built from AND, OR, and NOT, and in fact from NAND alone, or NOR alone, which is why chips can be made from millions of copies of a single kind of gate. In hardware, each **logic gate** is a few transistors; see [[Semiconductor]]. Gates combine into adders, which add binary numbers, and into circuits with feedback that remember a bit, the basis of registers and memory; see [[Finite State Machine]] and [[Von Neumann Architecture]].

Software uses Boolean algebra at every level. Conditions in `if` statements are Boolean expressions, and many languages evaluate them lazily, skipping the second half of "a AND b" when a is false; see [[Lazy Evaluation]]. The same operations applied to every bit of a number at once are [[Bitwise Operation]]s. Search queries combine terms with AND and OR over an [[Inverted Index]]. Testing standards measure whether each part of a compound condition has been exercised; see [[Modified Condition Decision Coverage]].

Some problems about Boolean formulas are hard. Deciding whether any input makes a formula true is the first problem proved NP-complete; see [[Boolean Satisfiability Problem]]. In pure [[Lambda Calculus]], even true and false can be defined as functions.

Databases add a third value, unknown, which breaks some familiar laws; see [[Null]].

## See also
- [[Bloom Filter]]
- [[Turing Completeness]]
