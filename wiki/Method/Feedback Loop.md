---
aliases:
  - Positive feedback
  - Vicious circle
  - Virtuous cycle
  - Leverage points
tags:
  - method
summary: A cycle in which a system's output feeds back into its own input, either damping change like a thermostat or amplifying it like a bank run, with delays producing oscillation, and the basic unit of systems thinking.
---
A **feedback loop** exists when a system's output feeds back to influence its own input. Feedback is how systems regulate themselves and how small changes become large ones, and spotting the loops is the core of systems thinking.

There are two kinds.

**Balancing loops**, also called negative feedback, push a system back toward a target. A thermostat turns on heat when the room is cold and off when it is warm. The body holds its temperature and blood sugar steady the same way; see [[Homeostasis]].

**Reinforcing loops**, or positive feedback, amplify change in whichever direction it is already going:

- **Compound growth**, where interest earns interest.
- **Audio howl**, when a microphone picks up its own speaker.
- **Bank runs**, where withdrawals cause fear that causes more withdrawals.
- **Network effects**, where each new user makes a service more valuable to the next; see [[Network Effect]].
- **Advantage**, where early success brings the resources for more; see [[Matthew Effect]].

A reinforcing loop is a **virtuous cycle** or a **vicious circle** depending on which way it is running.

Delays make balancing loops misbehave. Someone adjusting a shower with a slow response overshoots to scalding, then to cold. MIT's beer distribution game, developed in the 1960s, shows the same thing in supply chains: small changes in customer demand swell into large swings in orders further upstream, because each stage reacts to delayed information.

The mathematician Norbert Wiener named the study of feedback and control **cybernetics** in 1948, from the Greek for a ship's steersman. Jay Forrester at MIT built system dynamics in the 1950s, modeling systems as stocks, the amounts that accumulate, and flows, the rates that change them. Donella Meadows's 1997 essay on **leverage points** ranked places to intervene in a system: adjusting numbers and parameters is weakest, changing the feedback loops and information flows is stronger, and changing the system's goals and underlying assumptions is strongest.

Software systems have many loops:

- **Overload.** Failed requests trigger retries that add load, which causes more failures; see [[Thundering Herd]] and [[Cascading Failure]].
- **Damping.** Waiting longer between retries, refusing excess work, and slowing senders when the network congests are balancing loops added on purpose; see [[Exponential Backoff]], [[Backpressure]], and [[Congestion Control]].
- **Recommendations.** Suggesting what people clicked shapes what they click next; see [[Filter Bubble]].

People learn through feedback too. Skills improve fastest when results arrive quickly and clearly; see [[Deliberate Practice]]. Games build reinforcing loops of action and reward to keep players returning; see [[Compulsion Loop]].

Many surprises in policy and engineering are loops nobody drew; see [[Second-Order Thinking]].

## See also
- [[You Build It, You Run It]]
- [[Dynamic Resolution Scaling]]
- [[Leading Indicator]]
