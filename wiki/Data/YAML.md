---
aliases:
  - YAML Ain't Markup Language
  - Norway problem
  - TOML
  - YAML anchors
tags:
  - data
summary: The indentation-based format that dominates configuration files, readable and comment-friendly but full of implicit typing traps, and the simpler formats people reach for instead.
---
**YAML** is a text format for structured data that uses indentation instead of braces and brackets. First released in 2001, it was designed to be pleasant for people to read and write, and it became the default language of configuration: CI pipelines, container orchestration manifests, [[Infrastructure as Code]] tools, and the [[Frontmatter]] at the top of countless Markdown files, including the notes in this wiki. Since version 1.2, every [[JSON]] document is also valid YAML.

Its readability comes from several features JSON lacks:

- **Comments**, with `#`, so configuration can explain itself.
- **Indentation for nesting**, with dashes for list items and `key: value` for mappings.
- **Optional quotes**, so most strings can be written bare.
- **Multi-line strings**, with `|` to keep line breaks and `>` to fold them.
- **Anchors and aliases**, which let one block be defined once and reused elsewhere.

The same conveniences cause most of its problems. Because quotes are optional, YAML guesses types from how a value looks. In the older 1.1 rules, still used by many parsers, `no`, `off`, and `n` mean false, so a list of country codes turns Norway's `NO` into a boolean, the famous **Norway problem**. Version strings like `3.10` become the number 3.1, a time such as `22:22` was read as a base-60 number, and a stray leading zero can make a number octal. A summary containing an unquoted colon can break parsing entirely. Quoting anything that might be ambiguous is the usual defense, and a [[Code Formatter]] or linter can enforce it.

Indentation is also fragile. One misplaced space can move a key to a different parent without any error, producing a valid but wrong document. That kind of [[Silent Failure]] is worse than a syntax error. Tab characters aren't allowed at all.

The specification is large, with many features most users never meet, and parsers differ in subtle ways. Formats that can construct custom objects add a security problem covered in [[Serialization]]: loading untrusted YAML with an unsafe loader can run code, so libraries now offer safe loaders that build only plain data.

Alternatives keep appearing. **TOML** uses explicit sections and typed values and is common for package metadata. Some teams generate YAML from a real programming language, or use typed configuration languages that check values before deployment, so mistakes surface early instead of in production as [[Configuration Drift]].

Whatever the format, checking configuration against a schema in [[Continuous Integration]] catches most errors, with [[JSON Schema]] working for YAML too, and [[Environment Variable]] values remain the conventional way to vary configuration between deployments, per the [[Twelve-Factor App]].

## See also
- [[XML]]
- [[CSV]]
- [[Postel's Law]]
- [[Markdown]]
