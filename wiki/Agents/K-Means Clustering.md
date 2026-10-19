---
aliases:
  - K-means
  - Clustering
  - Cluster analysis
tags:
  - agents
summary: The simplest widely used way to find groups in unlabeled data, by alternately assigning points to the nearest of k centers and moving each center to the middle of its points, with its blind spots.
---
**K-means clustering** is a method for dividing unlabeled data into a chosen number, *k*, of groups, so that each point belongs to the group whose center it's nearest. It's the most widely used example of **clustering**, finding structure in data with no labels to learn from; see [[Supervised Learning]] for the contrast.

The algorithm, usually credited to Stuart Lloyd at Bell Labs in 1957, alternates two steps:

1. **Assign.** Put each point in the group of whichever center is nearest.
2. **Update.** Move each center to the average position of the points assigned to it.

Repeat until nothing changes. Each round can only lower the total squared distance from points to their centers, so the process always settles, usually within a few dozen rounds. It's a simple case of alternating between guessing hidden assignments and refitting to them.

Where it settles depends on where it starts. A poor initial choice of centers can leave two centers sharing one real cluster while another cluster is split. The standard fix, k-means++ (2007), spreads the starting centers out, picking each new one with probability weighted by its distance from those already chosen, and runs are usually repeated several times, keeping the best; see [[Seeded Randomness]] and [[Simulated Annealing]].

Its blind spots follow from measuring straight-line distance to a single center:

- **You must choose k.** The "elbow method" plots error against k and looks for the bend, and silhouette scores measure how well separated the result is, but often there is no right answer.
- **It assumes round, similar-sized blobs.** Elongated, nested, or very unequal clusters get chopped incorrectly. Density-based methods such as DBSCAN, which grow clusters through crowded regions and leave sparse points as noise, handle such shapes.
- **Scale matters.** A feature measured in thousands swamps one measured in fractions unless the data is normalized first.
- **High dimensions dilute distance.** In hundreds of dimensions, points tend to be about equally far apart, so clusters blur; projecting down first helps; see [[Dimensionality Reduction]].

Uses are everywhere. Customer segmentation groups shoppers by behavior. In graphics, running k-means on an image's pixel colors picks a small palette that represents it well; see [[Color Quantization]]. Vector search systems cluster [[Embedding]]s so a query only compares against the nearest few clusters rather than every item; see [[Vector Database]]. Model compression replaces each weight with its cluster center, storing a few bits per weight; see [[Quantization]]. Spatially, the result is a [[Voronoi Diagram]]: every point of space belongs to its nearest center.

Clusters are a description of data, not a discovery of natural kinds. The algorithm will find k groups whether or not real groups exist, and people readily read meaning into them; see [[Texas Sharpshooter Fallacy]].

## See also
- [[Affinity Diagram]]
- [[Active Learning]]
- [[Scatter Plot]]
- [[Anomaly Detection]]
- [[Hyperparameter]]
