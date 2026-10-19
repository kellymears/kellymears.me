---
aliases:
  - Romanization
  - Pinyin
tags:
  - data
summary: Writing words from one script in the letters of another, as in rendering Russian or Chinese in Latin letters, which produces competing spellings for the same name and shapes search, slugs, passports, and records.
---
**Transliteration** is writing text from one script in the characters of another, such as Russian Cyrillic or Arabic in Latin letters. When the target is the Latin alphabet it's called **romanization**. It differs from translation, which carries meaning into another language, and is often contrasted with transcription, which records sounds; in practice most romanization systems mix the two.

Every pair of scripts has several competing systems, so a single name can appear in many spellings. The Russian writer's name is Chekhov in English, Tchekhov in French, and Tschechow in German, each following its own conventions. English-language reports spelled Muammar Gaddafi's surname dozens of ways. Systems differ in purpose: scholarly ones aim to be reversible, letter for letter, so the original can be reconstructed, while popular ones aim to be easy to pronounce. Libraries use their own tables so that catalogs file names consistently; see [[Library Classification]].

Chinese shows how much depends on the choice. Hanyu Pinyin, adopted by the People's Republic of China in 1958 and accepted as an international standard in 1982, replaced the older Wade-Giles system in most uses, which is why Peking became Beijing in English. Taiwan used various systems for decades before settling on Pinyin for many purposes, and many people there still romanize their own names in older styles. Japanese has competing Hepburn and government systems, so the same word can be written Tōkyō, Toukyou, or Tokyo.

For software, transliteration turns up in several places. Web addresses are often built from titles reduced to plain ASCII, where German ü might become ue or just u depending on the rules; see [[Slug]]. Search must match a query typed in one script against records stored in another, or against several romanized spellings of the same name; see [[Entity Resolution]] and [[Phonetic Algorithm]]. Machine-readable passport zones use a fixed transliteration from an international aviation standard, so the name in a passport can differ from the one on a person's other documents; see [[Personal Name]]. Many input methods let people type a romanized spelling that becomes native characters; see [[Keyboard Layout]].

Doing it well requires knowing the language, not just the script. The same Cyrillic letters are romanized differently for Russian, Ukrainian, and Serbian, and the Turkish dotted and dotless i mean case conversion depends on language as well as letters; see [[Language Tag]] and [[Collation]]. Libraries such as ICU include transliteration rules keyed by language and script; see [[Internationalization]].

Losing information is the main risk. Many systems can't be reversed, so romanized data can't always be restored to the original, and storing only the romanized form discards the name as its owner writes it. The safer practice is to keep the original text and generate romanized forms as needed; see [[Character Encoding]] and [[Machine Translation]].

## See also
- [[Internationalized Domain Name]]
- [[Mojibake]]
