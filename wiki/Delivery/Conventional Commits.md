---
aliases:
  - Commit convention
tags:
  - delivery
summary: A lightweight convention giving commit messages a machine-readable type and scope.
---
**Conventional Commits** is a specification for commit message format: a type, an optional scope, and a description — `fix(parser): handle empty input` — with a body and footers below. Types in common use include `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, and `perf`.

The convention buys two things. Messages become scannable, since the type and scope tell you what kind of change it is before you read anything. And they become machine-readable, so changelogs and version bumps can be derived automatically — a `feat` implies a minor bump, a breaking-change marker a major one. See [[Semantic Versioning]].

The scope is where most of the value lives in practice, and where it is most often wasted. A precise scope naming the module or feature area makes history navigable; a vague one repeated across every commit adds nothing. Scopes should match how the project is actually organized, and should be reused rather than reinvented per commit.

The convention is orthogonal to how much a commit should contain — see [[Atomic Commit]] — and it does not remove the need for a body. A one-line conventional message is fine for a genuinely self-explanatory change; anything with a motivation worth recording still needs prose.

## See also
- [[Commit]]
- [[Atomic Commit]]
- [[Semantic Versioning]]
- [[Naming]]

## Related
- [[Squash Merge]]
- [[Code Review]]
- [[Provenance]]
- [[Plausible Mechanism]]
- [[Version Control]]
- [[Pull Request]]
