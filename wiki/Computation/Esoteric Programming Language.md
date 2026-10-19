---
aliases:
  - Esolang
  - Brainfuck
  - Turing tarpit
  - Code golf
tags:
  - computation
summary: A programming language designed as a joke, a puzzle, or an art piece rather than for practical use, from INTERCAL to Brainfuck to programs written as paintings, which tests how little a language needs.
---
An **esoteric programming language**, or esolang, is one designed to explore an idea, make a joke, or pose a challenge rather than to be used for real work. Some are deliberately hard to program in, some are minimal to the point of absurdity, and some are works of conceptual art. They reach into computer science because building a language with almost nothing in it shows what computation actually requires.

The first is usually dated to **INTERCAL** (1972), by Don Woods and James Lyon, a parody of the languages of its day. A program must say PLEASE often enough or the compiler rejects it as insufficiently polite, and not too often, or it is rejected as excessively polite. Later versions added a COME FROM statement to mock the arguments over GOTO; see [[Structured Programming]].

The best known is **Brainfuck** (1993), by Urban Müller, which has eight single-character commands: move a pointer left or right along a tape of cells, increment or decrement the current cell, read or write a byte, and begin or end a loop. Müller aimed for the smallest possible compiler, and the original fit in about 240 bytes. Despite having almost nothing, it can compute anything a conventional language can, and its tape and pointer are close to Turing's original machine; see [[Turing Completeness]].

Alan Perlis warned of the **Turing tarpit**, "in which everything is possible but nothing of interest is easy." Esolangs live there on purpose.

Families of esolangs:

- **Minimalist.** Languages with a single instruction, or built from a couple of combinators, showing how little is needed; see [[Lambda Calculus]]. Some simple [[Cellular Automaton]] rules are also universal.
- **Hostile.** Malbolge (1998) scrambles each instruction after it runs and was designed to be as hard as possible. The first working program was found two years later by a search program, not written by a person.
- **Strange syntax.** Whitespace uses only spaces, tabs, and newlines, so its programs look blank. Befunge runs on a two-dimensional grid where the instruction pointer can travel in any direction.
- **Artistic.** Piet programs are abstract paintings whose color changes encode instructions. Shakespeare reads like a play, and Chef like a recipe.

Esolangs overlap with **code golf**, the competition to solve a problem in the fewest characters, which spawned languages designed purely for brevity, and with the size-limited intros of the [[Demoscene]]. Writing an [[Interpreter]] for Brainfuck is a common exercise, as is writing a [[Quine]] in each new language.

Their value goes beyond play: stripping out readable syntax, named variables, and structured control shows how much ordinary languages depend on them. The International Obfuscated C Code Contest, run since 1984, applies the same spirit to an ordinary language; see [[Kolmogorov Complexity]] for the theory of shortest programs.

## See also
- [[Compiler]]
- [[Kernighan's Law]]
- [[Analytical Engine]]
- [[Collatz Conjecture]]
- [[Assembly Language]]
