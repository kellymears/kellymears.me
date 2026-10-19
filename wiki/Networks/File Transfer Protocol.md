---
aliases:
  - Anonymous FTP
  - SFTP
tags:
  - networks
summary: One of the oldest internet protocols, for moving files between machines over separate control and data connections, a design that predates firewalls and address translation and fought both for decades.
---
The **File Transfer Protocol**, or FTP, moves files between a client and a server. It is among the oldest application protocols on the internet. The first specification appeared as a Request for Comments in 1971, on the ARPANET, and the version still in use was published in 1985; see [[Request for Comments]] and [[ARPANET]].

Its defining quirk is that it uses two connections. A **control connection**, usually to port 21, carries text commands such as listing a directory or requesting a file. Each transfer then opens a separate **data connection**. In the original active mode, the server connected back to a port the client named; see [[TCP and UDP]] and [[Network Socket]].

That made sense on a small network of trusted research machines and became a liability later:

- **Firewalls** blocked the server's incoming connection to the client. A passive mode, in which the client opens both connections, became the norm; see [[Firewall]].
- **Address translation** broke the protocol further, because the client's private address appeared inside the commands themselves. Routers had to inspect and rewrite FTP traffic on the fly; see [[Network Address Translation]].
- **Passwords** traveled in plain text, as with remote login protocols of the same era; see [[Telnet]].

FTP also distinguished ASCII mode from binary mode. In ASCII mode, servers converted line endings between operating systems, which helped text files and silently corrupted any program or image sent by mistake; see [[Line Ending]].

**Anonymous FTP**, where anyone could log in with the user name anonymous and an email address as a courtesy password, made FTP servers the internet's first public software libraries. Universities and projects ran archives and mirrors of each other's collections. In 1990, a search engine called Archie indexed the file names on anonymous FTP servers, an early form of web search before there was a web; see [[Gopher]] and [[World Wide Web]].

Two secure successors share the name confusingly. **FTPS** wraps FTP in TLS and keeps its two-connection design; see [[Transport Layer Security]]. **SFTP** is a different protocol entirely, a file transfer subsystem of SSH that runs over a single encrypted connection, and is what most administrators mean today; see [[Secure Shell]].

The web gradually absorbed FTP's public role, since HTTP downloads pass through firewalls and caches easily. Major browsers removed FTP support around 2021, citing low use and the security cost of maintaining an unencrypted protocol.

FTP persists in older industrial systems, hosting providers, and data exchange between organizations, where scripts written decades ago still upload nightly files. It is a reminder of how long protocols outlive the assumptions they were built on; see [[Path Dependence]].

## See also
- [[Web Hosting]]
- [[Hourglass Model]]
