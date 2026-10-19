---
aliases:
  - WebP
  - AVIF
  - JPEG XL
tags:
  - web
summary: The file formats the web uses for pictures, from the GIF, JPEG, and PNG generation to newer formats derived from video codecs, and the slow, politics-laden process by which a new one becomes safe to use.
---
An **image format** defines how a picture is encoded as bytes. Images usually make up most of a typical web page's weight, so the format chosen affects load time more than almost any other decision; see [[Core Web Vitals]].

The web's first generation of formats lasted for decades:

- **GIF**, from 1987, supports animation and a palette of at most 256 colors; see [[GIF]].
- **JPEG**, from 1992, compresses photographs by discarding detail the eye notices least; see [[JPEG]].
- **PNG**, from 1996, is lossless and supports transparency. It was created partly because the compression method inside GIF was patented, and the patent holder's licensing demands in the mid-1990s pushed developers to build a free alternative.

Newer formats borrowed from video. A single frame of a video is a still image, and video codecs had advanced well beyond JPEG, so their intra-frame coding was repackaged as image formats; see [[Video Compression]].

- **WebP**, released by Google in 2010, is based on the VP8 video codec. It supports lossy and lossless compression, transparency, and animation, and typically produces files noticeably smaller than equivalent JPEGs or PNGs. Universal browser support took a decade, arriving when Safari added it in 2020.
- **AVIF**, published in 2019, is based on AV1, a royalty-free codec from a consortium of technology companies. It compresses better than WebP at similar quality and supports high dynamic range and wide color, but encoding is slow; see [[High Dynamic Range]] and [[Color Gamut]].
- **JPEG XL**, standardized around 2022, can losslessly repack existing JPEG files about a fifth smaller and decode progressively. Chrome removed experimental support in 2023, citing insufficient interest, while Safari added it the same year. Whether a format succeeds depends on browser vendors as much as on technical merit; see [[Network Effect]].

Because support arrives unevenly, sites serve several formats. A picture element lists alternatives and the browser picks the first it understands. Alternatively, the server reads the browser's Accept header and chooses; see [[Responsive Images]] and [[Hypertext Transfer Protocol]]. Image CDNs automate this, resizing and converting on the fly.

Choosing a format involves tradeoffs that aren't captured by file size alone:

- **Content type.** Photos suit lossy formats; screenshots, diagrams, and text suit lossless ones, where lossy artifacts show around sharp edges; see [[Data Compression]].
- **Color detail.** Many lossy encoders store color at reduced resolution, which can blur fine colored lines; see [[Chroma Subsampling]].
- **Scale.** Logos and icons are often better as vector graphics, which stay sharp at any size; see [[Vector Graphics]].

Serving an image at the size it's displayed usually saves more than any change of format; see [[Image Resampling]].

## See also
- [[Portable Network Graphics]]
- [[MIME Type]]
