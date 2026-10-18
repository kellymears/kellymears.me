---
aliases:
  - Iterated prisoner's dilemma
  - Tit for tat
  - Nash equilibrium
  - Game theory
tags:
  - meaning
summary: The game-theory puzzle in which two players each do better by betraying the other, yet both end up worse off than if they had cooperated, and how repetition makes cooperation possible.
---
The **prisoner's dilemma** is the best-known puzzle in game theory, the mathematical study of strategic decisions where each player's outcome depends on what others do. It shows how individually rational choices can produce a result that is worse for everyone.

The classic story: two suspects are held separately. Each can stay silent, cooperating with the other, or testify, defecting. If both stay silent, each gets a short sentence. If both testify, each gets a medium sentence. If one testifies and the other stays silent, the one who testified goes free and the silent one gets a long sentence. Whatever the other does, testifying leaves you better off, so two rational players both testify and both serve medium sentences, though mutual silence would have served them both better.

Mutual defection is a **Nash equilibrium**, named for John Nash: a set of choices where no player can improve their own outcome by changing strategy alone. The dilemma shows that an equilibrium need not be good for anyone. The game was framed by Merrill Flood and Melvin Dresher at the RAND Corporation in 1950, and Albert Tucker gave it the prison story.

The same structure appears across social life:

- **Arms races and price wars.** Each side builds weapons or cuts prices to avoid falling behind, and both end up worse off.
- **Shared resources.** Overfishing and pollution are many-player versions, the [[Tragedy of the Commons]], closely tied to the [[Free Rider Problem]] and to [[Externality]].
- **Distributed systems.** Protocols that assume honest peers can be gamed, which is why some must tolerate defectors, as [[Byzantine Fault Tolerance]] does.

Real cooperation happens anyway, and the **iterated** prisoner's dilemma explains much of it. When the same players meet repeatedly, defection today invites retaliation tomorrow. In 1980 political scientist Robert Axelrod ran computer tournaments where strategies submitted by researchers played each other repeatedly. The winner was the simplest entry, **tit for tat**, by Anatol Rapoport: cooperate first, then copy whatever the other player did last. Axelrod concluded that successful strategies are nice (never defect first), retaliatory, forgiving, and clear. Cooperation can emerge without trust or central authority, as long as the future casts a long enough shadow.

That shadow fails when interactions are one-off or anonymous, which is one reason reputation systems, contracts, and institutions matter. Elinor Ostrom showed that real communities avoid the tragedy through monitoring, graduated sanctions, and shared rules, the solutions described under [[Collective Action]]. Many [[Commons-Based Peer Production]] projects work the same way: repeated interaction and visible reputation make contribution pay.

The model has critics. Real people cooperate more than the theory predicts in one-shot games, often punishing unfairness at a cost to themselves. And the label can become self-fulfilling: assuming everyone defects can make defection rational.

## See also
- [[Principal-Agent Problem]]
- [[Social Deduction Game]]
- [[BitTorrent]]
- [[Rent-Seeking]]
- [[Generative Adversarial Network]]
