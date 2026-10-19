---
aliases:
  - Slashdotting
  - Hug of death
  - Flash crowd
tags:
  - web
summary: The sudden surge of visitors that knocks a small website offline after a popular site links to it, named for the technology news site Slashdot, and a lasting lesson in planning for traffic that arrives all at once.
---
The **Slashdot effect** is what happens when a popular site links to a small one and the resulting crowd of visitors overwhelms it. Pages slow to a crawl, then stop loading entirely. The site is said to have been **slashdotted**, and later generations have called the same thing a **hug of death**, after link aggregators whose front pages could send hundreds of thousands of people to one address within an hour.

Slashdot, a technology news site founded in 1997, gave the effect its name. Its readers were numerous and curious, and its stories linked to personal pages, university projects and small company sites hosted on modest machines or shared plans; see [[Web Hosting]]. A link on the front page could exceed a site's monthly data allowance in hours, leaving its owner with a bill as well as an outage; see [[Bandwidth]]. Commenters routinely posted mirrors and cached copies so others could read what the link had just knocked over; see [[Internet Archive]].

Researchers call this a **flash crowd**, a term borrowed from a 1973 science fiction story by Larry Niven in which cheap teleportation lets crowds converge on any news event instantly. From the server's side, it looks a lot like an attack, with huge numbers of requests from many addresses at once, except the visitors are legitimate; see [[Denial-of-Service Attack]]. The same thing happens to large sites during major news. On the morning of September 11, 2001, news sites buckled, and some stripped their home pages down to a few lines of text to stay up.

A slashdotting exposes the most expensive work a site does on each request. A page generated from a database for every visitor fails long before a plain file does, so the classic defenses all reduce work per visitor. Pages can be generated once and served as files, or cached at the server or in a network of edge servers that absorb the load; see [[Static Site Generation]], [[HTTP Caching]] and [[Content Delivery Network]]. Simple, efficient servers help too; see [[Web Server]].

When load still exceeds capacity, deliberate choices beat collapse. A site can refuse some requests quickly to serve the rest, or limit how fast any one client can ask; see [[Load Shedding]] and [[Rate Limiting]]. A related failure happens when a cache expires under heavy traffic and every request rushes to rebuild it at once; see [[Thundering Herd]]. Testing under simulated crowds reveals the breaking point before an audience does; see [[Load Testing]].

Elastic cloud services that add capacity automatically have made the effect rarer, though they can turn an outage into an unexpected bill; see [[Serverless Computing]].

## See also
- [[Crowdfunding]]
- [[Dot-com Bubble]]
