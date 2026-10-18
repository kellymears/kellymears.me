---
aliases:
  - Difference Engine
  - Note G
tags:
  - computation
summary: Charles Babbage's design for a general-purpose mechanical computer, never built, with a separate processor and memory, punched-card programs, and loops, for which Ada Lovelace wrote what is often called the first program.
---
The **Analytical Engine** was a general-purpose mechanical computer designed by the English mathematician Charles Babbage from 1834 until his death in 1871. It was never built, but its design contained most of the parts of a modern computer a century before electronics made one practical; see [[Von Neumann Architecture]].

Babbage came to it through an earlier machine. Navigational and actuarial tables were computed by hand by rooms of clerks, and they were full of errors. His **Difference Engine**, begun in the 1820s, would compute polynomial tables using only addition, by the method of finite differences, and print the results directly to avoid copying mistakes. The government funded it for years, but the engineering outran the workshops of the time and the project stalled with only a fragment finished. In 1991 the Science Museum in London completed a Difference Engine No. 2 from Babbage's later drawings, using tolerances achievable in his era, and it worked.

The Analytical Engine went further. Instead of one fixed calculation, it would perform any sequence of operations:

- **The store** held numbers in columns of geared wheels, a memory. It worked in decimal, each wheel holding one digit; see [[Binary Number]].
- **The mill** did arithmetic on numbers brought from the store, a processor.
- **Punched cards** supplied the program, an idea borrowed from the Jacquard loom, which used chains of cards to weave patterned silk.
- **Conditional branching and loops** let the machine repeat a sequence of cards or skip ahead depending on a result; see [[Structured Programming]].

Given unlimited memory, those features would make it equivalent to any modern computer; see [[Turing Completeness]].

The machine is best known through Ada Lovelace. In 1843 she translated an article on the Engine by the Italian engineer Luigi Menabrea and added notes about three times its length. The last, **Note G**, laid out step by step how the Engine would compute Bernoulli numbers, a table of operations and variables often called the first published computer program. Historians still argue over how much of the mathematics was hers and how much Babbage's, but the notes' wider vision is her own. She suggested the Engine could act on anything whose relations could be expressed as symbols, perhaps composing music, while insisting it could only do what it was told and could not originate anything. Alan Turing answered that claim in 1950 as "Lady Lovelace's Objection"; see [[Turing Test]].

The design also met problems still familiar. Babbage devised an "anticipating carriage" to carry tens across many digits at once instead of one wheel at a time, an early fight for speed. He also spent decades redesigning rather than finishing, and the project became a cautionary tale about scope; see [[Second-System Effect]].

## See also
- [[Enigma Machine]]
- [[Moore's Law]]
- [[Spreadsheet]]
- [[Assembly Language]]
- [[Punched Card]]
