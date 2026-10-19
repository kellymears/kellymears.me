---
aliases:
  - Wobbly Bridge
  - Synchronous lateral excitation
  - London Millennium Bridge
tags:
  - testing
summary: The sideways sway that closed London's new footbridge two days after it opened in 2000, caused by thousands of pedestrians unconsciously falling into step with the bridge's movement, a feedback loop no design code had anticipated.
---
The **Millennium Bridge** is a steel footbridge over the River Thames in central London, linking St Paul's Cathedral with the Tate Modern gallery. It opened on 10 June 2000 as the first new crossing of the Thames in central London in more than a century. Its shallow suspension design, with cables running alongside the deck instead of hanging from tall towers, was meant to be a "blade of light."

On opening day, as many as 90,000 people crossed it. Soon after the crowds arrived, the deck began swaying sideways by several centimeters, enough that people grabbed the handrails and walked with legs spread. The bridge was closed two days later and stayed closed for almost two years. Londoners nicknamed it the **Wobbly Bridge**.

The structure was in no danger of collapse. The problem was a kind of loading that bridge design codes had not considered. Walking produces a small sideways force at each step, as the body's weight shifts from one foot to the other, at about half the walking pace. The bridge happened to have a natural sideways frequency close to that rate; see [[Resonance]]. Once it started moving slightly, people on it instinctively adjusted their steps to keep balance, timing their stride with the sway. That synchronized more and more walkers, which pushed the bridge harder, which drew in still more walkers, a [[Positive feedback]] loop. Engineers called it **synchronous lateral excitation**; see [[Gait]].

The effect had a threshold. In tests the engineers ran by sending controlled groups across one span, the sway stayed small until the crowd passed roughly 160 people, then grew rapidly. Below that number, random walking patterns canceled out. Above it, the feedback won, much like the spontaneous synchronization of clapping audiences or flashing fireflies. A crowd study on the real structure was the only way to find the threshold, since nothing in the models predicted it; see [[Load Testing]].

Similar sideways swaying had been reported before on a few crowded bridges, but the reports had not reached the design codes. The fix was to add damping rather than stiffness: dozens of viscous dampers and tuned mass dampers that soak up the energy of the motion; see [[Simple Harmonic Motion]]. The bridge reopened in February 2002 and has not wobbled since. Design guidance for footbridges worldwide now includes checks for lateral crowd loading.

The bridge is often compared with the [[Tacoma Narrows Bridge]], though the differences matter. Tacoma's oscillations were driven by wind and destroyed the bridge, while London's were driven by its users and were only unnerving. Both show that a structure can pass every calculation it was given and still fail against a load nobody thought to model; see [[Requirements Traceability]].

## See also
- [[Hyatt Regency Walkway Collapse]]
- [[Testing in Production]]
- [[Citicorp Center Engineering Crisis]]
