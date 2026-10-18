---
aliases:
  - Developer tools
  - Web Inspector
  - Firebug
  - Inspect element
tags:
  - web
summary: The inspection and debugging tools built into every browser, descended from the 2006 Firebug extension, which expose the live DOM, styles, network traffic, and performance of any page and now also serve as the control channel for browser automation.
---
**Browser developer tools**, or DevTools, are the panels built into every major browser for inspecting and debugging web pages. Right-click anything and choose "Inspect," and the browser shows the live document structure behind it, the styles that apply, and the scripts and network requests that produced it. They are the main way web developers see what their code is actually doing.

Early web development had little more than "view source" and alert boxes. In 2006, Joe Hewitt released **Firebug**, a Firefox extension that let developers inspect the live page, edit its styles and markup and see the result instantly, watch network requests, and debug JavaScript; see [[Browser Extension]]. It changed web development, and every browser built its own equivalent: WebKit's Web Inspector, Chrome's DevTools, and later Firefox's own tools, which replaced Firebug in 2017. Firebug's console functions, such as the one for logging a value, became a de facto standard that every browser adopted.

The standard panels:

- **Elements.** The live document tree, which may differ greatly from the original source after scripts run, with every rule that applies to the selected element and which ones won; see [[Document Object Model]] and [[Cascade]].
- **Console.** Logged messages and errors, plus a prompt that runs code in the page's own context.
- **Sources.** A full debugger with breakpoints and step-through, mapping compressed production code back to the original files; see [[Debugger]] and [[Source Map]].
- **Network.** Every request as a waterfall over time, with headers, timings, and cache status; see [[HTTP Caching]].
- **Performance.** A recording of everything the browser did, showing long tasks, layout work, and paint; see [[Profiling]] and [[Long Task]].
- **Application.** Stored cookies, local storage, and service workers; see [[Web Storage]].

DevTools also emulate conditions, such as phone screens, slow networks, and throttled processors, and run automated audits of performance and accessibility; see [[Core Web Vitals]]. Breakpoints can also pause a script when a particular element changes, an event fires, or a particular request goes out, which finds the code responsible for a change nobody can locate.

Everything changed in DevTools is local and temporary. That is why "inspect element" is a popular way to fake screenshots of bank balances, headlines, or messages: the page shows whatever was typed, though nothing changed on the server. It also creates a scam. Attackers persuade people to paste code into the console, handing over their logged-in session, so some large sites print a warning there; see [[Cross-Site Scripting]].

The tools rest on a protocol that lets one program drive and observe a browser. The same channel that powers the panels lets testing and scraping tools control a browser without a visible window, and lets AI agents operate web pages; see [[Web Crawler]] and [[Computer Use]].

## See also
- [[Layout Thrashing]]
- [[Browser Engine]]
