---
aliases:
  - DCO
  - Contributor License Agreement
  - CLA
  - Signed-off-by
tags:
  - delivery
summary: The two ways open source projects establish that contributors have the right to submit their code, a one-line sign-off on each commit or a signed legal agreement up front.
---
When someone contributes code to an open source project, the project needs some assurance that the contributor actually had the right to give it: that the code wasn't copied from an employer, lifted from incompatibly licensed software, or claimed by someone else later. Two mechanisms dominate, and the choice between them says a lot about who holds power in a project.

The **Developer Certificate of Origin** (DCO) is a short statement, about 150 words, in which a contributor certifies that they wrote the change or otherwise have the right to submit it under the project's license, and that the contribution and their sign-off are public record. The Linux kernel adopted it in 2004, during the SCO lawsuit, which claimed Unix code had been copied into Linux and made tracing the origin of every line suddenly important. Contributors agree by adding a trailer to each [[Commit]] message:

`Signed-off-by: Jane Doe <jane@example.com>`

Git adds it with `git commit -s`. Bots check every [[Pull Request]] for the line, and [[Branch Protection]] can refuse merges without it. The DCO grants no new rights: code comes in under the project's existing license, the same terms everyone receives, a model sometimes called *inbound equals outbound*.

A **Contributor License Agreement** (CLA) is a legal document signed once, before the first contribution. It typically grants the project's owner a broad license to the contribution, sometimes including the right to relicense it, and sometimes transfers copyright outright. Apache, Google, and many company-run projects use them, usually through a click-through form linked to the contributor's account.

The difference matters most when a project changes its license:

- Under a DCO, copyright stays spread across every contributor. Relicensing a [[Copyleft]] project means getting permission from all of them, which for a large project is effectively impossible. That protects contributors from having their work taken proprietary.
- Under a CLA that grants relicensing rights, the owning company can change the license on its own. MongoDB moved from the AGPL to its own source-available license in 2018 this way. Critics argue CLAs create an imbalance: contributors give rights the owner never gives back.

CLAs also add friction. A first-time contributor who must read a legal agreement, or get an employer's approval to sign one, often doesn't bother, and [[Permissive License|permissive]] projects with a DCO see more drive-by fixes. Companies counter that a CLA gives clearer legal footing.

Both mechanisms record intent rather than prove it. They create a paper trail tying each change to a person who made a claim about it, the same accountability that [[Commit Signing]] adds cryptographically and that a [[Software Bill of Materials]] extends to whole dependency trees.

## See also
- [[Copyleft]]
- [[Software Fork]]
- [[Supply Chain Security]]
- [[Code Owners]]
- [[Commit Message]]
- [[Open Core]]
