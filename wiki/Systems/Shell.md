---
aliases:
  - Bash
  - zsh
  - Command line
tags:
  - systems
summary: The interactive command interpreter, and a programming language with unusually sharp edges.
---
A **shell** is the program that interprets typed commands: it expands words, resolves programs, wires their inputs and outputs together, and reports their exit status. It is simultaneously the most-used interface in software work and a programming language with more surprising behavior per line than any other in common use.

The behaviors that produce the most wasted time are worth learning explicitly.

**Expansion happens before the program runs.** A variable in a command line is substituted by the shell, so a program's own configuration file cannot influence an argument the shell already expanded — which is why a command that reads a port from the environment binds the *shell's* port and not the one in a local configuration file.

**Shells differ.** Variable names reserved in one are ordinary in another; a script assigning to a name the shell owns dies on its first line with a one-word error.

**Quoting is the perennial hazard**, and a pattern that becomes empty after expansion may match everything rather than nothing.

**A process matcher can match itself.** A wait loop that polls for a pattern present in its own command line never exits — wait on an artifact instead.

Exit status is the shell's only universal signal, and it means "the program returned zero", which frequently is not the same as "the thing you wanted happened". See [[Vacuous Truth]].

## See also
- [[Environment Variable]]
- [[Glob]]
- [[Process]]
- [[Dotfiles]]
- [[Port]]
- [[Character Encoding]]
- [[Terminal User Interface]]

## Related
- [[Silent Failure]]
- [[Ground Truth]]
