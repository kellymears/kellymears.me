---
aliases:
  - People search
  - Real-time bidding
  - Location data
tags:
  - data
summary: Companies that collect personal information from public records, purchases, apps, and ad auctions, merge it into profiles, and sell it, mostly out of sight of the people described.
---
A **data broker** is a company that collects information about people from many sources, merges it into profiles, and sells or licenses it, usually without any relationship with the people described. The industry is large and mostly invisible: Acxiom, one of the oldest, says it holds data on about 2.5 billion people.

Sources:

- **Public records**: property deeds, voter rolls, court filings, marriage and business licenses.
- **Purchases**: loyalty programs, warranty cards, magazine subscriptions, and card transaction data sold in bulk.
- **Apps.** Software kits embedded in free apps collect a phone's precise [[Global Positioning System]] fix many times a day and sell it as **location data**, sometimes without the app's own developers understanding the deal.
- **Ad auctions.** When a page or app loads an ad, an auction called **real-time bidding** broadcasts the device's identifier, approximate location, and page context to hundreds of bidders in milliseconds. Every bidder sees the data whether or not it wins.
- **Web tracking** through cookies, scripts, and fingerprinting; see [[Third-Party Cookie]], [[Third-Party Script]], and [[Browser Fingerprinting]].

Records from these sources are joined by matching names, emails, addresses, and device IDs; see [[Entity Resolution]]. The merged profiles are sorted into marketing segments. A 2013 US Senate report found brokers selling lists with names like "Rural and Barely Making It," as well as lists of people with particular illnesses.

Brokers usually describe their data as anonymous, but location traces resist anonymization. A 2013 study led by Yves-Alexandre de Montjoye found that four points in time and place were enough to single out 95% of people in a mobile phone dataset, because few people share the same daily path; see [[Differential Privacy]].

The harms are concrete:

- **People-search sites** sell home addresses for a few dollars, and stalkers and abusers use them.
- **Sensitive visits.** Location data has been sold showing visits to clinics, shelters, and places of worship. In 2021 a Catholic priest resigned after a publication obtained commercial app data showing his use of a gay dating app.
- **Warrantless purchase.** Government agencies have bought location data that they would need a warrant to demand directly.

Regulation is patchy, especially in the US. Vermont created the first broker registry in 2018. California's Delete Act of 2023 sets up a single request to delete one's data from every registered broker. In 2024 the Federal Trade Commission barred the location brokers X-Mode and InMarket from selling sensitive location data. Europe's GDPR requires a legal basis for this processing, which consent banners try to supply; see [[Cookie Consent]] and [[Personal Data]].

Broker databases concentrate risk, holding everything in one place for whoever breaks in; see [[Data Breach]]. The trade is the commercial engine of the [[Attention Economy]], and its raw material outlives the reason it was gathered; see [[Data Retention]].

## See also
- [[Referrer Policy]]
- [[Data Sovereignty]]
- [[Paywall]]
