---
aliases:
  - Data annotation
  - Inter-annotator agreement
tags:
  - agents
summary: The work, mostly done by people, of attaching correct answers to examples so that machine learning models can learn from and be evaluated against them, which is costly, error-prone, and shapes what models learn.
---
**Data labeling**, or annotation, is the work of attaching answers to examples so machine learning models can learn from them: marking which images contain a cat, outlining tumors in scans, tagging names in text, rating which of two chatbot responses is better. Supervised learning depends on these labels, and evaluation depends on them even more; see [[Supervised Learning]].

Labels are treated as the truth a model is measured against, but they're produced by people under time pressure and with ambiguous instructions; see [[Ground Truth]]. ImageNet, the dataset behind the deep learning breakthrough of 2012, was labeled largely through crowdsourcing, with workers on Amazon Mechanical Turk verifying millions of images; see [[ImageNet]]. Studies have since estimated that widely used test sets contain label errors at rates of a few percent, enough to change which model appears best.

Quality control is a field of its own. Teams write detailed guidelines, assign the same example to several annotators, and measure how often they agree. Low agreement may mean careless work, but often means the task itself is ambiguous: two experts may honestly disagree about sentiment or about whether a post is offensive. Combining several independent judgments usually beats any single one; see [[Wisdom of the Crowd]]. Turning a fuzzy concept into consistent labeling rules is a form of operationalization, with the same pitfalls; see [[Operationalization]].

Labels carry the labelers' perspectives. Annotators' cultural background affects judgments about toxicity, and categories chosen by dataset designers build assumptions into every model trained on them; see [[Algorithmic Bias]]. Errors and shortcuts in labels flow directly into models; see [[Garbage In, Garbage Out]].

The labor has drawn scrutiny. Much annotation is outsourced to low-wage workers, and reporting has described content moderators and safety annotators reviewing disturbing material for little pay. The work is often invisible in accounts of AI progress. Annotation companies have grown into large businesses, and expert labeling in fields like medicine and law commands far higher rates.

Several strategies reduce the burden. Having the model pick the most informative examples to label stretches a budget further; see [[Active Learning]]. Weak supervision combines rough automatic rules into noisy labels. Increasingly, language models label data themselves, with people auditing samples; see [[LLM-as-Judge]] and [[Synthetic Data]].

Language models made a new kind of labeling central. Training them to be helpful relies on people comparing pairs of responses and choosing the better one, so preference labels shape model behavior directly; see [[Reinforcement Learning from Human Feedback]]. Annotators' tendency to prefer confident, agreeable answers can reward flattery; see [[Sycophancy]].

Labeled data also leaks. When test examples or their labels appear in training data, scores overstate ability; see [[Benchmark Contamination]].

## See also
- [[Named Entity Recognition]]
- [[Object Detection]]
