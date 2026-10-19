---
aliases:
  - ROM
  - Mask ROM
  - EPROM
  - EEPROM
tags:
  - systems
summary: Memory whose contents survive without power and are written rarely or never, which evolved from patterns fixed at the chip factory to chips erased by ultraviolet light and then by electricity, ending in the flash that holds firmware today.
---
**Read-only memory** holds data that persists when the power is off and that a computer reads but, in normal operation, doesn't change. It stores what a machine needs before anything else is available, such as the first instructions a processor runs at power-on; see [[Boot Process]] and [[Firmware]].

The original form, **mask ROM**, had its contents fixed during manufacture. The pattern of ones and zeros was part of the photographic mask used to lay out the chip's wiring. It was cheap in volume and impossible to change, so a bug meant manufacturing a new batch of chips. Home computers of the 1980s kept their operating systems and BASIC interpreters in mask ROM, and game cartridges were mostly ROM chips on a small board, which is why cartridge games started instantly and couldn't be patched after shipping. A "ROM" in emulation slang is still a file dumped from such a chip; see [[Emulation]].

**PROM**, programmable ROM, let a buyer write the contents once by blowing tiny fuses inside the chip. **EPROM**, invented at Intel in 1971, could be erased and rewritten. Each bit stores charge on a floating gate, a piece of conductor wrapped entirely in insulation, so the charge stays put for years; see [[Semiconductor]] and [[Capacitor]]. Erasing meant exposing the chip to strong ultraviolet light through a quartz window in the top of its package, usually for several minutes. The windows were covered with stickers so that sunlight wouldn't slowly erase the data; see [[Electromagnetic Spectrum]].

**EEPROM** removed the lamp. Electrically erasable chips use [[Quantum Tunneling]] to push electrons through the insulator and pull them back out, a byte at a time. They're slow to write and wear out after a limited number of cycles, but they suit small settings that change rarely, such as a configuration value, a serial number or a calibration constant; see [[Microcontroller]].

**Flash memory**, developed at Toshiba in the 1980s, is EEPROM organized to erase whole blocks at once. That made it dense and cheap enough to replace ROM almost everywhere, and later to replace disks; see [[Solid-State Drive]]. A modern PC's firmware sits in a flash chip on the board, so "ROM" there means memory that's read-only by convention rather than by physics; see [[Motherboard]].

The change has a cost. Rewritable firmware lets manufacturers fix bugs and security holes in the field, but it also gives attackers somewhere persistent to hide, below the operating system and surviving a reinstall; see [[Rootkit]] and [[Code Signing]]. Some devices therefore keep a small, truly read-only boot ROM whose only job is to check everything loaded after it.

## See also
- [[Hard Disk Drive]]
- [[Dynamic Random-Access Memory]]
