---
aliases:
  - Prolog
  - Datalog
  - Unification
  - Declarative programming
tags:
  - computation
summary: Programming by stating facts and rules and asking questions, leaving the system to search for answers, the approach of Prolog and of Datalog, which now powers program analysis and policy engines.
---
**Logic programming** is a style of programming in which a program is a set of facts and rules written in a form of formal logic, and running it means asking a question that the system answers by searching for a proof. The programmer says what is true, not how to compute it. It is the purest form of **declarative programming**, the broader family that also includes database queries and build files.

The best-known language is **Prolog**, created by Alain Colmerauer and Philippe Roussel in Marseille in 1972, with Robert Kowalski in Edinburgh supplying much of its theory. A Prolog program might state that Ann is a parent of Bob, that Bob is a parent of Cy, and that X is a grandparent of Z if X is a parent of some Y who is a parent of Z. Asking for Cy's grandparents makes the system work backward from the rule to the facts and answer Ann.

Two mechanisms do the work:

- **Unification.** Matching two terms containing variables by finding values that make them identical. It is [[Pattern Matching]] that runs in both directions, and the same algorithm drives Hindley-Milner [[Type Inference]].
- **Backtracking search.** When a rule has several ways to succeed, the system tries the first and, on failure, returns to the last choice point and tries the next; see [[Backtracking]] and [[Recursion]].

The same program can often run in more than one direction. A rule that appends two lists can also split a list into every possible pair of pieces, because a relation doesn't distinguish inputs from outputs.

Prolog's search order is also its weakness. It explores depth first, so rules written in the wrong order can loop forever on a question with a perfectly good answer, and programmers control the search with features like the "cut," which compromise the pure logical reading.

Logic programming had a boom. Japan's Fifth Generation Computer Systems project (1982 to 1992) bet on it as the basis for intelligent machines, and it was a popular way to build a rule-based [[Expert System]]. The project missed its goals, and interest faded with the wider retreat from symbolic AI.

Its ideas survived in more restricted forms:

- **Datalog** drops the features that make Prolog's search unpredictable, so every query finishes. Its recursive queries power tools that find bugs and security flaws across large codebases; see [[Static Analysis]].
- **Constraint logic programming** and answer set programming solve scheduling and configuration problems; see [[Constraint Propagation]] and [[Boolean Satisfiability Problem]].
- **Policy engines** for access control state permissions as rules and let the engine derive what a request may do.

Database query languages share the declarative idea: the user states the result wanted, and a [[Query Planner]] decides how to compute it.

## See also
- [[Lisp]]
- [[Turing Completeness]]
- [[Curry-Howard Correspondence]]
- [[SQL]]
