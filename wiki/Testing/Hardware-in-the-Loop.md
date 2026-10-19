---
aliases:
  - HIL testing
  - Hardware-in-the-loop simulation
  - Software-in-the-loop
tags:
  - testing
summary: Testing a real embedded controller by connecting it to a real-time simulation of the machine it controls, so that engine computers and flight controls can meet dangerous conditions on a bench before they meet them in the world.
---
**Hardware-in-the-loop** (HIL) testing connects a real embedded controller, such as a car's engine control unit or an aircraft's flight computer, to a computer that simulates everything around it in real time. The simulator generates the signals the controller's sensors would produce, reads the commands it sends to its actuators, and computes how the simulated engine, vehicle, or aircraft would respond. The controller can't tell the difference, so it runs its real software on its real processor, with its real timing; see [[Firmware]].

In control engineering the machine being controlled is called the plant, and the controller and plant form a loop; see [[Feedback Loop]]. HIL replaces the plant with a model and keeps the controller real. It is the last step in a progression widely used in automotive and aerospace work:

1. **Model-in-the-loop.** Controller and plant are both models in a simulation tool, to check the control design.
2. **Software-in-the-loop.** Controller code, often generated from the model, runs on an ordinary computer against the plant model.
3. **Processor-in-the-loop.** The code runs on the target processor, checking the compiler and numeric precision.
4. **Hardware-in-the-loop.** The complete controller, with its real input and output circuits, runs against the simulated plant.

Each stage catches errors the previous one can't, at higher cost; see [[V-Model]].

The reasons to bother:

- **Danger and rarity.** A bench can present a sensor failure at highway speed, a brake fault on ice, or an engine fire in flight, conditions no one would stage on purpose; see [[Fault injection]].
- **Repeatability.** A simulated scenario runs the same way every time, so a failure can be reproduced and a fix confirmed; see [[Deterministic Simulation Testing]].
- **Time.** Controller software can be tested before prototype vehicles exist, and in automated runs overnight; see [[Regression Testing]].

The simulator has to keep up with the hardware. If the plant model takes longer than one control cycle to compute, the controller sees stale inputs, so HIL rigs run on systems with hard deadlines, and plant models are often simplified to fit; see [[Real-Time Operating System]].

The weakness is the model. A HIL test shows that the controller handles the world as modeled, and no more. The Ariane 5 inquiry found that the rocket's inertial units had been left out of system-level simulations and represented by models, so their real software never met the new rocket's trajectory; see [[Ariane 5 Flight 501]] and [[Test Double]]. Aircraft makers go a step further with an "iron bird," a full-size ground rig with the real hydraulics, actuators, and flight controls laid out in the airframe's shape, run against a flight simulator.

## See also
- [[Device Tree]]
- [[Serial Port]]
- [[Mars Polar Lander]]
- [[Toyota Unintended Acceleration]]
- [[Mariner 1]]
- [[Mars Pathfinder Priority Inversion]]
