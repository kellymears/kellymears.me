---
aliases:
  - MCP
tags:
  - agents
summary: An open protocol for exposing tools, data, and prompts to AI applications through a uniform interface.
---
The **Model Context Protocol** is an open standard for connecting AI applications to external capabilities. A *server* exposes tools, resources, and prompt templates; a *client* — an assistant application — discovers and invokes them. The point is decoupling: a capability implemented once becomes available to any compliant client, rather than being rebuilt per assistant.

Structurally it is [[Tool Use]] with the definitions supplied at runtime by a separate process rather than compiled into the host. That inversion is what makes it composable, and it introduces the ordinary problems of a plugin system: discovery, versioning, authentication, and the fact that every connected server's tool definitions consume [[Context Window]].

Two practical themes recur when building on it. **Authentication is the hard part** — deciding how an end user's credential reaches a server, and what that credential is scoped to, is more design work than the tools themselves. And **every connected server is trusted input**: its tool descriptions are text the model reads, which makes a hostile or compromised server a [[Prompt Injection]] vector.

The same architecture appears wherever an application platform wants to expose itself to agents — a content system registering its capabilities as discoverable abilities is the same idea under a different name.

## See also
- [[Tool Use]]
- [[Agent Skill]]
- [[Least Privilege]]
- [[Streaming Response]]

## Related
- [[System Prompt]]
- [[Prompt]]
- [[Guardrail]]
