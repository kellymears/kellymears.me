---
aliases:
  - Principles of animation
  - Squash and stretch
  - The Illusion of Life
tags:
  - graphics
summary: Disney's guidelines for making movement feel alive, from squash and stretch to anticipation and follow-through, still the shared vocabulary of animation in film, games, and interfaces.
---
The **twelve basic principles of animation** are guidelines for making drawn movement feel alive, set out by Disney animators Ollie Johnston and Frank Thomas in their 1981 book *The Illusion of Life*. They distilled what the studio had learned since the 1930s, and they remain the standard vocabulary for animation in film, games, and interfaces.

1. **Squash and stretch.** Objects deform as they move and collide, keeping their volume, which conveys weight and flexibility.
2. **Anticipation.** A small movement the other way before the main action, like crouching before a jump, tells the audience what's coming.
3. **Staging.** Present one idea at a time, clearly; see [[Visual Hierarchy]].
4. **Straight ahead and pose to pose.** Draw frames in order for fluid action, or draw key poses first and fill in between them for control.
5. **Follow-through and overlapping action.** Hair and clothing settle after the body stops, and different parts move at different rates.
6. **Slow in and slow out.** Motion accelerates from rest and decelerates into it; see [[Easing]].
7. **Arcs.** Natural movement follows curved paths.
8. **Secondary action.** Smaller gestures support the main one.
9. **Timing.** The number of frames an action takes sets its weight and mood.
10. **Exaggeration.** Push poses and motion past realism so they read.
11. **Solid drawing.** Draw forms as three-dimensional volumes with weight and balance.
12. **Appeal.** Characters, heroes or villains, should be engaging to watch.

Computer animation inherited them almost directly. Pose to pose became keyframing: animators set key poses and software fills the in-betweens, by default with stiff [[Linear Interpolation]]. Animators reshape the timing with curves, usually [[Bézier Curve]]s, to restore slow in and slow out. Characters bend through [[Skeletal Animation]], and follow-through is often simulated, with hair and cloth driven by physics; see [[Verlet Integration]]. John Lasseter's 1987 paper applying the principles to 3D animation helped set Pixar's style.

Games lean on them for readability. An enemy's wind-up before an attack is anticipation, and it's how players learn to react, a tradeoff measured in [[Frame Data]]. Too much anticipation in the player's own actions makes controls feel sluggish. Squash, stretch, and exaggeration are much of what makes jumping and hitting satisfying; see [[Game Feel]].

Interfaces use a restrained subset: easing, a little follow-through on a panel sliding into place, and elements entering one after another; see [[Motion Design]] and [[Staggered Animation]]. Restraint matters, because motion can make some people ill; see [[Reduced Motion]].

The principles describe what audiences read as alive, which isn't the same as accurate. Motion recorded from actors often looks floaty or flat until exaggeration is added back; see [[Motion Capture]] and [[Uncanny Valley]].

## See also
- [[Keyframe Animation]]
- [[Apparent Motion]]
