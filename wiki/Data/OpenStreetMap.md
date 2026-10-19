---
aliases:
  - OSM
  - Volunteered geographic information
tags:
  - data
summary: A free, editable map of the whole world built by volunteers since 2004, whose openly licensed data now underlies countless apps, humanitarian responses and even commercial maps, and which showed that a wiki approach could work for geography.
---
**OpenStreetMap** is a map of the world that anyone can edit and anyone can use. Volunteers trace roads, buildings, paths, shops and rivers into a shared database, and the result is published under an open license, free for anyone to download, reuse and build on; see [[Open Data]].

Steve Coast started the project in the UK in 2004. At the time, detailed map data in Britain came mostly from the government's mapping agency and was expensive to license, as was commercial data elsewhere. Inspired by [[Wikipedia]], the founders reasoned that people with GPS receivers could survey their own neighborhoods and pool the results; see [[Global Positioning System]] and [[Wiki]]. Early contributors organized social mapping parties, walking and cycling around a town to fill in its streets. Later, companies donated aerial imagery that volunteers could trace from home.

The data model is deliberately simple. Points are **nodes** with coordinates; **ways** are ordered lists of nodes forming roads, rivers or building outlines; **relations** group them into larger things like bus routes or national borders. Any element can carry free-form tags, such as highway=residential or cuisine=pizza. There's no fixed schema: the community agrees on tag conventions through wiki pages and usage, which lets the map record anything from benches to wheelchair access but makes the data uneven; see [[Folksonomy]] and [[Geospatial Data]].

The project's humanitarian role became clear after the 2010 earthquake in Haiti. Within days, volunteers worldwide traced roads, damaged buildings and camps from fresh satellite imagery, producing maps of Port-au-Prince far more detailed than what had existed, which relief groups then used; see [[Earthquake]]. A Humanitarian OpenStreetMap Team now coordinates such mapping for disasters and for places commercial maps neglect.

Its data now powers a large share of the world's maps, often invisibly. Apps for cycling, hiking and navigation, many websites' maps, and some features of major technology companies' maps draw on it. Those companies have become major contributors, employing paid editors and donating imagery, which has raised debates about corporate influence in a volunteer project. The license, adopted in 2012, requires that improvements to the database itself be shared back.

The data is usually displayed as square image tiles in a standard projection, a design that most online maps share; see [[Tile Map]] and [[Web Mercator]]. Turning a typed address into coordinates relies on the map's address and place-name data; see [[Geocoding]] and [[Gazetteer]]. Quality varies with the number of active local mappers, from extraordinarily detailed cities to sparse rural regions, and vandalism is usually caught quickly by other editors who watch the stream of changes, as on any wiki; see [[Postal Address]].

## See also
- [[Wikidata]]
- [[Linked Data]]
