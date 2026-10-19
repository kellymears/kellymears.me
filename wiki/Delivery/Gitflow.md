---
aliases:
  - Git flow
  - GitHub flow
  - GitLab flow
tags:
  - delivery
summary: A Git branching model built around long-lived develop and main branches plus feature, release and hotfix branches, popular in the 2010s for versioned releases and later contrasted with simpler flows for continuously deployed software.
---
**Gitflow** is a branching model for Git described by Vincent Driessen in a 2010 blog post titled "A successful Git branching model." It arrived as teams were moving from centralized version control to Git, and its clear diagram of colored branch lines made it one of the most widely adopted conventions of the decade; see [[Branching Model]].

The model uses two permanent branches:

- **main** (originally master) holds only released code. Every commit on it is a release, marked with a tag; see [[Git Tag]].
- **develop** is the integration branch where finished features accumulate for the next release.

Three kinds of temporary branches support them:

- **Feature branches** split from develop and merge back when done; see [[Feature Branch]].
- **Release branches** split from develop when it is nearly ready, allowing final fixes and version bumps while new features continue on develop. When stable, a release branch merges into main, is tagged, and merges back into develop; see [[Release Candidate]].
- **Hotfix branches** split from main to patch production urgently and merge into both main and develop; see [[Hotfix]].

Merges are made with explicit merge commits rather than fast-forwards, so the history records where each feature began and ended; see [[Fast-Forward Merge]]. A set of command-line extensions automated the branch bookkeeping.

The model suits software shipped in numbered versions, where several releases may need support at once and users upgrade on their own schedule; see [[Semantic Versioning]] and [[Long-Term Support]]. Its costs show up elsewhere. Long-lived feature branches drift from develop and produce painful merges; see [[Merge Conflict]]. The double merge of releases and hotfixes is easy to get wrong, and a fix that lands in main but not develop quietly reappears as a regression later.

In 2011 Scott Chacon described **GitHub flow** as a deliberately minimal alternative: main is always deployable, every change happens on a short-lived branch, review happens in a pull request, and merged changes are deployed right away; see [[Pull Request]] and [[Continuous Deployment]]. **GitLab flow** adds environment or release branches downstream of main for teams that need them. Trunk-based development goes further, keeping branches to a day or two or committing straight to the main line behind feature flags; see [[Trunk-Based Development]].

In 2020 Driessen added a note to the original post saying that for web applications delivered continuously, a simpler workflow such as GitHub flow is usually a better fit, and that Gitflow remains suited to explicitly versioned software. That reflection is a useful summary of the whole debate: the right model depends on how software reaches its users, not on which diagram is most popular.

## See also
- [[Release Train]]
- [[Merge Train]]
