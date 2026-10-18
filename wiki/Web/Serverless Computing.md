---
aliases:
  - Serverless
  - Function as a service
  - FaaS
  - Cold start
tags:
  - web
summary: Running code as short-lived functions that a cloud provider starts on demand and bills by the millisecond, trading control and predictable latency for zero idle cost and no servers to manage.
---
**Serverless computing** runs code without the developer provisioning or managing servers. There are still servers; the provider owns them. You upload a function, say which event triggers it, such as an HTTP request, a file upload, a [[Message Queue]] message, or a [[Cron]] schedule, and the platform starts copies as needed, runs them, and bills for the time they actually spend executing. AWS Lambda, launched in 2014, made the model popular; "function as a service" is the narrower name.

The appeal:

- **Scale to zero.** No traffic, no bill. A side project or an internal tool used twice a week costs almost nothing.
- **Automatic scaling.** A traffic spike starts more instances without anyone adjusting capacity.
- **Less operations work.** No operating system patching, no [[Load Balancing]] setup, no capacity planning.

The constraints follow from the model. Instances are disposable, so a function must be stateless: anything that needs to persist goes in a database or object store, a discipline the [[Twelve-Factor App]] already recommended. Runtimes are capped, often at a few minutes to fifteen, so long jobs have to be split up. Memory and CPU come in fixed sizes.

The best-known cost is the **cold start**. When no warm instance is available, the platform must create an isolated environment, load the runtime, and run your initialization code before handling the request. That can add anywhere from tens of milliseconds to several seconds, worst for large bundles and heavyweight runtimes. Providers isolate tenants with lightweight virtual machines, such as AWS's Firecracker, that boot in about a tenth of a second; see [[Hypervisor]] and [[Multi-Tenancy]]. Developers shrink dependencies, keep functions warm, or pay for reserved instances, which gives back some of the cost advantage.

Other traps:

- **Database connections.** A thousand concurrent functions can open a thousand connections and exhaust a database built for a few hundred. Connection proxies and HTTP-based database APIs exist largely for this; see [[Connection Pool]].
- **Cost at scale.** Per-request pricing is cheap at low volume and expensive at steady high volume, where a reserved server wins.
- **Lock-in.** Triggers, permissions, and event formats are provider-specific, so moving providers means rewriting glue code.
- **Debugging.** Reproducing a production problem locally is harder when the environment exists only in the provider's cloud; see [[Observability]].

Serverless is one point on a spectrum. [[Containerization]] gives more control while still offloading machines; a plain server gives the most. A variant runs functions in lightweight isolates at many locations near users rather than in one region; see [[Edge Computing]]. Many web frameworks now deploy server-rendered routes as serverless functions automatically, so developers use the model without choosing it; see [[Server-Side Rendering]].

## See also
- [[Webhook]]
- [[Static Site Generation]]
