---
aliases:
  - Cursor pagination
  - Keyset pagination
  - Offset pagination
  - Infinite scroll
tags:
  - data
summary: Splitting a large result set into pages, where the choice between offsets and cursors decides whether deep pages stay fast and whether items get skipped or repeated.
---
**Pagination** splits a large result set into pages so a client can fetch it a piece at a time. Every list that might grow, such as search results, feeds, order histories, and API listings, needs it. There are two main techniques, and the difference matters more than it looks.

**Offset pagination** asks for "20 items, skipping the first 40": `LIMIT 20 OFFSET 40`. It is simple and supports jumping straight to page 50. It has two problems:

- **Deep pages get slow.** The database can't jump to row 10,000. It reads and discards the first 10,000 rows, so late pages cost far more than early ones, and the cost grows with depth.
- **Items shift under the reader.** If a new item is inserted at the top while someone reads page 1, everything moves down one, and page 2 repeats the last item of page 1. Deletions cause items to be skipped entirely.

**Cursor pagination**, also called *keyset* pagination, asks for "20 items after this one" using the sort key of the last item seen: `WHERE created_at < :last_seen ORDER BY created_at DESC LIMIT 20`. With a database index on the sort key, the database seeks straight to the position, so page 1,000 costs the same as page 1. Insertions and deletions elsewhere don't shift the window, so nothing is repeated or skipped. The cursor is usually encoded as an opaque token so clients can't depend on its contents.

Cursors have their own requirements. The sort order must be unique, so ties on a timestamp are broken with a second column such as the ID, or items sharing a timestamp can be lost at page boundaries. Jumping to an arbitrary page number isn't possible, which suits feeds and infinite scroll but not numbered result pages. Sorting by a column without an index brings back the slow scan.

Interface design shapes which one fits. Numbered pages suit search results where people compare and return. Infinite scroll suits feeds, and pairs naturally with cursors and [[Lazy Loading]], though it makes footers unreachable and can feed [[Doomscrolling]]. A "load more" button is a middle ground that keeps the reader in control. APIs that return total counts pay for a separate counting query, and many large services report an estimate or nothing. Showing only the first pages of results while hiding the rest is a form of [[Truncation Bias]] that readers rarely notice.

## See also
- [[Data Table]]
- [[Empty State]]
- [[Virtual Scrolling]]
