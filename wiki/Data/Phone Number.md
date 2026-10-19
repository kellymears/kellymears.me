---
aliases:
  - E.164
  - Telephone number
tags:
  - data
summary: The international numbering scheme for telephones, E.164, and the many ways phone numbers break software that treats them as simple integers or as stable proofs of identity.
---
A **phone number** looks like a simple string of digits, but it's an address in a worldwide routing system with national rules, historical quirks, and an identity role it was never designed for. The international scheme is set by the ITU's E.164 recommendation, which caps numbers at fifteen digits, starting with a country calling code of one to three digits.

In E.164 form a number is written with a leading plus sign and no spaces, such as +442079460000. Country calling codes don't match the [[Country Code|ISO country codes]] used elsewhere. The code +1 is shared by the United States, Canada, and many Caribbean nations under the North American Numbering Plan, and +7 covers both Russia and Kazakhstan. Numbers dialed at home often begin with a trunk prefix, usually 0, which is dropped when dialing from abroad, so a London number written 020 locally becomes +44 20 internationally. Number lengths vary within some countries, and extensions, short codes, and emergency numbers follow other rules.

This makes phone numbers a classic data trap. Storing them as integers drops leading zeros and the plus sign and can overflow. Validating them with a single [[Regular Expression]] rejects real numbers from other countries. A field that forces a fixed format frustrates anyone with a foreign number. The common advice is to accept what people type, parse it with a maintained library such as Google's open-source libphonenumber, and store the normalized international form.

Numbers also don't belong to people permanently. Number portability lets a subscriber keep a number when switching carriers, so the prefix no longer reveals the network. Unused numbers are reassigned, so a new owner can receive texts, calls, and account-recovery codes meant for the previous one. In the US, numbers in the range 555-0100 through 555-0199 are set aside for fictional use, which is why films and examples use them.

Phone numbers became de facto identity. Services use them to verify sign-ups and to send login codes, because nearly everyone has one and it's harder to create many than to create email addresses. But a text message is a weak second factor. Attackers who persuade a carrier to move a number to their own SIM card receive every code sent to it; see [[Multi-Factor Authentication]] and [[SMS]]. Matching on phone numbers is also a strong way to link records about the same person across datasets, which makes them valuable to marketers and data brokers and sensitive under privacy law; see [[Personal Data]].

Caller ID was long trivial to fake, fueling robocalls and scams, until carriers began signing call origins with [[Caller ID Authentication]].

## See also
- [[Postal Address]]
