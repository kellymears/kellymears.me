---
aliases:
  - YOLO
  - Image segmentation
  - Non-maximum suppression
tags:
  - agents
summary: Finding every object in an image and drawing a box around each, from sliding-window face detectors through region proposals to single-pass networks like YOLO, with segmentation tracing exact outlines.
---
**Object detection** finds every object of interest in an image, says what each one is, and marks where it is, usually with a rectangle called a bounding box. It's harder than image classification, which assigns a single label to a whole picture, because the number of objects is unknown and each can appear at any position and size. Detection drives autofocus on faces, self-checkout scanners, traffic cameras, and the perception systems of self-driving cars, often alongside lidar; see [[Lidar]] and [[Image Sensor]].

Early detectors slid a window across the image at many scales and asked a classifier, at each position, whether it held the object. The 2001 Viola–Jones face detector made this fast enough for real time by using very simple features and a cascade that discarded most windows after a few cheap tests, and it put face boxes into consumer cameras. Hand-designed features, such as summaries of edge directions used for detecting pedestrians, dominated through the 2000s; see [[Convolution]].

Deep learning changed the field after 2012; see [[ImageNet]]. R-CNN (2014) proposed a few thousand candidate regions and classified each with a convolutional network, accurate but slow. Faster R-CNN learned the proposals too. **YOLO**, short for "You Only Look Once," introduced in 2015 by Joseph Redmon and colleagues, divided the image into a grid and predicted boxes and classes for every cell in a single pass, trading some accuracy for real-time speed. Later detectors replaced hand-tuned steps with attention, treating detection as predicting a set of objects directly; see [[Attention Mechanism]].

Several details are shared across methods:

- **Overlap.** Detectors compare boxes by intersection over union, the area two boxes share divided by the area they cover together.
- **Non-maximum suppression.** Detectors usually fire several overlapping boxes per object, so all but the highest-scoring box in each cluster are discarded.
- **Scoring.** Benchmarks such as COCO measure average precision across confidence thresholds and overlap requirements; see [[Precision and Recall]].

**Image segmentation** goes further, labeling every pixel. Semantic segmentation labels each pixel's category, while instance segmentation separates individual objects of the same kind, tracing exact outlines. Segmentation models trained on very large sets of masks can now outline nearly any object from a click or a text prompt; see [[Multimodal Model]].

Detectors fail in instructive ways. Stickers placed on a stop sign have caused misreadings, small or partly hidden objects are often missed, and performance drops on conditions underrepresented in training, such as night scenes or darker skin tones; see [[Adversarial Example]], [[Distribution Shift]], and [[Algorithmic Bias]]. In 2020, Redmon stopped doing computer vision research, citing its military applications and privacy risks.

## See also
- [[Optical Character Recognition]]
- [[Optical Flow]]
- [[Prefix Sum]]
- [[Data Labeling]]
- [[Canny Edge Detector]]
