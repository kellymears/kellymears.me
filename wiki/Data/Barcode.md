---
aliases:
  - Universal Product Code
  - UPC
  - EAN
  - QR code
  - GS1
tags:
  - data
summary: Patterns of bars or squares that machines read as numbers, which turned every product into a database key in the 1970s, and whose two-dimensional successors carry links, tickets, and payments.
---
A **barcode** encodes a number, or a short piece of data, as a pattern of dark and light marks that a machine can read quickly and reliably. The familiar striped label on almost every product made checkout scanning, modern inventory, and global supply chains possible.

The idea came from Joseph Woodland, who in 1948 drew the dots and dashes of Morse code in the sand of a Miami beach and pulled them down into lines. He and Bernard Silver patented a bullseye design in 1952, but cheap scanning had to wait for lasers. American grocers chose a standard, the **Universal Product Code**, in 1973, from a design by George Laurer at IBM. The first scan at a checkout took place on June 26, 1974, at a supermarket in Troy, Ohio: a pack of chewing gum, now in the Smithsonian.

How the linear code works:

- **Digits as widths.** Each digit is represented by a fixed-width group of bars and spaces of varying thickness. The scanner measures relative widths, so the code reads at varying distances and angles.
- **Guard bars** mark the start, middle, and end.
- **A check digit.** The last digit is a [[Checksum]] computed from the others, so a misread is almost always caught and the scan simply fails rather than charging for the wrong item.

The barcode holds no price. It is a key, an identifier for the product, and the store's own database supplies the price and stock. A nonprofit standards body, GS1, hands out prefixes to manufacturers so that numbers are unique worldwide; Europe's thirteen-digit EAN, from 1977, extended the American code with a country prefix. That separation made prices easy to change and turned every sale into a record, which fed inventory systems, sales analytics, and loyalty programs.

Linear barcodes hold only a few digits. Two-dimensional codes store data in a grid of squares. The **QR code** was invented in 1994 at Denso Wave, a Toyota supplier, to track car parts. Its three corner squares let a camera find and orient it from any angle, and it includes enough redundancy, using a classic error-correcting code, that up to about thirty percent of it can be damaged or covered by a logo and still read. Phone cameras made it universal: boarding passes, payments across much of Asia, and restaurant menus during the COVID-19 pandemic.

A QR code is opaque to people, who can't see where it leads before scanning. Stickers pasted over legitimate codes on parking meters have sent drivers to fake payment pages; see [[Phishing]].

Radio tags can identify items without line of sight and read many at once, but cost more, so printed codes remain far more common.

## See also
- [[Structured Data]]
- [[Universally Unique Identifier]]
