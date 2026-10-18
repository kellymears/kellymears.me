---
aliases:
  - SBOM
  - Bill of materials
  - SPDX
  - CycloneDX
tags:
  - delivery
summary: A machine-readable inventory of every component and dependency inside a piece of software, so that when a vulnerability is announced, anyone can tell whether they are affected.
---
A **software bill of materials (SBOM)** is a machine-readable list of everything a piece of software is made from: each library and dependency, its version, who supplies it, its license, and usually a hash identifying the exact file. The name comes from manufacturing, where a bill of materials lists every part in a product. Modern applications are mostly assembled from open-source packages, often hundreds or thousands once indirect dependencies are counted, and an SBOM records what is actually in the box.

The case for SBOMs became obvious in December 2021 with Log4Shell, a critical vulnerability in the Java logging library Log4j. Log4j was buried deep in the dependency trees of countless products, and organizations spent weeks just finding out where they used it. With accurate SBOMs, the question "are we affected?" becomes a search.

Two formats dominate:

- **SPDX**, from the Linux Foundation, began in 2010 as a way to communicate license information and became the international standard ISO/IEC 5962 in 2021.
- **CycloneDX**, from the OWASP security community, was designed from the start for security use and also covers services, hardware, and machine-learning models.

Regulation has made SBOMs common. A 2021 US executive order on cybersecurity required them for software sold to the federal government, and the US Commerce Department published minimum required fields. The European Union's Cyber Resilience Act, adopted in 2024, requires manufacturers of products with digital elements to maintain them.

SBOMs are usually generated, not written. A [[Package Manager]] already knows the resolved dependency tree, and a [[Lockfile]] pins its exact versions, so tools can produce an SBOM during the build. Scanners can also inspect a finished binary or [[Containerization|container image]] and infer its contents, though less reliably. Generating the SBOM as a step in the [[Deployment Pipeline]] and signing it with [[Code Signing]] ties the inventory to the artifact it describes.

Uses go beyond vulnerability response:

- **License compliance.** An SBOM shows whether any [[Copyleft]] code is mixed into a product that is distributed under [[Permissive License]] terms or kept proprietary.
- **Risk review.** Unmaintained, abandoned, or single-maintainer dependencies stand out, a [[Bus Factor]] problem at the scale of an ecosystem.
- **Provenance.** Combined with a [[Reproducible Build]], an SBOM supports verifiable claims about where each part came from (see [[Provenance]]).

An SBOM has limits. It is only as accurate as the tool that produced it. Listing a vulnerable component doesn't mean the vulnerable code is reachable, so a companion format called VEX lets suppliers state whether a known vulnerability actually affects their product. SBOMs that are generated once and filed away go stale as dependencies change. The practice belongs to the broader discipline of [[Supply Chain Security]], alongside [[Semantic Versioning]] policies that keep dependency updates predictable.

## See also
- [[Log4Shell]]
- [[Developer Certificate of Origin]]
- [[SolarWinds Hack]]
