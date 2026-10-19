---
aliases:
  - CSMA/CD
  - CSMA/CA
  - Hidden node problem
  - Collision domain
tags:
  - networks
summary: The listen-before-talk rule that lets many devices share one medium, detecting collisions on early Ethernet cables and avoiding them on Wi-Fi, where the hidden node problem means two senders can't hear each other at all.
---
**Carrier-sense multiple access**, or CSMA, is a family of rules that let many devices share one transmission medium, a cable or a radio channel, without a central scheduler. The core rule is the polite conversational one: listen before talking, and if someone else is speaking, wait. It refined the earlier ALOHA approach of transmitting blindly; see [[ALOHAnet]].

Listening first doesn't prevent all collisions. Signals take time to travel, so two stations that both hear silence can start at nearly the same moment and their transmissions overlap. The variants differ in how they handle that.

**CSMA with collision detection** (CSMA/CD) was the method of classic Ethernet, where every computer was attached to the same coaxial cable or, later, to a hub that repeated everything to every port; see [[Ethernet]]. A station transmitting on a cable can also listen to it, so if what it hears differs from what it sends, a collision has occurred. It stops at once, sends a short jamming signal so all others notice, and waits a random interval before retrying, doubling the range of possible waits after each successive collision; see [[Exponential Backoff]]. The shared segment within which collisions occur is called a **collision domain**.

Detection imposed physical limits. A collision must be noticed before the sender finishes its frame, or it won't know to retry, so Ethernet set a minimum frame size of 64 bytes and a maximum cable length so that a signal could cross the network and back in less time than sending 64 bytes takes; see [[Maximum Transmission Unit]]. Under heavy load, collisions and backoff wasted much of the capacity. Switches, which give each device its own link, and full-duplex cabling, which separates sending from receiving, eliminated collisions on wired networks, and CSMA/CD became obsolete.

**CSMA with collision avoidance** (CSMA/CA) is what Wi-Fi uses, because radio makes detection impractical: a station's own transmission drowns out everything else at its antenna; see [[Wi-Fi]] and [[Antenna]]. Instead, stations wait a random backoff even when the channel seems free, the receiver acknowledges every frame, and a missing acknowledgment is treated as a collision.

Radio adds the **hidden node problem**. Two laptops on opposite sides of an access point may both reach it but not hear each other, so each senses a clear channel and both transmit, colliding at the access point. An optional handshake addresses this: the sender asks permission with a short request-to-send, and the access point's clear-to-send reply, heard by everyone in its range, tells hidden stations to stay quiet.

Contention grows worse as networks get crowded, so newer Wi-Fi standards add scheduling, with the access point assigning slices of the channel to clients, much as cellular networks do; see [[Cellular Network]] and [[Thundering Herd]].

## See also
- [[Token Ring]]
- [[Radio Spectrum]]
- [[Latency and Jitter]]
- [[Network Topology]]
- [[Two-Way Radio]]
