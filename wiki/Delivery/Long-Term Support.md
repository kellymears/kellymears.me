---
aliases:
  - LTS
  - LTS release
  - End of life
  - EOL
  - Support window
tags:
  - delivery
summary: A release line that receives security and bug fixes for years instead of months, letting users who value stability skip the constant upgrade treadmill.
---
A **long-term support (LTS)** release is a version of software that the maintainers promise to keep fixing for an extended period, typically several years, without adding new features. Users who need stability can stay on it and receive security patches and important bug fixes, while users who want the newest features follow the faster-moving current releases.

Well-known examples:

- **Ubuntu** publishes an LTS release every two years, each supported for five years as standard and longer with paid extensions, alongside interim releases supported for nine months.
- **Node.js** makes even-numbered major versions LTS, each receiving about 30 months of support, while odd-numbered versions are short-lived.
- **The Linux kernel** designates one release per year as long-term, maintained for several years.
- **Java** has LTS versions every two years, which most enterprises adopt while skipping the releases in between.

The model exists because users differ. A hobbyist wants the newest features. A hospital, bank, or embedded device maker wants software that doesn't change under it, since every upgrade means retesting, retraining, and risk. LTS lets one project serve both.

The work happens through **backports**: fixes made on the main development line are copied back to each supported release line, usually with a [[Cherry-Pick]]. The further the main line moves from an old release, the harder backports become, since the surrounding code has changed. This is the real cost of LTS. Maintainers often support only security fixes in a release's final years, and each supported line multiplies testing work.

Every release eventually reaches **end of life (EOL)**, when fixes stop. Running EOL software means unpatched vulnerabilities accumulate, and the forced upgrade, skipping years of changes at once, is much harder than a series of small ones would have been. A good part of [[Supply Chain Security]] work is simply tracking which components are past end of life.

LTS interacts with other release practices:

- **Release schedules.** Predictable LTS dates let users plan migrations, one benefit of a fixed [[Release Train]].
- **Versioning.** [[Semantic Versioning]] signals which upgrades are safe within a line, while LTS says which lines are maintained.
- **Rolling releases.** The opposite approach, a [[Rolling Release]], delivers updates continuously with no long-lived versions, trading stability for currency.
- **Deprecation.** Features removed in new versions stay in the LTS line, giving users time to migrate as part of a [[Deprecation]] plan.

Staying on LTS is not free either. Lagging behind means missing improvements, accumulating a bigger eventual upgrade, and finding that new libraries no longer support the old version. It's a choice about when to pay for change, not a way to avoid paying, a form of [[Technical Debt]] that some organizations deliberately carry.

## See also
- [[Cherry-Pick]]
- [[Rolling Release]]
- [[Semantic Versioning]]
- [[Release Train]]
