---
aliases:
  - Lens ghosting
  - Anamorphic flare
tags:
  - graphics
summary: The streaks, rings, and ghost shapes that appear when bright light reflects between the glass elements inside a camera lens, a flaw lens makers fought with coatings and filmmakers and game artists later added on purpose.
---
A **lens flare** is the pattern of streaks, rings, and faint colored shapes that appears when a bright light shines into a camera lens. It's an optical flaw: light meant to pass straight through the glass is instead reflected back and forth between the lens's surfaces and lands where it doesn't belong; see [[Lens]].

A camera lens is a stack of glass elements, often ten or more, and every surface between glass and air reflects a few percent of the light that hits it; see [[Refraction]]. Most of that stray light is lost, but some bounces twice and reaches the sensor out of place. The result has two parts:

- **Ghosts.** Each pair of reflecting surfaces makes a dim copy of the bright source, often in the shape of the aperture, so a lens whose iris has six blades makes hexagons. The ghosts line up along a straight line through the light and the center of the image, and move along it as the light moves.
- **Veiling glare.** Light scattered more diffusely washes a haze over the whole image and lowers contrast.

Anti-reflection coatings, invented in the 1930s, cut the reflection at each surface to a fraction of a percent, using thin layers whose reflections cancel each other; see [[Wave Interference]]. Coatings made complex zoom lenses usable, and modern lenses flare far less than old ones. Starbursts, the spikes radiating from bright points, are a related effect caused not by reflection but by light bending around the edges of the aperture blades; see [[Diffraction]].

Filmmakers learned to use flare. **Anamorphic** lenses, which squeeze a widescreen image onto standard film, produce long horizontal streaks of blue light, and those streaks came to signal a big-budget science fiction look. J. J. Abrams's Star Trek in 2009 used flares so heavily they became a joke.

Computer graphics added flare to make rendered scenes look photographed. A typical game effect places a row of semi-transparent sprites along the line from the sun's screen position through the screen's center, scaling and fading them as the sun nears the edge; see [[Alpha Compositing]]. It must also check whether the sun is actually visible, or flares shine through walls, which engines handle with occlusion queries against the [[Depth Buffer]]. Overused flares became a cliché of late-1990s and 2000s games. Physically based approaches trace light through a model of the actual lens system for more realistic results.

Flare belongs with the other simulated camera imperfections, such as glow around bright areas, chromatic fringes, film grain, and depth of field, all applied as [[Post-Processing]]. They work best with [[High Dynamic Range]] rendering, since only light far brighter than white should flare; see [[Tone Mapping]].

## See also
- [[Image Sensor]]
- [[Motion Blur]]
- [[Aspect Ratio]]
- [[Blend Mode]]
