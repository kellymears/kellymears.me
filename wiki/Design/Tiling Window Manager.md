---
aliases:
  - Tiling window management
  - Tiling WM
  - Window tiling
  - Scrolling window manager
  - Master-stack layout
tags:
  - design
summary: A window manager that arranges windows automatically into non-overlapping tiles and is driven mainly from the keyboard, trading freeform placement for zero layout effort.
---
A **tiling window manager** arranges windows automatically so they fill the screen without overlapping. Opening a window splits the space. Closing one gives the space back. There is no dragging, resizing by hand, or digging through a stack of overlapping windows for the one underneath. Most are driven from the keyboard: shortcuts move focus, swap windows, change layouts, and switch between numbered workspaces.

The idea is older than the overlapping desktop most people know. Early systems such as Xerox's Cedar and the first version of Microsoft Windows (1985) tiled their windows. Overlapping windows won the mainstream, partly because they map onto the metaphor of papers on a desk. Tiling survived and flourished in the Unix world through window managers such as dwm, i3, and their successors, and since the move to Wayland in compositors that tile natively.

Layouts take a few forms:

- **Manual tiling** (the i3 model): the user decides whether the next window splits the current tile horizontally or vertically, building a tree of containers.
- **Dynamic tiling** (the dwm model): a rule places windows automatically, often a *master-stack* layout with one large main window and the rest stacked beside it.
- **Scrolling tiling**: windows sit side by side on an infinite horizontal strip that the screen scrolls along, so opening a window never shrinks the others.

The case for tiling is mostly about effort and attention. Every window placement on an overlapping desktop is a small decision and a pointing task, and [[Fitts's Law]] and [[Hick's Law]] both put a cost on it. Tiling turns layout into a rule, making placement predictable and reachable by a fixed key. Workspaces dedicated to a purpose, one for the editor and one for chat, let a whole context be switched with one key, and help reduce the [[Attention Residue]] that a cluttered screen invites. The cost is a learning curve and awkward handling of applications that assume freeform windows: floating dialogs, picture-in-picture, and windows that resize themselves.

The approach shares principles with layout on the web. A tiling layout is a [[Grid System]] for applications, and keyboard-first control depends on the same careful [[Focus Management]] and [[Keyboard Navigation]] that interfaces need for [[Accessibility]].

## See also
- [[Display Server]]
- [[CSS Grid]]
- [[Desktop Metaphor]]
- [[Terminal Multiplexer]]
- [[Grid System]]
- [[Ricing]]
- [[Attention Residue]]
- [[Flexbox]]
