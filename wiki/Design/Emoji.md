---
aliases:
  - Emoticon
  - Kaomoji
  - Zero-width joiner
tags:
  - design
summary: Picture characters encoded in Unicode, born on Japanese phones in the late 1990s, drawn differently by every platform, and built from sequences of code points that break naive string handling.
---
**Emoji** are pictographs encoded as text characters, so they can be typed, sent, and searched like letters. The word is Japanese, from e (picture) and moji (character), and its resemblance to "emotion" is a coincidence.

Before them came **emoticons**, faces built from punctuation. The computer scientist Scott Fahlman proposed :-) and :-( on a Carnegie Mellon online message board in 1982, to mark jokes that readers kept taking seriously. Japan developed **kaomoji** that read upright rather than sideways, such as (^_^).

The first emoji set appeared on a SoftBank phone in 1997. The best known early set was drawn by Shigetaka Kurita for NTT Docomo's mobile internet service in 1999: 176 symbols on a 12-by-12 pixel grid, now in the collection of the Museum of Modern Art. Each Japanese carrier had its own incompatible set, until pressure from Google and Apple got 722 emoji added to Unicode in 2010. Oxford Dictionaries named the face with tears of joy its 2015 word of the year.

Under the hood, emoji are a stress test for text handling; see [[Character Encoding]]:

- **Outside the basic range.** Most emoji need four bytes in UTF-8 and two code units in UTF-16, so a single emoji has a string length of 2 in [[JavaScript]].
- **Modifiers.** Five skin tones, added in 2015, follow a base emoji as a separate code point.
- **Sequences.** A **zero-width joiner** fuses emoji into one: the four-person family is seven code points and eleven UTF-16 units. Flags are pairs of letter symbols for a country code.
- **Presentation.** Some symbols, like the heart, exist as both text and emoji, selected by an invisible variation selector.

One visible character can therefore be many code points, so code that cuts strings by length can split an emoji in half and leave garbage; see [[Text Truncation]].

Every platform draws its own designs, so the same character can look different to sender and recipient. A 2016 study found people disagreed widely on the meaning and even the sentiment of common emoji, especially across platforms. Designs also change: Apple redrew the pistol as a water gun in 2016, and other vendors followed. Fonts carry them as color glyphs, in several competing formats.

Meaning is set by use rather than design. Emoji soften tone, mark irony, and stand in for gestures that text lacks. Their senses drift, as when the skull came to mean laughing.

In interfaces, emoji can add warmth to Microcopy, but a [[Screen Reader]] reads out each one's full name, so a line of them becomes a long recitation, and they are no substitute for clear [[Iconography]]. Their names and keywords are localized, so search and pickers need care across languages.

## See also
- [[Internationalized Domain Name]]
- [[Input Method]]
- [[SMS]]
