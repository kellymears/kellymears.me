---
aliases:
  - Spear phishing
  - Homograph attack
  - Business email compromise
  - Smishing
tags:
  - web
summary: Tricking people into handing over passwords, money, or access with messages and websites that impersonate someone they trust, the most common way attackers get in, and why technical defenses beat training.
---
**Phishing** is tricking people into giving up credentials, money, or access by impersonating someone they trust, usually through a message that leads to a fake website. It is the most common first step in breaches, because fooling one person is easier than breaking the software.

The term dates from the mid-1990s, when people stealing America Online accounts "fished" for passwords with messages posing as AOL staff, spelled with the "ph" of the earlier phone-hacking culture. The basic pattern hasn't changed: a message creates a reason to act, a link leads to a convincing copy of a real login page, and whatever is typed goes to the attacker.

Variants:

- **Spear phishing** targets particular people with personal details, such as a colleague's name or a real project, which raises the success rate dramatically.
- **Business email compromise** skips the link entirely: a message apparently from an executive or supplier asks for a wire transfer or changed bank details. The FBI attributes billions of dollars in losses a year to it, among the costliest of online crimes.
- **Smishing** and voice phishing use text messages and phone calls, and QR codes now hide links in posters and letters.
- **Consent phishing** asks the victim to approve a malicious app's access to their account, which works even with strong sign-in; see [[OAuth]].

Deception happens at every layer. Sender addresses can be forged unless domains publish authentication records. Lookalike domains swap letters or add words. A **homograph attack** uses characters from other alphabets that look identical, such as a Cyrillic "а" in place of a Latin "a." A 2017 demonstration registered a domain that displayed as a famous technology company's address in several browsers, which then began showing the encoded form of such names instead; see [[URL]]. Links on legitimate domains that forward elsewhere lend false credibility; see [[Open Redirect]]. Link previews can be faked; see [[Open Graph]]. The padlock icon proves only that the connection is encrypted, not who is on the other end, and free certificates mean most phishing sites now have one.

Urgency, authority, and fear do the rest, crowding out careful checking.

Defenses that don't depend on people noticing work best:

- **Domain-bound sign-in.** Security keys and passkeys refuse to sign in to the wrong site. One-time codes, by contrast, can be relayed; see [[Multi-Factor Authentication]].
- **Password managers.** They fill passwords only on the domain where they were saved, so a refusal to autofill is a warning sign.
- **Process.** Payment changes confirmed by phone through a known number.

Training and simulated phishing campaigns are widespread, but studies find their effect modest and short-lived.

## See also
- [[Remote Desktop]]
- [[Internationalized Domain Name]]
