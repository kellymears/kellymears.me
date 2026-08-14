---
aliases:
  - Share-alike license
  - Strong copyleft
tags:
  - delivery
summary: A licensing strategy that uses copyright to require derivative works to stay open.
---
**Copyleft** is a licensing strategy that inverts copyright's usual effect: the exclusive right to copy becomes leverage to keep a work, and everything built on it, open, rather than a way to restrict use. A copyleft license grants broad permission to use, modify, and redistribute, on condition that anyone distributing a modified or combined version does so under the same terms.

The family splits into strong and weak variants. Strong copyleft, used by the GNU General Public License, extends the obligation to any work incorporating the covered code. That linking against it creates a derivative work is the Free Software Foundation's interpretation, not settled law: no US court has ruled definitively, and many practitioners dispute it.

Weak copyleft relaxes this by two mechanisms often conflated. The Mozilla Public License 2.0 is file-scoped: modified covered files stay under the licence, while proprietary files sit beside them in the same [[Monorepo]]. The GNU Lesser General Public License is scoped to the library instead, adding a requirement MPL lacks: a combined work must leave users able to relink it against a modified or newer library version (LGPLv2.1 §6, LGPLv3 §4), and may not forbid reverse engineering for debugging.

The distinction that matters most in practice is GPLv2 versus GPLv3. v3 adds an express patent grant with retaliation terms, anti-tivoization rules, an anti-DRM provision, and a cure period before automatic termination becomes permanent; it is also Apache 2.0-compatible. v2 has none of this and is Apache-incompatible, so an Apache-licensed dependency combines with GPLv3 code, not GPLv2-only code.

Running a program as a network service, rather than distributing copies, triggers nothing under these licences' plain text. The GNU Affero General Public License adds §13, narrower than its usual "share back to upstream" gloss: a modified version must prominently offer its remote users the corresponding source. Deploying it unmodified triggers nothing owed upstream.

Incompatible copyleft terms cannot legally combine in one distributed work, and a strong copyleft dependency arriving through a [[Package Manager]] can force a project's effective license upward — often caught in a [[Supply Chain Security]] audit rather than [[Code Review]]. Tracking [[Provenance]] and pinning versions in a [[Lockfile]] makes that catchable before release. [[Permissive License]] covers the alternative that drops the condition.

## See also
- [[Permissive License]]
- [[Supply Chain Security]]
- [[Package Manager]]
- [[Provenance]]
- [[Commons-Based Peer Production]]
