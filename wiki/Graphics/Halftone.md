---
aliases:
  - Ben-Day dots
  - Screentone
  - CMYK
tags:
  - graphics
summary: Printing a continuous-tone image with dots of one ink that vary in size or spacing, so the eye blends them into grays and colors, the basis of newspaper photos, comics, and color printing.
---
A **halftone** reproduces a continuous-tone image, such as a photograph, using dots of a single ink that vary in size or spacing. A printing press can't print gray: every spot is either inked or bare. Halftoning fools the eye instead. At reading distance the dots blur together, and a region 30% covered by black dots reads as light gray; see [[Gestalt Principles]].

Before halftones, newspapers reproduced pictures as hand-engraved line drawings. Photographic halftone screens, developed in the 1880s by Frederic Ives and others, placed a fine grid between the negative and the printing plate, breaking the image into dots whose size followed the local brightness. The first halftone photograph in a daily newspaper appeared in New York in 1880, and by the late 1890s they were routine.

Key terms:

- **Screen frequency** is the number of dot rows per inch. Newspapers use about 85, magazines 150 or more. Finer screens show more detail but need smoother paper, since ink spreads as it soaks in, a problem called dot gain that darkens midtones; see [[Gamma Correction]].
- **Screen angle** is the direction the rows run. Rows at 45° are least noticeable, because the eye is most sensitive to horizontal and vertical lines.
- **Dot shape**, round, elliptical, or square, affects how smoothly midtones blend.

Color printing uses four halftones, one each for cyan, magenta, yellow, and black ink (CMYK). Each screen is set at a different angle; if two were close, their grids would interfere into a shimmering [[Moiré pattern]]. Set correctly, they form tiny rosettes too fine to notice. Inks subtract light from white paper, and the range of colors they can make is smaller than a screen's, so vivid screen colors often print dull; see [[Color Gamut]].

Halftoning is a close relative of [[Dithering]], the screen technique for showing many shades with few colors. Traditional halftones keep dots on a fixed grid and change their size. Stochastic screening instead scatters tiny dots of one size, more densely in dark areas, which avoids moiré entirely; it's essentially [[Blue Noise]] in ink.

Scanning a printed halftone is tricky. The dot grid clashes with the scanner's own sampling grid and produces moiré, so scanners "descreen" by blurring the dots away first; see [[Aliasing]] and [[Convolution]].

The visible dot became an aesthetic of its own. Cheap comic books printed flat color with **Ben-Day dots**, and Roy Lichtenstein enlarged them into pop art in the 1960s. Manga artists use screentone, adhesive sheets of printed dot patterns. Games and illustration imitate both looks with shaders; see [[Cel Shading]].

E-readers and receipt printers, limited to black and white, still halftone everything they show.

## See also
- [[Color Quantization]]
- [[Pixel Art]]
- [[Metamerism]]
- [[ASCII Art]]
