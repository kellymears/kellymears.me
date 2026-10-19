---
aliases:
  - Light table
  - Ghost frames
tags:
  - graphics
summary: The animator's technique of seeing faint copies of neighboring frames while drawing the current one, born on backlit tables of translucent paper and now a standard overlay in every digital animation tool.
---
**Onion skinning** is a technique for drawing animation in which the frames before and after the current one appear faintly behind it. Seeing where a character was a moment ago, and where it's going, lets the animator judge spacing, arcs, and timing directly instead of guessing. The name comes from onion skin paper, a thin, translucent paper animators once drew on so they could see earlier drawings through it.

In hand-drawn animation, the setup is a **light table**: a drawing surface with a backlit panel of frosted glass. Animators stack several sheets of paper on pegs that keep them aligned, and the light shines through all of them. They flip between sheets with their fingers, a practice called rolling or flipping, to see the motion; see [[Apparent Motion]]. The method supported the classic workflow in which lead animators draw key poses and assistants draw the frames in between; see [[Keyframe Animation]].

Digital tools reproduce the effect as an overlay. The current frame is drawn at full strength, and neighboring frames appear as semi-transparent ghosts, blended over each other; see [[Alpha Compositing]]. Many programs tint them, often one color for previous frames and another for following frames, and let the animator choose how many to show and how quickly they fade. Adobe Flash made the feature familiar to a generation of web animators; see [[Adobe Flash]]. It's standard in 2D animation software, sprite editors, and drawing tools on tablets; see [[Sprite]] and [[Pixel Art]].

The technique supports several of the principles of animation:

- **Arcs.** Natural motion follows curved paths, and seeing several positions at once reveals whether a movement curves smoothly; see [[Twelve Basic Principles of Animation]].
- **Spacing.** The distance between successive drawings controls speed and easing. Ghosts that bunch together mean slow motion; spread out, fast; see [[Easing]].
- **Volume consistency.** Comparing a shape across frames shows when it accidentally grows or shrinks.
- **Smears and stretches.** Exaggerated in-between drawings for very fast motion are easier to judge against their neighbors; see [[Smear Frame]].

Stop-motion animators use a related feature. Frame capture software overlays a live camera view with the previous captured frame, so the animator can nudge a puppet just the right distance; see [[Stop Motion]]. Rotoscoping tools similarly let artists see live-action footage through their drawings; see [[Rotoscoping]].

In 3D animation, onion skinning shows ghosted copies of a posed model at nearby frames, alongside motion paths that trace a joint's trajectory; see [[Skeletal Animation]].

The technique reflects a general principle of interface design: showing context visually instead of making people hold it in memory. Comparing frames by flipping relies on the brief persistence of what was just seen; overlays make the comparison immediate; see [[Working Memory]].

## See also
- [[Motion Design]]
- [[Morph Target]]
