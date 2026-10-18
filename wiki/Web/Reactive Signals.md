---
aliases:
  - Signals (reactivity)
  - Fine-grained reactivity
  - Reactivity
  - Computed value
tags:
  - web
summary: Values that remember who reads them and notify exactly those readers when they change, the fine-grained reactivity model behind Solid, Svelte, Vue, Angular, and a proposed JavaScript standard.
---
A **signal** is a value that keeps track of who reads it. When a piece of UI or a calculation reads a signal, the signal records that dependency automatically. When the signal's value changes, it notifies exactly those dependents and nothing else. A UI built from signals updates only the text node or attribute that depends on the changed value, without re-running components or comparing trees.

The model has three parts:

- **Signals** hold state, such as a count.
- **Computed values** derive from other signals, such as a full name from first and last names. They recalculate only when an input changes and cache the result otherwise, a form of automatic [[Memoization]].
- **Effects** run side effects, such as updating the [[Document Object Model]] or saving to storage, whenever the signals they read change.

Dependencies form a graph, and updating it correctly is subtle. If a signal changes and two computed values depend on it, and a third depends on both, the third must not run with one stale input, a *glitch*. Implementations avoid glitches by marking dependents dirty first and recomputing lazily in dependency order, effectively a [[Topological Sort]]. The approach is often called push-pull: changes push notifications, and values are pulled when read.

The spreadsheet is the original example. Change a cell, and every formula depending on it updates, while unrelated cells stay untouched. Programming libraries followed: Knockout's observables in 2010, MobX, and Vue's reactivity system. SolidJS, by Ryan Carniato, popularized the word *signals* around 2021 by showing that fine-grained updates could make a UI framework both simple and very fast. Preact added signals in 2022, Angular in 2023, and Svelte 5 rebuilt itself on them as *runes* in 2024.

Signals are a different bet from the [[Virtual DOM]]. React re-runs a component when its state changes and diffs the output to find what changed, a simple model whose cost grows with component size. Signals skip the diff by knowing the dependencies precisely, so cost scales with what changed. React's response has been an optimizing compiler that memoizes automatically, approaching the same result from the other side.

A proposal to add signals to JavaScript itself reached Stage 1 at TC39 in 2024, aiming for a shared core frameworks could build on.

Signals have their own pitfalls:

- **Lost tracking.** Dependencies are recorded only during synchronous reads, so a signal read after an `await` may not be tracked.
- **Hidden flow.** Automatic dependencies make it harder to see why something updated, or why it did not.
- **Effects everywhere.** Overusing effects to sync state into other state creates loops and ordering bugs.

Build systems that rebuild only what changed use the same idea. Where [[Optimistic UI]] needs instant local updates and [[Hydration]] needs cheap startup, fine-grained reactivity helps both.

## See also
- [[Spreadsheet]]
- [[Memoization]]
- [[Islands Architecture]]
- [[Immutability]]
