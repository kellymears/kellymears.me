---
aliases:
  - Mesh networking
  - Zigbee
  - Thread
  - Matter protocol
  - Z-Wave
  - IEEE 802.15.4
  - Border router
tags:
  - networks
summary: A network in which devices relay traffic for one another rather than all talking to a central hub, the design behind Zigbee and Thread in smart homes.
---
A **mesh network** is one in which nodes relay traffic for one another, so a message reaches its destination by hopping across intermediate devices rather than going directly to a central access point. Range and reliability then grow with the number of devices. Each new node can extend coverage, and if one node fails, traffic routes around it. The opposite design, a *star*, puts every device one hop from a hub, as ordinary Wi-Fi does.

Smart homes are the most familiar example, because their devices need what Wi-Fi handles poorly: low power, small packets, and dozens or hundreds of nodes. The main protocols:

- **Zigbee** (2004) runs on the low-power IEEE 802.15.4 radio at 2.4 GHz with roughly 250 kbit/s. It defines its own network and application layers, so it needs a coordinator, and historically vendors' devices did not always cooperate.
- **Z-Wave** uses sub-gigahertz frequencies, which carry farther through walls and avoid 2.4 GHz congestion, under a single tightly controlled specification.
- **Thread** (2014) uses the same 802.15.4 radio but carries ordinary [[IPv6]] packets, so every device is directly addressable. *Border routers* connect the mesh to the home network, and there can be several, which removes the single hub as a single point of failure.
- **Matter** (1.0 in 2022) is an application layer, not a radio. It runs over Thread or Wi-Fi and standardizes device types so one bulb can be controlled from several ecosystems at once.

Mesh networks separate devices into roles. Mains-powered devices such as plugs and bulbs act as **routers**, always awake and relaying. Battery-powered sensors are **sleepy end devices** that wake briefly to report and depend on a parent router to hold messages. That is why a mesh is often weak in the parts of a house with only battery devices, and why removing a powered device can strand others.

The 2.4 GHz band is shared with Wi-Fi and Bluetooth, so Zigbee and Thread channels are usually picked to avoid the busiest Wi-Fi channels. Unlike fire-and-forget [[TCP and UDP|UDP]] commands over Wi-Fi, mesh protocols acknowledge and retry at each hop, at the cost of some [[Latency and Jitter|latency]]. Matter devices are found with multicast DNS, the same [[Multicast]] discovery other local services use.

## See also
- [[IPv6]]
- [[Multicast]]
- [[Peer-to-Peer]]
- [[TCP and UDP]]
- [[Latency and Jitter]]
- [[Network Effect]]
- [[Packet Switching]]
- [[Wi-Fi]]
- [[Bluetooth]]
