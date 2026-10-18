---
aliases:
  - Rigging
  - Skinning
  - Inverse kinematics
  - IK
  - Bone animation
  - Blend shapes
tags:
  - graphics
summary: Animating a character by moving a hidden skeleton of joints that deforms its mesh, with inverse kinematics to plant feet and reach for objects.
---
In **skeletal animation**, a character's visible mesh is attached to a hidden hierarchy of *bones*, or joints, and animators move the skeleton instead of the surface. Rotating the upper arm carries the forearm, hand, and fingers with it, because each bone's position is defined relative to its parent. The mesh follows the bones through *skinning*: each vertex is assigned weights saying how strongly each nearby bone influences it, so skin near the elbow bends smoothly as a blend of upper and lower arm.

Before it became standard, many games stored a full copy of the mesh for every frame of animation, which took a lot of memory and couldn't adapt to the situation. A skeleton needs only joint rotations per frame, usually stored as a [[Quaternion]] per joint, and the same animation can play on any character that shares the skeleton.

Building the skeleton and weights is called *rigging*, a specialized craft. The simplest skinning method, linear blend skinning, has well-known flaws: joints that twist collapse into a thin "candy wrapper" shape, and elbows lose volume when bent. Dual quaternion skinning, introduced by Ladislav Kavan and colleagues in 2007, reduces these artifacts. Faces are usually animated differently, with *blend shapes* that morph between sculpted expressions, because subtle facial motion is hard to drive with bones and small errors push characters toward the [[Uncanny Valley]].

Animation data comes from keyframes set by animators, from motion capture of performers, or increasingly from both. Games then combine and adjust it at runtime:

- **Blending.** Walk and run cycles are blended by speed, and upper-body actions layer over lower-body movement. A [[Finite State Machine]] or blend tree decides which animations play and how they transition.
- **Inverse kinematics (IK).** Forward kinematics computes where a hand ends up from the joint angles. Inverse kinematics works backward from a goal: given where the foot should be, find the hip, knee, and ankle angles. Games use it to plant feet on uneven ground, aim weapons, and reach for door handles.
- **Ragdolls.** When a character goes limp, its bones are handed to the physics engine as linked rigid bodies.

Animation also has gameplay consequences. Attack and dodge timing in action games is authored as animation frames, the subject of [[Frame Data]], and collision volumes attached to bones become the [[Hitbox and Hurtbox]] that decide hits. Long wind-ups improve readability but can feel sluggish, a central tension in [[Game Feel]]. Skinning is usually computed on the GPU in a vertex [[Shader]], and distant characters use simplified skeletons and meshes through [[Level of Detail]]. Physically, a character's motion should respect its [[Center of Mass]], and animations that don't feel weightless.

## See also
- [[Motion Capture]]
- [[Transformation Matrix]]
- [[Sprite]]
- [[Twelve Basic Principles of Animation]]
- [[Polygon Mesh]]
- [[Verlet Integration]]
