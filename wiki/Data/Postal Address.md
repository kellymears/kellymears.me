---
aliases:
  - Postal code
  - ZIP code
  - Postcode
tags:
  - data
summary: The everyday string that tells a carrier where to deliver mail, far less regular than forms assume, with postal codes that are delivery routes rather than areas, and a long list of countries and people that don't fit the standard fields.
---
A **postal address** tells a carrier where to deliver something. It looks like simple structured data, a path from country down to building, but addresses are among the most irregular data that software routinely collects; see [[Falsehoods Programmers Believe]].

The usual model is a hierarchy: country, region, city, street, number, and unit; see [[Hierarchical Data]]. Real addresses break it in many ways:

- **Order differs.** Many countries write small to large, house before street before city; Japan and China write from large to small.
- **Streets aren't always the key.** Most Japanese addresses number city blocks and buildings, not streets, and many streets have no names.
- **Many places lack formal addresses.** Rural areas and informal settlements often rely on landmarks, and directions in Costa Rica traditionally count meters from a known building.
- **Fields vary.** Some countries have no states or provinces, and some have no postal codes.

Postal codes were added to speed sorting. Germany introduced numbered postal zones in 1941; the US ZIP Code, for Zone Improvement Plan, arrived in 1963, and nine-digit ZIP+4 codes in 1983; the UK rolled out alphanumeric postcodes nationwide in the 1970s; and Ireland had almost none outside Dublin until it launched Eircode in 2015, giving each address its own code. A US ZIP code is a set of delivery routes, not an area with a boundary; it can cross county or state lines, and one large building can have its own. The Census Bureau builds approximate areas for them precisely because ZIP codes don't define any; see [[Census]].

For anyone designing a form or schema:

1. **Ask for the country first**, then show the fields that country uses; see [[Form Design]] and [[Internationalization]].
2. **Prefer address lines** to rigidly split fields, and don't require a state or postal code where none exists.
3. **Accept any script**, and store text in a universal encoding; see [[Character Encoding]].
4. **Offer lookup** as the user types, which fixes spelling; see [[Autocomplete]].
5. **Verify against postal data** when delivery matters, rather than inventing regex rules.

Addresses are also a common key for matching records about the same household or property, but the same place can be written many ways, so matching needs standardization first; see [[Entity Resolution]] and [[Data Cleaning]]. Converting them to coordinates is a separate step; see [[Geocoding]].

Mail that can't be delivered goes to a dead letter office, a name software borrowed for undeliverable messages; see [[Dead Letter Queue]]. Email took the word "address" too, writing its two parts as person at domain; see [[Simple Mail Transfer Protocol]].

People without a fixed address, including those who are homeless, often struggle to open bank accounts or receive benefits, a reminder that the field encodes who a system assumes its users are.

## See also
- [[Phonetic Algorithm]]
- [[Country Code]]
- [[Phone Number]]
