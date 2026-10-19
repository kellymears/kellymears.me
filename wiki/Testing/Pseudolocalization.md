---
aliases:
  - Pseudo-translation
  - Pseudo-localization
  - Localization testing
  - Internationalization testing
tags:
  - testing
summary: Replacing an interface's text with a stretched, accented, bracketed imitation of a foreign language, to find localization bugs before any real translation exists.
---
**Pseudolocalization** tests whether software is ready to be translated by translating it into a fake language first. Every user-facing string is transformed automatically: letters are swapped for accented look-alikes, the text is padded to be longer, and brackets mark where each string starts and ends. "Save changes" becomes something like `[Šåvé çĥåñĝéš one two]`. It remains readable to the developer, so the product can still be used, but it looks foreign enough to expose problems at a glance.

The technique dates to the 1990s at Microsoft, where translation happened late and bugs found then were expensive. Pseudolocalization moves that discovery to the start, a cheap form of shift-left testing. Each part of the transformation targets a class of bug:

- **Accented and non-Latin characters** catch broken [[Character Encoding]]. If `é` arrives as `Ã©`, some layer is decoding UTF-8 as Latin-1, a mojibake bug that would hit every real language with accents.
- **Padding** simulates text expansion. Translations from English typically run 30 to 40 percent longer, and short strings can double: German compounds and Finnish case endings are the usual offenders. Labels overflow buttons, menus wrap, and fixed-width layouts break. Layouts built with [[Container Query|container queries]] and flexible widths survive better than pixel-perfect ones, as does good [[Line Length]] discipline.
- **Brackets** reveal truncation, since a missing closing bracket means text was cut off, and **hardcoded strings**, since any English without brackets never went through the translation system at all.
- **Concatenation** shows up too. Code that builds sentences by gluing fragments together produces bracketed pieces in an order that only works in English. Real languages reorder words, inflect them, and have plural rules that "1 file / 2 files" logic can't express, so fragments need to become whole messages with placeholders.

A second variant mirrors the interface to simulate right-to-left scripts such as Arabic and Hebrew, which tests layout direction, icon flipping, and mixed bidirectional text.

Pseudolocalization fits naturally into automated suites. Running the [[End-to-End Test|end-to-end tests]] or a [[Visual Regression Testing|visual regression]] pass under the pseudo-locale catches clipped and overlapping text on every change, and checking that no unbracketed text remains catches strings that bypassed translation. It does not test the quality of translations, cultural fit, or [[Time Zone]] and number formatting; those need real locales and real speakers. Font coverage is another gap: the substituted characters may exist in the font while real Thai or Japanese text falls back to another font with different metrics, a [[Font Rendering]] issue.

Games face these problems at scale, with text in tight UI and voice timing, which [[Video Game Localization]] covers. Pseudolocalization is closely related to [[Accessibility Testing]]: both test that an interface holds up for people other than the people who built it.

## See also
- [[Character Encoding]]
- [[Falsehoods Programmers Believe]]
- [[Mojibake]]
- [[Error Message]]
- [[Text Truncation]]
