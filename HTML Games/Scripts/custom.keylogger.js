//For use in html
//<div class="row-fluid">
//    <iframe class="span12" id="iFrame" src="http://localhost/KeyLogger.htm"></iframe>
//</div>
//
//Keystroke listner
//mark down what key is down and up into an array called "pressedKeys"
//$(document).keydown(function (e) {
//    keyLogger.pressedKeys[e.which] = true;
//});

var KEY = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    FIVE: 53,
    SIX: 54,
    SEVEN: 55,
    EIGHT: 56,
    NINE: 57,
};

var NEWLINE = "\n";

var keyLogger = {};
keyLogger.pressedKeys = [];
keyLogger.allKeysPressed = "";
keyLogger.lastKeyPressed = "";
keyLogger.mousePosX = 0;
keyLogger.mousePosY = 0;

function outputKeyDown() {
    $("#iFrame").contents().find("#keyPressed").html(keyLogger.lastKeyPressed);
    $("#iFrame").contents().find("#mousePosX").html(keyLogger.lastKeyPressed);
    $("#iFrame").contents().find("#mousePosY").html(keyLogger.lastKeyPressed);
}

function keydown(e) {
    keyLogger.pressedKeys[e.which] = true;
    var pressedKeys = keyLogger.pressedKeys;

    if (pressedKeys[KEY.UP]) { // up
        keyLogger.lastKeyPressed = "UP";
        keyLogger.allKeysPressed += keyLogger.lastKeyPressed + NEWLINE;
    }

    if (pressedKeys[KEY.DOWN]) { // down
        keyLogger.lastKeyPressed = "DOWN";
        keyLogger.allKeysPressed += keyLogger.lastKeyPressed + NEWLINE;
    }

    if (pressedKeys[KEY.W]) { // w
        keyLogger.lastKeyPressed = "W";
        keyLogger.allKeysPressed += keyLogger.lastKeyPressed + NEWLINE;
    }

    if (pressedKeys[KEY.S]) { // s
        keyLogger.lastKeyPressed = "S";
        keyLogger.allKeysPressed += keyLogger.lastKeyPressed + NEWLINE;
    }
}

function keyup(e) {
    keyLogger.pressedKeys[e.which] = true;
    keyLogger.lastKeyPressed = "";
}