---
aliases:
  - Pairing
  - Mob programming
  - Ensemble programming
  - Driver and navigator
tags:
  - delivery
summary: Two people writing code together at one workstation, one typing and one thinking ahead, trading speed per person for fewer defects and knowledge spread across a team.
---
In **pair programming**, two people work on the same code at the same time. Traditionally one is the *driver*, who types and handles the details of the current line, and the other is the *navigator*, who reviews each line as it is written, thinks about the overall direction, and spots problems early. The two switch roles frequently. The practice was popularized by Kent Beck's Extreme Programming in the late 1990s.

Several styles have developed:

- **Ping-pong pairing** combines pairing with [[Test-Driven Development]]: one person writes a failing test, the other makes it pass and writes the next test, and so on.
- **Strong-style pairing**, described by Llewellyn Falco, follows the rule that for an idea to go from your head into the computer, it must go through someone else's hands.
- **Mob or ensemble programming**, popularized by Woody Zuill around 2012, extends the idea to a whole team working on one problem at one screen, rotating the driver every few minutes.

The evidence is mixed but consistent in direction. An early study by Laurie Williams and colleagues in 2000 found pairs took about 15 percent more total person-hours than individuals but produced code with about 15 percent fewer defects. A 2009 meta-analysis by Jo Hannay and colleagues found a small positive effect on quality and a cost in effort, with the biggest gains for complex tasks and for less experienced programmers. Pairing is not reliably faster per person. Its returns come in fewer bugs, better designs, and shared understanding.

The practical benefits:

- **Continuous review.** Mistakes are caught as they are typed, rather than days later in [[Code Review]] on a [[Pull Request]], which makes it easier to merge often in a [[Trunk-Based Development]] workflow.
- **Knowledge spread.** At least two people understand every change, which raises the team's [[Bus Factor]] and speeds up onboarding.
- **Staying on track.** A partner keeps a session from drifting into a rabbit hole of [[Yak Shaving]], and explaining a problem aloud often solves it, as with [[Rubber Duck Debugging]].

It has costs too. Pairing is intense and tiring, and constant conversation is hard to sustain for a full day. It breaks the solitary concentration that [[Flow]] depends on, and an expert can easily dominate, leaving the other person typing without learning, the [[Curse of Knowledge]] at work. Its fit varies from person to person. For some neurodivergent programmers, a partner's presence works like [[Body Doubling]] and helps with starting and staying on a task. For others, the social load adds to [[Cognitive Load]] and drains energy fast. Remote pairing with shared editors has made the practice easier to dip into for short sessions, and coding assistants are now marketed as AI pair programmers, though they can't share the human pair's accountability.

## See also
- [[Code Review]]
- [[Bus Factor]]
- [[Test-Driven Development]]
- [[Rubber Duck Debugging]]
