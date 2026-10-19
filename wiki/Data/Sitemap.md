---
aliases:
  - XML sitemap
  - Site map
tags:
  - data
summary: A list of a website's pages, either drawn for people as a map of its structure or published as an XML file that tells search engines what exists and when it last changed.
---
A **sitemap** is a list of the pages on a website. The term covers two related things: a page or diagram showing people how a site is organized, and a machine-readable file that tells search engines which addresses exist.

The human-facing sitemap came first. Early websites often had a sitemap page linking to every section, a fallback for visitors lost in confusing navigation. Designers still draw sitemaps as diagrams while planning a site, showing the hierarchy of pages before anything is built; see [[Information Architecture]]. Sitemap pages for visitors have become rarer as search boxes and better navigation took over; see [[Breadcrumb]].

The machine-readable sitemap was introduced by Google in 2005. In 2006, Google, Yahoo, and Microsoft agreed on a shared format, published at sitemaps.org, and it remains the standard. A sitemap is an XML file listing addresses, each with optional fields; see [[XML]]:

- **loc**, the page's address;
- **lastmod**, when it last changed, written in a standard date format;
- **changefreq**, how often it tends to change;
- **priority**, its importance relative to the site's other pages.

A single file can hold up to 50,000 addresses and 50 megabytes uncompressed. Larger sites split their lists across many files tied together by a sitemap index. A site can announce its sitemap in its robots.txt file or submit it to search engines directly. Feeds can also serve as sitemaps; see [[RSS]].

Crawlers discover most pages by following links; see [[Web Crawler]]. Sitemaps help where links fall short: new sites with few inbound links, large sites whose deep pages are rarely linked, and pages generated from databases that no link reaches. They don't guarantee that a page gets indexed or ranked; see [[Search Engine Optimization]].

The optional fields have had a mixed history. Google has said it ignores changefreq and priority, since sites tended to mark every page as important and frequently changing. It does use lastmod, but only from sites whose dates prove accurate. A sitemap that stamps every page with the current date on each build teaches crawlers to ignore it. Accurate dates are most useful when pages change rarely and unpredictably, as with large reference sites.

A sitemap should list only the addresses a site wants indexed, in their preferred form; see [[Canonical URL]]. Listing redirected or deleted pages sends crawlers to dead ends.

Static site generators typically produce sitemaps automatically at build time, from the same page list used for navigation; see [[Static Site Generation]]. Sites that regenerate pages incrementally need to keep the sitemap in step; see [[Incremental Static Regeneration]].

## See also
- [[Slug]]
