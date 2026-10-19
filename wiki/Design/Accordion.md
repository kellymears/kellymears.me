---
aliases:
  - Collapsible section
  - Disclosure widget
  - Expander
tags:
  - design
summary: A stack of headings that each expand to reveal a section of content, saving space on long pages and small screens at the cost of hiding what readers might have needed to see.
---
**An accordion** is a vertical stack of headings, each of which expands to reveal its content when clicked and collapses again when clicked a second time. A single expanding section is often called a disclosure widget; a group of them is an accordion, after the instrument's folding bellows. Some accordions let several sections stay open at once; others close one section when another opens.

The pattern is a form of [[Progressive Disclosure]]. A page of frequently asked questions can show twenty questions on one screen and let readers open only the ones they care about. On phones, where vertical space is scarce, accordions compress long pages of settings, product details, or navigation.

Hiding content has costs, and usability researchers at the Nielsen Norman Group have long cautioned against overusing it:

- **People read less of what's hidden.** Readers have to guess from a heading whether a section contains what they want; vague headings fail them.
- **Find in page fails.** A browser's search typically can't find text in a closed section, so a reader searching for a word may conclude it isn't there.
- **Comparison suffers.** If opening one section closes another, readers can't look at two at once, and have to hold one in memory.
- **Pages jump.** Opening a section pushes everything below it down, which can move what the reader was about to click; see [[Layout Shift]].

A rule of thumb is that accordions suit content where readers need a few sections, not most of them. If most readers will open everything, a long page with clear headings and a table of contents works better.

The web gained a native accordion when browsers added the details and summary elements, first in Chrome around 2011 and in all major browsers by 2020. They work without JavaScript, are announced correctly to assistive technology, and can be operated from the keyboard; see [[Semantic HTML]] and [[Progressive Enhancement]]. Browsers later added a way to group them so only one opens at a time, and a hidden-until-found setting that lets find in page open a collapsed section when it finds a match.

Custom accordions built from generic elements need the same behavior added by hand: a real button for each heading, an attribute telling screen readers whether it's expanded, and correct handling of focus; see [[ARIA]], [[Screen Reader]], and [[Keyboard Navigation]]. A small icon, usually a chevron or a plus sign, signals that a heading can be opened; see [[Signifier]].

Animated opening helps readers follow what moved but should be quick and respect a reduced motion preference; see [[Reduced Motion]].

## See also
- [[Tabs]]
- [[Hamburger Menu]]
- [[Dropdown Menu]]
