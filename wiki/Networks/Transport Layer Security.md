---
aliases:
  - TLS
  - SSL
  - HTTPS
  - TLS handshake
  - Forward secrecy
tags:
  - networks
summary: The protocol that encrypts and authenticates most internet traffic, the S in HTTPS, combining key exchange, certificates, and fast symmetric encryption.
---
**Transport Layer Security (TLS)** is the protocol that makes a network connection private and authenticated. It sits between an application protocol such as HTTP and the transport underneath, so the same TLS secures web pages (HTTPS), email, database connections, and APIs. It provides three guarantees: confidentiality, since eavesdroppers see only ciphertext; integrity, since tampering is detected; and authentication, since the client can verify it is talking to the real server and not an impostor in the middle.

TLS descends from Netscape's SSL, created in the mid-1990s. The name changed to TLS in 1999 when the IETF took it over, though "SSL" survives in everyday speech and in library names. Every SSL version and early TLS versions are now considered broken. TLS 1.3, finalized in 2018, removed decades of legacy options, along with the vulnerabilities that came with them.

A connection begins with a **handshake**:

1. The client says hello, listing supported cipher suites and sending its share of a key exchange.
2. The server answers with its own key share and its **certificate**, a document binding its domain name to a public key, signed by a [[Certificate Authority]].
3. The server proves it holds the matching private key by signing the handshake. The client verifies the certificate chain and that signature.
4. Both sides derive the same symmetric keys from the key exchange, and encrypted traffic flows.

TLS 1.3 completes this in one round trip, and resumed connections can send data immediately (0-RTT), which matters because every round trip adds [[Latency and Jitter]]. [[QUIC]] builds the TLS 1.3 handshake directly into the transport, combining connection and encryption setup.

Modern TLS uses ephemeral keys, fresh for every connection and thrown away afterward, which gives **forward secrecy**: stealing the server's long-term private key later doesn't decrypt recorded past traffic. The underlying building blocks come from [[Public-Key Cryptography]] for setup and fast symmetric ciphers for data.

TLS encrypts content but not everything. The server's IP address is visible, and the hostname leaks in the handshake's server name field unless Encrypted Client Hello is used. DNS lookups leak destinations unless protected by [[DNS over HTTPS]]. Where TLS ends matters too. A [[Reverse Proxy]], [[Content Delivery Network]], or [[API Gateway]] usually *terminates* TLS, decrypting traffic before passing it on, so the hop behind it needs its own protection. [[Zero Trust Network]] designs encrypt those internal hops too, often with mutual TLS, in which clients present certificates as well.

## See also
- [[HTTP Compression]]
- [[Heartbleed]]
- [[Real-Time Clock]]
- [[HTTP2 and HTTP3]]
- [[HTTP Strict Transport Security]]
- [[Mutual TLS]]
