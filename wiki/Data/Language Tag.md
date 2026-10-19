---
aliases:
  - BCP 47
  - IETF language tag
tags:
  - data
summary: The standard codes, such as en-US, pt-BR, and zh-Hant, that identify a human language along with its script and region, used by web pages, browsers, and software to choose translations, fonts, pronunciation, and formatting.
---
A **language tag** is a short code that identifies a human language, such as en for English, fr-CA for Canadian French, or zh-Hant for Chinese written in traditional characters. The format is defined by BCP 47, an internet standard maintained by the IETF and built from a registry run by IANA; see [[Request for Comments]]. It's what the lang attribute in HTML, the Accept-Language header in HTTP, and most software locale settings use.

A tag is made of subtags separated by hyphens, each with its own role. The first is the language, drawn from the ISO 639 list: two letters where available, three otherwise, so Hawaiian is haw. An optional script subtag, from ISO 15924, says which writing system is used; Serbian can be sr-Cyrl or sr-Latn. An optional region subtag usually comes from ISO 3166, as in en-GB, but can be a numeric United Nations area code, so es-419 means Spanish as used in Latin America; see [[Country Code]]. Further subtags mark variants such as spelling reforms, and an extension can carry preferences like a calendar or numbering system.

The guiding advice is to use the shortest tag that does the job. Most pages need only en or de; a region is worth adding only when content actually differs, as with spelling or vocabulary between British and American English. Common mistakes include en-UK, which is invalid because the region code for the United Kingdom is GB, and using a country as a stand-in for a language, as when a site offers a flag to pick Spanish. Languages cross borders and countries have several languages; see [[Internationalization]].

Tags do real work. Browsers send a ranked list of preferred languages, and servers pick the best available translation; see [[Hypertext Transfer Protocol]]. Screen readers use the declared language to choose pronunciation, so English text marked as French is read with French rules, and accessibility guidelines require pages to declare their language; see [[Screen Reader]] and [[Accessibility]]. Browsers use it to pick fonts, hyphenation, and quotation marks, which matters for Chinese and Japanese text sharing the same characters with different preferred glyphs. Search engines read alternate-language annotations to send people to the right version of a page; see [[Search Engine Optimization]].

Language and region also shape sorting, dates, and numbers. A Swedish list puts Ä after Z, and a German one doesn't; see [[Collation]]. The Unicode Consortium's Common Locale Data Repository supplies these rules keyed by language tag, and most operating systems and programming languages draw on it.

Tags describe text, not people. A user's interface language, the language of a piece of content, and the language of a search query can all differ, and systems that conflate them frustrate multilingual users; see [[Machine Translation]] and [[Transliteration]].

## See also
- [[Character Encoding]]
- [[HTML]]
- [[Gazetteer]]
- [[Writing System]]
