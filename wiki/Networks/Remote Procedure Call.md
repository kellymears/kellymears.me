---
aliases:
  - RPC
  - gRPC
  - JSON-RPC
  - Protocol Buffers
  - Interface definition language
tags:
  - networks
summary: Calling a function that runs on another machine as if it were local, the idea behind gRPC and JSON-RPC, and the danger of forgetting that the network is in between.
---
A **remote procedure call (RPC)** lets a program call a function that runs on another machine using the same syntax as a local call. The caller writes something like `getUser(42)`. Behind the scenes, generated code called a *stub* packs the arguments into a message, sends it over the network, waits for the reply, unpacks the result, and returns it, so the network is mostly hidden from the programmer.

Andrew Birrell and Bruce Nelson described a practical implementation at Xerox PARC in their 1984 paper "Implementing Remote Procedure Calls." The idea spread through Sun RPC, which underpinned the NFS network file system, then through CORBA, Java RMI, and XML-based SOAP web services in the 1990s and 2000s.

Modern RPC systems usually start from an *interface definition language*: a file listing the service's methods and message types, from which client and server code is generated in many languages.

- **gRPC**, released by Google in 2015 and based on its internal system, uses Protocol Buffers, a compact binary format, over HTTP/2 (see [[HTTP2 and HTTP3]]). It supports streaming in both directions and is widely used between internal services.
- **Apache Thrift**, from Facebook, takes a similar approach.
- **JSON-RPC** is a minimal, text-based protocol in which each call is a JSON object with a method name, parameters, and an ID. The [[Model Context Protocol]], which connects language models to external tools through [[Tool Use]], is built on JSON-RPC 2.0.

RPC is often contrasted with REST, in which an API is modeled as resources acted on with a small set of standard HTTP verbs. RPC exposes actions directly, which maps neatly onto code but leans less on HTTP's built-in conventions such as [[HTTP Caching]].

The central criticism is that hiding the network is dangerous. A 1994 paper by Jim Waldo and colleagues, "A Note on Distributed Computing," argued that remote calls differ fundamentally from local ones in latency, in memory access, and above all in *partial failure*: a call can time out with no way to know whether the server acted. Treating remote calls as local ones means believing the [[Fallacies of Distributed Computing]]. Robust RPC code sets deadlines, retries with [[Exponential Backoff]] only when calls are safe to repeat, which takes [[Idempotence]], and wraps unreliable dependencies in a [[Circuit Breaker]].

Typed interfaces also help teams evolve services safely. Generated stubs catch mismatches at compile time, and [[Contract Testing]] checks that a server still honors what its clients expect, a job [[JSON Schema]] does for JSON-based APIs. Messages that need no reply, or that must survive the receiver being down, usually go through a [[Message Queue]] instead, and the [[Actor Model]] offers an alternative built on asynchronous messages rather than calls.

## See also
- [[Schema Evolution]]
- [[Contract Testing]]
- [[API Gateway]]
