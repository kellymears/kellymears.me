---
aliases:
  - TPU
  - AI accelerator
  - Neural processing unit
  - Systolic array
tags:
  - agents
summary: Google's custom chip for neural network arithmetic, built around a grid of multipliers that pass data between neighbors, and the wider family of AI accelerators it represents, which trade general flexibility for far more matrix math per watt.
---
A **tensor processing unit**, or TPU, is a chip Google designed to run neural networks. Google revealed it in 2016, saying it had already been in its data centers for over a year. A paper published the next year explained the motivation: projections suggested that if people used voice search for a few minutes a day, serving the speech recognition models on ordinary processors would require roughly doubling Google's data centers; see [[Automatic Speech Recognition]] and [[Inference Serving]].

Neural network work is dominated by one operation, multiplying large matrices, which reduces to vast numbers of multiply-and-add steps; see [[Neural Network]]. General processors spend most of their energy fetching instructions and moving data rather than doing arithmetic; see [[Von Neumann Architecture]] and [[Memory Hierarchy]]. The TPU attacks this with a **systolic array**, a design described by H. T. Kung and Charles Leiserson in 1978. It's a grid of simple multiply-add units, each passing its inputs to the next unit and its partial sum onward, so values pulse through the grid like blood through the heart, which gave the design its name. Each number fetched from memory is used many times before leaving the chip.

The first TPU had a 256 by 256 grid, 65,536 units working in 8-bit integers, and was built only for inference. Low precision was the other big saving, since many networks lose little accuracy with small numbers; see [[Quantization]]. Later versions added training, which needs more precision, and Google popularized bfloat16, a 16-bit format that keeps the range of a 32-bit number while dropping precision; see [[Floating-Point Arithmetic]].

Individual chips matter less than how they're connected. TPUs are built into pods of thousands of chips joined by dedicated high-speed links, and later generations used optical switches to reconfigure those links between jobs; see [[Distributed Training]] and [[Optical Fiber]]. The version of [[AlphaGo]] that beat Lee Sedol in 2016 ran on TPUs, and many of Google's large models were trained on them.

TPUs belong to a broader family of **AI accelerators**. GPUs began as graphics hardware but turned out well suited to the same parallel arithmetic, and NVIDIA added specialized matrix units, called tensor cores, in 2017; see [[Graphics Processing Unit]] and [[SIMD]]. Phones carry small **neural processing units** for on-device tasks like photo enhancement and speech. Many startups have built their own designs, betting that specialization wins.

The trend reflects the slowing of general-purpose processor gains. As chips stopped getting faster for free, designers turned to specialized hardware for important workloads, accepting that a chip optimized for today's networks may fit tomorrow's less well; see [[Moore's Law]]. GPUs have kept their lead partly through flexibility and a mature software ecosystem.

## See also
- [[Instruction Pipelining]]
- [[Go]]
