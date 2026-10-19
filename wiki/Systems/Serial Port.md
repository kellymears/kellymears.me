---
aliases:
  - RS-232
  - UART
  - Serial console
tags:
  - systems
summary: The old, simple connection that sends data one bit at a time, inherited from teleprinters and modems, gone from consumer computers but still the last-resort console for servers, network gear, and embedded boards.
---
A **serial port** sends data one bit at a time over a single wire in each direction. For decades it was how computers talked to terminals, modems, printers, and mice. It disappeared from consumer computers around the turn of the century, but it remains in daily use wherever simplicity and reliability matter more than speed.

The common standard, **RS-232**, was introduced in 1960 to connect terminals to modems; see [[Modem]]. The connection inherited the habits of teleprinters, which is why Unix still calls terminal devices TTYs, after teletypewriters; see [[Pseudoterminal]]. The unit of speed, the baud, is named after Émile Baudot, whose telegraph code preceded ASCII; see [[Telegraph]].

Most serial links are **asynchronous**. There's no shared clock wire. Instead, both ends agree on a speed in advance, such as 9,600 or 115,200 bits per second, and each byte is framed:

1. A **start bit** signals that a byte is coming and lets the receiver synchronize.
2. Usually eight **data bits** follow.
3. An optional **parity bit** catches single-bit errors; see [[Parity bit]].
4. A **stop bit** marks the end.

The chip that does this framing is called a **UART**, for universal asynchronous receiver-transmitter. If the two ends disagree about the speed, the result is garbled characters, a familiar sight to anyone who has set up a serial console; see [[Clock Signal]].

Flow control prevents a fast sender from overwhelming a slow receiver. Hardware flow control uses extra wires to signal readiness. Software flow control uses two special characters, one to pause and one to resume. That convention survives in modern terminals, where pressing the pause key combination can freeze output until the resume combination is pressed; see [[Flow Control]].

USB replaced serial ports on consumer machines because it was faster, carried power, and supported many devices identifying themselves automatically; see [[Universal Serial Bus]]. Ironically, much modern hardware also uses fast serial links internally; the change was in signaling technique, not in sending bits one at a time; see [[PCI Express]].

The serial port persists for good reasons:

- **Consoles.** Servers, routers, and switches offer a serial console that works before networking starts and after it fails, showing boot messages and kernel crashes; see [[Boot Process]] and [[Kernel Panic]].
- **Embedded systems.** Microcontrollers and single-board computers use UART pins for debugging, and circuit boards inside consumer devices often expose unlabeled serial pins; see [[Internet of Things]].
- **Instruments.** Lab equipment, industrial machines, and GPS receivers still speak serial protocols.

Adapters that present a serial port over USB are a standard item in technicians' kits. On Linux the port appears as a device file that programs open and read like any other; see [[Device File]] and [[File Descriptor]].

## See also
- [[Device Tree]]
- [[Microcontroller]]
