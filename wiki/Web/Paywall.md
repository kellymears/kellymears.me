---
aliases:
  - Metered paywall
  - Soft paywall
  - Hard paywall
tags:
  - web
summary: Restricting a site's content to paying subscribers, in hard, metered, or freemium forms, a business model news sites returned to after advertising failed to pay for journalism and one that is technically harder to enforce than it looks.
---
**A paywall** restricts some or all of a website's content to paying subscribers. Early web publishers mostly gave content away and relied on advertising. When online advertising paid far less than print, many turned to charging readers directly.

There are three main designs:

- **Hard paywalls** show nothing without a subscription. The Wall Street Journal charged for its site from 1996, and specialist financial and trade publications still use this model.
- **Metered paywalls** allow a set number of free articles a month before asking for payment. The New York Times introduced its meter in 2011, starting at twenty articles, and later lowered it. The meter lets casual readers and shared links through while charging frequent readers.
- **Freemium** paywalls keep most content free and lock selected stories; see [[Freemium]].

Enforcement is harder than it looks. Many paywalls send the full article to the browser and cover it with an overlay, so disabling scripts, using a reader mode, or viewing the page source reveals the text. Server-side paywalls send only an excerpt and are robust, but they hide the full text from search engines too; see [[Progressive Enhancement]].

Search created a particular tension. Publishers want the full article indexed, and search engines penalize sites that show their crawler different content than readers see; see [[Web Crawler]]. From 2008 to 2017, Google's "first click free" policy required paywalled sites in its news results to let readers coming from search see some articles at no cost. It was replaced by more flexible sampling, and publishers now mark restricted sections in [[Structured Data]] so the crawler can read them without a penalty; see [[Search Engine Optimization]].

Meters count articles with cookies, so clearing them or browsing privately resets the count; see [[HTTP Cookie]]. Publishers responded by detecting private windows, and browsers changed to make that detection harder. Sharing a login among friends is the other common leak; see [[Browser Fingerprinting]].

Subscriptions bring their own problems. Cancelling is often much harder than signing up, a tactic regulators have targeted; see [[Dark Pattern]]. Paywalls also divide readers: news useful to everyone sits behind a fee, which is the classic [[Free Rider Problem]] in reverse. Some publishers drop their paywalls for emergencies such as public health crises.

Alternatives have been tried for decades. The HTTP standard reserved a "payment required" status code in the 1990s that never got a standard use; see [[HTTP Status Code]]. Ted Nelson's hypertext design included tiny payments for each quoted passage; see [[Project Xanadu]]. Micropayments have stayed rare, partly because transaction costs are high and deciding whether each article is worth a few cents is tiring.

## See also
- [[Two-Sided Market]]
- [[Attention Economy]]
- [[Programmatic Advertising]]
- [[Clickbait]]
