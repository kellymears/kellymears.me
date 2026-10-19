---
aliases:
  - Scancode
  - Keymap
tags:
  - systems
summary: The mapping from physical keys to the characters and commands they produce, which software applies to raw key positions sent by the keyboard, so the same hardware can type QWERTY, AZERTY, Dvorak, or Cyrillic.
---
A **keyboard layout** is the mapping from the physical keys on a keyboard to the characters and commands they produce. The same hardware can type English on QWERTY, French on AZERTY, German on QWERTZ, or Russian in Cyrillic, because the keyboard itself mostly doesn't know what its keys mean. Software decides.

When a key is pressed, the keyboard sends a **scancode**, a number identifying which physical key moved, not which letter it shows. USB keyboards report key positions through a standard device protocol; see [[Universal Serial Bus]]. The operating system then applies the current layout, a keymap, to translate positions into characters, taking into account modifiers such as Shift, AltGr, and Caps Lock. On Linux, the console and graphical desktops each apply their own keymaps, which is why a layout set in one doesn't always carry over to the other; see [[Display Server]].

Producing text from those characters adds more layers. Many layouts use dead keys: pressing an accent key produces nothing until the next letter, then combines them into a single accented character. Languages with thousands of characters, such as Chinese and Japanese, can't fit on a keyboard at all, so an input method converts typed sounds or shapes into characters chosen from a list; see [[Character Encoding]] and [[Internationalization]].

The dominant English layout is an accident of history. QWERTY descends from typewriters developed by Christopher Latham Sholes in the 1870s, and its arrangement reflected mechanical constraints and commercial choices of that era. August Dvorak and William Dealey patented a layout in 1936 designed to put common letters under the strongest fingers. It never displaced QWERTY. The economist Paul David told the story in 1985 as a classic case of an inferior standard locked in by early adoption; others later disputed whether Dvorak was really much better; see [[Path Dependence]] and [[Network Effect]].

Switching layouts has a steep personal cost: typing speed collapses for weeks while years of practice are relearned; see [[Motor Learning]]. Some people switch anyway, often hoping for comfort, though evidence that a layout alone prevents injury is thin; see [[Repetitive Strain Injury]].

Keyboard shortcuts complicate things. Many are defined by letter, so Ctrl+Z sits in a different place on AZERTY, and shortcuts chosen for their position on QWERTY become awkward elsewhere. Terminals receive keys as byte sequences, some of them escape codes, which is why certain key combinations can't be distinguished in a terminal program; see [[ANSI Escape Code]].

Programmable keyboards push layouts into hardware. Their firmware can remap any key, add layers, and make one key act differently when tapped or held; see [[Firmware]]. Remapping also helps people who type with one hand or with limited mobility; see [[Accessibility]] and [[Keyboard Navigation]].

## See also
- [[Input Method]]
- [[Transliteration]]
- [[Language Tag]]
