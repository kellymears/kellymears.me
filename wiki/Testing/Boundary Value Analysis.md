---
aliases:
  - Equivalence partitioning
  - Edge case
  - Edge cases
  - Off-by-one error
  - Fencepost error
tags:
  - testing
summary: Choosing test inputs by splitting the input space into classes that should behave alike and testing hardest at the edges between them, where bugs cluster.
---
**Boundary value analysis** and its partner **equivalence partitioning** are the classic techniques for choosing test inputs. No one can test every input, so the question is which few inputs give the most confidence.

*Equivalence partitioning* divides the possible inputs into classes that the program should treat the same way. If a form accepts ages 18 to 65, there are three classes: below 18, 18 to 65, and above 65. Any value in a class should behave like any other, so one representative per class covers the behavior, plus classes for invalid input such as negative numbers, text, or nothing at all.

*Boundary value analysis* adds the observation that bugs cluster at the edges between classes. Programmers write `<` where they meant `<=`, start loops at 1 instead of 0, or forget that a range is inclusive. So test at and around each boundary: 17, 18, and 19, and 64, 65, and 66. The classic *off-by-one* or *fencepost error*, named for the puzzle of how many posts a 100-meter fence with a post every 10 meters needs (11, not 10), lives exactly there.

Common boundaries worth checking:

- **Emptiness and one.** Empty lists, empty strings, a single element, and zero, where many algorithms quietly assume at least one item exists, and where claims about "all" items can be [[Vacuous Truth|vacuously true]].
- **Limits.** Maximum integers, maximum lengths, and full buffers. Java's standard [[Binary Search]] had a midpoint overflow bug for nearly a decade, triggered only by arrays of over a billion elements.
- **Pages and ranges.** The last page of results, an exact multiple of the page size, and items added between requests, the bugs [[Pagination]] is known for.
- **Time.** Midnight, month ends, leap days, and daylight saving transitions when an hour repeats or vanishes. See [[Time Zone]].
- **Text.** Multi-byte characters, combining marks, and emoji, where length in bytes, code points, and visible characters all differ. See [[Character Encoding]].

These techniques make [[Unit Test]] design systematic rather than ad hoc, and they reveal why [[Code Coverage]] can mislead: a test can cover a branch with a value far from the boundary and never notice the boundary is off by one. [[Branch Coverage]] doesn't catch it either. [[Mutation Testing]] does, since one of its standard mutations turns `<` into `<=`.

[[Property-Based Testing]] and [[Fuzzing]] automate the search, and good generators deliberately bias toward boundary values such as zero, empty collections, and extreme numbers, because experience shows that is where bugs live.

## See also
- [[Parameterized Test]]
- [[Ariane 5 Flight 501]]
- [[Black-Box and White-Box Testing]]
- [[Year 2000 Problem]]
