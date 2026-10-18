---
aliases:
  - Reference rot
  - Content drift
  - Cool URIs
  - Permalink
  - Wayback Machine
tags:
  - data
summary: The steady decay of hyperlinks as pages move, vanish, or change, and the habits and archives that keep references working.
---
**Link rot** is the decay of hyperlinks over time. A link that once led somewhere useful now returns a 404 [[HTTP Status Code]], redirects to an unrelated home page, or points at a domain that has lapsed and been bought by someone else. Its quieter cousin, **content drift**, is worse: the link works, but the page has changed and no longer supports what it was cited for. Together they are called *reference rot*.

The rates are steep. A 2014 study by Jonathan Zittrain, Kendra Albert, and Lawrence Lessig found that more than 70 percent of links in Harvard law journals, and about half of the links in US Supreme Court opinions, no longer pointed to the originally cited content. A 2024 Pew Research Center study found that 38 percent of web pages that existed in 2013 were no longer accessible a decade later.

The causes are ordinary:

- **Redesigns.** A new site structure or content system changes every URL, and nobody maps the old ones.
- **Expiry.** Domains lapse, companies close, and hosting bills stop being paid.
- **Deletion.** Content is removed for cost, legal, or editorial reasons, often without a trace.
- **Slugs that encode too much.** URLs containing dates, categories, titles, or file extensions break whenever any of those change.

Tim Berners-Lee argued in his 1998 note "Cool URIs don't change" that breaking a link is a failure of the publisher, not of the web, and that URLs should be designed to last: leave out technology, such as `.php`, and leave out anything likely to change, such as an author's department. A **permalink** is a URL promised to stay stable. When a move is unavoidable, a permanent 301 redirect from the old URL preserves both readers and search ranking, central to [[Search Engine Optimization]].

Other defenses work at different layers:

- **Persistent identifiers.** Digital Object Identifiers, used for academic papers since 2000, resolve through a registry that publishers update when content moves, adding a layer of indirection much as the [[Domain Name System]] does for addresses.
- **Archives.** The Internet Archive, founded in 1996, opened the Wayback Machine in 2001 and holds hundreds of billions of captured pages. Perma.cc, launched in 2013 by Harvard's library, lets courts and journals archive a page at the moment of citation.
- **Monitoring.** Link checkers crawl a site and report broken outbound links, a form of [[Synthetic Monitoring]].

Inside a [[Wiki]], internal links can be checked mechanically: a link to a page that does not exist is detectable at build time, and renames can rewrite every [[Backlink]]. External links are another matter, since the publisher controls only one end. [[Static Site Generation]] helps a little: a site rendered to plain files is cheap enough to keep hosted indefinitely.

## See also
- [[Object Storage]]
- [[Web Crawler]]
- [[URL]]
- [[Data Lineage]]
- [[Digital Preservation]]
