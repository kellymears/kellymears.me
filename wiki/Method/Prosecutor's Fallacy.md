---
aliases:
  - Transposed conditional
  - Defense attorney's fallacy
tags:
  - method
summary: Confusing the probability of the evidence given innocence with the probability of innocence given the evidence, an error that has helped convict innocent people and that its mirror image, the defense attorney's fallacy, exploits from the other side.
---
The **prosecutor's fallacy** is the error of swapping a conditional probability for its reverse. A forensic expert might say that a blood type matching the defendant's occurs in one person in ten thousand. That's the chance of the match if the defendant is innocent. The fallacy reads it as the chance of innocence given the match, which can be far larger. William Thompson and Edward Schumann named the error, and its mirror image, in a 1987 study of mock jurors.

The gap comes from the size of the pool. In a city of a million people, a one-in-ten-thousand trait is shared by about a hundred of them. If nothing else points to the defendant, the match makes guilt roughly one chance in a hundred, not near certainty. Getting from one conditional to the other requires the prior probability, which is what the fallacy leaves out; see [[Bayes' Theorem]] and [[Base Rate Fallacy]]. The same reversal appears in medicine, where a test's accuracy is mistaken for the chance that a positive result is correct; see [[Sensitivity and Specificity]].

The best-known British case is that of Sally Clark, a solicitor convicted in 1999 of murdering two infant sons. The pediatrician Roy Meadow testified that the chance of two cot deaths in such a family was about one in 73 million. The figure wrongly assumed the two deaths were independent, when shared genetic and household factors make a second death more likely. It also invited jurors to read it as the chance of innocence, ignoring that double murder by a mother is itself extremely rare. The Royal Statistical Society publicly criticized the evidence, and the conviction was overturned in 2003.

The **defense attorney's fallacy** runs the other way, dismissing evidence because it doesn't prove guilt alone. During the O.J. Simpson trial, the defense argued that only a tiny fraction of men who abuse their wives go on to kill them. The statistician I.J. Good pointed out that the relevant question was different: given that the woman had been murdered and had been abused, how often was the abuser the killer? That probability is high.

Large searches make the error worse. Checking a crime-scene sample against a database of millions will turn up chance matches even for rare profiles, so a hit found by trawling is weaker than one found by testing a suspect identified some other way; see [[Multiple Comparisons Problem]].

The fallacy has a close cousin in research. A p-value is the probability of data at least this extreme if the null hypothesis is true, and it is routinely misread as the probability that the null hypothesis is true; see [[Statistical Significance]]. Both errors feel natural because ordinary language blurs the direction of a conditional; see [[Logical Fallacy]].

## See also
- [[Burden of Proof]]
- [[Texas Sharpshooter Fallacy]]
