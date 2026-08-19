---
aliases:
  - Disclosure Pattern
tags:
  - design
summary: Show only what most users need now, and defer the rest behind an explicit action, instead of exposing everything at once.
---
**Progressive disclosure** is an interface strategy of revealing information or options in stages — showing the common case by default and putting the rest behind an "advanced," "more," or expand affordance — rather than presenting every possible option flat on one screen. The term was popularized by Jakob Nielsen's usability writing, though it goes back to 1980s HCI research, and the underlying instinct (a settings dialog with an "Advanced" tab, a form that only asks for a shipping address if "same as billing" is unchecked) predates the name.

The theoretical justification is [[Hick's Law]]: decision time scales with the number of visible options, so hiding the rarely-needed ninety percent behind a click reduces the decision cost paid by the ninety percent of users who never needed it, while leaving a path — usually one extra click — for the ten percent who do. It's a strict improvement over "just remove the option," which solves the same decision-cost problem by deleting capability instead of deferring its visibility.

The failure mode is disclosure that hides something a *majority* of users actually need, which just relocates the cost rather than reducing it — an "advanced" tab that everyone has to open defeats the purpose and adds a click on top. The tell is usage data: if the hidden panel gets opened by most sessions, it wasn't advanced, it was mis-triaged. The pattern also interacts with trust — hiding pricing, fees, or consequences behind a disclosure step crosses over into [[Dark Pattern]] territory the moment the hidden information was something the user needed to decide well, not something they merely didn't need yet.

Progressive disclosure is one of the load-bearing arguments for keeping a product's default view sparse and pushing configurability into a settings layer, which is also the argument a [[Design System]] makes for keeping a component's default props minimal and its escape hatches explicit.

## See also
- [[Hick's Law]]
- [[Dark Pattern]]
- [[Fitts's Law]]
- [[Design System]]

## Related
- [[Affordance]]
