---
aliases:
  - Navmesh
  - Funnel algorithm
tags:
  - graphics
summary: A simplified map of a game world's walkable surfaces built from connected convex polygons, which computer-controlled characters search to plan routes around walls, drops, and obstacles.
---
A **navigation mesh**, or **navmesh**, is a simplified map of the places in a game world where characters can walk, made of connected convex polygons covering floors, ramps, and stairs. Computer-controlled characters use it to plan routes around walls, furniture, and drops; see [[Game AI]].

Earlier games often used waypoint graphs instead. Designers placed points through a level by hand and connected the ones a character could walk between. Characters could only move along those lines, which looked robotic; see [[Graph Traversal]]. A navmesh describes the walkable area itself. Because each polygon is convex, any two points inside it can be joined by a straight line that stays inside, so a character can move freely within a polygon and only needs planning to get from one to the next.

Finding a route works in two stages. First, a search over the polygons, treated as nodes of a graph connected where they share an edge, finds a corridor of polygons from start to goal, usually with the A* algorithm; see [[A-Star Search Algorithm]]. Second, the path is straightened. A common method, the **funnel algorithm**, pulls the route tight through the corridor's shared edges like a taut string, giving the shortest path within it, hugging corners only where needed.

Navmeshes are now usually generated automatically from level geometry. The widely used open-source library Recast, written by Mikko Mononen, converts the level to voxels, marks surfaces flat enough to walk on with enough headroom, shrinks them away from walls by the character's radius, and turns the result back into polygons; see [[Voxel]] and [[Polygon Mesh]]. Several major engines build on it or on similar approaches; see [[Game Engine]]. Some generators triangulate the walkable area instead; see [[Delaunay triangulation]].

A path is only part of the problem. Characters must also avoid each other and moving obstacles, which the static mesh doesn't know about. Local steering handles that: each agent adjusts its velocity frame by frame to keep clear of neighbors, with techniques related to flocking simulations; see [[Boids]].

Changing worlds complicate things. If a door closes or a wall is destroyed, parts of the mesh must be rebuilt, so engines divide it into tiles that can be regenerated independently; see [[Tile Map]]. Large open worlds need meshes too big to hold at once, loaded in pieces as the player moves; see [[Open World]]. Hierarchical schemes plan across coarse regions first, then refine the route locally; see [[Level of Detail]].

Different characters need different meshes. A large creature can't fit through gaps a person can, and a flying enemy ignores the floor entirely, so games often maintain several. Collisions with the world are still checked separately; see [[Collision Detection]].

## See also
- [[Mesh Simplification]]
- [[Animation Blending]]
- [[Catmull-Rom Spline]]
