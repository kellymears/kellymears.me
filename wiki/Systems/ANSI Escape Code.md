---
aliases:
  - Escape sequence
  - Control sequence
  - VT100
tags:
  - systems
summary: The in-band byte sequences, starting with the escape character, that tell a terminal to move the cursor, change color, or clear the screen, inherited from 1970s video terminals and still how every command-line tool draws.
---
An **ANSI escape code** is a sequence of bytes, beginning with the escape character, that a terminal interprets as a command instead of text to print: move the cursor, change the color, clear the line. Every colored prompt, progress bar, and full-screen command-line program draws itself this way.

They date from the video terminals of the 1970s. Each manufacturer had its own control codes, so software had to be written for specific models. A standard published in 1979, adopted by ANSI and later ECMA as ECMA-48, defined a common set, and DEC's VT100 terminal of 1978 implemented it so successfully that "VT100-compatible" became the baseline every terminal emulator still targets; see [[Pseudoterminal]] and [[Path Dependence]].

The format: the escape byte (27), an opening bracket, optional numeric parameters separated by semicolons, and a final letter naming the command. Common ones:

- **Colors and styles**, ending in `m`: `ESC[1m` for bold, `ESC[31m` for red text, `ESC[0m` to reset. The original eight colors grew to 256, then to full 24-bit color in modern terminals; see [[Color Gamut]].
- **Cursor movement**, such as up, down, or to an exact row and column.
- **Erasing** part or all of a line or the screen.
- **Alternate screen**, which full-screen programs switch to so the shell's history reappears intact when they exit.

The codes are **in-band**: commands travel in the same stream as the text. That makes them simple, since any program that can print can draw, but it has costs:

- **Output redirected to a file** fills with stray codes, so well-behaved tools check whether they're writing to a terminal before using color, and honor the `NO_COLOR` convention; see [[Environment Variable]].
- **Untrusted text is dangerous to print.** A log line or filename containing escape codes can hide text, rewrite the title bar, or on some old terminals type commands back into the input. It's the terminal's version of [[Cross-Site Scripting]], and the fix is the same: escape untrusted output before displaying it; see [[SQL Injection]].
- **Capabilities vary.** Programs once consulted a database, terminfo, to learn what each terminal supported. Most now assume a modern emulator.

Full-screen programs such as editors and system monitors are built entirely from these codes, redrawing only changed cells to keep output small; see [[Terminal User Interface]] and [[Virtual DOM]]. Newer extensions keep arriving through the same channel: clickable links, inline images, and clipboard access, each a negotiated extension to a 1970s protocol; see [[Backward Compatibility]].

Text encoding interacts with all of this. A terminal must know how many columns each character occupies, and wide characters such as emoji and CJK ideographs break layouts when program and terminal disagree; see [[Character Encoding]].

## See also
- [[Shell]]
- [[Font Rendering]]
- [[Logging]]
- [[ASCII Art]]
