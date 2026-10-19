---
aliases:
  - Google Analytics
  - Bounce rate
  - Pageview
tags:
  - web
summary: Measuring how people use a website, from parsing server logs to JavaScript page tags and Google's free Analytics, with metrics like pageviews and bounce rate that are distorted by bots, blockers, and consent rules and easy to optimize in the wrong direction.
---
**Web analytics** is the measurement of how people find and use a website: how many visit, which pages they view, where they came from, and what they do there. Site owners use it to judge content, test designs, and track sales; see [[A/B testing]].

The first approach read the server's own records. Every request a web server handles is written to a log file, and tools in the mid-1990s summarized those logs into counts of hits, pages, and visitors; see [[Logging]]. Logs see every request, but they can't easily tell people from crawlers, they miss pages served from caches, and they record files rather than actions; see [[Web Crawler]] and [[HTTP Caching]].

**Page tagging** replaced them. A small script on each page sends details of the visit to an analytics service, which can record screen size, time on page, clicks, and other events, and an identifier stored in a cookie links visits into sessions and returning visitors; see [[Third-Party Script]] and [[HTTP Cookie]]. Google bought a company called Urchin in 2005 and relaunched its product as Google Analytics, free of charge. It became the default on a large share of all websites, and it gave Google a view of traffic across much of the web.

Common metrics:

- **Pageviews and sessions.** Counts of pages loaded and of visits.
- **Unique visitors.** Estimated from cookies, so the same person on two devices counts twice, and clearing cookies makes them new.
- **Bounce rate.** The share of visits that view one page and leave. It's often treated as failure, though a visitor who found the answer on the first page and left was well served.
- **Conversion rate.** The share of visits that complete a goal, such as a purchase or sign-up, often tracked through a funnel of steps.

The numbers are less solid than dashboards suggest. Ad blockers and privacy tools often block analytics scripts, bots inflate counts, and in Europe many visitors decline the cookies the tools need, so the measured audience skews toward people who didn't refuse; see [[Cookie Consent]] and [[Selection Bias]]. Several European data protection authorities ruled in 2022 that sending visitor data to Google Analytics in the United States broke EU law; see [[Personal Data]].

Privacy-focused alternatives count visits without cookies or personal data, by aggregating requests or hashing addresses with a daily changing salt, trading detail for compliance and accuracy against blockers; see [[Browser Fingerprinting]].

The deeper risk is optimizing the measurable. Time on site rises when pages are confusing, pageviews rise when articles are split across pages, and clicks rise with misleading headlines; see [[Goodhart's Law]]. Performance measurement from real visitors, which reports how fast pages felt, is the same technique applied to experience rather than behavior; see [[Core Web Vitals]].

## See also
- [[Observability]]
- [[Heat Map]]
- [[Referrer Policy]]
