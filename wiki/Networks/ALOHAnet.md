---
aliases:
  - ALOHA protocol
  - Slotted ALOHA
  - Random access
tags:
  - networks
summary: The 1971 University of Hawaii radio network that let terminals on different islands share one channel by transmitting whenever they liked and retrying after random delays, the idea that led directly to Ethernet and still underlies wireless random access.
---
**ALOHAnet** was a radio packet network built at the University of Hawaii, first operational in 1971, that let computer terminals across the Hawaiian islands reach a central computer in Honolulu. Its design for sharing one radio channel among many senders without any coordination, called the **ALOHA protocol**, became one of the founding ideas of local and wireless networking; see [[Packet Switching]].

The project, led by Norman Abramson, faced a practical problem. Telephone lines between the islands were expensive and unreliable, and terminals sent data in short, irregular bursts, so giving each one a dedicated line or a fixed time slot would waste most of the capacity. Radio was cheaper, but every terminal would be transmitting on the same frequency; see [[Radio Spectrum]].

The solution was strikingly simple. The network used two channels: one from the central hub out to all terminals, and one shared channel inward. Any terminal with a packet to send simply sent it. If two transmissions overlapped, both were garbled, a **collision**. The hub acknowledged each packet it received intact; a terminal that heard no acknowledgment waited a random time and sent again. Because each waited a different random interval, colliding senders usually didn't collide again; see [[Exponential Backoff]].

Abramson's analysis showed the cost of that simplicity. As traffic grows, collisions multiply, and the useful throughput of pure ALOHA peaks at about 18 percent of the channel's capacity; beyond that, retries create more collisions and throughput falls. Lawrence Roberts proposed **slotted ALOHA** in 1972: divide time into slots and allow transmissions only at slot boundaries, so packets either overlap completely or not at all. That doubled the peak to about 37 percent; see [[Queueing Theory]] and [[Congestion Control]].

ALOHAnet connected to the ARPANET in 1972 by satellite link, one of the first ties between a radio network and the larger research network; see [[ARPANET]] and [[Satellite Internet]].

Its greatest influence came through a reader. Robert Metcalfe studied Abramson's work and, at Xerox PARC in 1973, adapted it to a shared cable rather than the air. On a cable, stations could listen before sending and detect collisions while transmitting, wasting much less capacity, and the result was Ethernet; see [[Ethernet]] and [[Carrier-Sense Multiple Access]].

Random access in the ALOHA style is still widely used where senders are many, transmissions rare, and coordination costly. Phones use a slotted ALOHA-like step to request a connection when first contacting a cell tower, and satellite terminals, RFID tags, and low-power sensor networks use variations; see [[Cellular Network]] and [[Internet of Things]]. Wi-Fi's contention rules descend from the same idea; see [[Wi-Fi]].

The broader lesson, that uncoordinated access with random retries works well at light load and collapses under heavy load, recurs throughout distributed systems; see [[Thundering Herd]].

## See also
- [[Two-Way Radio]]
- [[Token Ring]]
