---
aliases:
  - GAN
  - GANs
  - Generator and discriminator
  - Adversarial training
tags:
  - agents
summary: Two neural networks trained against each other, one forging data and one detecting forgeries, which produced the first strikingly realistic generated images before diffusion models took over.
---
A **generative adversarial network** (GAN) trains two neural networks against each other. The **generator** turns random noise into fake examples, such as images. The **discriminator** looks at a mix of real and fake examples and tries to tell them apart. Each improves by exploiting the other's weaknesses: the discriminator learns to spot fakes, and the generator learns to fool it. If training goes well, the generator ends up producing examples the discriminator can't distinguish from real ones.

Ian Goodfellow proposed GANs in 2014, reportedly sketching the idea after an argument in a bar and coding it that night. The analogy often used is a counterfeiter and a detective: as the detective gets better at spotting fake bills, the counterfeiter must get better at making them. Formally it's a two-player game, and training seeks an equilibrium where neither can improve; see [[Prisoner's Dilemma]] for game-theoretic equilibria.

Both networks learn by [[Gradient Descent]], with the twist that the generator's gradient comes from the discriminator: it adjusts its output in whatever direction would make the discriminator more likely to call it real; see [[Backpropagation]]. No one tells the generator what a face looks like. It learns only from the discriminator's judgments, which learn from real examples.

Progress was fast. By 2018, NVIDIA's StyleGAN produced photorealistic faces of people who don't exist, and the website "This Person Does Not Exist" made the results famous. GANs were used for image-to-image translation, turning sketches into photos, day scenes into night, and horses into zebras; for upscaling low-resolution images; and for generating training data.

GANs are also notoriously hard to train:

- **Mode collapse.** The generator finds a few outputs that fool the discriminator and produces only those, losing variety.
- **Instability.** The two networks can oscillate instead of converging, or one can overwhelm the other so learning stalls.
- **Evaluation.** There's no direct measure of how well the generator models real data, only indirect scores.

[[Diffusion Model]]s largely replaced GANs for image generation from about 2021. Diffusion training is stable, covers the full variety of the data, and conditions easily on text prompts. GANs remain in use where speed matters, since they generate in a single pass rather than many denoising steps, and their adversarial losses still sharpen outputs inside other systems, such as the decoders that turn compressed representations back into images; see [[Autoencoder]].

The adversarial idea outlived the architecture. Pitting a system against an opponent that searches for its failures is now common: red-teaming language models, [[Fuzzing]] software, and training classifiers on deliberately crafted inputs. GANs also made realistic fake media cheap, which brought deepfakes and the need for detection and provenance tools; see [[Provenance]].

## See also
- [[Adversarial Review]]
- [[Neural Network]]
- [[Convolution]]
- [[Adversarial Example]]
- [[Self-Play]]
- [[Deepfake]]
