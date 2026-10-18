---
aliases:
  - K8s
  - Container orchestration
  - Pod
tags:
  - systems
summary: A system that runs containers across a cluster of machines by continually reconciling what is running with a declared desired state, powerful and notoriously complex.
---
**Kubernetes** is an open-source system for running containers across a cluster of machines. You describe what you want, such as five copies of a web service, each with a certain amount of memory, reachable at a certain address, and Kubernetes works out where to run them, restarts them when they crash, and moves them when machines fail. Google released it in 2014, drawing on its internal system Borg, and it became the standard way to run containers at scale; see [[Containerization]].

The core idea is **declarative desired state**. Rather than issuing commands ("start a container on machine 3"), you submit documents describing the end state, and a set of *controllers* continually compare that description with reality and act to close the gap. If a container dies, the count drops below five and a controller starts another. This reconciliation loop is a form of [[Negative feedback]], and it's why Kubernetes heals itself without an operator. It pairs naturally with [[Infrastructure as Code]] and [[GitOps]], where the desired state lives in version control.

Its main building blocks:

- **Pods.** The smallest unit, one or more containers that share a network address and storage and always run together on one machine.
- **Deployments.** Manage a set of identical pods and replace them gradually when the image changes, a [[Rolling Deployment]] by default, with automatic rollback if new pods fail health checks.
- **Services.** Give a changing set of pods one stable address and spread traffic across them; see [[Load Balancing]].
- **Scheduler.** Places each pod on a machine with enough free CPU and memory, a bin-packing problem. Resource limits are enforced by [[Control Groups]], and a container exceeding its memory limit is killed, as by the [[Out-of-Memory Killer]].
- **ConfigMaps and Secrets.** Inject configuration and credentials, though Secrets are only encoded, not encrypted, by default; see [[Secret Management]].

The cluster's state lives in etcd, a key-value store kept consistent across several machines by the Raft [[Consensus Algorithm]]. Every component reads and writes through a central API server, which also makes Kubernetes extensible: teams define their own resource types and controllers to manage databases, certificates, or anything else the same way.

Kubernetes treats machines as interchangeable and containers as disposable, the philosophy of [[Immutable Infrastructure]]: never patch a running container, replace it. Applications must cooperate by keeping state outside the container, starting quickly, and tolerating being stopped at any time, the habits described by the [[Twelve-Factor App]].

Its reputation for complexity is earned. Networking, storage, permissions, and upgrades each carry a learning curve, and a small application can need hundreds of lines of configuration. Many teams find it worth it only at scale, or use managed services that hide the control plane. Internal tooling that wraps it for application developers is a large part of [[Platform Engineering]].

## See also
- [[Microservices]]
- [[Service Discovery]]
