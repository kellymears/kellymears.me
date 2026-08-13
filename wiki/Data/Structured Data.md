---
aliases:
  - Schema.org
  - JSON-LD
  - Rich results
tags:
  - data
summary: Machine-readable markup describing what a page is about, in a shared vocabulary.
---
**Structured data** is metadata embedded in a page describing its content in a vocabulary machines already understand — overwhelmingly Schema.org, expressed as JSON-LD in a script tag. It is what lets a search engine or an assistant know that a page describes a recipe, an event, a business, or an article, rather than inferring it from prose.

The model is a graph. Entities have types and properties, and — importantly — identifiers, so that separate fragments can refer to the same entity. A page can emit a small object referencing an organisation by identifier, and that reference resolves against a fuller description published elsewhere on the site, or dangles harmlessly if it does not.

Two practical cautions.

**Verify what is actually emitted.** A page may carry markup from several sources — the application, a plugin, a hand-pasted block maintained by someone else — and assumptions about which produced what are frequently wrong. Requesting the live page and reading the scripts is a two-minute check that has repeatedly overturned confident claims.

**Structured data is a claim about content, not a substitute for it.** Markup describing something the page does not contain is a policy violation as well as a lie.

## See also
- [[Search Engine Optimization]]
- [[Semantic HTML]]
- [[JSON Schema]]
- [[Knowledge Graph]]
- [[RSS]]
- [[Headless CMS]]

## Related
- [[Information Architecture]]
- [[Static Site Generation]]
- [[Backlink]]
