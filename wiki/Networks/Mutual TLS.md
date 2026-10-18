---
aliases:
  - mTLS
  - Client certificate
  - Mutual authentication
tags:
  - networks
summary: TLS in which the client proves its identity with a certificate as well as the server, the standard way for machines to authenticate each other, whose main difficulty is issuing and rotating all those certificates.
---
**Mutual TLS** (mTLS) is [[Transport Layer Security]] in which both sides of a connection present certificates. In ordinary TLS, as when a browser visits a website, only the server proves its identity; the client stays anonymous at the connection level and identifies itself later, with a password, a cookie, or a token. With mTLS, the client also holds a private key and a certificate, and the server refuses the connection unless that certificate checks out.

The handshake adds one step. After the server sends its certificate, it asks the client for one. The client sends its certificate and signs part of the handshake with its private key, proving it holds the key; see [[Public-Key Cryptography]]. Each side then checks the other's certificate against a [[Certificate Authority]] it trusts. Only then does any application data flow.

Where it's used:

- **Service-to-service traffic.** Inside a company's infrastructure, mTLS lets every service verify every caller, rather than trusting anything on the internal network; see [[Zero Trust Network]]. A [[Service Mesh]] usually applies it automatically to every connection.
- **Devices.** Connected devices often authenticate to their cloud services with a certificate installed at manufacture; see [[MQTT]].
- **High-assurance APIs.** Banking and payment interfaces use client certificates so stolen tokens alone aren't enough.

Its strength is that identity is bound to the connection itself. A request can't be replayed by someone who intercepted a token, since they don't hold the private key; see [[Man-in-the-Middle Attack]]. Keys can live in protected hardware so they can't be copied; see [[Trusted Platform Module]].

The difficulty is managing certificates at scale. Every service instance needs its own identity, and certificates expire. Organizations run a private certificate authority and automate issuance. Modern practice favors very short-lived certificates, valid for hours or days and renewed automatically, because revoking a compromised certificate is unreliable: checking revocation lists adds latency and often fails open. A short lifetime makes a stolen key expire on its own. Standards define a common identity format for workloads, so a certificate names a service rather than a machine; see [[Secret Management]].

Other pitfalls:

- **Expiry outages.** A certificate that nobody renewed takes down every connection that depends on it at once.
- **Terminating proxies.** When a [[Reverse Proxy]] or [[Load Balancing]] layer ends the TLS connection, the backend no longer sees the client certificate. The proxy passes the identity in a header, which the backend must trust only from that proxy.
- **Authentication isn't authorization.** mTLS proves which service is calling; separate policy still has to decide what it may do; see [[Least Privilege]].

Browsers support client certificates, but the experience is poor, so for people, other methods dominate.

## See also
- [[Virtual Private Network]]
- [[Secure Shell]]
- [[Passkey]]
