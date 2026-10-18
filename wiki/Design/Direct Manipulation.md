---
aliases:
  - Drag and drop
  - Direct manipulation interface
tags:
  - design
summary: Ben Shneiderman's 1983 name for interfaces where people act on visible objects with immediate, reversible feedback, such as dragging a file or resizing a shape, instead of typing commands that describe the change.
---
**Direct manipulation** is an interaction style in which people act on visible representations of objects, by pointing, dragging, and resizing them, and see the result immediately. Ben Shneiderman named it in 1983, pointing to what made the period's most successful software, such as video games, early spreadsheets, and display editors, feel easy to learn. Moving a file by dragging its icon into a folder is direct manipulation; typing `mv report.txt archive/` is not.

Shneiderman identified three properties:

1. **Continuous representation.** The objects of interest stay visible on screen, rather than existing only in the user's head; see [[Recognition Rather Than Recall]].
2. **Physical actions instead of syntax.** Pointing, dragging, and pressing replace typed commands with exact spelling and arguments.
3. **Rapid, incremental, reversible operations.** Each action has an immediately visible effect, and can be undone; see [[Undo]].

The early spreadsheets are a clear example. Before VisiCalc in 1979, changing one number in a financial model meant rerunning a program. In a spreadsheet, the user edits a cell and watches every dependent figure change at once; see [[Spreadsheet]]. Word processors that show the page as it will print, called WYSIWYG, did the same for documents. Both relied on the [[Desktop Metaphor]] and on the mouse.

Why it works: people can see what is possible, see what happened, and correct mistakes quickly, which narrows what Don Norman called the gulfs of execution and evaluation, the distance between what a person wants and what the system shows; see [[Mental Model]]. Errors are rare because the interface usually shows only valid actions, and cheap because they are reversible. Novices can learn by exploring.

Good direct manipulation depends on details:

- **Feedback during the action.** Dragged items should follow the pointer smoothly and show where they will land; delays break the illusion; see [[Response Time Limits]].
- **Clear targets.** Drop zones and handles must be large enough to hit; see [[Fitts's Law]] and [[Touch Target Size]].
- **Signifiers.** Draggable items need a visible cue, such as a grip texture or a cursor change; see [[Signifier]].
- **Alternatives.** Dragging is hard for people using keyboards, switches, or screen readers, so every drag operation needs a keyboard or menu equivalent; see [[Keyboard Navigation]] and [[Accessibility]].

Its limits show with scale and abstraction. Renaming a thousand files or applying a rule to every row is tedious one object at a time, and commands or scripts do it in one step; see [[Shell]]. Many tools combine both, with a [[Command Palette]] alongside the canvas. Touchscreens pushed direct manipulation further, letting people pinch and swipe content itself rather than a cursor standing in for a hand.

## See also
- [[Affordance]]
- [[Skeuomorphism]]
