---
aliases:
  - Unreal Engine
  - Unity engine
  - Godot
tags:
  - graphics
summary: The reusable software underneath a game, handling rendering, physics, audio, input, and tools, which went from in-house code to a licensed product after Doom and is now dominated by a few engines with outsized power over developers.
---
A **game engine** is the reusable software underneath a game: the code that draws the world, simulates physics, plays sound, reads input, loads assets, and runs the [[Game Loop]], along with the editor and tools that artists and designers use to build levels. The game itself is the content and rules placed on top.

The split between engine and content became explicit with id Software's Doom in 1993. Its code read levels, graphics, and sounds from separate data files, so players could build new levels without touching the program, and other studios could license the code to make different games; see [[Doom Engine]] and [[Game Modding]]. Through the 1990s, licensing engines from id and later Epic became a business of its own.

A modern engine typically includes:

- **Rendering**, sitting on a [[Graphics API]], with lighting, shadows, effects, and [[Level of Detail]].
- **Physics** for collisions and moving bodies; see [[Rigid Body Dynamics]].
- **Audio, input, networking, and animation**, including skeletons and blending; see [[Skeletal Animation]].
- **An object model**, often a [[Scene Graph]] of objects with attached components, or a stricter [[Entity Component System]].
- **Scripting**, so designers can write game logic without rebuilding the engine.
- **An asset pipeline** that converts models, textures, and audio into compact formats for each platform.
- **An editor**, the program where the game is actually assembled.

Three engines are best known today. **Unreal Engine** debuted with Epic's Unreal in 1998 and leads in high-end 3D, with features such as virtualized geometry; see [[Virtualized Geometry]]. Epic licenses it in exchange for a share of revenue above a threshold. **Unity**, launched in 2005, became the default for small studios and mobile games. In 2023 it announced a fee charged per install, faced a revolt from developers, and cancelled the fee in 2024. **Godot** is free and open source under the MIT license, and gained many users after Unity's announcement.

Engines shape the games built with them. A game made in an engine tends to inherit its defaults for lighting, physics feel, and camera, and experienced players can sometimes name the engine from a few seconds of footage. They also trade control for speed: engines ship features most games need, but performance problems inside the engine, such as [[Shader Compilation Stutter]], are hard for a studio to fix. Some large studios still build their own engines for that reason.

Owning the engine also means owning a dependency that lasts years. A studio that switches engines mid-project rebuilds much of its work, which gives engine makers leverage over pricing and terms; see [[Path Dependence]]. Long-lived engines also complicate keeping old games playable; see [[Game Preservation]].

## See also
- [[Animation Blending]]
- [[Decal]]
