---
aliases:
  - Recommendation engine
  - Collaborative filtering
  - Cold start problem
tags:
  - agents
summary: Software that predicts which items a person will want from their past behavior and that of similar people, the engine behind feeds, stores, and streaming, and its feedback loops.
---
A **recommender system** predicts which items a person is likely to want, products, songs, videos, posts, and ranks them. Feeds, online stores, and streaming services run on them, and they decide much of what people see online.

There are two classic approaches:

- **Content-based filtering** recommends items similar to what a person liked before, comparing features: genre, author, keywords, or learned [[Embedding]]s. Someone who watched three heist films gets a fourth.
- **Collaborative filtering** ignores what items are and uses who liked them. If people who liked the same things as you also liked something you haven't seen, it's recommended. "Customers who bought this also bought" is the familiar form. It can surface unexpected matches that no feature description would predict.

Collaborative filtering got its big push from the Netflix Prize (2006–2009), a million-dollar competition to improve rating predictions by 10 percent. The winning techniques factored the huge, mostly empty grid of users and ratings into a small number of hidden "taste" dimensions for each user and each item; see [[Dimensionality Reduction]]. Modern systems use neural networks that weigh thousands of signals, and work in two stages: fast retrieval of a few hundred candidates from millions, often by nearest-neighbor search over embeddings, then a heavier model reranking them; see [[Vector Database]] and [[Reranking]].

Recurring problems:

- **Cold start.** A new user or new item has no history, so collaborative filtering has nothing to go on. Systems fall back on popularity, content features, or questions at signup. Content features help most here, since they don't depend on anyone's history.
- **Implicit signals.** Few people rate things. Systems infer preferences from clicks, watch time, and skips, which measure what grabs attention rather than what people value; see [[Goodhart's Law]].
- **Popularity bias.** Popular items get recommended, so they get more interactions, so they get recommended more; see [[Matthew Effect]]. Niche items that would suit a person well may never be shown.
- **Exploration.** Showing only predicted favorites means never learning about anything else, so systems mix in some uncertain picks; see [[Multi-Armed Bandit]].

Because recommendations shape the behavior they're trained on, the loop feeds itself. Critics argue that feeds optimized for engagement narrow what people see and reward outrage; see [[Filter Bubble]] and [[Doomscrolling]]. Evidence on the strength of these effects is mixed, but the incentive is clear, and engagement-maximizing ranking is a recurring element in accounts of platform decline; see [[Enshittification]]. Endless personalized feeds also use the same unpredictable rewards that make slot machines compelling; see [[Variable-Ratio Reinforcement]].

Recommendation also raises privacy questions, since accurate predictions require detailed behavioral records; see [[Personal Data]].

## See also
- [[K-Means Clustering]]
- [[Two-Sided Market]]
- [[Barnum Effect]]
