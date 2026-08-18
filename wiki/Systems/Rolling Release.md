---
aliases:
  - Rolling release model
tags:
  - systems
summary: A distribution model that ships updates continuously instead of in versioned batches, trading stability for currency.
---
A **rolling release** is a software distribution model that ships updates continuously as they're ready, rather than bundling a fixed set of changes into a periodically released, numbered version. Arch Linux and its derivatives are the canonical example: there is no "Arch 12" to upgrade to, because there is no discrete version at all — running `pacman -Syu` today pulls whatever the maintainers have most recently pushed, and running it again next month pulls the accumulated changes since.

This sits opposite the **point release** model — Debian stable, Ubuntu LTS, most enterprise Linux distributions — where a version is frozen, tested as a whole, and only receives security backports until its support window ends, at which point everyone upgrades to the next frozen version in one deliberate jump. Point releases trade currency for predictability: the packages tested together in September are still exactly what's installed the following June, because nothing moves without a new major version.

Rolling release systems get new features and security fixes faster, since nothing waits behind a release freeze, but a routine update can break a working system with no warning, because there was never a coordinated testing pass across everything changing at once. The practical mitigation most rolling distributions converge on is publishing update news for breaking changes and expecting the operator to read it before updating — a discipline point releases don't need, since their testing already absorbed that risk on the operator's behalf.

The distinction generalizes past Linux distributions: any software that ships continuously to production, gated only by its own tests rather than a fixed release train, is making the same trade.

## See also
- [[Systemd]]
- [[Package Manager]]
- [[Continuous Deployment]]
- [[Database Migration]]
