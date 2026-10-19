---
aliases:
  - Ring laser gyroscope
  - Gyrocompass
tags:
  - matter
summary: A device that senses or maintains orientation, originally a spinning wheel that resists tilting and now usually a vibrating microchip, found in ships, aircraft, spacecraft, game controllers, and every smartphone.
---
**A gyroscope** is a device for measuring or maintaining orientation. The classic form is a rapidly spinning wheel mounted in a frame of gimbals that let it turn freely. Because of the wheel's angular momentum, its axis resists changes in direction and keeps pointing the same way as the frame around it tilts; see [[Angular Momentum]].

Push on a spinning gyroscope's axis and it doesn't simply tip over. It swings sideways, at right angles to the push, a motion called precession; see [[Torque]]. A spinning top that leans without falling, slowly circling, shows the same effect.

The French physicist Léon Foucault named the device in 1852, from Greek words meaning to view the rotation. Foucault used it to demonstrate Earth's rotation: a free gyroscope keeps pointing in a fixed direction relative to the stars while the ground turns beneath it; see [[Inertial Frame of Reference]].

Mechanical gyroscopes became essential navigation tools:

- **Gyrocompasses**, developed in the early twentieth century, align themselves with Earth's rotation axis and point to true north. Unlike magnetic compasses, they aren't disturbed by a ship's steel hull; see [[Magnetism]].
- **Aircraft instruments** such as the artificial horizon show a plane's attitude when the pilot can't see the ground.
- **Inertial navigation**, combining gyroscopes with accelerometers, tracks a vehicle's position without outside references. It guided missiles, submarines, and the Apollo spacecraft; see [[Inertial Measurement Unit]] and [[Apollo 11 Program Alarms]].
- **Stabilization**. Spacecraft such as the Hubble Space Telescope point themselves using spinning reaction wheels.

Modern gyroscopes often have no spinning parts. **Ring laser** and fiber-optic gyroscopes send light both ways around a loop; rotation makes one path effectively longer, which shows up as a shift in the interference between the beams; see [[Laser]] and [[Wave Interference]]. They're used in aircraft and for precise navigation.

The gyroscopes in phones, game controllers, and drones are tiny MEMS devices etched in silicon. A structure vibrates back and forth, and rotation deflects it sideways through the Coriolis effect; see [[Coriolis Effect]]. Sensing that deflection gives the rotation rate. They're cheap and small but drift, so software combines them with accelerometers and magnetometers, and with satellite positioning when available; see [[Global Positioning System]].

Software representing orientation faces its own trap. Describing rotation with three successive angles can lose a degree of freedom, as a mechanical gimbal does when two of its rings line up. Mathematical representations that avoid it are standard in graphics and robotics; see [[Quaternion]].

Gyroscopic effects also matter in everyday motion. Spinning wheels contribute modestly to a moving bicycle's stability, though steering geometry matters more; see [[Bicycle Stability]]. The body has its own rotation sensors in the inner ear; see [[Vestibular System]].

## See also
- [[Centripetal Force]]
- [[Neutron Star]]
