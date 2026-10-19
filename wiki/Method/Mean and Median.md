---
aliases:
  - Arithmetic mean
  - Median
  - Average
  - Mode
tags:
  - method
summary: The two most common answers to "what's typical," which agree for symmetric data and diverge sharply for skewed data such as incomes and response times, where choosing between them can change the story entirely.
---
**Mean** and **median** are the two most common ways to summarize a set of numbers with one typical value. The **mean**, or arithmetic mean, adds the values and divides by how many there are. The **median** sorts them and takes the middle one. A third measure, the **mode**, is simply the most common value. All three are called "the average" in everyday speech, which hides the choice.

For symmetric data, such as heights within a population, they nearly agree; see [[Normal Distribution]]. For skewed data they don't. Household income has a long tail of very high earners, so the mean is pulled well above the median, and most households earn less than the "average." The old joke is that when a billionaire walks into a bar, the mean wealth of everyone inside jumps while nobody else got richer; the median barely moves; see [[Power law]].

Which to use depends on the question:

- **Totals call for the mean.** Mean cost times number of customers is the budget. The median can't do that.
- **"Typical" calls for the median.** It describes the middle person and resists distortion by a few extreme values; see [[Outlier]].
- **Categories call for the mode.** The most common shoe size or browser.

Software performance shows the stakes. A service whose mean response time is 100 milliseconds might have a median of 40 and a slowest 1 percent taking seconds. The mean describes no actual request, and the median hides the slow ones users complain about, which is why engineers report several percentiles instead; see [[Tail Latency]] and [[Histogram]].

Averaging has other traps:

1. **Averages of averages.** Averaging group means without weighting by group size gives a wrong overall figure, and comparing subgroup averages can even reverse a trend; see [[Simpson's Paradox]].
2. **Rates and growth.** Averaging speeds over equal distances calls for the harmonic mean, and averaging growth rates across years calls for the geometric mean; the arithmetic mean overstates both.
3. **Averages of individuals.** In the 1950s the US Air Force measured over 4,000 pilots on ten body dimensions for cockpit design and found none who was close to average on all ten. A design for the average person can fit almost nobody; see [[Persona]].

A summary number also hides spread, so two groups with the same median can be very different; see [[Box Plot]]. Reading individual behavior from group averages is a related error; see [[Ecological Fallacy]].

In probability, the mean of a distribution is its expected value, and sample means settle toward it as samples grow; see [[Expected Value]] and [[Law of Large Numbers]]. Extreme results drift back toward it on remeasurement; see [[Regression to the Mean]].

## See also
- [[Precision and Accuracy]]
- [[Percentage Point]]
- [[Median Voter Theorem]]
