var UntangleGame = {
    graphics: UntangleGraphics,
    levels: UntangleLevels,
    logic: UntangleLogic,
    circles: [],
    lines: [],
    currentLevel: 0,
    progressPercentage: 0
};

UntangleGame.Circle = function (x, y) {
    "use strict";
    this.x = x;
    this.y = y;
};

UntangleGame.Line = function (startPoint, endPoint, thickness) {
    "use strict";
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.thickness = thickness !== undefined ? thickness : UntangleGraphics.thinLineThickness;
};

var setupCurrentLevel = function() {
    "use strict";

    UntangleGame.circles = [];
    var level = UntangleGame.levels[UntangleGame.currentLevel];

    $.each(level.circles, function(index, circle) {
        UntangleGame.circles.push(new UntangleGame.Circle(circle.x, circle.y, 10));
    });
    
    connectCircles();
};

var connectCircles = function() {
    "use strict";

    // setup all lines based on the circles relationship
    var level = UntangleGame.levels[UntangleGame.currentLevel];
    UntangleGame.lines.length = 0;

    $.each(level.relationships, function(i) {
        var connectedPoints = level.relationships[i].connectedPoints;
        var startPoint = UntangleGame.circles[i];

        $.each(connectedPoints, function(j) {
            var endPoint = UntangleGame.circles[connectedPoints[j]];
            UntangleGame.lines.push(new UntangleGame.Line(startPoint, endPoint));
        });
    });
};

var updateLevelProgress = function() {
    "use strict";

    // check the untangle progress of the level
    var progress = 0;
    $.each(UntangleGame.lines, function (index, line) {
        if (line.thickness === UntangleGame.thinLineThickness) {
            progress++;
        }
    });

    UntangleGame.progressPercentage = Math.floor(progress / UntangleGame.lines.length * 100);
    $("#progress").html(UntangleGame.progressPercentage);
    $('#progressBar').css('width', UntangleGame.progressPercentage + '%');

    // display the current level
    $("#level").html(UntangleGame.currentLevel);
};

var gameLoop = function() {
    "use strict";
    
    UntangleGame.logic.updateLineIntersection(UntangleGame.lines);

    // refresh the canvas context
    UntangleGame.graphics.refresh(UntangleGame.lines, UntangleGame.circles, UntangleGame.progressPercentage);
};

var bindUIEvents = function () {
    "use strict";

    $("#game").mousedown(function (e) {
        var mouseX = e.offsetX || 0;
        var mouseY = e.offsetY || 0;

        $.each(UntangleGame.circles, function (index, circle) {
            if (Math.pow(mouseX - circle.x, 2) + Math.pow(mouseY - circle.y, 2) < Math.pow(UntangleGraphics.circleRadius, 2)) {
                UntangleGame.targetCircle = index;
                return;
            }
        });
    });

    $("#game").mousemove(function (e) {
        if (UntangleGame.targetCircle !== undefined) {
            var mouseX = e.offsetX || 0;
            var mouseY = e.offsetY || 0;
            UntangleGame.circles[UntangleGame.targetCircle] = new UntangleGame.Circle(mouseX, mouseY, UntangleGame.circleRadius);
        }
        connectCircles();
        updateLevelProgress();
    });

    $("#game").mouseup(function () {
        UntangleGame.targetCircle = undefined;
        checkLevelCompleteness();
    });
};

$(function () {
    "use strict";
    
    // get the reference of the canvas element and the drawing context.
    UntangleGame.graphics.init($('#game')[0]);
    
    setupCurrentLevel();
    connectCircles();

    // clear the canvas before re-drawing.
    UntangleGame.graphics.clear();
    
    // draw a splash screen when loading the game background
    UntangleGame.graphics.drawBackgroundGradient();
    
    // Add Mouse Event Listener to canvas
    bindUIEvents();

    //setup an interval to loop the game loop
    setInterval(gameLoop, 30);
});

var checkLevelCompleteness = function() {
    "use strict";

    if (UntangleGame.progressPercentage === 100) {
        if (UntangleGame.currentLevel + 1 < UntangleGame.levels.length) {
            UntangleGame.currentLevel++;
        }
        setupCurrentLevel();
    }
};