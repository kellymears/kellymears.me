---
aliases:
  - Annotated tag
  - Release tag
  - Signed tag
  - Lightweight tag
tags:
  - delivery
summary: A fixed, human-readable name for one commit, used to mark releases, and the reason a tag should never be moved once others have seen it.
---
A **Git tag** is a name attached permanently to one [[Commit]]. Branches are names that move as new commits arrive; a tag is meant to stay put. Its main use is marking releases, so `v2.4.0` always means exactly the code that shipped as version 2.4.0, and anyone can check it out years later.

Git has two kinds:

- **Lightweight tags** are just a name pointing at a commit, the same as a branch that never moves.
- **Annotated tags** are full objects in the repository, with their own author, date, and message, and they can be cryptographically signed. Release tooling generally expects these, and `git describe` uses them to produce version strings like `v2.4.0-12-g3f2a1c9`, meaning twelve commits after v2.4.0.

A **signed tag** adds a GPG or SSH signature from the maintainer, so a downstream user can verify that the release came from them and was not altered. Because Git identifies everything by hash, as in a [[Merkle Tree]], a signature on a tag vouches for the entire history beneath it. This is the same mechanism as [[Commit Signing]], applied at the point where trust matters most, and it is one strand of [[Supply Chain Security]].

Tags tie into release practice:

- **Version names.** Tags usually follow [[Semantic Versioning]] or calendar versioning, and tooling reads the latest tag to decide the next number, often from conventional commits since the last tag.
- **Pipelines.** Pushing a tag commonly triggers the [[Deployment Pipeline]] to build and publish a release, and a [[Changelog]] is generated from the commits between two tags.
- **Candidates.** Tags like `v3.0.0-rc.1` mark a [[Release Candidate]], so testers know exactly what they are testing.
- **Support lines.** A [[Long-Term Support]] branch accumulates tags for each patch release.

The rule that matters is never to move a published tag. Git does not fetch a changed tag automatically, so after a maintainer deletes and recreates `v1.2.0` on a different commit, some machines have the old one and some the new, and the name no longer means one thing. Package managers that resolve versions from tags may have cached the original, breaking [[Reproducible Build|reproducibility]]. A mistake in a release is fixed by releasing `v1.2.1`. Container image tags show the opposite habit: `latest` is moved on every build, which is why careful deployments pin images by content digest instead, the same idea as a [[Lockfile]].

Tags are also cheap to make, so teams use them for other fixed points: a deploy marker, the state before a large migration, or the commit a paper's results were produced from.

## See also
- [[Semantic Versioning]]
- [[Release Train]]
- [[Immutability]]
- [[Software Bill of Materials]]
