---
aliases:
  - Extensible Markup Language
  - XPath
  - XXE
tags:
  - data
summary: The 1998 tag-based format for structured documents and data that once carried almost everything on the web and still underlies office files, feeds, and SVG, along with a set of well-known parser attacks.
---
**XML**, the Extensible Markup Language, is a text format for structured documents and data, published by the W3C in 1998. It descends from SGML, the 1980s publishing standard that also gave rise to HTML, and keeps the familiar shape of nested, angle-bracketed tags. Unlike HTML, its tags aren't fixed: any application can define its own vocabulary.

An XML document is a single tree of **elements**, each with a name, optional **attributes**, and content that may be text or further elements. The rules are deliberately strict. Every opening tag needs a closing tag, elements must nest properly, and attribute values must be quoted. A document that breaks these rules isn't "well-formed," and a conforming parser must stop with an error rather than guess. This was a direct reaction to HTML parsers that silently repaired broken markup; see [[Postel's Law]].

A whole family of standards grew around it:

- **Schemas.** DTDs and later XML Schema describe which elements may appear where, and let parsers validate documents; see [[JSON Schema]] for the later equivalent.
- **Namespaces.** Prefixes that let vocabularies from different sources mix in one document without name clashes.
- **XPath.** A query language for selecting nodes in the tree, such as "every price inside a book with this author."
- **XSLT.** A language for transforming one XML tree into another document, often HTML.

For roughly a decade XML was the default way to move data between systems. Web services exchanged SOAP envelopes, configuration lived in XML files, and the "X" in AJAX stood for it. It remains underneath many formats people use daily without seeing it: Word and Excel files are zipped folders of XML, and so are EPUB books. Feeds use it; see [[RSS]]. So do vector images, as [[SVG]], and much of the Semantic Web.

From the late 2000s, JSON displaced it for most data exchange. JSON maps directly onto the objects and arrays of programming languages, while XML's split between attributes and child elements has no natural equivalent, and its verbosity and namespace handling made simple tasks laborious. XML remains stronger for **documents**, where text with markup interleaved, called mixed content, is the point.

XML parsers are also a classic security risk, because DTDs allow **entities**, named substitutions defined in the document itself:

- **External entities (XXE).** An entity can point to a file path or URL, so a parser that resolves them will read local files or make network requests on an attacker's behalf; see [[Server-Side Request Forgery]].
- **Billion laughs.** Entities defined in terms of other entities expand exponentially, so a few hundred bytes become gigabytes in memory.

Many modern parsers disable both by default, but not all do, and older libraries and configurations still expose them.

## See also
- [[Semantic HTML]]
- [[Single Sign-On]]
