---
aliases:
  - GNOME
  - KDE Plasma
  - Window manager
tags:
  - systems
summary: The bundle of software that makes up a graphical desktop, including the window manager, panels, file manager, settings and a shared look, which on Linux is a choice among independent projects rather than part of the operating system.
---
On Windows and macOS, the desktop is simply part of the operating system. On Linux and other Unix-like systems, the graphical interface is a separate layer, and users choose among **desktop environments**: integrated collections of programs that together provide the desktop experience; see [[Linux Distribution]].

A typical desktop environment includes:

- A **window manager**, which decides where windows go, draws their borders and title bars, and handles moving, resizing and focus. On modern systems it is usually also the compositor that combines every window into the final image; see [[Compositor]] and [[Display Server]].
- Panels, a launcher, a notification area and a lock screen.
- A file manager, settings application, text editor, terminal and other basic tools.
- Shared libraries and conventions so applications look consistent, store settings in the same places and talk to each other; see [[Inter-Process Communication]] and [[XDG Base Directory Specification]].

Early Unix workstations had only a window manager and whatever programs a user started. The Common Desktop Environment, released in the early 1990s by a group of Unix vendors, standardized one for commercial systems. On Linux, **KDE** was announced in 1996, built on the Qt toolkit. Its toolkit's license at the time wasn't considered free, which prompted **GNOME** in 1997, built on GTK. Qt's license later changed, and both projects have remained the two largest. GNOME 3 in 2011 replaced the traditional taskbar and menu with an activities overview, which split its users and led to forks such as Cinnamon and MATE that kept the older design. Lighter environments such as Xfce and LXQt target older hardware.

Some people skip the full environment and run a standalone window manager, often a **tiling** one that arranges windows automatically into a grid without overlap, assembling the rest from separate tools; see [[Tiling Window Manager]]. This trades polish and integration for control, and usually means writing configuration files by hand; see [[Dotfiles]].

Choosing one is less permanent than it seems. Most Linux applications run under any environment, though programs built for one toolkit may look slightly out of place in another. Several can be installed side by side and picked at login.

The ongoing transition from the X Window System to Wayland shifted work onto desktop environments. Under X, a separate server handled input and display and window managers were small add-ons. Under Wayland, the compositor is the display server, so each environment must implement screen sharing, input methods, multi-monitor layouts and much else itself; see [[Input Method]]. The desktop metaphor that all of them follow, with windows, icons, folders and a trash can, dates back to Xerox PARC in the 1970s.

## See also
- [[Clipboard]]
- [[Init System]]
