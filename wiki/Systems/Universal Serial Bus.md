---
aliases:
  - USB
  - USB-C
  - Hot plugging
tags:
  - systems
summary: The connector standard that replaced a drawer of serial, parallel, and keyboard ports in the late 1990s, built around a host that polls every device, and later a single reversible plug for data, video, and power.
---
**Universal Serial Bus**, or **USB**, is the standard for connecting peripherals to computers. Before it, a PC had a different port for each kind of device: serial ports for modems, a parallel port for printers, round connectors for the keyboard and mouse, and expansion cards for anything else. Each needed its own configuration, often including manual interrupt settings. USB 1.0, published in 1996 by a consortium including Intel, Microsoft, Compaq, and IBM, replaced them with one connector.

The bus is controlled by the host. Devices don't speak until asked: the host polls each one on a fixed schedule, and a mouse reports its movement only when its turn comes. That keeps devices simple and cheap, at the cost of a small, predictable delay.

**Hot plugging** was central to the design. When a device is connected, the host resets it, gives it an address, and reads its descriptors, which name its vendor, its product, and the class of device it claims to be. The kernel matches those against its drivers and creates the matching device files; see [[Device driver]] and [[Device File]].

Device classes are what made USB work without installing software. Keyboards, mice, storage, audio, and webcams follow class specifications, so one generic driver in the operating system serves every product of that kind. Only unusual hardware needs a vendor's driver.

The same trust is the weak spot. A computer believes what a device says it is, and a keyboard is trusted with everything. In 2014 researchers showed that the firmware in ordinary flash drive controllers could be rewritten so that the drive also announced itself as a keyboard and typed commands; see [[Firmware]]. Disguised keystroke-injection devices are sold for penetration testing. Some organizations block unknown devices or glue ports shut.

Speeds grew from 12 megabits per second to 480 with USB 2.0 in 2000, to gigabits from USB 3.0 in 2008, and then to 40 gigabits and beyond with USB4, which absorbed Intel's Thunderbolt. Versions were renamed repeatedly, so a cable's speed is hard to tell from its label.

USB also became the world's charger. The original port supplied 5 volts at up to half an amp. The reversible **USB-C** connector, published in 2014, and the Power Delivery protocol negotiate higher voltages, up to 240 watts in the 2021 revision. The European Union made USB-C the required charging port for phones sold there from the end of 2024, ending most proprietary chargers by law.

One connector now carries data, video, and power, but what a given cable or port actually supports varies widely, and nothing on the outside says which.

## See also
- [[Serial Port]]
