---
aliases:
  - Git-Ops
tags:
  - delivery
summary: Using a Git repository as the live source of truth for deployed state, reconciled continuously by an in-cluster agent.
---
**GitOps** is [[Infrastructure as Code]] pushed one step further: instead of a person or a CI pipeline running `terraform apply` (or its equivalent) *against* production, an agent running *inside* the target environment continuously watches a Git repository and reconciles live state to match what it declares. A merge to the tracked branch is the deployment — there is no separate "now go apply it" step, and no path to a running change that didn't go through a pull request first.

The mechanism is a control loop, the same shape Kubernetes itself uses internally: the agent compares desired state (the repo) against observed state (the cluster) and issues whatever commands close the gap, on a schedule, forever. That has a useful side effect beyond deployment: if something drifts — a hotfix applied by hand, a resource someone deleted by accident — the next reconciliation pass silently puts it back, because the repo, not the cluster's current state, is authoritative. Tools like Argo CD and Flux are the common implementations of this loop for Kubernetes.

This is a stronger claim than "we keep our infra config in Git." Many teams do that and still deploy by running a script from a laptop or a CI job with standing production credentials. GitOps' distinguishing feature is that the credentials to change production live only inside the cluster's own reconciler, pulling from Git — nothing outside the cluster pushes to it. That closes a real attack surface (a compromised CI runner with prod credentials) at the cost of a real constraint: anything that needs to happen *now*, out of band, has to go through the same pull-request path as everything else, which is a feature during a calm week and friction during an incident.

## See also
- [[Infrastructure as Code]]
- [[Immutable Infrastructure]]
- [[Continuous Deployment]]
- [[Version Control]]

## Related
- [[Rollback]]
