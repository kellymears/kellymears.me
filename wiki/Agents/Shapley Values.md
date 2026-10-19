---
aliases:
  - SHAP
  - Shapley value
  - Shapley additive explanations
tags:
  - agents
summary: A method from cooperative game theory for dividing a joint payoff fairly among the players who produced it, widely used to explain a model's prediction by attributing it among the input features.
---
Suppose three people together earn a sum that none could earn alone. How should it be split? In 1953 the mathematician Lloyd Shapley proposed an answer: give each player their average **marginal contribution**, the amount they add when joining a group, averaged over every possible order in which the players could have arrived. That number, the **Shapley value**, is the only division satisfying a short list of fairness rules. Players who contribute identically get identical shares, a player who adds nothing gets nothing, and the shares add up to the total. Shapley shared the 2012 economics Nobel prize, partly for related work on matching; see [[Game theory]].

Machine learning borrowed the idea to explain predictions. Treat each input feature as a player and the model's output as the payoff. A feature's Shapley value is how much, on average, adding it moves the prediction from a baseline, usually the average prediction. For a loan model that declined an application, the values might attribute most of the gap to high debt, some to a short credit history, and a little in the other direction to stable income; see [[Explainable AI]].

The 2017 **SHAP** framework by Scott Lundberg and Su-In Lee unified several earlier explanation methods under this definition and made it practical. Exact calculation requires evaluating every subset of features, which grows exponentially, so SHAP approximates it by sampling or, for tree ensembles, computes it exactly with a fast algorithm that exploits the tree structure; see [[Decision Tree]] and [[Monte Carlo Method]]. Averaging the magnitudes across many predictions gives a global ranking of which features matter most, a common sanity check on engineered features; see [[Feature Engineering]].

The appeal is a principled answer where alternatives are ad hoc. The caveats are real, though:

- **"Removing" a feature is ill-defined.** Models can't run with a missing input, so it's replaced by values from background data. Different choices yield different explanations, and replacing one of two correlated features creates unrealistic inputs; see [[Distribution Shift]].
- **Attribution isn't causation.** A Shapley value describes how the model uses a feature, not whether the feature causes the outcome in the world; see [[Causal Inference]].
- **Interactions get split.** When two features matter only together, their joint effect is divided between them, which can hide the interaction.
- **Explanations can be gamed.** Researchers have shown models that behave in a biased way while producing innocuous-looking explanations; see [[Algorithmic Bias]].

The same idea appears beyond features: valuing individual training examples by their contribution to accuracy, and attributing behavior to components inside a network, where it is related to ablation and patching; see [[Ablation Study]] and [[Activation Patching]].

## See also
- [[Logistic Regression]]
- [[Mechanistic Interpretability]]
