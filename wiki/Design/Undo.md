---
aliases:
  - Undo and redo
  - Undo stack
  - Undo history
  - Confirmation dialog
  - Undo send
tags:
  - design
summary: Letting people reverse what they just did, which makes interfaces safe to explore and usually beats asking "are you sure?" before every action.
---
**Undo** lets people reverse their most recent actions. It is one of the most valuable features an interface can offer, because it changes how people behave: when mistakes are cheap to reverse, people explore, try things and learn by doing. Nielsen's list for [[Heuristic Evaluation]] names it under "user control and freedom".

The Bravo editor at Xerox PARC had an undo command in the mid-1970s, and the original Macintosh made single-level undo a standard command. Multi-level undo became expected as memory grew cheaper.

**Undo versus confirmation.** The common alternative is a confirmation dialog: "Are you sure you want to delete this?" Confirmations work poorly. People see them so often that clicking "OK" becomes automatic, a form of [[Habit Formation]], and the dialog stops protecting anything. Each one also interrupts, as any [[Modal Dialog]] does. Undo protects without interrupting: the action happens immediately, and a brief notice offers to reverse it. Email "undo send" works by simply delaying the send for a few seconds. Deletion is often a [[Soft Delete]] under the hood, so the item can come back.

Some actions can't be undone: a sent payment, a published message others have read, a dropped database. For those, a deliberate obstacle is appropriate, such as typing the project's name to confirm deletion. The friction is worth it when the action is both rare and irreversible.

Implementation approaches:

- **Command pattern.** Each action is recorded as an object that knows how to reverse itself, and undo pops the last one off a stack. Redo keeps a second stack, usually cleared when a new action is taken.
- **Snapshots.** Save the whole state before each action. With [[Immutability]] and a [[Persistent Data Structure]], snapshots share most of their memory and become cheap.
- **Event logs.** In [[Event Sourcing]], state is rebuilt from a list of events, so undo means appending a compensating event.

Linear undo discards the redo history when you make a new edit after undoing. Some editors keep an **undo tree** instead, so every past state remains reachable. The idea parallels [[Version Control]], which is undo for whole projects.

Collaboration makes undo harder. If two people edit a document at once, "undo" should reverse *my* last change, not theirs, even if theirs came later and depends on mine. Collaborative editors built on a [[Conflict-Free Replicated Data Type]] must define undo carefully so each person's history stays coherent.

Undo also pairs naturally with [[Optimistic UI]]: show the result immediately and roll it back if the server rejects it. In editing surfaces such as [[contenteditable]], the browser keeps a native undo stack that custom editing logic easily breaks. Systems apply the same principle at larger scale, with deployments built for [[Rollback]] and data protected by [[Backup and Restore]].

## See also
- [[Clipboard]]
- [[Text Buffer]]
