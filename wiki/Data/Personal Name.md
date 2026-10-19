---
aliases:
  - Name order
  - Given name and family name
tags:
  - data
summary: How people's names vary across cultures in structure, order, length, and script, and why software that assumes a first name and a last name in plain Latin letters fails many of the people it serves.
---
A **personal name** seems like the simplest field in any form, but names vary across cultures in ways that break common assumptions. Software that expects a first name and a last name, each a single word of plain letters, fails a large share of the world. A widely shared 2010 essay by Patrick McKenzie, "Falsehoods Programmers Believe About Names," listed dozens of such assumptions, all wrong; see [[Falsehoods Programmers Believe]].

Order is the first trap. In China, Japan, Korea, Vietnam, and Hungary the family name traditionally comes first, so "first name" and "last name" are ambiguous labels; "given name" and "family name" are clearer. Many people have no family name at all: single names are common in Indonesia, and Iceland mostly uses patronymics, with a child's surname formed from a parent's given name plus -son or -dóttir, so family members don't share one. Spanish and Portuguese naming often includes two family names, and people may use either or both. Some cultures add generational names, honorifics, or names that change at life events.

Names change. People change names at marriage, divorce, gender transition, adoption, or religious conversion, and a system that treats a name as a permanent identifier will mismatch records or keep showing an old name someone has left behind; see [[Entity Resolution]].

Characters cause more trouble. Names contain apostrophes, hyphens, spaces, and accents. Forms that reject O'Brien or strip the accent from José insult users, and names mangled by encoding errors turn into strings of junk on letters and tickets; see [[Mojibake]] and [[Character Encoding]]. Apostrophes have long been tangled with security, since careless code that pastes input into a query breaks on them; see [[SQL Injection]]. People whose surname is literally Null have reported systems treating it as a missing value; see [[Null]]. Names in non-Latin scripts may need a romanized form for passports and international systems, and there may be several competing spellings; see [[Transliteration]].

Sorting and matching are hard too. Alphabetical order depends on language, prefixes like van or de may or may not count, and Japanese names written in kanji are sorted by their pronunciation, recorded separately; see [[Collation]]. Matching on spelling misses Mohammed and Muhammad, which phonetic and fuzzy methods try to catch; see [[Phonetic Algorithm]].

The usual design advice, from the W3C's internationalization guidance and government design systems among others, is to use one field for the full name as the person writes it, plus an optional field for what they'd like to be called. Split fields only when a downstream system truly needs them, and accept any character; see [[Form Design]] and [[Internationalization]]. Names are also personal data, often the key that links a person's records across systems; see [[Personal Data]].

## See also
- [[Writing System]]
- [[Census]]
- [[Dialect]]
