---
aliases:
  - Self-hosting
  - Self-hosting compiler
  - Diverse double-compiling
tags:
  - computation
summary: Writing a compiler in the language it compiles, which requires some earlier compiler to build the first version, a chicken-and-egg arrangement that's become a rite of passage for new languages and a deep question about trusting the tools that build software.
---
**Bootstrapping** a compiler means writing it in the language it compiles. A compiler that can compile its own source code is called **self-hosting**. That raises an obvious puzzle: if the compiler for a new language is written in that language, what compiles it the first time? The name comes from the impossible image of lifting oneself by one's own bootstraps, the same image behind "booting" a computer.

The usual answer is staging. The first compiler is written in some existing language, or in assembly, and supports only enough of the new language to write a compiler in; see [[Compiler]] and [[Assembly Language]]. That stage-zero compiler builds a version written in the new language. From then on, each release is compiled by the one before it, and the original scaffolding can be discarded. Rust's first compiler was written in OCaml before being rewritten in Rust; Go's compiler moved from C to Go in 2015. Lisp had an unusual start: John McCarthy described an evaluator for Lisp written in Lisp as a theoretical exercise, and Steve Russell hand-translated it into machine code, producing a working interpreter; see [[Lisp]] and [[Interpreter]].

Self-hosting is considered a milestone for a language for practical reasons. Compiling a compiler is a demanding test, exercising much of the language on a large, real program. The language's own developers spend their days writing in it, so they feel its rough edges first. And contributors can improve the compiler without learning a second language.

It also creates a dependency that runs backward forever. Building a self-hosted compiler from source requires an existing binary of it, which was built by an older binary, and so on back to the stage-zero compiler that may no longer exist. A language community that wants to rebuild from scratch, for example to port to a new processor, has to cross-compile or reconstruct the chain; see [[Intermediate Representation]].

Ken Thompson drew out the security consequence in a 1984 lecture, "Reflections on Trusting Trust." A compiler could be modified to insert a backdoor into the login program and to reinsert its own modification whenever it compiled a clean copy of the compiler's source. After one round, the source could be entirely clean and the attack would persist in every binary descended from the compromised one. Reading source code can't detect it; see [[Reproducible Build]] and [[Quine]], since the trick is a cousin of a program that prints itself.

The main defense, **diverse double-compiling**, described by David A. Wheeler, compiles the compiler's source with an independent, trusted compiler and checks that the result matches bit for bit once it's used to rebuild itself. Some projects now pursue full-source bootstrapping, starting from a seed binary small enough to audit by hand; see [[Supply Chain Security]] and [[Turing Completeness]].

## See also
- [[Metaprogramming]]
- [[Lexical Analysis]]
