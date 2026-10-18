---
aliases:
  - WWW
  - Hypertext
  - Hyperlink
tags:
  - web
summary: The system of linked documents that runs on top of the internet, built from three simple inventions, URLs, HTTP, and HTML, and from deliberate choices like one-way links and open licensing that let it grow.
---
The **World Wide Web** is a system of documents and applications linked to each other and reached over the internet. The two are often confused: the internet is the global network that moves packets between machines (see [[Packet Switching]]), while the web is one application running on it, alongside email, file transfer, and many others.

Tim Berners-Lee proposed the web at CERN in 1989 as a way for physicists to share documents across incompatible computers. By late 1990 he had built the first server and browser, and in 1991 the system was opened to the public. It rested on three inventions:

- **The URL**, a uniform way to name any document on any server; see [[URL]].
- **HTTP**, a simple request-response protocol for fetching documents; see [[Hypertext Transfer Protocol]].
- **HTML**, a markup language for documents containing links; its in-memory form in today's browsers is the [[Document Object Model]].

**Hypertext**, text with links to other text, was older. Vannevar Bush imagined a desk-sized machine for linked research trails in 1945, and Ted Nelson coined the word in the 1960s. Nelson's designs were more ambitious than the web, with two-way links that could never break and built-in payment for quoting. Berners-Lee's crucial simplification was the opposite: links go one way and require no permission. Anyone can link to anything without the target knowing or agreeing. The cost is broken links, the 404 page, and [[Link Rot]]. The benefit is that the web could grow without central coordination, which is why it won.

Two decisions shaped its spread. In 1993, CERN released the web's software royalty-free, so anyone could build browsers and servers. The same year, the Mosaic browser displayed images inline with text, making the web visual and drawing in non-technical users. Growth after that was driven by [[Network Effect]]s: more pages made browsers more useful, and more browser users made publishing more worthwhile.

The web's history since has been a negotiation between openness and control:

- **Standards.** Competing browsers in the 1990s added incompatible features. The W3C, founded in 1994, and later the browser-led WHATWG, coordinate shared specifications; see [[Web Standards]].
- **Applications.** Pages became programs as JavaScript, then fast engines, made the browser a general-purpose platform; see [[Browser Engine]] and [[Single-Page Application]].
- **Discovery.** Search engines turned a pile of links into something navigable; see [[Web Crawler]].
- **Concentration.** Much activity moved into a few large platforms, where links often lead inward and content can't be reached by outside crawlers.

The web's founding tolerance for imperfection still shows. Browsers render broken markup instead of refusing it, following [[Postel's Law]], and a page from 1995 generally still displays today. Building pages that work at a basic level everywhere and better where supported is the principle of [[Progressive Enhancement]].

## See also
- [[ARPANET]]
- [[HTTP2 and HTTP3]]
- [[Federation]]
