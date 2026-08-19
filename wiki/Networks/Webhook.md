---
aliases:
  - Reverse API
tags:
  - networks
summary: A webhook is an HTTP callback a service pushes to you when an event happens, inverting who initiates the request.
---
**A webhook** is a plain HTTP request one service sends to a URL you registered, fired when some event happens on their end — inverting the usual client-pulls-data model into the server pushing to you instead. Where a normal API call means you asking "did anything change yet?" on a timer, a webhook means the other side telling you the moment it did, which is both more timely and dramatically cheaper than polling for most event-driven integrations.

The mechanics are unglamorous: it's a POST request with a JSON body, sent to whatever URL you configured, with no persistent connection and no guarantee of order or even single delivery. That last part is the trap people miss — most webhook senders retry on failure (a timeout, a non-2xx response) without checking whether the first attempt actually succeeded downstream, so a receiver has to be built for duplicate deliveries. This is exactly why [[Idempotence]] matters at the receiving endpoint: processing the same event twice should have the same effect as processing it once, typically by keying off an event ID and short-circuiting anything already handled.

Verifying a webhook actually came from who it claims to be usually means checking a signature the sender computes over the payload with a shared secret ([[Hash Function|HMAC]]), sent in a header — since anyone can guess a webhook URL and POST arbitrary JSON at it, and a receiver that trusts the body blindly is trusting the internet. An [[API Gateway]] sitting in front of the receiving endpoint is a natural place to enforce that check once, rather than in every handler.

Webhooks are also a poor fit for anything that needs a response mid-transaction — they're fire-and-forget by design, which is why bidirectional real-time needs look instead to a persistent [[WebSocket]] (or [[WebRTC]] for peer-to-peer media), not a webhook.

## See also
- [[Idempotence]]
- [[API Gateway]]
- [[Race Condition]]
- [[Streaming Response]]
