---
aliases:
  - Canonical link
  - Duplicate content
tags:
  - data
summary: The one preferred address for a page that's reachable at many, declared so search engines and other tools treat the copies as a single page, a hint introduced by the major search engines together in 2009.
---
A **canonical URL** is the preferred address for a page that can be reached at several addresses. A site declares it with a link element in the page's head whose rel attribute is set to canonical, telling search engines which address to show in results and credit with links.

The same page often lives at many addresses without anyone intending it:

- with and without "www," or over both HTTP and HTTPS;
- with and without a trailing slash;
- with tracking parameters appended by newsletters and ads, such as campaign tags;
- with sorting or filtering options in the query string of a shop's category page;
- as a printer-friendly or mobile version;
- as a copy republished on another site.

To a search engine, each address is potentially a separate page; see [[URL]] and [[Web Crawler]]. Duplicates waste a crawler's limited attention on a site, split incoming links among several versions, and can lead the engine to show an unintended address, such as one with a stranger's tracking code; see [[PageRank]] and [[Search Engine Optimization]].

Google, Yahoo, and Microsoft announced support for the canonical link together in February 2009, a rare joint move among competitors. Search engines treat the declaration as a strong hint, not a command. If the pages differ substantially, or the site's other signals contradict it, the engine may pick a different canonical itself.

Other tools reinforce or replace the hint:

- **Permanent redirects** send visitors and crawlers from duplicate addresses to the preferred one, and are stronger than a hint where the duplicates have no reason to exist; see [[HTTP Status Code]].
- **Consistent internal links** point to the preferred address everywhere on the site.
- **Sitemaps** list only canonical addresses; see [[Sitemap]].
- **Social previews** carry their own preferred address, which should agree; see [[Open Graph]].

Cross-domain canonicals help syndication. A publisher that lets partners republish an article can ask them to point their copies back to the original, so the original keeps the credit.

The underlying problem is identity: deciding when two things are really the same thing. Databases face it as duplicate records, where one master record is chosen and the others point to it; see [[Entity Resolution]]. Good database design avoids storing the same fact twice in the first place; see [[Database Normalization]]. On the web, where anyone can link to any variation of an address, duplicates are inevitable and canonicalization cleans up afterward.

Readable addresses make the preferred version obvious to people, too; see [[Slug]]. When pages move, canonical addresses should change with them, or old links will lead nowhere; see [[Link Rot]].

## See also
- [[Persistent Identifier]]
- [[Hotlinking]]
- [[HTML]]
