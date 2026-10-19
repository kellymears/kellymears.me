---
aliases:
  - Calendar picker
  - Date input
tags:
  - design
summary: An interface control for entering a date, usually a calendar grid, which suits booking next week's appointment and frustrates anyone entering a birthday, with time zones and regional formats hiding classic bugs underneath.
---
**A date picker** is a control for entering a date. The familiar version is a pop-up calendar grid where a person clicks a day, but the category also includes three drop-down menus for day, month, and year, scrolling wheels on phones, and a plain text field with a format hint.

Which design works depends on the date being entered:

- **Near dates.** Booking a flight or an appointment means choosing a day close to today, often by its day of the week. A calendar grid shows this well, and range pickers that highlight a span between two dates help with hotel stays.
- **Distant dates.** A birth date might be decades back. Clicking backward through a calendar month by month is slow, and year drop-downs with a hundred entries aren't much better. Typing is fastest; see [[Form Design]].
- **Known dates.** If people already know the exact date, as with a passport expiry, a text field lets them type it straight from the document.

Regional formats cause errors. The string 03/04/2025 means March 4 in the United States and April 3 in much of the world. Fields should show the expected format, or use separate labeled parts, and a reader's locale should decide what's displayed; see [[Internationalization]]. The week starts on Sunday in some countries and Monday in others. Unambiguous year-month-day order is the safest format for storage and exchange; see [[ISO 8601]].

Time zones produce a classic bug. A date with no time, such as a birthday, is sometimes stored as midnight in one time zone. When it's displayed in a time zone further west, it shifts to the previous day, so a person born on the fifth sees the fourth; see [[Time Zone]] and [[Unix Time]]. Dates that mean a calendar day should be stored as a calendar day, not as a moment in time.

Browsers include a native date input, which on phones opens the system's own picker. Support arrived unevenly; desktop Safari added it only in 2021, and the native controls are hard to style, so many sites built their own. Custom pickers often fail people who navigate by keyboard or use a [[Screen Reader]], because a calendar grid needs careful handling of arrow keys and focus; see [[Keyboard Navigation]] and [[ARIA]]. Allowing typed input alongside the calendar is a reliable fallback; see [[Progressive Enhancement]].

Small calendar cells are also hard to hit on a phone; see [[Touch Target Size]].

When a date is invalid, such as February 30 or a return before departure, the message should say what's wrong and how to fix it; see [[Error Message]]. Defaulting to today, or to a sensible nearby date, saves effort when that's the likely answer; see [[Microcopy]].

## See also
- [[iCalendar]]
- [[Input Method]]
- [[Postal Address]]
