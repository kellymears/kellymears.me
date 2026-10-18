---
aliases:
  - Tracer bullet
  - Spike
  - Vertical slice
  - Steel thread
tags:
  - method
summary: A tiny end-to-end version of a system, connecting every major part and deployed early, then fleshed out, so that integration problems surface at the start instead of the end.
---
A **walking skeleton** is a tiny implementation of a system that performs one small function end to end, passing through every major part of the architecture. It is built first and deployed, then fleshed out. The software methodologist Alistair Cockburn named it.

A skeleton for an online store might let a user see one hard-coded product and place an order that lands in the real database and triggers a real email. Nothing is polished, but every boundary has been crossed once: front end to server, server to database, database to email, and code to production.

Building it first surfaces the problems that otherwise appear late:

- **Integration.** Parts built separately and joined at the end rarely fit. The last tenth of a project, joining everything, often takes as long as the rest; see [[Ninety-Ninety Rule]].
- **Deployment.** Shipping the skeleton means the build, test, and release machinery exists from the first week, rather than being improvised before launch; see [[Deployment Pipeline]] and [[Continuous Integration]].
- **Unknowns.** Each connection tests an assumption about a library, service, or environment while changing course is still cheap; see [[Fail Fast]] and [[Cone of Uncertainty]].
- **Testing.** An end-to-end test can be written on day one and kept passing as the system grows; see [[End-to-End Test]].

It also follows the observation that working complex systems grow from working simple ones; see [[Gall's Law]].

Related terms:

- **Tracer bullets**, from Andrew Hunt and David Thomas's *The Pragmatic Programmer* (1999), describe the same idea through an image: tracer rounds glow in the dark, so a gunner can see where shots land and adjust aim. Tracer code is real code that is kept and built on.
- A **spike**, from Extreme Programming, is a short, throwaway experiment that answers one question, such as whether a library can handle the load. Its code is discarded and its answer is kept. A prototype is similar: built to learn and then rebuilt properly.
- A **vertical slice** cuts through every layer for one feature, as opposed to building one layer completely, such as the whole database, before starting the next. Game studios use the term differently, for a polished demo level that shows what the finished game will feel like.

The **minimum viable product** applies the same reasoning to the business: the smallest thing that tests whether anyone wants it; see [[Minimum Viable Product]].

The common pitfall is gold-plating the skeleton, adding the features and abstractions it was meant to postpone; see [[You Aren't Gonna Need It]]. Unfinished paths can ship to production hidden behind switches, so the skeleton grows on the main branch rather than in a long-lived one; see [[Feature Flag]] and [[Trunk-Based Development]].

## See also
- [[Planning Fallacy]]
- [[Big Rewrite]]
- [[Extreme Programming]]
- [[User Story]]
