---
aliases:
  - Socket
  - Sockets
  - Port number
  - Ephemeral port
  - Berkeley sockets
  - Unix domain socket
tags:
  - networks
summary: The programming interface through which a program talks to the network, identified by an address and a port, and treated by the operating system as one more file descriptor.
---
A **network socket** is one end of a network conversation as a program sees it. The program asks the operating system for a socket, connects it or binds it to an address, and then reads and writes bytes as if it were a file. Everything below that, from retransmission to routing, happens out of sight. The *Berkeley sockets* interface, released with BSD Unix in 1983, defined the calls nearly every language still wraps: `socket`, `bind`, `listen`, `accept`, `connect`, `send`, `recv`, and `close`.

A connection is identified by five values: the protocol, the source address and **port**, and the destination address and port. A [[Port]] is a 16-bit number that lets one machine run many services. Well-known ports below 1024 belong to standard services, such as 443 for HTTPS and 22 for [[Secure Shell]], and binding to them traditionally needs administrator rights. A client's side of a connection gets an *ephemeral port*, picked by the operating system from a high range for the life of the connection.

The two main kinds follow the transports in [[TCP and UDP]]:

- **Stream sockets** use TCP. A server binds to a port, listens, and accepts each incoming connection as a new socket, while the listening one keeps waiting. Data arrives as an ordered byte stream with no message boundaries, so protocols on top must frame their own messages.
- **Datagram sockets** use UDP. Each send is one self-contained packet that may arrive late, twice, or never, and there is no connection to set up.

In Unix, a socket is a [[File Descriptor]], so the same tools that wait on files work for connections. Every send and receive is a [[System Call]]. A server handling thousands of clients can't block on each one in turn, so it asks the operating system which sockets are ready, the job of [[IO Multiplexing]], and an [[Event Loop]] built on top. Opening sockets is costly enough, especially with a TCP and [[Transport Layer Security]] handshake, that applications keep them open and reuse them through a [[Connection Pool]].

Sockets also work without a network. A *Unix domain socket* is addressed by a file path instead of an IP and port, and passes data between processes on one machine through the kernel. Databases and container runtimes often listen on one locally, since it skips the network stack and can be protected with ordinary file permissions.

Ports are finite resources. A busy client making many short-lived connections can run out of ephemeral ports, because closed TCP connections linger for up to a few minutes before their port can be reused. [[Network Address Translation]] rewrites ports too, mapping many private connections onto one public address.

## See also
- [[Port Scanning]]
- [[Multiplexing]]
- [[Inter-Process Communication]]
- [[Typestate]]
- [[Loopback]]
