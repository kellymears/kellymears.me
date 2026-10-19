---
aliases:
  - Formatter
  - Autoformatter
  - Prettier
  - gofmt
tags:
  - delivery
summary: A tool that rewrites source code into one canonical layout automatically, ending style debates in code review and keeping diffs focused on what changed.
---
A **code formatter** rewrites source code into a single consistent layout: indentation, line breaks, spacing, quotes, trailing commas. You run it, or more often your editor or a [[Git Hook]] runs it on save or commit, and the file comes out the same way no matter who wrote it.

Formatters work on structure rather than text. Most parse the code into an [[Abstract Syntax Tree]], throw away the original whitespace, and print the tree back out by their own rules, wrapping lines to fit a width limit. Because the output depends only on the program's structure, formatting the same code twice gives the same result, and the tool cannot change what the program does.

The modern wave began with `gofmt`, which shipped with Go in 2009 and offered almost no options. The Go proverb summarizes the effect: "gofmt's style is no one's favorite, yet gofmt is everyone's favorite." Prettier brought the same idea to JavaScript in 2017, followed by Black for Python ("the uncompromising code formatter") and rustfmt for Rust. The common design choice is to minimize configuration. Every option is a decision a team must argue about, so removing options is the feature.

What formatters buy is mostly social:

- **No style debates in review.** Comments about brace placement are pure [[Law of Triviality|bikeshedding]], the easiest thing in a diff to have an opinion on. With a formatter there is nothing to discuss, and [[Code Review]] attention goes to logic.
- **Clean diffs.** When everyone's editor formats identically, a change touches only lines whose meaning changed, rather than reflowing whitespace. That keeps [[Merge Conflict|merge conflicts]] rarer and history readable.
- **Lower friction moving between codebases.** Code in a well-formatted ecosystem looks familiar everywhere.

Formatters are distinct from linters. A formatter fixes layout and never changes behavior; a linter, a kind of [[Static Analysis]], flags suspicious code, some of which it can fix. Many teams run both, the formatter first.

Adopting a formatter on an existing codebase has one known cost: a single huge commit that touches nearly every line, which pollutes line-by-line history. Git can skip it: listing the commit in a `.git-blame-ignore-revs` file tells [[Git Blame]] to look past it to the real author of each line. Teams often land the reformat during a quiet period to avoid conflicts with open branches.

Enforcement usually happens twice: locally, so developers rarely see a failure, and in [[Continuous Integration]], which runs the formatter in check mode and fails if any file would change. That makes the formatted layout a property of the repository, not a habit of its contributors.

## See also
- [[Conventional Commits]]
- [[Developer Experience]]
- [[Line Ending]]
- [[Branch Protection]]
- [[YAML]]
- [[Refactoring]]
- [[Text Editor]]
