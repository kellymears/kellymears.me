---
aliases:
  - F1 score
  - Confusion matrix
  - False positive
  - False negative
  - Precision-recall tradeoff
tags:
  - agents
summary: The two measures of how well a classifier or search finds what it should, how often its hits are right and how many of the real cases it catches, and why improving one usually costs the other.
---
**Precision** and **recall** measure how well a system finds the things it's looking for, whether a classifier flagging spam, a search engine returning documents, or a model detecting tumors.

- **Precision** asks: of everything the system flagged, how much was right? A spam filter that flags 100 emails, 90 of them actually spam, has 90 percent precision.
- **Recall** asks: of everything that should have been flagged, how much did the system catch? If 200 spam emails arrived and it caught 90, recall is 45 percent.

Both come from the **confusion matrix**, which sorts every prediction into four cells: true positives (correctly flagged), false positives (flagged wrongly), false negatives (missed), and true negatives (correctly ignored). Precision is true positives divided by everything flagged; recall is true positives divided by everything real. Recall is the same quantity medicine calls sensitivity; see [[Sensitivity and Specificity]].

The two pull against each other. Most classifiers produce a score, and a threshold decides what counts as positive. Lower the threshold and the system flags more, catching more real cases but more false alarms too. Raise it and it flags only sure things, missing more. Flagging everything gives perfect recall and terrible precision; flagging only the single most certain case gives high precision and nearly no recall. Plotting precision against recall across thresholds shows the whole tradeoff.

Which matters more depends on the cost of each error:

- **Spam filtering** favors precision: losing a real email is worse than seeing some spam.
- **Cancer screening** favors recall: a missed case is far worse than a follow-up test.
- **Search and retrieval** usually needs recall first, gathering everything relevant, then precision, putting the best at the top; see [[Reranking]] and [[Retrieval-Augmented Generation]].

The **F1 score** combines them into one number, their harmonic mean, which stays low unless both are decent. It's convenient for comparing models but hides which way a system fails.

Why not just measure accuracy, the fraction of predictions that are right? Because of rare classes. If one transaction in a thousand is fraud, a model that never flags anything is 99.9 percent accurate and useless. Precision and recall focus on the rare positive class that matters. Even so, precision depends on how common positives are: the same detector shows lower precision where cases are rarer, a version of the [[Base Rate Fallacy]].

These metrics depend entirely on correct labels for comparison; see [[Ground Truth]]. They also need a fixed test set the model hasn't seen; see [[Train-Test Split]]. Language model evaluations often reduce to them, such as how many true facts an answer includes against how many claims are invented; see [[Hallucination]] and [[Evaluation Harness]]. Systems that report a confidence score are also judged on whether those confidences mean what they say; see [[Calibration]].

## See also
- [[Conformal Prediction]]
- [[Wake Word]]
- [[Anomaly Detection]]
