---
aliases:
  - Plenoptic function
  - Plenoptic camera
  - Light field display
tags:
  - graphics
summary: A description of all the light flowing through a region of space, recording the color and brightness of every ray in every direction, which allows images to be refocused after capture and scenes to be viewed from new positions.
---
An ordinary photograph records how much light reaches each point on a sensor, summed over all the directions it came from. A **light field** keeps the directions too. It describes the radiance traveling along every ray through a region of space: for each position and each direction, the color and intensity of the light moving that way.

In 1991 Edward Adelson and James Bergen defined the **plenoptic function**, from the Latin for "full" and "of seeing," as the intensity of light seen from any position, in any direction, at any wavelength and time. Leaving out wavelength and time leaves five dimensions. In empty space, light along a ray doesn't change until it hits something, so outside the objects in a scene the function reduces to four dimensions. That simplification made light fields practical.

In 1996 two papers, "Light Field Rendering" by Marc Levoy and Pat Hanrahan and "The Lumigraph" by a group at Microsoft Research, showed that a scene could be captured as a four-dimensional set of images and rendered from new viewpoints by looking up and blending rays, with no geometric model at all; see [[Ray Tracing]] and [[Image-Based Lighting]]. Rendering cost depends only on the image size, not on scene complexity, so a forest costs no more to display than a wall. The price is storage, since thousands of images are needed to cover even a small range of viewpoints.

Capturing a light field requires sampling many directions at once:

- **Camera arrays.** Rows of cameras record the scene from slightly different positions. Researchers at Stanford built arrays of around a hundred cameras.
- **Plenoptic cameras.** A sheet of tiny lenses in front of the sensor splits the light arriving at each spot by direction; see [[Lens]] and [[Image Sensor]]. Lytro sold consumer cameras built this way starting in 2012, letting people refocus a photograph after taking it, but the company shut down in 2018. The design trades resolution for direction: most pixels go to recording angles rather than detail.

Refocusing works because a light field contains enough information to simulate any focus distance and aperture, computing the photograph a real lens would have made; see [[Post-Processing]].

**Light field displays** run the process in reverse, sending different light in different directions so that each eye, and each viewing position, sees a slightly different image without glasses. Lenticular sheets on postcards are a simple version; see [[Stereoscopy]] and [[Holography]]. Headsets that present correct focus cues could reduce the eye strain caused by screens at a fixed focal distance; see [[Virtual Reality]].

The volume of data is the main obstacle. Recent methods represent a scene compactly and render it from any viewpoint, which amounts to learning a light field together with rough geometry; see [[Gaussian Splatting]] and [[Photogrammetry]].

## See also
- [[Rendering Equation]]
- [[Perspective Projection]]
