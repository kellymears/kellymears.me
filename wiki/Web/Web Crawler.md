---
aliases:
  - Crawler
  - Web spider
  - robots.txt
  - Web scraping
tags:
  - web
summary: A program that discovers the web by fetching pages and following their links, the machinery behind search engines and training datasets, and the voluntary etiquette that governs it.
---
A **web crawler** is a program that explores the web automatically: it fetches a page, extracts its links, adds them to a list of pages to visit, and repeats. Search engines use crawlers to find and refresh the pages they index. Archives and dataset builders use them too. The narrower task of pulling specific data out of pages is usually called *scraping*.

The basic loop is a [[Graph Traversal]] over the web's link graph. The list of URLs waiting to be fetched is called the *frontier*. At web scale, every part of that loop becomes hard:

- **Prioritization.** The web is effectively infinite; a crawler must choose what to fetch next, favoring important pages and those that change often.
- **Deduplication.** The same content appears at many addresses, differing only in tracking parameters or capitalization. Crawlers normalize each [[URL]] and track what they've seen with compact structures such as a [[Bloom Filter]]; near-duplicate pages are caught by comparing content fingerprints; see [[Entity Resolution]].
- **Traps.** A calendar that links to next month forever, or a site that generates new URLs on every visit, can swallow a naive crawler.
- **Freshness.** Pages change. Crawlers can't revisit everything constantly, so they estimate how often each page changes.

**Politeness** keeps crawlers from overwhelming the sites they visit. A good crawler limits its requests per host, backs off when servers slow down, and identifies itself in its user-agent string; see [[Rate Limiting]]. An aggressive one is indistinguishable from an attack; see [[Denial-of-Service Attack]].

Sites state their wishes in **robots.txt**, a plain text file at the root of a domain listing which paths each crawler may visit. Proposed in 1994 and finally standardized in 2022, it's entirely voluntary. It isn't access control, and it can point bad actors at the interesting paths. Sites can also offer a sitemap, an XML list of their pages, to help crawlers find everything.

How a page is built affects what a crawler sees. Crawlers that only read the initial HTML see nothing in a [[Single-Page Application]] that builds its content with JavaScript. Major search engines now render pages in a headless browser, but that's slower and done in a delayed second pass, so pages delivered as complete HTML through [[Server-Side Rendering]] or [[Static Site Generation]] get indexed sooner and more reliably; see [[Search Engine Optimization]].

Crawled text is also raw material for AI. Nonprofit archives of crawled pages, spanning billions of pages and petabytes of data, form a large part of the corpus used in language-model [[Pretraining]]. That has reopened old questions about consent. Many sites now block AI crawlers by name in robots.txt, some crawlers ignore it, and the web's informal bargain, in which sites allowed crawling in exchange for search traffic, no longer clearly holds.

## See also
- [[Fragment Identifier]]
- [[Canonical URL]]
- [[Open Graph]]
- [[Dark Web]]
