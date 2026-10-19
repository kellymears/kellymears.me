---
aliases:
  - OpenAPI Specification
  - Swagger
tags:
  - web
summary: A standard, machine-readable format for describing HTTP APIs, listing every endpoint, parameter, and response shape, from which tools generate documentation, client libraries, mock servers, and tests.
---
**OpenAPI** is a standard format for describing an HTTP API in a file that both people and programs can read. The file, written in YAML or JSON, lists every endpoint, the operations each supports, the parameters they take, the shapes of requests and responses, the possible errors, and how clients authenticate.

The format began as **Swagger**, created around 2010 by Tony Tam at Wordnik, an online dictionary company, to document its own API. Swagger UI, which rendered a description as interactive documentation where developers could try calls in the browser, made it popular. The software company SmartBear acquired Swagger in 2015 and donated the specification to a new industry group under the Linux Foundation, the OpenAPI Initiative; the specification was renamed in 2016. The Swagger name lives on in tools. Version 3.0 appeared in 2017, and version 3.1, in 2021, aligned its data descriptions with the general-purpose schema language; see [[JSON Schema]].

A machine-readable description enables tooling. Documentation sites are generated from it, so they stay in sync with the API if the description does. Generators produce client libraries in many languages and server stubs to fill in. A [[Mock server]] answers requests with example responses before the real service exists, letting front-end and back-end work proceed in parallel. Validators check that requests and responses match the description, and [[Contract Testing|contract tests]] check that a provider still honors it. An [[API Gateway]] can import a description to configure routing and validation.

Teams use it in two ways. In **design-first** work, the description is written and reviewed before code, acting as a contract between teams. In **code-first** work, the description is generated from annotations in the server code, which keeps it accurate but makes it an afterthought. Either way, a single description can act as the authority from which documentation, clients, and tests derive.

OpenAPI fits resource-oriented HTTP APIs most naturally. Other styles have their own description formats: query-based APIs publish a schema of types and fields, and binary remote-call systems define services in an interface language from which code is generated. Describing an API precisely also makes changes visible, so tools can compare two versions and flag breaking ones.

Language-model agents have given the format a new audience. A description listing endpoints, parameters, and their meanings is close to what an agent needs to call an API as a tool, and some early plugin systems for chat assistants used OpenAPI files directly; see [[Tool Use]]. The weak point is the same for people and models: descriptions are often incomplete, and clients come to rely on undocumented behavior anyway; see [[Hyrum's Law]].

## See also
- [[Backward Compatibility]]
- [[Developer Experience]]
