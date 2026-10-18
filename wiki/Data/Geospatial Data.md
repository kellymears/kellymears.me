---
aliases:
  - GIS
  - Geographic Information System
  - GeoJSON
  - Geohash
  - PostGIS
tags:
  - data
summary: Data tied to places on Earth, as points, lines, polygons, and grids, which needs its own coordinate systems, file formats, and indexes because the planet is round and ordinary database indexes are one-dimensional.
---
**Geospatial data** describes things by their location on Earth: a store as a point, a road as a line, a county as a polygon, or elevation and satellite imagery as grids of cells. Systems for storing, querying, and mapping it are called geographic information systems (GIS).

Every coordinate needs a reference system. Latitude and longitude on the WGS 84 model of the Earth's shape are what GPS reports and what most web data uses; see [[Global Positioning System]]. Drawing them on a flat map requires a projection, each of which distorts something; see [[Map Projection]]. Coordinate order is a classic bug. People say "latitude, longitude," but GeoJSON and most software store longitude first, like x before y, so swapped pairs put points in the ocean or on another continent.

Geometry on a sphere is not flat geometry. A degree of longitude spans about 111 kilometers at the equator and shrinks to nothing at the poles, so treating coordinates as x and y distorts distances and areas away from the equator. Real distance calculations use great-circle formulas or project to a local flat system first. Six decimal places of a degree is about ten centimeters, so values stored to fifteen places claim accuracy no receiver has.

Common formats:

- **Shapefile**, from the early 1990s, still widespread.
- **GeoJSON**, a [[JSON]] format standardized in 2016, the usual choice for web maps.
- **GeoParquet** and similar formats bring geometry to analytical files; see [[Columnar Storage]].

Indexing is the hard part. A query like "the ten nearest cafés" involves two dimensions, and an ordinary sorted index orders values along one. Spatial indexes group nearby shapes by their bounding boxes, most commonly in an R-tree; see [[Spatial Partitioning]] and [[Database Index]]. A **geohash** takes another route: it interleaves the bits of latitude and longitude into one string, so places that share a long prefix are usually close. "Usually" matters, because two points on either side of a cell boundary can be neighbors with no prefix in common. PostGIS, an extension to PostgreSQL, adds geometry types, spatial indexes, and hundreds of functions to a [[Relational Database]].

Turning addresses into coordinates, called geocoding, is messy, because addresses are inconsistent, abbreviated, and duplicated; see [[Entity Resolution]]. OpenStreetMap, a map built by volunteers since 2004, is the largest free source of geographic data; see [[Open Data]].

Location data is among the most revealing kinds of [[Personal Data]]. A 2013 study found that four points from phone location records were enough to identify most individuals in a dataset of 1.5 million. In 2018 a fitness app's public heat map of its users' workouts exposed the layout of military bases. Aggregating and adding noise reduces the risk; see [[Differential Privacy]].

## See also
- [[Time Series Database]]
- [[Data Visualization]]
- [[Geocoding]]
