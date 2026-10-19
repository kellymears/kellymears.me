---
aliases:
  - ECH
  - Encrypted SNI
  - ESNI
tags:
  - networks
summary: A TLS extension that encrypts the first message of a secure connection, including the name of the site being visited, closing one of the last places where an eavesdropper could read which website a person was reaching.
---
**Encrypted Client Hello**, or ECH, is an extension to the TLS protocol that hides which website a browser is connecting to from anyone watching the network. Even after HTTPS encrypted page contents, the name of the site traveled in plain text at the start of every connection. ECH encrypts that too; see [[Transport Layer Security]].

The leak comes from shared hosting. One server, or one content delivery network address, often hosts thousands of sites, and it must know which one a client wants before it can present the right certificate. So the browser's first message, the **ClientHello**, carries the site's name in a field called server name indication. Anyone on the path, such as an internet provider or a national firewall, could read it, and many used it to log browsing, filter content, or block sites; see [[Content Delivery Network]] and [[Internet Censorship]].

An early attempt, encrypted SNI, encrypted only the name field and was tested from 2018. It left other revealing fields in the clear, so it was replaced by ECH, which encrypts the entire ClientHello.

ECH works in two layers:

1. **An outer hello** in plain text names a generic, shared front, such as the content delivery network itself, which reveals only that the user is connecting to that provider.
2. **An inner hello**, encrypted with a public key the provider publishes, carries the real site name and the rest of the negotiation; see [[Public-Key Cryptography]].

The browser gets that public key through the DNS, alongside the site's address, so ECH only fully protects privacy if the DNS lookup itself is encrypted, as it is with DNS over HTTPS. Otherwise the name leaks one step earlier; see [[Domain Name System]] and [[DNS over HTTPS]].

Major browsers enabled ECH by default around 2023 and 2024, and large providers enabled it on their networks. It works best at scale: when many sites share one front, the outer name tells an observer almost nothing, while a site on its own dedicated address is still identifiable from the address alone; see [[Metadata]].

ECH has detractors. Corporate security systems and parental filters that inspect the server name to enforce policy lose that view, pushing them toward intercepting traffic outright or managing devices directly; see [[Firewall]] and [[Zero Trust Network]]. Governments that filter by name have responded by blocking ECH connections, as China did with the earlier encrypted SNI in 2020 and Russia did with ECH in 2024, a reminder that ECH hides where a connection is going but not that ECH is in use; see [[Man-in-the-Middle Attack]].

The design reflects a broader lesson about protocols: anything sent in clear text eventually becomes something middleboxes depend on, so new protocols encrypt as much as possible from the start; see [[Protocol ossification]] and [[QUIC]].

## See also
- [[Onion Routing]]
- [[Traffic Analysis]]
- [[End-to-End Encryption]]
