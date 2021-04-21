let droneIcon = 'data/drone.png';
const flightPlanCoordinates = [
    {lat: 40.0012162, lng: -83.011562},
];


function initMap() {
    const ohio_state = {lat: 40.0012162, lng: -83.011562};

    // Google Maps Settings
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 17,
        center: ohio_state,
        mapTypeId: 'roadmap'

    });

    const marker = new google.maps.Marker({
        position: ohio_state,
        icon: droneIcon,
        map: map,
    });
    marker.setMap(map);


    var i = 0;

    // Loop
    window.setInterval(function () {
        var randomMultiplier = Math.random()
        var randomInt = Math.floor(Math.random() * 10) + 1;
        var randomInt2 = Math.floor(Math.random() * 10) + 1;

        // Generating Coordinates
        var coordinate = {
            lat: flightPlanCoordinates[i].lat - (randomMultiplier) * (randomInt * 0.0001 * i),
            lng: flightPlanCoordinates[i].lng - (randomMultiplier) * (randomInt2 * 0.0001 * i),
        }
        flightPlanCoordinates.push(coordinate);
        console.log(coordinate);

        // Generating Path
        const flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });

        // Move marker
        if (i < flightPlanCoordinates.length) {
            let latCoordinate = flightPlanCoordinates[i].lat;
            let lngCoordinate = flightPlanCoordinates[i].lng;
            moveMarker(map, marker, latCoordinate, lngCoordinate);

            i += 1;
        }
        flightPath.setMap(map);

    }, 2000);
}


function moveMarker(map, marker, lat, long) {

    //delayed so you can see it move
    setTimeout(function () {

        marker.setPosition(new google.maps.LatLng(lat, long));
        map.panTo(new google.maps.LatLng(lat, long));

    }, 1500);

};


initMap()
