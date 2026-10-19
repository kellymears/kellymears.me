---
aliases:
  - git send-email
  - Patch series
  - LKML
tags:
  - delivery
summary: Proposing changes as plain-text patches sent to a mailing list, reviewed by inline reply and applied by the maintainer, the workflow Git was built around and the one the Linux kernel still uses.
---
In the **email patch workflow**, a contributor proposes a change by mailing it, as a plain-text [[Diff]], to a project's mailing list. Reviewers reply inline, quoting the lines they comment on, and a maintainer applies the accepted patches to their own tree. It predates web review by decades, and the [[Linux kernel]] still runs on it, along with Git itself and a number of other long-lived projects; see [[Email]].

Git was designed around this workflow, and its tools reflect that:

- **Formatting.** A command turns each commit into an email, with the first line of the [[Commit Message]] as the subject and the rest as the body, followed by the patch.
- **A patch series.** Related commits go out together, numbered one of five, two of five, and so on, usually with a cover letter numbered zero that explains the series as a whole.
- **Revisions.** After review, the contributor resends the whole series marked version two, then three, with notes on what changed. Gerrit's numbered patch sets copy this idea; see [[Gerrit]].
- **Applying.** The maintainer feeds the emails to a command that recreates each commit with its original author, date, and message.

The kernel's version adds conventions. A maintainers file maps each part of the source tree to the people and lists responsible for it, and a script reads it to address a patch; see [[Code Owners]]. Every patch carries a Signed-off-by line certifying the contributor's right to submit it; see [[Developer Certificate of Origin]]. Reviewers add their own Reviewed-by and Acked-by lines, and the trail ends up in the permanent history. A patch tagged RFC asks for comments on an idea, not inclusion, borrowing the name from internet standards; see [[Request for Comments]]. The main kernel list, LKML, carries hundreds of messages a day, and public archives keep every thread.

The workflow has real strengths. It needs no central service beyond email, discussion lives beside the code in a searchable archive, and anyone can review without an account; see [[Distributed Version Control]] and [[Linus's Law]]. Experienced maintainers often review faster in a mail client than on a web page.

Its costs fall on newcomers. Mail clients wrap lines and mangle whitespace, which corrupts patches, so contributors must configure tools carefully. HTML email is rejected. Etiquette is strict, and long threads can bury a patch with no clear status, so a contributor may not know whether silence means rejection; see [[Code Review]]. Tools such as patch-tracking dashboards and scripts that fetch a whole series from the archive have grown up to fill the gaps.

The XZ Utils backdoor showed another side: a project with a small mailing list and an overworked maintainer can be steered by persistent, plausible contributors; see [[XZ Utils Backdoor]] and [[Bus Factor]].

## See also
- [[Software Forge]]
- [[Darcs]]
