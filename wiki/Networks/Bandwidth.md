---
aliases:
  - Throughput
  - Goodput
  - Bandwidth-delay product
  - Network bandwidth
tags:
  - networks
summary: How much data a link can carry per second, why that's different from how fast it feels, and why a fast connection can still be slow for small requests.
---
**Bandwidth** is how much data a network link can carry per second. Connections are sold by it, in megabits or gigabits per second, but it is only one of the two numbers that decide how fast a network feels. The other is latency, the time a single bit takes to arrive, covered in [[Latency and Jitter]]. A highway's width is its bandwidth, and its length is its latency. Widening the road lets more cars through each minute but doesn't shorten anyone's trip.

The terms around it are easy to mix up:

- **Bandwidth** is the link's capacity, the most it can carry.
- **Throughput** is what actually gets through, lower because of protocol overhead, contention with other users, and losses.
- **Goodput** is the useful part of the throughput, after headers, retransmissions, and encryption overhead are removed.

Units trip people up too. Network speeds are quoted in bits per second, and file sizes in bytes, so a 100 Mbps connection moves at most 12.5 megabytes per second.

For most web use, latency matters more than bandwidth past a modest threshold. A web page is dozens of small requests, many waiting on earlier ones, and each costs at least one round trip. Doubling bandwidth barely changes how long that takes, while halving the distance to the server, the job of a [[Content Delivery Network]], does. Large downloads and video are the reverse, limited by bandwidth once they get going. [[Adaptive Bitrate Streaming]] picks a video quality from measured throughput.

The **bandwidth-delay product** connects the two numbers: bandwidth multiplied by round-trip time gives how much data must be in flight, sent but not yet acknowledged, to keep a link full. A 1 Gbps path with a 100 ms round trip needs about 12.5 megabytes in flight. TCP's window sizes and [[Congestion Control]] must grow that large before a single connection can use the link, which is why long, fast paths, such as across a [[Submarine Cable]], can disappoint.

The theoretical ceiling for any channel comes from [[Information Theory]]. Shannon showed in 1948 that capacity depends on the frequency range used and the signal-to-noise ratio, which is why faster [[Wi-Fi]] standards use wider channels and why weak signals mean slower links. Physical media differ enormously: copper phone lines carry tens of megabits, while a single [[Optical Fiber]] carries terabits.

Bandwidth is also shared. A home connection is split among every device, and a provider's capacity is oversubscribed on the assumption that not everyone uses it at once. When a link is saturated, queues fill and latency rises for everyone, the problem known as bufferbloat. The same tradeoffs appear in [[Queueing Theory]], and [[Data Compression]] is the cheapest way to need less of it.

## See also
- [[Signal-to-Noise Ratio]]
- [[Pneumatic Tube]]
- [[Pigeon Post]]
- [[Slashdot Effect]]
- [[Speculation Rules]]
