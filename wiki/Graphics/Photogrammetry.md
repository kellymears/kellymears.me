---
aliases:
  - Structure from motion
  - 3D scanning
  - Multi-view stereo
  - Point cloud
tags:
  - graphics
summary: Building 3D models from many overlapping photographs by working out where each photo was taken, the technique behind photoreal game assets, maps, and archaeological records.
---
**Photogrammetry** reconstructs the shape of objects and places from photographs. Take dozens or hundreds of overlapping photos of a rock, a statue, a building, or a landscape from different positions, and software can work out where each camera stood and recover the 3D geometry and surface color of what it saw. Surveyors measured terrain from paired photographs in the nineteenth century; computer vision automated it.

The modern pipeline has several stages:

1. **Feature matching.** Software finds distinctive points in each photo, such as corners and textured patches, and matches them across images. Algorithms such as David Lowe's SIFT, published in 1999, made matching robust to changes in scale and rotation.
2. **Structure from motion.** From the matched points, it solves for each camera's position and orientation along with a sparse **point cloud** of 3D positions, simultaneously.
3. **Multi-view stereo.** With cameras known, it estimates depth for nearly every pixel, producing a dense point cloud.
4. **Meshing and texturing.** The points become a [[Polygon Mesh]], and the photographs are projected onto it as textures through [[Texture Mapping]].

Tools include the open-source COLMAP and Meshroom, and RealityCapture, acquired by Epic Games in 2021.

Good captures follow rules that come straight from how matching works:

- **Even, diffuse light.** Overcast days are ideal. Harsh shadows get baked into the texture.
- **Texture and opacity.** Shiny, transparent, or featureless surfaces, such as glass, chrome, water, or white walls, confuse matching, since their appearance changes with viewpoint. Polarizing filters help, an application of [[Polarized Light]].
- **Overlap.** Each point should appear in many photos from varied angles.

Raw scans carry the lighting of the day they were shot, so artists *de-light* them, removing shading so the asset can be relit in a game engine with [[Physically Based Rendering]]. Scans also produce millions of polygons and need simplification and [[Level of Detail]] versions before real-time use, with fine detail moved into [[Normal Mapping]].

Games adopted the technique around 2014 and 2015. *The Vanishing of Ethan Carter* built its forests and buildings from scans, and *Star Wars Battlefront* scanned props and locations from the original films. Quixel's Megascans library, acquired by Epic in 2019, made scanned surfaces a standard part of game art. Microsoft Flight Simulator in 2020 streamed photogrammetry of whole cities from aerial imagery.

Beyond entertainment, photogrammetry measures construction progress, documents crime scenes and accident sites, maps terrain from drones, and preserves cultural heritage before it is lost, from archaeological digs to buildings at risk. Laser scanning with lidar measures distance directly and handles featureless surfaces better, but photogrammetry needs only a camera.

The same camera-solving step now feeds [[Gaussian Splatting]], which skips meshes entirely and represents captured scenes as fitted blobs, handling the reflective and fuzzy surfaces photogrammetry struggles with.

## See also
- [[Stereoscopy]]
- [[Virtualized Geometry]]
- [[Morph Target]]
- [[Utah Teapot]]
- [[Chroma Key]]
