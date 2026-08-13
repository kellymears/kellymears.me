---
aliases:
  - Breakpoints
  - Media query
tags:
  - design
summary: A viewport width at which a layout changes, and the assumptions that come with it.
---
A **responsive breakpoint** is a viewport size at which layout rules change, expressed as a media query. Breakpoints are the oldest tool in responsive design and remain the right one when the *page* really does need to be arranged differently at different window sizes.

They encode an assumption that is often false: that viewport width equals available width. Any surface where content is inset — a preview frame, a panel-adjacent region, an embedded widget — breaks that assumption, which is what [[Container Query]] exists to fix.

Three practical notes recur.

**Verify at the widths people actually use.** A default automation viewport is much narrower than a real monitor, and layouts that overflow at wide sizes look perfectly centred at that default. Explicitly setting a wide viewport before a visual check catches a whole class of bug that otherwise reaches the user first.

**Test runners have their own default width**, and it is rarely the round number you would guess. An element hidden between two breakpoints will be absent from the default canvas, and a query for it fails in a way that looks like a component bug.

**Fewer breakpoints is usually better.** Maintaining the same spatial arrangement across sizes, where it works, removes a whole dimension from everyone's mental model.

## See also
- [[Container Query]]
- [[Component Story]]
- [[Headless Browser]]
- [[Visual Regression Testing]]

## Related
- [[Integration Test]]
- [[Unit Test]]
- [[Test Fixture]]
