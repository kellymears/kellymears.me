---
aliases:
  - Rope
  - Gap buffer
  - Piece table
tags:
  - computation
summary: The data structures text editors use to hold a document so that typing, deleting, and undo stay fast in large files, including the gap buffer, the rope, and the piece table.
---
A **text buffer** is the data structure a text editor uses to hold the document being edited. Storing text as one plain array of characters is simple, but every insertion or deletion near the start means shifting everything after it. For a large log file, each keystroke would copy the whole file; see [[Big-O Notation]]. Editors use structures designed around how people actually edit.

**The gap buffer** keeps the text in one array with an empty gap at the cursor. Typing fills the gap; deleting widens it. Both are instant. Moving the cursor means moving the gap, which copies the characters in between, but people mostly edit near where they just were, so this is usually cheap; see [[Locality of Reference]]. Emacs has used a gap buffer for decades.

**The rope** stores text as a balanced tree whose leaves hold short strings; see [[Self-Balancing Binary Search Tree]]. Each internal node records the length of the text below it, so finding a position, inserting, deleting, or splitting takes logarithmic time anywhere in the document. Ropes handle very large files and many cursors well, and because unchanged subtrees can be shared, keeping old versions is cheap; see [[Persistent Data Structure]]. Several modern editors are built on ropes.

**The piece table** never modifies the original file. It keeps the original text, read-only, plus an append-only buffer of everything typed, and a list of **pieces**, each pointing to a span in one buffer or the other. The document is whatever the pieces spell out in order. Edits only split and rearrange pieces. Since nothing is ever overwritten, [[Undo]] is a matter of restoring an earlier list of pieces. The piece table dates to the Bravo editor at Xerox PARC in the 1970s and was used in early Microsoft Word. In 2018, Visual Studio Code moved to a piece table stored in a balanced tree, cutting memory use on large files sharply.

Real editors layer more on top:

- **Line indexes**, so jumping to line 50,000 doesn't mean counting newlines from the top.
- **Unicode handling**, since one visible character can span several bytes and several code points; cursor movement has to step over whole characters; see [[Character Encoding]].
- **Syntax trees** that update incrementally as the text changes; see [[Abstract Syntax Tree]].
- **Collaboration**, where several people edit at once and their changes must merge consistently; see [[Conflict-Free Replicated Data Type]].

The choice reflects a trade-off seen throughout data structure design: a simple array is fastest to scan and read, while trees and lists of pieces make modification cheap at the cost of extra bookkeeping; see [[Linked List]] and [[Amortized Analysis]].

A [[Ring Buffer]], by contrast, solves a narrower problem: a fixed-size queue for streaming data, such as terminal scrollback, where old lines simply fall off.

## See also
- [[String-Searching Algorithm]]
- [[Suffix Array]]
- [[Burrows-Wheeler Transform]]
