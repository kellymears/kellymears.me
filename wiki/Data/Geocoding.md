---
aliases:
  - Reverse geocoding
  - Address geocoding
  - Address interpolation
tags:
  - data
summary: Turning a written address into map coordinates, and coordinates back into an address, a fuzzy matching problem whose failures pile records onto town centers, guessed points along a street, and an imaginary island at zero degrees.
---
**Geocoding** converts a description of a place, usually a street address, into coordinates on a map. **Reverse geocoding** goes the other way, from a point, such as a phone's GPS fix, to the nearest address or place name; see [[Global Positioning System]]. Almost every delivery app, map search, and analysis of where things happen depends on it; see [[Geospatial Data]].

A geocoder works in stages:

1. **Parse and normalize.** Split free text into parts, such as house number, street, city, and postal code, and standardize spellings and abbreviations, so "St" and "Street" match; see [[Postal Address]].
2. **Match.** Look the parts up in a reference database of known addresses or streets, tolerating typos and variants; see [[Fuzzy matching]] and [[Entity Resolution]].
3. **Locate.** Return a coordinate along with how precise it is.

The precision varies a lot. The best reference data holds a point for each building or parcel, often from local governments. Where that is missing, geocoders use **address interpolation**: a street segment is known to run from, say, number 100 to number 198, so number 150 is placed halfway along it. In the US, the Census Bureau's street files, built for the 1990 census, made this practical nationwide; see [[Census]]. But houses aren't evenly spaced and numbering isn't always continuous, so an interpolated point can land tens of meters off or on the wrong side of the street.

When a match fails, many systems fall back to something coarser, such as the center of the postal code or the city. Analyses that ignore the precision level then find suspicious clusters of records at town centers. A worse fallback returns zero latitude and zero longitude, a spot in the Gulf of Guinea that mapmakers jokingly named **Null Island** for the records that pile up there; see [[Null]]. A related problem hit IP-address location: for years a database placed millions of US addresses it couldn't locate at the geographic center of the country, a farm in Kansas whose owners were repeatedly visited by people looking for scammers and lost phones.

Geocoding underpins public-health mapping, emergency dispatch, crime analysis, and planning, and its results are often shown as maps of rates by area; see [[Choropleth Map]]. To search the results by location efficiently, systems index the points spatially; see [[R-tree]].

Coordinates are also a privacy risk. A home address geocoded alongside a health record can identify a person even when names are removed, so researchers often blur points or aggregate them to areas before publishing; see [[Re-identification]] and [[Personal Data]].

Practical concerns come with commercial services: per-request charges, rate limits, and terms that sometimes forbid storing results, which pushes some organizations toward open reference data and self-hosted geocoders; see [[Rate Limiting]] and [[Open Data]].

## See also
- [[Doxing]]
- [[Map Projection]]
