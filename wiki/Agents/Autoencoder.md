---
aliases:
  - Latent space
  - Variational autoencoder
  - VAE
  - Encoder and decoder
tags:
  - agents
summary: A neural network trained to compress its input into a small code and rebuild it, which forces it to learn the data's essential structure, the latent space that modern image generators work in.
---
An **autoencoder** is a neural network trained to reproduce its input after squeezing it through a narrow middle. One half, the **encoder**, compresses the input into a small set of numbers called the *code* or *latent representation*. The other half, the **decoder**, reconstructs the original from that code. Training minimizes the difference between input and output.

Copying input to output sounds pointless, but the bottleneck makes it useful. If an image of 50,000 pixel values must pass through 64 numbers, the network can't memorize pixels; it must learn the features that matter most, such as shape, pose, and lighting, and discard the rest. No labels are needed, since the input is its own target, making autoencoders a form of self-supervised learning; see [[Supervised Learning]].

The space of possible codes is the **latent space**. Similar inputs land near each other there, and moving through it changes the output smoothly. With a well-trained model, interpolating between the codes of two faces produces a gradual morph between them; see [[Linear Interpolation]].

Variants:

- **Denoising autoencoders** are trained to reconstruct clean inputs from corrupted ones, learning to remove noise.
- **Variational autoencoders** (VAEs), introduced in 2013, encode each input as a probability distribution rather than a point, and are trained so the latent space is smooth and well filled. Sampling a random point and decoding it produces new, plausible data, making VAEs generative models.
- **Sparse autoencoders** limit how many code units can be active at once, encouraging each to represent a distinct feature. They're now a key tool for interpreting language models, decomposing internal activations into understandable features; see [[Superposition]] and [[Mechanistic Interpretability]].

Their largest modern role is inside image and video generators. Running a [[Diffusion Model]] directly on millions of pixels is expensive, so *latent diffusion*, the approach behind Stable Diffusion, first uses an autoencoder to compress images into a much smaller latent space, runs the diffusion process there, and decodes the result. Much of an image generator's fine detail, and some of its characteristic artifacts, come from that decoder. Adversarial training is often added to sharpen its output; see [[Generative Adversarial Network]].

Other uses:

- **Anomaly detection.** An autoencoder trained only on normal data reconstructs normal examples well and unusual ones poorly, so high reconstruction error flags anomalies.
- **Compression and features.** Learned codes serve as compact features for other models, a nonlinear form of [[Dimensionality Reduction]], and learned image and audio codecs use the same structure; see [[Data Compression]].

The encoder-decoder shape recurs throughout machine learning. The original transformer had an encoder and a decoder for translation, and modern [[Embedding]] models are essentially the encoder half alone. The general lesson, that forcing information through a bottleneck makes a model find structure, connects to ideas in [[Information Theory]] and [[Knowledge Distillation]].

## See also
- [[Neural Network]]
- [[Multimodal Model]]
- [[Hopfield Network]]
