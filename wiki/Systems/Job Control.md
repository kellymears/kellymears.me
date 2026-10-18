---
aliases:
  - Foreground process
  - Background process
  - SIGHUP
  - nohup
tags:
  - systems
summary: The shell's ability to pause, resume, and move programs between the foreground and background of one terminal, with Ctrl-Z, bg, and fg, and why closing a terminal kills what it started.
---
**Job control** is the shell's ability to run several programs from one terminal, pausing them, resuming them, and moving them between the **foreground**, where they receive keyboard input, and the **background**, where they run without it. It was added to Unix shells around 1980, when a terminal was the only screen a user had and opening another meant finding another physical terminal.

The everyday controls in a [[Shell]]:

- **Ctrl-C** sends an interrupt signal to the foreground job, which usually ends it; see [[Unix Signal]].
- **Ctrl-Z** suspends the foreground job and returns to the prompt. The program is frozen, not ended.
- **bg** resumes a suspended job in the background; **fg** brings a job back to the foreground.
- **An ampersand** at the end of a command starts it in the background directly.
- **jobs** lists them.

The pieces fit together through the terminal itself; see [[Pseudoterminal]]. A job is a process group, all the processes of one command line, including every stage of a [[Unix Pipeline]]. The terminal tracks which group is in the foreground. When a key such as Ctrl-C arrives, the [[Kernel]]'s terminal layer turns it into a signal sent to every process in that group, which is why one keystroke stops a whole pipeline. A background job that tries to read from the terminal is stopped automatically, since it would otherwise steal keystrokes meant for the foreground.

Closing the terminal ends the session. The kernel sends a **SIGHUP**, "hang up," named for modem lines, to the session's processes, and by default they exit. This surprises anyone who starts a long job over [[Secure Shell]] and loses it when the connection drops. The usual remedies:

- **nohup** starts a program set to ignore the hangup signal, with its output redirected to a file.
- **disown** removes a job from the shell's list, so the shell won't pass the hangup on.
- **Terminal multiplexers** such as tmux and screen run the shell inside a separate long-lived server, so the session survives disconnects and can be reattached from another connection.
- **A service manager** runs the program outside any terminal session at all; see [[Systemd]] and [[Daemon]].

Job control is a small instance of the [[Context Switch]] at human scale: one screen, many tasks, and the cost of keeping track of which is which. Forgotten suspended jobs are a common surprise, which is why many shells warn when exiting with jobs still stopped.

The same ideas, suspend, resume, run unattended, recur in newer forms: graphical desktops, where each window is its own foreground; and long-running AI agents that work in the background while a person attends to something else; see [[Background Agent]].

## See also
- [[Process]]
- [[Zombie Process]]
- [[Terminal User Interface]]
