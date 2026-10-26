---
aliases:
  - Wireshark
  - tcpdump
  - Packet sniffing
  - Promiscuous mode
tags:
  - networks
summary: Recording the raw packets crossing a network interface for inspection, the debugger of networking, done with tools like tcpdump and Wireshark and limited mainly by encryption and switched networks.
---
**Packet capture** is the recording of raw network packets as they pass through an interface, so they can be inspected byte by byte. It is to networking what a debugger is to code: the way to stop guessing what was sent and see it.

The classic tools are **tcpdump**, written at Lawrence Berkeley Laboratory in the late 1980s, and its library libpcap, which nearly every capture tool still uses. **Wireshark**, first released in 1998 as Ethereal, adds a graphical view that decodes hundreds of protocols layer by layer, from the Ethernet frame through IP and TCP to the HTTP request inside. Captures are saved in the pcap format, so they can be shared, analyzed later, or replayed against a system; see [[Record and Replay]].

Capturing every packet on a busy link would overwhelm a machine, so tools filter early. A filter expression such as "TCP traffic to port 443" is compiled into a small program that runs inside the operating system kernel and copies only matching packets out.

What a capture can see depends on the network:

- **Promiscuous mode.** A network card normally ignores frames addressed to other machines. In promiscuous mode it passes everything it receives up to the capture.
- **Switches.** On a switched network, a port receives only its own traffic and broadcasts, so watching other machines needs a switch configured to copy traffic to a monitoring port, or a hardware tap in the cable; see [[Ethernet]].
- **Wi-Fi.** Radio reaches everyone in range. A card in monitor mode records every frame on a channel, though modern Wi-Fi encrypts each device's traffic separately; see [[Wi-Fi]].
- **Encryption.** With TLS, payloads are unreadable, but addresses, packet sizes, timing, and often the requested site name remain visible. To debug their own traffic, developers can have browsers write their session keys to a file that Wireshark uses to decrypt.

Common uses are mundane: checking what a DNS server actually answered, seeing retransmissions that explain a slow transfer, or finding where packets above a certain size vanish. Security teams record traffic for forensics and intrusion detection.

Capture has a darker side. On unencrypted public Wi-Fi, anyone could sniff session cookies and take over accounts. A 2010 browser extension called Firesheep made that a one-click operation, and the embarrassment pushed major sites to HTTPS everywhere; see [[HTTP Cookie]] and [[Man-in-the-Middle Attack]]. Capturing other people's communications without authorization is illegal wiretapping in many places.

One classic confusion: captures of outgoing traffic often show a bad [[Checksum|checksum]], because the network card computes it after the capture point.

## See also
- [[Port Scanning]]
