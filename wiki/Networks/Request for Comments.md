---
aliases:
  - RFC
  - IETF
  - Rough consensus
tags:
  - networks
summary: The numbered documents that define internet protocols, begun as humble memos in 1969, and the open, consensus-driven standards process of the IETF that produces them.
---
A **Request for Comments** (RFC) is one of the numbered documents that define how the internet works. TCP, IP, HTTP, email, DNS, and TLS are all specified in RFCs. There are now over 9,000, and each is permanent: once published, an RFC is never changed, only replaced by a newer one that says which it obsoletes.

The series began in April 1969, when Steve Crocker, a graduate student at UCLA, wrote RFC 1 about how the new [[ARPANET]]'s computers might talk to each other. The students designing the protocols were nervous about seeming to issue orders to senior researchers, so Crocker titled the notes "Request for Comments" to make clear they were open to discussion. The modest name stuck long after the documents became binding standards. Jon Postel edited the series for nearly thirty years.

Today RFCs come mostly from the **Internet Engineering Task Force** (IETF), founded in 1986. It's unusual among standards bodies:

- **No membership.** Anyone can join a working group's mailing list and participate. People take part as individuals, not as representatives of their employers.
- **Rough consensus and running code.** A 1992 talk by David Clark summed up the ethos: "We reject kings, presidents, and voting. We believe in rough consensus and running code." Decisions are made when objections have been heard and addressed, not by vote. Working implementations, and testing that independent implementations interoperate, count for more than elegant specs; see [[Gall's Law]].
- **Humming.** At meetings, chairs sometimes gauge sentiment by asking people to hum, which is harder to count exactly than raised hands and keeps attention on the strength of objections rather than numbers.

Not every RFC is a standard. Some are informational, some experimental, some describe best practices. Every year a few April Fools' RFCs appear: RFC 1149 specified IP over avian carriers, sending packets by homing pigeon, and RFC 2324 defined a protocol for controlling coffee pots, which introduced status code 418, "I'm a teapot"; see [[HTTP Status Code]].

The RFCs also gave the internet some of its guiding principles: be conservative in what you send and liberal in what you accept ([[Postel's Law]]), and the [[End-to-End Principle]]. Requirement keywords such as MUST, SHOULD, and MAY, defined precisely in RFC 2119, are now used in specifications far beyond the internet.

The process has critics. It's slow; large companies can fund many participants; and protocols deployed before standardization often become the standard by default; see [[Path Dependence]]. Web technologies are mostly specified elsewhere, by the WHATWG and W3C; see [[Web Standards]].

Its openness has been tested. After 2013 revelations about mass surveillance, the IETF declared pervasive monitoring an attack and pushed encryption across protocols; see [[Transport Layer Security]] and [[QUIC]].

## See also
- [[Telnet]]
- [[Gopher]]
- [[Conventional Commits]]
- [[Architecture Decision Record]]
- [[Iron Law of Oligarchy]]
- [[Syslog]]
