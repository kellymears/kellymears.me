---
aliases:
  - Mainboard
  - Chipset
  - Voltage regulator module
  - ATX
tags:
  - systems
summary: The main circuit board of a computer, which carries the processor socket, memory slots and expansion slots and ties them together with the chipset, power regulation and firmware that let separately bought parts work as one machine.
---
A **motherboard** is the main printed circuit board in a computer. It holds or connects every other component. The processor sits in its socket, memory sticks in its slots, graphics and storage cards in its expansion slots, and cables from drives, fans and front-panel buttons plug into its headers. Copper traces in the board's layers carry data, power and clock signals among them; see [[Clock Signal]].

IBM's 1981 PC came with expansion slots and published technical documentation, and the clone industry that followed turned PC parts into interchangeable commodities. Standard board sizes and mounting holes, above all Intel's **ATX** specification of 1995, mean a board from one company fits a case and power supply from others; see [[Power Supply Unit]]. Phones and most laptops went the other way, with a board designed for one device and its components soldered down, trading upgrades for size and battery life; see [[Right to Repair]].

The **chipset** handles traffic the processor doesn't. Older designs split it in two. A northbridge linked the processor to memory and graphics, and a southbridge handled slower devices. As processors absorbed the memory controller and the main expansion lanes, the northbridge vanished into the CPU package. Today's chipset is mostly a hub for USB, extra storage and networking, joined to the processor by one fast link; see [[PCI Express]] and [[Universal Serial Bus]]. Chipset and socket together decide which processors a board accepts and which features it exposes, such as overclocking.

Power delivery is one of the board's hardest jobs. The power supply provides 12 volts, but a processor core runs at around one volt and can draw well over a hundred amps, ramping up within microseconds. The **voltage regulator modules** around the socket convert one to the other with several switching phases taking turns, and their quality limits sustained performance. Hot or undersized regulators force the processor to slow down; see [[Thermal Throttling]] and [[Dynamic Voltage and Frequency Scaling]].

The board also carries the firmware that starts the machine and trains the memory, plus a coin battery that keeps the clock running while unplugged; see [[Firmware]] and [[Real-Time Clock]].

Boards have had their own epidemics. Around the early 2000s, large numbers of boards from many makers failed early because of faulty electrolytic capacitors that bulged and leaked, a problem often traced to a flawed electrolyte formula; see [[Capacitor]]. Static discharge during assembly is a smaller, everyday risk; see [[Electrostatic Discharge]].

Laptops, servers and single-board computers all follow the same basic plan. On many of them, a description such as the [[Device Tree]] tells the operating system what the board contains, since the hardware can't announce itself.

## See also
- [[Computer Cooling]]
- [[Silicon Binning]]
