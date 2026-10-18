---
aliases:
  - RC
  - Pre-release
  - General availability
  - Beta release
tags:
  - delivery
summary: A build that will ship as-is unless someone finds a reason it should not, the alpha-beta-RC ladder, and how projects from the Linux kernel to browsers run their release channels.
---
A **release candidate** is a build that is believed to be ready to ship and will become the final release unless testing finds a serious problem. It is not a preview of what is coming but the actual thing, offered for a last round of scrutiny. If a blocking bug turns up, it is fixed and a new candidate is cut; if not, the candidate is promoted to the release, often without rebuilding.

Release candidates sit at the end of a traditional ladder:

- **Alpha.** Feature-incomplete, for internal or adventurous testers. Expect breakage.
- **Beta.** Feature-complete, or nearly, but with known bugs. Wider testing, often by real users who opt in.
- **Release candidate.** No known blocking bugs. Only critical fixes go in.
- **General availability.** The final release, once called "release to manufacturing" when software shipped on discs.

[[Semantic Versioning]] gives these stages a syntax: `2.0.0-rc.1` is a pre-release that sorts before `2.0.0`. Package managers skip pre-releases by default, so users opt in deliberately.

The discipline that makes a candidate meaningful is **build once, promote the same artifact**. If the shipped release is rebuilt from source after testing, it is not the thing that was tested; a different compiler, dependency, or environment could change it. Promoting the exact artifact through stages is a principle of the [[Deployment Pipeline]], and a [[Reproducible Build]] makes rebuilding verifiable when it is unavoidable.

During the candidate phase, a [[Code Freeze]] usually applies to the release branch. Fixes land on the main branch first and are backported with [[Cherry-Pick]], so main never loses them. Testing focuses on [[Regression Testing]], upgrade paths, and [[Acceptance Testing]] by the people who will sign off.

Large projects show the pattern clearly. The Linux kernel opens a two-week merge window for new features, then releases a candidate each week, usually reaching rc7 or rc8 before the final version, a cycle of about nine or ten weeks. Browsers run parallel **release channels**: Chrome's Canary, Dev, Beta, and Stable each carry a newer build to a smaller, more tolerant audience, so a change is exercised by millions of people before reaching everyone. Channels are a cousin of a [[Canary Release]], which applies the same staged exposure to a server deployment.

Release candidates suit software that ships in versions users install: operating systems, libraries, desktop and mobile apps, firmware. For web services under [[Continuous Deployment]], every commit that passes the pipeline is effectively a candidate, and staged rollout replaces the formal ladder. Projects on a [[Release Train]] cut candidates on a fixed schedule, and a candidate that fails waits for the next train rather than delaying it.

The candidate's notes become the release's [[Changelog]], and a stable release may then enter a [[Long-Term Support]] line that receives fixes for years.

## See also
- [[Git Tag]]
- [[Artifact Repository]]
- [[Smoke Test]]
