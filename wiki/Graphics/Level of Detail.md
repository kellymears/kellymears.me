---
aliases:
  - LOD
tags:
  - graphics
summary: Swapping an object's representation for a cheaper one as it becomes less visually significant, usually with distance.
---
**Level of detail** is the practice of rendering an object at a fidelity matched to how much it actually contributes to the final image, rather than at its maximum quality regardless of context. A tree a few meters from the camera gets a full polygonal mesh with individual leaves; the same tree a kilometer away gets a few hundred triangles or a flat billboard, because no viewer can tell the difference at that distance and resolution.

The simplest scheme is **discrete LOD**: an artist or a decimation tool prebakes several mesh versions at descending triangle counts, and the engine swaps between them at distance thresholds. The classic failure mode is **popping** — a visible snap as the mesh suddenly changes silhouette or shading at the swap boundary — mitigated by cross-fading between levels or by adding **hysteresis**, switching at a slightly different distance going out than coming back, so an object hovering near the threshold doesn't flicker between levels every frame.

**Continuous LOD** avoids discrete swaps by progressively simplifying or refining a single mesh, collapsing or splitting edges smoothly as distance changes — harder to author but eliminates popping entirely. Modern engines increasingly use **virtualized geometry** (Unreal's Nanite is the best-known example), which streams and rasterizes only the mesh detail a pixel can actually resolve, blurring the line between LOD and continuous streaming.

The same idea generalizes past meshes: **impostors** replace a whole complex object with a flat, camera-facing billboard rendered from a precomputed image, and audio, physics, and AI systems apply their own versions of level of detail — a distant NPC gets a cruder simulation because no one is close enough to notice the difference.

## See also
- [[Ray Tracing]]
- [[Rasterization]]
- [[Physically Based Rendering]]
- [[Procedural Generation]]
