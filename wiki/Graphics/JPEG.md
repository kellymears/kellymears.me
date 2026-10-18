---
aliases:
  - Discrete Cosine Transform
  - DCT
  - Generation loss
tags:
  - graphics
summary: The dominant photo format since 1992, which shrinks images about tenfold by converting 8×8 blocks into frequency patterns and rounding away the fine detail the eye barely notices.
---
**JPEG** is the most widely used format for photographs, named for the Joint Photographic Experts Group that published the standard in 1992. It typically shrinks a photo to a tenth of its raw size with little visible difference, by throwing away detail the eye is poor at noticing; see [[Lossy compression]].

The pipeline:

1. **Color conversion.** The image is converted from red, green, and blue into brightness and two color-difference channels. Vision is much sharper for brightness than for color, so the color channels are usually stored at half resolution in each direction; see [[Chroma Subsampling]] and [[Opponent Process Theory]].
2. **Blocks.** Each channel is cut into 8×8 blocks of pixels.
3. **Discrete cosine transform.** Each block is rewritten as a sum of 64 patterns of stripes and checkerboards, from a flat average up to the finest alternation. Most blocks of a photo are smooth, so their energy lands in a few low-frequency patterns. It's the same idea as describing a sound by its overtones; see [[Timbre]] and [[Fast Fourier transform]].
4. **Quantization.** Each coefficient is divided by a number from a table and rounded. High-frequency patterns, which the eye notices least, get large divisors and mostly round to zero. This is the only step that discards information, and the "quality" setting controls how aggressive the table is.
5. **Entropy coding.** The runs of zeros and the remaining small numbers are packed tightly and losslessly with Huffman coding; see [[Information Theory]].

Decoding reverses the steps but can't restore the rounded-away detail, which shows up as JPEG's characteristic artifacts: visible 8×8 **blocking** in flat areas like sky, and **ringing**, faint halos around sharp edges, because sharp edges need exactly the high frequencies that were discarded. That's why JPEG suits photos but mangles text, line art, and screenshots.

Re-saving a JPEG compounds the loss. Each round of decoding, editing, and re-encoding quantizes again, so images passed around the internet degrade, a **generation loss** sometimes called "deep-frying." Archivists keep lossless masters for this reason; see [[Digital Preservation]]. The same traces help forensics: inconsistent compression across an image can reveal that part of it was pasted in; see [[Provenance]].

JPEG files also carry metadata, including camera settings and often the GPS coordinates where the photo was taken, which has revealed people's home addresses when photos were posted online; see [[Personal Data]].

Better formats exist. JPEG 2000, WebP, AVIF, and JPEG XL all compress more efficiently, yet the original remains everywhere, supported by every camera, browser, and program; see [[Path Dependence]]. Sites serve newer formats to browsers that accept them, with JPEG as the fallback; see [[Responsive Images]]. GPUs can't sample JPEGs directly and use their own block formats; see [[Texture Compression]].

## See also
- [[Image Resampling]]
- [[Dithering]]
