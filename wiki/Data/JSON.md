---
aliases:
  - JavaScript Object Notation
  - JSON Lines
  - NDJSON
tags:
  - data
summary: The small text format of objects, arrays, strings, numbers, booleans, and null that became the default way programs exchange data, and the gaps its simplicity leaves.
---
**JSON**, JavaScript Object Notation, is a text format for structured data built from six kinds of value: objects of key-value pairs in braces, arrays in brackets, strings, numbers, `true` and `false`, and `null`. Douglas Crockford specified it in the early 2000s, describing it as something he discovered rather than invented, since it was already a subset of JavaScript's own syntax. It replaced XML as the default format for web APIs within a decade, and today it's the common language of HTTP services, configuration files, logs, and document stores.

Its success comes from what it leaves out. The whole grammar fits on a business card, a [[Parser]] for it is a short recursive-descent program, and every mainstream language has one built in. JSON maps directly onto the data structures programmers already use: dictionaries, lists, and primitives. It's readable enough to debug by eye and strict enough to parse unambiguously.

The gaps are just as well known:

- **No dates.** Timestamps travel as strings, usually ISO 8601, and every program must agree on the format and [[Time Zone]].
- **Numbers are vague.** The spec doesn't limit precision, but JavaScript reads every number as a 64-bit float, so integers above 2⁵³ silently lose digits. This is why APIs send large IDs, such as a [[Universally Unique Identifier]], as strings; see [[Floating-Point Arithmetic]].
- **No comments.** Crockford removed them deliberately, so people wouldn't use comments to carry parser directives. Configuration files often switch to [[YAML]], TOML, or JSON variants that allow them.
- **No schema.** Nothing in a JSON document says what shape it should have. [[JSON Schema]] adds that as a separate document, and [[Schema Validation]] checks data against it at the boundary.
- **No binary data.** Bytes must be encoded, usually as base64, at a cost of about a third more space.
- **Strict syntax.** Trailing commas and single quotes are errors, a frequent annoyance for hand-edited files.

A variant called **JSON Lines** or NDJSON puts one JSON value per line, which makes large datasets streamable and appendable. Each line can be parsed on its own, so logs, exports, and the output of a streaming response often use it. Unlike a [[CSV]] file, each record carries its own field names and can nest.

JSON is also the [[Structured Output]] format language models are most often asked to produce, and models use it to call tools. Its relational cousin is the JSON column, which most databases now support, and the [[Document Database]] is built around JSON-like records entirely.

As a [[Serialization]] format, JSON trades size and speed for readability. Binary formats such as Protocol Buffers or MessagePack are smaller and faster but need tools to inspect. For most public APIs, being readable has won.

## See also
- [[Base64]]
- [[Entity-Attribute-Value]]
- [[Decimal Arithmetic]]
- [[Linked Data]]
