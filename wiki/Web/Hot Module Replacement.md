---
aliases:
  - HMR
  - Fast Refresh
  - Live reload
  - Hot reloading
tags:
  - web
summary: Swapping edited modules into a running app without a full page reload, so developers see changes instantly while keeping application state.
---
**Hot module replacement** (HMR) updates a running application with edited code without reloading the page. Change a component's styles or logic and the new version appears in place within milliseconds, while the rest of the app keeps its state: the open dialog, the half-filled form, the scroll position.

Its predecessor was **live reload**, which watched files and refreshed the whole page on any change. That beat refreshing by hand, but every reload threw away state.

Webpack introduced HMR around 2014. The development server tracks the [[Module Graph]], and when a file changes it rebuilds that module and pushes it to the browser over a [[WebSocket]]. The runtime then looks for a *boundary*: the changed module, or the nearest module importing it, that has declared it can accept updates. That module's old version is disposed of and the new one swapped in. If no boundary accepts the update, the change propagates up to the root and the page falls back to a full reload.

Framework integrations make boundaries automatic:

- **React Fast Refresh** (2019), successor to Dan Abramov's React Hot Loader, treats every module that exports only components as a boundary. Editing a component re-renders it with its hook state preserved; editing a module that exports anything else, or one with a syntax error, triggers a fuller reset.
- **CSS** is the easy case: swap the stylesheet and the browser re-renders, with no state at risk.
- **Vite** (Evan You, 2020) serves native [[ES Modules]] during development instead of a [[Bundler]] output, so an update only recompiles the one changed file. HMR stays fast however large the app grows.

HMR has characteristic bugs. Module-level side effects run again when a module is replaced, so a timer, event listener, or subscription set up at import time is duplicated unless the module registers a disposal hook, a small memory leak that exists only in development. Closures captured by the old module can keep calling old code. Preserved state can also be state the new code would never have produced. When behavior seems impossible, a full reload is the first check.

The idea is far older than the web. Erlang has supported *hot code loading* in production since the 1980s, keeping two versions of a module in memory so long-running telephone switches could be upgraded without dropping calls. Lisp and Smalltalk environments let programmers redefine functions in a running image. The web version is narrower, used almost entirely in development, while production uses [[Code Splitting]] and versioned files to change code between page loads.

Fast feedback matters: each wait between a change and its result breaks concentration, and a sub-second loop keeps a developer in Flow.

## See also
- [[Bundler]]
- [[Module Graph]]
- [[ES Modules]]
- [[Developer Experience]]
- [[File Watching]]
