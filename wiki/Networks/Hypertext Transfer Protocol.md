---
aliases:
  - HTTP
  - HTTP method
  - HTTP headers
  - Content negotiation
  - REST
tags:
  - networks
summary: The request-response protocol of the web, in which a client sends a method, a target and headers, and a server answers with a status, headers and a body.
---
The **Hypertext Transfer Protocol** (HTTP) is the request-response protocol the web runs on. A client sends a request naming a method, a target and a set of headers, sometimes with a body. The server replies with an [[HTTP Status Code]], its own headers and usually a body. Tim Berners-Lee designed it at CERN between 1989 and 1991, alongside HTML and the URL, so that documents could link to and fetch one another.

The protocol grew in versions:

- **HTTP/0.9 (1991)** had one command, `GET`, and returned raw HTML with no headers or status.
- **HTTP/1.0 (1996)** added headers, status codes and content types, so the same protocol could carry images and other media.
- **HTTP/1.1 (1997)** added persistent connections, chunked transfer, and the `Host` header, which let many websites share one IP address. It remained the main version for nearly twenty years.
- **[[HTTP2 and HTTP3|HTTP/2 and HTTP/3]]** (2015 and 2022) kept the same meaning but changed the wire format: binary framing and many requests multiplexed on one connection, and then a move from [[TCP and UDP|TCP]] to [[QUIC]] to escape [[Head-of-Line Blocking]].

Since 2022 the semantics have been specified separately from any version, so a request means the same thing however it is carried.

**Methods** state intent. `GET` and `HEAD` are *safe*: they must not change anything, so crawlers, prefetchers and caches can issue them freely. `PUT` and `DELETE` are *idempotent*: repeating them has the same effect as sending them once, which makes retries safe, as covered in [[Idempotence]]. `POST` is neither, which is why browsers warn before resubmitting a form.

**Headers** carry everything else:

- **Content negotiation.** `Accept`, `Accept-Language` and `Accept-Encoding` let a client say which formats, languages and compression it can take, and the server picks one.
- **Caching.** `Cache-Control`, `Expires` and [[ETag]] validators drive [[HTTP Caching]] in browsers and shared caches.
- **State.** HTTP itself is stateless, as each request stands alone. An [[HTTP Cookie]] adds state by having the client send a token back with every request.
- **Authentication.** `Authorization` carries credentials or a bearer token.

Roy Fielding, one of the HTTP/1.1 authors, described the web's architecture in his 2000 dissertation as **REST**: resources named by URLs, manipulated through a small, uniform set of methods, with caching built in. "REST API" now often means any JSON-over-HTTP interface, but the original idea was that the uniform interface lets intermediaries such as a [[Reverse Proxy]] or cache work without knowing the application.

Plain HTTP sends everything in readable text. HTTPS is HTTP over [[Transport Layer Security]], and browsers now treat unencrypted pages as insecure. HTTP has also become a general-purpose transport: [[Remote Procedure Call]] frameworks, a webhook and a [[Streaming Response]] all ride on it, and [[WebSocket]] begins as an HTTP request before upgrading to its own protocol.

## See also
- [[Request for Comments]]
