---
aliases:
  - Search engine
  - Search engine results page
tags:
  - web
summary: A system that crawls the web, indexes what it finds, and ranks pages in answer to typed queries, the main way people have found things online since the late 1990s and one of the largest advertising businesses ever built.
---
A **web search engine** finds pages in answer to a typed query. It does three jobs in sequence: it gathers pages, it builds an index of the words they contain, and at query time it ranks the matching pages and shows them as a list of results.

Gathering is done by programs that fetch a page, extract its links, and queue those links for fetching in turn; see [[Web Crawler]]. Indexing turns the collected text into a structure that maps each word to the documents containing it, so a query can be answered without scanning everything; see [[Inverted Index]]. Ranking is where engines compete. Early systems scored pages mainly by how often and where query words appeared, which made them easy to game by stuffing pages with repeated terms.

The first web era leaned on hand-built catalogs as much as on search; see [[Web Directory]]. Full-text engines such as WebCrawler, Lycos, and AltaVista arrived in 1994 and 1995 and indexed millions of pages, but results were noisy. Google, started by Larry Page and Sergey Brin at Stanford and incorporated in 1998, ranked pages partly by the links pointing at them, treating each link as a vote weighted by the importance of the page casting it; see [[PageRank]]. Modern engines combine hundreds of signals, including freshness, location, and how searchers respond to results.

Search became a business through advertising sold against queries. Advertisers bid on keywords and pay when someone clicks, a model pioneered by GoTo.com in 1998 and refined by Google's AdWords from 2000. Because a query states intent directly, these ads are unusually valuable, and the results page gradually filled with ads, maps, and boxes answering questions without a click. A two-sided business with users on one side and advertisers on the other tends toward concentration; see [[Two-Sided Market]]. In 2024, a US federal court ruled that Google had illegally maintained a monopoly in general search.

Every ranking system invites manipulation. A whole industry tries to move pages up the results; see [[Search Engine Optimization]]. Link farms, content farms, and spam pages exist mainly to be found; see [[Email Spam]]. Personalized ranking raised the worry that people see only results confirming what they already believe; see [[Filter Bubble]].

Since 2023, engines have added generated answers above the links, summarizing retrieved pages with a language model; see [[Retrieval-Augmented Generation]]. This keeps more visitors on the results page and reduces the traffic that sites receive, unsettling the arrangement in which sites let themselves be crawled in exchange for being found. How well any engine performs is usually measured with the trade-off between finding all relevant pages and showing only relevant ones; see [[Precision and Recall]].

## See also
- [[Autocomplete]]
- [[Attention Economy]]
- [[Walled Garden]]
- [[Dark Web]]
- [[Wikipedia]]
