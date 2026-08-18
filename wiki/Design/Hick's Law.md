---
aliases:
  - Hick-Hyman Law
tags:
  - design
summary: Decision time rises with the number and complexity of choices offered, roughly logarithmically — fewer options decided faster.
---
**Hick's Law** (Hick, 1952, refined by Hyman) states that the time it takes someone to choose among options grows with the log of the number of options, not linearly. Doubling a menu from four items to eight doesn't double decision time; but going from four to forty does something much worse than the arithmetic suggests, because each additional option also has to be read, parsed, and compared against the others.

The design lesson isn't "always show fewer options" — it's that every option has a decision cost that a flat list doesn't distribute evenly. A 40-item dropdown pays that cost on every use, forever. Grouping items into categories, defaulting to the most common choice, or splitting a decision into two sequential smaller ones (pick a category, then pick within it) all reduce apparent choice count even when the total number of underlying options hasn't changed. This is the theoretical backing for [[Progressive Disclosure]]: hide the long tail until it's asked for, so the common case pays a low decision cost and the rare case still has a path.

It's also the law most often misused to justify over-simplification. Hick's Law describes decision *time*, not decision *quality* — a power user choosing among 40 keyboard shortcuts they've memorized isn't paying the log-scaling cost the law describes, because they're not searching, they're recalling. The law bites hardest on first encounters and on interfaces used casually, which is why onboarding flows and public-facing forms benefit from ruthless option-pruning in a way that expert tools (an IDE's command palette, a video editor's timeline) don't.

Fitts's Law and Hick's Law are often cited together because they cover the two halves of "time to act": how long to decide, and how long to physically reach the choice once decided.

## See also
- [[Fitts's Law]]
- [[Progressive Disclosure]]
- [[Gestalt Principles]]
- [[Design System]]

## Related
- [[Affordance]]
