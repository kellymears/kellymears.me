---
aliases:
  - jQuery UI
  - Sizzle
tags:
  - web
summary: The JavaScript library that made browser scripting bearable in the 2000s by hiding browser differences behind a short, chainable syntax for selecting and changing page elements, and whose ideas the platform later absorbed.
---
**jQuery** is a JavaScript library, released by John Resig in January 2006, that made it practical to script web pages at a time when browsers disagreed about nearly everything. For about a decade it was close to universal, and it remains on a large share of websites today, much of it inherited code.

The mid-2000s browser was hostile ground. Internet Explorer and its rivals used different methods to attach event handlers, to make background requests, and to measure and style elements, and each had its own bugs; see [[Browser Wars]]. Writing a simple interaction meant writing it twice and testing it everywhere. jQuery hid those differences behind one consistent interface, quietly patching around each browser's quirks; see [[Polyfill]].

Its design rested on two ideas:

- **Select with CSS.** Find elements using the same selector syntax as stylesheets, which designers already knew, through a single function usually written as a dollar sign. Its selector engine, Sizzle, was later spun out as its own project; see [[Cascade]].
- **Act on the whole set, and chain.** Every method applied to all matched elements and returned the set again, so a single line could find every menu item, add a class, attach a click handler, and fade them in.

On top of that came short helpers for animations, for background requests that update part of a page without reloading it, and for delegating events from many elements to one ancestor; see [[Fetch API]] and [[Event Delegation]]. A huge ecosystem of plugins followed, from image carousels to date pickers, plus companion projects for interface widgets and mobile sites.

jQuery's success changed the platform. Browsers standardized its ideas natively: selecting elements by CSS selector, toggling classes, a cleaner request API, and consistent events; see [[Document Object Model]] and [[Web Standards]]. Once old Internet Explorer versions faded, much of the library's reason to exist went with them. A popular 2014 site, "You Might Not Need jQuery," showed the plain equivalents side by side.

Its programming model also aged. jQuery code reads the page and changes it directly in response to events. In a large application, many scattered handlers each editing the page drift out of sync with the underlying data, and bugs arise from the page's state being stored in the page itself. Frameworks that describe the page as a function of state replaced that style; see [[Virtual DOM]], [[State Management]], and [[Single-Page Application]]. GitHub removed jQuery from its site in 2018, and the Bootstrap interface toolkit dropped it as a dependency in 2021.

Yet jQuery persists, bundled into content management systems, themes, and older applications that work fine and have no reason to change; see [[Technical Debt]] and [[Lindy Effect]]. It remains maintained, with major versions still released.

## See also
- [[Adobe Flash]]
- [[Web 2.0]]
- [[Web Animations API]]
