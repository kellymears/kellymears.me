---
aliases:
  - Exit code
  - Exit codes
  - Return code
  - pipefail
tags:
  - systems
summary: The small number every process returns when it ends, zero for success and anything else for failure, and the conventions that let shells, CI systems, and init systems act on it.
---
An **exit status** is the integer a program returns to its parent when it finishes. By near-universal convention, 0 means success and any other value means some kind of failure. The number is tiny, only 8 bits on Unix, so values run from 0 to 255, but it is the most basic way one program tells another whether things worked.

Everything that runs programs relies on it:

- **Shells.** The variable `$?` holds the last command's status. `&&` runs the next command only on success, `||` only on failure, and `if` tests a command's status, not a Boolean.
- **Scripts.** `set -e` makes a [[Shell]] script stop at the first failing command, a form of [[Fail Fast]].
- **CI systems.** A pipeline step fails when its command exits non-zero. A test runner that returns 0 despite failing tests produces a green build, a classic [[Silent Failure]].
- **Init systems.** [[Systemd]] uses a service's exit status to decide whether it failed and whether to restart it.
- **Tools.** `make` stops when a recipe fails, and `xargs` and `find -exec` report failures through their own status.

Several conventions carry meaning beyond zero and non-zero:

- **128 plus a signal number.** A process killed by a [[Unix Signal]] is reported by shells as 128 + N. 130 means interrupted by Ctrl-C (SIGINT); 137 means killed by SIGKILL, often by the [[Out-of-Memory Killer]] or a container runtime; 139 means a segmentation fault (SIGSEGV), which may leave a [[Core Dump]].
- **126 and 127.** The shell reports 126 when a file is not executable and 127 when a command is not found.
- **Tool-specific codes.** `grep` returns 1 for "no match", which is not an error, and 2 for an actual error. `diff` returns 1 when files differ. Scripts using `set -e` trip over these regularly.

Pipelines are a common trap. In a [[Unix Pipeline]], the status is that of the *last* command, so `curl url | jq .` succeeds even if the download failed. Bash's `set -o pipefail` makes the pipeline fail if any stage fails. Combined with `set -e` and `set -u`, it forms the "unofficial strict mode" many scripts begin with.

Good command-line tools treat the exit status as part of their interface. Returning distinct codes for "invalid input", "not found", and "internal error" lets callers react differently, and reserving a code for "nothing to do" lets scripts skip work cleanly. Printing an error but exiting 0 breaks every caller that checks properly.

Exit statuses carry no detail. They report that something failed, not what; the explanation belongs on standard error, a stream described under [[File Descriptor]]. Wrapping commands in [[Idempotence|idempotent]] scripts that check statuses at every step is the basis of reliable automation, from [[Cron]] jobs to deployment pipelines.

## See also
- [[Process]]
- [[Fork and Exec]]
- [[Zombie Process]]
- [[Continuous Integration]]
