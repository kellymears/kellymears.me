---
aliases:
  - Teletype
  - Telex
  - Stock ticker
tags:
  - networks
summary: An electromechanical typewriter that sent and printed text over wires, carrying stock prices, news, and business messages for a century and serving as the first computer terminals, whose habits survive in modern software.
---
A **teleprinter** is a typewriter connected to a communication line: typing on one machine prints the same characters on others, miles away. From the late nineteenth century to the 1980s, teleprinters carried stock quotes, news, weather, military orders, and business correspondence, and they became the first way people talked to computers.

They grew out of the telegraph, which required trained operators to send and read Morse code; see [[Telegraph]]. Printing telegraphs, which turned signals directly into letters, appeared from the 1840s. The **stock ticker**, introduced in 1867, printed abbreviated company names and prices on a narrow paper tape, giving brokerage offices prices within minutes of trades. Discarded tape thrown from office windows in New York gave the ticker-tape parade its name.

Machines needed a code suited to mechanisms. Émile Baudot's code of the 1870s used five equal-length units per character, giving 32 combinations, with shift codes switching between letters and figures; the baud, the unit of signaling rate used for modems and serial lines, takes its name from Baudot. Donald Murray adapted the scheme for typewriter-style keyboards around 1901, and an international standard version spread worldwide. Five-bit codes were later replaced by seven-bit ASCII; see [[Character Encoding]].

In the twentieth century, teleprinters linked news agencies, which delivered stories to newspaper offices over wire, and businesses connected through **telex**, a switched network of teleprinters started in Germany in the 1930s and later worldwide. Dialing another subscriber's number connected two machines, much like a phone call; see [[Telephone Network]] and [[Circuit switching]]. Telex messages had legal standing for contracts and shipping, and the network remained in heavy use until fax and email displaced it; see [[Fax]].

Computers adopted the teleprinter as a terminal. The Teletype Model 33, introduced in 1963, was cheap, used ASCII, and could punch and read paper tape, so it became the standard input and output device for minicomputers and time-sharing services; see [[Time-Sharing]]. Programs printed output on paper rolls, one line at a time, and early programming languages and line editors were designed around that. The terse command names of early Unix are often attributed partly to how slow and laborious these machines were to type on, since every keystroke was printed with a loud mechanical strike. Users connected remotely over phone lines; see [[Modem]].

The machines left marks on modern software. Unix calls terminals TTYs, from teletype, and its terminal handling still emulates the old devices; see [[Pseudoterminal]]. The separate carriage return and line feed characters reflect two physical motions, returning the print head and advancing the paper, and different systems still disagree about which to use; see [[Line Ending]]. Bell characters once rang a real bell on the machine.

## See also
- [[Telnet]]
- [[Punched Card]]
- [[Magnetic Tape]]
- [[Movable Type]]
