const flightPlanCoordinates = [
    {lat: 40.0012162, lng: -83.011562},
    /*{lat: 40.0003344, lng: -83.011562},
    {lat: 40.000052, lng: -83.011562},
    {lat: 39.99629, lng: -83.0198173},
    {lat: 39.9935584, lng: -83.0223095},
    {lat: 39.9899025, lng: -83.0221226},*/
];

function initMap() {
    // The location of Uluru
    const ohio_state = {lat: 40.0012162, lng: -83.011562};

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 17,
        center: ohio_state,
    });

    const marker = new google.maps.Marker({
        position: ohio_state,
        map: map,
    });





    //console.log(coordinate);

    const flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
    });

    var i = 0;

    var intervalId = window.setInterval(function () {
        var coordinate = {lat: flightPlanCoordinates[0].lat - (i+1)*(0.0005),
            lng: flightPlanCoordinates[0].lng - (i+1)*(0.0004)}
        flightPlanCoordinates.push(coordinate);

        console.log(coordinate);

        const flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });

        flightPath.setMap(map);



        if (i < flightPlanCoordinates.length) {
            latCoordinate = flightPlanCoordinates[i].lat;
            lngCoordinate = flightPlanCoordinates[i].lng;
            i+=1;
        }

        marker.setMap(map);
        moveMarker(map, marker,latCoordinate,lngCoordinate);
    }, 2000);
}


function moveMarker(map, marker,lat,long) {

    //delayed so you can see it move
    setTimeout(function () {

        marker.setPosition(new google.maps.LatLng(lat, long));
        map.panTo(new google.maps.LatLng(lat, long));

    }, 1500);

};

initMap()
