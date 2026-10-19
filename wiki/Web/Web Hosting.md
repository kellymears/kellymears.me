---
aliases:
  - Shared hosting
  - Web host
  - Virtual private server
  - Static hosting
tags:
  - web
summary: Renting space on someone else's servers to put a website online, a business that moved from free personal pages and crowded shared machines to virtual servers, rented cloud infrastructure and services that host static files at the edge of the network.
---
**Web hosting** is the service of keeping a website on servers connected to the internet so anyone can reach it. Few people run their own server at home, since that requires a reliable connection, a fixed address and constant upkeep. Most sites instead rent space from a host, and the kinds of rental have changed with the technology.

In the mid-1990s free hosts gave anyone a personal page in exchange for showing ads; see [[GeoCities]]. Pages lived at long addresses inside the host's own domain, often sorted into themed neighborhoods. Paid **shared hosting** became the standard for small sites. Hundreds of customers share one machine, each with a folder, a database and a control panel, uploading files over [[File Transfer Protocol]]. It's cheap and simple, but every site competes for the same processor and memory, so one busy or compromised neighbor slows or endangers the rest; see [[Multi-Tenancy]]. The machines usually came with a ready-made scripting stack, so a blog engine could be installed with one click; see [[LAMP stack]] and [[WordPress]].

A **virtual private server** gave each customer a slice of a physical machine that behaves like a dedicated computer, with its own operating system and full control, at the cost of maintaining it; see [[Hypervisor]]. Rented cloud infrastructure took that further. Since the mid-2000s, servers can be created and destroyed in minutes and billed by the hour, and platforms that hide the server entirely let developers deploy code by pushing it; see [[Containerization]] and [[Serverless Computing]].

Many sites need no server-side code at all. Pages generated in advance can be served as plain files, and **static hosting** puts those files on a worldwide network of caches, often for free at small scale; see [[Static Site Generation]] and [[Content Delivery Network]]. That arrangement is fast, cheap and hard to break, which is why it suits blogs and documentation.

Hosting is separate from owning a name. Domains are bought from a [[Domain Registrar]] and pointed at whichever host serves the site, so a site can change hosts without changing its address. Keeping the two with separate companies makes it easier to leave a bad host.

Hosts compete on a few measures. Plans have long been priced by storage and data transfer, with charges or throttling when a site exceeds its allowance; see [[Bandwidth]]. Uptime promises spell out how much downtime is acceptable and what the customer gets when it's exceeded; see [[Service level agreement]]. Hosting markets are famous for "unlimited" plans with fine-print limits, and for the pain of migrating when a cheap host is sold or shuts down. Keeping copies off the host matters for the same reason.

## See also
- [[Web Server]]
- [[Dot-com Bubble]]
