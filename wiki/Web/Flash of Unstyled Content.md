---
aliases:
  - FOUC
  - Flash of incorrect theme
  - Paint holding
tags:
  - web
summary: The brief moment when a page appears without its styles, or in the wrong theme, before the right ones apply, caused by the browser painting before everything has loaded, and the reason stylesheets block rendering by default.
---
A **flash of unstyled content**, or FOUC, is the moment when a web page briefly appears as plain, unstyled text and images before its styles apply and it snaps into its intended layout. It lasts a fraction of a second, but it looks broken and makes the page jump. The term was coined in 2001 by Rob Chandanais, describing a quirk in which Internet Explorer painted pages before stylesheets imported in a particular way had loaded.

It follows from a basic trade-off in how browsers load pages. A browser wants to show something as soon as possible, but if it paints before the styles arrive, what it shows will be wrong. The standard answer is that stylesheets linked in the head of a page are **render-blocking**: the browser downloads them before painting anything at all, accepting a blank screen for a moment in exchange for never showing the wrong layout; see [[Critical Rendering Path]] and [[Cascade]].

Flashes return whenever styles arrive by some other path:

- **Late stylesheets.** Styles loaded asynchronously to speed up the first paint, or linked low in the page, apply only after content has already appeared; see [[Code Splitting]].
- **Script-inserted styles.** Approaches that generate CSS from JavaScript in the browser can't style anything until the script runs, which is why such libraries learned to extract styles on the server; see [[Server-Side Rendering]].
- **Custom elements.** Components that define their own appearance when their script loads show as unstyled content until then, a gap usually papered over by hiding undefined elements; see [[Web Components]].
- **Fonts.** Text drawn in a fallback typeface that then swaps to the web font is a related flash, often discussed under the same heading; see [[Web Font Loading]].

A common modern variant is the **flash of incorrect theme**. A site that remembers a reader's choice of dark mode in the browser can't know that choice when its server renders the page, so it sends the default theme, and the page flashes bright before switching. The usual fix is a tiny blocking script at the top of the page that reads the saved preference and sets the theme before the first paint, or relying on the system color preference in CSS so the right theme applies without script; see [[Dark Mode]] and [[Web Storage]].

Browsers have also reduced flashes between pages. Chrome introduced **paint holding** in 2019, which keeps the previous page on screen during a same-site navigation until the new one has something meaningful to show, rather than flashing white, and newer animation features let pages cross-fade instead; see [[View Transitions]].

A flash is also a performance issue. Content that moves after appearing counts against layout stability scores; see [[Layout Shift]] and [[Core Web Vitals]].

## See also
- [[Progressive Enhancement]]
- [[Single-Page Application]]
