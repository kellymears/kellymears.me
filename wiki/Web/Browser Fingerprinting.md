---
aliases:
  - Fingerprinting
  - Device fingerprinting
  - Canvas fingerprinting
tags:
  - web
summary: Identifying a browser by the combination of ordinary traits it reveals, such as its screen, fonts, and graphics quirks, a tracking method that needs no stored data and survives clearing cookies.
---
**Browser fingerprinting** identifies a browser by measuring many small details about it and combining them into a signature. No single detail is unique, but together they often are. Unlike an [[HTTP Cookie]], a fingerprint stores nothing on the device, so clearing cookies, using private browsing, or blocking storage doesn't remove it.

Ingredients a script can read:

- **Configuration.** User-agent string, language, time zone, screen size and pixel density, installed fonts, and hardware details such as CPU core count and memory.
- **Rendering quirks.** Drawing the same text and shapes to an [[HTML Canvas]] produces slightly different pixels on different graphics hardware, drivers, and font renderers. Hashing the result gives a stable identifier; see [[Hash Function]]. Graphics APIs and audio processing leak similar differences; see [[WebGPU]].
- **Behavior.** Supported features, timing of operations, and installed extensions inferred from side effects.

The math is [[Information Theory]]. Each trait carries some bits of identifying information; a time zone shared by a tenth of users is worth about three bits. Identifying one person among eight billion takes only about 33 bits. A 2010 study by the Electronic Frontier Foundation found that 84 percent of the browsers it tested were unique, and later studies, while finding lower rates on phones, confirmed the method works at scale.

Fingerprinting matters most as a replacement for the [[Third-Party Cookie]]. As browsers block cross-site cookies, trackers can recognize the same browser across sites by its fingerprint instead. It also has legitimate uses: banks and login systems use it to flag sign-ins from unfamiliar devices, and anti-bot services use it to spot automated browsers.

Defenses take two opposite approaches:

- **Make everyone look the same.** The Tor Browser standardizes window sizes, fonts, and reported settings so its users share one fingerprint; see [[Onion Routing]]. This only works if many people use identical settings.
- **Add noise.** Some browsers slightly randomize canvas and audio output per site and per session, so the fingerprint changes every time.
- **Reduce what's exposed.** Browser makers have frozen parts of the user-agent string and require permission for sensitive APIs.

A paradox complicates privacy settings: unusual choices make a browser rarer, and rarity is exactly what fingerprinting measures. Blocking scripts or tweaking dozens of settings can make someone more identifiable, not less. Anonymity depends on blending into a crowd, the idea behind k-anonymity; see [[Differential Privacy]].

Privacy law in Europe treats fingerprinting like cookies: storing or reading information from a device for tracking requires consent; see [[Personal Data]]. Detection is hard, since the same API calls serve ordinary features. Each new browser capability is reviewed for how many bits it adds, a constraint that shapes [[Web Standards]].

## See also
- [[Web Audio API]]
- [[Traffic Analysis]]
- [[Turing Test]]
- [[User Agent String]]
- [[Browser Extension]]
