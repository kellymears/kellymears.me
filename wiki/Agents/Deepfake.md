---
aliases:
  - Synthetic media
  - Face swap
  - Liar's dividend
tags:
  - agents
summary: Video, images, or audio generated or altered by machine learning to show real people doing or saying things they never did, used mostly for abuse and fraud and hard to detect reliably.
---
**A deepfake** is a video, image, or audio clip generated or altered with machine learning to show a real person doing or saying something they never did. The name comes from a Reddit user called "deepfakes," who in late 2017 posted pornographic videos with celebrities' faces swapped in and released the code that made them.

The first face-swap tools used a pair of autoencoders sharing one encoder. The shared encoder learns a general description of a face, with its pose, expression, and lighting, and each decoder learns to draw one specific person. Encode a frame of person A and decode it with B's decoder, and B's face appears wearing A's expression; see [[Autoencoder]]. Later tools added adversarial training for sharper results, and current ones use diffusion models that can generate a whole scene from a text prompt; see [[Generative Adversarial Network]] and [[Diffusion Model]]. Cloning a voice now takes seconds of sample audio; see [[Voice cloning]].

Most of the harm so far isn't political:

- **Sexual abuse imagery.** A 2019 survey by the security firm Deeptrace found that 96 percent of deepfake videos online were nonconsensual pornography, nearly all of it targeting women. Cheap "nudify" apps have since spread the abuse to classmates and coworkers, and many places have passed laws against it.
- **Fraud.** Scammers clone a relative's voice for an urgent call asking for money. In 2024, an employee in the engineering firm Arup's Hong Kong office paid out about $25 million after a video call in which the other participants, including the apparent chief financial officer, were fakes; see [[Phishing]].
- **Politics.** Days before the 2024 New Hampshire primary, a robocall used a cloned voice of President Biden to tell people not to vote.

Detection is an arms race. Early fakes rarely blinked and had mismatched lighting and blurry teeth, and each tell was fixed soon after it was published. A face that's nearly right but subtly off can still unsettle viewers; see [[Uncanny Valley]]. Classifiers trained on one generator's output often fail on the next one's; see [[Distribution Shift]].

So effort has shifted from spotting fakes to proving originals. Cameras and editing software can sign content at capture and record each edit under a standard called [[C2PA]], and generators can mark their own outputs; see [[Provenance]]. Both work only if the signature survives the trip through social platforms, which often strip metadata.

The legal scholars Bobby Chesney and Danielle Citron named a subtler harm the **liar's dividend**. Once everyone knows convincing fakes exist, anyone caught on real video can claim it was faked, and some public figures have tried. Genuine recordings lose some of their power to settle arguments, which may outlast any particular fake.

## See also
- [[Multimodal Model]]
- [[Adversarial Example]]
- [[McGurk Effect]]
- [[Propaganda]]
