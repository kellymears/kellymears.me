---
aliases:
  - ANSI art
  - Text art
  - Box-drawing characters
  - Code page 437
tags:
  - graphics
summary: Pictures built from the characters of a text character set, from typewriter art to bulletin-board ANSI scenes to terminal interfaces, a form of halftoning with letters as the dots.
---
**ASCII art** is the practice of making pictures out of text characters. It takes its name from ASCII, the 1960s character set whose 95 printable characters are letters, digits, and symbols, but the craft is older and has outgrown that set; see [[Character Encoding]]. Its constraint is that each cell of a grid holds one character from a fixed set, and all the art is in choosing which.

Typists made pictures before computers did. Typewriter art appeared in the 1890s, built from overstruck letters and punctuation. Computer printouts of the 1960s rendered photographs by printing characters of different darkness, the closest ancestor of the modern form.

There are two main styles:

- **Tonal.** Each character stands in for a level of gray according to how much ink it carries, from a space for white through a period for light gray to a hash or at-sign for black. The image is effectively a coarse photo with characters as pixels, a form of [[Halftone]], and converting an image this way is the same problem as reducing it to a few gray levels; see [[Dithering]].
- **Line.** Characters are chosen for their shapes, slashes for diagonals, underscores and pipes for edges, parentheses for curves. Small line pictures and the sideways faces of emoticons belong here, as does the Japanese kaomoji tradition of upright faces built from a larger character set.

Both depend on a monospaced typeface, where every character takes the same width. In a proportional font the grid collapses and the picture breaks; see [[Typeface]].

The IBM PC's character set, later known as code page 437, added shaded blocks and box-drawing lines in 1981. Combined with the color and cursor controls of [[ANSI Escape Code]]s, these gave rise to **ANSI art**, the full-color scenes, logos, and login screens of 1990s dial-up bulletin boards. Art groups competed and released monthly packs, a culture closely tied to the cracking scene and the [[Demoscene]]. Each character cell was effectively a large pixel with a foreground and background color, which made it a cousin of [[Pixel Art]].

The same characters still build a [[Terminal User Interface]]: windows, borders, progress bars, and charts drawn with Unicode box and block characters. Braille patterns, each holding a two-by-four grid of dots, let terminal tools draw plots at higher resolution than whole characters allow. Libraries such as aalib (1997) render video and even 3D games in real time as text, and some modern games use an ASCII [[Shader]] as a stylistic filter.

Displaying it reliably is hard. The art depends on exact character widths and the absence of ligatures or substitutions, so it breaks in proportional fonts, on systems with different code pages, and wherever a font maps a character to a wider glyph; see [[Font Rendering]].

## See also
- [[Color Quantization]]
- [[Vector Graphics]]
