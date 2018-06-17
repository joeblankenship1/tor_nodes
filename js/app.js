(function() {
    // This will let you use the .remove() function later on
    if (!('remove' in Element.prototype)) {
        Element.prototype.remove = function() {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };
    }
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

            map.on('click', function(e) {
                var features = map.queryRenderedFeatures(e.point, {
                    layers: ['locations']
                });
                if (features.length) {
                    var clickedPoint = features[0];
                    // 1. Fly to the point
                    flyToStore(clickedPoint);
                    // 2. Close all other popups and display popup for clicked store
                    createPopUp(clickedPoint);
                    // 3. Highlight listing in sidebar (and remove highlight for all other listings)
                    var activeItem = document.getElementsByClassName('active');
                    if (activeItem[0]) {
                        activeItem[0].classList.remove('active');
                    }
                    var selectedFeature = clickedPoint.properties.Name;
                    for (var i = 0; i < geojson.features.length; i++) {
                        if (geojson.features[i].properties.Name === selectedFeature) {
                            selectedFeatureIndex = i;
                        }
                    }
                    var node = document.getElementById('node-' + selectedFeatureIndex);
                    node.classList.add('active');
                }
            });
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
            // Shorten geojson.feature.properties to just `prop` so we're not
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
        }

        // Add an event listener for the links in the sidebar listing
        link.addEventListener('click', function(e) {
            // Update the currentFeature to the store associated with the clicked link
            var clickedNode = geojson.features[this.dataPosition];
            console.log(clickedNode);
            // 1. Fly to the point associated with the clicked link
            flyToStore(clickedNode);
            // 2. Close all other popups and display popup for clicked store
            createPopUp(clickedNode);
            // 3. Highlight listing in sidebar (and remove highlight for all other listings)
            var activeItem = document.getElementsByClassName('active');
            if (activeItem[0]) {
                activeItem[0].classList.remove('active');
            }
            this.parentNode.classList.add('active');
        });
    }

    function flyToStore(currentFeature) {
        map.flyTo({
            center: currentFeature.geometry.coordinates,
            zoom: 15
        });
    }

    function createPopUp(currentFeature) {
        var popUps = document.getElementsByClassName('mapboxgl-popup');
        // Check if there is already a popup on the map and if so, remove it
        if (popUps[0]) popUps[0].remove();

        var popup = new mapboxgl.Popup({ closeOnClick: false })
            .setLngLat(currentFeature.geometry.coordinates)
            .setHTML('<h3>Tor Node - Exit Fast</h3>' +
                '<h4>' + currentFeature.properties.Name + '</h4>')
            .addTo(map);
    }
})();