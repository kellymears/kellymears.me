---
aliases:
  - Idempotent request
  - Idempotency-Key header
tags:
  - data
summary: A unique token a client attaches to a request so the server can recognize a retry and return the original result instead of doing the work twice, the standard defense against double charges and duplicate orders.
---
An **idempotency key** is a unique value that a client attaches to a request so that sending the same request again has no further effect. The server records the key along with the result of the first attempt. If a request with the same key arrives later, the server returns the stored result instead of repeating the work.

The problem it solves is old and unavoidable. A client sends a payment request and the connection drops before the reply arrives. The client can't tell whether the server never received the request, received it and failed, or charged the card and lost the response. No protocol can remove this uncertainty; see [[Timeout]]. Retrying risks a double charge, and not retrying risks a lost order.

HTTP defines some methods, such as PUT and DELETE, as safe to repeat, but POST, the usual way to create something, isn't; see [[Idempotence]]. An idempotency key makes a non-repeatable operation repeatable. Payment companies popularized the pattern, most visibly Stripe, whose API accepts an Idempotency-Key header and keeps keys for at least a day. An IETF working group has drafted a standard version of the header.

A typical implementation:

1. The client generates a random key, usually a UUID, when the user starts an action, not when the request is sent, so every retry carries the same key; see [[Universally Unique Identifier]].
2. The server tries to record the key before doing the work, relying on a unique index so that two concurrent copies can't both proceed; see [[Database Constraint]].
3. If the key is new, the server does the work and stores the response under the key.
4. If the key exists and the work is finished, the server replays the stored response. If it's still in progress, the server tells the client to wait.

The details matter. Recording the key and doing the work should happen in one transaction, or a crash between them leaves the two out of step; see [[ACID]]. A retry that reuses a key with a different request body is a client bug and should be rejected rather than silently answered. Keys need an expiry, or the table grows forever.

The same idea underpins reliable messaging. Message brokers usually promise that a message arrives at least once, which means consumers must cope with duplicates; deduplicating on a message ID gives the effect of exactly-once processing; see [[Message Queue]]. Workflow engines that resume after crashes rely on it for each step. Writes that insert or update by a natural key are idempotent by construction; see [[Upsert]].

Clients still need to retry sensibly, spacing attempts out so a recovering server isn't flooded; see [[Exponential Backoff]].

## See also
- [[Webhook]]
- [[Optimistic UI]]
