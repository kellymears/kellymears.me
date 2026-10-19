---
aliases:
  - Hashbang
  - Interpreter directive
tags:
  - systems
summary: The "#!" line at the top of a script that tells the kernel which interpreter should run it, so a text file can be executed like a compiled program, and the portability traps around it.
---
A **shebang** is the line beginning with `#!` at the top of a script, naming the program that should run it. With it, a text file of [[Shell]] commands or Python code can be executed directly, like any compiled program, and the user never has to say which interpreter to use. The name comes from "hash" plus "bang," the programmer slang for `#` and `!`.

It is handled by the [[Kernel]], not the shell. When a program asks the kernel to execute a file, the kernel reads the first bytes. A compiled program begins with a known header that says how to load it; see [[Linker]]. If the file instead begins with `#!`, the kernel takes the rest of that line as the path of an interpreter, plus at most one argument, and runs that interpreter with the script's path appended. A file beginning `#!/bin/sh` therefore runs as `/bin/sh script`. The interpreter then reads the whole file, and since `#` starts a comment in most scripting languages, it skips the first line. The mechanism dates from 1980, at Bell Labs; see [[Interpreter]].

The file also needs execute permission, or the kernel refuses before reading anything; see [[File Permissions]].

Portability problems:

- **Interpreter location.** Python may be in `/usr/bin`, `/usr/local/bin`, or a version manager's directory. The common workaround is `#!/usr/bin/env python3`, which runs the `env` program, which finds `python3` by searching the `PATH`; see [[Environment Variable]]. The cost is that the script runs whichever version comes first on that path.
- **One argument only.** On Linux everything after the interpreter path is passed as a single argument, so `#!/usr/bin/env python3 -u` looks for a program literally named "python3 -u." Newer versions of `env` accept `-S` to split it.
- **Line endings.** A script saved with Windows line endings has an invisible carriage return at the end of the first line, so the kernel looks for an interpreter named "sh" plus a control character and reports, confusingly, that the file was not found; see [[Character Encoding]].
- **Length limits.** The kernel caps how long the line can be, and deeply nested tool directories have exceeded it.

The shebang is part of why a script and a compiled binary look the same to whatever runs them: a [[Cron]] job, a [[Git Hook]], a [[Systemd]] unit, or another script in a [[Unix Pipeline]]. This uniformity lets a quick script become a durable tool, or a tool be rewritten in another language, with nothing that calls it noticing; see [[Backward Compatibility]].

It also explains a classic security hole. Early systems that honored setuid permissions on scripts were open to swapping the script out between the kernel checking it and the interpreter opening it, so most Unix kernels now ignore setuid on scripts entirely; see [[Race Condition]].

## See also
- [[Version Manager]]
- [[Line Ending]]
