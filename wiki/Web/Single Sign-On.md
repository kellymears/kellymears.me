---
aliases:
  - SSO
  - SAML
  - OpenID Connect
  - Identity provider
  - Federated identity
tags:
  - web
summary: Signing in once with a central identity provider and being trusted by many separate applications, through signed assertions passed by browser redirects, which concentrates both convenience and risk in one place.
---
**Single sign-on** lets a person sign in once, with one central service, and then use many separate applications without signing in to each. The central service is the **identity provider**. The applications, called service providers or relying parties, never see a password; they trust a signed statement from the provider saying who the user is.

The idea predates the web. Kerberos, developed at MIT in the 1980s, issued time-limited tickets that let a campus user reach many network services after one login, and it still underpins sign-in on corporate Windows networks. On the web, the job is done with browser redirects:

1. The user visits an application, which has no session for them and redirects the browser to the identity provider.
2. The provider authenticates the user, by password, security key, or whatever it requires, or recognizes an existing session.
3. The provider redirects the browser back with a signed assertion of identity.
4. The application checks the signature against the provider's published public key and starts its own session; see [[Public-Key Cryptography]] and [[Session Management]].

Two standards dominate. **SAML**, finalized in 2005, carries assertions as signed [[XML]] documents and remains the norm inside large organizations. **OpenID Connect**, published in 2014, adds an identity layer to [[OAuth]], returning a signed [[JSON Web Token]], and powers consumer buttons like "Sign in with Google" or "Sign in with Apple."

The benefits are practical. People remember one password instead of dozens. Security policies such as [[Multi-Factor Authentication]] are enforced in one place. When someone leaves an organization, disabling one account cuts off every application at once, and a companion standard, SCIM, creates and removes the accounts themselves.

The costs come from concentration:

- **One key to everything.** A compromised identity provider account opens every connected application, which makes it a favorite target for [[Phishing]].
- **One point of failure.** When the provider is down, nobody can sign in anywhere.
- **Parsing bugs.** SAML's XML signatures have suffered repeated "signature wrapping" flaws, in which a validator checks one part of a document while the application reads another.
- **Redirect handling.** If an application accepts any return address, an attacker can steer the signed assertion to their own site; see [[Open Redirect]].

Browser privacy changes have complicated things. Some systems checked for an existing login silently inside a hidden [[Iframe]], which relied on cookies that browsers now block across sites; see [[Third-Party Cookie]]. Browsers have proposed dedicated sign-in interfaces to replace those tricks.

Many software vendors charge much more for plans that include single sign-on, a practice critics call the "SSO tax," since it makes basic account security a premium feature; see [[Open Core]].

## See also
- [[Passkey]]
- [[Least Privilege]]
- [[Password Manager]]
- [[Healthcare.gov Launch]]
