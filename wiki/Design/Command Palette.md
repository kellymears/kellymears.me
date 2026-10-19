---
aliases:
  - Command menu
  - Command bar
  - Quick open
  - Cmd-K
tags:
  - design
summary: A keyboard-summoned search box that finds and runs any command by typing part of its name, giving power users speed without forcing every feature into menus.
---
A **command palette** is a search box, summoned by a keyboard shortcut, that lists every action an application can perform and filters them as the user types. Type "tog dark" and "Toggle dark mode" rises to the top; press Enter and it runs. The palette turns a sprawling interface into one text field.

The idea is old. Emacs has offered `M-x`, run any command by name, since the 1970s, and a [[Shell]] is a command palette with a stricter grammar. Apple's Spotlight, in 2005, brought typed launching to the desktop. Sublime Text, around 2011, popularized the modern form: Goto Anything for files and a Command Palette for actions, both fuzzy-matched. VS Code adopted it, and from there it spread into web apps, where `⌘K` became the conventional shortcut in tools such as Slack, Linear, Notion, and GitHub.

Palettes work because they trade recall for recognition. Nobody remembers where a menu item lives or which of forty keyboard shortcuts does what, but most people can type a few letters of what they want. Recognition rather than recall is one of the heuristics used in [[Heuristic Evaluation]], and it relieves [[Working Memory]].

Several design details decide whether a palette feels fast or frustrating:

- **Fuzzy matching.** Matching non-contiguous letters, so "gtf" finds "Go to file", and tolerating typos, using ideas from [[Edit Distance]]. Matches at word starts should rank higher.
- **Ranking by use.** Recently and frequently run commands float to the top.
- **Showing shortcuts.** Listing each command's keyboard shortcut beside it teaches the faster path, letting the palette work as a tutor rather than a crutch.
- **Scope and context.** Commands irrelevant to the current selection are hidden or demoted, and prefixes such as `>` or `@` can switch between commands, files, and symbols.
- **Speed.** Results must update on every keystroke, well within the [[Response Time Limits]] that make an interface feel instantaneous.

Accessibility needs the usual care for a popup. The palette is a dialog with a combobox inside it: focus moves into the input on open, arrow keys move through results announced via [[ARIA]], Escape closes it, and focus returns to where it was, as described under [[Focus Management]] and [[Modal Dialog]]. Everything must work without a mouse, which is the point anyway; see [[Keyboard Navigation]].

The palette's weakness is discoverability. People cannot search for a feature they do not know exists, and a blank text box shows nothing about what the product can do. That makes it a complement to visible navigation, not a replacement, the same balance that [[Progressive Disclosure]] strikes between showing everything and showing too little. It also eases the tension that [[Hick's Law]] describes: an interface can offer hundreds of commands without displaying hundreds of choices.

## See also
- [[Tabs]]
- [[Command-Line Interface]]
- [[Direct Manipulation]]
- [[Context Menu]]
