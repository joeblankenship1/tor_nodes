# TOR Nodes Map

This is a map of TOR nodes based on the work of [George Kargiotakis](https://github.com/kargig) and [moba](https://github.com/moba) rendered with Mapbox GL JS.

### Dependencies

You will need to install `node.js` and `npm` in order to proceed with the data processing step. Specifically, you will need `mapshaper` to manipulate the geojsons during the conversion process.

```
npm install -g mapshaper
```

You will also need `OGR` tools, specifically `ogr2ogr` to convert between file formats. You can download the GDAL software [here](http://www.gdal.org/).

### Data Processing

**TLDR: Run the shell script to download and clean all the data. Open your bash terminal and from the `tor_nodes` directory and paste this line:**

```
cd project_data && chmod a+x tormap.sh && ./tormap.sh
```

From here you can move the files you need to the `data` directory for the app.

The data for this project was obtained from `https://tormap.void.gr/` in `KML` format. In order to render it, use `ogr2ogr` to convert to GeoJSON:

```
ogr2ogr -f GeoJSON output_filename.json input_filename.kml
```

Due to how the data was generated from the TOR API, there are several fields that have no real purpose for visualization in the app. Pipe the ogr2ogr output into `mapshaper` in order to clean and reduce the fields and coordinates:

```
mapshaper ogr2ogr_output.json -filter-fields Name,description -o format=geojson precision=.0001 new_output_filename.json
```

You can then import the data into the app.

### Mapping the Data

As of now, the data is rendered using the [MapBox GL JS API](https://www.mapbox.com/mapbox-gl-js/api/). The initial focus is on the fast exit nodes, but all data layers found on the current site will soon be supported. Styling was accomplished with [Assembly CSS](https://www.mapbox.com/assembly/). You can render all the below layers (which were generated in the data processing steps above):

1. Stable Nodes
2. Stable Fast Nodes (>= 5 Mb/s)
3. Exit Nodes
4. Exit Fast Nodes (>= 5 Mb/s)
5. Authority Nodes
6. Bad Nodes
7. Other Nodes

The content on the pages is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/).
