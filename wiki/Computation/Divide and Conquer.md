---
aliases:
  - Divide-and-conquer
  - Master theorem
  - Karatsuba algorithm
  - Fast Fourier transform
  - FFT
tags:
  - computation
summary: Splitting a problem into smaller copies of itself, solving those, and combining the answers, the pattern behind fast sorting, multiplication, and the FFT.
---
**Divide and conquer** solves a problem by splitting it into smaller instances of the same problem, solving each, often by [[Recursion]], and combining their answers. When the pieces are small enough, they are solved directly. Done well, the approach turns slow algorithms into fast ones, because the work of combining is far less than the work saved.

Three steps define it:

- **Divide.** Split the input, usually in half.
- **Conquer.** Solve each part recursively.
- **Combine.** Merge the partial results into a full answer.

Famous examples show how much it can save:

- **Merge sort.** John von Neumann described it in 1945. Sort each half, then merge two sorted lists in a single pass, for n log n time overall instead of the n² of simple sorts. Quicksort divides around a pivot instead. See [[Sorting Algorithm]].
- **Binary search.** Divide the range in half and discard the half that cannot hold the target. Only one subproblem survives, giving logarithmic time. See [[Binary Search]].
- **Karatsuba multiplication.** In 1960, Anatoly Karatsuba, then a student, found a way to multiply two large numbers using three half-size multiplications instead of four. That reduced the cost from n² to about n^1.585 and disproved a conjecture by his teacher Andrey Kolmogorov that n² was the limit.
- **The fast Fourier transform.** James Cooley and John Tukey published it in 1965, splitting a signal into even and odd samples. It cut the cost of a Fourier transform from n² to n log n and made modern audio, image, and radio processing practical. Carl Friedrich Gauss had used the same idea around 1805 but never published it.

The running time of these algorithms follows a recurrence, such as "solve two problems of half the size, plus linear work to combine." The *master theorem* reads off the answer in [[Big-O Notation]] by comparing how fast subproblems shrink with how expensive combining is.

Divide and conquer differs from [[Dynamic Programming]] in one respect. Its subproblems are independent and do not overlap, so each is solved once. When the same subproblems recur, as in computing Fibonacci numbers naively, plain recursion repeats work exponentially and [[Memoization]] is needed instead.

Independent subproblems are also easy to run in parallel, which is why the pattern underlies so much of [[Concurrency and Parallelism]]. Fork-join frameworks split work recursively across cores, and [[MapReduce]] divides a dataset across machines and combines partial results, a large-scale form of [[Fan-Out and Fan-In]].

The idea extends beyond algorithms. Spatial structures such as the [[Bounding Volume Hierarchy]] divide space recursively so a renderer can discard most of a scene at once. Debugging uses it too: [[Git Bisect]] halves a commit range to find a regression, and [[Delta Debugging]] halves a failing input until only the essential part remains.

## See also
- [[Greedy Algorithm]]
- [[Backtracking]]
