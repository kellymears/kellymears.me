---
aliases:
  - Mixnet
  - Anonymous remailer
  - Cover traffic
tags:
  - networks
summary: An anonymity system that passes messages through a chain of relays, each of which collects a batch, strips a layer of encryption and sends them out shuffled, so that no observer can match what goes in with what comes out, proposed by David Chaum in 1981 and the ancestor of most anonymous communication.
---
A **mix network** hides who is communicating with whom by passing messages through a series of relays called mixes. Each mix gathers a batch of incoming messages, removes a layer of encryption from each, shuffles them and sends them on. An observer watching the mix sees messages go in and messages come out, but can't tell which output corresponds to which input.

David Chaum described the idea in 1981 in a paper on untraceable electronic mail, years before most people had an email address. The sender wraps a message in several layers of encryption, one for each mix in a chosen route, using each mix's public key; see [[Public-Key Cryptography]]. Each mix can peel off only its own layer, learning only the next hop. Because changing the encryption changes how the message looks, and the batch is reordered, appearance and timing reveal nothing; see [[Fisher-Yates Shuffle]]. As long as one mix in the chain is honest, the link between sender and recipient stays hidden. Chaum also showed how a recipient could supply an untraceable return address for replies.

The 1990s brought practical **anonymous remailers**, servers that stripped identifying headers from email and forwarded it; see [[Simple Mail Transfer Protocol]]. The simplest kept a table of pseudonyms, and the most famous, run from Finland, shut down in 1996 after legal pressure to reveal users' identities. Cypherpunk remailers then chained through several servers with layered encryption, and later designs adopted fixed message sizes and pools that held messages for random intervals.

Mixing works by delay, and delay is the cost. Waiting to fill a batch and holding messages makes timing correlation hard but adds seconds to hours, fine for email and unusable for browsing. Tor, designed in the early 2000s, kept layered encryption but dropped batching to relay traffic immediately; see [[Onion Routing]]. That made it fast enough for the web, at the price of vulnerability to an adversary who can watch both ends of a connection and match the timing; see [[Traffic Analysis]] and [[Latency and Jitter]].

**Cover traffic**, dummy messages sent continuously, hides when real messages are sent and how many there are, but costs bandwidth. Mix networks must also resist an attacker who floods a mix with their own messages so that only one real message remains in the batch, or who runs many mixes; see [[Sybil Attack]].

Interest revived in the 2010s, as metadata surveillance became a public concern. Newer designs balance delay against anonymity with random per-message delays and cover traffic, and some anonymous messaging systems and cryptocurrencies build on them; see [[Metadata]]. Mixing also underpins some electronic voting schemes, where ballots are shuffled through mixes that prove mathematically they've done so honestly; see [[Zero-Knowledge Proof]].

## See also
- [[Dark Web]]
- [[Packet Switching]]
- [[Steganography]]
