---
aliases:
  - Indirect prompt injection
tags:
  - agents
summary: Untrusted content that reaches a model's context and is treated as instruction.
---
**Prompt injection** is the attack in which text controlled by someone other than the operator reaches a model's [[Context Window]] and is acted on as instruction. In the *indirect* form the attacker never talks to the model at all — they plant text in a document, a web page, an issue description, or a dependency's release notes that the agent will later read.

It is structurally hard because models have no reliable boundary between instructions and data. Everything in the window is text. Filtering helps at the margins and cannot be relied on.

The defenses that hold are architectural rather than linguistic:

**Least privilege.** Scope what the agent can do so that a successful injection has a small ceiling. An agent that only needs to post a comment should not hold a credential that can write to the repository. See [[Least Privilege]].

**Close the exfiltration channels.** Credentials tend to be sitting in the working directory — a version-control config that persisted an access token, an environment file — where an unrestricted read plus any outbound request walks them out. Restrict outbound destinations to a known list, and be aware that a search query is attacker-composed text sent to a third party, which is the one channel a destination allowlist cannot close.

**Confirm before acting outward.** See [[Human in the Loop]].

## See also
- [[Guardrail]]
- [[Secret Management]]
- [[Supply Chain Security]]
- [[Least Privilege]]
- [[Model Context Protocol]]
- [[Prompt]]

## Related
- [[Tool Use]]
- [[Large Language Model]]
