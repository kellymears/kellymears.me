---
aliases:
  - Data parallelism
  - Tensor parallelism
  - Pipeline parallelism
  - Model parallelism
  - All-reduce
tags:
  - agents
summary: Training one neural network across many accelerators at once by splitting the data, the layers or the individual matrices among them, the engineering that makes large models possible and whose bottlenecks are communication, memory and hardware failure.
---
Large neural networks are too big and too slow to train on one chip. A frontier language model may need more memory for its weights and optimizer state than any single accelerator holds, and more computation than one could perform in a lifetime. **Distributed training** splits the job across thousands of chips, in a few complementary ways; see [[Pretraining]] and [[Scaling Laws]].

**Data parallelism** is the simplest. Every device holds a full copy of the model and processes a different slice of each batch. After computing gradients, devices average them so every copy takes the same step; see [[Gradient Descent]] and [[Backpropagation]]. The averaging is an **all-reduce**, often arranged as a ring in which each device passes pieces to its neighbor so total traffic stays constant as devices are added. The gradient exchange still competes with computation, so training overlaps them where possible.

Copying the whole model wastes memory. Sharded schemes, such as Microsoft's ZeRO of 2019, split the optimizer state, gradients and eventually weights across devices and fetch pieces only when needed.

When even one layer is too big, **tensor parallelism** splits the matrix multiplications themselves, with each device computing part of every layer and exchanging partial results within each step. The traffic is heavy, so it usually runs within one server on its fastest links. **Pipeline parallelism** assigns consecutive layers to different devices, like stations on an assembly line, and feeds small micro-batches through so stations stay busy. Devices idle while the pipeline fills and drains, and scheduling tricks shrink that bubble; see [[Instruction Pipelining]]. Models built from many experts add a fourth axis, placing experts on different devices; see [[Mixture of Experts]].

Real systems combine all of these, and the hard part is arranging them to match the network. Communication grows faster than computation as clusters grow, so the slowest link or slowest device limits everyone; see [[Tail Latency]] and [[Amdahl's Law]]. Numerical formats matter too, with lower-precision arithmetic cutting both memory and traffic; see [[Quantization]] and [[Floating-Point Arithmetic]].

At scale, failure is routine. With tens of thousands of chips running for months, some component fails every few hours. Meta reported hundreds of unexpected interruptions over about two months of training one large model, most from hardware. Training saves checkpoints of the full state regularly so a failure costs only the work since the last save, and good runs detect slow or faulty machines and swap them out automatically.

The hardware is built around this. Accelerator pods with dedicated interconnects, from GPU clusters to Google's TPU pods, exist largely to make these patterns fast; see [[Graphics Processing Unit]] and [[Tensor Processing Unit]]. Training across loosely connected machines is far harder, which is one reason [[Federated Learning]] uses different methods.

## See also
- [[Batch Normalization]]
- [[Inference Serving]]
