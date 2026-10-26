---
aliases:
  - Right-click menu
  - Pie menu
  - Marking menu
  - Shortcut menu
tags:
  - design
summary: A menu of actions for the thing under the pointer, opened by right-click or long press, which saves travel and narrows choices but is invisible until summoned, so it should never be the only route to an action.
---
A **context menu** lists the actions available for whatever is under the pointer or selected, opened with a secondary click, a long press on a touch screen, or a keyboard key. Because it appears where the user is already looking and offers only what applies there, it is one of the fastest ways to act on an object.

Pop-up menus came out of Xerox PARC in the 1970s, where the Smalltalk environment used a three-button mouse and gave one button to menus. The Macintosh shipped with a one-button mouse, so Apple added contextual menus on Control-click only in 1997. Windows 95 made right-click menus standard across the system.

Why they work:

- **No travel.** The menu opens at the pointer, so the distance to the first item is nearly zero; see [[Fitts's Law]].
- **Fewer choices.** Showing only actions that apply to this item shortens the list to scan; see [[Hick's Law]].
- **Acting on the object.** Choosing an action from the thing itself fits the model of grabbing and changing objects directly; see [[Direct Manipulation]].

Their weakness is that nothing on screen says they exist. A context menu has no visible cue, so new users may never find what it holds, and touch users have no right button at all; see [[Discoverability]]. The rule that follows: every action in a context menu should also be reachable some visible way, through a menu bar, toolbar, or button. The context menu is a shortcut, not the only door.

**Pie menus** arrange items in a circle around the pointer, so every item is the same short distance away and is chosen by direction. A 1988 study by Jack Callahan, Don Hopkins, Mark Weiser, and Ben Shneiderman found them faster than linear menus. Gordon Kurtenbach and Bill Buxton's **marking menus** built on this: novices wait for the menu to appear, while experts who know the direction simply flick, and the menu never draws. Practice turns a menu into a gesture, moving the user from recognizing options to recalling them. Weapon wheels in games and radial menus in 3D tools descend from them.

On the web, context menus raise their own issues:

- **Hijacking.** Replacing the browser's menu, or blocking it to stop copying, takes away tools people rely on and stops nobody determined.
- **Keyboard access.** Custom menus need to open from the keyboard, with Shift+F10 or the Menu key, move with arrow keys, and close on Escape with focus returning to the item; see [[Keyboard Navigation]] and [[Focus Management]].
- **Semantics.** [[ARIA]] menu roles tell screen readers what the popup is.

A [[Command Palette]], a searchable list of every command, covers the opposite need: finding an action without knowing where it lives.

## See also
- [[Tooltip]]
- [[Desktop Environment]]
