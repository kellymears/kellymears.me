---
aliases:
  - Copy and paste
  - Primary selection
tags:
  - systems
summary: The shared buffer behind cut, copy, and paste, invented at Xerox PARC, which offers data in several formats at once and has become a channel for snooping and for commands that paste differently from how they looked.
---
**The clipboard** is the temporary storage behind cut, copy, and paste. Larry Tesler and Tim Mott developed the commands for the Gypsy word processor at Xerox PARC in the mid-1970s, and the Apple Lisa and Macintosh made them, with their one-letter keyboard shortcuts, standard across every program; see [[Direct Manipulation]].

Copying usually doesn't copy one thing. The source program offers the data in several formats at once, such as rich text, HTML, and plain text for a selection in a document, and the program receiving the paste picks the richest one it understands. That's why pasting into a plain text field drops formatting while pasting into a word processor keeps it; see [[Inter-Process Communication]].

On some systems nothing is copied at all until the paste. In the X Window System, copying merely announces ownership; the data stays with the source program, which sends it when another program asks. Close the source and the clipboard empties, which is one reason clipboard managers exist. X also keeps a second buffer, the **primary selection**: selecting text copies it and a middle click pastes it, with no keystroke at all. Wayland compositors carried both conventions forward but let only the focused window read the clipboard; see [[Display Server]].

Terminals add their own complications. A pasted newline acts like pressing Enter, so a shell would run each pasted line immediately. With bracketed paste, the terminal wraps pasted text in escape sequences so the shell can treat it as input to review rather than commands to run; see [[ANSI Escape Code]] and [[Shell]]. Another escape sequence lets a program inside the terminal set the local clipboard, which works even over a remote session; see [[Secure Shell]] and [[Terminal Multiplexer]].

The clipboard is shared, which makes it a security problem:

- **Snooping.** Any program allowed to read the clipboard sees passwords and messages copied from elsewhere. When iOS 14 began showing a notice whenever an app read the pasteboard in 2020, many popular apps turned out to be reading it constantly. Password managers clear the clipboard after a short delay; see [[Secret Management]].
- **Swapping.** Malware watches for cryptocurrency addresses on the clipboard and replaces them with the attacker's, counting on nobody checking a long random string.
- **Pastejacking.** A web page can change what gets copied from it, so a harmless-looking shell command pastes as something else, ending in a newline that runs it. Instructions telling visitors to paste commands into a terminal or the Run dialog have become a common malware lure; see [[Phishing]].

Restricting clipboard access follows the principle that a program should get only what it needs; see [[Least Privilege]].

## See also
- [[Undo]]
- [[Desktop Metaphor]]
- [[Password Manager]]
- [[Input Method]]
- [[Desktop Environment]]
