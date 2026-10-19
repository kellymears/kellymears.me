---
aliases:
  - TTFB
  - Server-Timing
tags:
  - web
summary: How long a browser waits after asking for a page before the first byte of the response arrives, a measure that bundles connection setup, redirects, and server work, and caps how quickly anything else can happen.
---
**Time to first byte**, or TTFB, measures how long a browser waits between starting a request and receiving the first byte of the response. For a page navigation it's the floor under every other loading metric: nothing can render, and no image or script can be discovered, until the HTML starts to arrive.

The number bundles several stages, and diagnosing a slow one means splitting them apart:

1. **Redirects.** Each redirect adds a full round trip before the real request begins.
2. **Lookup.** The browser resolves the domain name to an address; see [[Domain Name System]].
3. **Connection.** A TCP handshake and a TLS handshake each cost round trips, which newer protocols shorten; see [[TCP and UDP]] and [[Transport Layer Security]].
4. **Server time.** The server receives the request, does its work, and starts sending.

Distance dominates the first three. A visitor on another continent pays a long round trip for each handshake, which is the main argument for serving from points close to users; see [[Content Delivery Network]] and [[Edge Computing]].

Server time is where application choices show up. A page served from cache or built ahead of time can start immediately; see [[HTTP Caching]] and [[Static Site Generation]]. A page rendered per request waits for its database queries and template work, and a slow query or a chain of them adds directly to the wait; see [[Server-Side Rendering]]. On serverless platforms, a request that has to start a fresh instance pays a startup delay as well; see [[Serverless Computing]].

Google's performance guidance suggests aiming for 0.8 seconds or less at the 75th percentile of real visits. TTFB isn't one of the Core Web Vitals, but it feeds into the loading metric, since the largest element can't appear before its HTML; see [[Core Web Vitals]]. Lab measurements from one fast machine often look fine while real users on mobile networks see much worse, and averages hide slow outliers; see [[Synthetic Monitoring]].

A low TTFB isn't the goal in itself. A server can send headers instantly and then stall, which looks good on this metric while helping nobody. What matters is useful bytes early, and two techniques deliver them:

- **Streaming.** The server sends the head of the document, with its stylesheet and script references, before the body is ready, so the browser starts fetching in parallel; see [[Streaming Response]].
- **Early hints.** An informational response sent before the final one lists resources to preload while the server is still working; see [[Preload and Prefetch]].

The Server-Timing response header lets a server report its own breakdown, such as database time and render time, which browser tools then display beside the network timings.

## See also
- [[Performance Budget]]
- [[Response Time Limits]]
