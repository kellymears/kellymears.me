---
aliases:
  - Env var
tags:
  - systems
summary: A named value in a process's environment, inherited by its children — the standard configuration channel.
---
An **environment variable** is a name-value pair held in a process's environment and inherited by every process it spawns. It is the lowest-common-denominator configuration mechanism: available in every language, on every platform, and requiring no file format.

Its defining property is *inheritance*, which is also the source of most of its confusions. A variable set in one shell is invisible to another. A variable set at the session-manager level is inherited by everything, including things launched years later, which is how a stale credential set once can override a properly configured one indefinitely with no file anywhere to explain it. When a tool reports using the wrong identity, the first question is which source it actually read: an environment variable almost always takes precedence over a stored credential.

Two further points. **The absence of a required variable should be fatal**, not defaulted; see [[Fail Fast]] and [[Defensive Default]]. And **making a variable required has a wide blast radius** — every entry point that lacks it will now fail, including the ones nobody thinks about: the test configuration, the container image, the provisioning script, and the code-generation step in continuous integration.

Directory-scoped environment loaders make per-project variables ergonomic, which is how one machine can hold several isolated configurations for the same tool.

## See also
- [[Shell]]
- [[Secret Management]]
- [[Dotfiles]]
- [[Containerization]]
- [[Least Privilege]]
- [[XDG Base Directory Specification]]

## Related
- [[Silent Failure]]
- [[Terminal User Interface]]
