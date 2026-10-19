---
aliases:
  - ViT
  - Patch embedding
  - Vision transformers
tags:
  - agents
summary: A neural network that treats an image as a sequence of small square patches and processes them with the same attention-based transformer used for text, which displaced convolutional networks across much of computer vision once trained on enough data.
---
For most of the 2010s, image recognition meant convolutional neural networks, which slide small filters across an image and build up from edges to textures to objects; see [[Convolution]] and [[ImageNet]]. The **Vision Transformer**, introduced by a Google team in a 2020 paper titled "An Image Is Worth 16x16 Words," showed that the architecture behind language models could do the job with almost no image-specific design.

The recipe is simple. An image is cut into a grid of patches, typically 16 by 16 pixels, so a 224-pixel image becomes 196 patches. Each patch is flattened and projected into a vector, the same kind of vector a word becomes in a language model; see [[Embedding]]. Position information is added so the model knows where each patch came from, and a standard transformer processes the sequence. Every layer lets each patch attend to every other, so information can flow across the whole image from the first layer; see [[Attention Mechanism]].

That freedom is also a handicap. A convolutional network is built to assume that nearby pixels matter together and that an object looks the same wherever it appears. A transformer assumes neither and must learn them from examples, so it needs much more data; see [[No Free Lunch Theorem]]. Trained only on ImageNet's million images, the original ViT trailed good convolutional networks. Pretrained on hundreds of millions of images first, it matched or beat them while using less compute to train, an instance of general methods winning once data and compute are plentiful; see [[Bitter Lesson]].

Follow-up work closed the data gap and adapted the design:

- **Data-efficient training** using heavy augmentation and distillation from a convolutional teacher made ViTs competitive on ImageNet alone; see [[Knowledge Distillation]].
- **Hierarchical variants** attend within local windows and merge patches stage by stage, giving dense tasks such as segmentation the multi-scale features they need; see [[Object Detection]].
- **Self-supervised pretraining**, such as hiding most patches and asking the model to reconstruct them, removed the need for labeled images; see [[Autoencoder]].

Vision transformers now sit inside much of modern AI. Image encoders trained to match pictures with captions are usually ViTs, and multimodal language models feed image patches into the same transformer as text; see [[Contrastive Learning]] and [[Multimodal Model]]. Many image generators use a transformer over patches of a compressed image as the denoising network; see [[Diffusion Model]].

Patches have costs. Attention grows with the square of the number of patches, so high-resolution images are expensive, and fine detail smaller than a patch can be lost. Convolutional networks, modernized with lessons from transformers, remain competitive, especially on small datasets and devices; see [[Computer Vision]].

## See also
- [[Transfer Learning]]
- [[Residual Connection]]
