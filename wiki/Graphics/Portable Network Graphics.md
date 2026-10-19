---
aliases:
  - PNG
  - APNG
  - Paeth filter
tags:
  - graphics
summary: A lossless image format created in the mid-1990s as a patent-free replacement for GIF, which added full alpha transparency and better compression and became the standard for screenshots, interface graphics and anything with sharp edges.
---
**Portable Network Graphics**, or **PNG**, is a lossless raster image format. It was created in a hurry, out of a legal dispute. At the end of 1994 Unisys, which held a patent on the LZW compression used in GIF files, announced that software making GIFs would need a license; see [[GIF]] and [[Software Patent]]. Within weeks developers organized online to design a patent-free replacement. The first specification appeared in 1995, the W3C published it as a recommendation in 1996, and it later became an international standard. The name is often expanded, recursively, as "PNG's Not GIF."

The designers fixed GIF's other limits along the way:

- **Color depth.** GIF is limited to a palette of 256 colors. PNG supports palettes too, but also full color at 8 or 16 bits per channel, and grayscale; see [[Color Quantization]].
- **Transparency.** GIF pixels are either fully transparent or fully opaque. PNG supports a full **alpha channel**, so edges can blend smoothly with whatever is behind them; see [[Alpha Compositing]].
- **Compression.** PNG uses DEFLATE, the same LZ77 and Huffman coding combination as zip files; see [[Data Compression]]. Before compressing, each row of pixels is passed through a **filter** that predicts each byte from its neighbors and stores only the difference. The options include predicting from the pixel to the left, the pixel above, their average, or the Paeth predictor, which chooses among left, above and upper-left. Smooth gradients become runs of small numbers, which compress well.

The file structure is carefully defensive. A PNG begins with an eight-byte signature chosen to detect common corruption, such as a file transfer converting line endings. The rest is a series of **chunks**, each with a four-letter type and a CRC checksum; see [[Checksum]]. The capitalization of each letter in the type encodes whether a decoder that doesn't recognize the chunk must give up or can safely skip it, allowing the format to be extended without breaking older software.

Some features caused trouble. An optional gamma chunk was meant to make images display consistently, but browsers handled it inconsistently, so PNG colors often failed to match surrounding page colors; see [[Gamma Correction]]. Optional interlacing, a seven-pass scheme called Adam7, let a rough version appear early on slow connections; see [[Interlacing]].

PNG did not support animation. A separate format for that never caught on, and Mozilla's APNG extension, which older decoders display as a still image, eventually spread to all major browsers and was later folded into the official specification.

Because it is lossless, PNG is ideal for screenshots, diagrams, text, logos and [[Pixel Art]], where lossy compression would smear sharp edges. For photographs it produces files many times larger than [[JPEG]]. Newer formats offer both modes in one file; see [[Image Format]].

## See also
- [[Vector Graphics]]
- [[Dithering]]
