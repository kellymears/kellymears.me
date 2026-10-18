---
aliases:
  - SDN
  - OpenFlow
  - Data plane
  - Network function virtualization
tags:
  - networks
summary: Separating the decisions about where traffic should go from the hardware that moves it, so a central program can configure a whole network at once, which now underpins cloud data centers and the virtual networks they rent out.
---
**Software-defined networking** separates the part of a network that decides where traffic should go from the part that forwards it, and moves the deciding into central software. Instead of configuring hundreds of switches and routers one at a time, operators write programs that configure them all.

Every network device does two jobs. The **data plane** forwards packets, as fast as possible, by looking up each packet's destination in a table. The **control plane** builds those tables, deciding which paths exist and which to prefer. In traditional networks both live inside each box, and the boxes negotiate routes among themselves with distributed protocols; see [[IP Routing]] and [[Border Gateway Protocol]]. Each device is configured by hand through its own command line, and each vendor's devices work differently.

Software-defined networking pulls the control plane out into a **controller**, a program with a view of the entire network, which installs forwarding rules in simple switches through a standard interface. The idea took shape at Stanford, where OpenFlow, published in 2008, let researchers program the forwarding tables of commercial switches. A startup from the same group was bought by VMware in 2012 for about $1.26 billion.

The payoff is global optimization. Distributed protocols make each device choose for itself; a controller can see all demands and links at once. Google described in 2013 how its software-defined network between data centers ran links at close to full capacity, while conventional wide-area links typically ran at a third of that, kept slack to absorb failures; see [[Congestion Control]].

Related shifts followed:

- **Network function virtualization** replaces dedicated appliances, such as firewalls, load balancers, and VPN gateways, with software on ordinary servers; see [[Firewall]] and [[Load Balancing]].
- **Programmable data planes.** Languages such as P4, from 2014, let operators redefine how switches parse and handle packets, not just fill in their tables.
- **Virtual networks.** Every cloud customer gets private networks, subnets, and firewall rules that exist only in software, laid over shared physical hardware; see [[Hypervisor]] and [[Subnet]].

Networks became something to describe in code, version, and review; see [[Infrastructure as Code]]. Inside clusters, the same split between a central control plane and distributed proxies reappears one layer up; see [[Service Mesh]].

Centralization brings its own risks. A controller is a single point of failure that must itself be replicated. And a mistaken change applies everywhere at once: several of the largest cloud outages have come from automated configuration pushes that cut off far more than intended; see [[Cascading Failure]]. Staged rollouts and checks that a change won't strand the network have become standard practice.

## See also
- [[Zero Trust Network]]
- [[Packet Switching]]
