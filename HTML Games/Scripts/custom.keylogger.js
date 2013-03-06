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
var REFRESHRATE = 30;

var keyLogger = {};
keyLogger.pressedKeys = [];
keyLogger.allKeysPressed = "";
keyLogger.lastKeyPressed = "";

function outputKeysPressed() {
    getKeyPressed();
    var x = $("#iFrame");
    $("#iFrame").contents().find("#textArea").val(keyLogger.allKeysPressed);
}

function getKeyPressed() {
    var pressedKeys = keyLogger.pressedKeys;

    if (pressedKeys[KEY.UP]) { // arrow-up
        keyLogger.lastKeyPressed = "UP";
        keyLogger.allKeysPressed += keyLogger.lastKeyPressed + NEWLINE;
    }

    if (pressedKeys[KEY.DOWN]) { // arrow-down
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