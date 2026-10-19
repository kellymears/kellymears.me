---
aliases:
  - GPS
  - GNSS
  - Trilateration
tags:
  - networks
summary: A constellation of satellites broadcasting precise time, from which a receiver works out where it is by measuring how long each signal took to arrive; how it works, why relativity matters, and why it's also the world's clock.
---
The **Global Positioning System** (GPS) is a network of about thirty US satellites that lets a receiver anywhere on Earth work out its position, typically to within a few meters. It's one of several such systems, collectively called **GNSS** (global navigation satellite systems), alongside Russia's GLONASS, Europe's Galileo, and China's BeiDou. Phones usually combine signals from all of them.

The surprising part is what the satellites send: essentially the time, plus each satellite's own orbital position. Each carries atomic clocks and continuously broadcasts "this is satellite N, my position is this, and the time is exactly this." A receiver compares that timestamp with when the signal arrived. Radio travels at the speed of light, so the delay gives the distance to that satellite; see [[Electromagnetic Spectrum]].

One distance puts the receiver somewhere on a sphere around the satellite. Three spheres intersect at a point, a method called **trilateration**. A fourth satellite is needed because the receiver's own clock is cheap and inaccurate: an error of one millionth of a second is 300 meters of distance. Solving with four satellites gives three position coordinates plus the correct time.

Precision demands physics corrections. The satellites' clocks run differently from clocks on the ground: slower because of their speed (special relativity) and faster because they're higher up in Earth's gravity (general relativity). The net effect is about 38 microseconds a day, which uncorrected would add kilometers of error daily. The clocks are adjusted for it before launch. The signal is also delayed by the ionosphere and atmosphere, bounced off buildings in cities, and blocked indoors; see [[Refraction]] and [[Latency and Jitter]].

Accuracy improves with help:

- **Correction services** compare readings at fixed stations of known position and broadcast the errors, reaching centimeters for surveying and farming.
- **Assisted GPS** downloads satellite positions over a phone network, so a phone gets a fix in seconds instead of minutes; see [[Cellular Network]].
- **Wi-Fi and cell tower databases** locate phones indoors where satellites can't be heard; see [[Wi-Fi]].

GPS is also the world's clock. Mobile networks, power grids, financial exchanges, and data centers use GPS time to synchronize equipment, often as the reference that [[Network Time Protocol]] servers follow; see [[Unix Time]].

That dependence is a weakness. GPS signals arrive very faint, so they're easy to **jam**, drowning them out, or **spoof**, faking signals so a receiver computes a false position. Both have become common near conflict zones, disrupting aircraft and ships, and spoofed positions have been used to hide ships' real locations. Critical systems now keep backup clocks and alternative navigation; see [[Fallacies of Distributed Computing]].

The system was built for the US military and opened fully to civilian accuracy in 2000.

## See also
- [[Data Broker]]
- [[Pigeon Post]]
- [[Speed of Light]]
- [[Kalman Filter]]
- [[Spread Spectrum]]
- [[Geospatial Data]]
- [[Emergency Telephone Number]]
