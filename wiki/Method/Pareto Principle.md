---
aliases:
  - 80/20 rule
  - Law of the vital few
  - Power law
  - Long tail
tags:
  - method
summary: The pattern that a small share of causes produces most of the effects, why it follows from power-law distributions, and how to use it without treating 80/20 as a law of nature.
---
The **Pareto principle** observes that, in many situations, a small share of causes accounts for most of the effects. It's usually stated as the *80/20 rule*: roughly 80% of outcomes come from 20% of causes. The economist Vilfredo Pareto noticed around 1896 that about 80% of Italy's land was owned by 20% of the population. Decades later, the quality engineer Joseph Juran generalized the pattern as the "vital few and the trivial many" and named it after Pareto.

The numbers are a rule of thumb, not a law. The split might be 90/10 or 70/30, and the two figures needn't add to 100. What matters is the shape: effort and results are rarely spread evenly. Familiar examples:

- **Software performance.** Most of a program's running time is usually spent in a small fraction of its code, which is why [[Profiling]] beats guessing, and why optimizing anywhere else is [[Premature Optimization]].
- **Bugs and crashes.** A few defects cause most of the crash reports, so fixing the top handful clears most user-facing pain.
- **Customers and revenue.** A minority of customers typically produces most sales, and also, often, most support requests.
- **Features.** Most users use a small core of a product, a reason [[Feature Creep]] adds cost faster than value, and a [[Minimum Viable Product]] can focus on that core.
- **Words.** A few hundred words make up most of any text, which is why frequent words get short codes in [[Data Compression]].

These patterns come from **power-law** distributions, in which a few items are enormous and a long tail of items is small. Wealth, city sizes, website traffic, and word frequencies all follow them. They often arise from feedback, where success brings more success: popular sites get more links, and big cities attract more people, the dynamic behind a [[Network Effect]]. In [[Tail Latency]], the same skew means that a few slow requests dominate what users experience.

Power laws behave differently from bell curves. An average can mislead when a single extreme value outweighs everything else, and [[Survivorship Bias]] compounds it, since the visible winners are the few from the tail. Planning around the average, rather than the spread, underestimates both risks and rewards.

Used well, the principle is a prompt to look for the vital few: find what produces most of the value or most of the problems, and focus there. Used badly, it becomes an excuse to skip the remaining 20% of work, which is often where quality, accessibility, and edge cases live. Finishing that part of a project tends to take far longer than expected, a pattern captured by the "ninety-ninety rule" and closely related to [[Hofstadter's Law]].

## See also
- [[Zipf's Law]]
- [[Fermi Estimation]]
- [[Law of Triviality]]
- [[Selection Bias]]
- [[Matthew Effect]]
- [[Lindy Effect]]
