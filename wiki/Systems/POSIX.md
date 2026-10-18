---
aliases:
  - Portable Operating System Interface
  - Single UNIX Specification
tags:
  - systems
summary: The IEEE standard, first published in 1988, that defines what a Unix-like system must provide, from system calls to the shell and its utilities, so that programs and scripts can move between systems.
---
**POSIX**, the Portable Operating System Interface, is a family of IEEE standards that define how a Unix-like operating system should behave. A program written to POSIX should compile and run on any compliant system, whatever company made it. The first version, IEEE 1003.1, appeared in 1988; the name was suggested by Richard Stallman, and the trailing X marks its Unix heritage.

It was written to end a mess. By the 1980s AT&T, Berkeley, and a series of hardware vendors each shipped their own Unix, with differences large enough that software had to be adapted for each; see [[Unix]] and [[Software Fork]]. Large customers, especially governments, wanted to buy systems against a common, published specification rather than a single vendor's product.

POSIX covers several layers:

- **The system interface.** The C functions for files, processes, signals, and threads, such as open, read, fork, and kill, and what each must do; see [[System Call]], [[Fork and Exec]], and [[Unix Signal]].
- **The shell and utilities.** The syntax of the standard shell, sh, and the behavior of tools such as grep, sed, awk, and find. A script that sticks to POSIX features runs under any compliant shell; one that uses Bash extensions may not; see [[Shell]].
- **Conventions.** Exit codes, file permissions, environment variables, regular expression syntax, path names, and the epoch for time; see [[Exit Status]], [[File Permissions]], [[Regular Expression]], and [[Unix Time]].

The related Single UNIX Specification, maintained by The Open Group, adds requirements, and only systems that pass its certification may use the UNIX trademark. Apple's macOS is certified. Linux is designed to follow POSIX closely but most distributions have never paid for certification, so it is called Unix-like.

Even Windows was pulled in. United States government procurement rules required POSIX support, so Windows NT shipped with a minimal POSIX subsystem in the 1990s. Today Windows instead runs a full Linux system alongside its own.

The standard has real limits. It moves slowly and stays conservative, so it trails what real systems do, and many useful features remain extensions. It also preserves odd historical choices, such as Unix time ignoring leap seconds, because changing them would break existing programs; see [[Backward Compatibility]]. Programmers often treat "POSIX-compliant" as a portability target rather than a guarantee, testing on the systems they actually support.

POSIX also illustrates a broader pattern: standards written after the fact tend to codify existing practice rather than design something new, which is why they succeed. The robustness principle comes from the same habits; see [[Postel's Law]].

## See also
- [[Application Binary Interface]]
- [[Filesystem Hierarchy Standard]]
- [[Command-Line Interface]]
