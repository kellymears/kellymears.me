---
aliases:
  - Oracle problem
  - Expected result
  - Implicit oracle
tags:
  - testing
summary: Whatever decides whether a test's output is correct, and the often-overlooked hard part of testing when nobody knows the right answer in advance.
---
A **test oracle** is the mechanism that decides whether a program's output is correct. Running a program on an input is easy. Knowing whether the result is right is often the hard part. In simple unit tests the oracle is an expected value hard-coded in an [[Assertion]], but for many programs nobody can say in advance what the correct output is. Elaine Weyuker described this in 1982 as the problem of "non-testable programs," and it is now called the **oracle problem**: for scientific simulations, compilers, search rankings, machine-learning models, and rendering, writing down the right answer is as hard as computing it.

Testers have developed a range of oracles, each trading precision for reach:

- **Specified values.** An expected result worked out by hand. It is precise but expensive, and it covers only the inputs someone thought of.
- **Recorded output.** Capture what the program produced once, check it by eye, and compare against it afterward, as in [[Golden File Testing]] and [[Snapshot Testing]]. This detects change rather than correctness.
- **Reference implementations.** Compare against another implementation, an older version, or a slow but obviously correct algorithm. That is [[Differential Testing]].
- **Properties.** Check relationships that must hold rather than exact values: output is sorted, encode then decode returns the input, totals balance. [[Property-Based Testing]] runs on this kind of oracle, and [[Design by Contract]] states them as postconditions.
- **Implicit oracles.** Some failures need no specification at all: crashes, hangs, memory errors, and failed assertions. [[Fuzzing]] relies on these, which is why it scales to millions of inputs.
- **Humans.** People judge usability, visual quality, and whether text reads well. That judgment is slow and inconsistent but unavoidable for some questions, the territory of [[Exploratory Testing]].

Weak oracles explain a common gap: a test suite with high [[Code Coverage]] that still misses bugs, because the tests execute code without checking much about the results. [[Mutation Testing]] exposes that gap by changing the code and seeing whether any test notices.

The problem has become central to systems built on language models, whose output is open-ended and varies between runs. Exact-match assertions don't work, so teams use rubrics, reference answers, and [[LLM-as-Judge]] scoring inside an [[Evaluation Harness]]. Each is a weaker, statistical oracle, and the old question returns: who checks the judge? Ultimately every oracle rests on some [[Ground Truth]], and its quality caps the quality of the tests built on it.

## See also
- [[Property-Based Testing]]
- [[Reward Hacking]]
