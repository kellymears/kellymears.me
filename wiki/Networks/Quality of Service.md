---
aliases:
  - QoS
  - Traffic shaping
  - Differentiated services
tags:
  - networks
summary: Treating some network traffic better than other traffic, by marking, queuing, and shaping packets so calls and games stay smooth while downloads wait, widely used inside networks and largely absent across the public internet.
---
**Quality of service**, or QoS, means giving some network traffic better treatment than other traffic. A video call needs packets to arrive quickly and steadily but tolerates losing a few; a file download needs every byte but doesn't mind waiting. When a link is congested, treating every packet the same makes the call stutter while the download barely notices. QoS mechanisms let a network favor the traffic that suffers most from delay; see [[Latency and Jitter]].

The internet's basic service is **best effort**: routers forward packets as well as they can, in the order they arrive, and drop them when queues overflow. This keeps the core simple and cheap, and it was a deliberate departure from the telephone network, which reserved a fixed circuit for every call and guaranteed its quality; see [[Packet Switching]] and [[Telephone Network]].

QoS adds several tools:

- **Classification and marking.** Packets are sorted into classes, such as voice, video, interactive, and bulk, and labeled with a few bits in the IP header, an approach called **differentiated services** introduced in 1998.
- **Queuing.** Routers keep separate queues per class and serve them by priority or by weighted shares, so a burst of bulk traffic can't delay voice packets stuck behind it; see [[Queueing Theory]] and [[Head-of-Line Blocking]].
- **Shaping and policing.** Traffic is held to an agreed rate, either smoothed by delaying excess packets or enforced by dropping them, typically metered with a token bucket; see [[Rate Limiting]].
- **Reservation.** An application asks the network in advance for guaranteed capacity along a path. The 1990s standard for this was precise but required every router to track every flow, and it never spread beyond specialized networks.

Across the public internet, QoS mostly doesn't happen. Each network decides independently whether to honor markings, and most reset or ignore them at their borders, partly because nothing stops a sender from marking all its traffic urgent. Instead, capacity grew faster than demand, and overprovisioning did much of what QoS promised; see [[Last Mile]].

Inside networks the picture is different. Enterprises prioritize phone systems and video conferencing, Wi-Fi gives voice and video frames shorter waits for the air, mobile networks assign service classes to calls and data, and newer cellular standards can carve out separate virtual networks with their own guarantees; see [[Wi-Fi]] and [[Cellular Network]].

At home, the most effective form of QoS turned out to be fair queuing rather than priority. Oversized router buffers let one upload add hundreds of milliseconds of delay for everything else, a problem called bufferbloat, and queue management that keeps each flow's queue short fixes it without anyone marking anything; see [[Bufferbloat]].

Whether internet providers may sell faster treatment to particular companies is the heart of the net neutrality debate; see [[Net Neutrality]].

## See also
- [[Tail Latency]]
- [[WebRTC]]
