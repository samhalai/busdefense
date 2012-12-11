Bd.bing = {

    apiKey: 'Aof4QYPrmUOzqF4KmyEOwm5ZaAPC1ONHcFYnozt20Ds5ANU7SZlj-hq4aB3rBOM4',
    bridgeStart: { lat: 47.642919, lon: -122.276073 },
    bridgeEnd: { lat: 47.640352, lon: -122.253628 },
    spaceNeedle: { lat: 47.6215, lon: -122.349329 },

    map: null,
    zoom: 18,
    velocity: 0.0003,
    options: null,
    bearing: 0,

    loc: { lat: 47.642919, lon: -122.276073 },
    stepsize: { lat: 0, lon: 0 },
    stepsRemaining: 0,
    route: null,
    routeLegsRemaining: 0,

    getMap: function () {
        Bd.bing.map = new Microsoft.Maps.Map(document.getElementById('myMap'), { credentials: Bd.bing.apiKey, center: new Microsoft.Maps.Location(Bd.bing.loc.lat, Bd.bing.loc.lon), mapTypeId: Microsoft.Maps.MapTypeId.birdseye, zoom: Bd.bing.zoom });
        Bd.bing.options = Bd.bing.map.getOptions();
        Bd.bing.options.disableKeyboardInput = true;
        Bd.bing.options.disableMouseInput = true;
        Bd.bing.options.disablePanning = true;
        Bd.bing.options.disableTouchInput = true;
        Bd.bing.options.disableUserInput = true;
        Bd.bing.options.disableZooming = true;
        Bd.bing.options.heading = 90;
        Bd.bing.map.setView(Bd.bing.options);
    },

    moveMapAlongRoute: function (route, callback) {
        Bd.bing.route = route;
        //expects route to be a JSON array containing lat,lon
        Bd.bing.routeLegsRemaining = Bd.bing.route.length;
        //set map to first point in the route
        Bd.bing.loc = Bd.bing.route[0];
        Bd.bing.getMap();
        //start animating each leg
        Bd.bing._moveMapAlongRouteStep(callback);
    },

    _moveMapAlongRouteStep: function (callback) {
        Bd.bing.routeLegsRemaining--;
        if (Bd.bing.routeLegsRemaining > 0) {
            if (Bd.bing.routeLegsRemaining == 31) debugger;
            //Bd.bing.loc = Bd.bing.route[Bd.bing.route.length - Bd.bing.routeLegsRemaining];
            //Bd.bing.moveMapTo(Bd.bing.loc, function () {
            Bd.bing.moveMapTo(Bd.bing.route[Bd.bing.route.length - Bd.bing.routeLegsRemaining], function () {
                Bd.bing._moveMapAlongRouteStep(callback)
            });
        } else {
            if (callback && typeof (callback) === "function") {
                callback();
            }
        }
    },

    moveMapTo: function (latlon, callback) {
        if (latlon.lat == null) latlon.lat = Bd.bing.loc.lat;
        if (latlon.lon == null) latlon.lon = Bd.bing.loc.lon;

        var latDiff = Bd.bing.loc.lat - latlon.lat;
        var lonDiff = Bd.bing.loc.lon - latlon.lon;
        /*Bd.bing.stepsize.lat = latDiff / 200;
        Bd.bing.stepsize.lon = lonDiff / 200;
        Bd.bing.stepsRemaining = 200;*/

        Bd.bing.stepsRemaining = Math.abs(latDiff / Bd.bing.velocity) + 3;
        Bd.bing.stepsize.lat = latDiff / Bd.bing.stepsRemaining;
        Bd.bing.stepsize.lon = lonDiff / Bd.bing.stepsRemaining;

        //set the heading for each segment
        Bd.bing.options.heading = Bd.bing._getHeading(Bd.bing.loc, latlon) + 90;

        Bd.bing._moveMapStep(callback);
    },

    _moveMapStep: function (callback) {
        if (Bd.bing.stepsRemaining > 0) {
            if (Bd.play) {
                Bd.bing.loc.lat -= Bd.bing.stepsize.lat;
                Bd.bing.loc.lon -= Bd.bing.stepsize.lon;
                Bd.bing.map.setView({ zoom: Bd.bing.zoom, center: new Microsoft.Maps.Location(Bd.bing.loc.lat, Bd.bing.loc.lon), heading: Bd.bing.options.heading });
                //Bd.bing.map.setView({ zoom: Bd.bing.zoom, center: new Microsoft.Maps.Location(Bd.bing.loc.lat, Bd.bing.loc.lon), heading: 0 });
                Bd.bing.stepsRemaining--;
            }
            timeoutFn = function () {
                Bd.bing._moveMapStep(callback);
            };
            setTimeout(timeoutFn, 300);
        } else {
            if (callback && typeof (callback) === "function") {
                callback();
            }
        }
    },

    _getHeading: function (loc1, loc2) {
        var dLat = (loc2.lat - loc1.lat) * Math.PI / 180; //.toRad();
        var dLon = (loc2.lon - loc1.lon) * Math.PI / 180; //.toRad();
        var lat1 = loc1.lat * Math.PI / 180;
        var lat2 = loc2.lat * Math.PI / 180;
        var y = Math.sin(dLon) * Math.cos(lat2);
        var x = Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
        Bd.bing.bearing = Math.atan2(y, x) * 180 / Math.PI;
        return Bd.bing.bearing;
    }

}

