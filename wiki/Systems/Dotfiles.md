---
aliases:
  - Dotfile repo
tags:
  - systems
summary: A tracked repository of personal configuration, making a machine setup reproducible.
---
**Dotfiles** are the hidden configuration files that define a personal computing environment — shell setup, editor preferences, tool configuration — and, by extension, the tracked repository people keep them in.

The point is reproducibility: a new machine becomes a checkout and a setup script rather than weeks of rediscovery. The secondary benefit is larger than expected — having the configuration under version control makes it *editable with confidence*, since any change can be reverted.

A dotfiles repository has a characteristic structure. Configuration that respects [[XDG Base Directory Specification]] lives in a tracked directory the tools already look in. Configuration that does not is tracked and symlinked into place. Data directories, caches, and credential stores are deliberately excluded, which usually means a whitelist-style ignore file — ignore everything, then re-include the specific things worth keeping.

Package manifests belong here too: a declarative list of installed software makes the machine reconstructible rather than merely configured. And the maintenance activity that pays best is periodic deletion — a dotfiles repository accumulates configuration for tools that were uninstalled long ago, and every stale entry is a small piece of misdirection for the next person to read it, including yourself.

## See also
- [[XDG Base Directory Specification]]
- [[Symbolic Link]]
- [[Shell]]
- [[Package Manager]]
- [[Environment Variable]]

## Related
- [[Terminal User Interface]]
