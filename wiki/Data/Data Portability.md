---
aliases:
  - Right to data portability
  - Data export
tags:
  - data
summary: The ability to take your data out of one service in a usable form and bring it to another, written into European law as a right and pursued as a check on lock-in, though exports that nothing can import do little.
---
**Data portability** is the ability to take data you've put into one service and move it to another, in a form the other service can use. A photo library, a contact list, years of email, a playlist, or a fitness history all count. Without portability, leaving a service means leaving your data behind, which is a strong reason not to leave.

That reason is the economic point. When switching costs are high, customers stay even when they're unhappy, and a provider can let quality slide or raise prices without losing them; see [[Lock-in]] and [[Enshittification]]. Services with large user bases are especially sticky, since the value lies partly in who else is there; see [[Network Effect]]. Portability lowers the cost of switching and so restores some competitive pressure.

There's a well-known precedent outside software. United States rules adopted in the 1990s let people keep their phone numbers when changing carriers, applied to mobile phones in 2003. A number is a small piece of data, but having to give it up kept many customers from switching.

Law and industry have pushed in several ways:

- **A legal right.** The European Union's data protection regulation, applying since 2018, gives people a right to receive their personal data in a structured, commonly used, machine-readable format and to have it sent directly to another provider where feasible; see [[GDPR]].
- **Export tools.** Large platforms offer bulk downloads of a user's data, often as archives of standard formats; see [[JSON]] and [[CSV]].
- **Direct transfers.** An industry effort launched in 2018 by several major technology companies built tools to move data straight from one service to another without the user downloading it first.
- **Ongoing access.** Later European competition rules require the largest platforms to offer continuous, real-time portability, not just one-off exports.

Formats matter more than the right. An export in a structure no other product reads is portable only in name. Open, documented formats such as calendar files make transfers practical; see [[iCalendar]] and [[Serialization]]. Federated systems take this further, letting accounts move between servers that speak a common protocol; see [[Federation]].

Some data resists portability by its nature. A social network's value is the connections between people, and a contact list or message thread contains other people's information too, which complicates handing it over. Recommendations and reputation built inside a platform are often impossible to carry anywhere.

Software can be designed so the question doesn't arise. Applications that keep the primary copy of data on the user's own device treat the server as a convenience, not the owner; see [[Local-First Software]]. And any export is also a backup, which is reason enough to take one; see [[Backup and Restore]].

## See also
- [[Data Sovereignty]]
- [[Open Data]]
- [[Linked Data]]
- [[Walled Garden]]
