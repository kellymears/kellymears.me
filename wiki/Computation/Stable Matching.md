---
aliases:
  - Gale-Shapley algorithm
  - Stable marriage problem
  - Deferred acceptance
  - Matching market
tags:
  - computation
summary: Pairing two groups by their preferences so that no two people would both rather have each other than their assigned partners, the algorithm behind medical residency and school placement.
---
The **stable matching problem** asks how to pair members of two groups, each of whom ranks the other group, so that the result is *stable*: no two people would both prefer each other over the partners they were assigned. Such a pair, called a *blocking pair*, would have every reason to abandon the assignment, so a matching with one tends to unravel. David Gale and Lloyd Shapley posed the problem in 1962, phrased as marriage and as college admissions, and proved that a stable matching always exists.

Their proof was an algorithm, **deferred acceptance**:

- Each unmatched member of the proposing side proposes to their favorite on the other side whom they haven't yet tried.
- Each receiver holds on to the best proposal received so far and rejects the rest. Holding is tentative; a better proposal later replaces it.
- Repeat until no one is left to propose.

The run always ends, since nobody proposes to the same person twice, and in at most n² proposals for n pairs, as [[Big-O Notation]] counts it. The result is stable: if a proposer prefers some receiver to their final match, they proposed there first and were turned down for someone the receiver liked better.

The algorithm is not neutral. The proposing side gets the best partner it could have in any stable matching, and the receiving side gets the worst. Which side proposes is a policy choice. Proposers also can't gain by lying about their preferences, a property called *strategyproofness*, which matters when the participants are applicants who might otherwise game the system.

The theory has heavily shaped how real markets are run:

- **Medical residency.** The US National Resident Matching Program had used an equivalent procedure since the 1950s, before anyone proved why it worked. In the 1990s, Alvin Roth redesigned it to handle couples who need placements in the same city, a variant where stable matchings may not exist.
- **School choice.** New York and Boston adopted deferred acceptance for public school placement in the 2000s, replacing systems that rewarded families who ranked strategically.
- **Kidney exchange.** Related market designs pair incompatible donor-patient pairs into swaps and chains.

Shapley and Roth shared the 2012 economics Nobel Memorial Prize for this work. The field it founded, *market design*, treats rules as engineered systems, the way mechanism design does.

Stable matching sits beside other assignment problems in computing. Allocating requests to servers with capacity limits is a many-to-one version, related to [[Consistent Hashing]] and [[Load Balancing]]. Unlike many such problems, which are [[P versus NP Problem|NP-hard]], stable matching is fast to solve, though finding the "fairest" of the many stable matchings is not.

## See also
- [[Greedy Algorithm]]
- [[Network Effect]]
- [[Goodhart's Law]]
- [[Backtracking]]
- [[Linear Programming]]
