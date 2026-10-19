---
aliases:
  - Ad exchange
  - Header bidding
  - Malvertising
tags:
  - web
summary: The automated buying and selling of online ad space, in which an auction runs for each ad slot as a page loads, using data about the visitor to set bids, an industry that funds much of the web and much of its tracking.
---
**Programmatic advertising** is the automated buying and selling of ad space. When a page with an ad slot loads, the publisher's systems announce the opportunity, buyers' systems evaluate it and bid, and the winning ad is delivered, usually within a fraction of a second. Most display ads on the open web are sold this way.

The industry runs on intermediaries. A **supply-side platform** sells inventory on behalf of publishers. A **demand-side platform** buys on behalf of advertisers, deciding how much each impression is worth to them. An **ad exchange** connects the two and runs the auction. Many sites also embed code from several of these companies; see [[Third-Party Script]].

Bids depend on who is looking. The bid request sent to potential buyers describes the page and, where available, the visitor: device, approximate location, and identifiers that let buyers match the person to profiles built elsewhere; see [[Data Broker]]. Those identifiers came largely from cookies set across sites, and as browsers began blocking them, the industry turned to other signals; see [[Third-Party Cookie]] and [[Browser Fingerprinting]]. Privacy advocates in Europe have argued that broadcasting such data to many bidders conflicts with data-protection law; see [[GDPR]].

Auction rules have shifted. Exchanges long ran second-price auctions, in which the winner pays just above the runner-up's bid. **Header bidding**, which spread around 2015, let publishers collect bids from several exchanges in the visitor's browser before calling their main ad server, weakening the advantage of the largest exchange. By 2019, the major exchanges had moved to first-price auctions. In 2025, a US federal court ruled that Google had illegally monopolized key parts of this market, the tools publishers use to sell ads and the exchange connecting them.

The system has well-known costs. Each layer takes a cut, so a considerable share of what advertisers spend never reaches publishers. Fraud is common: automated traffic generates fake views, and low-quality sites pose as reputable ones to sell inventory. **Malvertising**, malicious code delivered through ad networks, can reach visitors of legitimate sites. The scripts and auctions slow pages and push content around as ads load; see [[Layout Shift]].

Readers have responded predictably. Ads that readers learn to ignore become cheaper, which pushes sellers toward more intrusive formats; see [[Banner Blindness]] and [[Pop-up Ad]]. Many people install blockers; see [[Ad blocker]]. Consent banners exist largely because of this tracking; see [[Cookie Consent]].

The model underlies an argument about the web's economics. Free content funded by attention may push sites toward whatever keeps people clicking; see [[Attention Economy]]. Subscriptions and memberships offer an alternative that works for some publishers; see [[Paywall]].

## See also
- [[Two-Sided Market]]
- [[Web Analytics]]
