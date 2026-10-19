---
aliases:
  - CSG
  - Solid modeling
tags:
  - graphics
summary: Building complex shapes by combining simple solids with union, intersection, and difference, the basis of mechanical CAD, early level editors, and programmable modeling tools.
---
**Constructive solid geometry** (CSG) builds complex shapes by combining simple solids, such as boxes, spheres, cylinders, and cones, with three operations. **Union** joins two shapes into one. **Intersection** keeps only the space they share. **Difference** subtracts one shape from another, the way a drill removes a cylinder from a block. A bolt hole, a rounded bracket, or a castle wall with windows can be described this way in a few steps.

A CSG model is a tree. Leaves are primitive shapes with positions and sizes, and each internal node combines its children with one of the operations. The tree is a program for producing the shape rather than the shape itself, so editing a single number, such as a hole's diameter, updates the whole model; see [[Abstract Syntax Tree]]. The operations correspond directly to logic: a point is inside a union if it is inside either shape, inside an intersection if inside both; see [[Boolean Algebra]].

CSG grew from 1970s research on solid modeling for manufacturing, where engineers needed descriptions that are always physically valid, with a well-defined inside and outside. It remains at the heart of mechanical CAD. The company MAGI rendered CSG models directly for some of the computer graphics in *Tron* (1982).

How CSG is rendered depends on the representation:

- **Ray tracing** handles CSG naturally. Each ray finds the intervals where it is inside each primitive, then combines those intervals with the tree's operations; see [[Ray Tracing]].
- **Meshes** require computing the actual intersection curves between surfaces and stitching new triangles; see [[Polygon Mesh]]. This is notoriously fragile: nearly coincident faces and rounding errors produce holes, slivers, and crashes; see [[Floating-Point Arithmetic]].
- **Distance fields** make CSG almost trivial. Union is the minimum of two distances, intersection the maximum, and difference uses negation. Smooth variants blend shapes together organically, a staple of the [[Demoscene]]; see [[Signed Distance Field]] and [[Ray Marching]].
- **Voxels** apply the operations cell by cell, which suits sculpting and destructible terrain; see [[Voxel]] and [[Marching Cubes]].

Game level editors relied on CSG for decades. In *Quake* and *Unreal*, designers built rooms from convex "brushes," adding or carving solid space, and the editor compiled the result into a tree that sped up rendering and collision; see [[Spatial Partitioning]] and [[Level Design]]. The approach suited the blocky architecture of the era and gave way to imported meshes as detail increased.

Programmers' modeling tools such as OpenSCAD describe objects for 3D printing entirely as code, combining primitives with these operations, so a part can be resized by changing one parameter; see [[Procedural Generation]].

## See also
- [[NURBS]]
- [[Tessellation]]
