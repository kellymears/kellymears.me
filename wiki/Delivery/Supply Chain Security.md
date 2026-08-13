---
aliases:
  - Dependency security
tags:
  - delivery
summary: Protecting against compromise arriving through the code and tooling a project depends on.
---
**Supply chain security** addresses the risk that comes through dependencies: a package that is malicious, one that was taken over, one whose build tooling was compromised, or a build system that can be induced to do something on an attacker's behalf.

The attack surface is larger than the dependency list. It includes transitive dependencies, install scripts that execute during installation, the continuous-integration environment, and any automation that acts on content an outsider can influence.

That last one deserves particular attention, because it is where a modern hazard sits. Automation that runs an agent over externally-authored text — a dependency update's release notes, an issue description, a pull request body — has a specific exfiltration shape: the checkout step persists a credential into the working directory by default, where an unrestricted read plus any outbound request walks it out. Closing it means not persisting the credential, scoping outbound destinations to a known list, and removing any capability that sends arbitrary text to a third party. Restricting the token's permissions is not sufficient, because a workflow's permission block bounds the *platform* token, not a separately-minted one the agent holds. See [[Prompt Injection]] and [[Least Privilege]].

The ordinary defences still matter: a [[Lockfile]], pinned versions, reviewed updates, and minimal privileges everywhere.

## See also
- [[Least Privilege]]
- [[Secret Management]]
- [[Lockfile]]
- [[Package Manager]]
- [[Code Signing]]

## Related
- [[Silent Failure]]
- [[Semantic Versioning]]
- [[Monorepo]]
