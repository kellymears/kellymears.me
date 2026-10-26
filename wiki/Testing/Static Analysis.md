---
aliases:
  - Linter
  - Linting
  - Lint
  - SAST
  - Taint analysis
  - Rice's theorem
tags:
  - testing
summary: Finding bugs by examining code without running it, from linters and type checkers to deep security analysis, always trading missed bugs against false alarms.
---
**Static analysis** examines source code, or compiled code, without running it, looking for bugs, style problems, and security flaws. Tests check what a program does on particular inputs. Static analysis reasons about what it could do on *any* input. The name *lint* comes from a 1978 Unix tool by Stephen Johnson that flagged suspicious C constructs the compiler accepted, picking fluff off code like a lint roller, and the word stuck for the whole category.

The range is wide:

- **Linters** catch likely mistakes and enforce conventions: unused variables, shadowed names, missing `await`, comparisons that are always true. ESLint, Ruff, and Clippy are typical.
- **Type checkers** verify that values are used consistently. The [[Compiler]] for a statically typed language is a static analyzer, and tools like TypeScript and mypy add the same checking to dynamic languages, often with [[Type Inference]] filling in what the programmer left out.
- **Dataflow and taint analysis** tracks values through a program. Taint analysis follows untrusted input to dangerous places, such as user text reaching an HTML page unescaped, the root of [[Cross-Site Scripting]]. In security this is called SAST, static application security testing.
- **Deep analyzers** such as Coverity and Infer reason across functions to find null dereferences, resource leaks, and [[Race Condition]] bugs.

There is a hard limit. **Rice's theorem** (1953) proves that every nontrivial question about a program's behavior is undecidable in general, a consequence of the halting problem. So every analyzer must compromise. A *sound* analyzer never misses a bug of the kind it targets but raises false alarms. A *complete* analyzer reports only real bugs but misses some. Most practical tools choose neither, aiming for a useful balance. Formal Verification pushes toward full proof at much higher cost, and [[Design by Contract]] gives analyzers more intent to check against.

False positives are the practical problem. Developers who see too many stop reading warnings, then start suppressing them wholesale, the same erosion described in [[Broken Windows Theory]]. Successful deployments keep the signal high: run fast checks in the editor, block on a small set of reliable rules in [[Continuous Integration]], and report new findings on a diff during [[Code Review]] rather than dumping thousands of old ones. Introducing a new rule to a large codebase usually starts with a baseline that ignores existing violations.

Static analysis complements testing rather than replacing it. It finds whole classes of bugs everywhere at once, including in paths tests never execute, like [[Unreachable Code]]. Tests, Fuzzing, and [[Property-Based Testing]] find bugs that depend on actual values and behavior.

## See also
- [[SQL Injection]]
- [[Git Hook]]
