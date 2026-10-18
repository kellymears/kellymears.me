---
aliases:
  - Internal developer platform
  - Golden path
  - Paved road
  - Developer platform
tags:
  - delivery
summary: Building internal self-service tooling so product teams can ship without each becoming experts in infrastructure, by offering a well-supported default path rather than a mandate.
---
**Platform engineering** is the practice of building internal tools and services that let a company's product teams create, deploy, and run software themselves, without each team having to master the underlying infrastructure. The product is an *internal developer platform*: templates for new services, a [[Deployment Pipeline]] that works out of the box, standard logging and monitoring, provisioned databases, and a portal or command-line tool that ties it together.

It emerged as a correction to how "you build it, you run it" played out. DevOps asked product teams to own their software in production, which was right, but in many organizations it also handed every team the full weight of containers, cloud permissions, [[Infrastructure as Code]], networking, and security scanning. Each team rebuilt the same scaffolding slightly differently. The [[Cognitive Load]] crowded out the product work. A platform team absorbs that load once, for everyone.

The central idea is the **golden path**, Spotify's term, or *paved road*, Netflix's: an opinionated, well-maintained default way to do common things. Create a service from the template and it already has CI, deployment, health checks, dashboards, and alerting. Teams may leave the path when they need to, but then they own what they build. The path wins by being easier, not by being required.

Several principles separate platforms that work from ones that don't:

- **Treat it as a product.** Developers are the customers. Platform teams that interview users, measure adoption, and write documentation build things people use; teams that build what they find interesting build shelfware.
- **Self-service.** If using the platform requires filing a ticket and waiting, it is a queue, not a platform.
- **Thin and composable.** A platform that hides everything breaks the first time a team needs something unusual. Exposing the underlying tools, with good defaults on top, ages better. See [[Tesler's Law]]: complexity moves, and the platform chooses who carries it.
- **Measure outcomes.** [[DORA Metrics]] such as deployment frequency and lead time show whether the platform made delivery faster, and adoption numbers show whether teams chose it.

The book *Team Topologies* gave the role its usual framing: a platform team exists to reduce the load on stream-aligned teams, and its success is measured by how little those teams need to think about it. [[Conway's Law]] applies directly. The platform's boundaries become the boundaries of the systems built on it, so a platform designed around one team's needs shapes everyone's architecture.

The common failure is building too much too early: a large portal before anyone has asked for one, or an abstraction over infrastructure that the platform team must then maintain alongside the real thing, a version of the [[Second-System Effect]]. Successful platforms usually start by paving the road teams already walk.

## See also
- [[Site Reliability Engineering]]
- [[Ephemeral Environment]]
- [[Twelve-Factor App]]
- [[Design System]]
