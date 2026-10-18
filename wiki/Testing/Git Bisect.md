---
aliases:
  - Bisect
  - Bisection
  - git bisect
  - Bisecting
tags:
  - testing
summary: Finding the commit that introduced a bug by binary search through history, testing the midpoint between a known-good and a known-bad version until one commit remains.
---
**Git bisect** finds the [[Commit]] that introduced a bug by running a [[Binary Search]] through history. You mark one version as *good*, where the bug is absent, and one as *bad*, where it appears. Git checks out the commit halfway between them, you test it and mark it good or bad, and Git halves the range again. Each answer discards half the remaining suspects, so a thousand commits take about ten steps, and a million take about twenty.

The command is `git bisect start`, followed by `git bisect bad` and `git bisect good <commit>`, then repeated marking until Git names the first bad commit. Bisection isn't specific to Git; Mercurial has the same command, and the technique works on any ordered history, including package versions and nightly builds.

The process becomes fully automatic with `git bisect run`, which takes a script and uses its exit code as the verdict: zero means good, most nonzero codes mean bad, and the special code 125 means "can't test this one, skip it." With a script that builds the code and checks for the bug, Git can search hundreds of commits without anyone watching. A good bisect script is a [[Reproducible Case]] turned into a command.

Bisection depends on a few properties of the history:

- **Every commit should build and run.** If many commits are broken for unrelated reasons, they have to be skipped, and the search may end with a range instead of one commit. Making each commit an [[Atomic Commit]] that compiles and passes tests keeps history bisectable.
- **Small commits give precise answers.** Bisect can only point at a whole commit. If the culprit is one giant change, the search ends at the right commit but leaves the hard part undone. A [[Squash Merge]] of a large branch trades readable history for coarser bisection.
- **The test must be reliable.** A [[Flaky Test]] that fails at random will send the search the wrong way once and silently produce the wrong answer, since bisect trusts every verdict.

Merge-heavy histories complicate the picture, since the "middle" of a graph with many branches isn't a single line. Git handles this by choosing commits that split the remaining candidates as evenly as possible, and `--first-parent` limits the search to the main line of merges.

Bisection is the simplest version of [[Delta Debugging]], which generalizes the idea to sets of changes that don't have a natural order. It answers *when* a [[Regression]] arrived, which is often the fastest route to *why*: the diff of one small commit is usually short enough to read in full. Some teams bisect automatically in [[Continuous Integration]] when a test that passed yesterday fails today.

## See also
- [[Binary Search]]
- [[Delta Debugging]]
- [[Atomic Commit]]
- [[Regression]]
