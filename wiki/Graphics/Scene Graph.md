---
aliases:
  - Transform hierarchy
  - Scene hierarchy
tags:
  - graphics
summary: The tree of objects in a 3D scene where each node's position is relative to its parent, so moving a car moves its wheels and passengers, and the structure behind most editors, engines, and scene formats.
---
A **scene graph** is the data structure that organizes everything in a 3D scene as a tree of nodes. Each node can hold a transform, meaning a position, rotation, and scale, along with geometry, a light, a camera, or nothing at all. Its children are placed relative to it, so moving a node moves everything beneath it; see [[Hierarchical Data]].

A car is the classic example. The car body is a node; its four wheels are children, each spinning on its own axle; a driver sits in the seat as another child, with a hand on the wheel as a child of the arm. Driving the car only changes the body's transform, and everything else follows. To draw a node, the engine multiplies the transforms down the path from the root to that node, giving the node's position in the world; see [[Transformation Matrix]]. Character skeletons use the same idea, with bones as nodes; see [[Skeletal Animation]].

A scene graph is often not a strict tree. When the same object appears many times, such as a forest of identical trees, nodes can share one child, which makes the structure a [[Directed acyclic graph]] and saves memory, and renderers can draw the copies in one batch; see [[Draw Call]].

The graph also speeds up rendering:

- **Culling.** Each node can store a bounding volume enclosing everything beneath it. If the volume is out of view, the whole branch is skipped; see [[Culling]] and [[Bounding Volume Hierarchy]].
- **Cached transforms.** World positions are stored and recomputed only when an ancestor moves, flagged as dirty in the meantime.
- **State grouping.** Nodes that share materials can be drawn together, reducing costly state changes on the GPU.

Silicon Graphics' Open Inventor toolkit in the early 1990s made scene graphs the standard way to build 3D applications, and its file format was the basis of VRML, the 1990s attempt at 3D on the web. Pixar's Universal Scene Description, released as open source in 2016, is the scene graph format now shared between film studios and tools. Every major [[Game Engine]] presents a scene graph in its editor as a hierarchy of objects.

The idea extends beyond 3D. Vector drawing programs and SVG nest groups the same way, and a web page's [[Document Object Model]] is a tree that the browser's [[Compositor]] turns into layers; see [[Vector Graphics]].

Deep hierarchies have costs. Walking a tree jumps around memory, and engines that update thousands of objects per frame often flatten the hierarchy into arrays to keep the processor's cache full; see [[Locality of Reference]] and [[Entity Component System]].

## See also
- [[Game Loop]]
- [[Polygon Mesh]]
