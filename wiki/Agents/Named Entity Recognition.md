---
aliases:
  - Entity extraction
  - Information extraction
tags:
  - agents
summary: The language task of finding names of people, organizations, places, dates, and similar things in running text and labeling what kind each is, a building block of search, knowledge graphs, and redaction.
---
**Named entity recognition**, or NER, finds the names in a piece of text and labels what kind of thing each one is. In the sentence "Ada Lovelace worked with Charles Babbage in London in 1843," a system should mark two people, a place, and a date. The standard categories are people, organizations, and locations, often extended to dates, amounts of money, products, and whatever a particular field needs, such as genes or drug names.

The task took shape in the 1990s through government-sponsored competitions on extracting information from news reports. The term named entity was coined for one held in 1995. A 2003 shared task on English and German news became the benchmark that many later systems were measured against; see [[Benchmarking]].

Methods have followed the general history of language processing:

1. **Rules and lists.** Early systems combined hand-written patterns with lists of known names. They were precise on what they knew and brittle on anything new; see [[Regular Expression]].
2. **Sequence models.** Statistical models labeled each word in turn, using the labels of neighboring words, and were trained on annotated text; see [[Hidden Markov Model]] and [[Supervised Learning]].
3. **Neural networks.** Recurrent networks, then pretrained transformer models fine-tuned on labeled examples, improved accuracy substantially; see [[Recurrent Neural Network]] and [[Fine-Tuning]].
4. **Language models.** General models can now extract entities from instructions alone, returning them in a fixed format; see [[Large Language Model]] and [[Structured Output]].

A common encoding marks each word as beginning an entity, continuing one, or outside any entity. It handles names that span several words, though not entities nested inside one another, such as a university named after a city.

The hard cases are about ambiguity and novelty. "Washington" might be a person, a city, a state, or a government. "Apple" might be a fruit or a company. New names appear constantly, and a model trained on news struggles with medical records or legal contracts. Social media adds misspellings, missing capitals, and slang, and names in other languages and scripts raise further problems; see [[Distribution Shift]]. Errors compound when text first comes from scanned pages; see [[Optical Character Recognition]].

Recognizing a name is often only the first step. **Entity linking** decides which real-world thing a mention refers to, connecting it to an entry in a database; see [[Entity Resolution]] and [[Knowledge Graph]]. Together these turn unstructured text into structured facts.

Applications include search engines that understand queries about specific people or places, news monitoring, résumé parsing, and redacting personal names before documents are shared. Redaction raises the stakes: a missed name is a privacy leak, so systems are tuned for recall over precision; see [[Precision and Recall]].

## See also
- [[Natural Language Processing]]
- [[Data Labeling]]
