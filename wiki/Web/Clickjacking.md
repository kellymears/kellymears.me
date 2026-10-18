---
aliases:
  - UI redressing
  - X-Frame-Options
  - frame-ancestors
  - Framebusting
tags:
  - web
summary: Tricking a user into clicking something on another site by loading it invisibly in a frame beneath a decoy, and the headers that stop a page from being framed.
---
**Clickjacking** tricks a user into clicking something they cannot see. The attacker's page loads a legitimate site, such as a bank, social network, or settings page, inside an invisible frame, then positions a decoy beneath it: a game button, a "play" icon, a prize. The user aims for the decoy and actually clicks the hidden page above it, which is logged in as them. The click might change a setting, approve a payment, or grant camera access.

Robert Hansen and Jeremiah Grossman named the attack in 2008, alongside a demonstration that used Adobe Flash's settings panel, framed invisibly, to switch on a visitor's webcam and microphone. *Likejacking* soon spread on Facebook, where hidden Like buttons made users unknowingly promote pages. The general term is **UI redressing**.

The attack works because of how pages compose:

- **Framing.** A page can embed almost any other page with an iframe unless that page forbids it.
- **Opacity and layering.** CSS can make the frame fully transparent and stack it above the decoy, as described under [[Stacking Context]].
- **Ambient credentials.** The framed page receives the user's cookies, so it acts as them. The [[Same-Origin Policy]] keeps the attacker from reading the frame, but not from getting the user to click it.

Clickjacking is related to [[Cross-Site Request Forgery]], since both abuse a logged-in session, but CSRF forges a request directly, while clickjacking gets the user to perform a real one. Anti-CSRF tokens don't help, since the click happens on the genuine page with its genuine token.

Defenses moved from scripts to headers:

- **Framebusting scripts.** Early sites ran JavaScript that broke out of any frame. Attackers defeated it with sandboxed frames and other tricks.
- **X-Frame-Options.** Microsoft introduced this header in Internet Explorer 8 in 2009. `DENY` forbids framing and `SAMEORIGIN` allows only the site itself.
- **frame-ancestors.** The [[Content Security Policy]] directive supersedes it, listing exactly which origins may frame a page.
- **SameSite cookies.** Cookies marked `SameSite`, described under [[HTTP Cookie]], are not sent to a page framed by another site, so the framed page loads logged out.
- **Confirmation.** Sensitive actions can require an extra step a single click can't complete.

Browsers added their own protections, such as ignoring clicks on frames that just moved or became visible. Attackers keep adapting. *Cursorjacking* draws a fake pointer offset from the real one, and in 2024 Paulos Yibelo described *double-clickjacking*, which asks for a double-click and swaps windows between the two clicks, so the second lands on a page that loaded normally, such as an [[OAuth]] consent prompt, sidestepping framing protections entirely.

Framing remains legitimate for embeds, payment widgets, and previews, so the goal is precise permission rather than a blanket ban, applied alongside defenses against [[Cross-Site Scripting]].

## See also
- [[Content Security Policy]]
- [[Cross-Site Request Forgery]]
- [[Same-Origin Policy]]
- [[Dark Pattern]]
