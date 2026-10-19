---
aliases:
  - Data mule
  - Station wagon bandwidth
  - Physical data transfer
tags:
  - networks
summary: Moving data by physically carrying storage from place to place, a joke name for a serious technique that still beats networks on bandwidth for huge datasets and reaches places networks cannot.
---
**Sneakernet** is the moving of data by carrying physical storage from one place to another, on foot, by car, by mail, or by airplane. The name mocks the idea as a network made of sneakers, but it remains the fastest way to move very large amounts of data, and sometimes the only way.

Its logic is captured in a line usually credited to the computer scientist Andrew Tanenbaum: "Never underestimate the bandwidth of a station wagon full of tapes hurtling down the highway." Physical transport has enormous bandwidth and terrible latency; see [[Bandwidth]] and [[Latency and Jitter]]. A single 20-terabyte hard drive shipped overnight delivers the equivalent of almost two gigabits per second sustained for a full day, more than most office connections, and a box of drives multiplies that.

Uses at scale:

- **Cloud migration.** Moving petabytes over the internet can take months, so cloud providers ship rugged storage appliances to customers to fill and send back. Amazon went further in 2016 with Snowmobile, a shipping container on a truck holding 100 petabytes, retired in 2024.
- **Science.** The Event Horizon Telescope's 2019 image of a black hole combined several petabytes recorded at radio observatories around the world, far too much for their connections. Hard drives were flown to central processing sites, and drives from the South Pole had to wait months for the end of the Antarctic winter before a plane could collect them.
- **Media.** Film studios long shipped drives of footage between editing houses, and before digital distribution, cinemas received film reels.

It also reaches where networks are absent, slow, or watched. In Cuba, where home internet was long scarce, *El Paquete Semanal* ("the weekly package") circulated about a terabyte of films, shows, and apps every week on hard drives copied from hand to hand. Activists have smuggled USB drives of outside news and media into North Korea; see [[Internet Censorship]]. Bulletin board users and software collectors traded floppy disks by mail; see [[Bulletin Board System]].

The approach is formalized in networks built around intermittent links, which store data and pass it on whenever a carrier comes by; see [[Delay-Tolerant Networking]].

The same property cuts both ways for security. Organizations isolate sensitive systems from all networks, an "air gap," and then must move updates and data across by removable media, which carries risks in. The Stuxnet worm, discovered in 2010, reached isolated industrial controllers in Iran this way, spreading on USB drives.

Physical transfer needs its own care: data must be verified on arrival, since drives fail and files can be corrupted in transit; see [[Checksum]]. Large file collections can then be seeded to a network for wider distribution; see [[BitTorrent]] and [[Content Delivery Network]].

## See also
- [[Modem]]
- [[Submarine Cable]]
- [[Universal Serial Bus]]
- [[Pigeon Post]]
- [[Internet Shutdown]]
- [[Pneumatic Tube]]
- [[Air Gap]]
