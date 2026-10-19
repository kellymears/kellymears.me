---
aliases:
  - Web ring
  - Webrings
tags:
  - web
summary: A loop of websites on a shared topic, each linking to the next, that helped readers find small sites before search engines worked well, and is coming back on personal sites that want discovery without algorithms.
---
**A webring** is a set of websites on a shared topic joined in a loop. Each member displays a small navigation bar with links to the previous site, the next site, a random site, and the ring's index. Follow "next" long enough and you visit every member and end up back where you started.

Webrings appeared in the mid-1990s, when finding a site meant knowing its address, following a link, or browsing a hand-built directory; see [[Web Directory]]. Search engines existed but ranked poorly, and small sites rarely surfaced; see [[PageRank]]. A ring solved discovery locally. A fan page for a band could join a ring of other fan pages for the same band, and every visitor to one became a potential visitor to all.

The structure is a circular [[Linked List]] of sites. In practice, each member didn't edit its neighbors' links by hand. The navigation bar pointed to a central server that knew the order and redirected the visitor to the right site; see [[Common Gateway Interface]]. Several early services did this. The term and the most popular service are usually credited to Sage Weil, who wrote the software as a high school student in 1995.

Each ring had a ringmaster who approved members and kept the topic coherent. That human curation was the point. Joining was usually a matter of filling in a form and pasting the code for the bar into your page. Rings covered everything from anime to genealogy to vegan cooking, and some had hundreds of members. They were at home on free hosts; see [[GeoCities]].

Rings had weaknesses:

- **Dead members.** Sites disappeared without notice, and a loop with a broken link sends readers to an error page. Central services skipped members that stopped responding; see [[Link Rot]].
- **Dependence on one server.** If the ring's server went down, every member's navigation broke at once.
- **Commercialization.** The largest service changed hands during the dot-com boom and added ads to the navigation bars, which drove members away.

As search improved in the 2000s, rings faded. Blogs replaced them with blogrolls, lists of other blogs the author read, which did the same job one hop at a time; see [[Blog]].

In recent years rings have returned on small personal sites, often as a few lines of script, sometimes with no central server at all. They appeal to people who want readers to find each other through human choices rather than a [[Recommender System]] tuned for engagement; see [[IndieWeb]] and [[Filter Bubble]]. The links between members also give search engines a signal about how related sites connect; see [[Backlink]].

A ring is a modest [[Network Effect]], each new member making the others slightly easier to find.

## See also
- [[Dot-com Bubble]]
- [[Hypermedia]]
- [[Brutalist Web Design]]
