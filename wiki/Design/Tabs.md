---
aliases:
  - Tabbed interface
  - Tab bar
  - Tab panel
tags:
  - design
summary: A row of labels that switch between panels of content occupying the same space, borrowed from paper folder tabs, suited to parallel sections viewed one at a time, and governed by a specific keyboard pattern.
---
**Tabs** are a row of labels, each of which shows its own panel of content in a shared space. Clicking a tab replaces the visible panel with another. The design comes from paper: index card dividers and file folders with labeled tabs sticking up from the edge; see [[Skeuomorphism]]. Early graphical interfaces used tabs in settings dialogs, and web browsers adopted them for pages in the late 1990s and 2000s.

Tabs work when the content splits into parallel sections that people use one at a time: the description, specifications, and reviews of a product, or the sections of a settings window. They save space while keeping every option visible, which is an advantage over menus that hide choices; see [[Recognition Rather Than Recall]] and [[Hamburger Menu]].

Tabs are the wrong choice in several common cases:

- **When people need to compare panels.** Switching back and forth to compare two tabs makes the reader hold one in memory; see [[Working Memory]].
- **For sequential steps.** Tabs suggest the sections can be visited in any order. A form with required steps needs a step-by-step flow instead; see [[Form Design]].
- **When there are too many.** Tabs that wrap onto two rows jump around when selected in some designs, and tabs that scroll sideways hide options.
- **When most readers need everything.** A single page with headings is easier to read and to search.

Visual design matters. The active tab should look connected to its panel, usually sharing its background and having no border between them, which groups them visually; see [[Gestalt Principles]]. Labels should be short and specific so readers can predict what each panel holds; see [[Information Scent]].

The accessibility pattern for tabs is well defined. The tab list counts as one stop when moving through a page with the Tab key; arrow keys move between tabs; and each tab is marked as selected or not and linked to its panel; see [[ARIA]] and [[Keyboard Navigation]]. That differs from what many developers expect, and custom tabs often get it wrong.

On phones, a bar of four or five tabs at the bottom of the screen became the standard way to navigate apps, reachable with a thumb; see [[Touch Target Size]]. Each tab usually keeps its own history, so switching back returns to where the person left off.

Web tabs that change content without changing the address can't be bookmarked or shared; reflecting the selected tab in the URL fixes this; see [[Deep Linking]].

Browser tabs created habits of their own. People keep dozens open as reminders, and browsers slow down background tabs to save power; see [[Background Tab Throttling]].

## See also
- [[Accordion]]
- [[Desktop Metaphor]]
- [[Progressive Disclosure]]
