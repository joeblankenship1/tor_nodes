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
})();