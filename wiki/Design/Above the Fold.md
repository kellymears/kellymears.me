---
aliases:
  - Below the fold
  - The fold
tags:
  - design
summary: The part of a page visible without scrolling, a newspaper idea carried onto the web, where it still matters for first impressions and loading but no longer means people won't scroll.
---
**Above the fold** is the part of a page visible before any scrolling. The term comes from broadsheet newspapers, which were folded in half for display on newsstands, so only the top half of the front page showed. Editors put the biggest headline and the most striking photo there to sell the paper.

Early web designers carried the idea over. In the 1990s, studies suggested many visitors didn't scroll, and the advice was to fit everything important into the first screen. That produced crowded home pages and a long argument.

The argument has largely been settled by data. Eye-tracking and analytics studies through the 2000s and 2010s found that people do scroll, especially on phones, where scrolling is the main way of moving through anything; see [[Eye Tracking]]. But attention is still unevenly spread. Studies by the Nielsen Norman Group found visitors spent most of their viewing time on the first screen, with attention falling off further down. Both findings hold: people scroll, and the top still gets the most attention.

Several complications:

- **There is no single fold.** Screens range from small phones to wide monitors, and browser windows are resized, so the visible area varies enormously; see [[Responsive Web Design]].
- **False floors.** A design that looks complete, such as a full-screen image with nothing peeking from below, can make people think there is nothing more. Letting content visibly continue past the bottom edge invites scrolling.
- **Scent matters more than position.** People scroll when they expect to find what they want, so the first screen's job is to show that the page is relevant; see [[Information Scent]].

The practical guidance:

- **Lead with the point.** Put the main message and primary action at the top, without cramming everything else there; see [[Visual Hierarchy]].
- **Don't fill the top with advertising-shaped panels.** People skip what looks like ads, especially large banners; see [[F-pattern]].
- **Avoid too many choices.** A first screen packed with competing options slows the decision; see [[Hick's Law]].

The fold matters technically too. Browsers try to draw the first screen as soon as possible, so the resources it needs, such as styles, fonts, and its main image, should load first, while images and widgets further down can wait until the visitor scrolls near them; see [[Critical Rendering Path]] and [[Lazy Loading]]. Google's page-speed measures track how quickly the largest element in the first view appears and whether content moves around while loading; see [[Core Web Vitals]].

Email has its own fold, the preview pane, and the same advice applies: the first lines decide whether the rest gets read.

## See also
- [[Carousel]]
- [[Progressive Disclosure]]
