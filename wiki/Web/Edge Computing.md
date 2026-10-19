---
aliases:
  - Edge runtime
  - Edge rendering
  - Edge network
tags:
  - web
summary: Running application code in data centers spread close to users rather than in one central region, which cuts network latency but only pays off when the data the code needs is close too.
---
**Edge computing** runs code physically close to the people using it. Instead of sending every request to one data center, an application runs on hundreds of small sites spread around the world, usually the same points of presence a [[Content Delivery Network]] uses to cache files. A request from Tokyo is handled in Tokyo, one from Lisbon in Lisbon. [[Anycast]] routing sends each user to the nearest site automatically.

The motivation is the speed of light. Light in optical fiber covers about 200 kilometers per millisecond, so a round trip between Sydney and a server in Virginia takes over 150 milliseconds before any work happens. A secure connection needs several round trips to set up; see [[Transport Layer Security]]. No optimization of the server's code can recover time lost to distance. Moving the code is the only fix.

Edge platforms usually run a restricted runtime. Rather than a full operating system per customer, many run JavaScript or [[WebAssembly]] in lightweight isolates inside one shared engine process. An isolate starts in about a millisecond, avoiding the cold starts that trouble regional [[Serverless Computing]]. The price is a narrower environment: no arbitrary native libraries, limited memory and CPU time, often no direct filesystem, and an API built on web standards such as the [[Fetch API]].

Good fits:

- **Request middleware.** Redirects, header rewrites, authentication checks, bot filtering, and geography-based routing, all decided before a request reaches the origin.
- **Personalizing cached pages.** Serving a cached page but swapping in a currency, a language, or a signed-in name.
- **Experiments.** Assigning users to test variants without a flash of the wrong content; see [[AB Testing]].
- **Rendering.** Running [[Server-Side Rendering]] near the user, which helps only under the next condition.

The catch is data. Code at the edge is close to the user but usually far from the database, which still lives in one region. A page that makes five sequential queries from Sydney to Virginia is far slower than the same page rendered next to the database. Edge rendering wins when its data is also at the edge: cached, replicated, or stored in a globally distributed [[Key-Value Store]]. Replicated data brings its own tradeoff, since copies in many places take time to agree; see [[Eventual Consistency]] and [[CAP Theorem]]. Many frameworks therefore let each route choose between edge and regional execution.

Outside the web, "edge computing" also means processing data on or near the devices that produce it, such as factory sensors, cameras, and vehicles, to save bandwidth and keep working when the network drops. The shared idea is the same: move computation to where the data or the user already is, because moving bytes across distance costs time; see [[Tail Latency]].

## See also
- [[Wake Word]]
- [[Time to First Byte]]
- [[PHP]]
