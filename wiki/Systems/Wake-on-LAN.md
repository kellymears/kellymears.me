---
aliases:
  - Wake on LAN
  - Magic packet
tags:
  - systems
summary: A way to switch on a sleeping or powered-off computer by sending a specially shaped packet across the local network, which the network card watches for while the rest of the machine sleeps.
---
**Wake-on-LAN** lets one computer switch on another over a network. The target machine is asleep or powered off, but its network card keeps a trickle of power and listens for a particular message. When that message arrives, the card signals the motherboard to start up. Administrators use it to wake office machines for overnight updates.

The trigger is the **magic packet**. Its contents are simple: six bytes with every bit set, followed by the target machine's hardware address repeated sixteen times; see [[MAC address]]. The network card doesn't need to understand any protocol to recognize it. It just scans incoming frames for that pattern, which is cheap enough to do on standby power. AMD published the magic packet format in the mid-1990s, and the name Wake on LAN was popularized by an industry group led by IBM and Intel soon after.

The packet is usually sent as a broadcast inside a UDP datagram, so every machine on the local segment receives it and only the matching card reacts; see [[User Datagram Protocol]]. Because the sleeping machine has no running network stack, it has no IP address in any useful sense, and the broadcast sidesteps that.

Several pieces have to cooperate for it to work:

1. **Firmware.** The motherboard's setup screen must allow waking from the network; see [[Firmware]].
2. **Operating system.** The driver must leave the card armed when the machine sleeps or shuts down, and some systems disarm it by default.
3. **Power state.** Waking from sleep is more reliable than waking from a full shutdown, which depends on the board keeping the card powered; see [[Suspend and Hibernation]].
4. **Wiring.** Wired Ethernet support is nearly universal, while wake over Wi-Fi is spottier, since a sleeping radio must stay associated with an access point.

Its limits come from its simplicity. Broadcasts don't normally cross routers, so waking a machine on another network needs a helper on the target's local network, such as a router feature, a small always-on device, or a remote login to a machine already awake; see [[Subnet]] and [[Secure Shell]]. Some setups use directed broadcasts or port forwarding, though exposing that to the internet invites abuse; see [[Firewall]].

The protocol has no real authentication. Anyone on the local network can wake any machine. An optional password field exists on some cards, but in practice the defense is controlling who can reach the network at all.

Wake-on-LAN fits naturally into home automation, where a single button can wake a media server or game machine and send it back to sleep later; see [[Home automation]]. It's also part of the boot process for network-booted machines that need to start without anyone pressing a button; see [[Boot Process]].

## See also
- [[Uninterruptible Power Supply]]
- [[Daemon]]
- [[Virtual LAN]]
