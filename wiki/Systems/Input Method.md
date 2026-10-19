---
aliases:
  - IME
  - Input method editor
  - Compose key
tags:
  - systems
summary: The software layer that turns keystrokes into text for writing systems with far more characters than a keyboard has keys, such as Chinese, Japanese and Korean, by letting people type sounds or shapes and choose from candidates.
---
A keyboard has about a hundred keys. Chinese uses thousands of characters in everyday writing, and Japanese mixes two syllabaries with thousands of kanji. An **input method**, or input method editor, bridges the gap. It sits between the keyboard and the application, takes keystrokes, and produces characters that no single key could; see [[Character Encoding]].

Most input methods work in two stages. The user types a reading or a shape code, and the input method shows a list of matching characters or words, the **candidates**, from which the user picks. While choosing, the text is displayed but not yet committed, a state called **composition** or preedit, usually shown underlined.

Common approaches include:

- **Phonetic input.** In Chinese, typing a word's romanized spelling produces candidates with that pronunciation. Because many characters share sounds, good input methods rank candidates using word frequency and context, much like predictive text, and learn the user's habits; see [[Autocomplete]].
- **Shape-based input.** Systems such as Cangjie and Wubi encode characters by their component strokes. They take longer to learn but are fast and unambiguous once mastered.
- **Japanese conversion.** Typing produces kana, which the input method converts to a mix of kanji and kana, choosing among homophones by context. Users press a key to cycle through alternatives when the first guess is wrong.
- **Korean.** Hangul letters typed in sequence combine automatically into syllable blocks, so the input method mostly assembles rather than chooses.

Smaller versions of the idea serve other languages. Dead keys and the **compose key** combine sequences such as an accent followed by a letter into a single character. Emoji pickers and handwriting recognition are input methods too; see [[Emoji]].

Supporting input methods is a recurring difficulty for software. The application must cooperate: it has to show composing text in place, report the cursor's position so the candidate window appears next to it, and not treat composing keystrokes as finished input or keyboard shortcuts. Web pages that act on every key press, such as submitting a search on Enter, often break for users mid-composition, since Enter there means "accept this candidate". On Linux, input methods run as separate services that applications talk to through the display system, and each new display protocol has needed new interfaces for them; see [[Display Server]] and [[Inter-Process Communication]].

Phones made input methods mainstream for everyone, including people who never type anything but their own language. Touch keyboards with autocorrection, swipe typing and voice dictation all follow the same composition-and-commit pattern, and the input method sees everything typed, which is why third-party keyboards raise privacy concerns; see [[Clipboard]].

## See also
- [[Accessibility]]
- [[Desktop Environment]]
- [[Command Palette]]
