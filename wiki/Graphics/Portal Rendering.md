---
aliases:
  - Portal culling
  - Cells and portals
tags:
  - graphics
summary: A visibility technique that divides indoor scenes into rooms joined by openings and draws only what can be seen through each doorway in turn, which also allows mirrors and rooms that connect in impossible ways.
---
**Portal rendering** is a technique for drawing indoor scenes by dividing them into rooms, called cells, connected by openings, called portals, such as doors and windows. The renderer draws the room the camera is in, then looks through each visible portal into the next room, drawing only what can be seen through the opening. Rooms that no chain of portals can reach aren't drawn at all; see [[Culling]].

The method exploits the structure of buildings. From inside a room, most of a level is hidden behind walls. Testing every object against the view would waste work, and drawing everything would waste far more; see [[Draw Call]]. Portals give a cheap way to know what might be visible. Each time the renderer passes through a portal, it narrows the viewing region to the portal's outline, so a distant room seen through two doorways is clipped to the small area visible through both; see [[Perspective Projection]].

The approach grew out of early 1990s research, including work by Seth Teller and Carlo Séquin on precomputing visibility in architectural models. Games adopted many variants. The Build engine behind Duke Nukem 3D, released in 1996, drew its levels as sectors linked through their edges, while id Software's engines took a different route, sorting space with trees and precomputing which regions could see which; see [[Doom Engine]] and [[Spatial Partitioning]].

Portals allow a striking trick: nothing requires the room behind a portal to be the one geometrically next to it. A doorway can lead somewhere else entirely, or to a space larger than the building that contains it. The Build engine allowed overlapping rooms this way, and games have used it for impossible architecture; see [[Scene Graph]].

Mirrors work similarly. The renderer draws the scene again from a reflected camera and shows the result only within the mirror's outline; see [[Stencil Buffer]]. Unlike reflections computed from what's already on screen, this shows objects that the main view can't see; see [[Screen Space Reflections]].

Valve's 2007 game Portal turned the idea into a mechanic. Players open linked holes in surfaces and can see, and walk, through one into the other. The renderer draws the scene from a virtual camera behind the other portal, and repeats the process to a limited depth when two portals face each other; see [[Recursion]].

Portals work best indoors. Outdoor scenes, with wide views and few natural openings, suit other methods, such as simplifying distant objects; see [[Level of Detail]]. The technique also shaped level design: maps built from rooms joined by narrow passages run faster, so designers learned to break sight lines deliberately with bends and doorways; see [[Level Design]].

## See also
- [[Ray Casting]]
- [[Constructive Solid Geometry]]
- [[Clipping]]
