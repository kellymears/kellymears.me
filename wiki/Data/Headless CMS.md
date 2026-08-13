---
aliases:
  - Content management system
  - Headless content
tags:
  - data
summary: A content system exposing structured data through an API, with presentation left entirely to consumers.
---
A **headless content management system** manages structured content and exposes it through an API, without rendering anything. Presentation belongs to whatever consumes it — a website, an application, a display, another system.

The gain is that content becomes structured data rather than markup: reusable across surfaces, queryable, and validated. The cost is that everything a traditional system gave away — preview, in-context editing, a sense of what a page will look like — has to be built.

The interesting design tension is **how much presentation belongs in the content model**. Purists say none; in practice authors want control over arrangement, so most systems end up with a block or component model where content carries some structural intent. That is a defensible middle ground and it demands discipline: presentation values need defaults in exactly one place, and a partial update that omits them will otherwise silently reset an author's choices.

Two recurring implementation notes. Content that lives outside the page model — site-wide navigation, header and footer settings — is genuinely different and rarely fits the same editing affordances. And a validation rule attached to a group of fields may render as an unlabelled error count in the editing interface, so cross-field rules belong on a leaf field that can display a message.

## See also
- [[Draft and Published]]
- [[Structured Data]]
- [[Information Architecture]]
- [[Multi-Tenancy]]

## Related
- [[Search Engine Optimization]]
- [[Relational Database]]
- [[Knowledge Graph]]
- [[Feature Flag]]
- [[Backlink]]
