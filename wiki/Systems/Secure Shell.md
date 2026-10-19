---
aliases:
  - SSH
  - OpenSSH
  - SSH key
  - SSH agent
  - Port forwarding
  - SSH tunnel
tags:
  - systems
summary: The encrypted protocol for logging into and running commands on remote machines, authenticated by key pairs, that also tunnels other traffic and underpins Git.
---
**Secure Shell (SSH)** is a protocol for logging into and running commands on a remote computer over an encrypted connection. It replaced Telnet and rsh, which sent everything, passwords included, as plain text. Tatu Ylönen wrote the first version in 1995 after a password-sniffing attack at Helsinki University of Technology. OpenSSH, released in 1999, became the standard implementation and ships with nearly every Unix-like system.

When a client connects, the two sides first negotiate an encrypted channel, much like [[Transport Layer Security]]. The server proves its identity with its *host key*. On the first connection, the client shows the key's fingerprint and asks whether to trust it, then remembers it in a `known_hosts` file. If the key changes, the client warns loudly, since someone may be intercepting the connection. This *trust on first use* model avoids needing a [[Certificate Authority]], at the cost of the first connection being unverified.

Users usually authenticate with a **key pair** rather than a password, using [[Public-Key Cryptography]]:

- **The private key** stays on the user's machine, ideally protected by a passphrase. SSH refuses to use it if its [[File Permissions]] let other users read it.
- **The public key** goes into `~/.ssh/authorized_keys` on each server the user may log into.
- **Login** works by the server sending a challenge that only the private key can sign, so no secret crosses the network.

An **SSH agent** holds decrypted keys in memory so the passphrase is typed once per session, and keys can live on hardware security keys. Large organizations often use SSH certificates, so servers trust any key an internal authority has signed. Handling keys carefully is part of [[Secret Management]].

SSH does much more than remote shells:

- **File transfer.** `scp`, `sftp`, and `rsync` copy files over SSH connections.
- **Git.** Pushing to and pulling from hosted repositories commonly uses SSH keys for authentication, and Git can also sign commits with them, a lightweight form of [[Code Signing]].
- **Port forwarding.** SSH can carry other traffic through its encrypted connection. Local forwarding makes a remote service, such as a database bound to a private [[Port]], appear on the local machine; remote forwarding does the reverse. This makes SSH a simple [[Virtual Private Network]].
- **Jump hosts.** Connections can hop through a *bastion* server into a private network.

Because SSH is powerful, its servers are constant targets. Internet-facing servers see password-guessing bots within minutes. Common hardening disables password login and direct root login, limits which users may connect, and puts SSH behind a [[Firewall]] or a mesh network, moving toward a [[Zero Trust Network]] model where access depends on identity rather than network location. A 2024 backdoor planted in the xz compression library, aimed at OpenSSH, was caught shortly before wide release.

## See also
- [[Terminal Multiplexer]]
- [[Job Control]]
- [[Wake-on-LAN]]
- [[Configuration Management]]
- [[Telnet]]
