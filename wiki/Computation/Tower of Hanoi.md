---
aliases:
  - Towers of Hanoi
tags:
  - computation
summary: The 1883 puzzle of moving a stack of disks between three pegs, never placing a larger disk on a smaller one, the standard first lesson in recursion and a clean example of exponential cost.
---
**The Tower of Hanoi** is a puzzle of three pegs and a stack of disks of decreasing size. The goal is to move the whole stack from one peg to another, moving one disk at a time and never placing a disk on a smaller one. The French mathematician Édouard Lucas published it in 1883 as a toy, under the pseudonym N. Claus de Siam, an anagram of Lucas d'Amiens.

The toy came with a legend: priests moving 64 golden disks by the same rules will end the world when they finish. It's a safe prophecy. Moving n disks takes at least 2ⁿ − 1 moves, so 64 disks take about 18 quintillion. At one move per second, that's roughly 585 billion years, over forty times the current age of the universe; see [[Big-O Notation]].

The puzzle is the standard first lesson in recursion because the solution fits in three lines. To move n disks from peg A to peg C:

1. Move the top n − 1 disks from A to B, using C as the spare.
2. Move the largest disk from A to C.
3. Move the n − 1 disks from B to C, using A as the spare.

Steps one and three are the same problem, one disk smaller, and a single disk is trivial. That's the core idea of [[Recursion]] and of [[Divide and Conquer]], though here the halves aren't independent, and the cost doubles with each disk instead of shrinking. The pending subproblems live on the [[Call Stack]], at most n frames deep.

An iterative solution exists too, with no stack. On odd moves, move the smallest disk one peg in a fixed rotation; on even moves, make the only legal move that doesn't involve the smallest disk. The sequence also has a binary pattern: the disk moved at step k is given by the number of trailing zeros in k, the same bit that changes in the reflected binary sequence at that step; see [[Gray Code]] and [[Binary Number]].

Drawing every legal arrangement as a point, with lines for single moves, gives a graph shaped like a Sierpiński triangle, which repeats itself at every scale as disks are added; see [[Fractal]].

Beyond teaching, the puzzle has other uses. Neuropsychologists use it and its variant, the Tower of London, to test planning, since solving it well means holding subgoals in mind; see [[Executive Function]] and [[Working Memory]]. A backup rotation scheme takes its name from it, using media on the same schedule the disks move, so recent backups are frequent and older ones are spaced out exponentially; see [[Backup and Restore]].

Like the [[Collatz Conjecture]], it shows how much behavior a tiny definition can produce.

## See also
- [[Tail Call Optimization]]
- [[Dynamic Programming]]
