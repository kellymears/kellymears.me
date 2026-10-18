---
aliases:
  - Keyframe
  - Tweening
  - Inbetweening
  - Animation curve
tags:
  - graphics
summary: Animating by setting a few key poses and letting assistants or software fill in the frames between, the workflow of hand-drawn studios carried into every animation tool and CSS transition.
---
**Keyframe animation** is the practice of defining motion by a few important poses, the keyframes, and filling in the frames between them. The term comes from hand-drawn studios, where a lead animator drew the key poses of a scene and assistants called inbetweeners drew the frames connecting them. Software took over the inbetweener's job, and the same split, a person choosing the poses and a system interpolating, now runs through every animation tool from film to web pages.

In hand-drawn work, keys were planned before anything else. Disney's animators distinguished **pose to pose**, drawing the keys first for control over timing and staging, from **straight ahead action**, drawing each frame after the last for loose, spontaneous motion like fire or splashing water; see [[Twelve Basic Principles of Animation]]. Timing charts on the key drawings told the inbetweeners how many frames to put between and how to space them.

In software, a keyframe stores a value at a time, a position, a rotation, a color, a slider. Between two keys the program computes in-between values, which is what "tweening" means:

- **Linear interpolation** moves at a constant rate and looks mechanical; see [[Linear Interpolation]].
- **Curves** let the animator shape the motion. Most tools draw each animated value as a graph over time, an animation curve, with handles that bend it into acceleration and deceleration; see [[Bézier Curve]] and [[Easing]].
- **Rotations** need care, since interpolating angles one axis at a time can take odd paths, so 3D tools interpolate orientations directly; see [[Quaternion]].

Much of the craft lives in the curve editor. Two animations with identical keys can feel heavy or light, sluggish or snappy, depending only on spacing, which is why animators talk about "ease in" and "ease out" as much as about poses.

Character animation in 3D sets keys on the controls of a rig, the skeleton of joints and handles that moves a mesh, rather than on every vertex; see [[Skeletal Animation]]. Keyframing competes there with recorded performance, where every frame comes from a real actor; see [[Motion Capture]]. Studios commonly combine them, capturing broad movement and keyframing faces, hands, and anything exaggerated. Drawing over recorded footage is the older hybrid; see [[Rotoscoping]].

The same model reached the web. Flash built its animation timeline on keyframes and motion tweens in the late 1990s, making it the tool for a generation of web cartoons and games; see [[Vector Graphics]]. CSS transitions and keyframe animations carry the idea into browsers, where a designer declares start and end states and the browser interpolates; see [[Motion Design]].

Interpolation also has a perceptual floor. Keys spaced too far apart produce motion that reads as a series of jumps rather than movement; see [[Apparent Motion]].

## See also
- [[Game Loop]]
- [[Procedural Generation]]
- [[Adobe Flash]]
- [[Stop Motion]]
