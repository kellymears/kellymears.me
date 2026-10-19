---
aliases:
  - xz backdoor
  - CVE-2024-3094
  - Jia Tan
tags:
  - delivery
summary: A backdoor planted in the xz compression library in 2024 by a contributor who spent two years earning a tired maintainer's trust, hidden in release tarballs rather than the repository, and caught by chance weeks before it reached stable Linux distributions.
---
The **xz Utils backdoor** was a deliberately planted flaw in xz Utils, a widely used open source compression library, discovered on 29 March 2024. It was built to let whoever held a particular private key run commands on Linux servers through their remote login service, before logging in; see [[Secure Shell]]. It was found before it reached the stable releases of major distributions, mostly by luck.

The attack began years earlier. From 2021 a contributor using the name Jia Tan sent helpful patches to the project, which was maintained largely by one volunteer, Lasse Collin. In 2022 several other accounts, probably fake, began complaining on the mailing list that the project was moving too slowly and pressing Collin to hand over control. Collin had mentioned his limited capacity and long-term mental health issues. Jia Tan gradually became a co-maintainer, with the right to make releases; see [[Open Source Sustainability]] and [[Astroturfing]].

The payload was hidden with care:

- **Not in the repository.** The code that activated the backdoor appeared only in the release tarballs, as a modified build script that ordinary readers of the git history wouldn't see; see [[Reproducible Build]].
- **Disguised as test data.** The malicious code itself was stored in binary files described as corrupted archives for the test suite.
- **Indirect target.** The xz library has nothing to do with remote login. But several distributions patched their login server to link a system library that in turn loaded the xz library, and the backdoor hooked a function there as the program loaded; see [[Dynamic Linking]].

Versions 5.6.0 and 5.6.1, released in February and March 2024, carried the backdoor into testing branches of Debian, Fedora, and other distributions. Andres Freund, a PostgreSQL developer, noticed that remote logins on a test machine were using unexpected CPU time, about half a second each, and that a memory-checking tool reported errors. He traced both to the library and reported it publicly; see [[Profiling]] and [[Sanitizer]].

The case is cited in several arguments:

- **Maintainer burden is a security risk.** A single overextended maintainer is a target for social engineering, and the pressure campaign looked like ordinary user frustration; see [[Bus Factor]].
- **Review covers the wrong artifact.** What people read in the repository was not what got built and shipped; see [[Code Review]].
- **Many eyes caught it, barely.** The backdoor was noticed through a performance regression, not an audit; see [[Linus's Law]].

The attacker's identity remains unknown. The patience, two years of trust-building before acting, led many analysts to suspect a state-backed operation, though that hasn't been established; see [[Confidence Trick]].

## See also
- [[Archive File]]
- [[Build Provenance]]
- [[Event-stream Incident]]
- [[Email Patch Workflow]]
