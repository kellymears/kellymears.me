---
aliases:
  - Image slider
  - Rotating banner
tags:
  - design
summary: A panel that rotates through several slides in one spot, popular on home pages as a way to give everyone's content top billing, and notorious for low engagement and accessibility problems.
---
A **carousel** is a panel that shows one of several slides at a time, rotating through them automatically or when the visitor clicks arrows or dots. It became a fixture of home pages in the late 2000s and is one of the most criticized patterns in web design.

Its popularity was often political rather than practical. When several departments each want their promotion at the top of the home page, a carousel lets everyone win: each gets the prime spot for a few seconds. It turns an argument about priorities into a rotation, which is why critics describe carousels as a way to avoid a decision.

The evidence on use is poor. A widely shared 2013 analysis of a university home page found that about 1 percent of visitors clicked any slide, and of those clicks, most went to the first. Later studies found similar patterns: people look at the first slide, if anything, and skim past the rest. Several things work against it:

- **Ad blindness.** Large, image-heavy panels at the top of a page look like advertising, and people have learned to ignore advertising.
- **Bad timing.** Automatic rotation moves on while someone is still reading, or just as they reach to click, so they land on the wrong slide.
- **Low scent.** Only one slide is visible, so visitors can't tell what the others hold or whether any is worth waiting for.

Accessibility problems are serious. Motion that starts on its own distracts people with attention difficulties and can make some people dizzy; accessibility guidelines require a way to pause any movement that lasts more than five seconds, and automatic rotation should respect the system setting for [[Reduced Motion]]. Controls must be reachable and usable from the keyboard, with hidden slides kept out of the tab order; see [[Keyboard Navigation]]. When slides change, focus must not jump unexpectedly; see [[Focus Management]]. A [[Screen Reader]] user may hear slides change mid-sentence unless announcements are handled carefully, which is why accessible carousels pause rotation whenever focus is inside them.

Carousels do have legitimate uses. Swiping through photos of one product, or a row of related items a visitor chooses to browse, works because the visitor is in control and the slides are alternatives of the same kind. The problem is the auto-rotating hero with unrelated messages.

The usual advice is to pick the single most important message for the top of the page and list the others below it, where they stay visible; see [[Visual Hierarchy]]. If several items really matter equally, a static grid shows them all at once. Measuring clicks per slide is often enough to settle the argument.

## See also
- [[Motion Design]]
- [[AB Testing]]
