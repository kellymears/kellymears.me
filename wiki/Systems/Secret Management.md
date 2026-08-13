---
aliases:
  - Secrets
  - Credentials
tags:
  - systems
summary: Storing, distributing, and rotating credentials without embedding them in code or history.
---
**Secret management** is the handling of credentials — API keys, database passwords, signing keys — so that they are available where needed and nowhere else. The baseline rule is that a secret must never enter version control, because history is permanent and a committed secret is compromised even after it is removed.

The usual mechanisms are environment variables injected at run time, a password manager or vault for human access, and a platform's secret store for automation. Each has a distribution problem: getting the secret to every place that needs it, including the ones nobody remembers — a test configuration, a container image, a code-generation step, a newly provisioned working copy.

Three practical notes.

**A missing secret should fail loudly.** An empty credential defaulted to an empty string produces an authentication error far from the cause. See [[Fail Fast]].

**Automation environments scope secrets differently.** A workflow triggered by an automated actor may receive a restricted set, so a secret that is present in one trigger context reads as empty in another — with no error anywhere.

**Rotation must be possible.** A secret nobody can rotate without downtime will not be rotated, which turns a routine hygiene task into an incident.

## See also
- [[Least Privilege]]
- [[Environment Variable]]
- [[Supply Chain Security]]
- [[Silent Failure]]
- [[Defensive Default]]
- [[Prompt Injection]]
- [[Continuous Deployment]]

## Related
- [[Observability]]
- [[Ground Truth]]
