---
aliases:
  - Chartjunk
  - Lie factor
  - Edward Tufte
  - Non-data ink
tags:
  - design
summary: Edward Tufte's principle that most of the ink in a chart should present data, and that gridlines, frames and decoration that don't carry information should be erased or muted.
---
The **data-ink ratio** is the share of a graphic's ink that presents data. Edward Tufte introduced it in *The Visual Display of Quantitative Information* (1983): divide the ink that would change if the data changed by the total ink used. His advice: erase ink that carries no information and mute ink that only supports it.

Typical non-data ink:

- **Heavy gridlines and frames.** Light gridlines help lookup; dark ones compete with the data.
- **Redundant encoding.** A bar chart that also prints each value above its bar, colors each bar differently and repeats the axis labels says the same thing three times.
- **Fake depth.** 3D bars and tilted pies add surfaces with no meaning and distort comparison, since the front of a tilted pie looks bigger than the back.
- **Patterns and texture.** Cross-hatching produces vibrating moiré effects that pull the eye away from the shapes.

Tufte called needless decoration **chartjunk**, and called charts built around an ornament "ducks", after a duck-shaped building in which the form overwhelms the function. He also defined the **lie factor**: the size of an effect shown in the graphic divided by the size of the effect in the data. A circle drawn with 50% more radius for a 50% larger value has more than double the area. Truncated axes, area-scaled icons and reshaped ranges distort in the same way, sometimes deliberately, in which case the chart is a [[Dark Pattern]].

The principle sits with [[Visual Hierarchy]] and [[White Space]]: remove what doesn't matter and what remains becomes easier to see. Muted context, such as grey axes and thin rules, lets one emphasized element stand out through [[Preattentive Processing]]. It also reduces [[Cognitive Load]], since the reader no longer has to filter decoration from data. The aesthetic matches [[Swiss Style]] and Tufte's own favored forms, [[Small Multiples]] and sparklines.

The principle has critics, and the evidence is mixed:

- **Memorability.** A 2010 study compared minimal charts with heavily illustrated ones in the style of the designer Nigel Holmes. Readers understood both equally well but recalled the embellished versions better weeks later. The [[Aesthetic-Usability Effect]] suggests attractive graphics also earn more patience.
- **Context.** Stripping a chart to the bare data can remove labels, annotations and reference lines that tell a non-expert what to look at. Annotation is non-data ink that often helps more than it costs.
- **Overshooting.** Taken literally, the rule erases axes and tick marks that readers need. Tufte himself said to maximize the ratio "within reason".

The durable lesson is to make every mark justify itself. Each element of a chart should either carry data or help the reader decode it. A [[Color Scale]] should encode a variable rather than decorate.

## See also
- [[Small Multiples]]
- [[Visual Hierarchy]]
- [[Preattentive Processing]]
- [[White Space]]
- [[Choropleth Map]]
