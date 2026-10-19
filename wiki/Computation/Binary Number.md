---
aliases:
  - Binary numeral system
  - Hexadecimal
  - Octal
  - Positional notation
tags:
  - computation
summary: Writing numbers using only the digits 0 and 1, the place-value system computers use because a switch has two states, with hexadecimal and octal as shorthand for people reading it.
---
A **binary number** is written in base 2, using only the digits 0 and 1. Like decimal it is positional, but its places count ones, twos, fours, eights, and so on, instead of ones, tens, and hundreds. The binary 1101 is 8 + 4 + 0 + 1, or 13.

The idea is old. Gottfried Wilhelm Leibniz published a description of binary arithmetic in 1703, noting its resemblance to the hexagrams of the Chinese I Ching, built from broken and unbroken lines. In 1854 George Boole published an algebra of true and false; see [[Boolean Algebra]]. The link to machines came in 1937, when Claude Shannon's master's thesis showed that circuits of relays could carry out Boole's logic, and with it binary arithmetic.

Computers use binary because two states are easy to build and hard to confuse. A transistor is on or off, a voltage high or low, a magnetic region pointing one way or the other; see [[Semiconductor]]. Ten reliably distinct voltage levels would be far harder to build. Shannon's 1948 paper made the binary digit, or **bit**, a word suggested by John Tukey, the unit of information; see [[Information Theory]].

Some consequences are part of everyday programming:

- **Bytes and words.** Bits are grouped into bytes, and IBM's System/360 of 1964 made eight bits the standard. A byte holds 256 values, enough for one character of ASCII text with room to spare; see [[Character Encoding]]. Numbers longer than a byte can be stored in either byte order; see [[Endianness]].
- **Negative numbers.** Most machines use two's complement, which lets subtraction share the addition circuit but means that adding one to the largest value wraps around to the most negative; see [[Integer Overflow]].
- **Fractions.** Many short decimal fractions, such as 0.1, have no exact binary form, just as one third has none in decimal, which is why 0.1 + 0.2 isn't exactly 0.3 in most languages; see [[Floating-Point Arithmetic]].
- **Bit tricks.** Shifting a number one place left doubles it, and single bits can serve as flags packed into one number; see [[Bitwise Operation]].

Long runs of bits are hard to read, so programmers use bases that convert cleanly. **Hexadecimal**, base 16, uses the digits 0–9 and A–F, and each hex digit stands for exactly four bits, so a byte is always two hex digits. It shows up in memory addresses and in color codes such as #FF8800, one byte each of red, green, and blue; see [[Color Theory]]. **Octal**, base 8, packs three bits per digit and survives mainly in Unix file permissions, where 755 grants the owner read, write, and execute and everyone else read and execute; see [[File Permissions]].

Product barcodes encode it too, in dark and light modules; see [[Barcode]].

## See also
- [[De Bruijn Sequence]]
- [[Binary Adder]]
- [[Low-Discrepancy Sequence]]
- [[Finite Field]]
