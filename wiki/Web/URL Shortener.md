---
aliases:
  - Short link
  - Link shortener
  - TinyURL
tags:
  - web
summary: A service that replaces a long web address with a short code that redirects to it, popularized by character-limited messages and social media, useful for sharing and tracking clicks, and a recurring source of hidden destinations and mass link breakage when services shut down.
---
A **URL shortener** turns a long web address into a short one. Visiting the short link sends a request to the shortening service, which looks up the code and tells the browser to go to the original address instead; see [[URL]] and [[HTTP redirect]]. Under the hood it's a simple table mapping codes to destinations; see [[Key-Value Store]].

The first widely used service, TinyURL, launched in 2002, when long addresses broke across lines in emails and forum posts. Shorteners became essential with Twitter, whose original 140-character limit, inspired by text messages, left little room for a full address; see [[SMS]]. Dozens of services appeared, of which Bitly, launched in 2008, became the best known. In 2011 Twitter began wrapping every link in its own shortener, so it could count clicks and check destinations against lists of malicious sites.

Short codes are usually strings of letters and digits, upper and lower case, which gives 62 possible characters. Six characters allow about 57 billion combinations, plenty for most services, and seven allow over three trillion. Some services count up through codes in order, which makes them predictable, so others pick codes at random and must check for repeats, which become likely sooner than intuition suggests; see [[Base64]] and [[Birthday Problem]]. Predictable codes can also expose private links, such as shared documents, to anyone who enumerates them.

Tracking turned shorteners into a business. Every click passes through the service, which records the time, the rough location and the referring site, giving marketers detailed statistics; see [[Web Analytics]]. Many printed QR codes encode a short link for the same reason, so the destination can be changed after printing; see [[QR code]].

The same indirection creates problems. A short link hides where it goes, so attackers use it to disguise [[Phishing]] pages and [[Malware]] downloads. Many services now offer a preview page, and some email filters expand short links before judging them. Shorteners that redirect anywhere without checks can be abused like other unvalidated redirects; see [[Open Redirect]].

The biggest problem is permanence. A short link works only as long as its service exists. When a shortener shuts down, every link it issued breaks at once, in printed books, academic papers and old posts; see [[Link Rot]]. Several services closed within a few years of launching. Google stopped creating new links on its shortener in 2019 and later announced that old ones would stop working, before partly reversing that decision. Volunteer archivists have spent years scanning shorteners to record where their codes lead, so the mappings outlive the services; see [[Internet Archive]]. Writers concerned with permanence are generally advised to use full addresses where space allows.

## See also
- [[Referrer Policy]]
- [[Deep Linking]]
