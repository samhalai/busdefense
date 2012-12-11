var Bd = {

    debug: null,
    play: true,

    init: function () {
        //Bd.bing.loc = Bd.route.otc_to_bellevue_way[0];
        Bd.game.init();
        //Bd.bing.getMap();
        Bd.debug = document.getElementById("debug");
        //var king = setTimeout(Bd.bing.moveMapTo(50), 10000 );
        //Bd.bing.moveMapTo(Bd.bing.bridgeEnd);
        //Bd.bing.moveMapTo(Bd.route.otc_to_bellevue_way[1]);
        Bd.start();
    },

    start: function () {
        Bd.bing.moveMapAlongRoute(Bd.route.otc_to_bellevue_way,
            function () {
                Bd.bing.moveMapAlongRoute(Bd.route.bellevue_way_to_evergreen_bridge,
                    function () {
                        Bd.bing.moveMapAlongRoute(Bd.route.evergreen_bridge_to_westlake_center);
                    }
                );
            }
        );
        //Bd.bing.moveMapAlongRoute(Bd.route.bellevue_way_to_evergreen_bridge);
    },

    togglePlay: function () {
        Bd.play = !Bd.play;
    }
}