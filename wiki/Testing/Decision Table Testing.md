---
aliases:
  - Decision table
  - Cause-effect graph
  - Truth table testing
tags:
  - testing
summary: Laying out every combination of conditions in a business rule as a table, one column per case, so missing and contradictory combinations become visible and each column becomes a test.
---
**Decision table testing** designs tests for logic that depends on several conditions at once. The rule is written as a table: conditions down the side, every combination of their values across the top, and for each combination, the action or result that should follow. Each column is a test case.

Take a shipping rule. Orders over $50 ship free; members always ship free; international orders never ship free unless the customer is a member. Three yes-or-no conditions give eight combinations:

- Over $50, member, international: free.
- Over $50, not member, international: charged.
- Under $50, member, domestic: free.
- And so on for the remaining five.

Writing all eight out is tedious, which is the point. Prose rules feel complete and usually aren't. The table forces each combination to have an answer, and doing it tends to turn up two kinds of defect before any code runs:

- **Gaps.** A combination nobody specified. What happens to an under-$50 international order from a member with a promo code? If the spec is silent, the code will do something, and that something was never decided.
- **Contradictions.** Two rules that give different answers for the same combination, the kind of conflict that hides in long requirements documents and resurfaces as bugs.

A table with n yes-or-no conditions has 2ⁿ columns, which grows fast. Several techniques keep it manageable. Columns where a condition doesn't affect the outcome collapse into one with a "don't care" entry, as in simplifying a truth table. Conditions with many values are first divided into ranges by [[Boundary Value Analysis]], so "order total" becomes under, at, and over $50 rather than every price. When combinations still explode, [[Pairwise Testing]] covers every pair of values without every full combination. *Cause-effect graphing*, an older technique, derives the table from a diagram of how conditions combine through AND, OR, and NOT.

Decision tables suit rule-heavy domains: pricing, tax, insurance eligibility, permissions, feature access by plan. They also translate directly into code. A table maps neatly onto a [[Parameterized Test]], one row of inputs and expected output per column, and some teams keep the table as the specification itself, readable by non-programmers, in the spirit of [[Behavior-Driven Development]] and [[Acceptance Testing|acceptance criteria]].

Where a rule depends on history rather than current inputs, such as "lock the account after three failed logins," a table is the wrong shape. That calls for a [[Finite State Machine]] and [[Model-Based Testing]], which test sequences of events. [[Branch Coverage]] offers a check from the other direction: if the table's tests leave a branch unexecuted, either the table missed a case or the code has logic nobody specified.

## See also
- [[Decision Matrix]]
- [[Pairwise Testing]]
- [[Property-Based Testing]]
- [[Design by Contract]]
- [[Black-Box and White-Box Testing]]
- [[Modified Condition Decision Coverage]]
- [[Decision Tree]]
