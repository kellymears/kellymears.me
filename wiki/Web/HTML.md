---
aliases:
  - HyperText Markup Language
  - HTML5
  - Tag soup
tags:
  - web
summary: The markup language every web page is written in, invented at CERN around 1990 as a simple way to tag documents and link them, and grown by thirty years of browser competition into an application platform.
---
**HTML**, the HyperText Markup Language, is the language web pages are written in. A document is text marked up with tags that say what each part is: a heading, a paragraph, a list, a link, an image. The browser reads the tags and builds a tree of elements, which scripts can then change; see [[Document Object Model]].

Tim Berners-Lee designed it at CERN around 1990 as part of the [[World Wide Web]]. He borrowed the angle-bracket tag style from SGML, a document standard already used at CERN, and added the one feature that mattered most, the link; see [[Hypermedia]]. A 1991 description listed only about eighteen elements. Images came in 1993, when Marc Andreessen added an image tag to the [[Mosaic]] browser without waiting for agreement, which set a pattern.

Through the 1990s, browser makers added tags to win users, from blinking text to frames, and pages were written for one browser or the other; see [[Browser Wars]]. Standards bodies tried to catch up. The W3C published HTML 4 in 1997, then pushed toward XHTML, a strict version in which a single unclosed tag could stop a page from displaying at all.

Authors didn't follow. Most real pages were **tag soup**, full of unclosed and misnested tags, and browsers had to display them anyway; see [[Postel's Law]]. Each browser guessed differently, which made pages behave inconsistently. In 2004, people from Apple, Mozilla, and Opera formed a separate group to extend HTML instead; see [[Web Standards]]. Their **HTML5** did something no earlier version had: it specified exactly how to parse broken markup, so every browser now builds the same tree from the same mess. It also added video, audio, a drawing surface, and form controls that had needed plugins; see [[HTML Canvas]]. Since 2019 a single continuously updated document has been the standard, with no further version numbers, though "HTML5" survives as a loose label for the modern web platform.

Old pages still work. A browser can still render a page from 1995, and the doctype line at the top of a file decides whether it uses old or modern layout rules; see [[Quirks Mode]].

Elements carry meaning as well as appearance. A nav element marks navigation, and a button announces itself as a button to a [[Screen Reader]], which a styled div does not; see [[Semantic HTML]]. Appearance belongs to stylesheets. Pages built from meaningful markup work before scripts load and when they fail; see [[Progressive Enhancement]].

Plain text formats such as [[Markdown]] exist mainly so writers don't have to type tags, and they're converted to HTML in the end. Developers can now define their own elements as well.

## See also
- [[Form Validation]]
- [[Language Tag]]
