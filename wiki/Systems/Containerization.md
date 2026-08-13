---
aliases:
  - Containers
  - Docker
tags:
  - systems
summary: Packaging an application with its dependencies into an isolated, reproducible runtime unit.
---
**Containerisation** packages an application together with its dependencies into an image that runs in an isolated environment sharing the host kernel. Compared with virtual machines it is far lighter; compared with running software directly it is far more reproducible.

The benefits are that the environment is described in a file, identical everywhere, and disposable — resetting a service to a known state is deleting a container. That last property is what makes containers so valuable for local development databases.

The costs are also concrete. Filesystem and network performance are lower than native, particularly on hosts where the kernel is virtualised. Debugging crosses a boundary. And the container runtime is itself a service that can fail in confusing ways: a wedged engine can accept connections on published ports while every query hangs indefinitely, so an application appears to connect and then stalls forever, with the runtime's own status still reporting healthy. Checking whether the runtime responds *at all*, with a short timeout, is the first move — it distinguishes a wedged engine from a slow query in seconds.

Containers also concentrate the [[Port]] problem: published ports are host ports, so two projects both mapping a database port collide.

## See also
- [[Port]]
- [[Environment Variable]]
- [[Determinism]]
- [[Continuous Deployment]]

## Related
- [[Shell]]
- [[Secret Management]]
- [[Ground Truth]]
- [[Git Worktree]]
- [[Vacuous Truth]]
- [[Silent Failure]]
