---
aliases:
  - Shift left
  - Shift-left
  - Shift right
  - Shifting left
tags:
  - testing
summary: Moving testing, security, and quality checks earlier in development, where problems are cheaper to fix, and its complement of testing safely in production.
---
**Shift-left testing** is the practice of moving testing and other quality checks earlier in the development process. Picture a timeline running left to right, from requirements through design, coding, testing, and release. Traditional processes put testing near the right end, after code was written. Shifting left means checking work as early as possible, ideally as it's being written. Larry Smith coined the term in 2001.

The motivation is that problems are cheaper to fix when found early. A mistake caught in the editor costs seconds. The same mistake caught in code review costs minutes, in a staging test hours, and in production possibly days and customer trust. The often-cited curve showing costs rising a hundredfold has shakier evidence than its fame suggests, but the general direction is widely accepted: the longer a defect lives, the more work is built on top of it and the further the person fixing it is from the context.

Shift-left practices span the pipeline:

- **While writing.** A [[Type System]], linters, and other [[Static Analysis]] flag problems in the editor. [[Test-Driven Development]] writes the test before the code.
- **Before commit.** A [[Pre-commit hook]] runs formatters, fast tests, and secret scanners.
- **On every change.** [[Continuous Integration]] runs the suite on each push, and [[Code Review]] puts a second person on the design while it's still cheap to change.
- **Before code exists.** [[Behavior-Driven Development]] and early [[Acceptance Testing]] criteria agree on what "done" means before anyone builds it.
- **Security.** Dependency scanning and threat modeling in design catch issues that penetration testing would find much later, an approach also called DevSecOps. Supply chain security checks run on every build.

The [[Test Pyramid]] expresses the same priorities: many fast, early tests at the bottom and few slow ones at the top. Fail fast is the runtime counterpart, surfacing errors at the point they occur.

**Shift right** is the complement, not the opposite. Some problems only appear with real users, data, and traffic, so teams also test in production carefully: [[Canary Release]], feature flags, [[Shadow Traffic]], and monitoring. Because a [[Staging Environment]] never perfectly matches production, the strongest pipelines do both, catching what they can early and limiting the impact of what slips through.

Shifting left has pitfalls. Piling slow checks into the developer's loop makes every commit painful and invites people to skip them. Early checks must be fast and reliable; a pre-commit hook that takes five minutes, or a flaky test that fails at random, teaches people to bypass the system. It also shouldn't mean handing all testing to developers and eliminating specialist testers, whose [[Exploratory Testing]] finds problems no automated check anticipates. The aim is earlier feedback, not less testing.

## See also
- [[Verification and Validation]]
- [[DORA Metrics]]
