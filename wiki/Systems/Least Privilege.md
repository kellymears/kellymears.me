---
aliases:
  - Principle of least privilege
  - Scoped credentials
tags:
  - systems
summary: Granting only the permissions actually required, so a compromise has a small ceiling.
---
**Least privilege** is the principle that any component should hold only the permissions it needs to do its job. Its value is not that it prevents compromise but that it *bounds* it: the question after any breach is what the compromised credential could reach.

The principle is stated easily and applied poorly, because broad permissions are convenient and the cost of narrowing them is paid up front. A few recurring patterns:

**Scope tokens to operations, not to roles.** A process that only reads should hold a read-only credential. A process that only posts a comment should not hold one that can write to the repository.

**Know which credential is actually in play.** A permissions declaration frequently bounds the *platform-issued* token while some other, separately-minted credential does the real work — so tightening the declaration achieves nothing. See [[Environment Variable]] for the related problem of an unexpected credential taking precedence.

**Constrain outbound capability, not just inbound.** For anything running untrusted input through an agent, the exfiltration path matters more than the permission set. See [[Prompt Injection]] and [[Supply Chain Security]].

**Wildcards are not a configuration.** An allowlist of "anything" in a system that defaults to nothing is a common and understandable shortcut, and it grants exactly what the mechanism existed to restrict.

## See also
- [[Secret Management]]
- [[Supply Chain Security]]
- [[Guardrail]]
- [[Same-Origin Policy]]
- [[Code Signing]]
- [[Model Context Protocol]]

## Related
- [[System Prompt]]
