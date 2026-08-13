---
aliases:
  - Web real-time communication
tags:
  - networks
summary: The browser standard for direct peer connections carrying audio, video, and arbitrary data.
---
**WebRTC** is the set of browser APIs enabling direct connections between peers, carrying media streams or arbitrary data channels. It is what makes browser-based video calling and serverless collaborative applications possible without a plugin.

Establishing a connection is the complicated part, and it is why WebRTC is never quite as decentralised as it sounds. Peers must exchange connection descriptions and candidate network paths before any direct link exists, which requires a [[Signaling Server]]. Because most peers sit behind network address translation, they use a STUN server to discover their externally visible address, and when a direct path is impossible they fall back to relaying through a TURN server — which carries all the traffic and is therefore the expensive piece of infrastructure the architecture was meant to avoid.

For data rather than media, the data channel is the useful surface: reliable or unreliable, ordered or unordered, and a natural transport for a replicated document type.

The practical caution for anything built on public signalling infrastructure is that its availability is not yours to control. A shared public signalling endpoint can be down, and an application depending on it should say so plainly rather than appearing broken. Running your own is a small service and eliminates the dependency.

## See also
- [[Signaling Server]]
- [[Peer-to-Peer]]
- [[Conflict-Free Replicated Data Type]]

## Related
- [[Eventual Consistency]]
- [[Idempotence]]
