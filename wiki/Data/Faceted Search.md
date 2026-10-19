---
aliases:
  - Faceted navigation
  - Facets
  - Faceted classification
  - Search filters
  - Colon classification
tags:
  - data
summary: Narrowing a collection by choosing values along several independent dimensions at once, such as brand, price and size, with live counts showing what each choice would leave.
---
**Faceted search** lets people narrow a collection by picking values along several independent dimensions, called *facets*, such as brand, price range, size and rating on a shopping site, or year, format and subject in a library catalog. Each facet value shows a count of matching items, and every selection updates the counts for all the others.

The idea comes from library science. S. R. Ranganathan's colon classification (1933) described a book along several facets at once rather than placing it at one point in a single hierarchy. A strict [[Taxonomy]] forces each item into one branch: a red wool sweater must live under Red, Wool or Sweaters. Facets let it be found from any of those directions, and from all of them combined. Marti Hearst's Flamenco project at Berkeley in the early 2000s showed it working as an interface.

Facets suit how people actually search. Many don't know an item's name but can recognize constraints: under $50, in stock, size M. Picking from visible options is easier than composing a query, and counts prevent dead ends. This is [[Progressive Disclosure]] applied to search: start broad and refine one step at a time.

Interface conventions that make it work:

- **Combine sensibly.** Values within one facet are usually OR (red *or* blue), and different facets are AND (red *and* wool).
- **Show counts, hide zeros.** A value that would produce no results should be disabled or hidden, or the user lands on an [[Empty State]] they could have avoided.
- **Keep selections visible.** Active filters should appear as removable chips, so people remember what is narrowing their results.
- **Limit the options.** Twenty facets with fifty values each overwhelm, as [[Hick's Law]] predicts. Show the most useful facets and values first, with the rest behind "more".

Facets are only as good as the metadata behind them. Every item needs consistent, structured attributes, so "XL", "X-Large" and "extra large" must be normalized into one value, and tags need a controlled vocabulary. Facet design is a job for [[Information Architecture]], and for content sites the attributes usually come from fields such as [[Frontmatter]].

Under the hood, search engines build facets from an [[Inverted Index]]: each facet value has a list of matching items, and the counts come from intersecting those lists with the current result set. Computing counts for every value of every facet on each query is the expensive part, so engines use bitsets and cache counts for popular combinations.

Facets cause trouble for crawlers. Every combination of filters can produce its own URL, multiplying a thousand products into millions of near-duplicate pages that waste crawl budget and dilute rankings. Sites mark most combinations as non-indexable and point them to a canonical URL, a routine concern of [[Search Engine Optimization]].

## See also
- [[Breadcrumb]]
- [[Web Directory]]
- [[Card Sorting]]
- [[Slider]]
- [[Phonetic Algorithm]]
