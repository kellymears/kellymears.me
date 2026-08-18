---
aliases:
  - VDOM
tags:
  - web
summary: An in-memory representation of the UI that a framework diffs against the previous version to compute minimal real DOM updates.
---
**Virtual DOM** is an in-memory tree of plain JavaScript objects that mirrors what the real [[Document Object Model]] should look like. When state changes, the framework builds a new virtual tree, diffs it against the previous one, and applies only the resulting minimal set of changes to the real DOM — rather than the component author manually figuring out which elements need updating and writing imperative code to update just those.

The reason this exists at all is that real DOM operations are comparatively expensive — a browser recalculating layout and repainting costs far more than allocating and comparing plain objects in memory — so batching many logical changes into one minimal, computed set of real DOM writes is faster in the aggregate than applying each change as it happens, even though the diffing step itself adds work the framework has to do first. It's a genuine trade of one cost for a smaller one, not a free lunch, which is why frameworks bother.

The diffing algorithm relies on a heuristic, not an optimal tree-diff (which is prohibitively expensive to compute exactly): it assumes elements of the same type in the same position are the same element, updated in place, and it uses a `key` prop to track identity across reorderings — a list rendered without stable keys can cause the framework to update the wrong elements' state when items are inserted or removed in the middle, because it loses track of which virtual node corresponds to which item.

Not every framework uses this model — Svelte compiles away the diffing entirely, generating direct DOM-update code at build time — but where it's used, it's the mechanism that lets component code stay declarative ("render this given this state") while the framework handles the imperative part of turning that into efficient DOM writes.

## See also
- [[Document Object Model]]
- [[React Server Components]]
- [[Hydration]]
- [[Optimistic UI]]

## Related
- [[Web Components]]
