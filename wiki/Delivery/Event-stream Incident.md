---
aliases:
  - event-stream
  - flatmap-stream
tags:
  - delivery
summary: The 2018 npm attack in which a popular package's burned-out author handed publishing rights to a stranger, who added a dependency carrying encrypted code that targeted one Bitcoin wallet app.
---
The **event-stream incident** was a 2018 attack on the npm package registry. A malicious dependency was slipped into event-stream, a stream-handling library downloaded about two million times a week, and aimed at a single target: the Copay Bitcoin wallet app, which depended on it indirectly.

The library's author, Dominic Tarr, had written it years earlier and no longer used it. In September 2018 a stranger offered to take it over, and Tarr gave them publishing rights, as he had done for other packages. The new maintainer added a dependency called flatmap-stream, then released a version of event-stream that used it, and a later version that removed it again. Projects that had already picked up the version with flatmap-stream kept it; see [[Open Source Sustainability]] and [[Dependency Hell]].

The malicious code was written so it would do nothing nearly everywhere:

- **Encrypted payload.** The harmful part was encrypted, and the key was the description field of the package that included it. It decrypted correctly only inside Copay's build.
- **Narrow target.** In Copay, it tried to steal the private keys of wallets holding large balances and send them to a remote server.
- **Not in source.** The malicious code was only in the published package, not the matching source repository.

It was found in November 2018, when a developer investigated a deprecation warning about a cryptographic function that event-stream shouldn't have been calling, and opened a public issue on the project. Nobody had reviewed the new maintainer's changes before they shipped; see [[Code Review]].

The response split. Many blamed Tarr for handing a widely used package to an unknown person. Tarr's answer was that he had received nothing for maintaining it, that the license made no promises, and that the people depending on it had never offered to help. Both points stood: the ecosystem relied on unpaid individuals making good security decisions alone; see [[Free Rider Problem]] and [[Permissive License]].

For delivery practice, the incident is an argument for several defenses:

- **Pin and review.** Lockfiles keep a build from quietly picking up a new dependency version, and a diff of the lockfile shows when one arrives; see [[Lockfile]].
- **Watch the depth.** Copay never chose event-stream directly. The risk sits mostly in transitive dependencies nobody reviews; see [[Software Bill of Materials]].
- **Check what's published.** Comparing the published package with its claimed source catches code that exists only in the package; see [[Reproducible Build]].

It came two years after the left-pad removal, which had shown how one maintainer's single action could break thousands of builds; this showed it could also compromise them; see [[Left-Pad Incident]].

## See also
- [[Supply Chain Security]]
- [[XZ Utils Backdoor]]
- [[Protestware]]
- [[Yanked Release]]
- [[License Compatibility]]
- [[Open Source Program Office]]
