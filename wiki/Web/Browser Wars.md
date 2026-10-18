---
aliases:
  - Internet Explorer
  - Netscape Navigator
  - Netscape
tags:
  - web
summary: The competition between web browsers, from Netscape and Internet Explorer in the 1990s, through IE's stagnant dominance, to Firefox, Chrome, and today's near-monoculture of one engine, and how each shaped web standards.
---
The **browser wars** are the rounds of competition between web browser makers, each of which reshaped how the web is built. The pattern repeats: competition brings rapid features and incompatibility, dominance brings stagnation.

**The first war (1995–2001).** Netscape Navigator, released in 1994, held most of the market and the company went public in a famous 1995 IPO. Microsoft, late to the internet, built Internet Explorer and bundled it free with Windows. Both raced to add proprietary features, Netscape's `<blink>` tag and layers, IE's `<marquee>` and ActiveX, so sites carried "best viewed in" badges and developers wrote two versions of everything; see [[User Agent String]]. Netscape also created JavaScript, in ten days in 1995, and Microsoft shipped a reverse-engineered copy. Bundling won. By 2002, IE held about 95 percent of the market, and Microsoft's practices were central to a US antitrust case that found it had illegally maintained a monopoly.

**The stagnation.** With no competition, Microsoft disbanded most of the IE team. IE6, released in 2001, went five years without a major update, with notorious layout bugs; see [[Box Model]]. Web developers spent a decade writing workarounds, and corporate intranets built for IE6 kept it alive long after; see [[Path Dependence]] and [[Backward Compatibility]].

**The second war (2004–2015).** Netscape's code had been open-sourced as Mozilla, which produced Firefox in 2004, popular for tabs, pop-up blocking, and better standards support. Apple released Safari on its WebKit engine in 2003, and the iPhone made WebKit the mobile web's engine. Google launched Chrome in 2008, with a fast JavaScript engine and a separate process for each tab; see [[Just-in-Time Compilation]] and [[Browser Engine]]. Browser makers formed the WHATWG in 2004, frustrated with the W3C's direction, and wrote HTML5, finally specifying how browsers really parse pages; see [[Web Standards]]. Chrome passed IE around 2012 and kept climbing.

**Today.** Microsoft retired IE and rebuilt Edge on Chrome's engine in 2020. Opera, Brave, Vivaldi, and Arc did the same. Chromium-based browsers hold roughly three-quarters of the market, with Safari's WebKit, required for every browser on iOS until EU rules forced a change in 2024, and Firefox's Gecko as the only independent engines. Critics worry about a new monoculture, where whatever Chrome ships becomes the de facto standard; see [[Network Effect]]. Others point out that today's dominant engine is open source and updated every few weeks, unlike IE6.

Interoperability has improved: browser makers now jointly pick problem areas each year to fix, and features are marked "Baseline" once all major engines support them. The lessons are that interoperability needs more than one serious engine, and that bundling a default can matter more than quality; see [[Choice Architecture]].

## See also
- [[Pop-up Ad]]
- [[Big Rewrite]]
- [[Quirks Mode]]
- [[Cross-Browser Testing]]
- [[GIF]]
- [[jQuery]]
