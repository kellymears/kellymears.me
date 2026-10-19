---
aliases:
  - Middleware pipeline
tags:
  - web
summary: Functions that sit between an incoming web request and the code that answers it, each able to inspect, change, or end the request, chained in an order that quietly determines how the whole application behaves.
---
In web frameworks, **middleware** is code that runs between the arrival of a request and the handler that produces the response. Each piece receives the request, can examine or modify it, and then either passes control to the next piece or ends the exchange itself. Chained together, middleware forms a pipeline that every request travels through.

The pattern handles concerns that apply across many routes and don't belong in any one of them:

- **Logging** and request timing; see [[Logging]].
- **Sessions** and authentication, loading the current user from a cookie or token; see [[Session Management]].
- **Security headers**, cross-origin rules, and CSRF tokens; see [[Cross-Origin Resource Sharing]] and [[Cross-Site Request Forgery]].
- **Rate limiting**, rejecting clients that send too much; see [[Rate Limiting]].
- **Compression** of the response body.

Python's WSGI specification of 2003 described middleware as a component that looks like a server to the application and like an application to the server. Ruby's Rack, from 2007, popularized the idea of stacking such components, and Node's Connect and Express, from around 2010, made a three-argument function the familiar shape: the request, the response, and a function called next that hands off to the following step. Later frameworks such as Koa used async functions so each middleware wraps everything after it, running code both before and after the inner layers like the layers of an onion.

The design is function composition. Each middleware wraps a handler and returns a new handler, so the stack is built from higher-order functions; see [[Higher-Order Function]]. It closely resembles the chain of responsibility design pattern, in which a request passes along a series of objects until one handles it.

**Order is behavior.** Authentication placed after the route handler protects nothing. Compression applied before a component that rewrites the body corrupts it. Error-handling middleware must sit where it can catch failures from everything inside it. Since the order lives in configuration rather than in the code of each route, bugs of this kind are easy to introduce and hard to spot.

Middleware also moves logic out of view. A handler that assumes a user is present depends on something configured elsewhere. In 2025 a vulnerability in the Next.js framework let attackers skip its middleware entirely by sending a header the framework used internally, bypassing any authorization checks implemented there. Defense in depth means checking permissions near the data, not only at the edge of the pipeline.

The same idea appears outside application code. Proxies and gateways apply middleware-like steps before requests reach any server, and platforms now run middleware at the network edge; see [[Reverse Proxy]] and [[API Gateway]].
