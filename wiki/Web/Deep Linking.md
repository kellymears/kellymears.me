---
aliases:
  - Deep link
  - Universal link
  - App link
tags:
  - web
summary: Linking straight to a specific page or item rather than a site's front door, once fought over in court and now a feature that apps and web apps must work to support.
---
**Deep linking** is linking to a specific page or item inside a site or app rather than to its home page. On the web it's just linking, since any page with an address can be linked to; see [[URL]]. The term exists because some publishers objected, and because apps made it hard again.

In the late 1990s, several companies argued that linking past their home pages was unfair. The home page carried the ads and the branding, and a deep link let visitors skip both. In 1997 Ticketmaster sued Microsoft for linking straight to event pages on its site; the case settled in 1999. In a later case against another ticket site, a federal court in California ruled in 2000 that deep linking alone wasn't copyright infringement, since nothing was copied. A Scottish newspaper dispute in 1996 had raised the same question earlier. Most of the web settled on the view that a public page can be linked to, and publishers who object can require logins instead; see [[Paywall]].

Deep links are what make the web useful as a reference. Citations, search results, and shared articles all point inside sites; see [[Web Crawler]]. That only works if addresses stay stable, a principle Tim Berners-Lee stated in 1998 as "cool URIs don't change"; see [[Link Rot]].

Web apps can break it. Early [[Single-Page Application]] designs changed the screen without changing the address, so a bookmarked or shared link always opened the start screen. Browsers later added a way for scripts to update the address bar, letting apps restore deep links. A good test is whether a link copied from the address bar opens the same view in a fresh window.

Mobile apps had the same problem at a larger scale, since an app screen has no address at all. Apps first registered custom schemes, which any other app could also claim. In 2015 Apple and Google introduced verified links, called **universal links** on iOS and **app links** on Android: the site publishes a file proving it owns the app, and ordinary web addresses then open the matching app screen if it's installed and the website if not. **Deferred deep links** remember the destination through an app install, so a new user lands where the link pointed instead of on a welcome screen; see [[Progressive Web App]].

Deep links are also an attack surface. A link that opens an app screen with parameters can trigger actions or carry a malicious redirect, and look-alike links are a staple of [[Phishing]]; see [[Open Redirect]].

Linking to a page is different from displaying a file from someone else's server; see [[Hotlinking]]. Sharing a deep link in a chat usually shows a preview built from the page's metadata; see [[Open Graph]].

## See also
- [[Hyperlink]]
- [[Search Engine Optimization]]
- [[Tabs]]
- [[Fragment Identifier]]
