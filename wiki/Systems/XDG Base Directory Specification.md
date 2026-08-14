---
aliases:
  - XDG
  - XDG_CONFIG_HOME
tags:
  - systems
summary: A convention placing configuration, data, cache, and state in defined directories rather than the home directory.
---
The **XDG Base Directory Specification** defines where applications should keep their files: configuration under one root, data under another, cache under a third, runtime state under a fourth — each overridable by an environment variable, with sensible defaults.

Its purpose is to stop the home directory filling with hidden files whose category nobody can determine. The distinction between configuration and data is the practically important one, because configuration is what you want under version control and data is what you emphatically do not.

Adoption is partial. Well-behaved tools honour the variables; many hard-code a hidden directory in the home folder and always will. This produces a two-strategy approach for anyone consolidating their setup: XDG-compliant tools are handled by pointing the configuration root at a tracked directory, and the rest are handled with a [[Symbolic Link]] from the expected location into that directory.

Pointing the configuration root somewhere unusual has one consequence worth anticipating: any tool that resolves *its own* files relative to that root now looks in the new place. That is the intent, and it means an assumption elsewhere about a fixed path will break — including tooling that stores plugins or credentials beside configuration.

## See also
- [[Dotfiles]]
- [[Symbolic Link]]
- [[Environment Variable]]
- [[Terminal User Interface]]

## Related
- [[Shell]]
- [[Silent Failure]]
- [[Containerization]]
- [[Time Zone]]
- [[Secret Management]]
- [[Character Encoding]]
