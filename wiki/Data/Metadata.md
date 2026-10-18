---
aliases:
  - Dublin Core
  - EXIF
  - Metadata schema
tags:
  - data
summary: Data that describes other data, such as a file's author, date, format, or location, which makes collections findable and manageable and often reveals more than the content itself.
---
**Metadata** is data about data: the facts that describe a resource rather than make it up. A photo's pixels are its content; the camera model, exposure, timestamp, and GPS coordinates stored alongside them are its metadata. The term dates from the 1960s, but the practice is as old as library catalogs, whose cards described books without containing them.

Practitioners usually sort it into three kinds:

- **Descriptive.** What the resource is and what it is about: title, author, subject, keywords. This is what search and browsing run on; see [[Faceted Search]].
- **Structural.** How the parts fit together: the order of pages in a scanned book, the chapters of a video.
- **Administrative.** How to manage it: format, creation date, rights, checksums, and history. Long-term archives depend on this to keep files readable and to prove they haven't changed; see [[Digital Preservation]] and [[Data Lineage]].

Shared **metadata schemas** let collections from different sources be searched together. **Dublin Core**, from a 1995 workshop in Dublin, Ohio, defined fifteen simple elements, such as title, creator, date, and subject, that almost any resource could fill in, and it became a common denominator for libraries, museums, and archives. Web pages carry their own metadata in markup that search engines read; see [[Structured Data]]. Note-taking tools and static sites keep it as a block at the top of each file; see [[Frontmatter]].

Good metadata depends on consistent terms. Free-text tags drift into near-duplicates ("color," "colour," "colours"), which is why catalogers use a [[Controlled vocabulary]] and why user tagging produces a looser folksonomy; see [[Taxonomy]]. Organizing a large collection is mostly a matter of choosing these fields well; see [[Information Architecture]].

Metadata is often more revealing than content. A photo's **EXIF** data can include the exact location where it was taken, and has exposed people's home addresses after they posted pictures online; see [[JPEG]]. Phone records showing who called whom, when, and for how long can reveal relationships, health conditions, and routines without a word of any conversation. A former head of the NSA said in 2014, "We kill people based on metadata." Encryption usually protects the content of a message but not who sent it, to whom, and when; see [[Transport Layer Security]] and [[Personal Data]].

The same quality makes metadata useful to investigators. Document properties have identified the authors of anonymous reports, and inconsistent timestamps have exposed backdated files; see [[Provenance]].

Metadata also decays. Fields go unfilled, formats change, and links in records stop resolving; see [[Link Rot]]. Systems that generate metadata automatically at the moment of creation, rather than asking people to add it later, tend to end up with more of it.

## See also
- [[ISBN]]
- [[Persistent Identifier]]
