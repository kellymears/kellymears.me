---
aliases:
  - "4:2:0"
  - "4:4:4"
  - YCbCr
  - YUV
  - Luma and chroma
tags:
  - graphics
summary: Storing color at lower resolution than brightness because the eye barely notices, the trick that halves video bandwidth and blurs colored text on TVs.
---
**Chroma subsampling** reduces the size of images and video by storing color information at a lower resolution than brightness. It works because human vision resolves fine detail in brightness much better than fine detail in color. A picture with full-resolution brightness and quarter-resolution color looks almost identical to the original at normal viewing distance.

The first step is converting RGB pixels into a different representation. *Luma* (written Y′) is a weighted sum approximating brightness, with green counting most because the eye is most sensitive to it. Two *chroma* channels, Cb and Cr, record how far the color departs from gray toward blue and toward red. This family of formats is called YCbCr, often loosely called YUV. The chroma channels can then be stored at reduced resolution.

The notation describes a block of pixels four wide and two tall:

- **4:4:4** keeps full color resolution, with no subsampling.
- **4:2:2** halves color resolution horizontally, common in professional video.
- **4:2:0** halves it both horizontally and vertically, so each 2×2 group of pixels shares one color sample. The image takes half the data of 4:4:4.

The idea dates from analog color television. The NTSC standard of 1953 added color as a narrow extra signal alongside the existing black-and-white picture, so older sets still worked and the color fit in limited broadcast bandwidth. Digital video inherited the principle. Streaming services, Blu-ray, broadcast TV, and most JPEG photos use 4:2:0, and it compounds with the other techniques of lossy [[Data Compression]].

The cost shows up in sharp-edged color, which video rarely has but computer screens constantly do. Thin colored text, especially red or blue on a contrasting background, smears and fringes because two neighboring pixels can't have different colors. A PC connected to a television shows this when the link falls back to 4:2:0: the desktop looks fine but text looks fuzzy. TVs often deliver full 4:4:4 only in a dedicated PC or game mode, and bandwidth limits on older HDMI versions force subsampling at high resolutions, refresh rates, and [[High Dynamic Range]] bit depths. It also defeats the subpixel tricks of [[Font Rendering]].

Displaying subsampled video requires *chroma upsampling*, estimating the missing color samples. Simple players duplicate them, leaving blocky color edges; better ones use smarter [[Image Resampling]], and enthusiast video players offer sophisticated upscalers just for chroma.

There are subtler errors too. Luma is computed from gamma-encoded values rather than linear light, as described under [[Gamma Correction]], so some brightness information leaks into the chroma channels. When chroma is subsampled, small saturated details, like a thin red line on green, can come out darker than they should. Wider [[Color Gamut]] video standards use updated weightings and offer a constant-luminance variant that reduces the error.

## See also
- [[Pixel]]
- [[Chroma Key]]
- [[NTSC]]
- [[Image Format]]
- [[Texture Compression]]
- [[JPEG]]
- [[Interlacing]]
