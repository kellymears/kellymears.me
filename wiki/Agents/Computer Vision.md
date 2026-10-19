---
aliases:
  - Machine vision
  - Image understanding
tags:
  - agents
summary: The field of getting computers to extract meaning from images and video, from reading text and finding objects to reconstructing 3D scenes, which went from hand-built rules to learned neural networks after 2012 and now underpins cars, phones and factories.
---
**Computer vision** is the effort to give machines a useful understanding of what images contain. It covers recognizing what is in a picture, locating and outlining things, tracking motion across frames, measuring depth, and reconstructing the three-dimensional world from flat pixels; see [[Image Sensor]]. It is the inverse of rendering: graphics turns a scene description into an image, vision tries to recover the scene from the image.

The field's early optimism became a legend. A 1966 MIT project proposed connecting a camera to a computer and having it describe what it saw as a summer task. Decades of work followed, because seeing, effortless for people, turned out to be one of the hardest problems in AI; see [[Moravec's Paradox]].

For most of its history, computer vision was engineered by hand. Researchers designed algorithms to find edges, corners and distinctive keypoints, matched those features across images, and fed them to classifiers; see [[Canny Edge Detector]]. Geometry did much of the work and still does: knowing how a camera projects the world onto a sensor lets software triangulate depth from two views, stitch panoramas and build 3D models from photo collections; see [[Photogrammetry]]. Estimating apparent motion between frames supports video compression and stabilization, and lets robots and drones judge how fast the world is moving past them.

The turning point came in 2012, when a deep convolutional network trained on GPUs won the ImageNet recognition challenge by a wide margin; see [[ImageNet]]. Within a few years, learned features had replaced hand-designed ones for nearly every task, and the same networks proved transferable: models pretrained on large image collections could be fine-tuned for medical scans or factory inspection with modest data; see [[Transfer Learning]]. Transformers later joined and partly displaced convolutional networks; see [[Vision Transformer]].

Core tasks now include:

- **Classification**, naming what an image shows.
- **Detection and segmentation**, finding and outlining each object; see [[Object Detection]].
- **Text reading**, turning photographed or scanned text into characters; see [[Optical Character Recognition]].
- **Generation and editing**, the reverse direction, producing images from descriptions; see [[Diffusion Model]].

Applications range from unlocking a phone with a face and sorting parcels to driver assistance, crop monitoring and reading radiology images. Self-driving cars combine several of these tasks at once, in real time, with lives at stake. Multimodal models now let language models answer questions about images directly; see [[Multimodal Model]].

Vision systems remain brittle in ways human vision isn't. Imperceptible pixel changes can flip a classification, and models trained in one setting can fail in another, such as different lighting, hospitals or cameras; see [[Adversarial Example]]. Face recognition in particular has raised concerns about surveillance and unequal error rates across groups; see [[Algorithmic Bias]].

## See also
- [[Natural Language Processing]]
- [[Optical Flow]]
