---
aliases:
  - Doctype
  - Standards mode
  - Almost standards mode
tags:
  - web
summary: The legacy rendering mode browsers use when a page lacks a modern doctype, reproducing late-1990s layout bugs on purpose so that old pages still look the way their authors saw them.
---
**Quirks mode** is a rendering mode in which a browser deliberately reproduces the layout bugs of late-1990s browsers. Browsers choose it for pages that lack a modern document type declaration, so those pages keep looking the way their authors saw them.

During the [[Browser Wars]], Netscape and Internet Explorer implemented CSS loosely and differently, and authors tuned their pages to whatever the browsers actually did. The best-known difference was the box model. CSS specified that an element's width excludes its padding and border, but Internet Explorer 5 counted them inside the width, so the same box came out different sizes in different browsers; see [[Box Model]]. When browser makers set out to follow the specification, correcting those bugs would have broken millions of existing pages.

The solution, first shipped in Internet Explorer 5 for the Mac in 2000 and soon copied everywhere, was to look at the **doctype**, the declaration at the top of an HTML file. Old pages usually had none, or an outdated one. A page with a recent, complete doctype got **standards mode**, which followed the specification. Anything else got quirks mode. The doctype, meant as a technical label naming which version of HTML a file used, became a switch.

A third mode, **almost standards mode**, differs from standards mode in one detail: images inside table cells sit flush rather than leaving a small gap below for text descenders. It exists because so many pages of the era built layouts from sliced images in tables, and the gap broke them apart.

HTML5's doctype, `<!DOCTYPE html>`, was chosen as the shortest string that triggers standards mode in every browser. Its only job is to turn quirks off.

Quirks mode is still required. A page's mode is visible through `document.compatMode`, which reads `"BackCompat"` for quirks. The behaviors include the old box sizing, tables that ignore inherited font sizes, percentage heights measured differently, and lengths accepted without units. They were long undocumented, so the standards body wrote them into a specification, because any new [[Browser Engine]] has to reproduce them to render the existing web; see [[Web Standards]]. Old bugs became obligations, a clear case of [[Hyrum's Law]] and of [[Backward Compatibility]] kept at enormous scale.

Pages could fall into quirks mode by accident. In Internet Explorer 6, an XML declaration before the doctype triggered it, and a stray byte-order mark caused trouble in some browsers; see [[Character Encoding]]. Internet Explorer 8 went further, adding document modes that emulated each earlier version, selected by a special header.

One quirk was later adopted on purpose. The CSS property `box-sizing: border-box` restores Internet Explorer's box model as an opt-in, because many developers found it easier, and most CSS resets now apply it to every element.

## See also
- [[Polyfill]]
- [[User Agent String]]
- [[HTML]]
- [[Principle of Least Astonishment]]
