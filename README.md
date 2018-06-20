# TOR Nodes Map

This is a map of TOR nodes based on the work of [George Kargiotakis](https://github.com/kargig) and [moba](https://github.com/moba) rendered with Mapbox GL JS.

### Data Processing

I obtained the data for this project from `https://tormap.void.gr/` in `KML` format. In order to render it, I used `ogr2ogr` to convert to GeoJSON:

```
ogr2ogr -f GeoJSON output_filename.json input_filename.kml
```

Due to how the data was generated from the TOR node API, there are several field that have no real purpose for visualization. We further clean out data using `mapshaper` in reducing fields and coordinate format:

```
mapshaper output_filename.json -filter-fields Name,description -o format=geojson precision=.0001 new_output_filename.json
```

I am then able to import the data to my map.

### Mapping the Data

As of now, I'm rendering the data using the [MapBox GL JS API](https://www.mapbox.com/mapbox-gl-js/api/). I've initially focused on the fast exit nodes, but I will soon be adding support for all data layers found on the current site. Styling was accomplished with [Assembly CSS](https://www.mapbox.com/assembly/).

The content on the pages is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/).
