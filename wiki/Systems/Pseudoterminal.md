---
aliases:
  - PTY
  - TTY
  - Terminal emulator
  - Line discipline
  - Raw mode
  - isatty
tags:
  - systems
summary: The kernel device pair that lets a terminal window, SSH session, or tmux pane pretend to be a 1970s hardware terminal, and why programs behave differently when they are not attached to one.
---
A **pseudoterminal**, or PTY, is a pair of kernel devices that imitates a physical terminal. One end, the *controller*, is held by a terminal emulator, [[Secure Shell]] server, or multiplexer such as tmux. The other end, the *subsidiary*, appears to the programs running inside as an ordinary terminal device such as `/dev/pts/3`. Everything typed into the window goes into one end and comes out the other as if from a keyboard; everything the program prints travels back to be drawn.

The design exists because Unix grew up with real terminals. A teletype, the "TTY" in the name, was a typewriter connected to the computer by a serial line, later replaced by video terminals such as the DEC VT100 of 1978. The kernel's terminal driver handled those lines, and programs were written against it. When terminals became windows on a graphical desktop, the kernel kept the same interface and let software play the hardware's role.

Between the two ends sits the **line discipline**, which provides behavior people assume is part of the shell:

- **Cooked mode.** Input is buffered until Enter, and Backspace edits the line before the program ever sees it.
- **Special keys.** Ctrl-C sends SIGINT, Ctrl-Z sends SIGTSTP to suspend, and Ctrl-D signals end of input. These are delivered by the terminal driver as a Unix Signal to the foreground process group.
- **Echo.** Typed characters are printed back, except at password prompts that turn echo off.
- **Raw mode.** Editors, full-screen tools, and any [[Terminal User Interface]] switch to raw mode to receive every keystroke immediately and draw the whole screen themselves.

Programs control the screen with escape sequences, byte strings inherited from the VT100 and standardized as ANSI codes, which move the cursor, set colors, and clear lines. Modern terminal emulators add extensions such as true color, hyperlinks, and inline images. When a window is resized, the kernel updates the PTY's size and sends SIGWINCH so programs can redraw.

Programs often check whether they are attached to a terminal using `isatty`. Many behave differently when they are not: `ls` prints one name per line, `grep` drops color, and the C library switches standard output from line buffering to block buffering. That is why output piped into another command, as in a Unix Pipeline, can arrive in bursts, and why tools that run interactive programs automatically, such as `expect` or a test harness, must allocate a PTY to see normal behavior.

Terminals also carry sessions. Closing a terminal sends SIGHUP to its processes, which is why long jobs started in a terminal die when it closes unless run under `nohup`, tmux, or as a [[Daemon]]. Each [[Process]] has a *controlling terminal*, and the shell's job control uses it to move jobs between foreground and background.

## See also
- [[Remote Desktop]]
- [[Terminal Multiplexer]]
