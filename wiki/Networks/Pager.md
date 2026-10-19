---
aliases:
  - Beeper
  - Pager network
tags:
  - networks
summary: A small one-way radio receiver that beeps and shows a number or short message, the dominant mobile device of the early 1990s and still carried in hospitals because it works where phones don't.
---
**A pager** is a small radio receiver that alerts its owner and shows a short message, originally just a phone number to call back. Pagers are mostly one-way: the network broadcasts, and the device listens. That simplicity made them cheap, reliable, and long-lasting on a single battery.

Early systems served single buildings. A London hospital installed a radio paging system for doctors in 1956, replacing announcements over loudspeakers. Motorola used the word "pager" for a product in 1959 and later dominated the market. Wide-area paging networks spread in the 1980s, and by the mid-1990s tens of millions of people in the United States carried one, including many who weren't doctors or executives.

The design suits its job:

- **Strong signals.** Paging networks transmit at high power from many towers at once, synchronized so the signals reinforce, which reaches deep inside buildings and basements where phones lose service; see [[Radio Spectrum]] and [[Antenna]].
- **Long battery life.** A receiver that wakes briefly to listen for its own address can run for weeks.
- **Broadcast.** One transmission can alert a whole team at once.

Before text displays, people invented codes. Users sent number strings like 911 for "urgent" and 143 for "I love you," which counts the letters in each word, and added an extra code to identify the sender. Alphanumeric pagers arrived later and could show short messages typed by an operator or sent from a computer, and two-way models in the late 1990s let users send brief replies.

Pagers have weaknesses. Because most are one-way, the sender doesn't know whether the page arrived or was read; see [[Delivery Guarantees]]. Common paging protocols send messages unencrypted, so anyone with a cheap radio receiver can read them, and researchers have repeatedly found hospital messages naming patients broadcast in the clear; see [[Packet Capture]]. In 1998 a single communications satellite failed and cut off service to most pagers in the United States for days, showing how centralized the networks had become; see [[Satellite Internet]].

Mobile phones and text messages replaced pagers for most people by the early 2000s; see [[Cellular Network]] and [[SMS]]. Hospitals kept them. Surveys in the 2010s found most American hospitals still issued pagers, for their coverage, their battery life, and because whole workflows were built around them. Critics point to constant interruptions and staff learning to tune out repeated alerts; see [[Alarm fatigue]].

The vocabulary survives in software operations, where an engineer "on call" is "paged" when a system fails, though the alert now arrives on a phone; see [[On-call]]. Some services still send the most critical alerts over multiple channels at once, in case one fails.

## See also
- [[Two-Way Radio]]
- [[Amateur Radio]]
- [[ChatOps]]
- [[Minitel]]
- [[Instant Messaging]]
- [[Pneumatic Tube]]
