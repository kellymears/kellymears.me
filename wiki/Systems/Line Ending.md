---
aliases:
  - Newline character
  - CRLF
  - Carriage return
tags:
  - systems
summary: The invisible characters marking where a line of text ends, split three ways since the teletype era between Unix, Windows, and classic Mac OS, and still breaking scripts and diffs.
---
**A line ending** is the character, or pair of characters, that marks the end of a line in a text file. Three conventions survive, and text moving between systems trips over the differences.

The split goes back to teletypes. A teleprinter needed two separate motions to start a new line: a **carriage return**, which sent the print head back to the left margin, and a **line feed**, which advanced the paper. ASCII gave each its own control code, CR and LF; see [[Character Encoding]]. Sending both also bought time, since the carriage took longer to return than one character took to arrive.

Operating systems then chose differently:

- **Unix** used LF alone, leaving the terminal driver to produce both motions. Linux and macOS follow it today; see [[Unix]].
- **CP/M and then MS-DOS** kept both, CR then LF, and Windows inherited the pair, often written **CRLF**.
- **Classic Mac OS** used CR alone until Mac OS X moved to Unix conventions.

Internet protocols standardized on CRLF, so the header lines of HTTP and email end with both characters whatever system sends them; see [[HTTP]] and [[Simple Mail Transfer Protocol]].

The Unix translation still happens. When a program writes LF to a terminal, the terminal driver outputs CR and LF, a setting a program can switch off. Raw-mode programs that forget this produce text that staircases across the screen; see [[Pseudoterminal]].

The everyday failures:

- **Scripts.** A shell script saved with Windows endings fails with a baffling error naming an interpreter that doesn't exist, because the kernel reads the interpreter path with an invisible CR stuck to its end; see [[Shebang]].
- **Diffs.** An editor that silently converts endings changes every line, burying the real change in a [[Diff]] that marks the whole file as rewritten.
- **The last line.** POSIX defines a line as ending with a newline, so a file whose final line lacks one is technically incomplete. Some tools drop or merge that line, and diffs flag it; see [[POSIX]].
- **Data files.** A CSV field can legally contain line breaks, so splitting on newlines isn't safe parsing; see [[CSV]].

Version control tries to smooth this over. Git can convert endings on checkout and commit, configured per user or, more reliably, per repository through an attributes file that sits beside the ignore file; see [[Gitignore]]. Leaving it to personal settings is how one commit rewrites every line in a project.

Unicode added further line terminators, including dedicated line and paragraph separators. JavaScript once treated those two as line breaks inside string literals while JSON allowed them, so some valid JSON wasn't valid JavaScript until the language changed in 2019; see [[JSON]].

The characters are invisible in most editors, so these bugs survive; see [[Falsehoods Programmers Believe]].

## See also
- [[ANSI Escape Code]]
- [[Teleprinter]]
- [[File Transfer Protocol]]
