---
aliases:
  - Release manager
  - Release engineer
tags:
  - delivery
summary: The discipline of turning source code into software that can be reliably built, versioned, packaged, and shipped to users, covering everything from the build system to the decision about what goes into each release.
---
**Release engineering** is the discipline concerned with how software gets from a developer's change to a user's hands. It covers building code into runnable artifacts, assigning versions, packaging, testing release candidates, managing branches, and coordinating when and how each release ships. A **release engineer** or **release manager** owns this process, and on large projects it's a full-time job.

Most developers think of a release as an event. Release engineers think of it as a pipeline that must work every time. Its core concerns include:

- **Builds.** The same source should produce the same output wherever it's built, so a bug can be traced to a known commit; see [[Build System]] and [[Reproducible Build]].
- **Versioning.** Each release needs an identifier that tells users what changed and whether it's safe to upgrade; see [[Semantic Versioning]]. A written record of what changed in each release helps users decide.
- **Branching.** Projects often stabilize a release on its own branch while development continues, then carry selected fixes across; see [[Cherry-Pick]].
- **Artifacts.** Built packages are stored, signed, and traceable to the exact code and process that produced them; see [[Artifact Repository]] and [[Build Provenance]].
- **Gates.** Releases pass through stages, such as alpha, beta, and release candidate, with criteria for advancing; see [[Release Candidate]].

How often to release is one of the field's central questions. For many years, large software shipped on long cycles, with big releases every year or two. Web browsers changed that. Google's Chrome moved to a six-week release cycle in 2010, and Mozilla's Firefox followed in 2011; both later shortened to four weeks. These projects run on a schedule: features that are ready ship, and those that aren't wait for the next train; see [[Release Train]].

Frequent releases change the job. With a release every few weeks, or many times a day in web services, there's no time for manual stabilization, and the release process itself has to be automated and dependable; see [[Continuous Deployment]]. Frequent, small releases are also less risky, since each contains fewer changes; see [[Small Batches]].

Some products need long support for old versions alongside new ones, which means maintaining multiple release branches, each receiving security fixes; see [[Long-Term Support]]. When a release goes wrong, release engineering also covers the tools to pull it back or patch it quickly, often under pressure and outside the normal schedule; see [[Hotfix]].

Release engineering is rarely glamorous. Its successes are invisible, and its failures are public. A mistake in signing, packaging, or versioning can affect every user at once, and some of the most damaging software supply chain attacks have targeted the release process itself; see [[Supply Chain Security]].

## See also
- [[Capability Maturity Model]]
- [[Code Freeze]]
