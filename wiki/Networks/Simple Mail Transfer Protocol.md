---
aliases:
  - SMTP
  - Email
  - IMAP
  - MX record
tags:
  - networks
summary: The 1982 protocol that still carries the world's email, passing messages from server to server by store-and-forward, and why its original trust in every sender made spam and spoofing so hard to stop.
---
The **Simple Mail Transfer Protocol** (SMTP) moves email between servers. Defined in 1982, it's one of the oldest internet protocols still in heavy daily use, and nearly every email you send crosses at least one SMTP connection.

Email delivery is store-and-forward, much like the postal system:

1. Your mail app submits the message to your provider's outgoing server, usually after you log in.
2. That server looks up the recipient's domain in the [[Domain Name System]] for an MX (mail exchanger) record, which names the server that accepts mail for that domain.
3. It connects to that server and transfers the message.
4. The recipient's server stores it in a mailbox.
5. The recipient's app retrieves it with a separate protocol, IMAP or the older POP3, or through a web interface.

If the receiving server is unreachable, the sender's server keeps the message in a queue and retries for days before giving up and sending a bounce; see [[Exponential Backoff]]. This tolerance for delay made email work over the unreliable, intermittently connected networks of the 1980s.

The protocol is plain text. A client sends commands such as `HELO`, `MAIL FROM`, `RCPT TO`, and `DATA`, and the server answers with numeric codes, a style [[Hypertext Transfer Protocol]] later echoed. The addresses in `MAIL FROM` and `RCPT TO` form the *envelope*, which routes the message. The `From:` line you see in your mail app is part of the message body and is entirely separate. Attachments and non-English text are encoded inside the body; see [[MIME Type]].

SMTP's original design trusted everyone. Any server could relay mail for anyone and claim any sender address. That openness let spam grow into the majority of all email traffic by the mid-2000s, and made forging a sender trivial, which fuels phishing. The fixes were added on top decades later: checking which servers may send for a domain, cryptographically signing messages, and publishing a policy for failures; see [[Email Authentication]]. Receiving servers also score senders by reputation, which makes it hard for small, independent servers to get their mail delivered.

Encryption was also an afterthought. Servers upgrade a connection to [[Transport Layer Security]] opportunistically if both support it, but an attacker in the middle can strip that offer, so newer standards let domains require it; see [[Man-in-the-Middle Attack]]. Even then, messages are encrypted only between servers, not end to end: every provider along the way can read them.

Email remains the largest example of [[Federation]]: millions of independently run servers, owned by different organizations, exchange messages through one shared protocol, and an address at one provider can write to any other. In practice, a few large providers now handle most personal email, and their filtering decisions effectively set the rules for everyone, an illustration of [[Network Effect]]s concentrating even an open system.

## See also
- [[Postel's Law]]
- [[ARPANET]]
