---
aliases:
  - IaC
tags:
  - delivery
summary: Defining infrastructure in version-controlled files instead of configuring it by hand through a console.
---
**Infrastructure as Code** describes servers, networks, and other infrastructure in text files — Terraform, CloudFormation, Pulumi — rather than clicking through a cloud provider's console. The definition lives in [[Version Control]] alongside the application code it supports, which means it gets the same treatment: [[Code Review]], history, branches, and a diff that shows exactly what changed between two states of the world.

The alternative — manually configuring infrastructure through a console or a series of undocumented CLI commands — produces environments nobody can reproduce. When the only record of *why* a security group has a particular rule is a memory of clicking a checkbox eighteen months ago, recreating that environment from scratch (a disaster recovery scenario, a new region, a staging environment meant to mirror production) becomes an exercise in archaeology. IaC's argument is that the config *is* the documentation, and running it again produces the same infrastructure, which is what makes [[Immutable Infrastructure]] tractable at all — you can't cheaply throw servers away and rebuild them unless rebuilding is a command, not a runbook.

The tools split on a real distinction: declarative tools (Terraform) describe the desired end state and let the tool compute the diff to get there; imperative tools describe the steps to take. Declarative dominates for infrastructure because "what should exist" is usually the easier question to answer correctly than "what commands, run in what order, produce that state" — and a declarative diff is what makes a pull request reviewable before it touches anything real.

[[GitOps]] takes this a step further: instead of a human or CI job running the IaC tool against production, an agent inside the cluster continuously reconciles live state against what's declared in the repository, so the repository isn't just a record of intent — it's the live source of truth.

## See also
- [[GitOps]]
- [[Immutable Infrastructure]]
- [[Version Control]]
- [[Code Review]]

## Related
- [[Continuous Deployment]]
