---
aliases:
  - Wisdom of crowds
  - Collective intelligence
  - Prediction market
tags:
  - meaning
summary: The finding that averaging many independent guesses often beats any single expert, as long as the guessers are diverse and independent, so that their errors cancel rather than compound.
---
The **wisdom of the crowd** is the observation that the combined judgment of many people is often more accurate than that of any individual in the group, including its experts. The phrase comes from James Surowiecki's 2004 book *The Wisdom of Crowds*, but the founding anecdote is a century older.

In 1906 the statistician Francis Galton visited a livestock fair in Plymouth, England, where about 800 people paid to guess the weight of an ox once slaughtered and dressed. Galton expected the crowd to do badly. The middle guess was 1,207 pounds; the actual weight was 1,198. A later reanalysis of his data found that the mean was closer still, within a pound or two.

The mechanism is arithmetic. Each guess is the truth plus an error. If the errors are independent and as likely to be high as low, they cancel when averaged, and the average's error shrinks as the crowd grows; see [[Normal Distribution]]. The same reasoning lets a vote among many decision trees beat a single one, a form of [[Ensemble learning]], and lets [[Fermi Estimation]] improve when several people estimate separately and compare.

Surowiecki listed the conditions it needs:

- **Diversity.** People should hold different information and use different methods, so their errors point different ways.
- **Independence.** People must form judgments before seeing others' answers. Once they copy each other, errors correlate and stop cancelling; see [[Information Cascade]].
- **Decentralization.** People draw on local, specialized knowledge.
- **Aggregation.** Some mechanism, such as an average, a vote, or a price, must combine the judgments.

Break those conditions and crowds turn foolish. A 2011 study by Jan Lorenz and colleagues showed that telling people what others had guessed narrowed the spread of answers without making them more accurate, while raising everyone's confidence; see [[Groupthink]].

**Prediction markets** use prices as the aggregator. People trade contracts that pay out if an event happens, and the price reads as a probability. They have forecast elections and project deadlines well, though thin markets can be moved by a few large traders. The Delphi method, developed at RAND in the 1950s, gathers expert estimates anonymously over several rounds, showing each round's spread without names, to keep the benefit of discussion while limiting deference to the loudest voice; see [[Anchoring]].

Crowd judgment also underlies open collaboration. A [[Wiki]] lets many people correct each other's errors, and open source code relies on many reviewers; see [[The Cathedral and the Bazaar]] and [[Commons-Based Peer Production]].

The idea has limits. Crowds do well on questions with a measurable answer that individuals know something about, and badly on questions where everyone shares the same misconception, since shared errors don't cancel. An average of overconfident guesses is still overconfident; see [[Calibration]].

## See also
- [[Speculative Bubble]]
- [[Survey Design]]
- [[Brier Score]]
- [[Self-Consistency]]
- [[Data Labeling]]
