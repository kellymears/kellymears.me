---
aliases:
  - Tor
  - The Onion Router
  - Onion service
  - .onion
  - Tor Browser
tags:
  - networks
summary: Sending traffic through a chain of relays wrapped in layers of encryption, so that no single relay knows both who you are and where you are going, the design behind Tor.
---
**Onion routing** hides who is talking to whom by sending traffic through a chain of relays, with the data wrapped in one layer of encryption per relay. Each relay peels off its layer, learns only the next hop, and passes the rest along. No single relay knows both the sender and the destination. The idea was developed at the US Naval Research Laboratory in the mid-1990s by Paul Syverson, Michael Reed, and David Goldschlag, to protect government communications, and it only works if many ordinary people use it too, since an anonymity network used only by spies identifies its users as spies.

**Tor**, released in 2002 by Roger Dingledine, Nick Mathewson, and Syverson, is the widely used implementation, run by the nonprofit Tor Project since 2006. Volunteers run several thousand relays.

A Tor connection builds a circuit of three relays:

1. **Guard.** The entry relay sees the user's IP address but not the destination.
2. **Middle.** Sees only the guard and the exit.
3. **Exit.** Connects to the destination and sees where traffic goes, but not who sent it.

The client negotiates keys with each relay using [[Public-Key Cryptography]] and wraps each message for the exit first, then the middle, then the guard. The exit relay sees the traffic itself, so anything not protected by [[Transport Layer Security]] is readable there; malicious exits have been caught harvesting passwords.

**Onion services**, with addresses ending in `.onion`, let a server hide its location too. Client and server each build circuits to a meeting point, so neither learns the other's address. News organizations accept leaks through them with SecureDrop. They also host marketplaces such as Silk Road, shut down in 2013.

Compared with a [[Virtual Private Network]], which moves trust from your ISP to the VPN provider, onion routing aims to require no trust in any single operator. Its limits:

- **Traffic correlation.** An adversary watching both ends, the user's link and the destination, can match timing and volume patterns, defeating the encryption entirely. Tor does not claim to resist a global observer.
- **Speed.** Three relays across continents add [[Latency and Jitter]], so Tor is slow for large downloads and unusable for real-time games.
- **Application leaks.** Browsers reveal identity through cookies, fingerprinting, and plugins, which is why Tor Browser standardizes window sizes and features so users look alike.
- **Blocking.** Relay lists are public, so censors block them. Unlisted *bridges* and *pluggable transports* disguise Tor traffic, and Snowflake routes it through volunteers' browsers over [[WebRTC]].

Its users range from journalists and abuse survivors to criminals, the dual-use tension of any strong privacy tool. Its design is a lesson in the [[End-to-End Principle]]: the network carries opaque traffic, and the protection lives at the edges.

## See also
- [[Browser Fingerprinting]]
- [[Internet Censorship]]
- [[DNS over HTTPS]]
- [[Encrypted Client Hello]]
- [[Man-in-the-Middle Attack]]
