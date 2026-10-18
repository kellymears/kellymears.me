---
aliases:
  - Blame
  - Annotate
  - Code archaeology
  - Software archaeology
tags:
  - delivery
summary: Showing, for every line of a file, the commit and author that last changed it, the starting point for finding out why code is the way it is.
---
**Git blame** shows, beside each line of a file, which [[Commit]] last changed it, who made that commit, and when. Other version control systems call it *annotate* or *praise*. Despite the name, its real use is not assigning fault but recovering context: the commit behind a line carries its message, the [[Pull Request]] it came from, and the discussion around it, which usually explain *why* the code is the way it is.

That matters because code often looks wrong for reasons that are no longer visible. A strange special case may be the fix for a production incident, a workaround for a browser bug, or a requirement from a customer long gone. [[Chesterton's Fence]] applies: don't remove it until you know why it was put there. Blame is the fastest way to find out, and it is why [[Atomic Commit|atomic commits]] with good messages pay off years later.

Blame has blind spots:

- **It shows the last change only.** If someone reformatted the file or renamed a variable, blame points at them, not at whoever wrote the logic. Tools let you blame the parent of a commit to step further back, and `.git-blame-ignore-revs` tells Git to skip known mechanical commits such as a [[Code Formatter]] run.
- **Moved code.** By default a line moved between files looks newly written. Options such as `-M` and `-C` detect lines moved or copied from elsewhere.
- **Squashed history.** A [[Squash Merge]] collapses a branch into one commit, so blame lands on the merge rather than on the individual steps, though the pull request link usually survives.
- **Deleted lines.** Blame only explains lines that still exist. To find when something disappeared, search history with `git log -S` for the text, or use [[Git Bisect]] to find the commit that changed behavior.

Using blame well is part of what is sometimes called *code archaeology*: reading history, old issues, and design notes to reconstruct decisions. It pairs with a [[Characterization Test]] when working on legacy code: blame says why the code was written, the test pins down what it currently does.

The name invites misuse. Treating blame output as evidence of who to fault discourages people from touching risky code, the opposite of the culture a [[Blameless Postmortem]] tries to build, and it misleads anyway, since the last person to touch a line often only moved it. Judging the person rather than the circumstances is the [[Fundamental Attribution Error]] in a terminal.

Where history is thin, as in code copied in from elsewhere or after a migration from another system, blame has nothing to offer, which is an argument for preserving history when moving repositories.

## See also
- [[Reflog]]
- [[Code Owners]]
- [[Bus Factor]]
- [[Provenance]]
