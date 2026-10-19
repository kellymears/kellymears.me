---
aliases:
  - Status code
  - HTTP status
  - HTTP redirect
  - "404"
  - Soft 404
  - 418 I'm a teapot
tags:
  - web
summary: The three-digit number at the start of every HTTP response that tells the client, caches, crawlers and monitoring what happened, grouped into five classes by the first digit.
---
An **HTTP status code** is the three-digit number that opens every HTTP response. The body is for people; the status code is for machines. Browsers, caches, search crawlers, retry logic and monitoring all decide what to do from that number alone, so the right one matters even when nobody sees it. The current definitions are in RFC 9110 (2022).

The first digit sets the class:

- **1xx Informational.** The request is still in progress. `103 Early Hints` lets a server suggest resources to [[Preload and Prefetch]] while it builds the real response.
- **2xx Success.** `200 OK`, `201 Created` for a new resource, and `204 No Content` when there is nothing to return.
- **3xx Redirection.** `301` and `308` mean moved permanently, and `302` and `307` mean temporarily. The 307 and 308 codes guarantee the method is kept, while old clients turn a redirected POST into a GET after 301 or 302. `304 Not Modified` answers a conditional request using an [[ETag]] and is central to [[HTTP Caching]].
- **4xx Client error.** The request was wrong and repeating it unchanged will fail again. `400` is malformed, `401` means not authenticated despite its name "Unauthorized", `403` means authenticated but not allowed, `404` is not found, `410` is gone for good, and `429 Too Many Requests` signals [[Rate Limiting]].
- **5xx Server error.** The request may have been fine. `500` is a generic failure, `502` and `504` mean a [[Reverse Proxy]] or gateway got a bad or late answer from upstream, and `503` means temporarily unavailable.

Some codes are jokes that stuck. `418 I'm a teapot` comes from a 1998 April Fools' RFC about controlling coffee pots, and a campaign kept it reserved. `451 Unavailable For Legal Reasons`, added in 2016, is named after *Fahrenheit 451*.

Getting codes right has practical consequences:

- **Retries.** A 5xx or 429 is usually worth retrying with [[Exponential Backoff]], honoring any `Retry-After` header, while a 4xx is not. Retrying is safe only if the operation has [[Idempotence]].
- **Monitoring.** Error rates and a [[Service Level Objective]] are usually computed from 5xx counts. An API that returns `200 OK` with an error message in the body hides every failure from dashboards and alerts, a [[Silent Failure]]. A [[Circuit Breaker]] that trips on 5xx responses has the same blind spot.
- **Search.** A missing page that returns 200 with a "not found" message is a *soft 404*, and crawlers may index it as real content. Permanent moves should use 301 or 308 so [[Search Engine Optimization]] signals follow the new URL.
- **Caching.** Caches and a [[Content Delivery Network]] store some error codes by default, so a brief 404 can be served for hours after it is fixed.

A [[Smoke Test]] after deploy usually starts by checking that key URLs return 200.

## See also
- [[Paywall]]
- [[Hotlinking]]
