---
aliases:
  - CI/CD pipeline
  - Build pipeline
  - Release pipeline
  - Build once, deploy many
tags:
  - delivery
summary: The automated path every change takes from commit to production, ordered so that cheap checks run first and the same tested artifact is what finally ships.
---
A **deployment pipeline** is the automated sequence of stages that takes a change from a developer's Commit all the way to production. Each stage builds confidence that the change is safe, and a failure at any stage stops it from going further. Jez Humble and David Farley named and described the idea in their 2010 book *Continuous Delivery*, though its parts, such as automated builds and test suites, were already common. A pipeline joins [[Continuous Integration]] to deployment, and when the final step needs no human approval, the result is [[Continuous Deployment]].

A typical pipeline runs in stages:

1. **Commit stage.** Compile the code, run Unit Test suites and Static Analysis, and produce a build artifact. This should finish in minutes, because developers wait on it.
2. **Acceptance stage.** Deploy the artifact to a test environment and run slower Integration Test and End-to-End Test suites.
3. **Staging or pre-production.** Further checks, performance testing, or manual exploration in an environment that resembles production.
4. **Production.** Release, often gradually with a [[Canary Release]] or a Blue-Green Deployment, followed by a [[Smoke Test]] to confirm the live system works.

Several principles make pipelines work well:

- **Fail fast, cheapest checks first.** Ordering stages so quick, likely-to-fail checks run early gives the fastest feedback, the [[Fail Fast]] idea applied to delivery. The shape of the [[Test Pyramid]] follows from it.
- **Build once, deploy many.** The artifact is built once at the start and the same artifact is promoted through every environment. Rebuilding for production would mean shipping something that was never tested. A [[Reproducible Build]] makes the artifact verifiable, and [[Code Signing]] proves it hasn't changed along the way.
- **Configuration comes from the environment.** The artifact stays identical. Each environment supplies its own settings through an Environment Variable or a config service, and credentials through [[Secret Management]], never baked in.
- **Every commit is a release candidate.** Any change that passes every stage could ship, which keeps the main branch deployable at all times.
- **The pipeline is code.** Its definition lives in the repository, reviewed and versioned like anything else, and environments are created with [[Infrastructure as Code]].

Pipelines degrade in recognizable ways. A [[Flaky Test]] fails at random, and people learn to rerun until it passes, which erodes trust in every red build. Slow stages encourage batching changes, which makes failures harder to diagnose. A manual approval step that nobody understands becomes a ritual. Pipeline health shows up directly in [[DORA Metrics]], especially lead time for changes. Some teams add a short-lived [[Ephemeral Environment]] per pull request as an early stage.

## See also
- [[Theory of Constraints]]
- [[Build System]]
