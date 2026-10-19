---
aliases:
  - CLI
  - Man page
  - Tab completion
tags:
  - systems
summary: Operating a computer by typing commands and reading text replies, the interface inherited from teletypes that remains the fastest, most scriptable, and least discoverable way to control software.
---
A **command-line interface**, or CLI, is a way of operating a computer by typing commands and reading text in reply. It descends from teletypes, electric typewriters wired to computers, and from time-sharing systems where users shared one machine from terminals; see [[Pseudoterminal]]. The program that reads and runs the commands is a shell; see [[Shell]].

A command typically names a program, then options and arguments: a verb, adverbs, and objects. Conventions grew up over decades. Single-letter options start with one dash and can be bundled, as in ls -la; GNU tools added long options with two dashes, such as --verbose, which are easier to read in scripts. Every program reports success or failure through a number when it exits; see [[Exit Status]]. Patterns like *.txt are expanded by the shell before the program sees them.

Its strengths are speed and composition:

- **Composition.** Small programs pass text from one to the next, so a task no single tool does can be built by chaining several.
- **Automation.** Anything typed can be saved in a script and rerun exactly, which is why servers and build systems are driven from the command line.
- **Precision.** A command records exactly what was done, can be pasted into a message or a bug report, and is reproducible in a way a sequence of clicks isn't.
- **Remote use.** Text travels well over slow links; see [[Secure Shell]].

Its weakness is discoverability. A blank prompt doesn't show what is possible, and users must already know the command's name and options; see [[Discoverability]]. Several conventions soften this. **Man pages**, the manual pages that date from the first Unix manual of 1971, document each command in a standard layout. **Tab completion** finishes command names, file names, and options as the user types. Help flags and suggestions for mistyped commands help further.

Graphical interfaces displaced the command line for most people from the 1980s on. It never disappeared among programmers and administrators, and its ideas have returned inside graphical software. Command palettes let users type the name of an action instead of hunting through menus; see [[Command Palette]]. Full-screen text applications occupy the ground between the two; see [[Terminal User Interface]].

Good command-line tools follow habits that make them pleasant to use and to script: quiet output on success, clear errors on failure, machine-readable output when asked, and respect for settings passed in the environment; see [[Environment Variable]]. Users customize their own shells heavily through configuration files kept for years; see [[Dotfiles]]. For people who use screen readers, a text interface can also be easier to navigate than a cluttered graphical one; see [[Accessibility]].

## See also
- [[Clipboard]]
- [[Glob]]
- [[Terminal Multiplexer]]
