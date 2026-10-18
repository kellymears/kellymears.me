---
aliases:
  - Colormap
  - Color map
  - Viridis
  - Sequential palette
  - Diverging palette
  - Rainbow colormap
tags:
  - design
summary: The mapping from data values to colors in a chart or map, which should match the structure of the data, be perceptually even, and survive color blindness and greyscale.
---
A **color scale** maps data values to colors: low temperatures to pale blue and high to dark red, or each political party to its own hue. Color is immediate but easy to misuse, because equal steps in data don't produce equal steps in perceived color.

The scale should match the structure of the data. There are three basic kinds:

- **Sequential** scales show ordered values from low to high, mostly by changing lightness, from light to dark.
- **Diverging** scales run two hues outward from a meaningful midpoint, such as zero change, the average or 50%. Temperature anomalies, election swings and profit and loss suit them. Using one without a real midpoint invents a boundary that doesn't exist in the data.
- **Categorical** (qualitative) scales use distinct hues of similar lightness for unordered groups. People can reliably tell apart only about six to eight, so more categories need labels instead.

The cautionary example is the **rainbow colormap**, such as MATLAB's long-time default "jet". Its hues are unevenly spaced in perception: the bright yellow and cyan bands look like sharp boundaries where the data is smooth, and its lightness rises and falls, so it has no visual order and falls apart in greyscale. It is also poor for people with [[Color Vision Deficiency]]. In one 2011 study, doctors identifying artery disease from heart simulations performed measurably better with a diverging scale than with a rainbow.

Better scales are built in perceptual color spaces such as CIELAB or [[OKLCH]], where equal numeric steps look like equal visual steps. **Viridis**, designed in 2015 and made matplotlib's default in 2017, runs from dark blue through green to yellow. Its lightness increases evenly, it reads correctly in greyscale, and it remains usable with common forms of color blindness. Cynthia Brewer's ColorBrewer (2002) offers tested sequential, diverging and categorical palettes for maps.

Practical guidance:

- **Encode with lightness.** Lightness carries order more reliably than hue, a split the visual system makes early, per [[Opponent Process Theory]].
- **Check contrast.** The lightest steps must still be visible against the background, so test against [[Color Contrast]] guidelines and redo the scale for [[Dark Mode]], where a light-to-dark ramp may need reversing.
- **Mind the medium.** Screens apply [[Gamma Correction]], and wide-gamut displays render saturated colors that others clip, per [[Color Gamut]].
- **Always include a legend.** Color alone states no numbers.

Color is a weak channel for precise values, as rankings of [[Preattentive Processing]] show. It excels at revealing patterns across large areas, such as maps and heatmaps, and it should be applied consistently across [[Small Multiples]] so the same color always means the same value. In a design system, a chart palette belongs among the [[Design Token]] values like any other.

## See also
- [[Bar Chart]]
- [[Rainbow]]
- [[Treemap]]
- [[Weber-Fechner Law]]
- [[Choropleth Map]]
