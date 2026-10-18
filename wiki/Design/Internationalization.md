---
aliases:
  - i18n
  - Locale
  - Right-to-left
  - Bidirectional text
tags:
  - design
summary: Building software so it can be adapted to any language and region without code changes, which means never assuming English word order, plural rules, date formats, text direction, or text length.
---
**Internationalization** is designing and building software so it can be adapted to different languages and regions without changing its code. The abbreviation **i18n** counts the 18 letters between the first *i* and last *n*. Adapting it for a particular market, by translating text and adjusting formats, is localization; see [[Video Game Localization]]. Internationalization is the groundwork that makes localization possible, and it's far cheaper to do from the start than to retrofit.

A *locale* identifies a language and region, such as `pt-BR` for Brazilian Portuguese or `fr-CA` for Canadian French. Many conventions depend on it:

- **Numbers.** `1,234.5` in the United States is `1.234,5` in Germany and `1 234,5` in France.
- **Dates and times.** `03/04/2026` is March 4 in one country and April 3 in another. Time zones add their own traps; see [[Time Zone]].
- **Currency.** Symbol, position, and decimal places all vary.
- **Sorting.** Alphabetical order depends on language. Swedish sorts `ä` after `z`; German sorts it with `a`; see [[Sorting Algorithm]].
- **Names and addresses.** Many people have no family name, or put it first. Address formats vary by country; see [[Form Design]].

Text is where most mistakes happen:

- **Never build sentences by concatenation.** "You have " + count + " messages" assumes English word order. Translators need whole sentences with placeholders.
- **Plurals.** English has two forms, one and other. Japanese has one; Russian has three; Arabic has six. Message formats encode these rules per language.
- **Expansion.** Translated text is often 30 percent longer than English, and German labels can double in length. Buttons and layouts sized to English text break; see [[Microcopy]].
- **Encoding.** Text must be stored and processed as Unicode, and string length in bytes, characters, and visible symbols are three different numbers; see [[Character Encoding]].

**Right-to-left** languages such as Arabic and Hebrew mirror the whole interface: navigation, icons that imply direction, progress bars, and reading order. Mixed text, such as an English product name inside an Arabic sentence, is *bidirectional*, and an algorithm decides how the runs are ordered. CSS logical properties, which say "start" and "end" instead of "left" and "right," let one stylesheet handle both directions; see [[Box Model]].

Typography also changes. Many scripts need complex shaping, where letters change form by position and combine, so fonts need the right glyphs and shaping support; see [[Font Rendering]] and [[OpenType Features]]. Line heights sized for Latin text can clip scripts with tall marks above and below.

A standard testing technique is **pseudo-localization**: replace every string with an accented, lengthened version, such as `[Śéţţîñĝš ~~~]`, to reveal hard-coded text, truncation, and encoding bugs before any translator is involved.

Internationalization is a form of [[Inclusive Design]]: most of the world doesn't read English, and software that assumes otherwise excludes them by default.

## See also
- [[Typeface]]
- [[Subtitling]]
- [[Machine Translation]]
- [[Collation]]
