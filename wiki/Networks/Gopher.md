---
aliases:
  - Gopher protocol
  - Gopherspace
  - Gemini protocol
tags:
  - networks
summary: The menu-driven document protocol from the University of Minnesota that briefly rivaled the World Wide Web in the early 1990s, lost ground after licensing fees spooked its users, and lives on among enthusiasts and in the minimalist Gemini protocol.
---
**Gopher** is an internet protocol for finding and retrieving documents through nested menus. Released in 1991 by a team at the University of Minnesota led by Mark McCahill, and named after the university's mascot, it was for a short period in the early 1990s more popular than the World Wide Web, which appeared at nearly the same time; see [[World Wide Web]].

A Gopher server presents a hierarchy of menus, like folders in a file system. Each menu line is either another menu, a document, a search, or a link to another server. The protocol is extremely simple: a client connects to port 70, sends one line naming the item it wants, and the server sends back either the document or a menu, one item per line, with a type character, a display name, and where to find it; see [[TCP and UDP]]. Clients ran on modest terminals over text connections, which suited the hardware of the time; see [[Telnet]].

Campuses adopted it quickly for directories, course listings, and library catalogs, and servers multiplied into what users called **Gopherspace**, thousands of linked servers by the mid-1990s. Searching it was handled by Veronica, an index of menu titles across servers, an early example of a search engine built by crawling; see [[Web Crawler]].

The web won for several reasons. Its pages mixed text, links, and images in one document, while Gopher kept menus and content separate, so linking from inside a document wasn't possible; see [[Hypermedia]]. Graphical browsers made the web attractive to people who had never used a terminal. And in 1993, the University of Minnesota announced it would charge licensing fees for some uses of its Gopher server software. Shortly afterward CERN released the web's core software into the public domain, and many developers and institutions, uncertain about Gopher's future terms, chose the web instead; see [[Public Domain]] and [[Network Effect]].

Gopher traffic declined steeply through the mid-1990s, and most servers shut down. The protocol was never deleted, though, and a community of enthusiasts still runs servers, valuing it for qualities the modern web lost: no scripts, no tracking, no styling, and pages that load instantly on any device; see [[IndieWeb]].

That appeal produced a successor. The **Gemini** protocol, started in 2019, sits deliberately between Gopher and the web: like Gopher, it fetches a whole document with a single request and has no scripts or cookies, but it requires encryption and uses a minimal text format, with each link on its own line, designed so it can't be extended into a second web; see [[Transport Layer Security]].

Gopher's history is often cited as an example of how licensing decisions and openness can decide a standards contest more than technical merit does; see [[Path Dependence]] and [[Request for Comments]].

## See also
- [[Bulletin Board System]]
- [[File Transfer Protocol]]
- [[Mosaic]]
- [[Minitel]]
