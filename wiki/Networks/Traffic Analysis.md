---
aliases:
  - Contact chaining
  - Website fingerprinting
  - Communications metadata
tags:
  - networks
summary: Learning secrets from the pattern of communications rather than their content, who talks to whom, when, how often and how much, a wartime intelligence technique that encryption doesn't defeat and that underlies modern debates about metadata surveillance.
---
**Traffic analysis** extracts information from the shape of communication rather than its words. Even when every message is encrypted, an observer can see who sends to whom, at what times, how often, in what volume and from where. Those patterns can reveal a great deal; see [[Metadata]].

The technique matured in the world wars. Radio operators couldn't hide that they were transmitting, so intelligence services mapped enemy networks from call signs, message routing and direction-finding, without reading a word. A sudden rise in traffic to a headquarters suggested an offensive; radio silence could mean a fleet was at sea. At Bletchley Park, traffic analysts worked alongside the codebreakers, and their maps of who talked to whom helped guide decryption; see [[Enigma Machine]]. Deception exploited the same habits: before the 1944 Normandy landings, the Allies used fake radio traffic to simulate an army in southeast England.

The principle carries over to the internet. Encryption hides content, but packets still carry addresses, sizes and timings. Watching an encrypted connection to a website, an observer can often tell which page was loaded from the sizes and order of the responses, a technique called **website fingerprinting**. Typing rhythms leak through the timing of keystroke packets, and the length of an encrypted voice packet can hint at the words spoken; see [[Timing Attack]]. Even the name of the site a browser connects to was visible in plaintext until recent protocols began hiding it; see [[Encrypted Client Hello]] and [[DNS over HTTPS]].

Phone records are an especially rich source. A 2016 Stanford study collected call metadata from volunteers and could infer sensitive facts, such as medical conditions, from calls to specialized clinics. Intelligence agencies use **contact chaining**, starting from one suspect and following their contacts, then the contacts' contacts; because social networks are densely connected, a few hops reach a huge number of people; see [[Small-World Network]] and [[Graph theory]]. A former US intelligence director said publicly in 2014 that the US kills people based on metadata. Interception laws often treat metadata as less sensitive than content, a distinction critics consider outdated; see [[Wiretapping]].

Defenses hide the patterns themselves, at a cost. Padding messages to fixed sizes and sending constant streams of dummy traffic conceal volume and timing but waste bandwidth. Routing through intermediaries hides who talks to whom. Tor relays traffic through several encrypted hops but forwards it immediately, so an adversary watching both ends can match timing; see [[Onion Routing]]. Systems that batch and shuffle messages resist that at the price of delay; see [[Mix Network]]. A [[Virtual Private Network]] simply moves the vantage point, revealing everything to the VPN provider instead.

Broadcasting is the oldest countermeasure. A message sent to everyone reveals nothing about its recipient; see [[Numbers Station]].

## See also
- [[End-to-End Encryption]]
- [[Browser Fingerprinting]]
