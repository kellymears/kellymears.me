---
aliases:
  - SSRF
  - Cloud metadata service
tags:
  - web
summary: Tricking a server into making requests on an attacker's behalf, reaching internal services and cloud credential endpoints that the attacker could never reach directly, behind some of the largest cloud breaches.
---
**Server-side request forgery** (SSRF) is an attack in which someone tricks a server into making network requests on their behalf. Any feature where a server fetches a URL that a user supplies, link previews, image imports, webhook testers, PDF generators, is a candidate. The attacker can't reach the internal network directly, but the server can, so the attacker borrows the server's position.

A typical vulnerable feature: "Paste an image URL and we'll import it." Instead of an image URL, the attacker enters an address on the internal network: an admin panel bound to localhost, a database's HTTP interface, or an internal API that was never meant to face the internet. The server fetches it and, depending on the feature, returns the contents or at least reveals whether it exists.

The richest target is in the cloud. Cloud virtual machines can query a **metadata service** at a fixed internal address, which returns details about the machine, often including temporary credentials for the machine's cloud account; see [[Secret Management]]. An SSRF that reaches it can turn a link-preview bug into control of storage buckets and databases. This is how a 2019 breach at a major US bank exposed records of about 100 million people: a misconfigured firewall in front of a web app allowed requests to the metadata service, and the stolen credentials reached storage holding customer data; see [[Object Storage]].

It's the server-side cousin of [[Cross-Site Request Forgery]], in which the victim's browser is tricked into making requests with the victim's cookies. Both exploit a trusted party acting on an attacker's instructions, a version of the confused deputy problem; see [[Least Privilege]].

Defenses, ideally layered:

- **Allowlists.** Only fetch from domains the feature needs. Blocklists of internal addresses are fragile, since addresses can be written many ways, and [[Domain Name System]] records can point a harmless-looking name at an internal address, or change after the check; see [[Race Condition]].
- **Resolve, then check, then connect to that exact address**, and refuse redirects or re-check each one; see [[HTTP Status Code]].
- **Network segmentation.** Make the fetching service unable to reach anything internal at all, for instance by running it in an isolated network with only outbound internet access; see [[Firewall]] and [[Zero Trust Network]].
- **Harden the metadata service.** Cloud providers added a second version requiring a session token obtained with a special request, which simple SSRF can't produce.

SSRF has become more common as applications fetch more on users' behalf: webhooks, integrations, and AI agents that browse the web or call tools, where a malicious page can steer the fetching; see [[Webhook]], [[Tool Use]], and [[Prompt Injection]].

It was added to the OWASP Top 10 list of critical web risks in 2021; see [[Penetration Testing]].

## See also
- [[XML]]
- [[Open Redirect]]
