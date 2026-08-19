---
aliases:
  - Amortized Cost
tags:
  - computation
summary: Averaging cost over a sequence of operations so occasional expensive ones don't distort the per-operation bound.
---
**Amortized Analysis** measures the average cost of an operation over a worst-case sequence, rather than the worst case of any single call. A dynamic array's `push` is O(1) amortized even though every so often it must copy the whole backing array to grow — the doubling happens rarely enough, and the copies get more expensive at exactly the rate the free O(1) pushes accumulate, that the total cost across n pushes is O(n).

The usual technique is the accounting method: charge each cheap operation a few extra tokens, banked against the rare expensive one, and show the bank never goes negative. A potential-function argument does the same thing more formally, defining a quantity that rises during cheap operations and falls to pay for expensive ones. Both prove a bound that's true "on average over any sequence" without assuming anything about the distribution of inputs — unlike expected-case analysis, amortized bounds hold even under adversarial input, because the accounting is a property of the algorithm, not the data.

The common confusion is with average-case complexity, which is a probabilistic claim about typical inputs and can be broken by a bad one. Amortized complexity is worst-case-over-a-sequence and cannot be broken by any single input, only by an adversary who also chooses the operation sequence — and still can't fool the bookkeeping. A [[Hash Table]]'s O(1) amortized insert is the same story as the dynamic array underneath it; a splay tree's O(log n) amortized access is subtler, because no single access is guaranteed fast, but the tree's shape after each access pays down the cost of future ones.

The practical payoff is that "O(1) amortized" is an honest bound to advertise to a caller — they will see occasional slow calls, but never enough of them to change the asymptotic total. Reporting the worst single call instead ("O(n) worst case!") is technically true and practically misleading, since it hides that the O(n) call is rare and self-funding.

## See also
- [[Big-O Notation]]
- [[Dynamic Programming]]
- [[Memoization]]
- [[B-Tree]]
