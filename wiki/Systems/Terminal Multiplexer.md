---
aliases:
  - tmux
  - GNU Screen
  - Zellij
  - Detachable session
tags:
  - systems
summary: A program that runs many terminal sessions inside one window, splits it into panes, and keeps the sessions alive on a server after the connection drops, so long jobs and remote work survive disconnection.
---
A **terminal multiplexer** runs several terminal sessions inside one terminal window and keeps them alive independently of it. It can split the window into panes, switch between full-screen windows, and, most usefully, **detach**: the sessions keep running on the machine after the user disconnects, ready to be reattached later from the same or a different terminal.

GNU Screen, released in 1987, established the idea. tmux, started in 2007 by Nicholas Marriott and later included in OpenBSD, became the more popular modern choice, and newer tools such as Zellij, written in Rust, add friendlier defaults.

The architecture explains the persistence. A multiplexer runs as a background server that owns the terminal sessions, creating a [[Pseudoterminal]] for each shell inside it. The terminal window the user sees is only a client that connects to that server and draws its contents. Closing the window or losing a network connection ends the client, while the server, and every program running under it, carries on; see [[Daemon]].

That solves a classic problem of remote work. Normally, when an SSH connection drops, the shell receives a hangup signal and its programs die with it; see [[Secure Shell]]. A long build, data migration, or test run started inside a multiplexer survives a closed laptop lid or a flaky hotel connection. Mosh, released in 2012, attacks the same problem at the connection level, keeping sessions alive as the client roams between networks.

Common features:

- **Sessions, windows, and panes.** A session holds a set of windows; each window can be split into panes, each running its own shell, a tiling layout inside the terminal; see [[Tiling Window Manager]].
- **A prefix key.** Commands start with a chord, Control-B in tmux and Control-A in Screen, so the multiplexer can intercept keys without stealing them from the programs inside.
- **Scrollback and copy mode.** History is kept by the multiplexer, searchable and copyable with the keyboard.
- **Sharing.** Two people attached to one session see and type into the same terminal, a lightweight tool for pair programming and incident response.

The cost is an extra layer of translation. A multiplexer is itself a terminal emulator running inside another one: it interprets the escape codes programs send, keeps its own picture of each screen, and redraws it in the outer terminal; see [[ANSI Escape Code]]. Features the inner program expects, such as true color, clipboard access, or new keyboard protocols, work only if the multiplexer understands and passes them through, and it identifies itself through the TERM [[Environment Variable]] so programs know what it supports. Some terminal emulators now build in splits, but detaching on a remote machine still needs a multiplexer.

Full-screen programs inside it are ordinary terminal applications; see [[Terminal User Interface]].

## See also
- [[Command-Line Interface]]
- [[Clipboard]]
