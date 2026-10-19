---
aliases:
  - Covert channel
  - Hidden message
  - Steganalysis
tags:
  - networks
summary: The practice of hiding a message so that nobody suspects it exists, in contrast to encryption, which hides only its meaning, with methods running from ancient tattooed scalps and invisible ink to data tucked into the least significant bits of digital images.
---
Encryption protects what a message says; **steganography** conceals that there is a message at all. The word comes from Greek for "covered writing." An encrypted file announces that something is being hidden, which can itself draw suspicion or censorship. A holiday photo with a message buried inside looks like a holiday photo; see [[Internet Censorship]] and [[Traffic Analysis]].

The historian Herodotus told of two ancient examples. In one, a message was tattooed on a slave's shaved scalp, the hair allowed to grow back, and the messenger sent off to have it shaved again on arrival. In another, a warning was scratched into the wood of a writing tablet and covered with fresh wax so it looked blank. Later techniques included invisible inks made from milk or lemon juice that only appear when heated, messages marked by pinpricks above letters in a book, and, in the Second World War, microdots, photographs shrunk to the size of a printed period.

Digital media offer endless hiding places, because files contain more detail than anyone perceives. The classic method changes the **least significant bit** of each pixel's color values. Altering a value from 200 to 201 is invisible to the eye, yet a large image carries hundreds of kilobytes of hidden data this way. Compressed formats require subtler tricks, such as adjusting the coefficients a JPEG stores; see [[JPEG]] and [[Image Format]]. Audio, video, text spacing and even the timing or unused header fields of network packets can carry hidden bits.

Steganography is usually combined with encryption, so that even a discovered message can't be read; see [[Public-Key Cryptography]] and [[One-Time Pad]]. The reverse discipline, **steganalysis**, looks for statistical traces. Natural images have characteristic noise patterns, and embedding data disturbs them in detectable ways, much as a signal changes the background noise it hides in; see [[Signal-to-Noise Ratio]]. Hiding less makes detection harder, a trade-off between capacity and stealth. Re-saving, cropping or resizing an image often destroys hidden data, too.

The technique has many users:

- **Malware** hides code or commands inside images and web traffic to slip past security tools; see [[Computer Virus]].
- **Data theft** can leak information through covert channels in permitted traffic, evading monitoring; see [[Wiretapping]].
- **Watermarking** embeds an owner's identifier in media to trace leaks and copies.
- **Printer tracking dots**, faint yellow patterns many color laser printers add to each page, encode the printer's serial number and a timestamp. Researchers publicized them in 2005.

Spread-spectrum radio follows a similar idea, spreading a signal below the noise floor so it is hard to detect at all; see [[Spread Spectrum]].

## See also
- [[Caesar Cipher]]
- [[Enigma Machine]]
