---
aliases:
  - WHATWG
  - W3C
  - TC39
  - Baseline
  - Vendor prefix
tags:
  - web
summary: How the web platform is specified and agreed on by competing browser makers, from W3C recommendations to living standards, TC39 stages, and the Baseline label.
---
**Web standards** are the specifications that define how browsers must behave: HTML, CSS, the DOM, JavaScript, HTTP, and hundreds of APIs. No single company owns the web, so its rules are written by standards bodies in which competing browser makers, companies, and individuals negotiate. A feature becomes part of the web when the specification is agreed and, crucially, when browsers actually ship it.

Several bodies divide the work:

- **W3C**, the World Wide Web Consortium, founded by Tim Berners-Lee in 1994, publishes CSS and many APIs.
- **WHATWG** was formed in 2004 by Apple, Mozilla, and Opera, frustrated that the W3C was pursuing XHTML 2.0, a strict break with existing pages. Its HTML became a *living standard*, updated continuously instead of in numbered versions, and in 2019 the W3C agreed that WHATWG's HTML and DOM specifications are the authoritative ones.
- **TC39**, a committee of Ecma International, evolves JavaScript under the name ECMAScript, with a new edition every year.
- **The IETF** standardizes the network protocols, including HTTP, as RFCs.

The working rule is that implementations matter more than documents. A W3C specification needs two independent, interoperable implementations to become a Recommendation. TC39 proposals move through numbered stages from 0 to 4, and stage 4 requires two shipping implementations and conformance tests. The shared web-platform-tests suite, with tens of thousands of tests run against every major [[Browser Engine]], makes "interoperable" measurable.

In the 2000s browsers shipped experimental features behind *vendor prefixes*, such as `-webkit-border-radius`, expecting developers to wait for the standard. Instead sites shipped the prefixed versions, and other browsers had to support `-webkit-` names to render the web correctly. Features now ship behind flags or time-limited trials instead.

Two recent efforts address the developer's real question, "can I use this yet?":

- **Interop**, an annual project since 2022, has the major browser vendors agree on a list of focus areas and publicly track their pass rates, which has closed long-standing gaps in layout, forms, and scrolling.
- **Baseline**, introduced in 2023, labels each feature *newly available* once it works in all major browsers and *widely available* 30 months later.

Standards are also how the web keeps its compatibility promise. Browsers almost never remove a feature that real sites use, so pages from the 1990s still render, an extreme form of [[Backward Compatibility]]. The cost is permanence: mistakes such as quirks mode and odd legacy APIs can never be fully retired.

For developers, the practical tools are [[Progressive Enhancement]], building on what works everywhere and adding what newer engines support, and the [[Polyfill]] for filling gaps. Features such as [[View Transitions]], the [[Container Query]], and [[Web Components]] each spent years in this pipeline before Baseline status.

## See also
- [[JavaScript]]
- [[Polyfill]]
- [[Quirks Mode]]
- [[Encrypted Media Extensions]]
- [[Internationalized Domain Name]]
- [[Browser Wars]]
- [[Request for Comments]]
- [[Cross-Browser Testing]]
