---
aliases:
  - System card
  - Datasheets for datasets
tags:
  - agents
summary: A short standard document published alongside a machine learning model describing what it's for, how it was trained and evaluated, where it performs worse, and what it shouldn't be used for, now routine on model hubs and for frontier releases.
---
A **model card** is a short document that accompanies a machine learning model, describing what it does, how it was built, how well it performs, and where it shouldn't be trusted. The idea is that a model handed to other people should come with the information they need to use it responsibly, much as medicine comes with a label.

The format was proposed in a 2019 paper, Model Cards for Model Reporting, by a team at Google including Margaret Mitchell and Timnit Gebru. A companion proposal from 2018, Datasheets for Datasets, made the same argument for training data: every dataset should document how it was collected, what it contains, and what it's suited for.

The original proposal suggested sections such as:

- **Intended use.** What the model is for, who it's for, and uses that are out of scope.
- **Training data.** Where the data came from and what it covers.
- **Evaluation.** Which benchmarks and metrics were used; see [[Evaluation Harness]] and [[Precision and Recall]].
- **Disaggregated results.** Performance broken down by group, such as age, skin tone, or dialect, since an overall average can hide large gaps.
- **Ethical considerations and caveats.** Known risks, limitations, and conditions under which results may not hold.

The disaggregated results are the heart of the proposal. A face analysis system that's accurate overall but fails badly for one group is a different product from what its headline number suggests.

Model cards became routine on model hubs, where a model's repository page displays its card, often as its main documentation. Developers of the largest language models publish longer **system cards**, describing safety testing, red teaming, and mitigations alongside capabilities; see [[Red teaming]] and [[Guardrail]]. Some regulations now require technical documentation along these lines for certain AI systems.

Critics note that cards are self-reported and uneven. Some are thorough; others are a few lines of marketing. Training data is often described vaguely, partly for competitive and legal reasons, and evaluations can be affected by test data leaking into training. A card is only as useful as its honesty and completeness, and readers can't easily check either.

The idea parallels documentation practices in software. A bill of materials lists the components in a build, and a changelog records what changed between versions; see [[Changelog]]. Model cards apply that habit to systems whose behavior is learned rather than written, where knowing the data and its gaps matters as much as knowing the code.

Documentation also addresses an imbalance between builders and users, who know far less about a model than its makers.
