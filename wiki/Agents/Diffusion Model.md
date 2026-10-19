---
aliases:
  - Diffusion models
  - Stable Diffusion
  - Latent diffusion
  - Text-to-image
  - Image generation
tags:
  - agents
summary: Generating images, video, and audio by learning to remove noise, then starting from pure static and denoising step by step toward something that matches a text prompt.
---
A **diffusion model** generates images, and increasingly video and audio, by learning to reverse the gradual destruction of data by noise. Training takes real images and adds random noise in many small steps until nothing but static remains. A [[Neural Network]] learns to predict, at each step, the noise that was added, so it can be subtracted. Generation runs the process backward: start from pure random static and remove a little predicted noise at a time, over dozens of steps, until a clean image emerges.

The approach was introduced by Jascha Sohl-Dickstein and colleagues in 2015, borrowing ideas from nonequilibrium thermodynamics, where a dye spreading through water is diffusion and its reverse is improbable without help. It became practical with Jonathan Ho, Ajay Jain, and Pieter Abbeel's 2020 paper on denoising diffusion, which produced images rivaling the generative adversarial networks then in favor, with more stable training.

Text control comes from **conditioning**. A text encoder, often one trained like CLIP to place matching images and captions near each other as an [[Embedding]], turns the prompt into vectors, and the denoiser attends to them through an [[Attention Mechanism]] at every step. *Classifier-free guidance*, from Ho and Tim Salimans, runs each step with and without the prompt and exaggerates the difference, trading variety for closer adherence, an effect similar to lowering [[Temperature Sampling]].

**Latent diffusion**, by Robin Rombach and colleagues, made the method cheap. Instead of denoising millions of pixels, it denoises a compressed representation produced by an autoencoder, then decodes the result to pixels. Released openly as Stable Diffusion in August 2022, it ran on consumer GPUs, arriving the same year as DALL·E 2 and Midjourney.

Diffusion differs from how a [[Large Language Model]] writes. A language model produces one token at a time, left to right; diffusion refines the whole output at once, coarse layout first and fine detail last.

Practical traits follow from the method:

- **Speed.** Many denoising steps make generation slow, so [[Knowledge Distillation]] trains students that need only one to four steps.
- **Editing.** Partially noising an existing image and denoising it with a new prompt edits it, the basis of inpainting and style transfer.
- **Randomness.** Different starting noise gives different images from the same prompt, a deliberate [[Nondeterminism]] fixed by setting a seed.
- **Weaknesses.** Hands, text in images, and counting were long-standing failures, improving with scale.

The same idea spread to video, 3D assets that feed [[Gaussian Splatting]], speech in [[Text-to-Speech]], and protein structure. It also raised hard questions: models trained on scraped artwork drew copyright lawsuits, and convincing fake images pushed industry toward provenance standards such as C2PA, which sign media at creation.

## See also
- [[Seam Carving]]
- [[Contrastive Learning]]
- [[Image Resampling]]
- [[World Model]]
- [[AI Watermarking]]
- [[Generative Adversarial Network]]
