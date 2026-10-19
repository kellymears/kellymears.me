---
aliases:
  - Side sheet
  - Action sheet
tags:
  - design
summary: A panel that slides up from the bottom of a phone screen to show extra content or choices, often draggable between heights, placed where thumbs can reach it on large phones.
---
A **bottom sheet** is a panel that slides up from the bottom edge of a mobile screen, covering part of the content beneath it. It holds actions, options, details, or a secondary view, and it can often be dragged up to expand, down to shrink, or flicked away to dismiss. A **side sheet** does the same from the side, usually on larger screens.

Sheets became prominent as phones grew. On a small phone, a thumb could reach most of the screen; on a large one, the top corners require stretching or a second hand. Studies of how people hold phones found that most taps happen in the lower and middle parts of the screen, so placing controls there makes them easier to reach; see [[Fitts's Law]] and [[Touch Target Size]]. Navigation also shifted downward, with tab bars replacing menus hidden behind icons at the top; see [[Hamburger Menu]].

Platform guidelines formalized the pattern. Google's Material Design described standard sheets, which coexist with the content behind them, and modal sheets, which block it; see [[Flat Design]]. Apple's iOS long used action sheets for lists of choices and added sheets with adjustable heights, called detents, in 2021. Map applications popularized the most familiar version: the map fills the screen, and a sheet of search results or place details rests at the bottom, draggable to half or full height without hiding the map entirely.

The choice between modal and non-modal matters. A modal sheet dims the background with a translucent layer and must be dealt with before anything else, like any dialog; see [[Modal Dialog]]. A non-modal sheet lets people keep interacting with what's behind it, which suits maps and media players. Partial heights also let a sheet reveal a little information and expand on demand, a form of progressive disclosure; see [[Progressive Disclosure]].

Sheets depend on gestures, which creates problems. Dragging the sheet competes with scrolling content inside it, so designers must decide when a swipe scrolls the list and when it moves the sheet; see [[Gesture]]. Swipes are invisible, so a visible handle and a close button help people who don't discover them, and those who can't perform gestures need an alternative; see [[Signifier]]. Opening a sheet should move keyboard and screen reader focus into it and return focus when it closes; see [[Focus Management]]. Animation should feel physical, following the finger and settling with natural deceleration; see [[Easing]] and [[Direct Manipulation]].

On wider screens, sheets often become something else: a dialog in the center, a side panel, or a menu anchored to the button that opened it; see [[Context Menu]]. Designing for both requires deciding at which width the presentation changes; see [[Responsive Breakpoint]].

## See also
- [[Pull-to-Refresh]]
- [[Haptic Feedback]]
