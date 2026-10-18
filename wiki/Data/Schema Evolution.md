---
aliases:
  - Schema registry
  - Avro
  - Serialization format
tags:
  - data
summary: Changing the shape of stored or transmitted data without breaking the old readers and writers that still expect the previous shape.
---
**Schema evolution** is the practice of changing a data format, such as adding a field, renaming one, or changing a type, while data written in the old shape still exists and programs built for the old shape are still running. It applies anywhere data outlives the code that wrote it: database rows, files in a [[Data Lake]], messages on a queue, events in an [[Event Sourcing]] log, and requests between services.

The two sides never upgrade at the same instant. During a rolling deploy, old and new versions of a service run side by side. Consumers of a message stream upgrade on their own schedules. Archived files must stay readable. Two directions of compatibility matter:

- **Backward compatible.** New code can read data written by old code. Required whenever old data persists.
- **Forward compatible.** Old code can read data written by new code, typically by ignoring fields it does not recognize. Required whenever writers may upgrade before readers.

Changes that are both are *fully compatible*; see [[Backward Compatibility]].

A few rules keep changes safe:

- **Add, do not change.** New fields must be optional or have defaults, so old data without them still parses.
- **Never reuse identifiers.** A deleted field's name or number must stay retired; reusing it makes old data mean something new.
- **Ignore the unknown.** Readers should skip fields they do not understand rather than reject the whole record, an application of [[Postel's Law]], the *tolerant reader* pattern.
- **Rename in steps.** Add the new field, write both, migrate readers, then stop writing the old one, the expand-and-contract approach also used in [[Database Migration]].

Binary serialization formats build these rules in. Google's Protocol Buffers, open-sourced in 2008, and Facebook's Thrift, from 2007, tag every field with a number, so names can change freely and unknown numbers are skipped. They underpin many forms of [[Remote Procedure Call]]. Apache Avro, from 2009, stores no tags; instead the reader resolves the *writer's schema*, saved with the data, against its own *reader's schema*, matching fields by name and filling defaults.

A **schema registry** stores every version of each message schema and rejects a new version that would break compatibility before any producer can publish it, the same check [[Contract Testing]] performs between services. Text formats can do similar checks with [[JSON Schema]] and [[Schema Validation]].

Event-sourced systems face the hardest version, since events are immutable and must be readable forever. They usually *upcast*: old events are transformed into the current shape as they are read, leaving the stored history untouched.

Schema evolution is the deliberate counterpart to [[Schema Drift]], where the shape of data changes without anyone deciding it should. Format versions follow [[Semantic Versioning]] in spirit: additions are minor, removals are major.

## See also
- [[Serialization]]
- [[Local-First Software]]
- [[Data Contract]]
- [[Postel's Law]]
