---
aliases:
  - Ontologies
  - Semantic Web
  - RDF
  - Controlled vocabulary
tags:
  - data
summary: A formal, machine-readable description of the kinds of things in a domain and how they relate, built so different systems can share data without disagreeing about what it means.
---
An **ontology**, in computing, is a formal specification of the concepts in a domain and the relationships between them. Where a [[Taxonomy]] arranges terms in a hierarchy, an ontology also defines properties, constraints, and rules: not only that a cardiologist is a kind of physician, but that every physician has a license, that a license is issued by exactly one authority, and that anyone who treats a patient must hold one.

The word is borrowed from philosophy, where ontology is the study of what exists. Computer scientist Tom Gruber gave the most quoted computing definition in 1993: "an explicit specification of a conceptualization."

Most ontologies are built from a few pieces:

- **Classes.** Kinds of things, such as `Person`, `Drug`, or `Disease`, usually arranged in a hierarchy.
- **Properties.** Relationships between things, such as `treats` or `authorOf`, with rules about what can be linked to what.
- **Individuals.** Specific instances, such as a particular drug.
- **Axioms.** Logical rules from which new facts can be inferred. If every `Antibiotic` is a `Drug`, and penicillin is an `Antibiotic`, a reasoner concludes penicillin is a `Drug` without being told.

A simpler relative is the **controlled vocabulary**: an agreed list of terms, often with preferred and alternate labels, used so that everyone indexes the same idea the same way. Library subject headings and medical coding systems are examples.

The **Semantic Web**, proposed by Tim Berners-Lee in 2001, aimed to make the [[World Wide Web]] machine-readable using these tools. Its standards include RDF, which expresses data as subject–predicate–object statements, and OWL, a language for ontologies. The full vision of agents reasoning across the web never arrived; publishers had little incentive to annotate pages carefully, and logic struggled with messy, contradictory real data. Parts succeeded: schema.org markup in web pages, which search engines read, and Wikidata, a large shared [[Knowledge Graph]]; see [[Structured Data]].

Ontologies are most successful in fields with strong reasons to agree. The Gene Ontology standardizes how biologists describe gene functions across species, and SNOMED CT gives clinical terms codes that hospital systems can exchange.

The limits are human. Agreeing on definitions across communities is slow and political, and categories that look natural in one field are arbitrary in another; see [[Prototype Theory]] and [[Linguistic Relativity]]. Real concepts have fuzzy edges that formal logic handles poorly. Statistical methods, which place meanings as points in space learned from usage, have taken over much of the work ontologies once promised; see [[Embedding]]. The two now often combine, with ontologies supplying stable identifiers and statistical models handling ambiguity; see [[Entity Resolution]].

## See also
- [[Graph Database]]
- [[Entity-Attribute-Value]]
- [[Zettelkasten]]
- [[Expert System]]
- [[Entity-Relationship Model]]
- [[Map and Territory]]
- [[Hierarchical Data]]
