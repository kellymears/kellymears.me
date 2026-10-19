---
aliases:
  - PSTN
  - Telephone exchange
  - Phreaking
  - Blue box
tags:
  - networks
summary: The circuit-switched public telephone system that wired the world in the twentieth century, from human switchboard operators to digital exchanges, and whose in-band signaling invited a generation of phone hackers.
---
The **public switched telephone network** (PSTN) is the worldwide system of exchanges, lines, and trunks that carried telephone calls through the twentieth century. It was the largest machine ever built, and the internet grew up inside it.

Calls were connected by people at first. A caller lifted the receiver and asked an operator, who plugged a cord into a switchboard to join the two lines. In 1891 Almon Strowger patented an automatic exchange, supposedly because a rival undertaker's wife, an operator, was sending his customers elsewhere. Dials, then electromechanical switches, gradually replaced operators.

The network was **circuit-switched**: a call reserved a dedicated path end to end for its whole duration, whether anyone was talking or not. That guaranteed steady quality with no delay jitter, but wasted capacity on silence, the trade-off that packet networks later reversed; see [[Packet Switching]] and [[Latency and Jitter]]. Deciding how many circuits an exchange needed was a statistical problem, and the Danish engineer Agner Erlang's work on it in 1909 founded the mathematics of waiting; see [[Queueing Theory]].

From the 1960s the core went digital. Voice was filtered to about 300 to 3,400 hertz and sampled 8,000 times a second at 8 bits each, so a call became a 64,000-bit-per-second stream, and many calls were interleaved on one trunk. Only the copper to each home stayed analog, which is why dial-up modems could reach 56,000 bits per second downstream and no further; see [[Modem]].

Early long-distance switches signaled to each other with tones on the same line as the voice. A 2600 hertz tone meant a trunk was idle. People discovered they could play that tone themselves, then dial routing tones, and take control of the trunk for free calls. These **phreakers** used whistles and homemade **blue boxes**; Steve Jobs and Steve Wozniak sold blue boxes before founding Apple. The fix was to move signaling out of band onto a separate network, Signaling System 7. SS7 assumed every connected carrier was trustworthy, and it is now abused to track phones and intercept text-message login codes; see [[Caller ID Authentication]].

In the United States, AT&T ran most of the network as a regulated monopoly, in exchange for an obligation to serve everyone. A 1984 antitrust settlement broke it up. The idea that a network must carry all traffic on equal terms passed into debates about the internet; see [[Net Neutrality]]. The value of being on the network grew with every subscriber; see [[Network Effect]].

The system is now being retired. Calls increasingly travel as internet packets, mobile phones replaced most landlines, and carriers are pulling out copper; see [[Cellular Network]]. Emergency calling and alarm systems that assumed always-on copper are among the hardest things to migrate.

## See also
- [[Wiretapping]]
- [[Twisted Pair]]
- [[Pager]]
- [[Two-Way Radio]]
- [[Emergency Telephone Number]]
- [[Token Ring]]
- [[Minitel]]
