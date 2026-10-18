---
aliases:
  - Long tasks
  - Main thread
  - Total Blocking Time
  - Interaction to Next Paint
  - INP
tags:
  - web
summary: Any stretch of main-thread work over 50 milliseconds, during which the page can't respond to input, and the techniques for breaking such work up.
---
A **long task** is any single piece of work on a browser's main thread that runs for more than 50 milliseconds. While it runs, the page can't respond: clicks, key presses, and scrolls wait in a queue, and nothing new is painted. Long tasks are the main reason pages feel sluggish after loading quickly.

The main thread does nearly everything. It runs JavaScript, matches CSS, computes layout, and records painting, one task at a time, following the [[Event Loop]]. A task that parses a large script, renders a big component tree, or processes a long list blocks all of it. Only work handed off elsewhere escapes: a [[Compositor]] thread can keep scrolling and some animations moving, and a [[Web Worker]] runs scripts in parallel but can't touch the [[Document Object Model]].

The 50-millisecond threshold comes from Google's RAIL performance model. People perceive a response within about 100 milliseconds as immediate. If no task exceeds 50, any input arriving mid-task waits at most 50 milliseconds, leaving the other half of the budget for handling it and painting the result.

Several measures are built on it:

- **The Long Tasks API** (2017) reports each long task to the page, and the newer Long Animation Frames API (2024) adds attribution, naming which scripts were responsible.
- **Total Blocking Time** is a lab metric that adds up the portion of every long task beyond 50 milliseconds during page load.
- **Interaction to Next Paint** (INP) measures, in the field, how long real interactions take to produce a visible update. It replaced First Input Delay as one of the [[Core Web Vitals]] in March 2024, because it covers every interaction, not just the first.

Common causes are large bundles evaluated at startup, [[Hydration]], [[Layout Thrashing]], expensive event handlers, a heavy [[Third-Party Script]], and rendering long lists at once.

The fixes follow from the model:

- **Yield.** Break work into chunks and give the browser a chance to handle input between them. `scheduler.yield()`, available in Chromium since 2024, resumes the work at high priority after pending input, while `setTimeout` is the older fallback.
- **Do less.** Ship less JavaScript with [[Code Splitting]], render only visible rows, and remove unneeded scripts.
- **Move work.** Run computation in a Web Worker and send results back.
- **Defer.** Postpone non-urgent work with idle callbacks, and limit handler frequency with throttling.

Frameworks absorb some of this. React's concurrent rendering slices rendering work into chunks of a few milliseconds and pauses when input arrives, and islands architecture hydrates only the interactive parts of a page.

[[Profiling]] in browser developer tools marks long tasks in red, which is usually the fastest way to find them. A [[Performance Budget]] that caps main-thread time keeps them from creeping back.

## See also
- [[Virtual Scrolling]]
- [[Browser DevTools]]
- [[Web Worker]]
- [[Debounce and Throttle]]
