---
aliases:
  - Sensor fusion
  - Extended Kalman filter
  - State estimation
tags:
  - computation
summary: An algorithm that estimates the state of a changing system from noisy measurements by alternately predicting where the system should be and correcting that prediction with each new reading, weighted by how much each can be trusted.
---
A **Kalman filter** estimates the hidden state of a system, such as the position and velocity of a vehicle, from a stream of measurements that are each noisy and incomplete. It is named for Rudolf Kálmán, whose 1960 paper set out the method, and it has become one of the most widely used algorithms in engineering. It runs in phones, aircraft, spacecraft, robots and financial models.

The filter repeats two steps:

1. **Predict.** Using a model of how the system behaves, project the current estimate forward in time. A car moving at a known speed will be farther along. Because the model is imperfect, the uncertainty of the estimate grows.
2. **Update.** When a measurement arrives, compare it to the prediction and move the estimate partway toward the measurement. Because the measurement adds information, uncertainty shrinks.

How far to move is the heart of the method. The filter keeps track of both the estimate and its uncertainty, expressed as a covariance. If the prediction is confident and the sensor is noisy, the estimate barely moves. If the sensor is precise and the prediction is shaky, the estimate jumps nearly all the way to the reading. The blending factor, the **Kalman gain**, is computed from these uncertainties at every step. For linear systems with noise that follows a [[Normal Distribution]], this produces the best possible estimate in the sense of least squared error; see [[Linear Regression]]. The procedure is a recursive form of Bayesian updating, where the prediction is the prior and the measurement is the evidence; see [[Bayesian Inference]] and [[Hidden Markov Model]].

The filter needs only the current estimate and its uncertainty, not the history of all past readings, which made it practical on the very limited computers of the 1960s. NASA engineers adapted it for navigating the Apollo spacecraft to the Moon, and an extended version ran on the onboard guidance computer; see [[Apollo 11 Program Alarms]].

Real systems are often nonlinear. The **extended Kalman filter** approximates them with a linear model around the current estimate; the unscented Kalman filter instead pushes a few carefully chosen sample points through the true model. When noise is far from normal, particle filters, which track many sampled hypotheses, are used instead; see [[Monte Carlo Method]].

A common use is **sensor fusion**, combining sensors with complementary weaknesses. An inertial sensor reports motion quickly and smoothly but drifts over time; a satellite receiver is accurate on average but noisy and slow to update. Fusing them gives an estimate that is both responsive and stable; see [[Inertial Measurement Unit]] and [[Global Positioning System]].

The same predict-and-correct pattern underlies tracking aircraft on radar, smoothing economic indicators, and estimating a robot's position while it builds a map of its surroundings; see [[Autonomous Vehicle]].

## See also
- [[Numerical Stability]]
- [[Newton's Method]]
