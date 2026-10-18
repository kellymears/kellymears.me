---
aliases:
  - Source-available license
  - Business Source License
  - Relicensing
  - Dual licensing
tags:
  - delivery
summary: Selling proprietary features around a free open-source core, and the related shift by some companies to source-available licenses that bar cloud providers from reselling their software.
---
**Open core** is a business model in which a company publishes the core of its product under an open-source license and sells proprietary additions around it: enterprise features such as single sign-on and audit logs, management tools, or a hosted service. Andrew Lampitt coined the term in 2008. GitLab and many database companies use versions of it.

The model tries to solve a problem built into open source: software anyone can copy is hard to charge for. Giving away the core spreads adoption, and charging for what large organizations need converts some of that adoption into revenue; see [[Freemium]]. The hard part is deciding where the line goes. Put too much in the paid tier and the free version feels crippled, discouraging outside contributors; put too little and nobody pays. A feature a community member contributes to the open core can also compete with something the company planned to sell.

**Dual licensing** is an older variant. A company releases code under a strong [[Copyleft]] license, which obliges anyone distributing derived work to share their source, and sells a commercial license to companies that want to embed it without that obligation. MySQL and Qt were sold this way. It only works if the company owns the copyright to every line, which is why such projects ask contributors to sign a [[Contributor License Agreement]].

Cloud computing broke some of these models. A cloud provider could take a database under a [[Permissive License]], run it as a paid managed service, and capture the revenue without contributing back or buying anything; see [[Free Rider Problem]]. Starting around 2018, several companies **relicensed** their projects. MongoDB moved to the Server Side Public License, Elastic to a pair of restrictive licenses in 2021, and HashiCorp in 2023 to the Business Source License, which allows most uses but forbids offering the software as a competing service, and converts to open source after a few years.

These are **source-available** licenses: the code can be read, but the restrictions mean they don't meet the Open Source Definition. The relicensings were controversial. Users who had built on the projects saw the terms change under them, and in several cases the community answered with a [[Software Fork]] of the last open version. Amazon forked Elasticsearch into OpenSearch, and the Linux Foundation hosts OpenTofu, a fork of HashiCorp's Terraform. Redis relicensed in 2024 and was forked as Valkey; a year later Redis added an open-source license again.

The episode shows that a license is also a promise about the future. Developers choose dependencies partly on whether the terms will hold, and a project owned by one company carries a risk that one governed by a foundation does not; see [[Open Source Sustainability]] and [[Path Dependence]].

## See also
- [[Tragedy of the Commons]]
- [[Rent-Seeking]]
- [[Commons-Based Peer Production]]
