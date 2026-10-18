---
aliases:
  - Preview deployment
  - Deploy preview
  - Review app
  - Preview environment
tags:
  - delivery
summary: A complete, short-lived copy of an application spun up automatically for one branch or pull request and torn down when the change merges.
---
An **ephemeral environment** is a full, working copy of an application created automatically for a single branch or [[Pull Request]], and destroyed when that change is merged or abandoned. Instead of a few long-lived shared environments, such as one staging server everyone deploys to in turn, each proposed change gets its own running instance at its own URL. Heroku's Review Apps (2015) popularized the idea, and static hosting platforms made it routine for frontends with automatic deploy previews on every pull request.

The benefits come from removing contention and making changes visible:

- **Reviewers can try the change.** A [[Code Review]] can include clicking through the feature, not just reading the diff. Designers, product managers, and other non-developers can check the result without running anything locally.
- **No queue for staging.** Shared staging environments become bottlenecks, and one broken deploy blocks everyone. With an environment per change, testing happens in parallel.
- **Testing against a real deployment.** [[End-to-End Test]] suites and [[Visual Regression Testing]] can run against the preview as a stage in the [[Deployment Pipeline]], and a Smoke Test confirms it actually starts.
- **Clean slates.** Because each environment is created from scratch, configuration can't drift the way it does on long-lived servers, the same idea behind [[Immutable Infrastructure]].

Making them practical depends on automation. The environment must be described in code, using [[Infrastructure as Code]] and [[Containerization]], so it can be stood up in minutes without human steps. A frontend made with [[Static Site Generation]] is the easy case: a preview is just another set of files on a Content Delivery Network.

The hard parts are usually everything other than the application code:

- **Data.** An empty database isn't useful for review, and copying production data raises privacy problems. Teams load [[Seed Data]], use anonymized snapshots, or branch the database cheaply with [[Copy-on-Write]] storage. Each environment must also run its own [[Database Migration]] steps without touching shared data.
- **External services.** Payment providers, email, and third-party APIs may not support hundreds of short-lived callers, so previews often use sandboxes or [[Test Double]] stand-ins.
- **Secrets and access.** Every environment needs credentials, ideally scoped and short-lived through [[Secret Management]], and previews of unreleased work usually need to be private.
- **Cost and cleanup.** Environments that aren't torn down pile up. Automatic expiry is essential.

On a single machine, running each branch from its own [[Git Worktree]] with its own ports and database is a local version of the same idea.

## See also
- [[Staging Environment]]
