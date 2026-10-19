---
aliases:
  - View Transitions API
  - View transition
  - Shared element transition
  - FLIP animation
tags:
  - web
summary: A browser API that animates between two states of a page, or between two pages, by snapshotting the old and new views and morphing between them.
---
**View transitions** let the browser animate between two states of a page. Code wraps a DOM update in `document.startViewTransition()`. The browser captures a snapshot of the current view, runs the update, captures the new view, and animates from one to the other. By default it crossfades the whole page, and CSS customizes the rest.

Animating between views used to be hard because the old and new content had to coexist. Developers kept both in the [[Document Object Model]] by hand, or used the FLIP technique (First, Last, Invert, Play): measure an element's position before and after a change, then animate a transform from the old position to the new one. A view transition does this bookkeeping automatically.

How it works:

- **Snapshots.** The old view becomes a static image, and the new view is live. Both are placed in a tree of pseudo-elements, `::view-transition-old` and `::view-transition-new`, drawn above the page in their own top layer, outside any [[Stacking Context]].
- **Named elements.** Giving an element a `view-transition-name` captures it separately. If the old and new views both contain an element with the same name, the browser morphs one into the other, moving and resizing it. A thumbnail can grow into a hero image on the detail page. Each name must be unique on the page at any moment.
- **CSS animation.** Each pseudo-element is animated with ordinary CSS keyframes, so [[Easing]], duration and direction are styled like any other animation, and the animation runs on the [[Compositor]].

Same-document transitions shipped in Chrome in 2023 for [[Single-Page Application]] routing. Cross-document transitions followed in 2024: a multi-page site opts in with one CSS rule, `@view-transition { navigation: auto; }`, and full page loads between same-origin pages animate too. Safari supports both, and Firefox added same-document support later. That gave server-rendered sites a feature that once justified building an SPA.

The design rationale comes from [[Motion Design]]. A transition shows where content went: an item that grows into a detail view is plainly the same object, which keeps the user's [[Mental Model]] of the interface intact. Elements moving together are read as related, as the common-fate rule of the [[Gestalt Principles]] predicts.

Practical cautions:

- **Reduced motion.** Large morphs can trigger vestibular symptoms. Turn them off or shorten them to a fade under `prefers-reduced-motion`, as described in [[Reduced Motion]].
- **Blocking.** The page doesn't render while the update callback runs, so a slow callback freezes the screen. Keep the update fast.
- **Fallback.** Browsers without support just apply the change instantly, which makes view transitions a natural fit for [[Progressive Enhancement]].
- **Focus.** The animation is visual only. After a route change, move focus deliberately, as [[Focus Management]] requires.

Keep transitions to a few hundred milliseconds; longer ones make navigation feel slower.

## See also
- [[Web Animations API]]
- [[Speculation Rules]]
- [[Popover API]]
- [[Easing]]
