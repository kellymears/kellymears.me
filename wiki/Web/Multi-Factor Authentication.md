---
aliases:
  - MFA
  - Two-factor authentication
  - 2FA
  - One-time password
  - TOTP
  - SIM swapping
tags:
  - web
summary: Requiring a second kind of proof besides a password to sign in, such as a code, a phone prompt, or a hardware key, and why only the methods tied to the real website stop modern phishing.
---
**Multi-factor authentication** requires more than one kind of evidence to sign in. The classic categories are something you know (a password), something you have (a phone or a hardware key), and something you are (a fingerprint or face). A stolen password alone then isn't enough, which defeats the most common attacks: passwords leaked from another site and reused, and passwords guessed by trying common ones.

The common second factors, roughly from weakest to strongest:

- **Text message codes.** A code sent by SMS. Better than nothing, but phone numbers can be stolen. In **SIM swapping**, an attacker persuades a mobile carrier to move the victim's number to a new SIM card, then receives their codes; in 2019 the Twitter account of the company's own chief executive was hijacked after a SIM swap.
- **Authenticator apps.** A shared secret, set up by scanning a QR code, is combined with the current time through a keyed hash to produce a six-digit code that changes every thirty seconds. Published as a standard in 2011 as **TOTP**, it works offline, but it depends on the phone's clock agreeing with the server's; see [[Hash Function]] and [[Network Time Protocol]].
- **Push approvals.** The phone shows "Is this you signing in?" and the user taps yes. Attackers exploit this by sending prompts repeatedly until a tired or confused user approves one, a tactic called MFA fatigue; a 2022 breach at Uber began this way, paired with a message pretending to be from IT support; see [[Habituation]].
- **Security keys and passkeys.** A hardware key or device signs a challenge with a private key bound to the website's domain; see [[Public-Key Cryptography]] and [[Passkey]].

That last distinction matters most. Codes can be phished. Modern phishing kits run a proxy that sits between the victim and the real site, passing along the password and the code in real time and keeping the session that results; see [[Man-in-the-Middle Attack]] and [[Phishing]]. Only methods where the browser itself checks the site's address resist this. Google reported in 2018 that after requiring security keys for all its employees, none of their work accounts had been phished.

A fingerprint usually unlocks a key stored on the device; it is never sent to the website.

Recovery is the weak point. People lose phones, so systems offer backup codes, fallback text messages, or support staff who can reset a factor, and attackers target whichever path is weakest. A second factor is only as strong as the process for replacing it.

Requiring MFA through a central identity provider covers many applications at once; see [[Single Sign-On]]. Once sign-in succeeds, the protection ends and the session takes over, so stealing a session cookie bypasses every factor; see [[Session Management]]. Login endpoints still need limits on repeated attempts; see [[Rate Limiting]].

## See also
- [[SMS]]
- [[Data Breach]]
