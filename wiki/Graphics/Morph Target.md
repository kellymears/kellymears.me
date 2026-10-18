---
aliases:
  - Blend shape
  - Shape key
tags:
  - graphics
summary: Animating a mesh by storing several sculpted versions of its vertex positions and blending between them by weight, the standard technique for facial expressions and the corrections skeletons can't make.
---
A **morph target** is a sculpted variant of a 3D mesh, with the same vertices in different positions, that an animator can blend toward by a chosen amount. A face might have one target with a smile, another with closed eyes, another with raised brows. Setting the smile to half and the brows to full gives a half-smile with raised brows. The technique is called **blend shapes** in Maya and **shape keys** in Blender; see [[Polygon Mesh]].

The math is a weighted sum. Each target is stored as the difference between its vertices and the base mesh. To produce a frame, the renderer adds each difference times its weight, which usually runs from zero to one. Because every target shares the base mesh's vertices and their order, any combination is possible, and animating the weights over time with keyframes gives smooth motion; see [[Linear Interpolation]] and [[Keyframe Animation]].

Morph targets complement skeletons. Bones are good at rigid motion, such as an elbow bending or a jaw opening, but poor at soft, local shapes like a cheek bunching or lips pursing; see [[Skeletal Animation]]. Most characters use both. Bones handle the body and jaw, morph targets handle the face, and **corrective shapes** are triggered automatically when a joint bends far enough to fix the creases and collapses that skinning produces at shoulders and knees.

Faces are where the technique matters most. Many facial rigs are organized around the Facial Action Coding System, published by psychologists Paul Ekman and Wallace Friesen in 1978, which catalogs the individual muscle movements a face can make. A rig with one target per movement can produce any expression by combining them, and performance capture can drive the weights directly from an actor's face; see [[Motion Capture]]. Apple's face tracking for phones reports a few dozen blend shape weights per frame, which is how its animated emoji mirror a user's face in real time.

Faces are also where the technique struggles. Linear blends between shapes move vertices in straight lines, which can look wrong for motions that rotate, and combinations that the artist never sculpted can produce odd results. Realistic faces need hundreds of targets plus corrections for pairs of them, and small errors are noticed instantly; see [[Uncanny Valley]] and [[Mirror Neurons]].

The cost is mostly memory. Each target stores an offset for every vertex it moves, so detailed faces carry a lot of data, though targets usually store only the vertices that change. Engines apply the blend on the GPU, in a [[Shader]] or a compute pass, before skinning.

The same idea appears outside characters: a sail filling with wind, a door denting, or a [[Level of Detail]] transition that morphs geometry instead of popping.

## See also
- [[Photogrammetry]]
- [[Twelve Basic Principles of Animation]]
