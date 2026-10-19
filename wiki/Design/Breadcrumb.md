---
aliases:
  - Breadcrumb navigation
  - Breadcrumb trail
tags:
  - design
summary: The short row of links near the top of a page that shows where it sits in a site's hierarchy, such as Home › Shoes › Running, letting people orient themselves and step back up a level in one click.
---
A **breadcrumb** is a short row of links, usually near the top of a page, that shows where the page sits within a site's structure: Home › Topics › Design › Breadcrumb. Each item links to that level, so a visitor can step back up the hierarchy in one click. The name comes from the fairy tale in which Hansel and Gretel drop crumbs to find their way home.

Breadcrumbs answer two questions people ask when they land somewhere unfamiliar: *where am I?* and *what else is around here?* That matters most when people arrive from search or a shared link rather than the home page, which on many sites is most visits. Without some sign of place, a page deep in a site is like a room with no doors; see [[Wayfinding]].

There are three kinds, and they behave differently:

- **Location breadcrumbs** show the page's fixed place in the site hierarchy, regardless of how the visitor got there. This is the common and most useful form; see [[Information Architecture]].
- **Attribute breadcrumbs** show the filters applied to reach a set of results, such as Shoes › Running › Size 10, each removable; see [[Faceted Search]].
- **Path breadcrumbs** show the pages the visitor actually clicked through. These mostly duplicate the browser's back button and confuse people when they arrive by search, so usability guidance recommends against them.

Conventions that make them work:

- **Secondary placement.** Small, above the page title, below the main navigation. Breadcrumbs supplement primary navigation and never replace it; see [[Visual Hierarchy]].
- **Separators.** A right-pointing chevron or slash between items, signaling direction from general to specific; see [[Signifier]].
- **Current page last and unlinked.** The final item names the page itself and is not a link, since linking a page to itself confuses people.
- **Truncation.** On narrow screens, long trails often collapse to show only the parent level, as a "back to Topics" link; see [[Responsive Breakpoint]].

They also have accessibility conventions. The trail goes inside a `nav` element labeled "Breadcrumb," as an ordered list, and the current item is marked with `aria-current="page"`, so screen reader users hear both the landmark and their position; see [[Semantic HTML]] and [[ARIA]]. Decorative separators should be added with CSS so they are not read aloud; see [[Screen Reader]].

Search engines read breadcrumbs too. Marking them up as structured data lets results show the site path instead of a raw URL, which gives searchers a clearer idea of what they will find; see [[Structured Data]] and [[Information Scent]].

Breadcrumbs only make sense for sites that are actually hierarchical. A flat site, or one where pages belong to several categories at once, has no single trail to show; see [[Taxonomy]]. Many apps use a title and back link instead.

## See also
- [[Hierarchical Data]]
- [[Hamburger Menu]]
- [[Deep Linking]]
