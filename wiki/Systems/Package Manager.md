---
aliases:
  - Dependency manager
tags:
  - systems
summary: The tool that resolves, fetches, and installs dependencies, and pins them for reproducibility.
---
A **package manager** resolves a project's declared dependency ranges into concrete versions, fetches them, arranges them on disk, and records the resolution in a [[Lockfile]].

Three responsibilities are worth separating because they fail differently. *Resolution* — turning ranges into versions, which is where conflicts surface. *Fetching* — where registry availability and integrity checking matter. *Linking* — how packages are laid out, which decides what a program can actually import.

The linking strategy is the least visible and most consequential difference between managers. A flat layout hoists everything into one directory, which means a program can import a package it never declared, and that accidental dependency works until it does not. Isolated layouts link only declared dependencies, which prevents that at the cost of more disk work and some tooling incompatibility.

Version managers for the underlying runtime are a related and separate concern, and the ecosystem has churned through several. The practical lesson is that they are cheap to swap and worth keeping current, and that a dead one is a maintenance liability rather than a stable choice.

Ecosystems also have their own gotchas that no gate catches: a configuration key that is valid in one context and unsupported in another is typically ignored rather than rejected. See [[Silent Failure]].

## See also
- [[Lockfile]]
- [[Monorepo]]
- [[Semantic Versioning]]
- [[Supply Chain Security]]
- [[Bundler]]
- [[Dotfiles]]

## Related
- [[Secret Management]]
- [[Module Graph]]
