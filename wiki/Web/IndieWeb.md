---
aliases:
  - Webmention
  - POSSE
  - Microformats
tags:
  - web
summary: A movement and set of small standards for publishing on a website you own rather than on platforms, posting there first and syndicating elsewhere, with Webmention for cross-site replies.
---
The **IndieWeb** is a community and a set of small standards for people who publish on websites they own instead of, or before, posting to social platforms. It grew out of conferences called IndieWebCamp, first held in 2011, with the motto "own your data."

The motivation is that platforms come and go, and take people's writing with them. GeoCities, which hosted millions of personal pages, was shut down in 2009; many other services have closed or changed rules abruptly; see [[Link Rot]] and [[Digital Preservation]]. A personal domain is a stable address the author controls, and posts there can outlive any company; see [[Domain Name System]]. Platforms also tend to degrade for their users once they have them; see [[Enshittification]].

Key practices and standards:

- **POSSE**: "Publish on your Own Site, Syndicate Elsewhere." Write on your site first, then post copies or links to social networks, so the canonical version is yours and the platform copy is a pointer.
- **Microformats**: small sets of class names added to ordinary HTML, marking which part of a page is a post, its author, its date, or a reply-to link, so software can read the page as structured data without a separate API; see [[Structured Data]].
- **Webmention**: a W3C recommendation since 2017 for cross-site replies. When your post links to someone else's, your site notifies theirs, which fetches your page, checks the link is real, and can show your reply, like, or mention beneath their post. It's a decentralized version of comments, and a step toward the two-way links the web never had; see [[Backlink]] and [[Project Xanadu]].
- **IndieAuth**: signing in to sites with your own domain as your identity, built on [[OAuth]].
- **Feeds**: following people through feeds rather than an algorithmic timeline; see [[RSS]] and [[Recommender System]].

The IndieWeb overlaps with, but differs from, the fediverse of Mastodon and similar services, which spread social networking across many independently run servers that talk to each other; see [[Federation]]. Fediverse users usually still depend on a server someone else runs; IndieWeb practice centers on each person's own site. Bridges connect the two.

The costs are real. Running a site means maintaining it, and features like replies and likes need software most people won't set up. Static site generators made personal sites cheaper to host, and services exist to receive Webmentions for static sites; see [[Static Site Generation]]. Reach is the hardest part: platforms have the audience, which is why POSSE posts to them anyway; see [[Network Effect]].

Many personal sites, including this one, carry IndieWeb habits: a feed, permanent URLs, and writing published on a domain the author controls.

## See also
- [[GeoCities]]
- [[Webring]]
