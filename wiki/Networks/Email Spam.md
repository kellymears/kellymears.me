---
aliases:
  - Spam
  - Unsolicited bulk email
  - Spam filter
tags:
  - networks
summary: Unsolicited bulk email, cheap to send and costly to receive, which grew from one advertisement on the ARPANET in 1978 into an arms race between spammers and filters that shaped how email works.
---
**Email spam** is unsolicited bulk email, usually advertising, often fraudulent. It exists because sending costs the sender almost nothing, while the costs of storing, filtering, and reading it fall on everyone else; see [[Externality]].

The first widely cited example came in 1978, when a marketer at Digital Equipment Corporation sent an announcement of new computers to several hundred people on the ARPANET. Complaints followed at once. Spam reached a wider public in 1994, when two lawyers posted an advertisement for immigration services to thousands of newsgroups at once; see [[Usenet]]. The name comes from a 1970 Monty Python sketch in which the word "spam" drowns out a conversation, a joke early online communities adopted for any flood of repeated junk.

Email was built for a small network of people who trusted each other. Any server could accept mail from any other and believe the claimed sender; see [[Simple Mail Transfer Protocol]]. That openness let spam scale. By the late 2000s, estimates put spam at around 80 to 90 percent of all email sent. Much of it came from botnets, huge numbers of infected home computers sending a little each, which made blocking by address hard; see [[Botnet]].

The economics need very few buyers. A 2008 study that infiltrated a botnet found roughly one sale for every 12.5 million messages sent, and the campaign still made money.

Defenses came in layers:

- **Blocklists** of addresses known to send spam, shared among mail servers since the late 1990s.
- **Statistical filters** that learn which words mark a message as spam, popularized by an essay from the programmer Paul Graham in 2002; see [[Naive Bayes]].
- **Sender authentication**, which lets a receiving server check that mail claiming to come from a domain really did; see [[Email Authentication]].
- **Reputation and rate limits**, which treat new or sudden high-volume senders with suspicion; see [[Rate Limiting]].
- **Spam traps**, addresses never given to anyone, so any mail they receive marks its sender; see [[Honeypot]].

Each defense prompted adaptation. Spammers misspelled words, hid text in images, and padded messages with innocent prose; see [[Adversarial Example]]. The cost of an error is lopsided too: a missed spam is an annoyance, while a legitimate message filtered out can be a lost job offer; see [[False positive]].

Laws helped at the margins. The United States' CAN-SPAM Act of 2003 required working unsubscribe links instead of banning bulk email outright; Europe requires consent; see [[Opt-in]]. In 2024, Google and Yahoo began requiring large senders to authenticate and offer one-click unsubscribing.

The most dangerous spam today isn't advertising but fraud and credential theft; see [[Phishing]]. Its techniques spread to every open channel, from comments to text messages; see [[SMS]].

## See also
- [[Content Moderation]]
- [[Sybil Attack]]
