---
aliases:
  - 12-factor app
  - Twelve factors
  - Dev/prod parity
tags:
  - delivery
summary: A 2011 checklist for building web services that deploy cleanly to cloud platforms, whose rules on config, state, logs, and disposability became the default shape of containerized software.
---
The **Twelve-Factor App** is a set of principles for building web services that can be deployed, scaled, and replaced without ceremony. Adam Wiggins and colleagues at Heroku published it in 2011, distilled from watching thousands of apps run on their platform. Most of it now reads as common sense because containers and cloud platforms adopted it wholesale.

The twelve factors, grouped by what they protect:

- **One codebase, many deploys.** Each app lives in one repository in [[Version Control]], deployed to staging, production, and developer machines alike.
- **Explicit dependencies.** Declare everything, pin it in a [[Lockfile]], and assume nothing is installed system-wide.
- **Config in the environment.** Anything that varies between deploys, such as database URLs and API keys, comes from an [[Environment Variable]], never the code. The test: could the repository be made public without leaking credentials? Real systems often add [[Secret Management]] on top.
- **Backing services as attached resources.** A database or queue is a URL, swappable without code changes.
- **Separate build, release, and run.** Build an artifact once, combine it with config to make a numbered release, then run it. Releases are never edited in place, which makes [[Rollback]] a matter of running the previous one, the core of [[Immutable Infrastructure]].
- **Stateless processes.** Anything that must persist goes to a backing service, not local disk or memory, so any process can serve any request.
- **Port binding.** The app is self-contained and exports HTTP on a [[Port]], instead of being loaded into a separate web server.
- **Scale out by process type.** Run more web or worker processes horizontally, rather than making one bigger.
- **Disposability.** Start fast and shut down gracefully on SIGTERM, so processes can be killed and moved at will.
- **Dev/prod parity.** Keep environments similar in tools, time, and people. Running a different database in development than in production invites bugs no test catches.
- **Logs as event streams.** Write logs to standard output and let the platform route them, rather than managing log files.
- **Admin processes.** Run migrations and one-off tasks as processes against the same release, so a [[Database Migration]] uses the same code and config.

Container platforms implement most of these directly. A container image is the build artifact, orchestrators assume disposable processes, and [[Ephemeral Environment|ephemeral environments]] depend on config living outside the code.

The list has aged unevenly. It predates [[Observability]] beyond logs, says little about security, and its "config in environment variables" advice now coexists with mounted secret files. Its strongest idea has held up: anything that makes one deployment special, such as hand-edited config or local state, eventually turns into [[Configuration Drift]].

## See also
- [[Containerization]]
- [[Infrastructure as Code]]
- [[Blue-Green Deployment]]
- [[Idempotence]]
