---
aliases:
  - Cassette testing
  - VCR pattern
tags:
  - agents
summary: Capturing a real interaction once and replaying it deterministically in later test runs.
---
**Record and replay testing** captures the real exchange with an external service — the request and its response — into a fixture, then serves that fixture on subsequent runs. The pattern is old, and its usual name in the HTTP world is the *cassette*, after the library that popularized it. It is what makes a suite that depends on a paid, slow, non-deterministic service fast, free, and repeatable.

Applied to [[Large Language Model]] systems it has particular properties.

**The recording is only valid for the request that produced it.** That request includes the system prompt, the conversation, *and every tool definition in scope* — so an unrelated tool's description being reworded invalidates every recording, even ones that never used it. See [[Fingerprint]].

**Failures deserve recording too.** If only successful calls are captured, a path that recovers from a rejection has nothing to replay and behaves differently under test than in production. Recording the rejection lets replay reproduce the recovery.

**Re-recording has collateral.** Tests elsewhere that pin values derived from a recording — a token count, a specific sentence, an opaque identifier — go red, and read as unrelated breakage mid-session.

Recordings are also a corpus meant to be read later, so a false verdict inside one is worse than a gap. See [[Provenance]].

## See also
- [[Evaluation Harness]]
- [[Test Fixture]]
- [[Determinism]]
- [[Test Double]]
- [[Nondeterminism]]

## Related
- [[LLM-as-Judge]]
- [[Prompt Engineering]]
