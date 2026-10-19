---
aliases:
  - Newton-Raphson method
  - Root-finding algorithm
tags:
  - computation
summary: An iterative way to find where a function equals zero by repeatedly following its tangent line, converging astonishingly fast near a good guess and failing in instructive ways far from one.
---
**Newton's method**, also called the Newton-Raphson method, finds where a function equals zero. Start with a guess. Draw the tangent line to the function at that point, find where the tangent crosses zero, and use that crossing as the next guess. Repeat until the answer stops changing.

The idea goes back to Isaac Newton in the 1660s and 1670s and to Joseph Raphson, who published a simpler version in 1690. Thomas Simpson described the modern form, using derivatives, in 1740. Much older procedures for square roots, such as the Babylonian method of averaging a guess with the number divided by the guess, turn out to be special cases.

The method's appeal is speed. Near a simple root it converges quadratically: the number of correct digits roughly doubles with every step. Starting from three correct digits, four more iterations can give around fifty. That makes it a workhorse for computing square roots, reciprocals, and other functions in software and hardware. Some processors compute division by refining a rough reciprocal estimate this way, and libraries for very large numbers rely on it; see [[Arbitrary-Precision Arithmetic]]. A famous graphics trick paired a crude bit-level estimate with a single Newton step; see [[Fast Inverse Square Root]].

Speed comes with conditions. Newton's method can fail in several ways:

- **A bad starting point** can send the iterates off to infinity or into a cycle that never settles.
- **A flat tangent**, where the derivative is near zero, throws the next guess wildly far away.
- **Repeated roots** slow convergence from quadratic to merely linear.
- **Rounding error** limits how close the answer can get, so stopping rules matter; see [[Floating-Point Arithmetic]] and [[Numerical Stability]].

Where the method converges depends on the starting point in surprisingly complicated ways. Applied to polynomials in the complex plane and colored by which root each starting point reaches, the regions form intricate boundaries known as Newton fractals; see [[Fractal]].

Robust solvers often combine Newton's speed with slower, guaranteed methods. Bisection repeatedly halves an interval known to contain a root, the same idea as searching a sorted list; see [[Binary Search]]. Hybrid algorithms take Newton steps when they behave well and fall back to bisection when they don't.

The same idea extends to many dimensions, where the tangent line becomes a matrix of derivatives, and to optimization, where finding a minimum means finding where the slope is zero. Machine learning mostly uses cheaper first-order methods instead, because computing second derivatives for millions of parameters is too expensive; see [[Gradient Descent]]. Quasi-Newton methods sit between the two, approximating the curvature from recent steps.

Engineering simulators, circuit solvers, and physics engines use Newton iterations at their core to solve systems of equations at every time step; see [[Rigid Body Dynamics]].

## See also
- [[Simulated Annealing]]
- [[Big-O Notation]]
- [[Kalman Filter]]
