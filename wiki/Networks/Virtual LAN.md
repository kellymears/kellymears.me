---
aliases:
  - VLAN
  - 802.1Q
  - Network segmentation
tags:
  - networks
summary: A logical network carved out of shared switches, letting devices plugged into the same hardware be separated into isolated groups, used to keep guests, phones, cameras, and servers apart and to limit how far an intruder can reach.
---
A **virtual LAN**, or VLAN, divides one physical local network into several logical ones. Devices plugged into the same switch can be kept apart as if they were on separate hardware, and devices in different buildings can be grouped together as if on one.

An ordinary local network is a single **broadcast domain**: messages sent to everyone, such as requests asking which device holds an address, reach every machine; see [[Ethernet]]. As networks grow, that broadcast traffic adds up, and every device can see and reach every other. Before VLANs, separating groups meant separate switches and cabling. A VLAN makes the separation a configuration setting.

The common standard, **IEEE 802.1Q**, published in 1998, adds a four-byte tag to each Ethernet frame carrying a 12-bit VLAN number, allowing 4,094 usable VLANs. A switch port configured as an **access port** belongs to one VLAN, and devices attached to it never see tags. A **trunk port**, typically between switches or to a router, carries traffic for many VLANs, tagged so each frame stays in its group. The tag adds bytes to each frame, which can matter for equipment with strict size limits; see [[Maximum Transmission Unit]].

Traffic between VLANs must pass through a router or a switch that routes, where it can be filtered; see [[IP Routing]] and [[Firewall]]. Each VLAN usually gets its own address range; see [[Subnet]].

Common uses follow the groups that should be kept apart. Guest Wi-Fi goes on its own VLAN so visitors reach the internet but not internal machines; see [[Wi-Fi]]. Desk phones are put on a voice VLAN, often with priority, so calls aren't disrupted by bulk data; see [[Voice over IP]] and [[Quality of Service]]. Cameras, printers, and smart devices, which often have weak security, are isolated so a compromised one can't reach anything valuable; see [[Internet of Things]]. Small offices and home networks use the same technique with inexpensive managed switches.

That isolation is **network segmentation**, and it limits how far an intruder can move. In the widely reported 2013 breach at the retailer Target, attackers entered through credentials stolen from a heating and ventilation contractor and reached payment systems, which investigators attributed partly to insufficient separation; see [[Data Breach]]. VLANs aren't a security boundary on their own, since misconfigured trunks can let crafted, double-tagged frames hop between them, and modern security designs authenticate every connection rather than trusting a segment; see [[Zero Trust Network]].

Data centers outgrew the 4,094 limit. Overlay technologies such as VXLAN, defined in 2014, carry Ethernet frames inside UDP packets with a 24-bit identifier, allowing about 16 million segments across routed networks, often managed by central software; see [[Software-Defined Networking]].

## See also
- [[Spanning Tree Protocol]]
- [[Network Topology]]
