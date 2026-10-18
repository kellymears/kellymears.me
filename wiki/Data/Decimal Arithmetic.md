---
aliases:
  - Decimal type
  - Money
  - Fixed-point arithmetic
  - Banker's rounding
tags:
  - data
summary: Representing numbers in base ten, or as whole counts of a smallest unit, so amounts such as money are stored and rounded exactly the way people and laws expect, which binary floating point can't do.
---
**Decimal arithmetic** represents and computes numbers in base ten rather than binary. It matters wherever exact decimal values are required, above all for money.

The problem it solves comes from binary [[Floating-Point Arithmetic]]. Computers usually store fractional numbers in base two, and most decimal fractions have no exact binary form, the way 1/3 has no exact decimal form. The number 0.1 is stored as something like 0.1000000000000000055511151231257827. So `0.1 + 0.2` evaluates to `0.30000000000000004`. For physics simulations, that error is far too small to matter. For a bank ledger, where a sum must equal exactly the total on a statement, it's a bug, and tiny errors repeated over millions of transactions add up to real money.

The common solutions:

- **Integer minor units.** Store amounts as whole numbers of the smallest unit: 1999 cents rather than 19.99 dollars. Integer addition is exact. The catch is that not every currency has two decimal places (the Japanese yen has none, the Kuwaiti dinar has three), so the amount needs its currency alongside it; see [[Integer Overflow]] for the other limit.
- **Decimal types.** Many languages and databases provide a type that stores digits in base ten with a fixed or arbitrary precision: SQL's `DECIMAL`/`NUMERIC`, Java's `BigDecimal`, Python's `decimal`. They're slower than hardware floats but exact for decimal values. The IEEE 754 standard added decimal floating-point formats in 2008.
- **Fixed-point arithmetic.** Integers with an implied decimal point at an agreed position, common in embedded systems without floating-point hardware.

Exactness doesn't remove the need to round. Dividing a $100 bill three ways, applying a percentage tax, or converting currency produces fractions of a cent that must be resolved by rule:

- **Round half up.** 2.5 becomes 3. Taught in school, but always rounding halves upward biases totals upward.
- **Round half to even**, also called *banker's rounding*. 2.5 becomes 2 and 3.5 becomes 4, so halves go up and down equally often over many operations. It's the IEEE 754 default.
- **Allocation.** When splitting, round each share and then distribute the leftover cents so the parts still sum to the whole.

Which rule applies is often set by law, regulation, or contract, not by programmers. Splitting rules are a natural fit for [[Property-Based Testing]]: for any amount and any number of parts, the shares must sum to the original. Payment systems add another requirement: a retried charge must not bill twice, so payment APIs accept a key that makes each request safe to repeat; see [[Idempotence]].

Money needs more than exact numbers. An amount without a currency is ambiguous, and arithmetic across currencies needs an exchange rate and a time. Displaying amounts depends on locale: `1.234,56` and `1,234.56` are the same number; see [[Internationalization]].

## See also
- [[Type System]]
- [[JSON]]
- [[Bresenham's Line Algorithm]]
