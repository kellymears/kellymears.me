---
aliases:
  - Random surfer
  - Link analysis
tags:
  - data
summary: The algorithm behind Google's early search results, which ranks a page by the number and importance of the pages linking to it, computed as where a random web surfer would spend their time.
---
**PageRank** is an algorithm that ranks web pages by the links pointing to them, weighting each link by the importance of the page it comes from. Larry Page and Sergey Brin developed it at Stanford in 1996 and made it the core of Google, whose results were noticeably better than those of search engines that ranked pages mainly by the words on them.

The idea came from academic citation analysis, where a paper cited by many important papers is itself likely to be important. Applied to the web, each [[Hyperlink]] counts as a vote. But votes aren't equal: a link from a page that many pages link to counts for more, and a page's vote is split among all the pages it links to. The definition is circular, since a page's rank depends on the ranks of the pages linking to it, and the math is in resolving that circle.

The usual explanation is the **random surfer**. Imagine someone who starts on a random page and keeps clicking random links. With some fixed probability, traditionally 15%, they get bored and jump to a random page anywhere on the web. Over a long time, the fraction of time they spend on each page settles to a fixed value, and that value is its PageRank. The walk is a [[Markov Chain]], and PageRank is its stationary distribution. In [[Linear algebra]] terms, it is the leading eigenvector of the web's link matrix. The random jumps are essential: they keep the surfer from getting stuck in pages with no outgoing links or in loops that only link to each other.

At web scale it is computed by repeatedly multiplying a vector of ranks by the link matrix until the numbers stop changing, a job split across many machines; see [[MapReduce]]. The links come from a [[Web Crawler]].

Ranks follow a [[Power law]]: a few pages hold most of the importance, and the rich get richer as prominent pages attract more links because they are found more often; see [[Matthew Effect]].

Once links determined ranking, links became worth money. Link farms, paid links, and comment spam appeared almost at once, and Google introduced the `nofollow` attribute in 2005 so sites could mark links they didn't vouch for; see [[Search Engine Optimization]] and [[Goodhart's Law]]. Modern search engines combine hundreds of signals, and PageRank is now one input among many, retired as a public score in 2016.

The method spread well beyond the web. Variants rank scientific papers, find influential accounts in social networks, recommend people to follow, and identify key proteins in biological networks; see [[Recommender System]] and [[Small-World Network]]. Wikis and note graphs use the same idea to surface their most central notes; see [[Backlink]].

## See also
- [[Canonical URL]]
- [[Sitemap]]
- [[Hybrid Search]]
