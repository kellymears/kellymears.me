---
aliases:
  - YAGNI
  - Speculative generality
tags:
  - method
summary: The rule of building only what current requirements need, not features or flexibility for imagined future needs, because predicted needs usually turn out wrong and the extra code costs effort to carry.
---
**You aren't gonna need it**, usually shortened to **YAGNI**, is the rule that you should build only what the current requirements call for, not features or flexibility for needs you predict. It came out of Extreme Programming in the late 1990s, associated with Ron Jeffries and Kent Beck, as a counterweight to the habit of designing for every future case up front.

The argument is about costs. A feature or abstraction built for a predicted need has to be designed, written, tested, documented, and then maintained by everyone who touches the code afterward. Martin Fowler listed what that costs:

- **Cost of building.** The time spent on it could have gone to something needed now; see [[Opportunity Cost]].
- **Cost of delay.** Work actually required ships later.
- **Cost of carrying.** The extra code makes everything around it harder to understand and change, even when nobody uses it; see [[Technical Debt]].
- **Cost of being wrong.** Predictions about future needs are often mistaken. When the need finally arrives, it differs from what was imagined, and the speculative design has to be undone before the real one can be built.

Code written for imagined needs has a name in refactoring catalogs, **speculative generality**: hooks, parameters, abstract base classes, and configuration options that nothing uses yet. A plugin system for a program with one plugin, or a database layer designed to swap databases that will never be swapped, are typical; see [[Leaky Abstraction]]. Such code is a form of [[Premature Optimization]], aimed at flexibility instead of speed.

YAGNI depends on a precondition: that change later is cheap. The rule came bundled with practices that make it so, especially automated tests and continuous [[Refactoring]]. Without them, adding a capability when it's actually needed can be painful, and building it early looks attractive. With them, the cheapest time to build something is usually when it's needed, because that's when the requirements are clearest.

The rule is often misread. It doesn't mean ignoring obvious near-term needs, skipping security or error handling, or writing code that is hard to change. Some decisions are expensive to reverse, such as public interfaces, data formats, and storage layouts, and deserve foresight because they are hard to undo later; see [[Path Dependence]]. YAGNI targets features and generality, not quality.

It sits with a family of related advice. Simple systems that work tend to grow into complex ones that work, while complex designs built up front tend not to; see [[Gall's Law]]. Ambitious rewrites that try to anticipate everything often collapse under their own weight; see [[Second-System Effect]]. And the urge to add one more option is how scope expands without anyone deciding it should; see [[Feature Creep]].

## See also
- [[Worse Is Better]]
- [[Minimum Viable Product]]
- [[Walking Skeleton]]
- [[Extreme Programming]]
- [[Don't Repeat Yourself]]
- [[KISS Principle]]
