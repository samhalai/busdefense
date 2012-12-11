Bd.game = {

    width: 480,
    height: 300,
    gloop: null,
    c: document.getElementById("c"),
    ctx: null,
    bus: { left: null, right: null, front: null, back: null, top: null, bus135: null, bus45: null, bus90: null },

    howManyCircles: 3,

    circles: [],

    InitCircles: function () {
        for (var i = 0; i < Bd.game.howManyCircles; i++)
            Bd.game.circles.push([Math.random() * Bd.game.width, Math.random() * Bd.game.height, Math.random() * 100, Math.random() / 2]);
    },

    DrawCircles: function () {
        for (var i = 0; i < Bd.game.howManyCircles; i++) {
            Bd.game.ctx.fillStyle = 'rgba(255, 255, 255, ' + Bd.game.circles[i][3] + ')';
            Bd.game.ctx.beginPath();
            Bd.game.ctx.arc(Bd.game.circles[i][0], Bd.game.circles[i][1], Bd.game.circles[i][2], 0, Math.PI * 2, true);
            Bd.game.ctx.closePath();
            Bd.game.ctx.fill();
        }
    },

    MoveCircles: function (deltaX) {
        for (var i = 0; i < Bd.game.howManyCircles; i++) {
            if (Bd.game.circles[i][0] - Bd.game.circles[i][2] < 0) {
                //the circle is under the screen so we change
                //informations about it 
                Bd.game.circles[i][1] = Math.random() * Bd.game.height;
                Bd.game.circles[i][2] = Math.random() * 100;
                Bd.game.circles[i][0] = Bd.game.width + Bd.game.circles[i][2];
                Bd.game.circles[i][3] = Math.random() / 2;
            } else {
                //move circle deltaX pixels right
                Bd.game.circles[i][0] -= deltaX;
                Bd.game.circles[i][1] -= deltaX / 2;
            }
        }
    },

    drawBus: function (bearing) {
        //bearing = 150;
        var sin = Math.sin(bearing * Math.PI / 180);
        var cos = Math.cos(bearing * Math.PI / 180);
        //Bd.game.ctx.setTransform(1, 0, 0, 1, 0, 0);
        Bd.game.ctx.translate(100, 50);
        //Bd.game.ctx.transform(1, 0, 0, 1, 0, 0);
        //Bd.game.ctx.translate(150, 150);
        //Bd.game.ctx.rotate(bearing);
        //Bd.game.ctx.drawImage(Bd.game.bus.left, 0, 0);
        //Bd.game.ctx.drawImage(Bd.game.bus.right, 0, 0);
        //Bd.game.ctx.drawImage(Bd.game.bus.front, 0, 0);
        //Bd.game.ctx.drawImage(Bd.game.bus.back, 0, 0);

        var busToDraw = Bd.game.bus.bus90;
        //we assume that the map bearing is used to ensure the bus is always headed towards the left of the screen
        //depending on the aireal map available, we will still need topick one of the buses
        if ((bearing < -60) && (bearing > -83)) {
            busToDraw = Bd.game.bus.bus45;
        }
        if ((bearing < -83) && (bearing > -128) || (bearing < -172) && (bearing > -180)) {
            busToDraw = Bd.game.bus.bus90;
        }
        if ((bearing < -128) && (bearing > -138)) {
            busToDraw = Bd.game.bus.bus135;
        }
        if ((bearing < -138) && (bearing > -165)) {
            busToDraw = Bd.game.bus.bus45;
        }
        if ((bearing < -165) && (bearing > -180)) {
            busToDraw = Bd.game.bus.bus90;
        }

        Bd.game.ctx.drawImage(busToDraw, 0, 0);
        //Bd.game.ctx.transform(1, 0.3, 0, 1, 50, 100);
        //Bd.game.ctx.setTransform(1, 0, 1, 0, 0, 0);
        Bd.game.ctx.setTransform(1, 0, 0, 1, 0, 0);
        Bd.game.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        Bd.game.ctx.beginPath();
        Bd.game.ctx.rect(0, 0, 200, 60);
        Bd.game.ctx.closePath();
        Bd.game.ctx.fill();

        Bd.game.ctx.font = "bold 12px sans-serif";
        Bd.game.ctx.fillStyle = 'rgba(247, 150, 70, 0.9)';
        Bd.game.ctx.fillText('Bearing:' + bearing, 10, 10);
        Bd.game.ctx.fillText(' Lat:' + Bd.bing.loc.lat, 10, 20);
        Bd.game.ctx.fillText(' Lon:' + Bd.bing.loc.lon, 10, 30);
        Bd.game.ctx.fillText(' Segments left:' + Bd.bing.routeLegsRemaining, 10, 40);
        Bd.game.ctx.fillText(' Steps left:' + Bd.bing.stepsRemaining, 10, 50);
    },

    /*player: new (function () {
    //create new object based on function and assign 
    //what it returns to the 'player' variable

    var that = this;
    //'that' will be the context now

    //attributes
    that.image = new Image();
    that.image.src = "bus.png";
    //create new Image and set it's source to the 
    //'angel.png' image I upload above

    that.width = 249;
    //width of the single frame
    that.height = 165;
    //height of the single frame

    that.X = 0;
    that.Y = 0;
    //X&Y position

    //methods 
    that.setPosition = function (x, y) {
    that.X = x;
    that.Y = y;
    }

    that.draw = function () {
    try {
    Bd.game.ctx.drawImage(that.image, 0, 0, that.width, that.height, that.X, that.Y, that.width, that.height);
    //cutting source image and pasting it into destination one, drawImage(Image Object, source X, source Y, source Width, source Height, destination X (X position), destination Y (Y position), Destination width, Destination height)
    } catch (e) {
    //sometimes, if character's image is too big and will not load until the drawing of the first frame, Javascript will throws error and stop executing everything. To avoid this we have to catch an error and retry painting in another frame. It is invisible for the user with 50 frames per second.
    }
    }
    })(),*/
    //we immediately execute the function above and 
    //assign its result to the 'player' variable
    //as a new object 

    init: function () {
        Bd.game.c.width = Bd.game.width;
        Bd.game.c.height = Bd.game.height;
        Bd.game.ctx = Bd.game.c.getContext('2d');
        Bd.game.InitCircles();
        //Bd.game.player.setPosition(~ ~((Bd.game.width - Bd.game.player.width) / 2), ~ ~((Bd.game.height - Bd.game.player.height) / 2));
        //our character is ready, let's move it 
        //to the center of the screen,
        //'~~' returns nearest lower integer from
        //given float, equivalent of Math.floor()
        Bd.game.GameLoop();
    },

    clear: function () {
        //Bd.game.ctx.fillStyle = 'rgba(247, 150, 70, 0.2)';
        //Bd.game.ctx.beginPath();
        //Bd.game.ctx.rect(0, 0, Bd.game.width, Bd.game.height);
        //Bd.game.ctx.closePath();
        //Bd.game.ctx.fill();
        Bd.game.ctx.clearRect(0, 0, Bd.game.c.width, Bd.game.c.height);
    },

    GameLoop: function () {
        if (Bd.play) {
            Bd.game.clear();
            //Bd.game.MoveCircles(5);
            //Bd.game.DrawCircles();
            //Bd.game.player.draw();
            //Bd.game.bus.left = new Image();
            //Bd.game.bus.left.src = "bus_left.png";
            //Bd.game.bus.right = new Image();
            //Bd.game.bus.right.src = "bus_right.png";
            //Bd.game.bus.front = new Image();
            //Bd.game.bus.front.src = "bus_front.png";
            //Bd.game.bus.back = new Image();
            //Bd.game.bus.back.src = "bus_back.png";
            //Bd.game.bus.top = new Image();
            //Bd.game.bus.top.src = "bus_top.png";
            Bd.game.bus.bus135 = new Image();
            Bd.game.bus.bus135.src = "bus135.png";
            Bd.game.bus.bus45 = new Image();
            Bd.game.bus.bus45.src = "bus45.png";
            Bd.game.bus.bus90 = new Image();
            Bd.game.bus.bus90.src = "bus90.png";
            Bd.game.drawBus(Bd.bing.bearing);
        }
        Bd.game.gLoop = setTimeout(Bd.game.GameLoop, 1000 / 50);
    }

}