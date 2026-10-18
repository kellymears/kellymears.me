---
aliases:
  - Stream-aligned team
  - Inverse Conway maneuver
  - Enabling team
  - Team cognitive load
tags:
  - delivery
summary: A model for organizing software teams around the flow of change, with four team types, three ways for teams to interact, and team cognitive load as the main constraint.
---
**Team Topologies** is a model for organizing software teams, introduced by Matthew Skelton and Manuel Pais in a 2019 book of the same name. Its starting point is [[Conway's Law]]: systems end up mirroring the communication structure of the organizations that build them. If that's true, team structure is an architectural decision, and it should be designed deliberately rather than inherited from an org chart.

The model names four team types:

- **Stream-aligned teams** own a slice of the product, a user journey, a feature area, or a service, end to end, from idea to production. Most teams should be this kind.
- **Enabling teams** are specialists who help stream-aligned teams pick up a new skill or practice, then step away.
- **Complicated-subsystem teams** own parts that need deep expertise, such as a video codec or a pricing engine, so other teams don't have to.
- **Platform teams** provide internal services that make stream-aligned teams faster, treated as products with their own users; see [[Platform Engineering]].

It also names three ways teams interact: **collaboration**, working closely together for a period on something new; **X-as-a-Service**, where one team consumes what another provides through a clear interface; and **facilitating**, where one team coaches another. Each has a cost. Collaboration is creative but slow and blurs ownership, so it should be temporary.

The central constraint is **team cognitive load**: the amount a team can hold in its head and own well. A team responsible for too many services, tools, and domains slows down and makes mistakes, however skilled it is; see [[Cognitive Load]]. Much of the model is about reducing what each stream-aligned team must know, by moving shared concerns to platforms and specialists.

The model favors small, long-lived teams, roughly five to nine people, which keeps communication manageable and lets trust build; see [[Brooks's Law]] and [[Dunbar's Number]]. Reorganizing constantly destroys the shared context that makes a team effective.

The **inverse Conway maneuver** applies Conway's Law in reverse: decide on the architecture you want, then shape teams to match it, so the communication structure pushes the system in that direction. Splitting a monolith into services, for instance, tends to stall if one team still owns everything; see [[Microservices]] and [[Strangler Fig Pattern]].

Team Topologies grew partly from the [[DevOps]] movement's discovery that a separate "DevOps team" could recreate the old handoffs. Its answer was to make handoffs explicit, minimize them, and treat team boundaries as interfaces to design.

Critics note that real organizations rarely fit four boxes and that the model says little about how to change an existing structure. But its vocabulary has spread widely.

## See also
- [[Bus Factor]]
- [[Code Owners]]
- [[DORA Metrics]]
- [[Data Mesh]]
- [[Inner Source]]
- [[Value Stream Mapping]]
