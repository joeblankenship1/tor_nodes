(function() {
    // add token
    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9lYmxhbmtlbnNoaXAxIiwiYSI6ImNqZGRjY2F3ZjAwNTMyd3FoOG83c3A4aWsifQ.bXiHMzyYHgFukGwVPUddAw';
    // This adds the map to your page
    var map = new mapboxgl.Map({
        // container id specified in the HTML
        container: 'map',
        // style URL
        style: 'mapbox://styles/mapbox/dark-v9',
        // initial position in [lon, lat] format
        center: [0, 30],
        // initial zoom
        zoom: 1
    });

    map.on('load', function(e) {
        $.getJSON('data/tornodes_exitfast.json', function(geojson) {
            //console.log(geojson);
            addLayer(geojson);
            nodeLocationList(geojson);
        });
    });

    function addLayer(geojson) {
        // Add the data to your map as a layer
        map.addLayer({
            id: 'locations',
            type: 'symbol',
            // Add a GeoJSON source containing place coordinates and information.
            source: {
                type: 'geojson',
                data: geojson
            },
            layout: {
                'icon-image': 'circle-stroked-15',
                'icon-allow-overlap': true,
            }
        });
    }

    function nodeLocationList(geojson) {
        // Iterate through the list of stores
        for (i = 0; i < geojson.features.length; i++) {
            var currentFeature = geojson.features[i];
            // Shorten data.feature.properties to just `prop` so we're not
            // writing this long form over and over again.
            var prop = currentFeature.properties;
            // Select the node container in the HTML and append a div
            // with the class 'item' for each store
            var nodes = document.getElementById('nodes');
            var node = nodes.appendChild(document.createElement('div'));
            node.className = 'item';
            node.id = 'node-' + i;

            // Create a new link with the class 'title' for each store
            // and fill it with the store address
            var link = node.appendChild(document.createElement('a'));
            link.href = '#';
            link.className = 'title';
            link.dataPosition = i;
            link.innerHTML = prop.Name;

            // Create a new div with the class 'details' for each store
            // and fill it with the city and phone number
            var details = node.appendChild(document.createElement('div'));
            details.innerHTML = prop.description;
            /*if (prop.phone) {
                details.innerHTML += ' &middot; ' + prop.phoneFormatted;
            }*/
        }
    }
})();