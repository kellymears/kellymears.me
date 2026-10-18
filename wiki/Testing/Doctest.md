---
aliases:
  - Doctests
  - Documentation test
  - Documentation tests
  - Executable documentation
tags:
  - testing
summary: Code examples in documentation that are run as tests, so the docs prove they still work and fail the build when they drift from the code.
---
A **doctest** is a code example embedded in documentation that is also executed as a test. The example shows a call and its expected output; the test runner executes the call and checks that the output matches. If someone changes the code so the example no longer works, the build fails, and the documentation gets fixed along with it.

The idea was popularized by Python's `doctest` module, written by Tim Peters and added to the standard library in 2001. It scans docstrings for text that looks like an interactive session, a line starting with `>>>` followed by the expected output, and replays it. Other languages adopted variations:

- **Rust** compiles and runs every code block in its documentation comments by default when you run the test suite, so published examples for libraries are checked automatically.
- **Go** has example functions with an `// Output:` comment, shown in generated documentation and verified by the test command.
- **Elixir** supports `iex>` examples in module docs that run as tests.
- **Markdown** documentation, such as READMEs and tutorials, can be checked by tools that extract and run fenced examples; see [[Markdown]].

The main benefit is fighting [[Documentation Rot]]. Examples are the most valuable part of most documentation, since people copy them, and also the part most likely to quietly break when an API changes. A [[Code Comment]] can lie without consequence; a doctest cannot.

Doctests also make good design pressure. If an example needs ten lines of setup before the interesting call, the API may be awkward to use. Writing the example first, before the implementation, works like a small dose of [[Test-Driven Development]] focused on the caller's experience.

They have clear limits:

- **Not a substitute for a test suite.** Doctests should show typical usage. Edge cases, error handling, and regression checks belong in a proper [[Unit Test]], where they don't clutter the docs.
- **Brittle output matching.** Comparing printed text breaks on incidental details like dictionary ordering, floating-point formatting, or memory addresses. This is the same fragility seen in [[Snapshot Testing]] and [[Golden File Testing]], and doctest tools offer options to ignore whitespace or elide output.
- **Hidden setup.** Examples that need fixtures or imports often hide them, which makes the documentation less honest about what using the code requires; see [[Test Fixture]].

A related idea runs the other way: tests written to read as documentation. [[Behavior-Driven Development]] scenarios in plain language serve as specifications that are also executed, and a well-named test suite is often the most accurate description of what code does. In both directions, the goal is a single source of truth that is both read by people and checked by machines, with [[Continuous Integration]] keeping it honest on every change.

## See also
- [[Characterization Test]]
- [[Test Oracle]]
- [[Naming]]
- [[Shift-Left Testing]]
- [[Docs as Code]]
