---
aliases:
  - Short Message Service
  - Text messaging
tags:
  - networks
summary: Text messages of up to 160 characters sent between mobile phones, designed in the 1980s as a side feature of the GSM standard and grown into a global habit, a login code channel, and a fraud vector.
---
**SMS**, the Short Message Service, sends short text messages between mobile phones. It was designed in the mid-1980s as part of GSM, the European digital mobile standard, as a minor extra; see [[Cellular Network]]. The first message was sent in December 1992 by an engineer in England, from a computer to a phone, and read "Merry Christmas."

A message holds up to 160 characters. The German engineer Friedhelm Hillebrand, who led the work, described settling on the number after typing sample messages and postcards and finding that most fit. Technically, the limit is 140 bytes, which holds 160 characters from a compact 7-bit alphabet of Latin letters and common symbols. A single character outside that alphabet, such as an emoji or a letter from another script, switches the whole message to a 16-bit encoding and cuts the limit to 70; see [[Character Encoding]] and [[Emoji]]. Longer texts are split into parts and reassembled by the phone.

Messages traveled on the network's control channels, the same capacity phones used to set up calls, which were mostly idle, so each message cost carriers very little. They were stored at a message center and forwarded when the recipient's phone came in range, so a switched-off phone still got its texts later; see [[Delivery Guarantees]].

Texting started slowly, partly because early networks couldn't send messages to other carriers' customers. It took off in the late 1990s, especially among teenagers and in places with prepaid plans, where a text cost far less than a call. Typing on a number keypad was laborious, and predictive text helped by guessing the word from the key sequence; see [[Autocomplete]]. Carriers charged far more per message than it cost them, and texting became highly profitable.

Its influence spread beyond phones. Twitter launched in 2006 with a 140-character limit so a post plus a username would fit in a single text. Messaging apps that send over data connections replaced much texting in the 2010s, though SMS remains the format any phone can receive; see [[Network Effect]].

That universality made it the default channel for login codes. It's also a weak one. Attackers persuade carriers to move a number to a new SIM card and receive the codes, and flaws in the signaling network between carriers have allowed messages to be intercepted; see [[SIM swapping]]. The U.S. standards agency NIST discouraged SMS codes in 2017 guidelines, recommending app-based codes or hardware keys instead.

Text messages also carry fraud: fake delivery notices and bank alerts with links, a form called smishing; see [[Phishing]] and [[Email Spam]]. Before phones, many people did similar jobs with numeric messages; see [[Pager]].

## See also
- [[eSIM]]
- [[Federation]]
- [[End-to-End Encryption]]
- [[Minitel]]
- [[URL Shortener]]
