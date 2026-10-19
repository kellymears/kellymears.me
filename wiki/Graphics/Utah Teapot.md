---
aliases:
  - Newell teapot
  - Stanford bunny
  - Cornell box
tags:
  - graphics
summary: The ordinary kitchen teapot that Martin Newell digitized in 1975 and that became computer graphics' standard test object, alongside the Stanford bunny and the Cornell box, as a shared benchmark and an in-joke.
---
The **Utah teapot** is a 3D model of an ordinary kitchen teapot that became the most famous test object in computer graphics. Martin Newell, a researcher at the University of Utah, digitized it in 1975. Needing something more interesting than cubes and spheres to test rendering, he sketched the teapot from his family's tea service on graph paper and described its shape with a few dozen curved patches; see [[Bézier Curve]].

The teapot was a good test for reasons that still hold. It is simple enough to model by hand but has features renderers find hard: curved surfaces in every direction, a handle and spout that cast shadows on the body and show through holes, and regions that curve both inward and outward, testing how shading and highlights behave; see [[Shading Model]]. Patches can be divided into as many triangles as wanted, so the same object can test both speed and quality; see [[Tessellation]] and [[Polygon Mesh]].

Utah's graphics program in the 1970s was a center of the field, and its researchers shared the data freely. Jim Blinn, among others, used the teapot constantly, and copies spread to labs everywhere. It picked up quirks along the way. The original data has no bottom, since the teapot sat on a table. Rendered versions are also squatter than the real teapot, a change usually traced to rescaling for a display whose pixels weren't square. The physical teapot is now in the Computer History Museum in California.

It became an in-joke as well as a benchmark. Pixar put it in *Toy Story* (1995) as a teapot at a tea party, it appears in early Windows screensavers, and many graphics libraries include a function that draws it in one line.

Other shared test objects followed:

- **The Stanford bunny.** A ceramic rabbit scanned in 1994 by Greg Turk and Marc Levoy, with tens of thousands of triangles, used to test algorithms for scanned and dense meshes; see [[Photogrammetry]].
- **The Cornell box.** A simple box with colored walls and a light in the ceiling, first used at Cornell University in 1984. A physical box was built so renderings could be compared with photographs, testing whether light bouncing between surfaces was computed correctly; see [[Global illumination]] and [[Rendering Equation]].

Shared test data is what made graphics research comparable: anyone could render the same object and compare speed and quality directly; see [[Benchmarking]] and [[Test Fixture]]. It also has costs. Familiar test cases invite tuning to them, and some test images carried baggage. The image-processing field's long-used "Lena" portrait, scanned from a 1972 magazine centerfold, was retired by major journals after years of objections, with IEEE ending its use in 2024; see [[JPEG]].

## See also
- [[Render Farm]]
- [[Graphics Pipeline]]
- [[Radiosity]]
- [[NURBS]]
- [[Reyes Rendering]]
