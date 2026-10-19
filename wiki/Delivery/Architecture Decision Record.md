---
aliases:
  - ADR
  - Decision log
  - Design doc
tags:
  - delivery
summary: A short document recording one significant technical decision, its context, and its consequences, kept alongside the code so later readers know why the system is shaped the way it is.
---
An **architecture decision record** (ADR) is a short document that captures one significant technical decision: what was decided, the situation that prompted it, the options considered, and the expected consequences. A project keeps its ADRs together, often as numbered text files in the repository, forming a log of how the system came to be the way it is.

Michael Nygard proposed the format in a 2011 blog post. His template has a few sections:

1. **Title and status.** For example, "ADR 12: Use a message queue for order processing," marked proposed, accepted, deprecated, or superseded.
2. **Context.** The forces at play: requirements, constraints, team skills, deadlines.
3. **Decision.** What the team will do, stated plainly.
4. **Consequences.** What becomes easier, what becomes harder, and what risks the team accepts.

The problem ADRs solve is lost reasoning. Architecture decisions are made in meetings, chat threads, and whiteboard sessions, and the reasons vanish once the people involved move on; see [[Bus Factor]]. Newcomers then face a choice when they meet a strange design: accept it blindly, or change it without knowing why it exists. Either can go badly; see [[Chesterton's Fence]]. An ADR lets them read the reasoning and judge whether the original context still applies.

Records are **immutable**. When a decision is reversed, the old ADR isn't edited; a new one supersedes it and links back. The log then preserves how thinking evolved, and readers can see which conditions changed. This also guards against [[Hindsight Bias]]: a decision that turned out badly may have been reasonable on what was known at the time, and the record shows what that was.

Keeping ADRs in the repository has practical advantages. They're versioned with the code, proposed and discussed through the normal review process, and found by searching the same place; see [[Pull Request]] and [[Code Review]]. They complement [[Commit Message]]s, which explain individual changes but not choices that span hundreds of commits.

ADRs are one kind of design documentation. Many organizations write longer **design docs** before building something big, circulating them for comment. The idea traces back to the internet's [[Request for Comments]] series. Larger open-source projects use formal proposal processes, such as Python's PEPs and Rust's RFCs, that work the same way; see [[Benevolent Dictator for Life]].

The common failure is neglect. Teams write a burst of ADRs, then stop, and the log becomes misleading. Keeping them short, a page or less, helps. So does writing one whenever a decision is hard to reverse, would surprise a newcomer, or took real argument to settle; see [[Technical Debt]], [[Conway's Law]], and [[Pre-mortem]].

## See also
- [[Docs as Code]]
- [[Change Advisory Board]]
- [[Big Design Up Front]]
- [[Engineering Ladder]]
