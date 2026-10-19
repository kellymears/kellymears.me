---
aliases:
  - Matrix multiplication algorithm
tags:
  - computation
summary: The 1969 method that multiplies matrices with fewer than the expected number of operations by computing 2-by-2 block products with seven multiplications instead of eight, the first proof that the schoolbook method isn't optimal.
---
The **Strassen algorithm** is a method for multiplying matrices, published by the German mathematician Volker Strassen in 1969, that was the first to beat the obvious approach for large inputs. It showed that a calculation assumed optimal could be done faster, opening a line of research that's still active.

Multiplying two n-by-n matrices the standard way computes each of the n² entries of the result as a sum of n products, for n³ multiplications in total; see [[Big-O Notation]]. For decades this was taken to be essentially the best possible. Matrix multiplication sits at the center of linear algebra, so its cost matters across science, engineering, and graphics; see [[Linear algebra]].

Strassen's insight starts with 2-by-2 matrices. The standard method uses eight multiplications. Strassen found a way to combine the entries into seven products, using extra additions and subtractions, from which all four entries of the result can be reconstructed. That saving looks trivial, but the entries can themselves be matrices. A large matrix can be split into four blocks and multiplied with seven block multiplications, each done the same way; see [[Divide and Conquer]] and [[Recursion]]. Saving one multiplication in eight at every level adds up, giving a running time of about n raised to the power 2.81 instead of n³.

The practical picture is more mixed. The extra additions mean Strassen's method only wins for fairly large matrices, so implementations usually switch to the standard method below some block size. Its intermediate sums can also lose more precision than the standard method; see [[Numerical Stability]] and [[Floating-Point Arithmetic]]. Highly tuned libraries mostly rely on the standard algorithm, arranged to make careful use of caches and vector instructions; see [[Locality of Reference]] and [[SIMD]]. Strassen variants do appear in some libraries for very large matrices.

The theoretical race continued. Researchers have lowered the exponent repeatedly, through methods by Don Coppersmith and Shmuel Winograd and their successors, to roughly 2.37. These are sometimes called galactic algorithms: their hidden constant factors are so large that they would only pay off for matrices far bigger than any computer could hold. Whether the true exponent is 2, the least possible since every entry must at least be read, remains open.

Fast matrix multiplication matters more than ever. Training and running neural networks is dominated by matrix products, done on hardware built for them; see [[Neural Network]] and [[GPU]]. In 2022, researchers at DeepMind used a learning system to search for multiplication schemes and reported new ones for some small matrix sizes, in a few cases improving on the best known, an echo of Strassen's original discovery.

The pattern of finding hidden structure in an apparently fixed calculation recurs elsewhere, most famously in the fast way to compute frequency spectra; see [[Fourier Transform]].

## See also
- [[Arbitrary-Precision Arithmetic]]
- [[Approximation Algorithm]]
