---
aliases:
  - Serialize
  - Deserialization
  - Marshalling
  - Wire format
  - Insecure deserialization
  - MessagePack
tags:
  - data
summary: Turning in-memory data into bytes that can be stored or sent and back again, the choice between text and binary formats, and the security hole in deserializing untrusted input.
---
**Serialization** is converting data from its in-memory form, objects with pointers between them, into a flat sequence of bytes that can be written to disk or sent over a network. **Deserialization** reverses it. Every API call, cache entry, saved file, and message on a queue goes through this step, and the chosen *wire format* shapes how fast, compact, and compatible the system is.

Formats fall into two broad families:

- **Text formats** such as [[JSON]], [[YAML]], XML, and [[CSV]] are readable by people, easy to debug, and supported everywhere. They are larger and slower to parse, and numbers and binary data need conversion.
- **Binary formats** such as Protocol Buffers, MessagePack, Avro, and CBOR are compact and fast, but need tools to inspect. Many of them are *schema-driven*: both sides compile the same schema, and fields are identified by number instead of name, saving space.

The deeper design choice is how a format handles change. Data outlives the code that wrote it, so a reader must cope with fields it doesn't know and writers that omit fields it expects. Protocol Buffers' rule of never reusing a field number, and ignoring unknown fields, exists for this reason. The broader practice is covered in [[Schema Evolution]] and [[Backward Compatibility]], and a schema registry often enforces it for messages on a queue.

Some details always need deciding:

- **Graphs and cycles.** Objects that refer to each other, or to themselves, can't be written naively as nested data. Formats either forbid cycles or write identifiers and references.
- **Types.** Dates, large integers, and decimals have no native representation in many formats, so each system invents a convention; see [[Floating-Point Arithmetic]].
- **Byte order and encoding.** Binary formats must specify endianness, and text formats must specify [[Character Encoding]], almost always UTF-8 now.

**Insecure deserialization** is a classic vulnerability. Formats that can describe arbitrary objects, such as Python's pickle, Java's built-in serialization, or YAML with custom tags, will construct whatever classes the data names, and some constructors run code. Feeding untrusted bytes to such a deserializer can hand an attacker remote code execution. The fix is to accept only plain data formats from outside, and to check the result with [[Schema Validation]] before trusting it, the same boundary discipline that prevents [[SQL Injection]].

Serialization cost adds up. In busy services, encoding and decoding can dominate CPU time, and a [[Remote Procedure Call]] framework's choice of format matters for tail latency. Choosing formats that copy less, or that can be read without decoding at all, is a common optimization found with [[Profiling]].

## See also
- [[Prototype Pollution]]
- [[iCalendar]]
- [[Resumability]]
- [[Log4Shell]]
