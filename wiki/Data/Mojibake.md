---
aliases:
  - Garbled text
  - Encoding error
tags:
  - data
summary: The garbled characters that appear when text is decoded with the wrong character encoding, named with a Japanese word, once a daily nuisance and still a reliable sign that some system guessed instead of being told.
---
**Mojibake** is garbled text produced when bytes written in one character encoding are read as another. A café becomes "cafÃ©," apostrophes turn into strings like "â€™," and whole paragraphs of Japanese or Russian dissolve into nonsense. The word is Japanese, roughly meaning "character transformation," and it became the international name for the problem.

Computers store text as numbers, and an encoding is the table that maps numbers to characters; see [[Character Encoding]]. For decades there were many incompatible tables. Western European text commonly used Latin-1 or a Windows variant of it. Russian had several rival encodings, so a message written in one could arrive unreadable in another. Japanese computing used at least three widely deployed encodings at once, which is part of why the problem got its name there. Nothing in a plain text file says which table was used, so software had to be told or had to guess.

The familiar "Ã©" pattern has a specific cause. In UTF-8, the dominant modern encoding, "é" is stored as two bytes. Software that reads those bytes as Latin-1 shows two characters instead of one. If the garbled result is then saved as UTF-8 and misread again, the damage compounds. A diamond with a question mark is different: it's the replacement character, which a decoder substitutes for bytes it can't interpret at all, and the original information is usually gone.

Mojibake tends to appear at boundaries:

- **Files without labels**, especially exported data that a spreadsheet opens with a guessed encoding; see [[CSV]] and [[Spreadsheet]].
- **Web pages and email** whose declared encoding doesn't match their content; see [[MIME Type]] and [[Hypertext Transfer Protocol]].
- **Databases** where the connection, the table, and the application disagree about encoding; see [[Collation]].
- **Byte order marks**, invisible characters some programs add at the start of a file to signal its encoding, which other programs then display as stray symbols; see [[Endianness]].

The fix is mostly organizational. Choosing UTF-8 everywhere, declaring it explicitly at every boundary, and rejecting rather than guessing at unlabeled input removes most problems. UTF-8 now encodes the vast majority of web pages, and mojibake has become much rarer, though it still surfaces in old archives, legacy systems, and data passed between organizations. Cleaning tools can often reverse common patterns of double decoding; see [[Data Cleaning]].

Being lenient about input can make things worse, since a system that silently accepts mislabeled text spreads it further; see [[Postel's Law]] and [[Garbage In, Garbage Out]]. Testers deliberately fill interfaces with accented and non-Latin characters to catch encoding bugs before users do; see [[Pseudolocalization]]. Encodings are one of many areas where programmers' assumptions about text fail; see [[Falsehoods Programmers Believe]].

## See also
- [[Input Method]]
- [[Transliteration]]
- [[Personal Name]]
