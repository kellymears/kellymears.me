---
aliases:
  - News feed
  - For You page
  - Engagement optimization
tags:
  - web
summary: A stream of posts ordered by a ranking model's prediction of what will hold each user's attention rather than by time, which replaced the chronological timeline on most social platforms and now decides what billions of people see.
---
Early social sites showed posts in reverse chronological order: newest first, from accounts you chose to follow. An **algorithmic feed** instead ranks candidate posts for each person and shows the ones a model predicts they'll engage with most. Facebook's News Feed, launched in 2006, moved to ranking within a few years; Twitter and Instagram followed in 2016, despite user protests. TikTok's For You page took the idea further by drawing mostly from accounts the viewer doesn't follow; see [[Social Media]].

The case for ranking is volume. A user following hundreds of accounts can't see everything, and a chronological stream rewards whoever posts most often. A ranker can surface a friend's rare post over a brand's tenth of the day.

Under the hood, a feed is a large recommender system. It gathers thousands of candidate posts, scores each with models that predict actions such as liking, commenting, sharing, watching to the end, or hiding, and combines those predictions into a single score; see [[Recommender System]]. Inputs include past interactions, how long someone lingered on similar posts, who posted, and how others are reacting; see [[Like Button]]. Feeds are tuned constantly through experiments that test changes on slices of users and keep what raises the target metrics; see [[A/B testing]].

The metrics are the crux. What a model is told to maximize shapes the whole platform:

- **Engagement** is easy to measure but rewards content that provokes, including outrage, fear and conflict, because those reliably draw reactions; see [[Negativity Bias]].
- **Time spent** rewards endless, effortless consumption, which pairs naturally with infinite scrolling; see [[Infinite scroll]] and [[Doomscrolling]].
- **Surveys** asking users what they valued are used by some platforms as a counterweight, since what people click and what they're glad they saw can differ; see [[Goodhart's Law]].

Critics argue that feeds amplify misinformation and polarization and narrow what people see. Research supports some of these concerns in specific cases but finds the overall effects smaller and more mixed than popular accounts suggest. A set of 2023 studies run with Meta during the 2020 US election found that switching users to chronological feeds changed what they saw substantially but changed their political attitudes little over three months; see [[Filter Bubble]].

For creators, the feed is a landlord. Reach depends on opaque ranking changes, and tactics that please the model, such as particular video lengths or hooks in the first seconds, spread quickly; see [[Influencer]]. Variable, unpredictable rewards keep both posters and viewers coming back; see [[Operant Conditioning]].

Regulation has started to require choice. The European Union's Digital Services Act requires the largest platforms to offer at least one feed option not based on profiling, and many apps now include a chronological view, though usually not as the default; see [[Dark Pattern]].

## See also
- [[Attention Economy]]
- [[Content Moderation]]
