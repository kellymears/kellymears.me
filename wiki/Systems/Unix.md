---
aliases:
  - Multics
  - Everything is a file
  - Berkeley Software Distribution
tags:
  - systems
summary: The operating system Ken Thompson and Dennis Ritchie built at Bell Labs in 1969, whose files, processes, pipes, and shell became the template for Linux, macOS, Android, and most of the servers on the internet.
---
**Unix** is an operating system created at Bell Labs in 1969 by Ken Thompson and Dennis Ritchie, and the ancestor of most operating systems in use today. Its ideas, more than its code, spread everywhere: Linux, macOS, iOS, Android, and the BSDs are all Unix or modeled closely on it.

It began as a reaction. Bell Labs had joined MIT and General Electric on **Multics**, an ambitious time-sharing system that ran late and grew large, and withdrew in 1969; see [[Time-Sharing]]. Thompson, missing the interactive environment, wrote a small system on a little-used PDP-7 minicomputer. The name, a pun on Multics, signaled the smaller ambition. In 1973 the kernel was rewritten in C, Ritchie's new language, which made Unix portable to other machines at a time when operating systems were written in each computer's own assembly language; see [[Assembly Language]].

A legal accident spread it. A 1956 antitrust settlement barred AT&T from the computer business, so it licensed Unix source code to universities for nominal fees. Students learned operating systems by reading it, and the University of California, Berkeley, built its own distribution, BSD, which added virtual memory and the networking code that carried much of the early internet; see [[Network Socket]]. After AT&T's breakup in 1984 it commercialized Unix, vendors shipped incompatible versions, and the period became known as the Unix wars; see [[POSIX]]. In 1991 Linus Torvalds released Linux, a new kernel that, paired with the GNU project's free tools, gave everyone a Unix-like system without a license; see [[Kernel]] and [[Copyleft]].

The ideas that lasted:

- **Everything is a file.** Disks, terminals, and devices appear as files in one hierarchical tree, so the same read and write calls work on all of them; see [[Filesystem]] and [[Device File]].
- **Small tools, composed.** Programs do one job and pass plain text to each other through pipes, added in 1973 at Doug McIlroy's urging; see [[Unix Pipeline]].
- **Processes.** A new process is a copy of an existing one that then runs a different program; see [[Fork and Exec]].
- **The shell is just a program.** The command interpreter has no special privileges and can be replaced; see [[Shell]].

Unix also fixed small conventions that persist, such as counting time in seconds since the start of 1970; see [[Unix Time]]. Thompson and Ritchie received the Turing Award in 1983.

Its simplicity was sometimes criticized as cutting corners, leaving complexity to the user, and Unix has been a standard example of a simple, good-enough design spreading faster than a more complete one; see [[Worse Is Better]].

## See also
- [[Common Gateway Interface]]
- [[Morris Worm]]
