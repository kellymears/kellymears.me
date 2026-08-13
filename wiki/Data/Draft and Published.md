---
aliases:
  - Drafts
  - Content versioning
tags:
  - data
summary: Keeping an in-progress version of content separate from the live one, with all the state that implies.
---
**Draft and published** is the content model in which a record has a live version and a work-in-progress version, with an explicit action promoting one to the other. It is table stakes for any editorial system and it introduces more state than people expect.

The state to reason about carefully: a record can have a draft and no published version, a published version and no newer draft, both, or a draft that is *older* than the published version if publishing did not update it.

Two failure patterns recur.

**Status is not a boolean on the loaded record.** An editor loads the draft, whose status is "draft" even when a published version is live — so deriving a label from the loaded record's own status misreports. The correct question is whether a published version exists, which is a separate lookup.

**Reads and writes must agree.** If a write goes to the draft and the corresponding read comes from the published version, the writer sees the change fail to appear and does it again — producing duplicates. This is a general hazard for any automated actor; see [[Agentic Loop]]. A further subtlety: excluding drafts is not the same as selecting published, since a never-published record still comes back under a naive filter.

**Validation may not apply to drafts** in some systems, so a save that succeeds as a draft is rejected on publish.

## See also
- [[Relational Database]]
- [[Headless CMS]]
- [[Agentic Loop]]
- [[Feature Flag]]

## Related
- [[Multi-Tenancy]]
