---
aliases:
  - Iterator protocol
  - External iterator
  - Internal iterator
tags:
  - computation
summary: An object that hands out the elements of a collection or sequence one at a time on request, separating how a sequence is produced from how it's consumed, which lets the same loop walk arrays, trees, files and infinite streams.
---
An **iterator** is an object that produces the elements of a sequence one at a time. It answers a single question, "what's next?", and eventually reports that nothing is left. Code that consumes the sequence doesn't need to know whether the values come from an array, a tree, a file being read line by line, or a calculation that's still running.

The idea is often traced to CLU, a language designed by Barbara Liskov's group at MIT in the 1970s, which let programmers write procedures that yielded values to a loop one at a time. It was later catalogued as a design pattern in the 1994 book Design Patterns, and most modern languages build it into their for loops. A loop over a list in Python, Java, JavaScript or C# is quietly asking an iterator for the next element until it's told to stop; see [[Object-Oriented Programming]] and [[Polymorphism]].

The benefit is decoupling. Without iterators, every collection needs its own traversal code, and every consumer has to know each collection's internal layout. A [[Linked List]] is walked by following pointers; a balanced search tree by an in-order traversal; a hash table by skipping empty slots; see [[Self-Balancing Binary Search Tree]] and [[Hash Table]]. With a common iterator interface, one loop handles all of them, and functions that take "anything iterable" work with collections that didn't exist when they were written; see [[Generics]].

Iterators are also **lazy**. They compute each element only when asked, so a sequence can be larger than memory, or infinite. An iterator over all prime numbers is perfectly usable as long as the consumer stops eventually; see [[Lazy Evaluation]] and [[Prime Number]]. Chains of operations, such as filter, then transform, then take the first ten, can process one element at a time through the whole pipeline instead of building intermediate lists, much as shell commands stream through a pipe; see [[Unix Pipeline]] and [[Higher-Order Function]].

There are two styles. An **external iterator** is driven by the consumer, which calls next when it's ready and can stop, pause or interleave several sequences. An **internal iterator** takes a function and applies it to each element itself, as a forEach method does; it's simpler to write but harder to stop midway. Writing an external iterator by hand for a recursive structure is awkward, because the traversal state must be saved between calls. Generators solve this by letting a function pause at each yield, turning ordinary loop code into an iterator; see [[Coroutine]] and [[Recursion]].

The classic hazard is modifying a collection while iterating over it. Inserting into a growing array can move its storage, leaving the iterator pointing at freed memory. Some languages detect this and throw an error; others leave it undefined; see [[Ownership and Borrowing]].

## See also
- [[Fold]]
- [[Ring Buffer]]
