---
aliases:
  - ABR
  - HLS
  - HTTP Live Streaming
  - MPEG-DASH
  - Bitrate ladder
tags:
  - networks
summary: Streaming video as short chunks at several quality levels, so the player can switch quality every few seconds to match the network, the method behind nearly all online video.
---
**Adaptive bitrate streaming** delivers video as a series of short chunks, each available at several quality levels, and lets the player choose which quality to fetch next based on current network conditions. When bandwidth drops, the next chunks come at lower resolution; when it recovers, quality climbs back. The goal is to keep the video playing without stalling, at the best quality the connection can sustain. Nearly all online video works this way.

The pieces:

- **Segments.** The video is cut into chunks, typically two to ten seconds long.
- **Bitrate ladder.** Each segment is encoded at several bitrates and resolutions, from a few hundred kilobits per second for a phone on a weak signal to tens of megabits for 4K, using the [[Data Compression]] of a video codec.
- **Manifest.** A playlist file lists the available qualities and the URL of every segment.
- **Player logic.** The player measures how fast recent segments downloaded and how many seconds of video it has buffered, and picks the next segment's quality accordingly.

Apple introduced HTTP Live Streaming, HLS, in 2009 for the iPhone, and the international MPEG-DASH standard followed in 2012. The crucial choice was to use ordinary [[Hypertext Transfer Protocol]] downloads instead of special streaming protocols. Every segment is just a file, so any web server can host it and any [[Content Delivery Network]] can cache it at the edge, near viewers.

Choosing quality is a control problem. Throughput-based algorithms estimate bandwidth from recent downloads, but estimates are noisy and video traffic shares the link with everything else under [[Congestion Control]]. Buffer-based algorithms, such as BOLA from 2016, choose quality mainly from how full the buffer is: plenty buffered means room to try higher quality. Players also avoid switching too often, since flickering quality annoys viewers more than steady, slightly lower quality.

Viewer behavior makes the stakes concrete. A large 2012 study by S. Shunmuga Krishnan and Ramesh Sitaraman found viewers began abandoning a video after two seconds of startup delay, with each additional second losing about 6 percent more. Rebuffering mid-play is worse still. Players therefore start low and climb.

Encoding got smarter. Netflix introduced per-title encoding in 2015, tailoring each title's ladder to its content, since a cartoon needs far fewer bits than a grainy action film,.

Live streaming adds a latency trade-off. Larger buffers absorb [[Latency and Jitter]] but put viewers 20 to 30 seconds behind real time, which matters when neighbors cheer a goal first. Low-latency HLS and chunked delivery cut this to a few seconds, while interactive uses that need under a second turn to [[WebRTC]] instead. Big live events also test infrastructure, as millions request the same new segment at once, a [[Thundering Herd]] that edge caches absorb.

## See also
- [[Video Compression]]
- [[Quality of Service]]
- [[QUIC]]
- [[Napster]]
- [[Packet Loss]]
- [[Cellular Network]]
