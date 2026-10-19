---
aliases:
  - Newton's laws
  - Newtons laws
  - Inertia
  - Momentum
  - F = ma
  - Action and reaction
tags:
  - matter
summary: The three laws Isaac Newton published in 1687 relating force, mass, and motion, still the working basis of engineering, ballistics, and game physics.
---
**Newton's laws of motion** describe how objects move in response to forces. Isaac Newton set them out in 1687 in the *Principia*, and they remain the foundation of mechanics for everything from bridges to spacecraft.

- **First law: inertia.** An object stays at rest or keeps moving in a straight line at constant speed unless a net force acts on it. Motion doesn't need a cause; *changes* in motion do. This overturned the ancient view, from Aristotle, that moving things naturally come to rest. They stop only because [[Friction]] and air resistance act on them. The first law also defines the reference frames in which the laws hold, described under [[Inertial Frame of Reference]].
- **Second law: F = ma.** The net force on an object equals its mass times its acceleration. Equivalently, force is the rate of change of *momentum*, mass times velocity.
- **Third law: action and reaction.** When one object exerts a force on another, the second exerts an equal and opposite force on the first. The two forces act on *different* objects, which is why they don't cancel. A rocket pushes exhaust backward and the exhaust pushes the rocket forward; you walk by pushing the ground backward.

Several principles follow. Because forces between objects come in equal and opposite pairs, the total momentum of an isolated system never changes, which explains recoil and collisions. When forces balance, acceleration stops, which is why a falling object settles at [[Terminal Velocity]]. Curved motion needs an inward force, as described under [[Centripetal Force]]. The rotational counterparts replace force with [[Torque]] and momentum with [[Angular Momentum]], and an extended object behaves as if its mass were concentrated at its [[Center of Mass]].

Everyday consequences are the first law at work. Unbelted passengers keep moving when a car stops suddenly; seatbelts and airbags apply the stopping force more gently over a longer time. A tablecloth can be yanked from under dishes because the brief force barely changes their momentum.

Newton's laws fail at extremes. Near the speed of light, Einstein's relativity takes over, and at atomic scales quantum mechanics does. But for ordinary speeds and sizes their predictions are accurate enough that NASA still uses them for most spacecraft trajectories.

Game physics engines are Newton's laws applied many times a second. Each step, the engine sums the forces on every body, divides by mass to get acceleration, and updates velocity and position. Engines usually use a fixed time step so simulations come out the same every run, important for [[Determinism]] in replays and networked games, and they represent rotation with a [[Quaternion]]. Simple step methods leak or add energy over time, as discussed under [[Conservation of Energy]].

## See also
- [[Lever]]
- [[Speed of Light]]
- [[Rigid Body Dynamics]]
- [[Escape Velocity]]
- [[Concussion]]
