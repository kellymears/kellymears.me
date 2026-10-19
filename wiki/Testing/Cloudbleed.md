---
aliases:
  - Cloudflare parser bug
tags:
  - testing
summary: A 2017 bug in Cloudflare's HTML parser that, for months, occasionally pasted fragments of other customers' private data, including cookies and passwords, into web pages served to strangers, some of which were then cached by search engines.
---
**Cloudbleed** is the nickname for a bug disclosed in February 2017 in Cloudflare, a company whose network sits in front of millions of websites, speeding them up and protecting them from attacks. For several months, Cloudflare's servers occasionally leaked fragments of their own memory into web pages, including private data belonging to other customers' visitors. The name echoes an earlier memory over-read in encryption software; see [[Heartbleed]].

Cloudflare rewrites some pages as they pass through its network, for example to obscure email addresses from spam harvesters or to change links to secure versions. To do this, it parses the HTML; see [[Content Delivery Network]]. One of its parsers was generated automatically from a description of the grammar, a common technique for building fast parsers; see [[Code generation]] and [[Finite State Machine]].

The bug was in how the generated code checked whether it had reached the end of the data. The check tested whether a pointer was exactly equal to the end of the buffer, rather than equal to or past it. On certain malformed pages, such as one ending with an unfinished tag, the pointer could jump past the end without ever landing on it exactly. The parser then kept reading whatever memory came next and copied it into the page; see [[Memory Safety]] and [[Boundary Value Analysis]].

The flaw had existed for years without causing trouble. A newer parser, introduced in late 2016, changed how buffers were handed to the old one, and exposed the latent bug in combination with three rarely used features. At its peak, roughly one request in a few million leaked data.

The leaked memory could contain anything passing through the same server: authentication tokens, cookies, private messages, passwords, and API keys from unrelated sites; see [[HTTP Cookie]]. Worse, search engines had crawled and cached some of the affected pages, so leaked data sat in public caches; see [[HTTP Caching]].

The bug was found by Tavis Ormandy, a researcher on Google's Project Zero security team, who noticed strange data in results while working on a fuzzing project; see [[Fuzzing]]. Cloudflare disabled the responsible features within hours, using global switches it had in place, and worked with search engines to purge cached copies; see [[Feature Flag]] and [[Incident Response]]. The disclosure became contentious over how quickly and completely the company described the impact.

The case is a reminder that safety checks written as exact equality are fragile; checking a range instead is cheap insurance; see [[Defensive Programming]]. It also illustrates how a shared service concentrates risk: a single bug exposed data from sites that had nothing to do with the pages leaking it. Cloudflare suffered an unrelated global outage two years later; see [[Cloudflare Outage of 2019]].

## See also
- [[Sanitizer]]
- [[Debian OpenSSL Bug]]
