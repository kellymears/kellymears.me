---
aliases:
  - Notarization
  - Gatekeeper
tags:
  - systems
summary: Cryptographically attesting who produced a binary, and the operating-system checks built on it.
---
**Code signing** attaches a cryptographic signature to an executable, attesting to its origin and proving it has not been modified since. Operating systems use signatures to decide whether to run something and what capabilities to grant it.

On macOS the layered system is worth understanding as a practical matter. An application can be *unsigned*, *ad-hoc signed* (a signature with no identity behind it), signed with a paid developer identity, or additionally *notarized* — submitted to Apple for automated scanning and stapled with a ticket. Files downloaded through a browser carry a quarantine attribute, and the system's Gatekeeper check refuses to launch quarantined applications that are not notarized.

The consequence for anyone sharing a small tool informally is concrete: an ad-hoc signed application, sent to another machine, presents a dialog claiming the app is *damaged*. It is not — it is unnotarized and quarantined. The reliable fix is removing the quarantine attribute; the folklore workaround of opening from the context menu no longer applies to ad-hoc signed applications on recent versions.

Testing this requires a machine other than the one that built it, since a local build has no quarantine attribute and a development-path fallback can mask the failure entirely. See [[Ground Truth]].

## See also
- [[Supply Chain Security]]
- [[Letterlocking]]
- [[Daemon]]
- [[Least Privilege]]

## Related
- [[Secret Management]]
- [[Prompt Injection]]
- [[Observability]]
- [[Silent Failure]]
- [[Cron]]
