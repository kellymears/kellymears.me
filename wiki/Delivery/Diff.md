---
aliases:
  - Unified diff
  - Patch
  - Patch file
tags:
  - delivery
summary: The listing of changes between two versions of a file, the algorithms that compute it, and the unified format that code review, patches, and merges are built on.
---
A **diff** lists the differences between two versions of a text, usually line by line: which lines were removed and which were added. The name comes from the Unix `diff` utility, written by Douglas McIlroy and James Hunt for Unix in the early 1970s. Diffs are everywhere in software delivery. Every [[Code Review]] is a review of a diff, every [[Commit]] is displayed as one, and merges are computed from them.

Computing a diff means finding the smallest set of edits that turns one file into the other, a version of the [[Edit Distance]] problem. Equivalently, it means finding the longest sequence of lines the two versions share, the longest common subsequence, and treating everything else as changed. Eugene Myers published an efficient algorithm in 1986 that runs fast when the two files are similar, the usual case, and it remains Git's default.

Minimal isn't always readable. A minimal diff of a code change may match a stray closing brace or blank line in the wrong place, so a function's end appears to be in the middle of the change. Git offers alternatives:

- **Patience diff**, from Bram Cohen, anchors on lines that appear exactly once in each file, such as function signatures, and diffs between them. Its results usually follow the code's structure better.
- **Histogram diff** extends the same idea and is fast; many people set it as their default.
- **Word diff** compares within lines, useful for prose and Markdown.

The **unified diff** format is the standard way to share changes. Lines beginning with `-` were removed and `+` were added, grouped into *hunks* headed by `@@` line ranges, with a few unchanged context lines around each. The context lets the `patch` tool apply a diff to a file that has shifted slightly, by finding where the context matches.

A diff saved to a file is a **patch**. Before pull requests, patches emailed to mailing lists were how open source collaboration worked, and the Linux kernel still runs that way. `git format-patch` and `git am` preserve that workflow, carrying the commit message and author along with the change.

Diffs underlie merging. A [[Three-Way Merge]] compares each branch with their common ancestor and combines both diffs; where the two diffs touch the same lines, the result is a [[Merge Conflict]]. Diffs that touch different lines can still break each other, which is a [[Semantic Conflict]] no text diff can see.

Line-based diffs know nothing about code structure. Renaming a variable or reformatting produces noisy diffs that hide the real change, one reason teams adopt an automatic [[Code Formatter]] and keep each change small and [[Atomic Commit]]-sized. Structural diff tools parse the code into an [[Abstract Syntax Tree]] and compare trees instead.

## See also
- [[Line Ending]]
- [[Git Blame]]
- [[Git Object Model]]
- [[Mailing List]]
- [[Patch Tuesday]]
- [[Histogram]]
