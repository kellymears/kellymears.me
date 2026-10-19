---
aliases:
  - Text editors
  - Vim
  - Emacs
tags:
  - systems
summary: The program for editing plain text, programmers' most personal tool, whose lineage runs from terse line editors through the rival traditions of vi and Emacs to modern editors that borrow language smarts through a shared protocol.
---
A **text editor** is a program for editing plain text: characters without the formatting a word processor adds. Programmers spend much of their working day in one, along with system administrators editing configuration files and writers who prefer plain formats. Because the tool is used so heavily, people grow very attached to their choice.

The lineage on Unix starts with **ed**, a line editor written around 1969 for the first Unix systems; see [[Unix]]. It was built for teletypes that printed on paper, so it showed nothing unless asked, and its single error message was a question mark. In 1976 Bill Joy wrote **vi**, which used a full screen display. Bram Moolenaar released **Vim**, an improved vi, in 1991, and Neovim forked from it in 2014; see [[Software Fork]]. Because a version of vi is part of the POSIX standard, it's available on almost every Unix-like system, including servers reached remotely with no other editor installed; see [[POSIX]] and [[Secure Shell]].

**Emacs** began at MIT in 1976, and GNU Emacs, started by Richard Stallman in 1984, became its dominant version. Most of Emacs is written in its own dialect of Lisp, so users can change nearly any behavior while it runs, and it grew into an environment for email, file management, and more; see [[Lisp]].

The two traditions differ in approach:

- **Modal editing.** Vi separates a mode for typing text from a mode for commands, where keys become verbs and motions that combine, such as delete to the end of a word. Proficient users edit without reaching for the mouse, and the commands become reflexes; see [[Muscle memory]].
- **Extensibility.** Emacs uses modifier-key chords instead of modes and treats the editor as a programmable system.

The rivalry became known as the editor war, a long-running joke that's also an example of how fiercely people argue over small differences; see [[Bikeshedding]].

Newer editors added graphical interfaces and plugin ecosystems. Visual Studio Code, released by Microsoft in 2015, became very widely used. Microsoft also introduced the Language Server Protocol in 2016, which separates language intelligence from the editor: a server for each language provides completion, error checking, and navigation to any editor that speaks the protocol. Instead of every editor implementing every language, each side implements one protocol; see [[Autocomplete]].

Underneath, editors face shared technical problems. Inserting text in the middle of a large file efficiently needs a specialized data structure; see [[Text Buffer]]. Undo history, search with patterns, and handling of character encodings and line endings are everywhere; see [[Undo]], [[Regular Expression]], and [[Line Ending]].

Editor configuration is a classic part of personal configuration files carried between machines; see [[Dotfiles]].

## See also
- [[Keyboard Layout]]
- [[Lindy Effect]]
