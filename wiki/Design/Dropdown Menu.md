---
aliases:
  - Select menu
  - Mega menu
  - Pull-down menu
tags:
  - design
summary: A control that hides a list of options until it's opened, saving space at the cost of hiding choices, which ranges from desktop menu bars to the web's notoriously hard-to-style select element and the sprawling mega menus of retail sites.
---
A **dropdown menu** shows a single button or field that, when activated, reveals a list of options below it. Picking one closes the list. It's one of the oldest controls in graphical interfaces and one of the most overused.

Pull-down menus came from research on graphical interfaces in the 1970s and reached the public with Apple's Lisa and Macintosh in 1983 and 1984, where a menu bar across the top of the screen held every command. Putting the bar at the screen's edge made it easy to hit, since the pointer stops at the edge and the target is effectively infinitely tall, which [[Fitts's Law]] rewards. Showing commands in menus let people find them by browsing rather than remembering them.

On the web, the form element for picking from a list has existed since the mid-1990s. It is accessible and works with keyboards, screen readers and mobile pickers automatically, but for decades browsers allowed almost no control over its appearance, so many sites rebuilt it from scratch. Those custom versions often broke keyboard use and screen readers unless built carefully with the right roles and states; see [[ARIA]] and [[Keyboard Navigation]]. Browsers have recently begun allowing the native control to be styled, and newer platform features handle floating menus directly.

Dropdowns suit some lists better than others. For a few options, showing them all as [[Radio button]] choices is faster and makes them visible at a glance. For very long lists, such as countries, scrolling a dropdown is tedious, and a text field that filters as you type works better; see [[Combobox]]. Hiding choices also makes them less likely to be considered, which matters when a dropdown holds an important setting; see [[Progressive Disclosure]].

Menus that open on hover have their own problems. Moving the pointer diagonally from a menu item toward its submenu can cross other items and switch the submenu away. A widely shared solution, popularized by a large retailer's site, detects movement toward the submenu and delays switching. Hover menus don't exist on touchscreens, and small menu items are hard to tap; see [[Touch Target Size]].

**Mega menus**, large panels showing many links in groups, are used by retail and news sites to expose a whole section structure at once; see [[Information Architecture]]. Elsewhere, menus have moved toward icons that open panels and searchable command lists; see [[Hamburger Menu]] and [[Command Palette]]. A [[Context Menu]], opened by right-clicking an object, offers actions for that object.

Positioning the menu so it stays on screen, flipping upward near the bottom edge, is a recurring implementation chore that newer CSS positioning features aim to simplify.

## See also
- [[Date Picker]]
- [[Headless Component]]
- [[Accordion]]
