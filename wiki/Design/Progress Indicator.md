---
aliases:
  - Progress bar
  - Spinner
  - Loading state
  - Goal gradient effect
  - Labor illusion
tags:
  - design
summary: Spinners, progress bars, and step counters that tell people a system is working and how long is left, which changes how long a wait feels more than how long it is.
---
A **progress indicator** shows that a system is working on something and, ideally, how much is left. It answers the most basic question during a wait: is anything happening? Without one, people can't tell a slow system from a frozen one, so they click again, reload, or leave.

There are two broad kinds:

- **Indeterminate** indicators, such as a spinner or a looping bar, say "working" without saying how long. They suit short waits or work whose length is unknown.
- **Determinate** indicators, such as a filling bar, a percentage, or "step 2 of 4," show how far along things are. They suit longer waits, because knowing the end is coming makes waiting tolerable.

The choice follows from [[Response Time Limits]]. Under about a tenth of a second, no indicator is needed. Up to about a second, flashing a spinner is more distracting than helpful. Between one and ten seconds, a spinner or skeleton keeps people oriented. Past ten seconds, people need a determinate indicator, and ideally the ability to do something else and be notified when it's done, perhaps with a [[Toast Notification]].

Indicators change perception more than speed. Several findings shape how they are designed:

- **Perceived duration.** Waits with feedback feel shorter than identical waits without. Bars that accelerate toward the end feel faster than bars that move steadily, because the ending colors the memory of the whole wait, an instance of the [[Peak-End Rule]].
- **Goal gradient effect.** People speed up as a goal gets closer, a finding first observed in rats running toward food and later in coffee-card customers. A form that shows progress, or a card with two stamps already filled, keeps people going. Unfinished progress also nags, like the [[Zeigarnik Effect]].
- **Labor illusion.** Showing the work being done, such as "searching 300 airlines," can make results seem more valuable, even when the wait is artificial. It can tip into theater.
- **Skeletons over spinners.** A [[Skeleton Screen]] shows the shape of coming content, so the page feels partly loaded. An [[Optimistic UI]] skips the indicator by showing the expected result immediately.

Honest indicators matter. A bar that sits at 99 percent, or one that jumps from 10 to 100, teaches people to ignore it. If the length is truly unknown, an indeterminate indicator is more honest than an invented percentage.

Indicators have accessibility needs too. Spinning and pulsing animation should respect [[Reduced Motion]], screen readers need status announced through [[ARIA]], and determinate progress helps people with [[Time Blindness]] who struggle to judge how long they've been waiting. A load that shifts content when it completes is measured by [[Core Web Vitals]] and punished in search ranking.

## See also
- [[Empty State]]
- [[Pull-to-Refresh]]
- [[Experience Point]]
- [[Heads-Up Display]]
- [[Battle Pass]]
