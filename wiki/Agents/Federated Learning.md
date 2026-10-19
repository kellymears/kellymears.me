---
aliases:
  - On-device learning
  - Secure aggregation
tags:
  - agents
summary: Training a shared model across many phones or institutions without collecting their data, by sending the model to the data and only the updates back, a privacy gain with real limits.
---
**Federated learning** trains a shared model across many devices or organizations without gathering their data in one place. Instead of uploading data to the model, it sends the model to the data, and each participant returns only an update. Google researchers named and described the approach in 2016 and used it to improve next-word suggestions on Android's keyboard; see [[Autocomplete]].

A round works like this:

1. A central server sends the current model to a sample of devices, typically ones that are idle, charging, and on wifi.
2. Each device trains on its own data for a few steps; see [[Gradient Descent]].
3. Each sends back the change to the model's weights, not the data.
4. The server averages the changes, weighted by how much data each device used, and starts the next round.

The appeal is [[Data minimization]]. Typed messages, health readings, or hospital records stay where they are, which matters for privacy law and for organizations that can't legally share. Hospitals have used it to train diagnostic models jointly without exchanging patient files. Because the computation happens on the device, it fits the broader shift toward [[Edge Computing]].

Updates aren't as harmless as they look. Researchers have shown that the changes a model makes after seeing data can sometimes be inverted to reconstruct that data, including recognizable images from a single batch. Two defenses are standard:

- **Secure aggregation** is a cryptographic protocol that lets the server learn only the sum of many devices' updates, never any single one; see [[Public-Key Cryptography]].
- **Differential privacy** clips each update's size and adds noise, so no one person's data can shift the result much; see [[Differential Privacy]].

The setting also brings problems ordinary training doesn't have. Each person's data is unlike the average: one user types in Portuguese, another mostly in emoji. Averaging updates from such different data trains more slowly and can serve some groups worse than others; see [[Distribution Shift]]. Devices drop out mid-round. And because the server can't inspect the data, a participant can send poisoned updates to plant a backdoor; see [[Data poisoning]]. The problem resembles tolerating faulty or lying participants in [[Byzantine Fault Tolerance]], and robust averaging methods help at some cost in accuracy.

Communication is usually the bottleneck. A phone uploading a full set of model weights every round costs bandwidth and battery, so updates are compressed and devices train for several local steps between rounds.

Removing a person's contribution after training is no easier than in a central model, since their update is already blended into everyone's weights; see [[Machine Unlearning]].

Federated learning reduces what gets collected, but on its own it doesn't guarantee privacy.

## See also
- [[Synthetic Data]]
- [[Algorithmic Bias]]
