---
aliases:
  - Color blindness
  - Colour blindness
  - Daltonism
  - Deuteranopia
  - Protanopia
tags:
  - design
summary: Reduced ability to tell certain colors apart, affecting about one in twelve men, and the reason interfaces should never rely on color alone to carry meaning.
---
**Color vision deficiency**, commonly called color blindness, is a reduced ability to distinguish certain colors. Most see a full range of colors but confuse some that others tell apart easily, most often reds and greens.

Normal color vision uses three types of cone cells in the retina, sensitive to long, medium, and short wavelengths, roughly red, green, and blue. The brain then compares their signals in opposing pairs, red against green and blue against yellow, as described by [[Opponent Process Theory]]. A deficiency arises when one type of cone is missing or its sensitivity is shifted:

- **Deuteranomaly and deuteranopia** affect the medium-wavelength, green-sensitive cones. Deuteranomaly, a shifted green cone, is the most common form.
- **Protanomaly and protanopia** affect the long-wavelength, red-sensitive cones. Reds also look darker.
- **Tritanomaly and tritanopia** affect the blue-sensitive cones and confuse blue with green and yellow with violet. These are rare.
- **Monochromacy**, true absence of color vision, is very rare.

The genes for the red and green pigments sit on the X chromosome, so red-green deficiency is far more common in men, who have one X, than in women, who have two. About 8 percent of men of Northern European ancestry have it, compared with about 0.5 percent of women. The chemist John Dalton described his own case in 1798, which is why the condition is sometimes called *Daltonism*.

For designers, the central rule is to **never use color as the only way to convey information**. The Web Content Accessibility Guidelines make this a requirement. Familiar failures include form errors shown only by a red border, charts whose lines differ only by hue, and status lights that use green for good and red for bad with no other difference. Fixes are simple: add icons, text labels, patterns, or line styles, and ensure the colors differ in lightness, not just hue. Lightness differences survive almost every kind of color vision deficiency, which is also why sufficient [[Color Contrast]] helps.

Choosing colors in a perceptual space such as [[OKLCH]] makes it easier to control lightness separately from hue. Palettes have been designed specifically for color-deficient viewers, such as the Okabe-Ito palette and the viridis color map, which became the default in the matplotlib plotting library in 2015. Browser developer tools and design tools can simulate the common deficiencies, a quick check worth running on any chart or status display.

Color vision deficiency also affects [[Dark Mode]] themes and brand palettes, which should be checked in each variant, and [[Design Token]] systems can encode safe pairings once so every team uses them. Making meaning independent of color helps more than the color-deficient: it helps on bad screens, in sunlight, in grayscale printing, and for anyone glancing quickly, a recurring pattern in [[Accessibility]].

## See also
- [[Blind Spot]]
- [[Astigmatism]]
- [[Synesthesia]]
- [[Heat Map]]
- [[Bullet Graph]]
