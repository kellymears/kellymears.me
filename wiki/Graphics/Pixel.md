---
aliases:
  - Pixels
  - Pixel density
  - Pixels per inch
  - Device pixel ratio
tags:
  - graphics
summary: The smallest addressable element of a digital image or screen, better understood as a point sample than as a little square, whose physical form, shape and density vary enough between devices that the web had to invent a separate reference pixel.
---
A **pixel**, short for picture element, is the smallest addressable unit of a digital image or display. An image file stores a grid of them, each holding a color value, usually three numbers for red, green and blue and sometimes a fourth for transparency; see [[Alpha Compositing]]. A screen has its own grid of physical pixels, and showing an image means mapping one grid onto the other.

The word appeared in the mid-1960s among engineers processing pictures from space probes, and it beat a rival abbreviation, "pel," which survives in some video standards. The first scanned digital photograph is usually credited to Russell Kirsch, who in 1957 scanned a photo of their infant son at 176 pixels on a side.

A common mental model treats a pixel as a tiny colored square. Alvy Ray Smith argued against this in a 1995 memo titled "A Pixel Is Not a Little Square." A pixel is a point sample of a continuous image, and squares appear only because of how a display reconstructs the samples. The distinction matters whenever an image is resized, rotated or drawn at fractional positions. Treating pixels as samples explains why edges shimmer when detail is finer than the grid, and why resizing needs filtering rather than copying squares.

Physical pixels are rarely single dots. A typical LCD pixel is three colored **subpixels** side by side, and many OLED panels share subpixels between neighbors, in patterns that carry fewer subpixels than the advertised resolution suggests; see [[OLED]]. Camera sensors usually capture only one color per photosite through a mosaic filter, and software interpolates the other two.

Pixels weren't always square either. Standard-definition digital video stored 720 samples per line for both 4:3 and widescreen pictures, so each pixel was stretched or squeezed horizontally depending on the format, and footage looked distorted when software assumed square pixels; see [[Aspect Ratio]].

**Pixel density**, measured in pixels per inch, decides whether individual pixels are visible. Once a pixel subtends less than about one arcminute at normal viewing distance, roughly the limit of typical eyesight, the grid disappears. High-density screens broke the old assumption that one layout unit equals one physical pixel. The web's CSS pixel is now a reference unit, and the **device pixel ratio** says how many physical pixels stand behind each one, two or three on most phones. That's why sites serve several sizes of the same image; see [[Responsive Images]].

Low-resolution art turned the pixel into a style of its own, where every one is placed by hand.

## See also
- [[Raster graphics]]
- [[Rasterization]]
