---
aliases:
  - XAI
  - Saliency map
  - Feature attribution
  - Clever Hans effect
tags:
  - agents
summary: Methods for showing why a model made a particular decision, from heat maps over images to scores for each input feature, valuable for catching models that learned the wrong thing but prone to explanations that look convincing and aren't faithful.
---
**Explainable AI**, or XAI, covers methods that show why a machine-learning model produced a particular output. A model that approves loans, flags medical scans, or rejects job applicants can be accurate on average while relying on reasons nobody would accept, and its millions of learned weights don't say what those reasons are; see [[Neural Network]].

The classic warning is a horse. Clever Hans, in early-1900s Germany, appeared to do arithmetic by tapping his hoof, until an investigation found he was reading tiny unconscious cues from his questioner. Models do the same thing. One widely cited 2016 demonstration built a husky-versus-wolf classifier from photos in which every wolf stood in snow, and its explanations revealed that the model was mostly detecting the snow; see [[Correlation and Causation]] and [[Distribution Shift]].

Common approaches:

- **Saliency maps** highlight which pixels most affected an image classifier's decision, often by measuring how the output changes as each pixel changes; see [[Backpropagation]].
- **Local surrogates**, such as LIME, perturb one input many times, watch how the prediction moves, and fit a simple, readable model that imitates the complex one near that point.
- **Shapley values**, borrowed from cooperative game theory, split a prediction among the input features by averaging each feature's contribution over every combination of others. The SHAP method made them practical and popular for tabular data; see [[Game theory]].
- **Counterfactuals** answer a question people often care about more: what is the smallest change that would have flipped the decision, such as a slightly higher income for a denied loan.

Explanations can mislead. A 2018 study found that some saliency methods produced nearly the same maps after a model's learned weights were replaced with random ones, so the maps reflected the image's edges more than the model's reasoning. Post-hoc explanations are approximations that can be plausible but unfaithful, and a convincing explanation can increase trust in a model that doesn't deserve it; see [[Automation Bias]]. The same problem arises when language models explain their own steps in text, which may not match the computation that produced the answer; see [[Chain-of-Thought Prompting]].

The computer scientist Cynthia Rudin has argued that for high-stakes decisions, the better course is to use models that are interpretable by design, such as short decision lists or scoring rules, which often perform about as well on structured data; see [[Decision Tree]]. A different strand, mechanistic interpretability, tries to reverse-engineer the internal computations of large networks directly; see [[Mechanistic Interpretability]].

Law adds pressure. The European Union's data protection rules give people rights around automated decisions, debated as a "right to explanation"; see [[GDPR]]. Audits for unfair treatment also depend on seeing which inputs drive outcomes; see [[Algorithmic Bias]] and [[Human in the Loop]].

## See also
- [[Linear Probe]]
- [[Bayesian Network]]
- [[Model Card]]
