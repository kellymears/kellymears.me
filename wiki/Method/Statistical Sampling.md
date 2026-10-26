---
aliases:
  - Random sample
  - Stratified sampling
  - Convenience sample
  - Sampling frame
  - Nonresponse bias
tags:
  - method
summary: Learning about a whole population by measuring a randomly chosen part of it, where the way the sample is drawn matters far more than how large it is.
---
**Statistical sampling** is the practice of learning about a whole population by measuring a part of it. Counting everyone, as a census tries to, is slow, expensive and often impossible. A factory can't crash-test every car it sells, and a pollster can't phone every voter. A well-drawn sample of a thousand people can estimate a national opinion to within a few percentage points, provided the way it was drawn doesn't favor some people over others.

In a **simple random sample** every member of the population has the same chance of selection, which lets probability theory say how far an estimate is likely to stray from the truth. That error shrinks with the square root of the sample size, so quadrupling the sample only halves it, and the size of the population barely matters once it's large; see [[Confidence Interval]]. Computers make the random choices with a [[Pseudorandom Number Generator]], and when the population streams past too fast to store, reservoir sampling keeps a fair sample of fixed size.

Real surveys refine the basic scheme. **Stratified sampling** divides the population into groups, such as regions or age bands, and samples each separately, which guarantees that small groups are represented and usually tightens the estimate. Cluster sampling picks whole neighborhoods or schools at random and then surveys within them, trading some precision for much lower travel costs.

Every design starts from a **sampling frame**, the actual list from which units are drawn, and the frame is where many errors begin. A phone directory misses people without listed numbers, and a customer database misses the people who stopped buying. The classic warning is the 1936 Literary Digest poll. The magazine mailed ballots to millions of names drawn from its subscribers, telephone listings and car registrations, received over two million replies, and predicted that Alf Landon would beat Franklin Roosevelt. Roosevelt won in a landslide, and a far smaller but more representative poll by George Gallup called it correctly. Size can't fix a skewed sample; see [[Selection Bias]].

Even a good frame leaks. **Nonresponse bias** arises when the people who decline to answer differ from those who do, and later analysis of the Literary Digest data suggests that who chose to reply did as much damage as the list itself. A **convenience sample**, whoever happens to be at hand, such as volunteers or website visitors, is cheap but carries no guarantee of resembling anyone else.

When a sample is all there is, resampling it shows how stable a result is. Simulation uses the same principle in reverse, drawing random samples from a model to estimate quantities too hard to calculate directly.

## See also
- [[Truncation Bias]]
- [[Availability Heuristic]]
