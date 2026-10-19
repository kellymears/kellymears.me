---
aliases:
  - Graphics Interchange Format
  - Animated GIF
  - LZW
tags:
  - graphics
summary: A 1987 image format limited to 256 colors per frame that survived a patent fight, the rise of better formats, and its own inefficiency to become the internet's format for short looping clips and reactions.
---
**GIF**, the Graphics Interchange Format, is an image format that CompuServe introduced in 1987 for sharing pictures over slow modem connections. Its technical design is dated, yet it remains one of the most recognizable formats on the web, thanks to one feature: animation. Its creator, Steve Wilhite, said the name is pronounced with a soft g, like "jif"; many people disagree.

Each GIF frame can use at most 256 colors, chosen from a palette stored with the image. That suited the computer graphics of the 1980s, such as logos, icons, and [[Pixel Art]], but photographs must be reduced to 256 colors, often with a scattered pattern of dots to simulate the missing shades; see [[Color Quantization]] and [[Dithering]]. Transparency is all or nothing: a pixel is either fully visible or invisible, so edges against a new background look jagged; see [[Alpha Compositing]].

GIF compresses images losslessly with **LZW**, an algorithm by Abraham Lempel, Jacob Ziv, and Terry Welch that builds a dictionary of repeated pixel sequences; see [[Data Compression]]. It works well on flat areas of color and poorly on photographs.

The compression caused a crisis. Unisys held a patent on LZW and, in late 1994, announced it would charge royalties on software that created GIFs. Developers responded by designing PNG, a patent-free replacement with full color, smooth transparency, and better compression. The patents expired by 2004, but PNG had already taken over GIF's role for still images.

Animation saved GIF. A 1989 revision of the format allowed several images in one file, each with a delay before the next. In 1995 the Netscape browser added an extension that made the sequence loop, which turned GIF into the web's only widely supported animation format for many years; see [[Browser Wars]]. Early websites filled with spinning logos and "under construction" signs. In the 2010s, short looping clips from films and television became a common way to react in online conversation.

As a video format, GIF is wildly inefficient. Each frame is compressed mostly on its own, with none of the motion prediction modern codecs use, so a few seconds of GIF can be ten times larger than the same clip as video; see [[Video Compression]]. Many sites that say they show GIFs actually convert uploads to short silent video files and play them in a loop; see [[Responsive Images]].

That GIF persists anyway shows how support everywhere outweighs technical merit. Every browser, app, and image tool reads it, and it needs no player; see [[Path Dependence]] and [[Lindy Effect]]. Archivists value it for the same reason; see [[Digital Preservation]].

## See also
- [[GeoCities]]
- [[Image Format]]
- [[Software Patent]]
- [[Color Cycling]]
