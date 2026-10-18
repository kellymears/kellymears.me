---
aliases:
  - All-pairs testing
  - Combinatorial testing
  - Combinatorial interaction testing
  - Covering array
  - Configuration matrix
tags:
  - testing
summary: Testing every pair of parameter values together instead of every combination, which shrinks configuration matrices from thousands of cases to a few dozen while still catching most interaction bugs.
---
**Pairwise testing** is a way to test software with many configurable parameters without trying every combination. Instead of covering all combinations, it guarantees that every *pair* of values for any two parameters appears together in at least one test.

The problem it solves is combinatorial growth. Ten settings with three options each have 3¹⁰, or 59,049, combinations. A web app tested across four browsers, three operating systems, two screen sizes, both color themes, and three locales already needs 144 runs. Exhaustive testing becomes impossible quickly, but testing each setting in isolation misses bugs that appear only when two settings interact, such as a layout that breaks only in one browser at one screen size.

Pairwise coverage is far cheaper than exhaustive coverage. Those ten three-value parameters can be covered in about 15 tests, because each test covers many pairs at once: one row with ten values contains 45 different pairs. The arrangements are called *covering arrays*, and generating small ones is a well-studied problem; tools such as Microsoft's PICT build them from a list of parameters and constraints, like "this browser doesn't run on that operating system."

The justification is empirical. Studies by Rick Kuhn and colleagues at NIST in the early 2000s, looking at failure reports from medical devices, browsers, servers, and databases, found that most failures were triggered by a single parameter or by the interaction of two, and almost all by six or fewer. Covering every pair catches the large majority; covering every triple (*3-way* testing) catches more at moderate extra cost. The approach generalizes to *t-way* testing for any strength.

Pairwise selection fits naturally with other techniques for choosing inputs:

- **Choosing values.** Each parameter's values should still be picked carefully, often by partitioning and testing the edges, as in [[Boundary Value Analysis]].
- **Feature switches.** Every [[Feature Flag]] doubles the configuration space, and pairwise testing is one of the few practical ways to check flags against each other.
- **Browser and device matrices.** [[End-to-End Test]] suites run in a [[Headless Browser]] are often trimmed to a pairwise matrix of browser, viewport, and settings.

The technique has limits. It selects combinations but doesn't say what the correct output is, which still needs a [[Test Oracle]]. It assumes failures involve few parameters, which holds often but not always. And it covers only the values someone thought to list, so it complements rather than replaces [[Exploratory Testing]] and generated inputs from [[Property-Based Testing]], which can find values no one wrote down. Measuring how much of the space was exercised is a form of coverage like [[Code Coverage]], measured over configurations instead of lines.

## See also
- [[Boundary Value Analysis]]
- [[Feature Flag]]
- [[Property-Based Testing]]
- [[Test Oracle]]
