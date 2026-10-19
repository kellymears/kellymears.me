---
aliases:
  - Cloudflare regex outage
  - WAF outage
tags:
  - testing
summary: In July 2019, a single new firewall rule containing a badly behaved regular expression pushed CPU usage to 100 percent across Cloudflare's entire network within minutes, taking down millions of websites for about half an hour.
---
**The Cloudflare outage of 2019** was a global disruption of Cloudflare's network on July 2, 2019. For about 27 minutes on a weekday morning in Europe, visitors to sites using Cloudflare received errors, because the machines that handle that traffic had exhausted their processors. The cause was one regular expression in a new firewall rule, not an attack.

Cloudflare runs a web application firewall that inspects incoming requests and blocks those matching attack patterns; see [[Web application firewall]]. Engineers deployed a new rule meant to detect a type of cross-site scripting attack. Its regular expression contained nested wildcard patterns that, on certain inputs, forced the matching engine to try an enormous number of possibilities; see [[Regular Expression]] and [[Catastrophic backtracking]]. The engine Cloudflare used then didn't guarantee matching time proportional to input length, so evaluating the rule could take vastly longer than intended.

Firewall rules were deployed through a system built to push changes worldwide within seconds, so customers could respond quickly to new attacks. The new rule reached every server almost at once, and CPU usage spiked to 100 percent everywhere; see [[Blast radius]].

Recovery was slowed by dependencies. The emergency switch to disable the firewall was available, but some internal tools staff needed were themselves reached through Cloudflare's network and authentication, which was affected. Once engineers globally disabled the firewall, traffic recovered; see [[Incident Response]].

Cloudflare published a detailed postmortem and made several changes:

- **Staged rollouts.** Firewall rules now go through gradual deployment, as software releases already did; see [[Canary Release]].
- **Better regex engines.** The company moved toward engines that guarantee linear-time matching by refusing to backtrack.
- **CPU protection.** Limits were added so one rule couldn't consume all processing time; see [[Load Shedding]].
- **Performance testing.** Rules are profiled and benchmarked for matching cost before every release; see [[Profiling]].

The incident is often cited in discussions of regular expression denial of service, in which attackers craft inputs that make matching slow. Here, nobody attacked; ordinary everyday traffic was enough. Tools that search for slow inputs, much like fuzzers search for crashes, can find these problems before deployment; see [[Fuzzing]].

The broader lessons:

- **Fast paths need safeguards.** Systems designed to deploy quickly in emergencies are dangerous for routine changes.
- **Configuration is code.** Rules and settings can break systems as surely as software, and deserve the same testing; see [[Feature Flag]].
- **Break-glass access must not depend on the thing that's broken**; see [[Amazon S3 Outage of 2017]].

The outage joined a family of internet-wide failures that spread through shared infrastructure; see [[CrowdStrike Outage]] and [[Cascading Failure]].

## See also
- [[Static Analysis]]
- [[Shadow Traffic]]
