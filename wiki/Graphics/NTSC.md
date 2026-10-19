---
aliases:
  - Composite video
  - Artifact color
  - PAL
tags:
  - graphics
summary: The analog color television standard of North America and Japan, which squeezed color into a black-and-white signal without breaking old sets, set the odd 29.97 frame rate, and left quirks that retro computers turned into features.
---
**NTSC** is the analog television standard used for decades in North America, Japan, and parts of South America. It's named for the National Television System Committee, the United States group that defined it. The first NTSC standard, in 1941, specified black-and-white broadcasts with 525 lines per frame and 30 frames per second, each frame sent as two interlaced fields; see [[Interlacing]].

The famous engineering problem came with color. In 1953 a second committee approved a color system that had to remain compatible with the millions of black-and-white sets already sold. The solution sent the original brightness signal, called luma, unchanged, so old sets kept working. Color information was encoded as two color-difference signals and carried on a subcarrier, a high-frequency wave mixed into the same signal at about 3.58 megahertz; see [[Radio Spectrum]]. Black-and-white sets mostly ignored it. Color sets decoded the hue from the subcarrier's phase and the saturation from its strength. A short burst of reference signal at the start of each line told the receiver how to interpret the phase.

Separating brightness from color this way, and giving color less detail than brightness, anticipated digital video's later practice; see [[Chroma Subsampling]]. It matches how vision works, since the eye resolves fine detail in brightness better than in color; see [[Opponent Process Theory]].

Adding the color subcarrier caused interference with the sound carrier, so engineers lowered the frame rate by a tenth of a percent, to about 29.97 frames per second. That odd figure still appears in video software today, and editors use a "drop-frame" timecode to keep clock time and frame counts aligned; see [[Frame Rate]].

NTSC's sensitivity to phase errors meant colors could drift, especially over long transmission paths, earning it the joke expansion "Never The Same Color." Most of Europe adopted PAL in the 1960s, which reverses the phase of one color signal on alternate lines so that errors cancel. France and the Soviet Union used SECAM.

**Composite video**, the single yellow connector on older equipment, carries brightness and color mixed together in this way. Separating them again is imperfect, producing dot crawl and color fringes along fine detail; see [[Aliasing]].

Early home computers exploited those flaws. The Apple II and the IBM PC's CGA adapter could produce colors from patterns of monochrome pixels whose spacing matched the color subcarrier frequency, a trick called **artifact color**. Programmers of the era worked this closely with the beam; see [[Racing the Beam]]. Pixel art designed for composite displays relied on blurring to blend dithered patterns into smooth tones, which is why emulators offer filters recreating it; see [[Dithering]], [[Pixel Art]], and [[Emulation]].

The United States ended full-power analog broadcasts in 2009, moving to digital standards; see [[Video Compression]].

## See also
- [[Gamma Correction]]
- [[Aspect Ratio]]
