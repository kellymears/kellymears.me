---
aliases:
  - Drift
  - Infrastructure drift
  - Snowflake server
  - Drift detection
  - Reconciliation loop
tags:
  - delivery
summary: The slow divergence between how systems are supposed to be configured and how they actually are, through hotfixes and console clicks, and the tools that detect or reverse it.
---
**Configuration drift** is the gradual divergence between the intended configuration of a system and its actual state. A server, environment, or cloud account starts out matching its definition, then accumulates changes nobody recorded: a hotfix applied by hand during an incident, a setting toggled in a web console, a package upgraded on one machine but not another. Each change is small and reasonable. Together they leave systems that nobody can describe or reproduce.

Martin Fowler named the end state the **snowflake server** in 2012: a machine so customized by years of manual changes that it is unique, fragile, and impossible to rebuild. Everyone is afraid to touch it, which is exactly the condition [[Chesterton's Fence]] warns about, except that here nobody knows which fences are load-bearing.

Common sources of drift:

- **Manual fixes under pressure.** During [[Incident Response]], someone logs in and changes a setting to stop the bleeding, then never folds it back into the code.
- **Console changes.** Clicking through a cloud provider's web interface, sometimes called ClickOps, bypasses whatever tooling defines the infrastructure.
- **Partial applies.** An automation run that fails halfway leaves some resources updated and others not.
- **Out-of-band updates.** Automatic package updates, provider-side changes, or other teams' tooling modify resources independently.
- **Environment divergence.** Staging and production slowly differ, so tests pass in one and fail in the other. Database schemas drift the same way when [[Database Migration]] scripts are applied inconsistently.

The defenses fall into three groups:

- **Declare the desired state.** [[Infrastructure as Code]] describes systems in version-controlled files. Planning tools compare the files with reality and show the differences, turning drift into something visible.
- **Reconcile continuously.** In [[GitOps]], a controller repeatedly compares the live system with the repository and reverts any difference. This is a control loop, the same structure as [[Homeostasis]] in the body: sense the state, compare with the setpoint, correct. Manual changes simply do not survive.
- **Never modify, only replace.** [[Immutable Infrastructure]] rebuilds servers from images rather than changing them in place, so there is nothing to drift. [[Containerization]] and [[Ephemeral Environment]] setups apply the same idea to applications and test environments.

Drift is not purely a server problem. Documentation drifts from the system it describes, a process covered under [[Documentation Rot]]. Dependencies drift when versions float, which a [[Lockfile]] prevents. Secrets and environment settings drift between machines unless managed centrally, as in [[Secret Management]].

The honest response to drift is not to forbid manual change entirely. Incidents sometimes require it. The discipline is to treat any manual change as temporary and bring it back into the declared state quickly, so the definition stays true. Systems with no drift detection drift; the only question is how far.

## See also
- [[YAML]]
- [[Reproducible Build]]
- [[Twelve-Factor App]]
