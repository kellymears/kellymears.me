---
aliases:
  - ICS file
  - vCard
  - CalDAV
tags:
  - data
summary: The plain-text standard behind calendar invitations and subscriptions, defined in 1998 and still how calendars from different vendors exchange events, recurrences, and time zones.
---
**iCalendar** is the standard format calendars use to exchange events. When someone sends a meeting invitation that opens in a different calendar program, or subscribes to a sports schedule or a holiday list, the data almost always travels as an iCalendar file, usually with the extension ICS.

It grew from vCalendar, a format created in the mid-1990s by the Versit Consortium, a group of technology companies that also produced vCard, the matching format for contact details. The Internet Engineering Task Force published iCalendar as RFC 2445 in 1998 and revised it as RFC 5545 in 2009. vCard went through its own revisions, with version 4.0 in 2011.

An iCalendar file is plain text built from nested components. A calendar contains events, to-do items, journal entries, and time zone definitions. Each component is a list of properties, one per line, such as the start time, end time, title, location, and a unique identifier that lets programs recognize the same event when it's updated; see [[Universally Unique Identifier]]. Dates and times use a compact form of the international standard; see [[ISO 8601]].

The format's hardest parts are about time:

- **Recurrence rules** describe repeating events compactly, such as every second Tuesday or the last weekday of each month, with lists of exceptions for cancelled or moved instances. Expanding them correctly, especially across edits that change "this and following events," is notoriously difficult.
- **Time zones** must be attached to events, because a weekly 9 a.m. meeting should stay at 9 a.m. local time when clocks change; see [[Time Zone]] and [[Daylight Saving Time]]. Converting everything to a fixed offset or to universal time breaks this; see [[Unix Time]].
- **Floating times and all-day events** belong to no time zone at all, such as a birthday or an alarm meant for whatever zone the user is in.

Programmers routinely get these wrong; see [[Falsehoods Programmers Believe]].

Related standards cover exchange. A companion specification defines how invitations, acceptances, and cancellations flow between people, usually through email; see [[Simple Mail Transfer Protocol]]. CalDAV, published in 2007, lets calendar programs sync with a server over HTTP. Subscribed calendars work like feeds: a program fetches the file periodically and shows whatever it contains; see [[RSS]].

Interoperability is imperfect. Vendors add their own extensions, interpret recurrence edge cases differently, and accept slightly malformed files in the spirit of being lenient, which encourages more malformed files; see [[Postel's Law]]. Yet the format has proved durable. Nearly every calendar program still reads and writes it, a rare success for an open standard in a market dominated by a few large companies; see [[Web Standards]].

## See also
- [[Date Picker]]
- [[Serialization]]
- [[Local-First Software]]
