---
aliases:
  - VoIP
  - Internet telephony
  - SIP
tags:
  - networks
summary: Carrying phone calls as data packets over the internet instead of dedicated circuits, which made calls nearly free and eventually replaced the phone network's own core, at the cost of new problems with delay, emergencies, and fake caller ID.
---
**Voice over IP** carries phone calls as data packets over internet links instead of dedicated circuits. The traditional [[Telephone Network]] reserved a fixed channel for each call for its whole length. Voice over IP breaks speech into small packets, each holding a few tens of milliseconds of audio, and sends them like any other traffic; see [[Packet Switching]].

The first consumer software appeared in 1995 and sounded poor over dial-up connections. Skype, launched in 2003, made it mainstream. It routed calls through users' own computers, a design that let it scale without building a network; see [[Peer-to-Peer]]. Businesses meanwhile replaced office phone systems with IP equivalents, and phone companies converted their own backbones. Most calls that look traditional now travel as packets for part of the way.

A call involves two separate jobs:

- **Signaling** sets up the call, finds the other party, rings their phone, and agrees on audio formats. The most common protocol is SIP, standardized in the late 1990s and early 2000s; see [[Signaling Server]].
- **Media** carries the audio itself, usually over UDP, since a late packet is useless and resending it only makes things worse; see [[TCP and UDP]].

Audio is compressed by codecs, which range from the 64 kilobits per second of classic digital telephony down to a few kilobits for low-bandwidth links; see [[Data Compression]].

Conversation is unforgiving. Delay beyond about 150 milliseconds one way makes people talk over each other, and packets arriving at uneven intervals would make speech stutter; see [[Latency and Jitter]]. Phones hold a small jitter buffer to smooth the arrival times, trading a little delay for steadiness. Lost packets are concealed by stretching the surrounding audio or guessing the missing sound. Networks can mark voice traffic for priority over bulk downloads; see [[Quality of Service]]. Home routers that share one address among devices complicated incoming calls; see [[NAT Traversal]].

Some problems were social, not technical:

- **Emergencies.** A landline has a fixed address, so emergency services know where a caller is. An internet phone can be anywhere, and regulators had to require providers to register locations.
- **Power.** Copper landlines draw power from the exchange and keep working in a blackout. Internet phones need a working modem and router; see [[Uninterruptible Power Supply]].
- **Fake caller ID.** Making calls with any displayed number became trivial, and robocalls exploded until carriers adopted signed caller identity; see [[Caller ID Authentication]].

Older services that rode on phone lines, such as alarm panels and card terminals, often broke over packet networks; see [[Fax]].

Browsers now include real-time audio and video directly, so calls happen inside web pages; see [[WebRTC]].

## See also
- [[Videoconferencing]]
- [[Wiretapping]]
