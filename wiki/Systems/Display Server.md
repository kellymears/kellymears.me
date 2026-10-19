---
aliases:
  - Wayland
  - X11
  - X Window System
  - Xorg
  - XWayland
  - Desktop portal
tags:
  - systems
summary: The program that sits between applications and the screen, keyboard, and mouse, deciding what is drawn where and who receives input. On Linux it is moving from X11 to Wayland.
---
A **display server** sits between applications and the display and input hardware. Applications ask it for windows and draw into them. The display server decides where windows appear, assembles the screen, and routes keyboard and mouse input to the right application. On Linux and other Unix-like systems, two designs dominate: the X Window System (X11) and its successor, Wayland.

**X11** dates to 1987 and was designed for a world of network terminals. Its protocol lets an application on one machine draw on another machine's screen. The naming confuses newcomers: the *server* runs on the machine with the screen, and applications are its *clients*. Over decades X grew extensions for everything it lacked, until most modern drawing bypassed its core entirely. Its security model also belongs to another era. Any X client can read every keystroke and capture any window, so one malicious or compromised application can watch the whole session.

**Wayland**, started in 2008 by Kristian Høgsberg, is a protocol rather than a single program. Each desktop implements its own **[[Compositor]]**, which is also the display server and the window manager. Applications render their own windows and hand finished buffers to the compositor. Clients are isolated from one another by default: an application cannot see other windows or listen to keys sent elsewhere. That follows [[Least Privilege]], but it broke screen sharing, global hotkeys, and color pickers, which all relied on X's openness. The answer is *desktop portals*, a permission-mediated D-Bus interface through which an application asks the user, via the compositor, for a screen capture stream (delivered over PipeWire) or a file.

The transition took more than a decade, a case of [[Path Dependence]] and of the [[Network Effect]] around a protocol everything already spoke. Two mechanisms made it possible:

- **XWayland** runs a small X server inside a Wayland session, so legacy applications keep working. It is an [[API Translation Layer]] in the same family as those that run Windows games on Linux.
- **Protocol extensions** let compositors add features beyond the small core protocol. The price is fragmentation: a feature may exist in one compositor and not another.

Each design choice made one set of problems hard and a different set easy, a pattern also seen in [[Init System]] and [[Package Manager]] transitions.

## See also
- [[Compositor]]
- [[Clipboard]]
- [[Inter-Process Communication]]
- [[Keyboard Layout]]
- [[Tiling Window Manager]]
- [[Daemon]]
- [[Process]]
- [[Desktop Metaphor]]
