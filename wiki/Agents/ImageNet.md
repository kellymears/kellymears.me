---
aliases:
  - AlexNet
  - ImageNet Challenge
  - ILSVRC
tags:
  - agents
summary: The labeled image dataset of over 14 million photos and the annual competition built on it, where a neural network trained on GPUs in 2012 won by such a margin that it launched the deep learning era.
---
**ImageNet** is a dataset of more than 14 million photographs, each labeled with what it shows, organized into about 22,000 categories. Begun by Fei-Fei Li in 2007 and first presented in 2009, it was built on a bet that computer vision was held back less by algorithms than by data: models trained on a few thousand images couldn't learn the variety of the visual world; see [[Supervised Learning]].

The categories came from WordNet, a hierarchy of English nouns, so "Siberian husky" sits under "dog," under "mammal," and so on; see [[Taxonomy]]. Images were gathered by searching the web for each term, then checked by workers on Amazon Mechanical Turk, a crowdsourcing platform paying small sums per task, who confirmed whether each image matched its label. At its peak the project employed tens of thousands of workers across many countries.

From 2010 to 2017 the **ImageNet Large Scale Visual Recognition Challenge** gave teams a subset of 1,000 categories and about 1.2 million training images, and scored them on how often the correct label was missing from their five best guesses. For two years, the winners used hand-designed image features and classical classifiers, improving steadily but slowly; see [[Support Vector Machine]].

In 2012, a team from the University of Toronto, Alex Krizhevsky, Ilya Sutskever, and Geoffrey Hinton, entered a deep neural network later called **AlexNet**. It reached a top-5 error of about 15 percent, against about 26 percent for the runner-up, an unusually large gap in a field used to small gains. It was a convolutional network, an idea from the 1980s, made practical by the scale of ImageNet and by training on two consumer graphics cards; see [[Convolutional neural network]] and [[Graphics Processing Unit]]. Within two years nearly every entrant used deep networks; see [[Bitter Lesson]].

Progress after that was rapid. In 2015, very deep networks with skip connections went below the roughly 5 percent error estimated for a trained human on the same task; see [[Residual Connection]]. Networks pretrained on ImageNet became a standard starting point for other vision tasks, since their learned features transferred well; see [[Fine-Tuning]].

ImageNet also became an example of benchmark problems. Some labels were wrong or ambiguous, and models later shown to rely on texture and background rather than shape scored well anyway; see [[Goodhart's Law]] and [[Benchmark Contamination]]. The person categories, inherited from WordNet, included offensive and judgmental labels applied to photos of real people. After a 2019 art project by Kate Crawford and Trevor Paglen showed this publicly, the team removed many of those categories and images; see [[Algorithmic Bias]].

The broader lesson stuck: large, labeled datasets and enough computation can matter more than clever design, which later shaped work on language; see [[Scaling Laws]] and [[Pretraining]].

## See also
- [[Object Detection]]
- [[Batch Normalization]]
