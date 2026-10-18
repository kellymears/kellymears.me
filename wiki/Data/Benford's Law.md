---
aliases:
  - First-digit law
  - Newcomb–Benford law
tags:
  - data
summary: The pattern in which the leading digit of many real-world numbers is 1 about 30 percent of the time and 9 under 5 percent, used to flag invented figures in accounts and tax returns.
---
**Benford's law** describes a surprising pattern in many collections of real-world numbers: the leading digit is far more often small than large. A 1 comes first about 30.1% of the time, a 2 about 17.6%, and so on down to 9, at about 4.6%. Intuition expects about 11% each.

The share for each leading digit is the base-10 logarithm of one plus its reciprocal. Put plainly, the digits are spread evenly on a logarithmic scale, where the stretch from 1 to 2 is as long as from 2 to 4.

The astronomer Simon Newcomb noticed it in 1881, when the early pages of his logarithm tables were far more worn than the later ones. The physicist Frank Benford rediscovered it in 1938 and tested it on 20,229 numbers from 20 sources, including river areas, populations, and street addresses.

Why it holds:

- **Many orders of magnitude.** Data spanning several powers of ten, such as town populations from hundreds to millions, fills a logarithmic scale fairly evenly; see [[Zipf's Law]] and [[Pareto Principle]].
- **Multiplicative growth.** Quantities that grow by percentages, like balances and prices, spend longer with a leading 1 than a leading 9, since 100 to 200 takes a doubling but 900 to 1,000 only an 11% rise.
- **Scale invariance.** A universal digit pattern would have to survive a change of units, dollars to euros or meters to feet. Roger Pinkham showed in 1961 that Benford's distribution is the only one that does. Theodore Hill showed in 1995 that numbers drawn from a mix of many distributions tend toward it.

It fails where those conditions don't hold:

- **Bounded ranges.** Adult heights in meters nearly all start with 1, and test scores cluster; see [[Normal Distribution]].
- **Assigned numbers**, such as phone numbers, ZIP codes, and invoice numbers.
- **Small samples** with too few records to test.

The best-known use is detecting fabrication. People inventing numbers spread digits too evenly, and fraud examiners such as Mark Nigrini popularized screening expense claims and ledgers against Benford's curve; see [[Audit Log]]. Tax authorities use similar tests, and US courts have admitted such analyses as evidence. A deviation is a reason to look, not proof; see [[Data Cleaning]].

After the 2020 US election, claims circulated that precinct vote counts violated Benford's law, but precincts are drawn to hold similar numbers of voters, so their counts span too narrow a range. Testing every column until one deviates is its own trap; see [[P-Hacking]].

[[Synthetic Data]] meant to mimic real accounts should follow the curve too. The quickest test is a bar chart of first digits in a [[Spreadsheet]]; see [[Data Visualization]]. Richard Hamming noted that floating-point results drift toward the same distribution, which shapes rounding error; see [[Floating-Point Arithmetic]].

## See also
- [[Fermi Estimation]]
- [[Survivorship Bias]]
- [[Logarithmic Scale]]
- [[Bar Chart]]
