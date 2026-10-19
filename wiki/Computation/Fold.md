---
aliases:
  - Reduce
  - Catamorphism
  - Left fold
tags:
  - computation
summary: The higher-order function that collapses a sequence into a single value by repeatedly combining an accumulator with each element, a pattern general enough that summing, counting, mapping, filtering and many other loops can all be written as one.
---
A **fold**, also called **reduce**, combines the elements of a sequence into a single result. It takes three things: a sequence, a starting value, and a function that merges the running result with the next element. Summing a list is a fold with a starting value of zero and addition as the function. Finding the maximum, joining strings, and counting matches are folds with different starting values and functions; see [[Higher-Order Function]].

Fold's significance is how much it covers. Most loops that walk a list while updating some state are folds in disguise. Map and filter can both be written as folds that build a new list as their accumulator. Graham Hutton's 1999 tutorial on the universality of fold showed that any function on lists defined by a certain simple pattern of recursion can be rewritten as a single fold, which makes fold a tool for proving things about programs as well as writing them; see [[Recursion]] and [[Pure Function]].

Direction matters. A **left fold** starts at the front and combines from left to right, which suits a running total and can run in constant stack space; see [[Tail Call Optimization]]. A **right fold** combines from the end backward. On a linked list, a right fold has an elegant reading: it replaces each link with the combining function and the empty list at the end with the starting value, rebuilding the list's structure out of a different material; see [[Linked List]]. In lazy languages a right fold can even work on infinite lists, if the combining function doesn't always need the rest; see [[Lazy Evaluation]]. Haskell's lazy left fold is a well-known trap: it builds up millions of deferred additions before computing any of them, so programmers reach for its strict variant instead.

The generalization to other data structures is called a **catamorphism**, a term from category theory. Any recursive data type, such as a tree, has a fold that replaces each kind of node with a function; see [[Algebraic Data Type]] and [[Monad]].

Folds parallelize when the combining function is associative, as addition and maximum are. The sequence can then be split into chunks, each folded independently, and the partial results folded together. That's the reduce half of MapReduce, and the basis of parallel scans; see [[MapReduce]], [[Prefix Sum]] and [[Concurrency and Parallelism]].

Readability is the usual objection. A fold with a complicated combining function can be harder to follow than the plain loop it replaces. Python moved reduce out of its built-in functions in version 3, with its creator arguing that explicit loops were usually clearer. Specialized folds such as sum and any tend to read better than a general reduce; see [[Iterator]] and [[Immutability]].

## See also
- [[Persistent Data Structure]]
- [[Lambda Calculus]]
