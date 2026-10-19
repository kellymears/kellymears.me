---
aliases:
  - Ted Nelson
  - Transclusion
  - Memex
tags:
  - web
summary: Ted Nelson's hypertext system, begun in 1960 and still unfinished, which imagined two-way links, quotation by reference, and micropayments to authors, and the earlier Memex that inspired it; the road the web didn't take.
---
**Project Xanadu** is the hypertext system Ted Nelson began designing in 1960, which he coined the words *hypertext* and *hypermedia* to describe. It is often called the longest-running vaporware project in computing: a working version of the full design has never shipped. It matters because it imagined, decades early, much of what the web does, and several things it still doesn't.

Its inspiration was the **Memex**, described by Vannevar Bush in a 1945 essay, "As We May Think." Bush, who had directed US wartime research, imagined a desk with microfilm storage where a researcher could link documents into "trails" of association and share trails with others. It was never built, but it influenced Nelson, and Douglas Engelbart, whose 1968 demonstration showed hyperlinks, the mouse, and shared editing working live; see [[Extended Mind]].

Xanadu's design had features the web lacks:

- **Two-way links.** A link would be visible from both ends, so any document could show everything pointing to it. The web's links are one-way, which made it simple to build but means a page can't know what links to it without a search engine crawling everything; see [[Backlink]] and [[Web Crawler]].
- **Transclusion.** Quoting would be done by reference: a quotation would be a live window into the original, not a copy, so it always matched the source and pointed back to it.
- **Stable addresses and version history.** Content would never be deleted or move, and every version would stay addressable, so links couldn't break; see [[Link Rot]] and [[Version Control]].
- **Micropayments.** Each transcluded use would pay the original author a tiny royalty automatically. Nelson saw this as the way to make copying unnecessary: reuse would always be permitted, because it would always be paid for.

Why didn't it ship? The design required every part to work together: permanent storage, global addressing, and payment accounting, all at once. Tim Berners-Lee's web, by contrast, did one simple thing, one-way links between files on any server, tolerated broken links, and needed no central coordination; see [[World Wide Web]]. Simple and loose won, a familiar pattern; see [[Worse Is Better]] and [[Gall's Law]].

The ideas keep returning in partial form. Wikis and note-taking tools show backlinks, and this wiki is one; see [[Wiki]] and [[Zettelkasten]]. Content-addressed storage gives each version a permanent address derived from its contents; see [[Merkle Tree]]. Embedding a tweet or video is a crude transclusion, and the Internet Archive preserves the versions the web lets disappear; see [[Digital Preservation]].

Nelson, still working on it, has said the web oversimplified hypertext by treating documents like paper.

## See also
- [[Wikipedia]]
- [[Microfilm]]
- [[Internet Archive]]
