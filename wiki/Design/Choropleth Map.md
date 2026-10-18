---
aliases:
  - Thematic map
  - Choropleth
  - Cartogram
  - Bivariate map
tags:
  - design
summary: A map that shades each region by a statistic, the most common way to show geographic data and one of the easiest charts to make misleading.
---
A **choropleth map** colors each region, such as a country, state, or county, according to a statistic: unemployment rate, vote share, median income. Darker means more. Charles Dupin made the first known example in 1826, shading French departments by literacy, and the geographer John Kirtland Wright named the form in 1938, from Greek words for *area* and *multitude*. Election-night maps made it famous.

Its strength is that geographic patterns appear at once: regional clusters, borders where values jump, outliers surrounded by their opposite. Its weaknesses are just as built-in, and every one of them has misled readers.

- **Area is not importance.** Large, sparsely populated regions dominate the picture. A US county map of election results looks overwhelmingly one color even when the vote is close, because geographic size and population are unrelated. The color encodes a value, but the eye reads the amount of ink, a failure of [[Preattentive Processing]] working against the data.
- **Counts make population maps.** Shading by raw totals, such as number of cases, mostly shows where people live. Choropleths should show rates, such as cases per 100,000, the same correction for denominators that [[Base Rate Fallacy]] warns about.
- **Boundaries shape results.** Redraw the regions and the pattern can change, the *modifiable areal unit problem*. Aggregating can also reverse trends, a geographic form of [[Simpson's Paradox]], and inferring individual behavior from regional averages is the *ecological fallacy*.
- **Class breaks change the story.** Grouping values into bins by equal intervals, quantiles, or natural breaks yields very different maps from the same data. Continuous shading avoids arbitrary breaks but makes values harder to read.

Color choice follows the rules described under [[Color Scale]]: a sequential scale for magnitudes, a diverging scale when values sit above or below a meaningful midpoint, such as change from last year, and steps that are perceptually even, which spaces such as [[OKLCH]] make easier. Red-green scales fail for [[Color Vision Deficiency]]. Bivariate maps blend two scales to show two variables at once.

The projection matters too. A choropleth compares regions by color, but the eye also compares their sizes, so an equal-area [[Map Projection]] avoids inflating high-latitude regions the way Mercator does.

Alternatives address the area problem directly. **Cartograms** resize regions by population. Tile maps give every state an equal hexagon or square. Dot-density maps place one dot per so many people, and proportional symbols put a sized circle on each region. For change over time, a series of [[Small Multiples]] usually beats an animated map.

A choropleth is honest when it maps a rate, uses an equal-area projection, chooses breaks deliberately, and says what each color means. Following [[Data-Ink Ratio]], the base map should stay quiet so the data carries the contrast.

## See also
- [[Geospatial Data]]
- [[Pie Chart]]
- [[Heat Map]]
- [[Simpson's Paradox]]
- [[Data Visualization]]
- [[Treemap]]
