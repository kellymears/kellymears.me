---
aliases:
  - Subject line
  - Commit message conventions
tags:
  - delivery
summary: The note attached to each change in version control, conventionally a short summary line and a body explaining why, which becomes the main record of intent for anyone who later wonders why the code is the way it is.
---
A **commit message** is the text recorded with each change in version control. The code shows what changed; the message is the only place the author can say why. Months or years later, someone puzzling over a strange line will look up the commit that introduced it, and the message is often the only explanation that exists; see [[Git Blame]] and [[Commit]].

Git's conventions grew out of its origins. Linux kernel changes were sent as emails, so the first line of a commit became the email subject and the rest became the body. Common guidance, popularized by a 2014 essay by Chris Beams, follows from that:

- **A short subject line**, around 50 characters, saying what the change does, in the imperative mood: "Fix overflow in date parser," not "Fixed" or "Fixes." It reads as completing the sentence "If applied, this commit will…"
- **A blank line** separating subject from body, which tools rely on.
- **A body** wrapped at about 72 characters, explaining the problem, why this approach was chosen, and what alternatives were rejected.

The body matters most and is most often skipped. The "what" is visible in the [[Diff]]. The reasons aren't: the bug report that prompted it, the constraint that ruled out the obvious fix, the edge case that the odd-looking code handles. Without them, a later maintainer may remove something that looks pointless and reintroduce the bug; see [[Chesterton's Fence]].

Messages also feed tools. Linking issue numbers connects code to discussion. A structured prefix like "feat:" or "fix:" lets tools generate a [[Changelog]] and decide the next version number automatically; see [[Conventional Commits]] and [[Semantic Versioning]]. Trailers at the end record co-authors or sign-offs; see [[Developer Certificate of Origin]].

Good messages depend on good commits. A commit that mixes a refactor, a bug fix, and a formatting change can't be described clearly, so the message tends to become a vague list. Splitting the work makes each message easy to write; see [[Atomic Commit]]. Tidying history before sharing gives a chance to rewrite messages written in haste; see [[Interactive Rebase]].

Teams that squash each pull request into one commit move the record into the pull request description, which then becomes the commit message; see [[Squash Merge]]. Hosting platforms can disappear while the repository survives, so text in the commit itself is the most durable place for the explanation.

Larger choices that outlive a single change deserve a fuller document; see [[Architecture Decision Record]]. Reviewers can ask for a better message as part of [[Code Review]], the same as for better code.

## See also
- [[Git Bisect]]
- [[Version Control]]
